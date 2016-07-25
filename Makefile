test-variables = NODE_PATH=. NODE_ENV=test PORT=1337
test-options = --compilers js:babel-register --require babel-polyfill --recursive -R min -g $(if $(GREP),'$(GREP)','')

install:
	npm install

development:
	NODE_ENV=development PORT=3000 nodemon ./server/bin/www

production:
	NODE_ENV=production PORT=8080 node ./server/bin/www

bundle:
	NODE_ENV=production webpack -p --config webpack.config.prod.js

tests-client:
	$(test-variables) mocha ./test/client $(test-options)

tests-server:
	$(test-variables) mocha ./test/server $(test-options)

tests:
	$(test-variables) mocha $(test-options)
