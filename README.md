# notskype-qdb [![Build Status](https://travis-ci.org/nolanlum/notskype-qdb.svg?branch=master)](https://travis-ci.org/nolanlum/notskype-qdb)

## Developing
#### Prereqs
- Mongo is running
- Make sure [the backend](https://github.com/nolanlum/notskype-qdb-backend) is running

```
npm install
# Run these dev daemons in parallel
webpack --watch
nodemon dist/server.bundle.js
```
