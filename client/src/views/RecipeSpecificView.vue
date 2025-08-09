<script setup lang="ts">
import { useRoute } from 'vue-router'
const route = useRoute()

const id = route.params.id
</script>

<template>
  <h1>This is from the RecipeSpecificView {{ id }} new</h1>
</template>
