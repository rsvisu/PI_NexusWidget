import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useWidgetStore = defineStore('widget', () => {
  const isOpen = ref(false)
  const isMaximized = ref(false)
  const hasConsent = ref(false)

  function toggleOpen() {
    isOpen.value = !isOpen.value
    if (!isOpen.value) {
      isMaximized.value = false
    }
  }

  function toggleMaximize() {
    isMaximized.value = !isMaximized.value
    if (isMaximized.value) {
      isOpen.value = true
    }
  }

  function acceptConsent() {
    hasConsent.value = true
  }

  function resetConsent() {
    hasConsent.value = false
  }

  function forgetData() {
    resetConsent()
  }

  return { isOpen, isMaximized, hasConsent, toggleOpen, toggleMaximize, acceptConsent, resetConsent, forgetData }
}, {
  persist: {
    key: 'nexus/widget',
    pick: ['hasConsent'],
  },
})
