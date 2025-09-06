<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const user = ref<any>(null)

onMounted(async () => {
	user.value = await $fetch(`/api/users/${route.params.id}`)
})
</script>

<template>
	<div v-if="user" class="container mt-4">
		<h1>Détails Utilisateur</h1>
		<p><strong>Email :</strong> {{ user.email }}</p>
		<p><strong>Nom :</strong> {{ user.name || '-' }}</p>
		<p><strong>Administrateur :</strong> {{ user.admin ? 'Oui' : 'Non' }}</p>
		<NuxtLink :to="`/admin/users/${user.id}/edit`" class="btn btn-warning mt-3">Modifier</NuxtLink>
	</div>
</template>
