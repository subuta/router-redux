# router-redux [![Build Status](https://travis-ci.org/subuta/router-redux.svg?branch=master)](https://travis-ci.org/subuta/router-redux) [![Coverage Status](https://coveralls.io/repos/github/subuta/router-redux/badge.svg?branch=master)](https://coveralls.io/github/subuta/router-redux?branch=master)
View framework agnostic router for redux :)
This is [react-router-redux](https://github.com/reactjs/react-router-redux) for your vdom-based project.

- Make your vdom-based development flow easy.
  - With [virtual-dom](https://github.com/Matt-Esch/virtual-dom)
  - Or [snabbdom](https://github.com/paldepind/snabbdom)
- Adds pushState/popState based client-side routing to your project.
- Light weight(around 5K) but yet powerful router for Redux.

[README - 日本語版](README-ja.md)

## Installation
```
npm install router-redux --save
```

## Example
First you need to pass `routerReducer` to your own `reducer` with `routing` key.

```javascript
// In reducers/index.js
import {combineReducers} from 'redux';
import {routerReducer} from 'router-redux';

const rootReducer = combineReducers({
  routing: routerReducer // HERE
});

export default rootReducer;
```

Next you need to pass `routerMiddleware` to your `createStore` function. 
Then create and export `router` using `routerCreator`.
 
```javascript
// In example/store.js
import routerCreator, {routerMiddleware} from 'router-redux';

import reducer from './reducers/index.js';
const middlewares = [routerMiddleware];
const store = createStore(reducer, compose(
  applyMiddleware(...middlewares)
));

export const router = routerCreator(store);
```

Then `router` enables you to pushState/popState based routing with redux.

```javascript
// Get your exported router
import {router} from 'example/store.js';

// Get router action/selector from router-redux
import {
  push,
  getCurrent
} from 'router-redux';

// Register onError first (if you need to catch initialRouting error)
router.onError(({state, dispatch}) => {
  const currentPath = getCurrent(state).path; // Will extract currentPath from state
  // You can navigate user to error page or call any other redux action.
  dispatch(push('/error'));
});

// Called when user entered to path(/) 
router.onEnter('/', ({state}, cb) => {
  console.log('[top]loading ...', state);
  setTimeout(() => {
    // User's navigation action will blocked untill `cb` called.
    console.log('[top]timer fired');
    cb();
    // If you call `cb` with falsy value or Error object,
    // Router-redux will emit router's onError. and stop routing to path(/).
    // cb(new Error('some error in top'));
  }, 1000);
});

// Called when user leave from path(/)
router.onLeave('/', (state) => {
  console.log('[top]leave');
});
```

## Documentation

- API idea came from [react-router-redux](https://github.com/reactjs/react-router-redux) thanks!
- Includes modified version of [object-assign](https://github.com/sindresorhus/object-assign) to reduce library size. thanks!

### `routerMiddleware`
router-redux's middleware function for redux.
You need to register it in your `createStore` function.

```javascript
// In store.js
import routerCreator, {routerMiddleware} from 'router-redux';

import reducer from './reducers/index.js';
const middlewares = [routerMiddleware];
const store = createStore(reducer, compose(
  applyMiddleware(...middlewares)
));

export const router = routerCreator(store);
```

### `routerReducer()`
router-redux's reducer function for redux.
You need to register it in your `combineReducers` function.

```javascript
// In reducers/index.js
import {combineReducers} from 'redux';
import {routerReducer} from 'router-redux';

const rootReducer = combineReducers({
  routing: routerReducer // here
});

export default rootReducer;
```

### `routerCreator(store)`
When you import `router-redux`, it gives you `routerCreator`,
You need to pass `store` to `routerCreator`, and it returns `router` for later use. 

- `export const router = routerCreator(store)`

### `router`
Will created by `routerCreator` above. You can register your own handler function to router.

#### `router.onEnter(path, handler)`
- `path` can includes `path parameter` like (/foo/:id)
- If you specify `path parameter` to path, `router-redux` will set `route` and `params` properties in `route` object(please refer `selectors` section).
- `handler({state, dispatch}, [callback])`
- Called when user navigated to `path` by pushState/popState or directly(by browser's url bar)
- Handler will block routing until `callback` function is called.
(This is useful for Authentication or Load page related data via ajax)
- If you call `callback` function with falsy value(or Error object). `router-redux` will call `router.onError`
and cancel navigation. (this is useful for handling un-authorized response or Server error)
- If you omit `callback` function then your onEnter result will not affect to further navigation(become asynchronous).
- If you navigate to `/foo/1` from `/`, your state.routing in `onEnter` function will looks like below.
  
| Key                    | Value                 |
|:-----------------------|:----------------------|
| current                | current route (`/`)   |
| next                   | next route (`/foo/1`) |
| last                   | previous route        |

#### `router.onLeave(path, handler)`
- `handler({state, dispatch})`
- Called when user navigated from `path` by pushState/popState
- If you navigate to `/foo/1` from `/`, Your `state.routing` in `onLeave` function will looks like below.
  
| Key                    | Value                 |
|:-----------------------|:----------------------|
| current                | current route (`/`)   |
| next                   | `null`                |
| last                   | previous route        |

#### `router.onError(handler)`
- `handler({state, dispatch})`
- Called when routeError occurred in `router.onEnter`
- You can get actual routeError using `getRouteError` selector.

### `match`
- `math({path, anotherPath})`
- You can use this function to check currentPath(location) is matched to path.
- If your path contains `path parameter` then match will return matched params as object.

```javascript
import {
  getCurrent,
  match
} from 'router-redux';

const currentPath = getCurrent(state) && getCurrent(state).path;

// If currentPath = `/`
match('/', currentPath) // will return `{}`

// If currentPath = `/foo/1`
match('/foo/:id', currentPath) // will return `{id: 1}`
```

### actions
- Will creates redux action. You need to call store.dispatch with this action.

#### `push(path)/replace(path)`
- Create push/replace action with `path`.
- When you dispatch push/replace action. router'redux will call pushState/replaceState of [history API](https://developer.mozilla.org/en-US/docs/Web/API/History_API)

#### `go(page)/back()/forward()`
- Create go/back/forward action.
- When you dispatch go/back/forward action. router'redux will call go/back/forward of [history API](https://developer.mozilla.org/en-US/docs/Web/API/History_API)

### selectors
- Will extracts value from your state. You can use selectors with [reselect](https://github.com/reactjs/reselect) if you like.
- `route` has these properties
  - path(`String`): `/foo/1 // Path`
  - query(`String`): `sample=true // Query param. you can use third-party library(https://github.com/ljharb/qs) to parse query.`
  - params(`Object`): `{id: 1} // Matched params(declared in onEnter)`
  - route(`String`):  `/foo/:id // Matched route(declared in onEnter)`

#### `getCurrent(state)`
- Extracts `current route` from `state`

#### `getLast(state)`
- Extracts `last route` from `state`

#### `getNext(state)`
- Extracts `next route` from `state`

#### `getRouteError(state)`
- Extracts `routeError` from `state`
- `routeError` become `true` or `Error`(truthy value) when you call onEnter handler's `callback` with falsy value or Error object.

#### `getIsInitalRouteResolved(state)`
- Extracts `isInitialRouteResolved` from `state`
- `isInitialRouteResolved` become `true` after you call initial onEnter handler's `callback`.
- This is useful for initial page rendering(via browser's url bar navigation).

## Development
### 1. Clone this repo

```
git clone https://github.com/subuta/redux-virtual-dom
cd ./redux-virtual-dom
```

### 2. Install dependencies

- Caddy (Web server for Development)
- jspm@beta (For package management/build)

```
brew install caddy
npm install jspm@beta -g
npm i
jspm i
```

### 3. Run example app

```
caddy

# Open link.
open http://localhost:3000
```

## LICENSE
[MIT](https://opensource.org/licenses/MIT)
