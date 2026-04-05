<script setup>
import Minimize from '~icons/mingcute/minimize-fill'
import Maximize from '~icons/gg/maximize-alt'
import Close from '~icons/material-symbols/close'
import { useWidgetStore } from '@/stores/widget'

// Stores
const widget = useWidgetStore()

// Funciones
function handleClose() {
  widget.toggle()
}
</script>

<template>
  <div class="bg-brand h-20 flex justify-between px-2">
    <!-- Logo -->
    <div class="flex items-center gap-1">
      <img src="@/assets/logo_face.svg" alt="Logo" class="size-15" />
      <span class="text-white font-semibold">Nexus</span>
    </div>
    <!-- Actions -->
    <div
      class="flex items-center gap-2 text-white *:size-6 *:cursor-pointer *:hover:text-gray-200 *:transition-colors *:duration-100"
    >
      <!-- <Minimize /> -->
      <Maximize />
      <Close @click="handleClose" />
    </div>
  </div>
</template>
