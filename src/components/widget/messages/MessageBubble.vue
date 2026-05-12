<script setup>
import { computed, ref } from 'vue'
import CopyIcon from '~icons/material-symbols/content-copy-rounded'

// Props:
const props = defineProps({
  message: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
  },
})

// Variables:
const copied = ref(false)
const isUserMessage = computed(() => props.role === 'user')

// Clases dinamicas:
const bubbleClasses = computed(() =>
  isUserMessage.value ? 'self-end items-end' : 'self-start items-start',
)

const messageClasses = computed(() =>
  isUserMessage.value
    ? 'bg-brand text-white rounded-br-sm'
    : 'bg-gray-100 text-gray-800 rounded-bl-sm',
)

const copiedClasses = computed(() => (isUserMessage.value ? 'flex-row-reverse' : ''))

// Funciones:
// Funcion copiar mensaje
async function copyMessage() {
  try {
    await navigator.clipboard.writeText(props.message)
    copied.value = true
    // Espera de 1200ms para eliminar el mensaje de confirmacion
    globalThis.setTimeout(() => {
      copied.value = false
    }, 1200)
  } catch {
    copied.value = false
  }
}
</script>

<template>
  <div class="message-bubble mt-2 max-w-[90%] flex flex-col" :class="bubbleClasses">
    <!-- Message -->
    <div class="wrap-break-word px-4 py-2 rounded-xl shadow-sm" :class="messageClasses">
      {{ props.message }}
    </div>
    <!-- Copy Button -->
    <div
      class="copy-actions flex items-center gap-2 mt-1 px-1 text-xs text-muted"
      :class="copiedClasses"
    >
      <button
        type="button"
        tabindex="-1"
        class="p-1 rounded hover:bg-gray-200 transition-colors cursor-pointer"
        @click="copyMessage"
      >
        <CopyIcon class="size-4" />
      </button>
      <span v-if="copied" class="text-brand"> Copiado </span>
    </div>
  </div>
</template>

<style scoped>
.message-bubble .copy-actions {
  opacity: 0;
  pointer-events: none;
  transition: opacity 150ms ease;
}

.message-bubble:hover .copy-actions {
  opacity: 1;
  pointer-events: auto;
}
</style>
