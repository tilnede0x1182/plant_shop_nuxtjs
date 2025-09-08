<script setup lang="ts">
// Définit le <title> global centralisé pour tout le site
useHead({ title: "Magasin de Plantes" });
</script>

<template>
	<div>
		<!-- Navigation -->
		<Navbar />

		<!-- Messages globaux -->
		<div class="container mt-3">
			<FlashMessages />
		</div>

		<!-- Contenu -->
		<slot />
	</div>
</template>
