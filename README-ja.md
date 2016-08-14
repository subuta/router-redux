# router-redux [![Build Status](https://travis-ci.org/subuta/router-redux.svg?branch=master)](https://travis-ci.org/subuta/router-redux) [![Coverage Status](https://coveralls.io/repos/github/subuta/router-redux/badge.svg?branch=master)](https://coveralls.io/github/subuta/router-redux?branch=master)
View framework agnostic router for redux :)
this is [react-router-redux](https://github.com/reactjs/react-router-redux) for your vdom-based project.

- `virtual-dom`系のライブラリを利用した開発フローを簡単にします。
    - [virtual-dom](https://github.com/Matt-Esch/virtual-dom)と使ったり
    - [snabbdom](https://github.com/paldepind/snabbdom)する想定です。
- pushState/popStateを使ったクライアントサイドでのルーティングを実現します。
- 軽量(5K以下)ですが、パワフルなRedux向けのrouterです。

## Installation
```
npm install router-redux --save
```

## Example
まず、`routerReducer`をあなたの`reducer`に`routing`をキーとして渡す必要があります。

```javascript
// in reducers/index.js
import {combineReducers} from 'redux';
import {routerReducer} from 'router-redux';

import counter from './counter.js'; // 自分で書いたやつ

const rootReducer = combineReducers({
  counter,
  routing: routerReducer // ココ
});

export default rootReducer;
```

その後、`routerMiddleware`を`createStore`に渡し、
`routerCreator`から返却された`router`をexportしておいてください。
 
```javascript
// in example/store.js
import routerCreator, {routerMiddleware} from 'lib/index.js';

import reducer from './reducers/index.js';
const middlewares = [routerMiddleware];
const store = createStore(reducer, compose(
  applyMiddleware(...middlewares)
));

export const router = routerCreator(store);
```

`router`を使うことで、pushState/popStateに基づいたReduxでのルーティングを行うことができます。

```javascript
// 前の手順でexportしたrouter
import {router} from 'example/store.js';

// action/selectorを`router-redux`からimportする。
import {
  push,
  getCurrent
} from 'router-redux';

// もし初回ルーティング時のエラーを検知したいのであれば、まずonErrorを登録してください。
router.onError(({state, dispatch}) => {
  const currentPath = getCurrent(state); // will extract currentPath from state(like '/')
  // you can navigate user to error page or call any other redux action.
  dispatch(push('/error'));
});

// ユーザがpath(/)に遷移した時に呼ばれます。 
router.onEnter('/', ({state}, cb) => {
  console.log('loading ...');
  setTimeout(() => {
    console.log('enter in top');
    // user's navigation action will blocked untill `cb` called.
    cb();
    // if you call `cb` with falsy value or Error object,
    // router-redux will emit router's onError. and stop routing to path(/).
    // cb(new Error('some error in top'));
  }, 1000);
});

// ユーザがpath(/)から別のpathに遷移する時に呼ばれます。
router.onLeave('/', (state) => {
  console.log('leave from top');
});
```

## Documentation

基本的なAPIのアイデアは [react-router-redux](https://github.com/reactjs/react-router-redux) を参考にしてます。ありがとうございます！

### `routerMiddleware`
Redux向けのrouter-reduxのmiddlewareです。
このmiddlewareは`createStore`関数に渡す必要があります。

```javascript
// in store.js
import routerCreator, {routerMiddleware} from 'lib/index.js';

import reducer from './reducers/index.js';
const middlewares = [routerMiddleware];
const store = createStore(reducer, compose(
  applyMiddleware(...middlewares)
));

export const router = routerCreator(store);
```

### `routerReducer()`
Redux向けのrouter-reduxのreducerです。
このreducerは`combineReducers`関数に渡す必要があります。

```javascript
// in reducers/index.js
import {combineReducers} from 'redux';
import {routerReducer} from 'router-redux';

import counter from './counter.js'; // 自分で書いてるやつ

const rootReducer = combineReducers({
  counter,
  routing: routerReducer // ココ
});

export default rootReducer;
```

### `routerCreator(store)`
`router-redux`をインポートすると、`routerCreator`が取得できます。
`routerCreator`関数に`store`を渡すことで、のちほど必要になる`router`が返却されます。 

- `export const router = routerCreator(store)`

### `router`
上記の`routerCreator`から作られます。これを利用して、独自のhandlerをrouterに定義する事ができます。

#### `router.onEnter(path, handler)`
- `handler({state, dispatch}, [callback])`
- ユーザがpushState/popStateもしくはURLバーなどからの直接の遷移によって`path`に来た時に呼ばれます。
- handlerは`callback`関数が呼ばれるまで処理をブロックします。
(これは認証処理や、ページに関連するデータをAjaxで読み込む場合に便利です。)
- もし`callback`関数をfalsyな値もしくはErrorオブジェクトを引数として呼び出した場合は、
`router-redux`側で`router.onError`を呼び出し、遷移をキャンセルします。
(これは認証失敗や、サーバエラーが発生した場合に便利です。)
- もし`callback`関数を省略した場合は、onEnter関数内の結果はページ遷移に影響を及ぼしません。(非同期になるイメージ)
  
#### `router.onLeave(path, handler)`
- `handler({state, dispatch})`
- ユーザがpushState/popStateに寄って、`path`から去った時に呼ばれます。
 
#### `router.onError(handler)`
- `handler({state, dispatch})`
- routeErrorが`router.onEnter`で発生した時に呼ばれます。
- 実際のrouteErrorは`getRouteError`セレクタを利用して取得できます。

### actions
- redux向けのアクションを作ります。このアクションを利用してstore.dispatchを呼び出す必要があります。 

#### `push(path)/replace(path)`
- `path`へのpush/replaceアクションを作ります。
- このアクションをstoreにdispatchすることで、[history API](https://developer.mozilla.org/en-US/docs/Web/API/History_API)のpushState/replaceStateメソッドが呼び出されます。

#### `go(page)/back()/forward()`
- `path`へのgo/back/forwardアクションを作ります。
- このアクションをstoreにdispatchすることで、[history API](https://developer.mozilla.org/en-US/docs/Web/API/History_API)のgo/back/forwardメソッドが呼び出されます。

### selectors
- stateから値を抽出します。これらのセレクタは [reselect](https://github.com/reactjs/reselect) などから呼ぶことを想定しています。

#### `getCurrent(state)`
- `現在のpath`を`state`から抽出します。

#### `getLast(state)`
- `直前のpath`を`state`から抽出します。

#### `getRouteError(state)`
- `routeError`を`state`から抽出します。
- `routeError`はonEnterに渡したhandlerの`callback`にfalsyな値もしくはErrorオブジェクトを渡した場合に、`true`もしくは渡されたErrorオブジェクトが代入されます。

#### `getIsInitalRouteResolved(state)`
- `isInitialRouteResolved`を`state`から抽出します。
- `isInitialRouteResolved`はonEnterに渡したhandlerの`callback`が初めて呼び出された以降に、`true`になります。
- これは初回のページ描画の時に便利です。（ブラウザのURLバーで遷移した時）

## Development
### 1. Clone this repo

```
git clone https://github.com/subuta/redux-virtual-dom
cd ./redux-virtual-dom
```

### 2. Install dependencies

- Caddy (Web server for Development)
- jspm@beta (for package management/build)

```
brew install caddy
npm install jspm@beta -g
npm i
jspm i
```

### 3. Run example app

```
caddy

# open link.
open http://localhost:3000
```

## LICENSE
[MIT](https://opensource.org/licenses/MIT)

## TODO
- [x] add README.
- [x] publish to npm  
- [x] add tests
- [ ] add better route name handling with these libraries
  - [url-pattern](https://github.com/snd/url-pattern)
  - [qs](https://github.com/ljharb/qs)
