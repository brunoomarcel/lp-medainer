import React, { createContext, useContext, useEffect, useState } from 'react';
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
  clinicType: string;
  professionalCount: string;
  role: string;
};

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
      id: 'clinicType' | 'professionalCount' | 'role';
      kind: 'choice';
      title: string;
      description: string;
      options: ChoiceOption[];
    };

const INITIAL_FORM_DATA: LeadFormData = {
  name: '',
  phone: '',
  email: '',
  clinicType: '',
  professionalCount: '',
  role: '',
};

const LEAD_FORM_STEPS: LeadFormStep[] = [
  {
    id: 'name',
    kind: 'input',
    title: 'Qual é o seu nome?',
    description: 'Quero te chamar do jeito certo antes de mostrar como o Medainer se encaixa na sua clínica.',
    placeholder: 'Digite seu nome completo',
    inputType: 'text',
    autoComplete: 'name',
  },
  {
    id: 'phone',
    kind: 'input',
    title: 'Qual é o seu telefone?',
    description: 'Usamos esse número para continuar seu atendimento e organizar o retorno do time.',
    placeholder: '(00) 00000-0000',
    inputType: 'tel',
    inputMode: 'tel',
    autoComplete: 'tel',
  },
  {
    id: 'email',
    kind: 'input',
    title: 'E o seu melhor e-mail?',
    description: 'Assim a gente consegue te enviar os próximos passos sem depender só do WhatsApp.',
    placeholder: 'voce@clinica.com.br',
    inputType: 'email',
    inputMode: 'email',
    autoComplete: 'email',
  },
  {
    id: 'clinicType',
    kind: 'choice',
    title: 'Qual é o tipo da sua clínica?',
    description: 'Isso ajuda a mostrar o fluxo mais próximo da sua operação atual.',
    options: [
      {
        label: 'Consultório odontológico',
        value: 'consultorio_odontologico',
        description: 'Poucos profissionais',
      },
      {
        label: 'Clínica odontológica',
        value: 'clinica_odontologica',
        description: 'Equipe, recepção e mais de uma frente operacional no dia a dia.',
      },
      {
        label: 'Rede ou multiunidade',
        value: 'rede_multiunidade',
        description: 'Mais de uma unidade ou estrutura com maior complexidade de operação.',
      },
      {
        label: 'Outro formato',
        value: 'outro_formato',
        description: 'Quero explicar meu contexto com o time depois.',
      },
    ],
  },
  {
    id: 'professionalCount',
    kind: 'choice',
    title: 'Quantos profissionais atendem hoje?',
    description: 'Esse número ajuda a indicar o melhor ponto de partida entre Solo, Clínica e Automação.',
    options: [
      {
        label: '1 profissional',
        value: '1',
        description: 'Consultório em fase inicial.',
      },
      {
        label: '2 a 3 profissionais',
        value: '2_3',
        description: 'Time pequeno com rotina compartilhada.',
      },
      {
        label: '4 a 10 profissionais',
        value: '4_10',
        description: 'Clínica em crescimento com mais agenda e coordenação.',
      },
      {
        label: '11 ou mais',
        value: '11_plus',
        description: 'Estrutura com maior volume e necessidade de visibilidade.',
      },
    ],
  },
  {
    id: 'role',
    kind: 'choice',
    title: 'O que você é na empresa?',
    description: 'Assim o time já entende seu papel e a conversa começa no nível certo.',
    options: [
      {
        label: 'Dentista / profissional',
        value: 'dentista_profissional',
        description: 'Atuo diretamente no atendimento clínico.',
      },
      {
        label: 'Proprietário(a)',
        value: 'proprietario',
        description: 'Cuido da clínica e das decisões do negócio.',
      },
      {
        label: 'Gestor(a) / coordenador(a)',
        value: 'gestor_coordenador',
        description: 'Acompanho operação, processos e resultados.',
      },
      {
        label: 'Recepção / administrativo',
        value: 'recepcao_administrativo',
        description: 'Estou no dia a dia da agenda e da organização da clínica.',
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

function isStepComplete(step: LeadFormStep, data: LeadFormData) {
  const value = data[step.id];

  if (step.id === 'name') {
    return value.trim().length >= 3;
  }

  if (step.id === 'phone') {
    return value.replace(/\D/g, '').length >= 10;
  }

  if (step.id === 'email') {
    return isValidEmail(value.trim());
  }

  return value.trim().length > 0;
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
  onInputChange,
  onChoiceSelect,
}: {
  step: LeadFormStep;
  value: string;
  disabled: boolean;
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
      autoFocus
      type={step.inputType}
      inputMode={step.inputMode}
      autoComplete={step.autoComplete}
      placeholder={step.placeholder}
      value={value}
      onChange={(event) => onInputChange(event.target.value)}
      className="w-full rounded-[24px] border border-brand-line bg-white px-5 py-4 text-xl tracking-[-0.03em] text-brand-ink outline-none transition-colors placeholder:text-brand-muted/70 focus:border-brand-primary focus:ring-4 focus:ring-brand-primary/10 sm:text-2xl"
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
  const step = LEAD_FORM_STEPS[stepIndex];
  const value = formData[step.id];
  const isLastStep = stepIndex === LEAD_FORM_STEPS.length - 1;
  const canAdvance = isStepComplete(step, formData);
  const progressWidth = `${((stepIndex + 1) / LEAD_FORM_STEPS.length) * 100}%`;

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
          className="relative flex h-[100dvh] w-full max-w-none flex-col overflow-y-auto border-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.99)_0%,rgba(247,248,253,0.99)_100%)] shadow-none sm:h-auto sm:max-h-[min(90vh,920px)] sm:min-h-0 sm:max-w-[760px] sm:overflow-hidden sm:rounded-[32px] sm:border sm:border-white/70 sm:shadow-[0_40px_120px_rgba(9,16,42,0.28)]"
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
              className="absolute right-4 top-4 inline-flex h-11 w-11 items-center justify-center rounded-full border border-brand-line bg-white/90 text-brand-ink transition-colors hover:border-brand-primary hover:text-brand-primary"
              aria-label="Fechar formulário"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="flex min-h-full flex-1 flex-col px-5 pb-8 pt-16 sm:min-h-0 sm:px-8 sm:pb-8 sm:pt-12">
              <div className="mx-auto flex w-full max-w-[560px] flex-wrap items-center justify-between gap-3">
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-brand-primary">
                  Formulário Medainer
                </p>
                <div className="rounded-full bg-brand-primary-soft px-4 py-2 text-sm font-semibold text-brand-primary">
                  {stepIndex + 1} de {LEAD_FORM_STEPS.length}
                </div>
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={step.id}
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -18 }}
                  transition={{ duration: 0.2, ease: 'easeOut' }}
                  className="mt-8 flex flex-1 flex-col sm:mt-10"
                >
                  <form
                    className="mx-auto flex w-full max-w-[560px] flex-1 flex-col justify-center"
                    onSubmit={(event) => {
                      event.preventDefault();
                      if (!canAdvance || isSubmitting || step.kind === 'choice') return;
                      onAdvance();
                    }}
                  >
                    <div>
                      <h2 className="w-full max-w-none text-3xl font-semibold leading-[1.04] tracking-[-0.06em] text-brand-ink sm:text-5xl">
                        {step.title}
                      </h2>
                      {/* <p className="mt-5 max-w-2xl text-lg leading-relaxed text-brand-muted">{step.description}</p> */}

                      <div className="mt-10">
                        <ModalStepField
                          step={step}
                          value={value}
                          disabled={isSubmitting}
                          onInputChange={(nextValue) => onInputChange(step.id, nextValue)}
                          onChoiceSelect={(nextValue) => onChoiceSelect(step.id, nextValue)}
                        />
                      </div>

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
                          {isLastStep ? 'Enviar formulário' : 'Continuar'}
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
                </motion.div>
              </AnimatePresence>
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

    const submissionPayload = {
      ...completedFormData,
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

      pushAnalyticsEvent('generate_lead', {
        source: contextSource,
        experience,
        clinic_type: completedFormData.clinicType,
        professional_count: completedFormData.professionalCount,
        role: completedFormData.role,
      });
      pushAnalyticsEvent('lead_form_submitted', {
        source: contextSource,
        experience,
      });

      if (typeof window.fbq === 'function') {
        window.fbq('track', 'Lead', {
          content_name: 'Formulário Medainer',
          content_category: experience,
          source: contextSource,
        });
      }

      setIsOpen(false);
      resetSubmissionState();
      window.location.assign(buildTrackedUrl(THANK_YOU_PATH));
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
