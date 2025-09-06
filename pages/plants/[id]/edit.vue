<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()
const form = ref({ name: '', price: 0, description: '', stock: 0 })

onMounted(async () => {
	const data = await $fetch(`/api/plants/${route.params.id}`)
	form.value = data
})

async function handleSubmit() {
	await $fetch(`/api/plants/${route.params.id}`, {
		method: 'PUT',
		body: form.value
	})
	router.push(`/plants/${route.params.id}`)
}
</script>

<template>
	<div class="container mt-4">
		<h1>Éditer la Plante</h1>
		<form @submit.prevent="handleSubmit">
			<div class="mb-3">
				<label>Nom</label>
				<input v-model="form.name" class="form-control" required />
			</div>
			<div class="mb-3">
				<label>Prix (€)</label>
				<input v-model="form.price" type="number" class="form-control" required />
			</div>
			<div class="mb-3">
				<label>Description</label>
				<textarea v-model="form.description" class="form-control" rows="4"></textarea>
			</div>
			<div class="mb-3">
				<label>Stock</label>
				<input v-model="form.stock" type="number" class="form-control" required />
			</div>
			<button class="btn btn-primary">Enregistrer</button>
		</form>
	</div>
</template>
