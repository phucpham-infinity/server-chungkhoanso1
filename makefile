up-web:
	cd prod && docker compose up -d --no-deps --build nginx
up-api:
	cd prod && docker compose up -d --no-deps --build api
up-all:
	cd prod && docker compose up -d --no-deps --build api --build nginx
up:
	cd prod && docker compose up -d && docker compose up -d --no-deps --build api
