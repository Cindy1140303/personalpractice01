<template>
  <article
    :style="{ backgroundColor: bg }"
    :class="[
      // base
      'rounded-lg p-6 ring-1 shadow-sm',
      // 新增卡片尺寸
      'w-80 h-[300px]',
      // 動畫（hover/鍵盤 focus 都有微動）
      'transition-all duration-300 ease-out transform-gpu will-change-transform',
      'hover:-translate-y-1 hover:shadow-lg hover:shadow-black/10',
      'focus-within:-translate-y-1',
      // 深淺色對應字色與邊框/hover 邊框
      isDark
        ? 'text-white ring-white/20 hover:ring-white/30'
        : 'text-neutral-900 ring-neutral-200/70 hover:ring-neutral-300',
      // 若使用者選擇降低動態，關閉過度
      'motion-reduce:transition-none'
    ]"
    tabindex="0"
  >
    <!-- 讓鍵盤也能觸發 focus-within 微動；不需要可移除 tabindex -->
    <h3 class="font-semibold text-lg">{{ project.title }}</h3>

    <p class="mt-2" :class="isDark ? 'text-white/90' : 'text-neutral-700'">
      {{ project.description }}
    </p>

    <!--<div class="mt-4 flex flex-wrap gap-2">
      <span
        v-for="t in project.tags"
        :key="t"
        :class="[
          'px-2.5 py-1 rounded-full text-sm ring-1 transition-colors',
          isDark
            ? 'bg-white/10 text-white/90 ring-white/20 hover:bg-white/15'
            : 'bg-white text-neutral-800 ring-neutral-200 hover:bg-neutral-50'
        ]"
      >
        {{ t }}
      </span>
    </div>-->
  </article>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  project: { type: Object, required: true },
  bg: { type: String, default: '#ffffff' },
})

const isDark = computed(() => {
  const hex = (props.bg || '#fff').replace('#', '')
  if (hex.length !== 6) return false
  const r = parseInt(hex.slice(0, 2), 16)
  const g = parseInt(hex.slice(2, 4), 16)
  const b = parseInt(hex.slice(4, 6), 16)
  const luma = 0.2126 * r + 0.7152 * g + 0.0722 * b
  return luma < 160
})
</script>
