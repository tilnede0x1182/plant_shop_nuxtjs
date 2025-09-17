export default defineNuxtConfig({
								title: "Magasin de plantes",
								compatibilityDate: "2025-07-15",
								modules: ["nuxt-auth-utils", "@nuxt/eslint"],
								devtools: { enabled: false },
								css: ["~/assets/css/application.css"],
								app: {
																head: {
																								link: [{ rel: "stylesheet", href: "https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" }],
																								script: [{ src: "https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js", tagPosition: "bodyClose" }],
																},
								},
});
