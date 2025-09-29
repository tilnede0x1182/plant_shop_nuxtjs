# Lance en mode développement
run: run-dev
run-dev:
	NITRO_PORT=3150 npm run dev

# Compile le projet
build:
	npm run build

# Sert le build en mode production
prod:
	NITRO_PORT=3150 npm run preview

seed:
	npx prisma db seed

typage:
	npx vue-tsc --noEmit

lint:
	npm run lint

typage_lint: lint typage
