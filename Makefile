COMPOSE = docker compose

.PHONY: install start build stop clean

install:
	$(COMPOSE) run --rm website npm install

start:
	$(COMPOSE) run --rm --service-ports website npm start -- --host 0.0.0.0

build:
	$(COMPOSE) run --rm website npm run build

stop:
	$(COMPOSE) down

clean:
	$(COMPOSE) down -v
