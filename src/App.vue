<script setup>
import Navbar from './components/Navbar.vue'
import AboutIntro from './components/AboutIntro.vue'
import SectionTitle from './components/SectionTitle.vue'
import ProjectCard from './components/ProjectCard.vue'
import ContactSectionPaint from './components/ContactSectionPaint.vue'
import Footer from './components/Footer.vue'
import { site } from './data/site'

// 作品卡片的配色（棕金、墨綠、近黑）
const projectColors = ['#BA8A4D', '#283926', '#111111']
</script>

<template>
  <div>
    <Navbar />
    <!-- 頂部：PDF 各頁拼成一整頁 -->
     <AboutIntro
        title="關於我"
        :intro="site.about.intro"
        :highlights="site.about.highlights"
        :photo="site.about.photo || ''"
      />


    <!-- 作品 Projects（奶油米色背景 + 棕色標題 + 三色小卡） -->
    <section id="projects" class="section max-w-none px-0 bg-[#EFE6DD]">
      <div class="container-p px-10 h-200">
        <!-- 標題區 -->
        <div class="text-center mb-10">

          <h2 class="mt-3 text-4xl sm:text-5xl font-extrabold tracking-wider text-[#9B5D1E]">
            專案展示
          </h2>
        </div>

        <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <ProjectCard
            v-for="(p, i) in site.projects"
            :key="p.title"
            :project="p"
            :bg="p.bg || projectColors[i % projectColors.length]"
          />
        </div>
      </div>
    </section>

    <!-- 經歷 Experience -->
    <section id="experience" class="section">
      <SectionTitle title="經歷 Experience" subtitle="做過與正在做的事" />
      <ol class="relative border-s border-neutral-200 ps-4">
        <li v-for="e in site.experience" :key="e.title" class="mb-10 ms-4">
          <span class="absolute -start-1.5 mt-1 w-3 h-3 bg-primary-400 rounded-full ring-4 ring-primary-50"></span>
          <h3 class="text-lg font-semibold">{{ e.title }}</h3>
          <time class="text-sm text-neutral-500">{{ e.time }}</time>
          <p class="mt-2 text-neutral-700">{{ e.detail }}</p>
        </li>
      </ol>
    </section>

    <!-- 技能 Skills -->
    <section id="skills" class="section">
      <SectionTitle title="技能 Skills" subtitle="把工具用到剛剛好" />
      <div class="flex flex-wrap gap-3">
        <span v-for="s in site.skills" :key="s" class="tag">{{ s }}</span>
      </div>
    </section>

    <!-- 聯絡 Contact（綠底＋動態米黃刷痕；元件內已處理動畫與表單） -->
    <ContactSectionPaint
      :email="site.email"
      :location="site.location"
      :socials="site.social"
    />

    <Footer />
  </div>
</template>
