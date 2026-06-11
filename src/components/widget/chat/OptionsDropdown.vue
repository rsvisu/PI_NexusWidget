<script setup>
import MoreVert from '~icons/material-symbols/more-vert'
import config from '@/config/app'
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

function handleNewConversation() {
  closeOptionsMenu()
  widget.showConfirm(
    'Iniciarás una conversación nueva. La anterior no se borrará de nuestros servidores, pero ya no podrás acceder a ella.',
    () => chat.newConversation()
  )
}

function handleForgetData() {
  closeOptionsMenu()
  widget.showConfirm(
    'Esta acción es irreversible. Tu conversación se borrará de nuestros servidores y no podrás recuperarla.',
    () => { widget.toggleOpen(); chat.forgetData(); widget.resetConsent() }
  )
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
  // composedPath atraviesa la frontera del shadow DOM; event.target se reescribiría al elemento host
  const path = event.composedPath()
  if (!path.includes(optionsMenuRef.value)) {
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
          @click="handleNewConversation"
          class="block w-full text-left px-4 py-2 hover:bg-gray-100 cursor-pointer"
        >
          Nueva conversación
        </button>
        <button
          @click="handleForgetData"
          class="block w-full text-left px-4 py-2 hover:bg-gray-100 cursor-pointer"
        >
          Olvidar mis datos
        </button>
        <a
          :href="config.legal.privacyPolicyUrl"
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
