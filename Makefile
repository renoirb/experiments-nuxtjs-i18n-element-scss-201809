pwd := $(shell pwd)

# https://google-webfonts-helper.herokuapp.com/fonts/poppins?subsets=latin
# https://fonts.google.com/selection?selection.family=Poppins:400,500,700&download=zip
helperUrl := https://google-webfonts-helper.herokuapp.com/api/fonts

# TODO: Make this work with Windows too
# https://gist.github.com/evanwill/0207876c3243bbb6863e65ec5dc3f058

.PHONY: fonts
fonts: node_modules assets/fonts/element-icons.woff assets/fonts/poppins-v5-latin-regular.woff2

_packages:
	mkdir _packages

node_modules:
	yarn

%.md: node_modules
	node_modules/.bin/cross-env node_modules/.bin/prettier --parser markdown --write "**/*.md"

%.scss: node_modules
	node_modules/.bin/cross-env node_modules/.bin/prettier --parser scss --write "**/*.scss"

.PHONY: lint
lint: node_modules %.md %.scss
	node_modules/.bin/cross-env node_modules/.bin/prettier-eslint --eslint-ignore --write "**/*.+(js|json|md|vue)"

.PHONY: build
build:
	yarn build -a
	yarn --prod
	yarn start

assets/fonts:
	mkdir -p assets/fonts/

assets/fonts/element-icons.%: assets/fonts
	cp node_modules/element-ui/lib/theme-chalk/fonts/* assets/fonts/

_packages/fonts-poppins.zip: _packages
	curl -sSL "${helperUrl}/poppins?download=zip&subsets=latin&variants=500,700,regular,italic,500italic,700italic" -o _packages/fonts-poppins.zip

assets/fonts/poppins-v5-latin-regular.woff2: assets/fonts _packages/fonts-poppins.zip
	unzip _packages/fonts-poppins.zip -d assets/fonts/

.PHONY: clean
clean:
	rm -rI assets/fonts/* node_modules/ .nuxt/

.PHONY: dev
dev:
	docker run -it -w /data -v ${pwd}:/data -p 3000:3000 node:10-alpine yarn dev

