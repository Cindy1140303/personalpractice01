<template>
  <!-- 奶油米底 + 裝飾圓 -->
  <section id="about" class="section max-w-none px-0 bg-[#FAF6ED] relative overflow-hidden">
    <div class="container-p grid lg:grid-cols-[1.2fr_1fr] items-center gap-10 py-16 relative z-10">

      <!-- 左側：標題／橫線／內文／亮點 -->
      <div>


        <h2 class="text-[#9B5D1E] font-extrabold tracking-wide text-4xl md:text-5xl xl:text-6xl">
          {{ title }}
        </h2>

        <div class="mt-6 h-[3px] w-[72%] rounded-full
                    bg-gradient-to-r from-[#E5B07A] via-[#E29854] to-transparent"></div>

        <p v-if="intro" class="mt-10 text-lg leading-relaxed text-neutral-800 max-w-3xl">
          {{ intro }}
        </p>

        <ul v-if="highlights?.length" class="mt-6 list-disc pl-5 space-y-1 text-neutral-800">
          <li v-for="h in highlights" :key="h">{{ h }}</li>
        </ul>
      </div>

      <!-- 右側：圓形圖片（未提供就顯示 placeholder） -->
      <div class="flex justify-end">
        <div
          class="relative w-[320px] sm:w-[380px] lg:w-[520px] aspect-square
                 rounded-full overflow-hidden bg-white/60
                 ring-[3px] ring-[#E29854] shadow-[6px_6px_0_0_#E5B07A]
                 mr-[-24px] sm:mr-[-40px] lg:mr-[-72px]"  ><!-- 新增：往右推 -->
        
          <img
            v-if="photo"
            :src="photo"
            alt="我的照片"
            class="w-full h-full object-cover rounded-full"
          />
          <div v-else class="w-full h-full flex items-center justify-center text-3xl text-red-500/70 select-none">
            image
          </div>
        </div>
      </div>
    </div>

    <!-- 裝飾圓 -->
    <div class="pointer-events-none absolute -right-8 -top-5 w-56 h-56 rounded-full bg-[#DDC692] ring-2 ring-neutral-300/50 bounce-in-ball"></div>
    <div class="pointer-events-none absolute right-[82%] top-[35%] w-36 h-36 rounded-full ring-2 ring-neutral-300/60"></div>
  </section>
</template>

<script setup>
defineProps({
  title: { type: String, default: '關於我' },
  intro: { type: String, default: '' },
  highlights: { type: Array, default: () => [] },
  /** 傳圖片路徑即可，自動裁成圓形；不傳時顯示 "image" 文字 */
  photo: { type: String, default: '' },
})
</script>
