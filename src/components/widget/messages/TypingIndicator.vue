<script setup>
const dotClasses = 'size-2 rounded-full bg-gray-400 animate-bounce'
</script>

<template>
  <div class="mt-2 max-w-[90%] flex flex-col self-start items-start">
    <div class="px-4 py-3 rounded-xl rounded-bl-sm bg-gray-100 shadow-sm">
      <div class="flex items-center gap-1.5">
        <span :class="dotClasses" class="[animation-delay:-0.3s]"></span>
        <span :class="dotClasses" class="[animation-delay:-0.15s]"></span>
        <span :class="dotClasses"></span>
      </div>
    </div>
  </div>
</template>
