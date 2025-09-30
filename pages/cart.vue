<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";
import { loadCart, removeFromCart, delayedUpdateCart } from "@/composables/useCart";

type CartItem = { id: number; name: string; price: number; quantity: number; stock: number };
const cart = ref<Record<number, CartItem>>({});

function reloadCart() {
	cart.value = loadCart();
}

function removeItem(id: number) {
	removeFromCart(id);
	cart.value = loadCart();
}

function clearCart() {
	localStorage.removeItem("cart");
	window.dispatchEvent(new Event("cart-updated"));
	cart.value = {};
}

onMounted(() => {
	cart.value = loadCart();

	window.addEventListener("cart-updated", reloadCart);
	window.addEventListener("storage", reloadCart);
});

onUnmounted(() => {
	window.removeEventListener("cart-updated", reloadCart);
	window.removeEventListener("storage", reloadCart);
});

function goToOrdersNew() {
	if (typeof window !== "undefined") window.location.href = "/orders/new";
}
</script>

<template>
	<div class="container mt-4">
		<h1 class="text-center">🛒 Mon Panier</h1>
		<div v-if="!Object.keys(cart).length" class="alert alert-info mt-3">Votre panier est vide.</div>
		<template v-else>
			<table class="table mt-3">
				<thead class="table-light">
					<tr>
						<th>Plante</th>
						<th>Quantité</th>
						<th>Total</th>
						<th>Action</th>
					</tr>
				</thead>
				<tbody>
					<tr v-for="item in cart" :key="item.id">
						<td>
							<NuxtLink :to="`/plants/${item.id}`" class="text-decoration-none">{{ item.name }}</NuxtLink>
						</td>
						<td>
							<input
								type="number"
								class="form-control form-control-sm"
								style="max-width: 70px"
								:value="item.quantity"
								:min="1"
								:max="item.stock"
								:data-cart-id="item.id"
								:data-stock="item.stock"
								@input="(e) => delayedUpdateCart(item.id, e.target as HTMLInputElement)"
							/>
						</td>
						<td>{{ item.price * item.quantity }} €</td>
						<td>
							<button class="btn btn-danger btn-sm" @click="removeItem(item.id)">Retirer</button>
						</td>
					</tr>
				</tbody>
			</table>

			<p class="text-end fw-bold">Total : {{ Object.values(cart).reduce((t, i) => t + i.price * i.quantity, 0) }} €</p>

			<div class="d-flex justify-content-between">
				<button class="btn btn-outline-secondary btn-sm" @click="clearCart">Vider le panier</button>
				<button class="btn btn-primary" @click="goToOrdersNew">Passer la commande</button>
			</div>
		</template>
	</div>
</template>
