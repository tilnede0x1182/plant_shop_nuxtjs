<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

type CartItem = { id: number; name: string; price: number; quantity: number }
const cartItems = ref<CartItem[]>([])
const router = useRouter()
const error = ref('')

onMounted(() => {
	const stored = localStorage.getItem('cart')
	if (stored) {
		let parsed = JSON.parse(stored)
		if (!Array.isArray(parsed) && typeof parsed === 'object') {
			parsed = Object.values(parsed)
		}
		cartItems.value = parsed
	}
})

async function confirmOrder() {
	const session = await $fetch('/api/auth/session').catch(() => null)
	const userId = Number(session?.user?.id)
	if (!userId) {
		error.value = 'Utilisateur non connecté.'
		return
	}
	const res = await $fetch('/api/orders', {
		method: 'POST',
		body: { items: cartItems.value.map(i => ({ plant_id: i.id, quantity: i.quantity })), userId }
	}).catch(err => ({ error: err.message }))
	if ('error' in res) {
		error.value = (res as any).error || 'Erreur commande'
	} else {
		localStorage.removeItem('cart')
		router.push('/orders')
	}
}
</script>

<template>
	<div class="container mt-4">
		<h1>Valider ma commande</h1>
		<div v-if="error" class="alert alert-danger">{{ error }}</div>
		<div v-if="!cartItems.length" class="alert alert-info">Votre panier est vide.</div>
		<div v-else>
			<table class="table shadow">
				<thead class="table-light">
					<tr><th>Plante</th><th>Quantité</th><th>Total</th></tr>
				</thead>
				<tbody>
					<tr v-for="item in cartItems" :key="item.id">
						<td><NuxtLink :to="`/plants/${item.id}`">{{ item.name }}</NuxtLink></td>
						<td>{{ item.quantity }}</td>
						<td>{{ item.price * item.quantity }} €</td>
					</tr>
				</tbody>
			</table>
			<p class="fw-bold text-end">Total : {{ cartItems.reduce((t,i)=>t+i.price*i.quantity,0) }} €</p>
			<button class="btn btn-success w-100" @click="confirmOrder">Confirmer la commande</button>
		</div>
	</div>
</template>
