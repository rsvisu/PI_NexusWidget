<script setup>
import ButtonWidget from './widget/ButtonWidget.vue'
import ChatContainer from './widget/chat/ChatContainer.vue'
import { useWidgetStore } from '@/stores/widget'
import { useIsMobile } from './composables/useIsMobile'

// Stores:
const widget = useWidgetStore()

// Variables:
const isMobile = useIsMobile()

// Funciones:
function handleClick() {
  if (isMobile.value && !widget.isMaximized) {
    widget.toggleMaximize()
  } else {
    widget.toggleOpen()
  }
}
</script>

<template>
  <ButtonWidget class="fixed bottom-4 right-4" @click="handleClick" />
  <Transition name="chat">
    <ChatContainer v-show="widget.isOpen" class="bg-white shadow-xs shadow-black/20 flex flex-col overflow-hidden"
    :class="widget.isMaximized
      ? 'fixed inset-0 z-50 w-screen h-screen max-w-none rounded-none'
      : 'fixed bottom-28 right-4 w-[calc(100vw-2rem)] max-w-104 h-[min(78vh,44rem)] rounded-2xl'"/>
  </Transition>
</template>

<style>
/* Animation */
.chat-enter-active,
.chat-leave-active {
  transition:
    opacity 0.2s ease,
    transform 0.2s ease;
  transform-origin: bottom right;
}

.chat-enter-from,
.chat-leave-to {
  opacity: 0;
  transform: translateY(10px) scale(0.98);
}

.chat-enter-to,
.chat-leave-from {
  opacity: 1;
  transform: scale(1);
}
</style>
