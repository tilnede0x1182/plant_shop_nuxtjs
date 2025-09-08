<script setup lang="ts">
const { loggedIn, user, clear } = useUserSession();

async function logout() {
	await $fetch("/api/auth/logout", { method: "POST" });
	await clear();
	await navigateTo('/')
	if (typeof window !== "undefined") window.location.reload();
}
</script>

<template>
	<nav class="navbar navbar-expand-lg navbar-dark bg-dark">
		<div class="container">
			<NuxtLink class="navbar-brand" to="/">PlantShop</NuxtLink>
			<button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
				<span class="navbar-toggler-icon"></span>
			</button>

			<div class="collapse navbar-collapse" id="navbarNav">
				<ul class="navbar-nav ms-auto">
					<li class="nav-item">
						<NuxtLink class="nav-link" to="/cart">Panier</NuxtLink>
					</li>

					<template v-if="loggedIn">
						<li class="nav-item">
							<NuxtLink class="nav-link" to="/orders">Mes Commandes</NuxtLink>
						</li>
						<li class="nav-item">
							<NuxtLink class="nav-link" :to="`/users/${user?.id}`">Mon Profil</NuxtLink>
						</li>
						<li v-if="user?.admin" class="nav-item dropdown">
							<a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown">Admin</a>
							<ul class="dropdown-menu">
								<li><NuxtLink class="dropdown-item" to="/admin/plants">Gestion Plantes</NuxtLink></li>
								<li><NuxtLink class="dropdown-item" to="/admin/users">Gestion Utilisateurs</NuxtLink></li>
							</ul>
						</li>
						<li class="nav-item">
							<button class="btn btn-link nav-link" @click="logout">Déconnexion</button>
						</li>
					</template>

					<template v-else>
						<li class="nav-item">
							<NuxtLink class="nav-link" to="/auth/signin">Connexion</NuxtLink>
						</li>
						<li class="nav-item">
							<NuxtLink class="nav-link" to="/auth/register">Inscription</NuxtLink>
						</li>
					</template>
				</ul>
			</div>
		</div>
	</nav>
</template>
