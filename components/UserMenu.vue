<script setup lang="ts">
import { useAuth } from '#auth'

const { data: session, signOut } = useAuth()
</script>

<template>
	<div v-if="session?.user" class="dropdown">
		<button class="btn btn-outline-light dropdown-toggle" type="button" data-bs-toggle="dropdown">
			{{ session.user.name || session.user.email }}
		</button>
		<ul class="dropdown-menu dropdown-menu-end">
			<li>
				<NuxtLink :to="`/users/${session.user.id}`" class="dropdown-item">Profil</NuxtLink>
			</li>
			<li>
				<NuxtLink to="/orders" class="dropdown-item">Mes commandes</NuxtLink>
			</li>
			<li v-if="session.user.admin">
				<NuxtLink to="/admin/plants" class="dropdown-item">Admin Plantes</NuxtLink>
			</li>
			<li v-if="session.user.admin">
				<NuxtLink to="/admin/users" class="dropdown-item">Admin Utilisateurs</NuxtLink>
			</li>
			<li><hr class="dropdown-divider" /></li>
			<li>
				<button class="dropdown-item text-danger" @click="signOut({ callbackUrl: '/' })">Déconnexion</button>
			</li>
		</ul>
	</div>
</template>
