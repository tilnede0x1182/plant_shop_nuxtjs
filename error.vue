<script setup lang="ts">
import { navigateTo } from '#imports'

const error = useError()

if (error.value?.statusCode === 404) {
  navigateTo('/plants')
}
</script>

<template>
  <div class="container mt-4 text-center">
    <p>Redirection vers la page des plantes...</p>
  </div>
</template>
