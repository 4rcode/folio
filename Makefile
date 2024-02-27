export DENO_INSTALL := .deno
export DENO_DIR := ${DENO_INSTALL}/cache

deno := ${DENO_INSTALL}/bin/deno

.PHONY: all
all: clean test install

.PHONY: clean
clean:
	find . -path '*/target*' -delete
	find . -path '*/${DENO_INSTALL}*' -delete
	mkdir -p '${DENO_DIR}'

.PHONY: install
install: ${deno}
	${deno} install -Af ./folio.ts

.PHONY: install-public
install-public: ${deno}
	${deno} install -Arf https://raw.github.com/4rcode/folio/main/folio.ts

.PHONY: test
test: ${deno}
	${deno} test -A

${deno}:
	curl -fsSL https://deno.land/install.sh | sh
