<script setup lang="ts">
const { loggedIn, user, clear } = useUserSession();

// --- Compteur panier (même logique que le modèle Next) ----------------------
import { ref, onMounted, onUnmounted } from "vue";

const cartCount = ref<number>(0);

function updateCartCount() {
	try {
		const raw = localStorage.getItem("cart") || "{}";
		const cart = JSON.parse(raw);
		const total = Array.isArray(cart) ? cart.reduce((t, i) => t + (i.quantity || 0), 0) : Object.values(cart).reduce((t: number, i: any) => t + (i.quantity || 0), 0);
		cartCount.value = total;
	} catch {
		cartCount.value = 0;
	}
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
// ---------------------------------------------------------------------------

async function logout() {
	await $fetch("/api/auth/logout", { method: "POST" });
	await clear();
	await navigateTo("/");
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
						<NuxtLink class="nav-link" to="/cart" id="cart-link">
							Panier<span v-if="cartCount > 0"> ({{ cartCount }})</span>
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
