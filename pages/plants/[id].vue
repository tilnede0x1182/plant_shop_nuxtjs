<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from '#app'

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

function addToCart() {
  if (!plant.value) return

  let cart: Record<number, any>
  try {
    cart = JSON.parse(localStorage.getItem('cart') || '{}')
  } catch {
    cart = {}
  }

  const id = plant.value.id
  cart[id] = cart[id]
    ? { ...cart[id], quantity: cart[id].quantity + 1 }
    : { id: plant.value.id, name: plant.value.name, price: plant.value.price, quantity: 1 }

  localStorage.setItem('cart', JSON.stringify(cart))
  window.dispatchEvent(new Event('cart-updated'))
}
</script>

<template>
  <div v-if="plant" class="container mt-4">
    <h1>{{ plant.name }}</h1>
    <p><strong>Prix :</strong> {{ plant.price }} €</p>
    <p><strong>Description :</strong> {{ plant.description }}</p>
    <p v-if="isAdmin"><strong>Stock :</strong> {{ plant.stock }}</p>

    <div class="mt-3">
      <button class="btn btn-success me-2" @click="addToCart">Ajouter au panier</button>
      <NuxtLink v-if="isAdmin" :to="`/plants/${plant.id}/edit`" class="btn btn-warning me-2">Modifier</NuxtLink>
      <button v-if="isAdmin" class="btn btn-danger" @click="deletePlant">Supprimer</button>
    </div>
  </div>
</template>
