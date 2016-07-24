test-variables = NODE_PATH=. NODE_ENV=test
test-options = --compilers js:babel-register --require babel-polyfill --recursive -R min -g $(if $(GREP),'$(GREP)','')
server-file = ./server/bin/www

install:
	npm install

development:
	NODE_ENV=development nodemon $(server-file)

production:
	NODE_ENV=production node $(server-file)

client-dev:
	NODE_ENV=development node $(server-file)

build-client:
	NODE_ENV=production webpack -p --config webpack.config.prod.js

tests-client:
	$(test-variables) mocha ./test/client $(test-options)

tests-server:
	$(test-variables) mocha ./test/server $(test-options)

tests:
	$(test-variables) mocha $(test-options)
