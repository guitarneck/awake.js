BIN := node_modules/.bin
SRC := index.js
TST := $(wildcard test/*.js)
LIB := $(wildcard lib/*.js)

ifeq ($(MAKECMDGOALS),help)
-include mk/help.mk
endif

.PHONY: clean

nope: ## List al sources
	$(info test : $(TST))
	$(info lib  : $(LIB))
	@true

all: build test

watch-old:
	@while true; do make test --question || make test --silent; sleep 3; done

watch: ## Watch unit tests
	@watch "make test --silent"

start:
	@echo "not yet implemented"
	@true

build:
	@echo "not yet implemented"
	@true

lint: | tmp/linted ## Lint all sources
tmp/linted: $(SRC) $(LIB) $(TST) | tmp
	@eslint *.js
	@touch tmp/linted
	@true

test-old: | tmp/tested-old
tmp/tested-old: $(SRC) $(LIB) $(TST) | tmp 
	@npm test --silent
	@touch tmp/tested-old
	@true

test: | tmp/tested ## Run unit tests
tmp/tested: $(SRC) $(LIB) $(TST) | tmp 
	@FORCE_COLOR=t $(BIN)/tape test/*.js | $(BIN)/tap-diff
	@touch tmp/tested
	@true

tmp:
	@mkdir -p tmp

deploy:
	@echo "not yet implemented"
	@true

docs: | tmp/documented ## Generate the documentation
tmp/documented: $(LIB) README.md jsdoc.json | tmp
	@jsdoc -c jsdoc.json -r README.md lib/*.js
	@touch tmp/documented
	@true

clean: ## Clean the dist directory
	@echo "Clearing directory dist..."
	rm -rf dist/*
	@echo "Done."