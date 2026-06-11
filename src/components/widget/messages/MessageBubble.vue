<script setup>
import { computed, ref } from 'vue'
import { marked } from 'marked'
import DOMPurify from 'dompurify'
import CopyIconOutline from '~icons/material-symbols/content-copy-outline'
import CopyIconFilled from '~icons/material-symbols/content-copy'
import ThumbUpOutline from '~icons/material-symbols/thumb-up-outline'
import ThumbUpFilled from '~icons/material-symbols/thumb-up'
import ThumbDownOutline from '~icons/material-symbols/thumb-down-outline'
import ThumbDownFilled from '~icons/material-symbols/thumb-down'

// ## Props:
const props = defineProps({
  message: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
  },
  // id del mensaje en la BD; null para el saludo inicial (no votable)
  messageId: {
    type: Number,
    default: null,
  },
  // Voto actual de este mensaje: 'positive', 'negative' o null
  vote: {
    type: String,
    default: null,
  },
  // Chunks RAG usados para generar la respuesta; null si no hubo contexto
  sources: {
    type: Array,
    default: null,
  },
})

// ## Emits:
const emit = defineEmits(['feedback'])

// ## Variables:
const copied = ref(false)
const isUserMessage = computed(() => props.role === 'user')
// Solo se votan las respuestas del asistente que ya están guardadas en la BD
const canVote = computed(() => !isUserMessage.value && props.messageId !== null)

// ## Funciones de voto:
function castVote(value) {
  // Si ya estaba ese voto activo no hacemos nada
  if (props.vote === value) {
    return
  }
  emit('feedback', value)
}

// ## Clases dinamicas:
const bubbleClasses = computed(() =>
  isUserMessage.value ? 'self-end items-end' : 'self-start items-start',
)

const messageClasses = computed(() =>
  isUserMessage.value
    ? 'bg-brand text-white rounded-br-sm'
    : 'bg-gray-100 text-gray-800 rounded-bl-sm',
)

const copiedClasses = computed(() => (isUserMessage.value ? 'flex-row-reverse' : ''))

// ## Computed:
// Nombres de documento únicos de los chunks RAG que llegaron
const sourceNames = computed(() => {
  if (!props.sources || props.sources.length === 0) {
    return []
  }
  const names = []
  for (const source of props.sources) {
    const name = source.document_name
    if (name && !names.includes(name)) {
      names.push(name)
    }
  }
  return names
})

// Convierte el markdown a HTML para mostrarlo con estilos
const renderedMessage = computed(() => {
  return DOMPurify.sanitize(marked.parse(props.message))
})

// ## Funciones:
// Funcion copiar mensaje
async function copyMessage() {
  try {
    await navigator.clipboard.writeText(props.message)
    copied.value = true
    // Espera de 1200ms para eliminar el mensaje de confirmacion
    globalThis.setTimeout(() => {
      copied.value = false
    }, 1200)
  } catch {
    copied.value = false
  }
}
</script>

<template>
  <div class="group mt-2 max-w-[90%] flex flex-col" :class="bubbleClasses">
    <!-- Message -->
    <div class="wrap-break-word px-4 py-2 rounded-xl shadow-sm" :class="messageClasses">
      <!-- Bot Message -->
      <div
        v-if="!isUserMessage"
        v-html="renderedMessage"
        class="prose max-w-none [&>*:first-child]:mt-0 [&>*:last-child]:mb-0"
      />
      <!-- User Message -->
      <span v-else>{{ message }}</span>
    </div>

    <!-- Fuentes: documentos consultados para generar esta respuesta -->
    <div v-if="!isUserMessage && sourceNames.length > 0" class="mt-1 px-1 text-[11px] text-muted/70">
      <span>Fuente{{ sourceNames.length > 1 ? 's' : '' }}: </span>
      <span v-for="(name, i) in sourceNames" :key="name">
        <span v-if="i > 0"> · </span>{{ name }}
      </span>
    </div>

    <!-- Acciones del mensaje -->
    <!-- Mantenemos visible la barra si hay un voto emitido para que no desaparezca al quitar el ratón -->
    <div
      class="flex items-center gap-2 mt-1 px-1 text-xs text-muted pointer-events-none group-hover:pointer-events-auto transition-opacity"
      :class="[copiedClasses, vote ? 'opacity-100' : 'opacity-0 group-hover:opacity-100']"
    >
      <button
        type="button"
        tabindex="-1"
        class="p-1 rounded hover:bg-gray-200 transition-colors cursor-pointer"
        @click="copyMessage"
      >
        <CopyIconFilled v-if="copied" class="size-4 text-brand" />
        <CopyIconOutline v-else class="size-4" />
      </button>

      <!-- Voto: solo en respuestas del asistente ya guardadas -->
      <template v-if="canVote">
        <button
          type="button"
          tabindex="-1"
          class="p-1 rounded hover:bg-gray-200 transition-colors cursor-pointer"
          :class="vote === 'positive' ? 'text-brand' : ''"
          title="Respuesta útil"
          @click="castVote('positive')"
        >
          <ThumbUpFilled v-if="vote === 'positive'" class="size-4" />
          <ThumbUpOutline v-else class="size-4" />
        </button>
        <button
          type="button"
          tabindex="-1"
          class="p-1 rounded hover:bg-gray-200 transition-colors cursor-pointer"
          :class="vote === 'negative' ? 'text-red-500' : ''"
          title="Respuesta poco útil"
          @click="castVote('negative')"
        >
          <ThumbDownFilled v-if="vote === 'negative'" class="size-4" />
          <ThumbDownOutline v-else class="size-4" />
        </button>
      </template>
    </div>
  </div>
</template>
