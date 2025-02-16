DOCKER_COMPOSE_DEV = docker-compose -f ./.docker/docker-compose.dev.yml
DOCKER_COMPOSE_PROD = docker-compose -f ./.docker/docker-compose.prod.yml -p tye

rm-volumes:
	docker volume prune -f

rm-images:
	docker image prune -a -f

rm-containers:
	docker container prune -f

rm-networks:
	docker network prune -f

rm-system: 
	docker system prune --volumes

rm-all: rm-volumes rm-images rm-containers rm-networks

# DEV

build-dev:
	$(DOCKER_COMPOSE_DEV) build

up-dev:
	$(DOCKER_COMPOSE_DEV) up -d

up-logs-dev:
	$(DOCKER_COMPOSE_DEV) up

down-dev:
	$(DOCKER_COMPOSE_DEV) down


.PHONY: build-dev up-dev up-logs-dev down-dev