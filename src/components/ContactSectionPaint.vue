<template>
  <section id="contact" class="section max-w-none px-0 bg-[#cfdab7] relative overflow-hidden">
    <div class="container-p">
      <!-- 外框容器：relative 讓刷痕能絕對定位在這個框內 -->
      <div class="relative border-neutral-700/70 rounded-[2px]">
        
        <!-- ✅ 刷痕層：在外框內、在內容之下、在綠底之上 -->
        <!-- 邊距對齊你的內距：左右跟 p-8 / lg:p-12 對齊，放在框內底部 -->
        <div
          class="absolute lg:top-28 h-[620px] w-full max-w-[1600px] pointer-events-none z-0 brush"
          :class="{ 'is-on': painted }"
          :style="brushStyle"
          aria-hidden="true"
        ></div>

        <!-- ✅ 哨兵（在正常文件流裡，IO 觀測它） -->
        <div ref="paintSentinel" class="h-px w-full"></div>

        <!-- 內容層：一定在刷痕上方 -->
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
                <!-- icons 省略，沿用你原本的 -->
              </a>
            </div>
          </div>

          <!-- 右：白底表單（內框） -->
          <div class="bg-white border border-neutral-700 p-5 sm:p-6 rounded-lg border-[#cfdab7]">
            <form @submit.prevent="onSubmit" class="space-y-4">
              <!-- 表單欄位沿用你原本的 -->
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

// props
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

// 表單
const form = reactive({ name: '', email: '', message: '' })
const sent = ref(false)
const onSubmit = () => { sent.value = true; console.log('Contact form:', { ...form }) }

// 刷痕背景樣式
import brush from '../assets/brush-stroke.png'
const brushStyle = computed(() => ({
  backgroundImage: `url(${brush})`,
  backgroundRepeat: 'no-repeat',
  backgroundPosition: 'center bottom', // 底部對齊比較像刷痕從下方延展
  backgroundSize: 'cover',
  transform: 'scale(1.55)'
}))

// 進場觸發動畫（觀測哨兵，而非刷痕本體）
const painted = ref(false)
const paintSentinel = ref(null)
let io
// 可重播動畫的小工具：先關、等一幀、再打開
const playBrush = () => {
  painted.value = false
  requestAnimationFrame(() => {
    requestAnimationFrame(() => { painted.value = true })
  })
}

onMounted(() => {
  // 1) 點到表頭「聯絡」時觸發
  const onGoContact = () => playBrush()
  window.addEventListener('go-contact', onGoContact)

  // 2) 直接用網址進來帶 #contact，也觸發一次
  const onHash = () => { if (location.hash === '#contact') playBrush() }
  window.addEventListener('hashchange', onHash)
  onHash() // 初始載入檢查一次

  onBeforeUnmount(() => {
    window.removeEventListener('go-contact', onGoContact)
    window.removeEventListener('hashchange', onHash)
  })
})
onBeforeUnmount(() => { if (io && paintSentinel.value) io.unobserve(paintSentinel.value) })
</script>

<style scoped>
/* 刷痕：預設被遮住（從右往左揭露） */
.brush {
  clip-path: inset(0 100% 0 0);
  opacity: .96;
  transform: 'scale(1.55)';
}
.brush.is-on {
  animation: reveal-x 1.2s cubic-bezier(.22,.9,.26,1) forwards,
             wiggle 7s ease-in-out 1.2s infinite alternate;
}

@keyframes reveal-x {
  from { clip-path: inset(0 100% 0 0); }
  to   { clip-path: inset(0 0    0 0); }
}
@keyframes wiggle {
  from {
    transform: scale(1.55) translateY(0) rotate(0deg);
  }
  to {
    transform: scale(1.55) translateY(-2px) rotate(-0.2deg);
  }
}
</style>
