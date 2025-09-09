<template>
  <footer class="section-footer pt-8">
    <div class="border-t pt-8 text-sm text-neutral-600 container-p flex items-center justify-between">
      <p>© {{ new Date().getFullYear() }} {{ name }} · All rights reserved.</p>
      <a href="#top" class="underline underline-offset-4">Back to top ↑</a>
    </div>
  </footer>
</template>

<script setup>
const name = "Cindy"
</script>
