<script setup lang="ts">
onMounted(() => {
  // Vérifier si on vient d'être redirigé à cause d'une session expirée
  const urlParams = new URLSearchParams(window.location.search);
  if (urlParams.get('session_expired') === '1') {
    // Nettoyer localStorage
    localStorage.removeItem('nuxt-auth-utils');

    // Nettoyer l'état de session dans Pinia
    const { clear } = useUserSession();
    clear();

    // Afficher un message
    alert('Votre session a expiré ou votre compte n\'existe plus. Veuillez vous reconnecter.');

    // Rediriger sans le paramètre
    window.history.replaceState({}, document.title, '/auth/signin');
  }
});
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
