server-dev:
	NODE_ENV=development nodemon ./server

server-prod:
	NODE_ENV=production node ./server

tests:
	NODE_PATH=. NODE_ENV=test mocha --compilers js:babel-register --recursive
