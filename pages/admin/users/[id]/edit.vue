<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from '#app'


const route = useRoute()
const router = useRouter()
const form = ref({ email: '', name: '', admin: false })

onMounted(async () => {
	const data = await $fetch(`/api/users/${route.params.id}`)
	form.value = { email: data.email, name: data.name, admin: data.admin }
})

async function handleSubmit() {
	await $fetch(`/api/users/${route.params.id}`, { method: 'PUT', body: form.value })
	router.push(`/admin/users/${route.params.id}`)
}
</script>

<template>
	<div class="container mt-4">
		<h1>Modifier Utilisateur</h1>
		<form @submit.prevent="handleSubmit">
			<div class="mb-3">
				<label>Email</label>
				<input v-model="form.email" type="email" class="form-control" required />
			</div>
			<div class="mb-3">
				<label>Nom</label>
				<input v-model="form.name" type="text" class="form-control" />
			</div>
			<div class="mb-3 form-check">
				<input v-model="form.admin" type="checkbox" class="form-check-input" id="adminCheck" />
				<label for="adminCheck" class="form-check-label">Administrateur</label>
			</div>
			<button class="btn btn-primary">Enregistrer</button>
		</form>
	</div>
</template>
