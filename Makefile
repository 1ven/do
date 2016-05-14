install:
	npm install

development:
	NODE_ENV=development nodemon ./server/bin/www

production:
	NODE_ENV=production node ./server/bin/www

client-dev:
	NODE_ENV=development node ./server/bin/www

build-client:
	NODE_ENV=production webpack -p

tests:
	NODE_PATH=. NODE_ENV=test mocha --compilers js:babel-register --recursive -R min
