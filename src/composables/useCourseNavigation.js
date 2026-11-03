import { computed, nextTick, onMounted, onUnmounted, ref } from 'vue'
import { lessons } from '../data/lessons.js'

export function useCourseNavigation() {
  const lessonIndex = ref(0)
  const screenIndex = ref(0)
  const demo = ref(false)
  const heading = ref(null)
  const lesson = computed(() => lessons[lessonIndex.value])
  const screen = computed(() => lesson.value.screens[screenIndex.value])
  const position = computed(() => lessonIndex.value * 4 + screenIndex.value + 1)

  function readLocation() {
    demo.value = window.location.hash === '#original'
    const match = window.location.hash.match(/^#aula-(\d+)-tela-(\d+)$/)
    if (match) {
      lessonIndex.value = Math.max(0, Math.min(7, Number(match[1]) - 1))
      screenIndex.value = Math.max(0, Math.min(3, Number(match[2]) - 1))
    }
  }
  async function go(day, page = 0) {
    lessonIndex.value = day
    screenIndex.value = page
    demo.value = false
    window.location.hash = `#aula-${day + 1}-tela-${page + 1}`
    await nextTick()
    heading.value?.focusHeading()
    window.scrollTo({ top: 0, behavior: 'instant' })
  }
  function move(delta) {
    const index = position.value - 1 + delta
    if (index >= 0 && index < 32) go(Math.floor(index / 4), index % 4)
  }
  function keyboard(event) {
    if (demo.value || event.altKey || event.ctrlKey || event.metaKey || event.shiftKey) return
    if (['INPUT', 'TEXTAREA', 'SELECT', 'BUTTON', 'A'].includes(event.target.tagName) || event.target.isContentEditable) return
    if (event.key === 'ArrowRight') { event.preventDefault(); move(1) }
    if (event.key === 'ArrowLeft') { event.preventDefault(); move(-1) }
  }
  onMounted(() => {
    readLocation()
    window.addEventListener('hashchange', readLocation)
    window.addEventListener('keydown', keyboard)
  })
  onUnmounted(() => {
    window.removeEventListener('hashchange', readLocation)
    window.removeEventListener('keydown', keyboard)
  })

  return { lessons, lessonIndex, screenIndex, demo, heading, lesson, screen, position, go, move }
}
