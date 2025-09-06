<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()
const plant = ref<any>(null)
const isAdmin = ref(false)

onMounted(async () => {
	plant.value = await $fetch(`/api/plants/${route.params.id}`)
	const session = await $fetch('/api/auth/session').catch(() => null)
	isAdmin.value = session?.user?.admin ?? false
})

async function deletePlant() {
	if (confirm('Supprimer cette plante ?')) {
		await $fetch(`/api/admin/plants/${route.params.id}`, { method: 'DELETE' })
		router.push('/plants')
	}
}
</script>

<template>
	<div v-if="plant" class="container mt-4">
		<h1>{{ plant.name }}</h1>
		<p><strong>Prix :</strong> {{ plant.price }} €</p>
		<p><strong>Description :</strong> {{ plant.description }}</p>
		<p v-if="isAdmin"><strong>Stock :</strong> {{ plant.stock }}</p>

		<div class="mt-3">
			<button class="btn btn-success me-2">Ajouter au panier</button>
			<NuxtLink v-if="isAdmin" :to="`/plants/${plant.id}/edit`" class="btn btn-warning me-2">Modifier</NuxtLink>
			<button v-if="isAdmin" class="btn btn-danger" @click="deletePlant">Supprimer</button>
		</div>
	</div>
</template>
