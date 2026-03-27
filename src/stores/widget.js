import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useWidgetStore = defineStore('widget', () => {
  const open = ref(false)
  function toggle() {
    open.value = !open.value
  }

  return { open, toggle }
})
