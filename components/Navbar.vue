<script setup lang="ts">
import { useAuth } from '#auth'

const { data: session, signOut } = useAuth()
</script>

<template>
	<nav class="navbar navbar-expand-lg navbar-dark bg-dark">
		<div class="container">
			<NuxtLink class="navbar-brand" to="/">🌿 PlantShop</NuxtLink>
			<button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
				<span class="navbar-toggler-icon"></span>
			</button>

			<div class="collapse navbar-collapse" id="navbarNav">
				<ul class="navbar-nav ms-auto">
					<li class="nav-item">
						<NuxtLink class="nav-link" to="/cart">🛒 Panier</NuxtLink>
					</li>
					<template v-if="session?.user">
						<li class="nav-item">
							<NuxtLink class="nav-link" to="/orders">Mes Commandes</NuxtLink>
						</li>
						<li class="nav-item">
							<NuxtLink class="nav-link" :to="`/users/${session.user.id}`">Mon Profil</NuxtLink>
						</li>
						<li v-if="session.user.admin" class="nav-item dropdown">
							<a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown">Admin</a>
							<ul class="dropdown-menu">
								<li><NuxtLink class="dropdown-item" to="/admin/plants">Gestion Plantes</NuxtLink></li>
								<li><NuxtLink class="dropdown-item" to="/admin/users">Gestion Utilisateurs</NuxtLink></li>
							</ul>
						</li>
						<li class="nav-item">
							<button class="btn btn-link nav-link" @click="signOut({ callbackUrl: '/' })">Déconnexion</button>
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
