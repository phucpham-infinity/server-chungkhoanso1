up-web:
	cd prod && docker-compose up -d --no-deps --build nginx
up-api:
	cd prod && docker-compose up -d --no-deps --build api
up:
	cd prod && docker-compose up -d --no-deps