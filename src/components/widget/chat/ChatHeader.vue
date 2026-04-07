<script setup>
import Maximize from '~icons/gg/maximize-alt'
import Minimize from '~icons/gg/minimize'
import MinimizeFill from '~icons/mingcute/minimize-fill'
import Close from '~icons/material-symbols/close'
import { useWidgetStore } from '@/stores/widget'

// Stores
const widget = useWidgetStore()

// Funciones
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
      <img src="@/assets/logo_face.svg" alt="Logo" class="size-15" />
      <span class="text-white font-semibold">Nexus</span>
    </div>
    <!-- Actions -->
    <div
      class="flex items-center gap-2 text-white *:size-6 *:cursor-pointer *:hover:text-gray-200 *:transition-colors *:duration-100">
      <Maximize v-if="!widget.isMaximized" @click="handleMaximize" />
      <Minimize v-if="widget.isMaximized" @click="handleMaximize" />
      <MinimizeFill @click="handleClose" />
    </div>
  </div>
</template>
