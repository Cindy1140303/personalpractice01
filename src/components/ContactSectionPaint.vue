<template>
  <!-- 綠底：和你提供的背景一致 -->
  <section id="contact" class="section max-w-none px-0 bg-[#cfdab7] relative overflow-hidden">
    <div class="container-p">
      <div class="relative border border-neutral-700/70 rounded-[2px]">

        <!-- 動態米黃刷痕（在內容下方） -->
        <div
          ref="paintEl"
          class="absolute inset-4 sm:inset-6 lg:inset-8 pointer-events-none z-0 brush"
          :style="brushStyle"
          :class="{ 'is-on': painted }"
        ></div>

        <!-- 內容（在刷痕上層） -->
        <div class="relative z-10 grid lg:grid-cols-[1fr_36rem] gap-8 lg:gap-10 p-8 lg:p-12">
          <!-- 左：標題／說明／聯絡＆社群 -->
          <div class="space-y-8">
            <h2 class="text-4xl sm:text-5xl font-extrabold tracking-tight text-neutral-900">
              聯絡我
            </h2>

            <div class="prose max-w-none text-neutral-800">
              <p>有合作、教學或專案想法，都歡迎來信或私訊社群。我會在 1–2 個工作天內回覆。</p>
            </div>

            <div class="space-y-2 text-neutral-900">
              <div class="font-medium">
                Email：
                <a :href="`mailto:${email}`" class="underline underline-offset-4 hover:no-underline">
                  {{ email }}
                </a>
              </div>
              <div v-if="location">地點：{{ location }}</div>
              <div class="text-neutral-700">@{{ handle }}</div>
            </div>

            <div class="flex items-center gap-4">
              <a v-for="s in socials" :key="s.label" :href="s.href" target="_blank" rel="noopener"
                 class="w-10 h-10 rounded-md ring-1 ring-neutral-400/70 hover:ring-neutral-800
                        flex items-center justify-center transition"
                 :aria-label="s.label">
                <!-- IG / FB / X / IN -->
                <svg v-if="s.icon==='ig'" viewBox="0 0 24 24" class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="1.8">
                  <rect x="3" y="3" width="18" height="18" rx="5"></rect><circle cx="12" cy="12" r="4"></circle><circle cx="17.5" cy="6.5" r="1"></circle>
                </svg>
                <svg v-else-if="s.icon==='fb'" viewBox="0 0 24 24" class="w-5 h-5" fill="currentColor">
                  <path d="M13 3h4a1 1 0 0 1 1 1v3h-3c-.6 0-1 .4-1 1v3h4l-.5 4H14v7h-4v-7H7v-4h3V8a5 5 0 0 1 5-5z"/>
                </svg>
                <svg v-else-if="s.icon==='tw'" viewBox="0 0 24 24" class="w-5 h-5" fill="currentColor">
                  <path d="M22 5.8c-.7.3-1.5.6-2.3.7.8-.5 1.4-1.2 1.7-2.1-.8.5-1.7.8-2.6 1-1.6-1.6-4.3-1-5.3 1.1-.5 1-.4 2.2.1 3.1-3.3-.2-6.2-1.7-8.2-4.2-1.1 2 .1 4.6 2.2 5.6-.6 0-1.2-.2-1.8-.5 0 2.1 1.5 3.9 3.6 4.3-.5.1-1 .2-1.5.1.4 1.6 1.9 2.8 3.6 2.8A8.5 8.5 0 0 1 2 19.1 12 12 0 0 0 8.3 21c7.5 0 11.7-6.4 11.5-12 0-.2 0-.3 0-.5.8-.5 1.5-1.2 2.2-2.0z"/>
                </svg>
                <svg v-else-if="s.icon==='in'" viewBox="0 0 24 24" class="w-5 h-5" fill="currentColor">
                  <path d="M4.98 3.5C4.98 4.6 4.1 5.5 3 5.5S1.02 4.6 1.02 3.5 1.9 1.5 3 1.5s1.98.9 1.98 2zM2 8h2v12H2zM8 8h2v1.7h.1C10.7 8.8 12 8 13.8 8 18 8 18 10.8 18 14.2V20h-2v-5.2c0-1.2 0-2.8-1.7-2.8S12 13.2 12 14.7V20h-2V8z"/>
                </svg>
              </a>
            </div>
          </div>

          <!-- 右：白底表單（內框） -->
          <div class="bg-white border border-neutral-700 p-5 sm:p-6">
            <form @submit.prevent="onSubmit" class="space-y-4">
              <label class="block">
                <span class="text-sm text-neutral-600">您的名字</span>
                <input v-model="form.name" required
                       class="mt-1 w-full rounded-xl ring-1 ring-neutral-300 px-3 py-2
                              focus:outline-none focus:ring-2 focus:ring-neutral-800"
                       placeholder="你的稱呼" />
              </label>
              <label class="block">
                <span class="text-sm text-neutral-600">Email</span>
                <input v-model="form.email" type="email" required
                       class="mt-1 w-full rounded-xl ring-1 ring-neutral-300 px-3 py-2
                              focus:outline-none focus:ring-2 focus:ring-neutral-800"
                       placeholder="you@mail.com" />
              </label>
              <label class="block">
                <span class="text-sm text-neutral-600">訊息</span>
                <textarea v-model="form.message" rows="5" required
                          class="mt-1 w-full rounded-xl ring-1 ring-neutral-300 px-3 py-2
                                 focus:outline-none focus:ring-2 focus:ring-neutral-800"
                          placeholder="想聊的內容"></textarea>
              </label>

              <button class="btn bg-neutral-900 text-white ring-neutral-900 hover:ring-neutral-700">
                送出
              </button>

              <p v-if="sent" class="text-green-700">已送出（此為前端示範，可串接表單服務或後端）。</p>
            </form>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { reactive, ref, onMounted, onBeforeUnmount, computed } from 'vue'
import brush from '../assets/brush-stroke.png' // 你的刷痕 PNG

// props（可用你的 site 資料帶入）
const props = defineProps({
  email:   { type: String, default: 'hello@example.com' },
  handle:  { type: String, default: 'reallygreatsite' },
  location:{ type: String, default: '' },
  socials: { type: Array,  default: () => ([
    { label: 'Instagram', icon: 'ig', href: '#' },
    { label: 'Facebook',  icon: 'fb', href: '#' },
    { label: 'Twitter',   icon: 'tw', href: '#' },
    { label: 'LinkedIn',  icon: 'in', href: '#' },
  ])}
})

const form = reactive({ name: '', email: '', message: '' })
const sent = ref(false)
const onSubmit = () => { sent.value = true; console.log('Contact form:', { ...form }) }

// 刷痕背景樣式
const brushStyle = computed(() => ({
  backgroundImage: `url(${brush})`,
}))

// 進場觸發動畫
const painted = ref(false)
const paintEl = ref(null)
let io
onMounted(() => {
  io = new IntersectionObserver(
    ([entry]) => { if (entry.isIntersecting) painted.value = true },
    { rootMargin: '0px 0px -30% 0px', threshold: 0.2 }
  )
  if (paintEl.value) io.observe(paintEl.value)
})
onBeforeUnmount(() => { if (io && paintEl.value) io.unobserve(paintEl.value) })
</script>

<style scoped>
/* 刷痕進場動畫：由右向左揭露 */
.brush {
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  opacity: .96;
  /* 初始完全被遮住（從右邊開始揭露） */
  clip-path: inset(0 100% 0 0);
}
.brush.is-on {
  animation: reveal-x 1.2s cubic-bezier(.22,.9,.26,1) forwards;
}
/* 微晃動（更像手刷痕跡） */
@media (prefers-reduced-motion: no-preference) {
  .brush.is-on {
    animation: reveal-x 1.2s cubic-bezier(.22,.9,.26,1) forwards,
               wiggle 7s ease-in-out 1.2s infinite alternate;
  }
}
@keyframes reveal-x {
  from { clip-path: inset(0 100% 0 0); }
  to   { clip-path: inset(0 0    0 0); }
}
@keyframes wiggle {
  from { transform: translateY(0) rotate(0deg) scale(1); }
  to   { transform: translateY(-2px) rotate(-0.2deg) scale(1.01); }
}
</style>
