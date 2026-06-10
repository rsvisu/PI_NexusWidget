import { ref } from 'vue'
import { defineStore } from 'pinia'

// # Store:
export const useWidgetStore = defineStore('widget', () => {
  // ## Variables:
  const isOpen = ref(false)
  const isMaximized = ref(false)
  // Solo hasConsent persiste en localStorage; isOpen e isMaximized se reinician en cada sesión
  const hasConsent = ref(false)

  // ## Funciones:
  function toggleOpen() {
    isOpen.value = !isOpen.value
    // Al cerrar, colapsamos también el maximizado
    if (!isOpen.value) {
      isMaximized.value = false
    }
  }

  function toggleMaximize() {
    isMaximized.value = !isMaximized.value
    // Maximizar implica que el widget esté abierto
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

  return { isOpen, isMaximized, hasConsent, toggleOpen, toggleMaximize, acceptConsent, resetConsent }
}, {
  persist: {
    key: 'nexus/widget',
    pick: ['hasConsent'],
  },
})