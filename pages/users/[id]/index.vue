<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const user = ref<any>(null)

onMounted(async () => {
	user.value = await $fetch(`/api/users/${route.params.id}`)
})
</script>

<template>
	<div class="container mt-4" v-if="user">
		<h1>Mon Profil</h1>
		<p><strong>Email :</strong> {{ user.email }}</p>
		<p v-if="user.name"><strong>Nom :</strong> {{ user.name }}</p>
		<NuxtLink :to="`/users/${user.id}/edit`" class="btn btn-primary">
			Modifier mon profil
		</NuxtLink>
	</div>
</template>
