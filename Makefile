# Lance en mode développement
run-dev:
	NITRO_PORT=3150 npm run dev

# Compile le projet
build:
	npm run build

# Sert le build en mode production
run:
	NITRO_PORT=3150 npm run preview

# Build + run en production (équivalent "prod")
prod: build
	NITRO_PORT=3150 npm run preview

seed:
	npx prisma db seed

# Builder le projet (production build)
prod:
	npm run build && NITRO_PORT=3155 npm start

typage:
	npx vue-tsc --noEmit

lint:
	npm run lint

typage_lint: lint typage
