<script setup lang="ts">
import { ref } from 'vue'

const email = ref('')
const name = ref('')
const password = ref('')
const passwordConfirmation = ref('')
const error = ref('')

async function handleRegister() {
	if (password.value !== passwordConfirmation.value) {
		error.value = 'Les mots de passe ne correspondent pas'
		return
	}
	const res = await $fetch('/api/users', {
		method: 'POST',
		body: { email: email.value, name: name.value, password: password.value }
	})
	if ('error' in res) {
		error.value = (res as any).error
	} else {
		await navigateTo('/auth/signin')
	}
}
</script>

<template>
	<div class="container mt-4">
		<h1>Inscription</h1>
		<form @submit.prevent="handleRegister" class="mt-3" style="max-width:500px">
			<div class="mb-3">
				<label>Email</label>
				<input v-model="email" type="email" class="form-control" required />
			</div>
			<div class="mb-3">
				<label>Nom</label>
				<input v-model="name" type="text" class="form-control" required />
			</div>
			<div class="mb-3">
				<label>Mot de passe</label>
				<input v-model="password" type="password" class="form-control" required />
			</div>
			<div class="mb-3">
				<label>Confirmation mot de passe</label>
				<input v-model="passwordConfirmation" type="password" class="form-control" required />
			</div>
			<div v-if="error" class="alert alert-danger">{{ error }}</div>
			<button class="btn btn-success w-100" type="submit">Créer un compte</button>
		</form>
	</div>
</template>
