import React from 'react';
import { CheckCircle2 } from 'lucide-react';
import medainerSymbol from '../assets/images/symbol-medainer.png';

export function DisqualifiedPage() {
  return (
    <div className="min-h-screen bg-brand-page text-brand-ink">
      <main className="flex min-h-screen items-center justify-center px-4 py-10 sm:px-6">
        <section className="w-full max-w-3xl rounded-[28px] border border-brand-line bg-white/96 p-6 text-center shadow-[0_32px_90px_rgba(16,29,77,0.12)] backdrop-blur-sm sm:rounded-[36px] sm:p-12">
          <img
            src={medainerSymbol}
            alt="Medainer"
            className="mx-auto h-16 w-16 rounded-full object-cover shadow-[0_16px_40px_rgba(68,87,243,0.22)]"
          />

          <div className="mt-8 flex flex-wrap items-center justify-center gap-3 sm:gap-4">
            <CheckCircle2 className="h-7 w-7 text-[#16a34a] sm:h-8 sm:w-8" />
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-brand-primary sm:text-sm sm:tracking-[0.2em]">
              Recebemos seus dados
            </p>
          </div>

          <h1 className="mx-auto mt-4 max-w-[20ch] text-3xl font-semibold leading-[1.04] tracking-[-0.05em] sm:text-5xl">
            Seu momento pede outro próximo passo
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-brand-muted sm:mt-6 sm:text-lg">
            Recebemos suas informações. Pelo perfil atual da sua operação, o caminho mais útil agora é estruturar a clínica antes de uma conversa comercial com o time.
          </p>

          <p className="mt-6 text-sm text-brand-muted">
            Voltar ao site:
            {' '}
            <a href="/" className="font-semibold text-brand-primary hover:text-brand-primary-strong">
              medainer.com.br
            </a>
          </p>
        </section>
      </main>
    </div>
  );
}
