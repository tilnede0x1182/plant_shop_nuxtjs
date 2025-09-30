<script setup lang="ts">
import { ref } from "vue";

const email = ref("");
const password = ref("");
const error = ref("");

async function handleLogin() {
	try {
		const res = await $fetch("/api/auth/login", {
			method: "POST",
			body: { email: email.value, password: password.value },
		});
		if (res?.ok) {
			navigateTo("/", { external: true });
		} else {
			error.value = "Email ou mot de passe invalide";
		}
	} catch {
		error.value = "Email ou mot de passe invalide";
	}
}
</script>

<template>
	<div class="container mt-4">
		<h1>Se connecter</h1>
		<form @submit.prevent="handleLogin" class="mt-3" style="max-width: 400px">
			<div class="mb-3">
				<label>Email</label>
				<input v-model="email" type="email" class="form-control" required />
			</div>
			<div class="mb-3">
				<label>Mot de passe</label>
				<input v-model="password" type="password" class="form-control" required />
			</div>
			<div v-if="error" class="alert alert-danger">{{ error }}</div>
			<button class="btn btn-primary w-100" type="submit">Connexion</button>
		</form>
	</div>
</template>
