<script setup>
// Props
const props = defineProps({
  message: {
    type: String,
    required: true,
  }
})
</script>
<template>
  <div class="bg-gray-400 text-white wrap-break-word px-4 py-2 max-w-[90%] self-end rounded-xs">
    {{ props.message }}
  </div>
</template>


