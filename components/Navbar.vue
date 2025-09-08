<script setup lang="ts">
const { loggedIn, user, clear } = useUserSession();
import { ref, onMounted, onUnmounted } from "vue";
import { computeCartCount } from "@/composables/useCart"; // calcule DRY du compteur

const cartCount = ref<number>(0);

function updateCartCount() {
	cartCount.value = computeCartCount();
}

onMounted(() => {
	updateCartCount();
	window.addEventListener("storage", updateCartCount);
	window.addEventListener("cart-updated", updateCartCount);
});

onUnmounted(() => {
	window.removeEventListener("storage", updateCartCount);
	window.removeEventListener("cart-updated", updateCartCount);
});

async function logout() {
	await $fetch("/api/auth/logout", { method: "POST" });
	await clear();
	await navigateTo("/");
	if (typeof window !== "undefined") window.location.reload();
}
</script>

<template>
	<nav class="navbar navbar-expand-lg navbar-dark custom-navbar">
		<div class="container">
			<NuxtLink class="navbar-brand" to="/">🌿 PlantShop</NuxtLink>
			<button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
				<span class="navbar-toggler-icon"></span>
			</button>

			<div class="collapse navbar-collapse" id="navbarNav">
				<ul class="navbar-nav ms-auto">
					<template v-if="loggedIn">
						<li class="nav-item d-flex align-items-center text-white me-3">
							{{ user?.name }}
							<span v-if="user?.admin">&nbsp;(Administrateur)</span>
						</li>
					</template>
					<li class="nav-item">
						<NuxtLink class="nav-link" to="/cart" id="cart-link">
							Mon Panier<span v-if="cartCount > 0"> ({{ cartCount }})</span>
						</NuxtLink>
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
							<NuxtLink class="nav-link" to="/auth/register">S'inscrire</NuxtLink>
						</li>
						<li class="nav-item">
							<NuxtLink class="nav-link" to="/auth/signin">Se connecter</NuxtLink>
						</li>
					</template>
				</ul>
			</div>
		</div>
	</nav>
</template>
