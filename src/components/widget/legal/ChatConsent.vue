<script setup>
import { PRIVACY_POLICY_URL } from '@/config/legal'
import { useWidgetStore } from '@/stores/widget';

const widget = useWidgetStore()
</script>

<template>
  <div class="m-auto p-5">
    <div class="max-w-100 flex items-center justify-center text-center flex-col gap-5">
      <p>
        Antes de iniciar la conversacion, necesitamos tu consentimiento para tratar los datos de esta sesion
        con el fin de responder tus consultas.
      </p>
      <a :href="PRIVACY_POLICY_URL" target="_blank" class="text-brand underline hover:text-brand-dark">
        Ver politica de privacidad
      </a>
      <button type="button"
        class="px-4 py-2.5 rounded-md bg-brand text-white text-sm cursor-pointer hover:bg-brand-dark"
        @click="widget.acceptConsent">
        Aceptar
      </button>
    </div>
  </div>
</template>
