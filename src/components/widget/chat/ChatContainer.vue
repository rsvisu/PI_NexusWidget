<script setup>
import { onBeforeUnmount, watch } from 'vue'
import { useWidgetStore } from '@/stores/widget'
import ChatInput from './ChatInput.vue'
import ChatHeader from './ChatHeader.vue'
import ChatBody from './ChatBody.vue'

// Stores:
const widget = useWidgetStore()

// Funciones:
// Evitar scroll de página cuando el widget esta maximizado
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
  <div>
    <ChatHeader />
    <ChatBody />
    <ChatInput />
  </div>
</template>
