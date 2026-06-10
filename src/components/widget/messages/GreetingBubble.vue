<script setup>
import { computed } from 'vue'
import { marked } from 'marked'
import DOMPurify from 'dompurify'

// ## Props:
const props = defineProps({
  message: {
    type: String,
    required: true,
  },
  suggestions: {
    type: Array,
    default: () => [],
  },
})

// ## Emits:
const emit = defineEmits(['suggestion-click'])

// ## Computed:
const renderedMessage = computed(() => {
  return DOMPurify.sanitize(marked.parse(props.message))
})
</script>

<template>
  <div class="mt-2 mb-7 max-w-[90%] self-start flex flex-col gap-2.5">
    <!-- Burbuja del saludo -->
    <div class="wrap-break-word px-4 py-2 rounded-xl rounded-bl-sm shadow-sm bg-gray-100 text-gray-800">
      <div
        v-html="renderedMessage"
        class="prose max-w-none [&>*:first-child]:mt-0 [&>*:last-child]:mb-0"
      />
    </div>

    <!-- Sugerencias clicables, pegadas al saludo -->
    <div v-if="suggestions.length > 0" class="flex flex-wrap gap-2">
      <button
        v-for="suggestion in suggestions"
        :key="suggestion"
        type="button"
        class="text-sm px-3 py-1.5 rounded-full border border-brand text-brand hover:bg-brand hover:text-white transition-colors cursor-pointer"
        @click="emit('suggestion-click', suggestion)"
      >
        {{ suggestion }}
      </button>
    </div>
  </div>
</template>
