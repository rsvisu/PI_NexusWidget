<script setup>
import { useWidgetStore } from '@/stores/widget'
import KeyboardArrowDown from '~icons/material-symbols/keyboard-arrow-down-rounded'
import logoFace from '@/assets/logo-face.svg'

// Stores:
const widget = useWidgetStore()
</script>

<template>
  <button
    class="p-1 size-20 rounded-full bg-brand hover:bg-brand-dark shadow-xs shadow-black/20 cursor-pointer flex items-center justify-center"
  >
    <Transition name="button">
      <img v-if="!widget.isOpen" :src="logoFace" alt="Chatbot Widget" />
      <KeyboardArrowDown v-else :class="`text-white size-10`" />
    </Transition>
  </button>
</template>

<style>
/* Animation */
.button-enter-active,
.button-leave-active {
  transition: opacity 0.1s ease;
}

.button-enter-from,
.button-leave-to {
  opacity: 0;
}

.button-enter-to,
.button-leave-from {
  opacity: 1;
}
</style>
