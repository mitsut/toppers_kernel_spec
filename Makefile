COMPOSE = docker compose

# Kernel specifications generated from TOPPERS source text (spec-src/<name>/)
SPECS = tgki_spec-345

.PHONY: install start build stop clean spec

install:
	$(COMPOSE) run --rm website npm install

start:
	$(COMPOSE) run --rm --service-ports website npm start -- --host 0.0.0.0

build:
	$(COMPOSE) run --rm website npm run build

spec:
	for s in $(SPECS); do \
	  $(COMPOSE) run --rm spec sh tools/build_spec.sh spec-src/$$s website/static/specs/$$s.html || exit 1; \
	done

stop:
	$(COMPOSE) down

clean:
	$(COMPOSE) down -v
	rm -rf build
