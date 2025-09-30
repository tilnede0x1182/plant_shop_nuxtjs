<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { useRoute, useRouter } from '#app'
import { addToCart } from '@/composables/useCart'

const route = useRoute()
const router = useRouter()
const plant = ref<any>(null)

const { user, loggedIn } = useUserSession()
const isAdmin = computed(() => !!(loggedIn.value && user.value?.admin))

onMounted(async () => {
  plant.value = await $fetch(`/api/plants/${route.params.id}`)
})

async function deletePlant() {
  if (!plant.value) return
  if (!confirm('Supprimer cette plante ?')) return
  await $fetch(`/api/admin/plants/${route.params.id}`, { method: 'DELETE' })
  router.push('/plants')
}

</script>

<template>
	<div v-if="plant" class="container mt-4">
		<div class="card shadow-lg">
			<div class="card-body">
				<h1 class="card-title">{{ plant.name }}</h1>
				<p><strong>Prix :</strong> {{ plant.price }} €</p>
				<p><strong>Description :</strong> {{ plant.description }}</p>
				<p v-if="isAdmin"><strong>Stock :</strong> {{ plant.stock }} unités</p>
				<div class="d-flex flex-wrap gap-2 mb-2">
					<button class="btn btn-success" @click="addToCart(plant)">
						Ajouter au panier
					</button>
					<NuxtLink v-if="isAdmin" :to="`/admin/plants/${plant.id}/edit`" class="btn btn-warning">
						Modifier
					</NuxtLink>
					<button v-if="isAdmin" type="button" class="btn btn-danger" @click="deletePlant">
						Supprimer
					</button>
				</div>
				<div class="mt-3">
					<NuxtLink to="/plants" class="btn btn-secondary">
						Retour à la liste
					</NuxtLink>
				</div>
			</div>
		</div>
	</div>
	<p v-else class="container mt-4">Chargement...</p>
</template>
