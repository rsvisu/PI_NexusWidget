<script setup>
import { onBeforeUnmount, watch } from 'vue'
import { useWidgetStore } from '@/stores/widget'
import ChatInput from './ChatInput.vue'
import ChatHeader from './ChatHeader.vue'
import ChatBody from './ChatBody.vue'

// Stores
const widget = useWidgetStore()

// Evitar scroll cuando esta maximizado
function setPageScrollLocked(locked) {
  const overflowValue = locked ? 'hidden' : ''
  document.documentElement.style.overflow = overflowValue
  document.body.style.overflow = overflowValue
}

watch(
  () => widget.isMaximized,
  (isMaximized) => {
    setPageScrollLocked(isMaximized)
  },
  { immediate: true },
)

onBeforeUnmount(() => {
  setPageScrollLocked(false)
})
</script>

<template>
  <Transition name="chat">
    <div v-show="widget.isOpen" class="bg-white shadow-xs shadow-black/20 flex flex-col overflow-hidden" :class="widget.isMaximized
      ? 'fixed inset-0 z-50 w-screen h-screen max-w-none rounded-none'
      : 'fixed bottom-28 right-4 w-[calc(100vw-2rem)] max-w-104 h-[min(78vh,44rem)] rounded-2xl'">
      <ChatHeader />
      <!-- Body -->
      <ChatBody />
      <!-- Input -->
      <ChatInput />
    </div>
  </Transition>
</template>

<style>
/* Animation */
.chat-enter-active,
.chat-leave-active {
  transition:
    opacity 0.2s linear,
    transform 0.2s ease;
  transform-origin: bottom right;
}

.chat-enter-from,
.chat-leave-to {
  opacity: 0;
  transform: scale(0);
}

.chat-enter-to,
.chat-leave-from {
  opacity: 1;
  transform: scale(1);
}
</style>
