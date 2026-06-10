import { ref } from 'vue'
import { defineStore } from 'pinia'

// # Store:
export const useWidgetStore = defineStore('widget', () => {
  // ## Variables:
  const isOpen = ref(false)
  const isMaximized = ref(false)
  // Solo hasConsent persiste en localStorage; isOpen e isMaximized se reinician en cada sesión
  const hasConsent = ref(false)

  // Estado del diálogo de confirmación
  const confirmDialog = ref({
    show: false,
    message: '',
    onConfirm: null,
  })

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

  function showConfirm(message, onConfirm) {
    confirmDialog.value.show = true
    confirmDialog.value.message = message
    confirmDialog.value.onConfirm = onConfirm
  }

  function hideConfirm() {
    confirmDialog.value.show = false
    confirmDialog.value.message = ''
    confirmDialog.value.onConfirm = null
  }

  return { isOpen, isMaximized, hasConsent, confirmDialog, toggleOpen, toggleMaximize, acceptConsent, resetConsent, showConfirm, hideConfirm }
}, {
  persist: {
    key: 'nexus/widget',
    pick: ['hasConsent'],
  },
})