<script setup>
import { useWidgetStore } from '@/stores/widget'
import KeyboardArrowDown from '~icons/material-symbols/keyboard-arrow-down-rounded'

// Stores
const widget = useWidgetStore()
</script>

<template>
  <div
    class="p-1 size-20 rounded-full bg-brand hover:bg-brand-dark shadow-xs shadow-black/20 cursor-pointer flex items-center justify-center"
  >
    <Transition name="button">
      <img v-if="!widget.open" src="@/assets/logo_face.svg" alt="Chatbot Widget" />
      <KeyboardArrowDown v-else :class="`text-white size-10`" />
    </Transition>
  </div>
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

.chat-enter-to,
.chat-leave-from {
  opacity: 1;
}
</style>
