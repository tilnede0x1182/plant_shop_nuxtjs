<script setup lang="ts">
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
