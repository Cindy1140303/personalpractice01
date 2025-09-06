<template>
  <article
    :style="{ backgroundColor: bg }"
    :class="[
      'rounded-2xl p-6 shadow-sm ring-1 transition',
      isDark ? 'text-white ring-black/10' : 'text-neutral-900 ring-neutral-200/70'
    ]"
  >
    <h3 class="font-semibold text-lg">{{ project.title }}</h3>
    <p class="mt-2" :class="isDark ? 'text-white/90' : 'text-neutral-700'">
      {{ project.description }}
    </p>

    <div class="mt-4 flex flex-wrap gap-2">
      <span
        v-for="t in project.tags"
        :key="t"
        :class="[
          'px-2.5 py-1 rounded-full text-sm ring-1',
          isDark ? 'bg-white/10 text-white/90 ring-white/20' : 'bg-white text-neutral-800 ring-neutral-200'
        ]"
      >
        {{ t }}
      </span>
    </div>
  </article>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  project: { type: Object, required: true },
  // 小卡底色（預設白）
  bg: { type: String, default: '#ffffff' },
})

// 簡單判斷深色或淺色，決定字色與 Tag 樣式
const isDark = computed(() => {
  const hex = (props.bg || '#fff').replace('#', '')
  if (hex.length !== 6) return false
  const r = parseInt(hex.slice(0, 2), 16)
  const g = parseInt(hex.slice(2, 4), 16)
  const b = parseInt(hex.slice(4, 6), 16)
  // 亮度閾值；數字越小越暗
  const luma = 0.2126 * r + 0.7152 * g + 0.0722 * b
  return luma < 160
})
</script>