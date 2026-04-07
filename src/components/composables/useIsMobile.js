import { computed } from 'vue'

export function useIsMobile() {
  const isMobile = computed(() => {
  return window.innerWidth <= 760;
})

  return isMobile
}
