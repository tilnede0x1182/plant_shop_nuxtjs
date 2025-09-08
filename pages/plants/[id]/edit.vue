<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from '#app'

const route = useRoute()
const router = useRouter()
const form = ref({ name: '', price: 0, description: '', stock: 0 })
const loading = ref(true)
const error = ref('')

console.log("Page d'édition initialisée - ID:", route.params.id)

onMounted(async () => {
  console.log("Montage du composant, récupération des données...")
  loading.value = true

  try {
    if (!route.params.id) {
      console.error("ID manquant dans les paramètres de route")
      error.value = "Identifiant de plante manquant"
      return
    }

    console.log(`Appel API: /api/plants/${route.params.id}`)
    const data = await $fetch(`/api/plants/${route.params.id}`)
    console.log("Données reçues:", data)

    if (!data || typeof data !== 'object') {
      console.error("Format de données invalide:", data)
      error.value = "Format de données invalide"
      return
    }

    form.value = {
      name: data.name || '',
      price: data.price || 0,
      description: data.description || '',
      stock: data.stock || 0
    }
    console.log("Formulaire initialisé:", form.value)
  } catch (err) {
    console.error("Erreur lors du chargement:", err)
    error.value = `Erreur: ${err.message || 'Impossible de charger les données'}`
  } finally {
    loading.value = false
  }
})

async function handleSubmit() {
  console.log("Soumission du formulaire:", form.value)
  try {
    const response = await $fetch(`/api/plants/${route.params.id}`, {
      method: 'PUT',
      body: form.value
    })
    console.log("Réponse de l'API:", response)
    router.push(`/plants/${route.params.id}`)
  } catch (err) {
    console.error("Erreur lors de la mise à jour:", err)
    error.value = `Erreur: ${err.message || 'Impossible de mettre à jour'}`
  }
}
</script>

<template>
  <div class="container mt-4">
    <h1>Éditer la Plante</h1>

    <div v-if="error" class="alert alert-danger">
      {{ error }}
    </div>

    <div v-if="loading" class="text-center my-5">
      <div class="spinner-border text-primary" role="status">
        <span class="visually-hidden">Chargement...</span>
      </div>
      <p class="mt-2">Chargement des données...</p>
    </div>


    <form v-else @submit.prevent="handleSubmit">
      <div class="mb-3">
        <label>Nom</label>
        <input v-model="form.name" class="form-control" required />
      </div>
      <div class="mb-3">
        <label>Prix (€)</label>
        <input v-model="form.price" type="number" class="form-control" required />
      </div>
      <div class="mb-3">
        <label>Description</label>
        <textarea v-model="form.description" class="form-control" rows="4"></textarea>
      </div>
      <div class="mb-3">
        <label>Stock</label>
        <input v-model="form.stock" type="number" class="form-control" required />
      </div>
      <button class="btn btn-primary">Enregistrer</button>
      <NuxtLink :to="`/plants/${route.params.id}`" class="btn btn-secondary ms-2">Annuler</NuxtLink>
    </form>

    <div class="mt-3">
      <strong>Paramètres route:</strong> {{ route.params }}
    </div>
  </div>
</template>
