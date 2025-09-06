<script setup lang="ts">
import { ref, onMounted } from 'vue'

type User = { id: number; email: string; name?: string; admin: boolean }
const users = ref<User[]>([])

onMounted(async () => {
	users.value = await $fetch('/api/users')
})
</script>

<template>
	<div class="container mt-4">
		<h1>Gestion des Utilisateurs</h1>
		<table class="table table-striped mt-3">
			<thead class="table-light">
				<tr><th>Nom</th><th>Email</th><th>Admin</th><th>Actions</th></tr>
			</thead>
			<tbody>
				<tr v-for="user in users" :key="user.id">
					<td><NuxtLink :to="`/admin/users/${user.id}`">{{ user.name || '-' }}</NuxtLink></td>
					<td>{{ user.email }}</td>
					<td>
						<span :class="['badge', user.admin ? 'bg-success' : 'bg-secondary']">
							{{ user.admin ? 'Oui' : 'Non' }}
						</span>
					</td>
					<td>
						<NuxtLink :to="`/admin/users/${user.id}/edit`" class="btn btn-warning btn-sm">✏ Modifier</NuxtLink>
					</td>
				</tr>
			</tbody>
		</table>
	</div>
</template>
