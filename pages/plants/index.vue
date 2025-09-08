<script setup lang="ts">
import { ref, onMounted, computed } from "vue";
import { addToCart } from "@/composables/useCart";

type Plant = { id: number; name: string; price: number; stock: number };

const plants = ref<Plant[]>([]);
const { user, loggedIn } = useUserSession();
const isAdmin = computed(() => !!(loggedIn.value && user.value?.admin));

onMounted(async () => {
  plants.value = await $fetch("/api/plants");
});
</script>

<template>
  <div class="container mt-4">
    <h1 class="mb-4 text-center">🌿 Liste des Plantes</h1>
    <NuxtLink v-if="isAdmin" to="/admin/plants/new" class="btn btn-success mb-3"> Nouvelle Plante </NuxtLink>
    <div class="row">
      <div v-for="plant in plants" :key="plant.id" class="col-md-4">
        <div class="card mb-3 shadow-sm">
          <div class="card-body">
            <h5 class="card-title">
              <NuxtLink :to="`/plants/${plant.id}`" class="text-decoration-none text-dark">
                {{ plant.name }}
              </NuxtLink>
            </h5>
            <p class="mb-0"><strong>Prix :</strong> {{ plant.price }} €</p>
            <p class="mb-0" v-if="isAdmin"><strong>Stock :</strong> {{ plant.stock }} unité<span v-if="plant.stock > 1">s</span></p>
            <button class="btn btn-success w-100 mt-2" @click="addToCart(plant)">Ajouter au panier</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
