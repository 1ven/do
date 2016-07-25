install:
	npm install

development:
	NODE_ENV=development PORT=3000 nodemon ./server/bin/www

production:
	NODE_ENV=production PORT=8080 node ./server/bin/www

bundle:
	NODE_ENV=production webpack -p --config webpack.config.prod.js

tests-client:
	make tests P='./test/client'

tests-server:
	make tests P='./test/server'

tests:
	NODE_PATH=. NODE_ENV=test PORT=1337 mocha $(if $(P), '$(P)', './test') --compilers js:babel-register --require babel-polyfill --recursive -R min -g $(if $(GREP),'$(GREP)','')
