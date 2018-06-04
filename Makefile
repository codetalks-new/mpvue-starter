DIST_DIR = dist
$(shell rm -rf ${DIST_DIR} )
$(shell mkdir ${DIST_DIR} )

.PHONY: prepare
prepare:
	npm install

.PHONY: run
run: prepare
	npm run dev

.PHONY: build
build:prepare
	npm run build --report

.PHONY: clear
clear:
	rm -rf ${DIST_DIR}



