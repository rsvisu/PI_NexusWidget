<script setup>
const props = defineProps({
  open: {
    type: Boolean,
    default: false,
  },
})
</script>

<template>
  <Transition>
    <div class="bg-white w-95 h-150 shadow-xs shadow-black/20" v-if="props.open">
      <p>hola</p>
    </div>
  </Transition>
</template>

<style>
.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
