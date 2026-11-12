<script setup>
import CourseHeader from '../components/course/CourseHeader.vue'
import CourseSidebar from '../components/course/CourseSidebar.vue'
import LessonTabs from '../components/course/LessonTabs.vue'
import LessonScreen from '../components/course/LessonScreen.vue'
import LessonNavigation from '../components/course/LessonNavigation.vue'
import { useCourseNavigation } from '../composables/useCourseNavigation'
import WelcomeView from './WelcomeView.vue'
import EventsLabView from './EventsLabView.vue'
import StudentView from './StudentView.vue'
import FormWorkshopView from './FormWorkshopView.vue'

const {
  lessons, lessonIndex, screenIndex, demo, laboratory, student, formWorkshop, heading,
  lesson, screen, position, go, move,
} = useCourseNavigation()
const totalScreens = lessons.reduce((total, item) => total + item.screens.length, 0)
</script>

<template>
  <FormWorkshopView v-if="formWorkshop" />
  <StudentView v-else-if="student" />
  <EventsLabView v-else-if="laboratory" />
  <template v-else-if="demo">
    <div class="demo-return">
      <v-btn color="primary" @click="go(lessonIndex, screenIndex)">← Voltar às aulas</v-btn>
    </div>
    <WelcomeView />
  </template>
  <v-app v-else>
    <a class="skip-link" href="#conteudo">Pular para o conteúdo</a>
    <CourseHeader />
    <v-main>
      <div class="course-layout">
        <CourseSidebar :lessons="lessons" :lesson-index="lessonIndex" @select="go" />
        <main id="conteudo" class="lesson-content">
          <div class="lesson-meta">
            <span
              >ENCONTRO {{ String(lessonIndex + 1).padStart(2, '0') }} /
              {{ String(lessons.length).padStart(2, '0') }}</span
            >
            <span>{{ lesson.weekday }} · {{ lesson.date }}/2026 · 120 min</span>
          </div>
          <h1 class="lesson-title">{{ lesson.title }}</h1>
          <p class="lesson-summary">{{ lesson.summary }}</p>
          <LessonTabs
            :screens="lesson.screens"
            :screen-index="screenIndex"
            @select="go(lessonIndex, $event)"
          />
          <LessonScreen
            :key="lessonIndex + '-' + screenIndex"
            ref="heading"
            :screen="screen"
            :screen-index="screenIndex"
            :screen-count="lesson.screens.length"
            :files="lesson.files"
          />
          <LessonNavigation
            :position="position"
            :total="totalScreens"
            :last-screen="screenIndex === lesson.screens.length - 1"
            @move="move"
          />
          <p class="navigation-hint">
            Use ← e → fora dos controles para navegar · Exemplos de atividades são propostas, não
            funcionalidades prontas.
          </p>
        </main>
      </div>
    </v-main>
  </v-app>
</template>
