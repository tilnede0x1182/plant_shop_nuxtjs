<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()
const form = ref({ email: '', name: '' })
const errors = ref<string[]>([])
const loading = ref(true)

onMounted(async () => {
	const data = await $fetch(`/api/users/${route.params.id}`)
	form.value = { email: data.email || '', name: data.name || '' }
	loading.value = false
})

async function handleSubmit() {
	const res = await $fetch(`/api/users/${route.params.id}`, {
		method: 'PUT',
		body: form.value
	}).catch(async (err) => {
		errors.value = [err.message]
	})
	if (!errors.value.length) router.push(`/users/${route.params.id}`)
}
</script>

<template>
	<div class="container mt-4">
		<h1>Modifier mon profil</h1>
		<p v-if="loading">Chargement...</p>
		<form v-else @submit.prevent="handleSubmit">
			<div class="mb-3">
				<label>Email</label>
				<input v-model="form.email" type="email" class="form-control" required />
			</div>
			<div class="mb-3">
				<label>Nom</label>
				<input v-model="form.name" type="text" class="form-control" />
			</div>
			<div v-if="errors.length" class="alert alert-danger">
				<ul><li v-for="(err,idx) in errors" :key="idx">{{ err }}</li></ul>
			</div>
			<button class="btn btn-primary">Enregistrer</button>
		</form>
	</div>
</template>
