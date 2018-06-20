DIST_DIR = dist
$(shell rm -rf ${DIST_DIR} )
$(shell mkdir ${DIST_DIR} )

.PHONY: prepare
prepare:
	yarn install

.PHONY: run
run: prepare
	yarn dev

.PHONY: build
build:prepare
	yarn build --report

.PHONY: clear
clear:
	rm -rf ${DIST_DIR}



