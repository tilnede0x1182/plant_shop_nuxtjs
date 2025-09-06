<script setup lang="ts">
import { ref } from 'vue'
import { useRoute, useRouter } from '#app'


/**
 * Formulaire création plante (admin)
 * Valide la SFC et crée une plante
 * @form données du formulaire
 */
const router = useRouter()
const form = ref({ name: '', price: 0, description: '', stock: 0 })

async function handleSubmit() {
	await $fetch('/api/plants', { method: 'POST', body: form.value })
	router.push('/admin/plants')
}
</script>

<template>
	<div class="container mt-4">
		<h1>Nouvelle Plante 🌱</h1>
		<form @submit.prevent="handleSubmit">
			<div class="mb-3"><label>Nom</label><input v-model="form.name" class="form-control" required /></div>
			<div class="mb-3"><label>Prix (€)</label><input v-model="form.price" type="number" class="form-control" required /></div>
			<div class="mb-3"><label>Description</label><textarea v-model="form.description" class="form-control" rows="4"></textarea></div>
			<div class="mb-3"><label>Stock</label><input v-model="form.stock" type="number" class="form-control" required /></div>
			<button class="btn btn-success">Créer</button>
		</form>
	</div>
</template>
