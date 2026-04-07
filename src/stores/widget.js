import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useWidgetStore = defineStore('widget', () => {
  const isOpen = ref(false)
  const isMaximized = ref(false)

  function toggleOpen() {
    isOpen.value = !isOpen.value
    isMaximized.value = false
  }

  function toggleMaximize() {
    isMaximized.value = !isMaximized.value
  }

  return { isOpen, isMaximized, toggleOpen, toggleMaximize }
})
