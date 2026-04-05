<script setup>
import AssistantBubble from './AssistantBubble.vue';
import UserBubble from './UserBubble.vue';


// Props
const props = defineProps({
  message: {
    type: String,
    required: true,
  },
  senderType: {
    type: String,
    required: true,
  },
})
</script>
<template>
  <UserBubble class="mt-2" v-if="senderType === 'user'" :message="props.message" />
  <AssistantBubble class="mt-2" v-else :message="props.message" />
</template>
