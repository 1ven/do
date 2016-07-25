install:
	npm install

development:
	$(shell cat .env.develop) nodemon ./server/bin/www

production:
	$(shell cat .env.production) node ./server/bin/www

bundle:
	NODE_ENV=production webpack -p --config webpack.config.prod.js

deploy:
	git checkout master && git merge develop && git push -u origin master && git checkout develop

tests-client:
	make tests P='./test/client'

tests-server:
	make tests P='./test/server'

tests:
	NODE_PATH=. $(shell cat .env.test) mocha $(if $(P), '$(P)', './test') --compilers js:babel-register --require babel-polyfill --recursive -R min -g $(if $(GREP),'$(GREP)','')
