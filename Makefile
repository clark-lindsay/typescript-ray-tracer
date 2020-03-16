BIN=./node_modules/.bin

run: 
	node -r ts-node/register src/index.ts

test: jest

jest:
	NODE_ENV="development"
	BABEL_ENV=test ${BIN}/jest