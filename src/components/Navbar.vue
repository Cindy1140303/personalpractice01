<template>
  <nav class="fixed top-0 inset-x-0 z-50 backdrop-blur bg-white/70 border-b border-neutral-200">
    <div class="container-p flex items-center justify-between h-16">
      <a href="#top" class="font-bold" @click="active = '#top'">Cindy</a>

      <!-- 桌機 -->
      <div class="hidden sm:flex gap-6 text-sm">
        <a
          v-for="link in links"
          :key="link.href"
          :href="link.href"
          @click="active = link.href"
          :aria-current="isActive(link.href) ? 'page' : undefined"
          :class="isActive(link.href)
            ? 'text-primary-600 underline underline-offset-8'
            : 'hover:text-primary-500'">
          {{ link.label }}
        </a>
      </div>

      <!-- 行動裝置 -->
      <button @click="open = !open" class="sm:hidden p-2 ring-1 ring-neutral-300 rounded-lg">選單</button>
    </div>

    <div v-if="open" class="sm:hidden container-p pb-4">
      <div class="flex flex-col gap-2">
        <a
          v-for="link in links"
          :key="link.href"
          :href="link.href"
          @click="active = link.href; open = false"
          :class="[
            'py-2 border-b',
            isActive(link.href) ? 'text-primary-600 underline underline-offset-8' : ''
          ]">
          {{ link.label }}
        </a>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'

const open = ref(false)
const active = ref('#top')
const links = [
  { label: '作品', href: '#projects' },
  { label: '經歷', href: '#experience' },
  { label: '技能', href: '#skills' },
  { label: '聯絡', href: '#contact' },
]

const isActive = (href) => active.value === href
const setActiveFromHash = () => { active.value = window.location.hash || '#top' }

let observer

onMounted(() => {
  // 1) 依目前網址 hash 初始化
  setActiveFromHash()
  window.addEventListener('hashchange', setActiveFromHash)

  // 2) Scroll-Spy：偵測目前在畫面的區塊
  observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          active.value = `#${entry.target.id}`
        }
      })
    },
    // 讓區塊進到視窗中段就切換
    { rootMargin: '-45% 0px -55% 0px', threshold: [0, 0.2, 0.6, 1] }
  )

  const ids = ['top', 'projects', 'experience', 'skills', 'contact']
  ids.forEach((id) => {
    const el = document.getElementById(id)
    if (el) observer.observe(el)
  })
})

onBeforeUnmount(() => {
  window.removeEventListener('hashchange', setActiveFromHash)
  if (observer) observer.disconnect()
})
</script>
