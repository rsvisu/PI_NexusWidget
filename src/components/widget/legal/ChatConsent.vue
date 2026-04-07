<script setup>
import { PRIVACY_POLICY_URL } from '@/config/legal'
import { useWidgetStore } from '@/stores/widget';

const widget = useWidgetStore()
</script>

<template>
  <div class="flex-1 flex items-center justify-center flex-col bg-amber-50 gap-5 p-5 text-center">
    <p class="text-sm text-amber-900">
      Antes de iniciar la conversacion, necesitamos tu consentimiento para tratar los datos de esta sesion
      con el fin de responder tus consultas.
    </p>
    <a :href="PRIVACY_POLICY_URL" target="_blank"
      class="text-xs text-amber-800 underline hover:text-amber-950">
      Ver politica de privacidad
    </a>
    <button type="button" class="px-3 py-1.5 rounded-md bg-brand text-white text-sm cursor-pointer hover:bg-brand-dark"
      @click="widget.acceptConsent">
      Aceptar
    </button>
  </div>
</template>
