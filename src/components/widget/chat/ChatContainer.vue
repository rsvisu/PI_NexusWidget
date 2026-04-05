<script setup>
import { useWidgetStore } from '@/stores/widget'
import ChatInput from './ChatInput.vue'
import ChatHeader from './ChatHeader.vue'
import ChatBody from './ChatBody.vue'

// Stores
const widget = useWidgetStore()
</script>

<template>
  <Transition name="chat">
    <div class="w-95 h-150 bg-white shadow-xs shadow-black/20 flex flex-col" v-show="widget.open">
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
