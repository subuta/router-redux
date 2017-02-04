# router-redux [![Build Status](https://travis-ci.org/subuta/router-redux.svg?branch=master)](https://travis-ci.org/subuta/router-redux) [![Coverage Status](https://coveralls.io/repos/github/subuta/router-redux/badge.svg?branch=master)](https://coveralls.io/github/subuta/router-redux?branch=master)
View framework agnostic [react-router-redux](https://github.com/reactjs/react-router-redux) :)

- Make your [Stateless component](https://medium.com/@housecor/react-stateless-functional-components-nine-wins-you-might-have-overlooked-997b0d933dbc#.4ure2ot2k) based development flow easy. work with these libraries.
  - ✅[React](https://github.com/facebook/react)
  - ✅[vidom](https://github.com/dfilatov/vidom)
  - ✅[snabbdom](https://github.com/paldepind/snabbdom)
  - Should also work with other vdom libraries(https://github.com/Matt-Esch/virtual-dom)
- Adds pushState/popState based client-side routing to your project.
- Light weight(around 7K) but yet powerful router for Redux.

Demo: http://subuta.github.io/router-redux/

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
Then create and export `router`.
 
```javascript
// In example/store.js
import createRouter, {routerMiddleware} from 'router-redux';

import reducer from './reducers/index.js';
const middlewares = [routerMiddleware];
const store = createStore(reducer, compose(
  applyMiddleware(...middlewares)
));

export const router = createRouter(store);
```

Then `router` enables you to pushState/popState based routing with redux.

```javascript
// Get your exported router
import {router} from 'example/store.js';}

// Get router selector from router-redux
import {
  getRouteError
} from 'router-redux';

// Register onError first (if you need to catch routing error)
router.onError(({state, dispatch}) => {
  const routeError = getRouteError(state); // will extract error message from state.
  console.log('routeError.message = ', routeError.message);
  router.push('/error');
  // You can navigate user to error page or call any other redux action.
  dispatch(push('/error'));
});

// Called when user entered to path(/)
const onEnter = ({state}, cb) => {
  console.log('[top]loading ...', state);
  setTimeout(() => {
    // User's navigation action will blocked untill `cb` called.
    console.log('[top]timer fired');
    cb();
    // If you call `cb` with falsy value or Error object,
    // Router-redux will emit router's onError. and stop routing to path(/).
    // cb(new Error('[top]thrown error'));
  }, 1000);
};

// Called when user leave from path(/)
const onLeave = ({state}) => {
  console.log('[top]leave');
};

// Simple component to render.
const Top = () => {
  return <h1>top</h1>;
};

router.on('/', <Top onEnter={onEnter} onLeave={onLeave}/>)
```

see `example/components` for full example.
- `/react` -> example of [React](https://github.com/facebook/react) with [JSX](https://github.com/babel/babel/tree/master/packages/babel-plugin-transform-react-jsx) plugin.
- `/vidom` -> example of [vidom](https://github.com/dfilatov/vidom) plugin.
- `/snabbdom` -> example of [snabbdom](https://github.com/paldepind/snabbdom)
- other files are common redux files(`actions/reducers/store`)

## Documentation

- API idea came from [react-router-redux](https://github.com/reactjs/react-router-redux) thanks!

### `routerMiddleware`
router-redux's middleware function for redux.
You need to register it in your `createStore` function.

```javascript
// In store.js
import createRouter, {routerMiddleware} from 'router-redux';

import reducer from './reducers/index.js';
const middlewares = [routerMiddleware];
const store = createStore(reducer, compose(
  applyMiddleware(...middlewares)
));

export const router = createRouter(store);
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

### `createRouter(store)`
When you import `router-redux`, it gives you `createRouter`,
You need to pass `store` to `routerCreator`, and it returns `router` for later use. 

- `export const router = createRouter(store)`

Optionally you can pass [history](https://github.com/ReactTraining/history) to createRouter like below.

```
import createHistory from 'history/createBrowserHistory'
const history = createHistory({basename: '/router-redux'});
export const router = createRouter(store, {history})
```

### `router`
Will created by `routerCreator` above.
`router` will handle these basic router operation.

- register your render/onEnter/onLeave function to the router using `router.on(path, handler)`
- navigate to other route using `router.push` and other history API based action `replace/go/back/forward`

#### `router.on(path, handler)`
- will register your render function to router. 
- `path` can includes `path parameter` like (/foo/:id) and `path` can be '*'(wildcard) for default route.
- `handler` will accepts these value.
  - `router.on(path, {render, onEnter, onLeave})` -> is formal syntax.
  - `router.on(path, <Component onEnter={onEnter} onLeave={onLeave}/>)` -> is jsx version of formal syntax 
  - `router.on(path, fn)` -> will call passed function as `render` function.
- if current location matches passed `path` then `router.on` will call passed `onEnter` as initial route.

##### `onEnter(handler)`
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

##### `onLeave(handler)`
- `handler({state, dispatch})`
- Called when user navigated from `path` by pushState/popState
- onLeave is called only user navigated from `path` after `initialRouteResolved`, it means you need to bind `onEnter` callback to use onLeave.
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

### `router.render`
- `router.render()`
- After register your routes using `router.on(path, handler)` you need to call `router.render` to render component based on current route(location).
- if not route matches current location then router will render `*` route as a default route.   

```javascript
import {
  inject,
  router
} from 'example/store.js'

import {
  getIsLoading
} from 'router-redux';

router.on('/', <Top onEnter={onEnter} onLeave={onLeave}/>)

const render = inject(({state}) => {
  if (getIsLoading(state)) {
    return <h1>loading ...</h1>
  }
  return router.render();
});
```

#### `router.push(path)/router.replace(path)`
- Create push/replace internal action with `path`.
- When you call push/replace action. router'redux will call pushState/replaceState of [history API](https://developer.mozilla.org/en-US/docs/Web/API/History_API)

#### `router.go(page)/router.back()/router.forward()`
- Create go/back/forward internal action.
- When you dispatch go/back/forward action. router'redux will call go/back/forward of [history API](https://developer.mozilla.org/en-US/docs/Web/API/History_API)

### selectors
- Will extracts value from your state. You can use selectors with [reselect](https://github.com/reactjs/reselect) if you like.
- `route` has these properties
  - pathname(`String`): `/foo/1 // path`
  - search(`String`): `sample=true // Query param. you can use third-party library(https://github.com/ljharb/qs) to parse query.`
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

#### `getIsLoading(state)`
- Extracts `isLoading` from `state`
- `isLoading` become `true` after onEnter called and until onEnter resolved(by call `cb`).
- This is useful to implement page loading animation.

## Development
### 1. Clone this repo

```
git clone https://github.com/subuta/router-redux
cd ./router-redux
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
