<script setup>
import MoreVert from '~icons/material-symbols/more-vert'
import { PRIVACY_POLICY_URL } from '@/config/legal'
import { onBeforeUnmount, onMounted, ref } from 'vue'
import { useWidgetStore } from '@/stores/widget'
import { useChatStore } from '@/stores/chat'

// Stores:
const widget = useWidgetStore()
const chat = useChatStore()

// Variables:
const showOptionsMenu = ref(false)

// Referencias al DOM:
const optionsMenuRef = ref(null)

// Funciones:
function toggleOptionsMenu() {
  showOptionsMenu.value = !showOptionsMenu.value
}

function closeOptionsMenu() {
  showOptionsMenu.value = false
}

function handleForgetData() {
  widget.toggleOpen()
  chat.forgetData()
  widget.forgetData()
}

/**
 * Comprueba si el elemento clickado no es ninguno
 * de los elementos dentro del dropdown; y cuando es
 * asi cierra el dropdown
 *
 * Es decir, cierra el dropdown cuando se clicka
 * fuera de el
 * @param event
 */
function handleDocumentClick(event) {
  if (!optionsMenuRef.value.contains(event.target)) {
    closeOptionsMenu()
  }
}

// Ciclo de vida:
onMounted(() => {
  document.addEventListener('click', handleDocumentClick)
})

onBeforeUnmount(() => {
  document.removeEventListener('click', handleDocumentClick)
})
</script>

<template>
  <div class="relative" ref="optionsMenuRef">
    <button class="cursor-pointer" @click="toggleOptionsMenu">
      <MoreVert />
    </button>

    <Transition name="dropdown-fade">
      <div
        v-if="showOptionsMenu"
        class="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10 text-gray-800 overflow-hidden"
      >
        <button
          @click="handleForgetData"
          class="block w-full text-left px-4 py-2 hover:bg-gray-100 cursor-pointer"
        >
          Olvidar mis datos
        </button>
        <a
          :href="PRIVACY_POLICY_URL"
          target="_blank"
          rel="noopener noreferrer"
          class="block w-full text-left px-4 py-2 hover:bg-gray-100 cursor-pointer"
          @click="closeOptionsMenu"
        >
          Politica de privacidad
        </a>
      </div>
    </Transition>
  </div>
</template>

<style scoped>
.dropdown-fade-enter-active,
.dropdown-fade-leave-active {
  transition:
    opacity 0.16s ease,
    transform 0.16s ease;
}

.dropdown-fade-enter-from,
.dropdown-fade-leave-to {
  opacity: 0;
  transform: translateY(-4px) scale(0.98);
}
</style>
