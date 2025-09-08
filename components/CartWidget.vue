<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { computeCartCount } from '@/composables/useCart'

const count = ref(0)

function loadCartCount() {
	count.value = computeCartCount()
}


// Handler pour l'événement storage pour détecter les changements du panier
function handleStorageChange(event: StorageEvent) {
    if (event.key === 'cart') {
        loadCartCount();
    }
}

onMounted(() => {
    loadCartCount();
    window.addEventListener('storage', handleStorageChange);

    // Écouter un événement personnalisé pour les mises à jour du panier
    window.addEventListener('cart-updated', loadCartCount);
});

onUnmounted(() => {
    window.removeEventListener('storage', handleStorageChange);
    window.removeEventListener('cart-updated', loadCartCount);
});
</script>

<template>
	<NuxtLink to="/cart" class="btn btn-outline-light position-relative">
		🛒
		<span v-if="count > 0" class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
			{{ count }}
		</span>
	</NuxtLink>
</template>
