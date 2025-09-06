<template>
  <!-- 滿版米色底，與固定導覽列錯開 -->
  <section id="pdf-onepager" class="section max-w-none px-0 pt-24 bg-[#EFE6DD] relative">
    <div class="container-p">
      <!-- 外框 -->
      <div class="border border-neutral-700/70 rounded-[2px] bg-[#EFE6DD]">

        <!-- 置頂分頁導覽（可橫向捲動，會高亮目前頁） -->
        <div class="sticky top-14 z-10 bg-[#EFE6DD]/95 backdrop-blur border-b border-neutral-300">
          <div class="container-p py-3">
            <nav class="flex gap-3 overflow-x-auto no-scrollbar text-sm">
              <a
                v-for="(p, i) in pages"
                :key="p.id"
                :href="'#' + p.id"
                class="px-3 py-1 rounded-full ring-1 transition
                       ring-neutral-300 hover:ring-neutral-500"
                :class="activeId === p.id
                  ? 'bg-neutral-900 text-white ring-neutral-900'
                  : 'bg-white text-neutral-700'">
                第 {{ i + 1 }} 頁
              </a>
            </nav>
          </div>
        </div>

        <!-- 逐頁區塊 -->
        <div v-for="(p, i) in pages" :key="p.id" :id="p.id" class="container-p py-10">
          <div class="border border-neutral-700 p-2 bg-white">
            <img
              :src="p.src"
              :alt="`PDF 第 ${i+1} 頁`"
              class="w-full h-auto object-contain"
              loading="lazy"
              decoding="async"
            />
          </div>
        </div>

      </div>
    </div>

    <!-- 回到頂端 -->
    <a href="#pdf-onepager"
       class="hidden md:flex fixed bottom-6 right-6 items-center justify-center
              w-10 h-10 rounded-full ring-1 ring-neutral-300 bg-white/90
              hover:bg-white shadow transition">
      ↑
    </a>
  </section>
</template>

<script setup>
import { onMounted, onBeforeUnmount, ref, computed } from 'vue'

// 自動抓取 src/assets/pdf-pages/ 底下所有圖片，按檔名排序
const mods = import.meta.glob('../assets/pdf-pages/*.{png,jpg,jpeg,webp}', {
  eager: true,
  as: 'url',
})
const pages = computed(() => {
  const entries = Object.entries(mods)
  entries.sort((a, b) => a[0].localeCompare(b[0], undefined, { numeric: true }))
  return entries.map(([path, url], idx) => ({
    id: `p${idx + 1}`,
    src: url,
  }))
})

const activeId = ref(pages.value[0]?.id ?? 'p1')
let observer

onMounted(() => {
  // Scroll-spy：捲到哪一頁就高亮哪一顆
  observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          activeId.value = e.target.id
          // 同時更新網址 hash（可選）
          history.replaceState(null, '', `#${e.target.id}`)
        }
      })
    },
    { rootMargin: '-45% 0px -50% 0px', threshold: [0, 0.2, 0.6, 1] }
  )

  // 觀察每一頁容器
  requestAnimationFrame(() => {
    pages.value.forEach((p) => {
      const el = document.getElementById(p.id)
      if (el) observer.observe(el)
    })
  })
})

onBeforeUnmount(() => {
  if (observer) observer.disconnect()
})
</script>
