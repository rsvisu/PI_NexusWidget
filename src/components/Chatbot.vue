<script setup>
import { ref } from 'vue'
import ButtonWidget from './widget/ButtonWidget.vue'
import ChatContainer from './widget/ChatContainer.vue'

let chatOpen = ref(false)

function widgetClicked() {
  chatOpen.value = !chatOpen.value
}
</script>

<template>
  <ButtonWidget class="fixed bottom-4 right-4" @click="widgetClicked" />
  <ChatContainer class="fixed bottom-30 right-4" :open="chatOpen" />
</template>
