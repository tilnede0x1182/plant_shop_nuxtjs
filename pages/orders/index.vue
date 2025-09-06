<script setup lang="ts">
import { ref, onMounted } from 'vue'

type OrderItem = { id: number; quantity: number; plant: { id: number; name: string; price: number } }
type Order = { id: number; createdAt: string; totalPrice: number; status: string; orderItems: OrderItem[] }

const orders = ref<Order[]>([])

onMounted(async () => {
	orders.value = await $fetch('/api/orders').catch(() => [])
})
</script>

<template>
	<div class="container mt-4">
		<h1>📜 Mes Commandes</h1>
		<div v-if="!orders.length" class="alert alert-info mt-3">
			Aucune commande pour le moment.
		</div>
		<div v-for="(order, index) in orders" :key="order.id" class="card mb-3 shadow-sm">
			<div class="card-body">
				<h5 class="card-title">Commande n°{{ orders.length - index }}</h5>
				<p class="text-muted">Passée le {{ new Date(order.createdAt).toLocaleString() }}</p>
				<ul>
					<li v-for="item in order.orderItems" :key="item.id">
						<NuxtLink :to="`/plants/${item.plant.id}`">{{ item.plant.name }}</NuxtLink>
						– {{ item.quantity }} × {{ item.plant.price }} €
					</li>
				</ul>
				<p><strong>Total :</strong> {{ order.totalPrice }} €</p>
				<p><strong>Statut :</strong> {{ order.status }}</p>
			</div>
		</div>
	</div>
</template>
