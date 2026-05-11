import React, { createContext, useContext, useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { ArrowLeft, ArrowRight, LoaderCircle, X } from 'lucide-react';
import { buildTrackedUrl } from '../analytics';

declare global {
  interface Window {
    dataLayer?: unknown[];
    fbq?: (...args: unknown[]) => void;
    gtag?: (...args: unknown[]) => void;
  }
}

const LEAD_FORM_WEBHOOK_URL = 'https://script.google.com/macros/s/AKfycbye1LJfNYfJ3ij3_J6TJ955_30TIG0LimMBxw3q-jGqSjntoHgJAY56OCgzhdZhldnYgw/exec';
const LOCAL_LEAD_FALLBACK_KEY = 'medainer:pending-leads';
const MIN_SUBMIT_LOADING_MS = 900;
export const THANK_YOU_PATH = '/obrigado';

type LeadFlowExperience = 'landing' | 'trial';

type LeadFormData = {
  name: string;
  phone: string;
  email: string;
  operationStage: string;
  professionalCount: string;
  primaryChallenge: string;
};

type LeadStatus = 'qualified' | 'disqualified';

type OpenLeadFormOptions = {
  source?: string;
  ctaLabel?: string;
  targetHref?: string;
};

type LeadFlowContextValue = {
  openLeadForm: (options?: OpenLeadFormOptions) => void;
  closeLeadForm: () => void;
};

type ChoiceOption = {
  label: string;
  value: string;
  description: string;
};

type LeadFormStep =
  | {
      id: 'name' | 'phone' | 'email';
      kind: 'input';
      title: string;
      description: string;
      placeholder: string;
      inputType: 'text' | 'tel' | 'email';
      inputMode?: React.HTMLAttributes<HTMLInputElement>['inputMode'];
      autoComplete: string;
    }
  | {
      id: 'operationStage' | 'professionalCount' | 'primaryChallenge';
      kind: 'choice';
      title: string;
      description: string;
      options: ChoiceOption[];
    };

const INITIAL_FORM_DATA: LeadFormData = {
  name: '',
  phone: '',
  email: '',
  operationStage: '',
  professionalCount: '',
  primaryChallenge: '',
};

const LEAD_FORM_STEPS: LeadFormStep[] = [
  {
    id: 'name',
    kind: 'input',
    title: 'Qual é o seu nome?',
    description: 'Esses dados serão usados para enviar sua demonstração personalizada.',
    placeholder: 'Seu nome completo',
    inputType: 'text',
    autoComplete: 'name',
  },
  {
    id: 'phone',
    kind: 'input',
    title: 'Qual é o seu WhatsApp?',
    description: 'Usamos esse número para continuar seu atendimento e organizar o retorno do time.',
    placeholder: '(00) 00000-0000',
    inputType: 'tel',
    inputMode: 'tel',
    autoComplete: 'tel',
  },
  {
    id: 'email',
    kind: 'input',
    title: 'E o seu melhor email?',
    description: 'Assim a gente consegue te enviar os próximos passos sem depender só do WhatsApp.',
    placeholder: 'voce@clinica.com.br',
    inputType: 'email',
    inputMode: 'email',
    autoComplete: 'email',
  },
  {
    id: 'operationStage',
    kind: 'choice',
    title: 'Qual melhor descreve sua operação hoje?',
    description: 'Quero entender o momento da sua clínica de um jeito simples e humano.',
    options: [
      {
        label: 'Atendo sozinho(a)',
        value: 'solo',
        description: 'Você concentra o atendimento e boa parte da rotina da clínica.',
      },
      {
        label: 'Tenho equipe pequena',
        value: 'small_team',
        description: 'A clínica já está em movimento, mas ainda pede mais fluidez operacional.',
      },
      {
        label: 'Tenho uma clínica estruturada',
        value: 'structured_clinic',
        description: 'Já existe equipe, rotina e necessidade clara de mais organização.',
      },
      {
        label: 'Tenho múltiplas unidades',
        value: 'multi_unit',
        description: 'Você precisa ganhar visão, padronização e controle entre frentes.',
      },
    ],
  },
  {
    id: 'professionalCount',
    kind: 'choice',
    title: 'Quantos profissionais atendem hoje?',
    description: 'Isso ajuda a entender o volume de operação e o potencial de encaixe do Medainer.',
    options: [
      {
        label: '1 profissional',
        value: '1',
        description: 'Rotina mais concentrada no próprio dentista.',
      },
      {
        label: '2 a 3 profissionais',
        value: '2_3',
        description: 'Clínica em movimento, com mais agenda e comunicação entre equipe.',
      },
      {
        label: '4 a 10 profissionais',
        value: '4_10',
        description: 'Operação mais intensa, com necessidade de padronização e visibilidade.',
      },
      {
        label: '11 ou mais',
        value: '11_plus',
        description: 'Estrutura robusta, com mais frentes para coordenar no dia a dia.',
      },
    ],
  },
  {
    id: 'primaryChallenge',
    kind: 'choice',
    title: 'Qual é hoje o maior desafio da sua clínica?',
    description: 'Vamos usar isso para direcionar uma demonstração mais assertiva, se fizer sentido para sua operação.',
    options: [
      {
        label: 'Agenda e faltas',
        value: 'agenda_absences',
        description: 'Confirmar presença, reduzir buracos e manter a agenda mais previsível.',
      },
      {
        label: 'Organização da clínica',
        value: 'clinic_organization',
        description: 'Centralizar rotina, equipe e operação sem depender de improviso.',
      },
      {
        label: 'Crescimento da operação',
        value: 'operation_growth',
        description: 'Crescer com mais clareza sobre agenda, atendimento e fluxo interno.',
      },
      {
        label: 'Prontuário e histórico dos pacientes',
        value: 'patient_records',
        description: 'Ter contexto clínico organizado sem perder informações no processo.',
      },
      {
        label: 'Comunicação com pacientes',
        value: 'patient_communication',
        description: 'Melhorar retornos, lembretes e o relacionamento no pós-atendimento.',
      },
      {
        label: 'Outro',
        value: 'other',
        description: 'Existe uma necessidade específica que vale entender melhor na conversa.',
      },
    ],
  },
];

const LeadFlowContext = createContext<LeadFlowContextValue | null>(null);

function formatPhone(value: string) {
  const digits = value.replace(/\D/g, '').slice(0, 11);

  if (digits.length <= 2) return digits;
  if (digits.length <= 7) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
  if (digits.length <= 10) return `(${digits.slice(0, 2)}) ${digits.slice(2, 6)}-${digits.slice(6)}`;
  return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`;
}

function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function isFieldComplete(field: keyof LeadFormData, value: string) {
  if (field === 'name') {
    return value.trim().length >= 3;
  }

  if (field === 'phone') {
    return value.replace(/\D/g, '').length >= 10;
  }

  if (field === 'email') {
    return isValidEmail(value.trim());
  }

  return value.trim().length > 0;
}

function isStepComplete(step: LeadFormStep, data: LeadFormData) {
  if (step.kind === 'input') {
    return isFieldComplete(step.id, data[step.id]);
  }

  return data[step.id].trim().length > 0;
}

function getLeadQualification(data: LeadFormData): { status: LeadStatus; reason: string; score: number } {
  const operationScore = {
    solo: 0,
    small_team: 1,
    structured_clinic: 2,
    multi_unit: 3,
  }[data.operationStage] ?? 0;

  const professionalScore = {
    '1': 0,
    '2_3': 1,
    '4_10': 2,
    '11_plus': 3,
  }[data.professionalCount] ?? 0;

  const challengeScore = {
    agenda_absences: 1,
    clinic_organization: 1,
    operation_growth: 2,
    patient_records: 1,
    patient_communication: 1,
    other: 0,
  }[data.primaryChallenge] ?? 0;

  const score = operationScore + professionalScore + challengeScore;

  if (data.operationStage === 'solo' && data.professionalCount === '1') {
    return {
      status: 'disqualified',
      reason: 'solo_operation_low_complexity',
      score,
    };
  }

  if (score >= 3) {
    return {
      status: 'qualified',
      reason: operationScore >= 2 ? 'structured_operation_profile' : 'growing_team_profile',
      score,
    };
  }

  return {
    status: 'disqualified',
    reason: 'low_operational_complexity',
    score,
  };
}

function pushAnalyticsEvent(eventName: string, payload: Record<string, unknown>) {
  if (typeof window === 'undefined') return;

  window.dataLayer?.push({ event: eventName, ...payload });
  window.gtag?.('event', eventName, payload);
}

function pushMetaCustomEvent(eventName: string, payload: Record<string, unknown>) {
  if (typeof window === 'undefined' || typeof window.fbq !== 'function') return;
  window.fbq('trackCustom', eventName, payload);
}

function getCampaignParams() {
  if (typeof window === 'undefined') return {};

  const params = new URLSearchParams(window.location.search);
  const entries: Record<string, string> = {};

  params.forEach((value, key) => {
    if (key.startsWith('utm_') || ['fbclid', 'gclid', 'gad_source', 'gbraid', 'msclkid', 'wbraid'].includes(key)) {
      entries[key] = value;
    }
  });

  return entries;
}

async function persistLeadSubmission(payload: Record<string, unknown>) {
  if (!LEAD_FORM_WEBHOOK_URL) {
    const previousItems = JSON.parse(window.localStorage.getItem(LOCAL_LEAD_FALLBACK_KEY) || '[]') as Record<string, unknown>[];
    previousItems.push({ ...payload, delivery: 'local_fallback' });
    window.localStorage.setItem(LOCAL_LEAD_FALLBACK_KEY, JSON.stringify(previousItems));
    return;
  }

  if (/script\.google\.com\/macros\/s\//.test(LEAD_FORM_WEBHOOK_URL)) {
    await fetch(LEAD_FORM_WEBHOOK_URL, {
      method: 'POST',
      mode: 'no-cors',
      headers: {
        'Content-Type': 'text/plain;charset=utf-8',
      },
      body: JSON.stringify(payload),
    });
    return;
  }

  const response = await fetch(LEAD_FORM_WEBHOOK_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error('Não foi possível enviar seus dados agora. Tente novamente em instantes.');
  }
}

function ModalStepField({
  step,
  value,
  disabled,
  inputRef,
  onInputChange,
  onChoiceSelect,
}: {
  step: LeadFormStep;
  value: string;
  disabled: boolean;
  inputRef?: React.Ref<HTMLInputElement>;
  onInputChange: (value: string) => void;
  onChoiceSelect: (value: string) => void;
}) {
  if (step.kind === 'choice') {
    return (
      <div className="space-y-3">
        {step.options.map((option) => {
          const isSelected = value === option.value;

          return (
            <button
              key={option.value}
              type="button"
              disabled={disabled}
              onClick={() => onChoiceSelect(option.value)}
              className={`w-full rounded-[24px] border px-5 py-4 text-left transition-all duration-200 ${
                isSelected
                  ? 'border-brand-primary bg-brand-primary-soft shadow-[0_16px_36px_rgba(68,87,243,0.14)]'
                  : 'border-brand-line bg-white hover:border-brand-primary/35 hover:bg-brand-panel'
              } ${disabled ? 'cursor-not-allowed opacity-60' : ''}`}
            >
              <p className="text-lg font-semibold tracking-[-0.03em] text-brand-ink">{option.label}</p>
              <p className="mt-2 text-sm leading-relaxed text-brand-muted">{option.description}</p>
            </button>
          );
        })}
      </div>
    );
  }

  return (
    <input
      ref={inputRef}
      type={step.inputType}
      inputMode={step.inputMode}
      autoComplete={step.autoComplete}
      placeholder={step.placeholder}
      value={value}
      onChange={(event) => onInputChange(event.target.value)}
      className="w-full rounded-[24px] border border-brand-line bg-white px-5 py-4 text-lg tracking-[-0.03em] text-brand-ink outline-none transition-colors placeholder:text-brand-muted/70 focus:border-brand-primary focus:ring-4 focus:ring-brand-primary/10 sm:text-lg"
    />
  );
}

function LeadFormModal({
  isOpen,
  stepIndex,
  formData,
  contextSource,
  ctaLabel,
  isSubmitting,
  errorMessage,
  onClose,
  onBack,
  onInputChange,
  onChoiceSelect,
  onAdvance,
}: {
  isOpen: boolean;
  stepIndex: number;
  formData: LeadFormData;
  contextSource: string;
  ctaLabel: string;
  isSubmitting: boolean;
  errorMessage: string;
  onClose: () => void;
  onBack: () => void;
  onInputChange: (stepId: keyof LeadFormData, value: string) => void;
  onChoiceSelect: (stepId: keyof LeadFormData, value: string) => void;
  onAdvance: () => void;
}) {
  const inputRefs = useRef<Record<'name' | 'phone' | 'email', HTMLInputElement | null>>({
    name: null,
    phone: null,
    email: null,
  });
  const step = LEAD_FORM_STEPS[stepIndex];
  const value = formData[step.id];
  const isLastStep = stepIndex === LEAD_FORM_STEPS.length - 1;
  const canAdvance = isStepComplete(step, formData);
  const progressWidth = `${((stepIndex + 1) / LEAD_FORM_STEPS.length) * 100}%`;

  useEffect(() => {
    if (!isOpen || step.kind !== 'input') return;

    const nextInput = inputRefs.current[step.id];
    if (!nextInput) return;

    const timerId = window.setTimeout(() => {
      nextInput.focus();
      nextInput.setSelectionRange?.(nextInput.value.length, nextInput.value.length);
    }, 30);

    return () => window.clearTimeout(timerId);
  }, [isOpen, step.id, step.kind]);

  return (
    <AnimatePresence>
      {isOpen ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[80] flex items-stretch justify-center bg-[#09102a]/55 px-0 py-0 backdrop-blur-md sm:items-center sm:px-4 sm:py-6 sm:px-6"
          onClick={onClose}
        >
        <motion.div
          initial={{ opacity: 0, y: 24, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 24, scale: 0.98 }}
          transition={{ duration: 0.24, ease: 'easeOut' }}
          className="relative flex h-[100dvh] w-full max-w-none flex-col overflow-y-auto border-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.99)_0%,rgba(247,248,253,0.99)_100%)] shadow-none sm:h-auto sm:max-h-[min(90vh,920px)] sm:min-h-0 sm:max-w-[760px] sm:overflow-y-auto sm:rounded-[32px] sm:border sm:border-white/70 sm:shadow-[0_40px_120px_rgba(9,16,42,0.28)]"
          onClick={(event) => event.stopPropagation()}
        >
            {isSubmitting ? (
              <div className="absolute inset-0 z-20 flex items-center justify-center bg-white/88 backdrop-blur-sm">
                <div className="flex max-w-[90%] items-center gap-3 rounded-full bg-white px-5 py-3 text-center shadow-[0_24px_60px_rgba(16,29,77,0.14)] ring-1 ring-brand-line sm:max-w-none sm:px-6 sm:py-4">
                  <LoaderCircle className="h-5 w-5 animate-spin text-brand-primary" />
                  <span className="text-base font-medium text-brand-ink sm:text-lg">Enviando seus dados...</span>
                </div>
              </div>
            ) : null}

            <div className="absolute inset-x-0 top-0 h-1.5 bg-brand-line/60">
              <div className="h-full rounded-full bg-[linear-gradient(135deg,#4457f3_0%,#6a82ff_100%)] transition-all duration-300" style={{ width: progressWidth }} />
            </div>

            <button
              type="button"
              onClick={onClose}
              className="absolute right-4 top-4 inline-flex h-11 w-11 items-center justify-center rounded-full bg-transparent text-brand-ink transition-colors hover:text-brand-primary"
              aria-label="Fechar formulário"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="flex min-h-full flex-1 flex-col px-5 pb-8 pt-12 sm:min-h-0 sm:px-8 sm:pb-8 sm:pt-12">
              <div className="mx-auto flex w-full max-w-[560px] items-center">
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-brand-primary sm:text-[11px]">
                  Formulário Medainer
                </p>
              </div>

              <div className="mt-6 flex flex-1 flex-col sm:mt-10">
                <form
                  className="mx-auto flex w-full max-w-[560px] flex-1 flex-col justify-start"
                  onSubmit={(event) => {
                    event.preventDefault();
                    if (!canAdvance || isSubmitting || step.kind === 'choice') return;
                    onAdvance();
                  }}
                >
                  <div className="relative">
                    {LEAD_FORM_STEPS.map((panelStep, index) => {
                      const isActive = index === stepIndex;
                      const panelValue = formData[panelStep.id];

                      return (
                        <motion.div
                          key={panelStep.id}
                          initial={false}
                          animate={{
                            opacity: isActive ? 1 : 0,
                            y: isActive ? 0 : 12,
                          }}
                          transition={{ duration: 0.2, ease: 'easeOut' }}
                          className={isActive ? 'relative' : 'pointer-events-none absolute inset-0'}
                          aria-hidden={!isActive}
                        >
                          <div className={isActive ? '' : 'invisible'}>
                            <h2 className="w-full max-w-none text-3xl font-semibold leading-[1.04] tracking-[-0.06em] text-brand-ink sm:text-[2.5rem]">
                              {panelStep.title}
                            </h2>

                            <div className="mt-8 sm:mt-10">
                              <ModalStepField
                                step={panelStep}
                                value={panelValue}
                                disabled={isSubmitting || !isActive}
                                inputRef={
                                  panelStep.kind === 'input'
                                    ? (node) => {
                                        inputRefs.current[panelStep.id] = node;
                                      }
                                    : undefined
                                }
                                onInputChange={(nextValue) => onInputChange(panelStep.id, nextValue)}
                                onChoiceSelect={(nextValue) => onChoiceSelect(panelStep.id, nextValue)}
                              />
                            </div>
                          </div>
                        </motion.div>
                      );
                    })}

                    {errorMessage ? <p className="mt-4 text-sm font-medium text-[#dc2626]">{errorMessage}</p> : null}
                  </div>

                  <div
                    className={`mt-8 sm:mt-10 ${
                      step.kind === 'input'
                        ? 'grid grid-cols-2 gap-3 sm:flex sm:flex-row sm:items-center sm:justify-between'
                        : 'flex flex-col items-center justify-center gap-3 text-center'
                    }`}
                  >
                    <button
                      type="button"
                      onClick={onBack}
                      disabled={stepIndex === 0 || isSubmitting}
                      className={`inline-flex items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-semibold transition-colors ${
                        step.kind === 'input' ? 'w-full sm:w-auto' : 'w-auto'
                      } ${
                        stepIndex === 0 || isSubmitting
                          ? 'cursor-not-allowed text-brand-muted/45'
                          : 'text-brand-muted hover:text-brand-ink'
                      }`}
                    >
                      <ArrowLeft className="h-4 w-4" />
                      Voltar
                    </button>

                    {step.kind === 'input' ? (
                      <button
                        type="submit"
                        disabled={!canAdvance || isSubmitting}
                        className={`inline-flex w-full items-center justify-center gap-2 rounded-full px-6 py-3.5 text-sm font-semibold transition-all duration-300 sm:min-w-[196px] sm:w-auto ${
                          canAdvance && !isSubmitting
                            ? 'bg-[linear-gradient(135deg,#4457f3_0%,#6273ff_100%)] text-white shadow-[0_18px_48px_rgba(68,87,243,0.24)] hover:-translate-y-0.5'
                            : 'cursor-not-allowed bg-brand-line text-white/70'
                        }`}
                      >
                        {isSubmitting ? <LoaderCircle className="h-4 w-4 animate-spin" /> : null}
                        {isLastStep ? 'Solicitar demonstração' : 'Continuar'}
                        {!isSubmitting ? <ArrowRight className="h-4 w-4" /> : null}
                      </button>
                    ) : (
                      <div className="max-w-[18rem] text-center text-sm text-brand-muted">
                        <span>
                          {isLastStep
                            ? 'Ao escolher, enviamos seus dados e abrimos a página de obrigado.'
                            : 'Escolha uma opção para seguir.'}
                        </span>
                      </div>
                    )}
                  </div>
                </form>
              </div>
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

export function LeadFlowProvider({
  children,
  experience,
}: {
  children: React.ReactNode;
  experience: LeadFlowExperience;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [stepIndex, setStepIndex] = useState(0);
  const [formData, setFormData] = useState(INITIAL_FORM_DATA);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [contextSource, setContextSource] = useState(experience);
  const [ctaLabel, setCtaLabel] = useState('');
  const [targetHref, setTargetHref] = useState('');

  useEffect(() => {
    if (!isOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && !isSubmitting) {
        setIsOpen(false);
      }
    };

    window.addEventListener('keydown', handleEscape);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, isSubmitting]);

  const resetSubmissionState = () => {
    setStepIndex(0);
    setFormData(INITIAL_FORM_DATA);
    setIsSubmitting(false);
    setErrorMessage('');
    setCtaLabel('');
    setTargetHref('');
  };

  const openLeadForm = (options?: OpenLeadFormOptions) => {
    const source = options?.source || experience;

    setContextSource(source);
    setCtaLabel(options?.ctaLabel || '');
    setTargetHref(options?.targetHref || '');
    setStepIndex(0);
    setFormData(INITIAL_FORM_DATA);
    setErrorMessage('');
    setIsOpen(true);

    pushAnalyticsEvent('lead_form_open', {
      source,
      cta_label: options?.ctaLabel || '',
      experience,
    });
    pushMetaCustomEvent('LeadFormOpen', {
      source,
      cta_label: options?.ctaLabel || '',
      experience,
    });
  };

  const closeLeadForm = () => {
    if (isSubmitting) return;
    setIsOpen(false);
  };

  const updateField = (field: keyof LeadFormData, value: string) => {
    setErrorMessage('');

    setFormData((current) => ({
      ...current,
      [field]: field === 'phone' ? formatPhone(value) : value,
    }));
  };

  const submitLeadForm = async (completedFormData: LeadFormData) => {
    setIsSubmitting(true);
    setErrorMessage('');
    const submissionStartedAt = Date.now();
    const leadQualification = getLeadQualification(completedFormData);

    const submissionPayload = {
      ...completedFormData,
      leadStatus: leadQualification.status,
      leadStatusReason: leadQualification.reason,
      qualificationScore: leadQualification.score,
      submittedAt: new Date().toISOString(),
      source: contextSource,
      ctaLabel,
      targetHref,
      experience,
      pagePath: window.location.pathname,
      pageUrl: window.location.href,
      pageTitle: document.title,
      referrer: document.referrer || '',
      userAgent: window.navigator.userAgent,
      ...getCampaignParams(),
    };

    try {
      await persistLeadSubmission(submissionPayload);
      const elapsedTime = Date.now() - submissionStartedAt;

      if (elapsedTime < MIN_SUBMIT_LOADING_MS) {
        await new Promise((resolve) => window.setTimeout(resolve, MIN_SUBMIT_LOADING_MS - elapsedTime));
      }

      const analyticsPayload = {
        source: contextSource,
        experience,
        lead_status: leadQualification.status,
        qualification_score: leadQualification.score,
        operation_stage: completedFormData.operationStage,
        professional_count: completedFormData.professionalCount,
        primary_challenge: completedFormData.primaryChallenge,
      };

      if (leadQualification.status === 'qualified') {
        pushAnalyticsEvent('generate_lead', analyticsPayload);
      } else {
        pushAnalyticsEvent('lead_disqualified', analyticsPayload);
      }

      pushAnalyticsEvent('lead_form_submitted', {
        source: contextSource,
        experience,
        lead_status: leadQualification.status,
      });

      if (leadQualification.status === 'qualified' && typeof window.fbq === 'function') {
        window.fbq('track', 'Lead', {
          content_name: 'Formulário Medainer',
          content_category: experience,
          source: contextSource,
        });
      } else if (leadQualification.status === 'disqualified') {
        pushMetaCustomEvent('LeadDisqualified', {
          source: contextSource,
          experience,
          reason: leadQualification.reason,
        });
      }

      setIsOpen(false);
      resetSubmissionState();
      window.location.assign(buildTrackedUrl(`${THANK_YOU_PATH}?status=${leadQualification.status}`));
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Não foi possível enviar agora. Tente novamente.';
      setErrorMessage(message);
      setIsSubmitting(false);
    }
  };

  const advanceStep = async (nextFormData = formData) => {
    const currentStep = LEAD_FORM_STEPS[stepIndex];
    if (!isStepComplete(currentStep, nextFormData) || isSubmitting) return;

    if (stepIndex === LEAD_FORM_STEPS.length - 1) {
      await submitLeadForm(nextFormData);
      return;
    }

    setStepIndex((current) => current + 1);
  };

  const handleChoiceSelect = (field: keyof LeadFormData, value: string) => {
    const nextFormData = {
      ...formData,
      [field]: value,
    };

    setFormData(nextFormData);
    setErrorMessage('');
    void advanceStep(nextFormData);
  };

  const contextValue: LeadFlowContextValue = {
    openLeadForm,
    closeLeadForm,
  };

  return (
    <LeadFlowContext.Provider value={contextValue}>
      {children}
      <LeadFormModal
        isOpen={isOpen}
        stepIndex={stepIndex}
        formData={formData}
        contextSource={contextSource}
        ctaLabel={ctaLabel}
        isSubmitting={isSubmitting}
        errorMessage={errorMessage}
        onClose={closeLeadForm}
        onBack={() => {
          if (stepIndex === 0 || isSubmitting) return;
          setErrorMessage('');
          setStepIndex((current) => current - 1);
        }}
        onInputChange={updateField}
        onChoiceSelect={handleChoiceSelect}
        onAdvance={() => {
          void advanceStep();
        }}
      />
    </LeadFlowContext.Provider>
  );
}

export function useLeadFlow() {
  const context = useContext(LeadFlowContext);

  if (!context) {
    throw new Error('useLeadFlow must be used within a LeadFlowProvider.');
  }

  return context;
}
