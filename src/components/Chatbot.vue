<script setup>
import ButtonWidget from './widget/ButtonWidget.vue'
import ChatContainer from './widget/chat/ChatContainer.vue'
import { useWidgetStore } from '@/stores/widget'

const widget = useWidgetStore()

function widgetClicked() {
  widget.toggle()
}
</script>

<template>
  <ButtonWidget class="fixed bottom-4 right-4" @click="widgetClicked" />
  <ChatContainer class="fixed bottom-30 right-4" />
</template>
