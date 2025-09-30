<template>
	<div v-if="plant" class="container mt-5" style="max-width:600px">
		<div class="card shadow">
			<div class="card-body">
				<h1 class="card-title text-center mb-4">{{ plant.name }}</h1>
				<p class="text-center fs-4 mb-2">
					<span class="badge bg-success" style="font-size:1.2em;">{{ plant.price }} €</span>
				</p>
				<div class="mb-3 px-3 py-2" style="background:#f8f9fa; border-radius:8px;">
					{{ plant.description }}
				</div>
				<div class="d-grid my-3">
					<button class="btn btn-success btn-lg" @click="addToCart(plant)">
						🛒 Ajouter au panier
					</button>
				</div>
				<div v-if="isAdmin" class="d-flex justify-content-between mt-3 gap-2">
					<NuxtLink :to="`/plants/${plant.id}/edit`" class="btn btn-warning btn-sm flex-fill">
						✏ Modifier
					</NuxtLink>
					<button class="btn btn-danger btn-sm flex-fill" @click="deletePlant">
						🗑 Supprimer
					</button>
				</div>
				<div v-else class="text-end text-muted mt-2" style="font-size:0.9em;">
					Stock restant : <strong>{{ plant.stock }}</strong>
				</div>
			</div>
		</div>
	</div>
</template>
