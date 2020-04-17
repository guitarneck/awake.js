BIN := node_modules/.bin
SRC := index.js
TST := $(wildcard test/*.js)
LIB := $(wildcard lib/*.js)

ifeq ($(MAKECMDGOALS),list)
-include mk/list.mk
endif

.PHONY: clean

nope:
	$(info test : $(TST))
	$(info lib  : $(LIB))
	@true

all: build test

watch-old:
	@while true; do make test --question || make test --silent; sleep 3; done

watch:
	@watch "make test --silent"

start:
	@echo "not yet implemented"
	@true

build:
	@echo "not yet implemented"
	@true

lint: | tmp/linted
tmp/linted: $(SRC) $(LIB) $(TST) | tmp
	@eslint *.js
	@touch tmp/linted
	@true

test-old: | tmp/tested-old
tmp/tested-old: $(SRC) $(LIB) $(TST) | tmp 
	@npm test --silent
	@touch tmp/tested-old
	@true

test: | tmp/tested
tmp/tested: $(SRC) $(LIB) $(TST) | tmp 
	@FORCE_COLOR=t $(BIN)/tape test/*.js | $(BIN)/tap-diff
	@touch tmp/tested
	@true

tmp:
	@mkdir -p tmp

deploy:
	@echo "not yet implemented"
	@true

docs: | tmp/documented
tmp/documented: $(LIB) README.md jsdoc.json | tmp
	@jsdoc -c jsdoc.json -r README.md lib/*.js
	@touch tmp/documented
	@true

clean:
	@echo "Clearing directory dist..."
	rm -rf dist/*
	@echo "Done."