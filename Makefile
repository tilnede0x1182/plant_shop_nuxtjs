# Lancer en mode développement
run:
	NITRO_PORT=3150 NITRO_PORT=3150 npm run dev

# Builder le projet (production build)
build:
	npm run build

# Lancer en mode production (après build)
prod:
	NITRO_PORT=3150 npm run start
