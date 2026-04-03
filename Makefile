.DEFAULT_GOAL := push

m ?= tweak

.PHONY: push

push:
	git add .
	git commit -m "$(m)"
	git push
