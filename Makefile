BIN=./node_modules/.bin

run: 
	node -r ts-node/register src/index.ts

test: jest

test-watch: 
	NODE_ENV="development"
	BABEL_ENV=test ${BIN}/jest --watch

jest:
	NODE_ENV="development"
	BABEL_ENV=test ${BIN}/jest