<script setup lang="ts">
import { ref } from "vue";

const notice = ref("");
const alert = ref("");

// Exemple d’utilisation :
// injectez notice.value = "Succès !" ou alert.value = "Erreur"
</script>

<template>
	<div>
		<div v-if="notice" class="alert alert-success">{{ notice }}</div>
		<div v-if="alert" class="alert alert-danger">{{ alert }}</div>
	</div>
</template>
