<script setup>
import config from '@/config/app'
import { useWidgetStore } from '@/stores/widget'
import PrivacyIcon from '~icons/material-symbols/privacy-tip'

const widget = useWidgetStore()
</script>

<template>
  <div class="flex-1 flex flex-col items-center justify-center p-6">
    <div class="flex flex-col items-center gap-4 text-center max-w-72">
      <!-- Icono de privacidad -->
      <div class="size-14 rounded-full bg-brand/10 flex items-center justify-center">
        <PrivacyIcon class="size-8 text-brand" />
      </div>

      <!-- Título -->
      <h2 class="text-base font-semibold text-main">Tu privacidad importa</h2>

      <!-- Descripción -->
      <p class="text-sm text-muted leading-relaxed">
        Antes de empezar, necesitamos tu consentimiento para procesar los mensajes
        de esta sesión y poder responder tus consultas.
      </p>

      <!-- Enlace a política de privacidad -->
      <a
        :href="config.legal.privacyPolicyUrl"
        target="_blank"
        rel="noopener noreferrer"
        class="text-sm text-brand underline hover:text-brand-dark"
      >
        Leer la política de privacidad
      </a>

      <!-- Botón de aceptar -->
      <button
        type="button"
        class="w-full px-4 py-2.5 rounded-lg bg-brand text-white text-sm font-medium cursor-pointer hover:bg-brand-dark transition-colors duration-100"
        @click="widget.acceptConsent"
      >
        Aceptar y continuar
      </button>
    </div>
  </div>
</template>
