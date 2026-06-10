<script setup>
defineProps({
  message: {
    type: String,
    required: true,
  },
})

const emit = defineEmits(['confirm', 'cancel'])
</script>

<template>
  <div class="absolute inset-0 flex items-center justify-center z-20 px-6 bg-black/30">
    <div class="bg-white rounded-2xl shadow-xl w-full max-w-xs">
      <p class="text-gray-800 text-center text-balance leading-relaxed px-6 pt-6 pb-5">
        {{ message }}
      </p>
      <div class="flex border-t border-gray-100">
        <button
          type="button"
          class="flex-1 py-3 text-brand font-medium cursor-pointer hover:bg-gray-50 rounded-bl-2xl transition-colors"
          @click="emit('confirm')"
        >
          Sí
        </button>
        <div class="w-px bg-gray-100" />
        <button
          type="button"
          class="flex-1 py-3 text-brand font-medium cursor-pointer hover:bg-gray-50 rounded-br-2xl transition-colors"
          @click="emit('cancel')"
        >
          No
        </button>
      </div>
    </div>
  </div>
</template>
