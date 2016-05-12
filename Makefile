install:
	npm install

development:
	NODE_ENV=development nodemon ./server

production:
	NODE_ENV=production node ./server

client-dev:
	NODE_ENV=development node ./server

build-client:
	NODE_ENV=production webpack -p

tests:
	NODE_PATH=. NODE_ENV=test mocha --compilers js:babel-register --recursive -R min
