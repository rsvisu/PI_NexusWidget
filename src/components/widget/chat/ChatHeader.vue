<script setup>
import Maximize from '~icons/gg/maximize-alt'
import Minimize from '~icons/gg/minimize'
import MinimizeFill from '~icons/mingcute/minimize-fill'
// import Close from '~icons/material-symbols/close'
import { useWidgetStore } from '@/stores/widget'
import { useIsMobile } from '@/composables/useIsMobile'
import logoFace from '@/assets/logo-face.svg'
import OptionsDropdown from './OptionsDropdown.vue'

// Stores:
const widget = useWidgetStore()

// Variables:
const isMobile = useIsMobile()

// Funciones:
function handleClose() {
  widget.toggleOpen()
}

function handleMaximize() {
  widget.toggleMaximize()
}
</script>

<template>
  <div class="bg-brand h-20 flex justify-between px-2">
    <!-- Logo -->
    <div class="flex items-center gap-1">
      <img :src="logoFace" alt="Logo" class="size-15" />
      <span class="text-white font-semibold">Nexus</span>
    </div>
    <!-- Actions -->
    <div
      class="flex items-center gap-2 text-white *:size-7 *:p-1 *:cursor-pointer *:hover:text-gray-200 *:rounded-full *:bg-brand-light *:transition-colors *:duration-100"
    >
      <button v-if="!isMobile && !widget.isMaximized" @click="handleMaximize">
        <Maximize />
      </button>

      <button v-if="!isMobile && widget.isMaximized" @click="handleMaximize">
        <Minimize />
      </button>

      <button @click="handleClose">
        <MinimizeFill />
      </button>

      <OptionsDropdown />
    </div>
  </div>
</template>
