<script setup>
import { onMounted } from 'vue'
import ButtonWidget from './widget/ButtonWidget.vue'
import ChatContainer from './widget/chat/ChatContainer.vue'
import { useWidgetStore } from '@/stores/widget'
import { useChatStore } from '@/stores/chat'
import { useIsMobile } from '../composables/useIsMobile'

// Stores:
const widget = useWidgetStore()
const chat = useChatStore()

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

// Ciclo de vida:
// Cargamos el saludo configurado antes del historial para que ya esté listo al pintar los mensajes
onMounted(async () => {
  await chat.loadWidgetConfig()
  chat.loadMessages()
})

</script>

<template>
  <ButtonWidget class="fixed bottom-4 right-4 z-[9999]" @click="handleClick" />
  <Transition name="chat">
    <ChatContainer v-show="widget.isOpen" class="bg-white shadow-xs shadow-black/20 flex flex-col overflow-hidden"
      :class="widget.isMaximized
        ? 'fixed inset-0 z-[9999] w-screen h-screen max-w-none rounded-none'
        : 'fixed bottom-28 right-4 z-[9999] w-[calc(100vw-2rem)] max-w-104 h-[min(78vh,44rem)] rounded-2xl'" />
  </Transition>
</template>
