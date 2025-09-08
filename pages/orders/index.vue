<script setup lang="ts">
import { ref, onMounted } from "vue";

type OrderItem = { id: number; quantity: number; plant: { id: number; name: string; price: number } };
type Order = { id: number; createdAt: string; totalPrice: number; status: string; orderItems: OrderItem[] };

const orders = ref<Order[]>([]);

onMounted(async () => {
	orders.value = await $fetch("/api/orders").catch(() => []);
});
</script>

<template>
	<div class="container mt-4">
		<h1 class="text-center mb-4">📜 Mes Commandes</h1>
		<div v-if="!orders.length" class="alert alert-info">Aucune commande pour le moment.</div>
		<div v-for="(order, index) in orders" :key="order.id" class="card mb-3 shadow-sm">
			<div class="card-body">
				<h5 class="card-title">Commande n°{{ orders.length - index }}</h5>
				<p class="mb-1 text-muted">Passée le {{ new Date(order.createdAt).toLocaleString() }} – Total : {{ order.totalPrice }} €</p>

				<ul class="mb-2">
					<li v-for="item in order.orderItems" :key="item.id">
						<NuxtLink :to="`/plants/${item.plant.id}`" class="text-decoration-none text-primary">{{ item.plant.name }}</NuxtLink>
						{{ item.quantity }} × {{ item.plant.price }} €
					</li>
				</ul>
				<p><strong>Statut :</strong> {{ order.status }}</p>
			</div>
		</div>
	</div>
</template>
