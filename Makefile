DOCKER_COMPOSE_DEV = docker-compose -f ./.docker/docker-compose.dev.yml
DOCKER_COMPOSE_PROD = docker-compose -f ./.docker/docker-compose.prod.yml -p tye

rm-volumes:
	docker volume rm $(docker volume ls -q) || true

rm-images:
	docker rmi $(docker images -q) || true

rm-containers:
	docker rm $(docker ps -a -q) || true

rm-all: rm-containers rm-images rm-volumes

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