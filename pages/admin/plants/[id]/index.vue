<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from '#app'


/**
 * Détail plante côté admin
 * Affiche et permet suppression
 * @plant ressource chargée
 */
const route = useRoute()
const router = useRouter()
const plant = ref<any>(null)

onMounted(async () => {
	plant.value = await $fetch(`/api/plants/${route.params.id}`)
})

async function deletePlant() {
	if (!confirm('Supprimer cette plante ?')) return
	await $fetch(`/api/admin/plants/${route.params.id}`, { method: 'DELETE' })
	router.push('/admin/plants')
}
</script>

<template>
	<div v-if="plant" class="container mt-4">
		<h1>{{ plant.name }}</h1>
		<p><strong>Prix :</strong> {{ plant.price }} €</p>
		<p><strong>Stock :</strong> {{ plant.stock }}</p>
		<div class="mt-3">
			<NuxtLink :to="`/admin/plants/${plant.id}/edit`" class="btn btn-warning me-2">Modifier</NuxtLink>
			<button class="btn btn-danger" @click="deletePlant">Supprimer</button>
		</div>
	</div>
</template>
