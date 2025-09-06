// import-test.ts

// Fonction pour tester les imports
async function testImports() {
	// Option 1 - Imports directs
	try {
		const module1 = await import("nuxt-better-auth");
		console.log("✅ Option 1 - nuxt-better-auth : OK", Object.keys(module1));
	} catch (e) {
		console.log("❌ Option 1 - nuxt-better-auth :", e.message);
	}

	// Option 2 - Client via /client
	try {
		const module2 = await import("nuxt-better-auth/client");
		console.log("✅ Option 2 - nuxt-better-auth/client : OK", Object.keys(module2));
	} catch (e) {
		console.log("❌ Option 2 - nuxt-better-auth/client :", e.message);
	}

	// Option 3 - Server via /server
	try {
		const module3 = await import("nuxt-better-auth/server");
		console.log("✅ Option 3 - nuxt-better-auth/server : OK", Object.keys(module3));
	} catch (e) {
		console.log("❌ Option 3 - nuxt-better-auth/server :", e.message);
	}

	// Option 4 - Via runtime
	try {
		const module4 = await import("nuxt-better-auth/runtime");
		console.log("✅ Option 4 - nuxt-better-auth/runtime : OK", Object.keys(module4));
	} catch (e) {
		console.log("❌ Option 4 - nuxt-better-auth/runtime :", e.message);
	}

	// Option 5 - Client via runtime
	try {
		const module5 = await import("nuxt-better-auth/runtime/client");
		console.log("✅ Option 5 - nuxt-better-auth/runtime/client : OK", Object.keys(module5));
	} catch (e) {
		console.log("❌ Option 5 - nuxt-better-auth/runtime/client :", e.message);
	}

	// Option 6 - Server via runtime
	try {
		const module6 = await import("nuxt-better-auth/runtime/server");
		console.log("✅ Option 6 - nuxt-better-auth/runtime/server : OK", Object.keys(module6));
	} catch (e) {
		console.log("❌ Option 6 - nuxt-better-auth/runtime/server :", e.message);
	}

	// Vérifiez également les imports des versions complètes (dist)
	try {
		const module7 = await import("nuxt-better-auth/dist/runtime/composables");
		console.log("✅ Option 7 - nuxt-better-auth/dist/runtime/composables : OK", Object.keys(module7));
	} catch (e) {
		console.log("❌ Option 7 - nuxt-better-auth/dist/runtime/composables :", e.message);
	}

	try {
		const module8 = await import("nuxt-better-auth/dist/runtime/server");
		console.log("✅ Option 8 - nuxt-better-auth/dist/runtime/server : OK", Object.keys(module8));
	} catch (e) {
		console.log("❌ Option 8 - nuxt-better-auth/dist/runtime/server :", e.message);
	}
}

// Exécuter les tests
testImports();
