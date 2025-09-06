<template>
  <!-- 滿版底色 + 與固定導覽列錯開的上邊距 -->
  <section id="top" class="section max-w-none px-0 pt-24 bg-[#EFE6DD]">
    <div class="container-p">
      <!-- 外框 -->
      <div class="border border-neutral-500 rounded-sm">
        <div class="grid lg:grid-cols-[1fr_36rem] gap-8 lg:gap-10 p-8 lg:p-12">

          <!-- 左邊：文字 -->
          <div class="space-y-8">
            <!-- 大標題（名字） -->
            <h1 class="text-5xl sm:text-6xl font-extrabold tracking-tight text-neutral-900">
              {{ name }}
            </h1>

            <!-- 副標／自我介紹 -->
            <p class="text-xl leading-relaxed text-neutral-800 max-w-2xl">
              {{ intro }}
            </p>

            <!-- 帳號 -->
            <p class="font-semibold text-neutral-700">@{{ handle }}</p>

            <!-- 社群 icon 列 -->
            <div class="flex items-center gap-4">
              <a v-for="s in socials" :key="s.label" :href="s.href" target="_blank" rel="noopener"
                 class="w-10 h-10 rounded-md ring-1 ring-neutral-400/70 hover:ring-neutral-700 flex items-center justify-center transition"
                 :aria-label="s.label">
                <!-- 極簡 SVG：Instagram / Facebook / Twitter / LinkedIn -->
                <svg v-if="s.icon === 'ig'" viewBox="0 0 24 24" class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="1.8">
                  <rect x="3" y="3" width="18" height="18" rx="5"></rect>
                  <circle cx="12" cy="12" r="4"></circle>
                  <circle cx="17.5" cy="6.5" r="1"></circle>
                </svg>
                <svg v-else-if="s.icon === 'fb'" viewBox="0 0 24 24" class="w-5 h-5" fill="currentColor">
                  <path d="M13 3h4a1 1 0 0 1 1 1v3h-3c-.6 0-1 .4-1 1v3h4l-.5 4H14v7h-4v-7H7v-4h3V8a5 5 0 0 1 5-5z"/>
                </svg>
                <svg v-else-if="s.icon === 'tw'" viewBox="0 0 24 24" class="w-5 h-5" fill="currentColor">
                  <path d="M22 5.8c-.7.3-1.5.6-2.3.7.8-.5 1.4-1.2 1.7-2.1-.8.5-1.7.8-2.6 1-1.6-1.6-4.3-1-5.3 1.1-.5 1-.4 2.2.1 3.1-3.3-.2-6.2-1.7-8.2-4.2-1.1 2 .1 4.6 2.2 5.6-.6 0-1.2-.2-1.8-.5 0 2.1 1.5 3.9 3.6 4.3-.5.1-1 .2-1.5.1.4 1.6 1.9 2.8 3.6 2.8A8.5 8.5 0 0 1 2 19.1 12 12 0 0 0 8.3 21c7.5 0 11.7-6.4 11.5-12 0-.2 0-.3 0-.5.8-.5 1.5-1.2 2.2-2.0z"/>
                </svg>
                <svg v-else-if="s.icon === 'in'" viewBox="0 0 24 24" class="w-5 h-5" fill="currentColor">
                  <path d="M4.98 3.5C4.98 4.6 4.1 5.5 3 5.5S1.02 4.6 1.02 3.5 1.9 1.5 3 1.5s1.98.9 1.98 2zM2 8h2v12H2zM8 8h2v1.7h.1C10.7 8.8 12 8 13.8 8 18 8 18 10.8 18 14.2V20h-2v-5.2c0-1.2 0-2.8-1.7-2.8S12 13.2 12 14.7V20h-2V8z"/>
                </svg>
              </a>
            </div>
          </div>

          <!-- 右邊：照片（有邊框像畫框） -->
          <div class="relative">
            <div class="border border-neutral-700 p-2">
              <img :src="photo" :alt="`${name} 的照片`"
                   class="w-full aspect-[4/3] object-cover" />
            </div>
          </div>

        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { site } from '../data/site'

const props = defineProps({
  name:   { type: String, default: site?.name ?? '你的名字' },
  intro:  { type: String, default: site?.about?.intro ?? '你的簡介...' },
  handle: { type: String, default: 'reallygreatsite' },
  photo:  { type: String, default: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=1600&auto=format&fit=crop' },
  socials:{ type: Array,  default: () => ([
    { label: 'Instagram', icon: 'ig', href: '#' },
    { label: 'Facebook',  icon: 'fb', href: '#' },
    { label: 'Twitter',   icon: 'tw', href: '#' },
    { label: 'LinkedIn',  icon: 'in', href: '#' },
  ])}
})
</script>
