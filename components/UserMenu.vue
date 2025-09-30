<script setup lang="ts">
const { loggedIn, user, clear } = useUserSession();

async function logout() {
	await $fetch("/api/auth/logout", { method: "POST" });
	await clear();
	navigateTo("/", { external: true })
}
</script>

<template>
	<div v-if="loggedIn && user" class="dropdown">
		<button class="btn btn-outline-light dropdown-toggle" type="button" data-bs-toggle="dropdown">
			{{ user.name || user.email }}
		</button>
		<ul class="dropdown-menu dropdown-menu-end">
			<li>
				<NuxtLink :to="`/users/${user.id}`" class="dropdown-item">Profil</NuxtLink>
			</li>
			<li>
				<NuxtLink to="/orders" class="dropdown-item">Mes commandes</NuxtLink>
			</li>
			<li v-if="user.admin">
				<NuxtLink to="/admin/plants" class="dropdown-item">Admin Plantes</NuxtLink>
			</li>
			<li v-if="user.admin">
				<NuxtLink to="/admin/users" class="dropdown-item">Admin Utilisateurs</NuxtLink>
			</li>
			<li><hr class="dropdown-divider" /></li>
			<li>
				<button class="dropdown-item text-danger" @click="logout">Déconnexion</button>
			</li>
		</ul>
	</div>
</template>
