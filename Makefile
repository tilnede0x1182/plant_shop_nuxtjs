# Lancer en mode développement
run:
	NITRO_PORT=3150 npm run dev
# 	NITRO_PORT=3150 npm start

seed:
	npx prisma db seed

# Builder le projet (production build)
prod:
	npm run build && NITRO_PORT=3100 npm start

typage:
	npx vue-tsc --noEmit

lint:
	npm run lint

typage_lint: lint typage
