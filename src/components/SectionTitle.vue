<template>
  <div class="mb-8">
    <p class="tag mb-2">{{ subtitle }}</p>
    <h2 class="text-2xl sm:text-3xl font-bold">{{ title }}</h2>
  </div>
</template>

<script setup>
defineProps({
  title: String,
  subtitle: String
})
</script>
