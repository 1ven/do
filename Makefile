install:
	npm install

server-dev:
	NODE_ENV=development nodemon ./server

server-production:
	NODE_ENV=production node ./server

client-dev:
	NODE_ENV=development webpack-dev-server --devtool cheap-module-eval-source-map --progress --hot --inline

client-production:
	NODE_ENV=production webpack -p

tests:
	NODE_PATH=. NODE_ENV=test mocha --compilers js:babel-register --recursive -R min

tests-full:
	NODE_PATH=. NODE_ENV=test mocha --compilers js:babel-register --recursive
