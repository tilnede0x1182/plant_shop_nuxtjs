<script setup lang="ts">
import { ref, onMounted } from 'vue'

type Plant = { id: number; name: string; price: number; stock: number }
const plants = ref<Plant[]>([])
const isAdmin = ref(false)

onMounted(async () => {
	plants.value = await $fetch('/api/plants')
	const session = await $fetch('/api/auth/session').catch(() => null)
	isAdmin.value = session?.user?.admin ?? false
})
</script>

<template>
	<div class="container mt-4">
		<h1 class="mb-4">🌿 Liste des Plantes</h1>
		<NuxtLink v-if="isAdmin" to="/admin/plants/new" class="btn btn-success mb-3">
			Nouvelle Plante
		</NuxtLink>
		<div class="row">
			<div v-for="plant in plants" :key="plant.id" class="col-md-4">
				<div class="card mb-3 shadow-sm">
					<div class="card-body">
						<h5 class="card-title">
							<NuxtLink :to="`/plants/${plant.id}`" class="text-decoration-none text-dark">
								{{ plant.name }}
							</NuxtLink>
						</h5>
						<p><strong>Prix :</strong> {{ plant.price }} €</p>
						<p v-if="isAdmin"><strong>Stock :</strong> {{ plant.stock }}</p>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
