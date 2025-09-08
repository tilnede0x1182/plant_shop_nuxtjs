<script setup lang="ts">
import { ref, onMounted } from "vue";
import { loadCart, removeFromCart } from "@/composables/useCart";

type CartItem = { id: number; name: string; price: number; quantity: number; stock: number };
const cart = ref<Record<number, CartItem>>({});

function removeItem(id: number) {
	removeFromCart(id);
	cart.value = loadCart();
}

onMounted(() => {
	cart.value = loadCart();
});
</script>

<template>
	<div class="container mt-4">
		<h1>🛒 Mon Panier</h1>
		<div v-if="!Object.keys(cart).length" class="alert alert-info mt-3">Votre panier est vide.</div>
		<table v-else class="table mt-3">
			<thead class="table-light">
				<tr>
					<th>Plante</th>
					<th>Quantité</th>
					<th>Total</th>
					<th></th>
				</tr>
			</thead>
			<tbody>
				<tr v-for="item in cart" :key="item.id">
					<td>{{ item.name }}</td>
					<td>{{ item.quantity }}</td>
					<td>{{ item.price * item.quantity }} €</td>
					<td>
						<button class="btn btn-danger btn-sm" @click="removeItem(item.id)">Retirer</button>
					</td>
				</tr>
			</tbody>
		</table>
		<div v-if="Object.keys(cart).length" class="mt-3 text-end">
			<NuxtLink to="/orders/new" class="btn btn-primary">Passer la commande</NuxtLink>
		</div>
	</div>
</template>
