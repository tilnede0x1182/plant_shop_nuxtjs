<script setup lang="ts">
import { ref, onMounted } from 'vue'

const count = ref(0)

function loadCartCount() {
	try {
		const cart = JSON.parse(localStorage.getItem('cart') || '{}')
		count.value = Array.isArray(cart)
			? cart.reduce((t, i) => t + (i.quantity || 0), 0)
			: Object.values(cart).reduce((t: number, i: any) => t + (i.quantity || 0), 0)
	} catch {
		count.value = 0
	}
}

onMounted(loadCartCount)
</script>

<template>
	<NuxtLink to="/cart" class="btn btn-outline-light position-relative">
		🛒
		<span v-if="count > 0" class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
			{{ count }}
		</span>
	</NuxtLink>
</template>
