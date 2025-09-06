<script setup lang="ts">
import { ref, onMounted } from 'vue'

type Plant = { id: number; name: string; price: number; stock: number }
const plants = ref<Plant[]>([])

onMounted(async () => {
	plants.value = await $fetch('/api/admin/plants')
})

async function deletePlant(id: number) {
	if (!confirm('Supprimer cette plante ?')) return
	await $fetch(`/api/admin/plants/${id}`, { method: 'DELETE' })
	plants.value = plants.value.filter(p => p.id !== id)
}
</script>

<template>
	<div class="container mt-4">
		<h1>Gestion des Plantes (Admin)</h1>
		<NuxtLink to="/admin/plants/new" class="btn btn-success mb-3">Nouvelle Plante</NuxtLink>
		<table class="table table-striped">
			<thead class="table-light">
				<tr><th>Nom</th><th>Prix</th><th>Stock</th><th>Actions</th></tr>
			</thead>
			<tbody>
				<tr v-for="plant in plants" :key="plant.id">
					<td><NuxtLink :to="`/plants/${plant.id}`">{{ plant.name }}</NuxtLink></td>
					<td>{{ plant.price }} €</td>
					<td>{{ plant.stock }}</td>
					<td>
						<NuxtLink :to="`/admin/plants/${plant.id}/edit`" class="btn btn-warning btn-sm me-2">✏ Modifier</NuxtLink>
						<button class="btn btn-danger btn-sm" @click="deletePlant(plant.id)">🗑 Supprimer</button>
					</td>
				</tr>
			</tbody>
		</table>
	</div>
</template>
