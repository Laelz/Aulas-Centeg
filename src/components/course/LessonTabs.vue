<script setup>
defineProps({
  screens: { type: Array, required: true },
  screenIndex: { type: Number, required: true },
})
const emit = defineEmits(['select'])
</script>
<template>
<nav class="screen-tabs" aria-label="Telas deste encontro">
            <button v-for="(item, index) in screens" :key="item.label" :class="{ active: index === screenIndex }" :aria-current="index === screenIndex ? 'step' : undefined" @click="emit('select', index)"><span>{{ index + 1 }}</span>{{ item.label }}</button>
          </nav>
</template>
