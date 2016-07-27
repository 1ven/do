## Notes management application built with React and Redux.
Try the demo at [do.1ven.me](http://do.1ven.me). Username - `test`, Password - `123456`.  

![preview](https://cloud.githubusercontent.com/assets/12725024/17170795/5a92aef0-53f6-11e6-84a2-7af742e60774.png)
## Stack:
| Package | Description |
| --- | --- |
| `react` | Awesome JavaScript library for building ui
| `redux` | Predictable state container for JavaScript apps
| `react-router` | Routing library for React
| `redux-saga` | An alternative side effect model for Redux apps
| `normalizr` | Normalizes nested JSON according to a schema
| `reselect` | Selector library for Redux
| `redux-devtools` | DevTools for Redux library
| `babel` | Compiler for writing next generation JavaScript
| `webpack` | Module bundler
## Features:
- Data caching. Everything data in application is cached, try to open board page, then go back and open it again - data will be loaded from cache instead of server.

## Installation:
1. This application requires `postgresql` database. To install it, go to this [link](https://www.postgresql.org/download/).  
2. After, you need install all dependencies using this command:
  ```
  npm install
  ```  

3. Next, you should create config `.env.develop` and `.env.production` files:
  ```
  DATABASE_URL='Place here postgres connection string like `postgres://user:password@localhost:5432/database_name`'
  JWT_SECRET='Place here jwt secret string. Can be used any long string'
  NODE_ENV='Should be `development` or `production` according to environment'
  PORT=3000
  ```
  If you want to run tests, also you need to define `.env.test` file.  

4. Before running application, you should run `postgresql` database. In most cases it should be:
  ```
  postgres -D /usr/local/var/postgres
  ```
5. Next, you can run application:  

  #### In development mode:
  ```
  npm run development
  ```
  #### In production mode:
  ```
  npm run production
  ```

## Npm commands:
| Command | Description |
| --- | --- |
| `npm install` | Install project dependencies and build client js file |
| `npm run development` | Run server with webpack in `development` mode |
| `npm run production` | Run server in `production` mode |
| `npm run bundle` | Build client javascript file for production |
| `npm run deploy` | Deploy app to heroku |
| `npm run tests` | Run client and server tests |
| `npm run tests-client` | Run client tests |
| `npm run tests-server` | Run server tests |
## Todo
- Implement drag and drop for Boards, Lists and Cards.
