# router-redux [![Build Status](https://travis-ci.org/subuta/router-redux.svg?branch=master)](https://travis-ci.org/subuta/router-redux) [![Coverage Status](https://coveralls.io/repos/github/subuta/router-redux/badge.svg?branch=master)](https://coveralls.io/github/subuta/router-redux?branch=master)
View framework agnostic [react-router-redux](https://github.com/reactjs/react-router-redux) :)

- [Stateless component](https://medium.com/@housecor/react-stateless-functional-components-nine-wins-you-might-have-overlooked-997b0d933dbc#.4ure2ot2k)を活用した開発フローを実現するライブラリです。以下のライブラリで動作確認済となります。
  - ✅[React](https://github.com/facebook/react)
  - ✅[vidom](https://github.com/dfilatov/vidom)
  - ✅[snabbdom](https://github.com/paldepind/snabbdom)
  - 他の`virtual-dom`系ライブラリでも、おそらく使えます(https://github.com/Matt-Esch/virtual-dom)
- pushState/popStateを使ったクライアントサイドでのルーティングを実現します。
- 軽量(5K以下)ですが、パワフルなRedux向けのrouterです。

Demo: http://subuta.github.io/router-redux/

## Installation
```
npm install router-redux --save
```

## Example
まず、`routerReducer`をあなたの`reducer`に`routing`をキーとして渡す必要があります。

```javascript
// In reducers/index.js
import {combineReducers} from 'redux';
import {routerReducer} from 'router-redux';

const rootReducer = combineReducers({
  routing: routerReducer // ココ
});

export default rootReducer;
```

その後、`routerMiddleware`を`createStore`に渡し、
`routerCreator`から返却された`router`をexportしておいてください。
 
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
  const currentPath = getCurrent(state).path; // statからcurrentPathを取得します。
  // ユーザをエラーページへ遷移させるか、任意のreduxアクションを呼び出すことができます。
  dispatch(push('/error'));
});

// ユーザがpath(/)に遷移した時に呼ばれます。 
router.onEnter('/', ({state}, cb) => {
  console.log('[top]loading ...', state);
  setTimeout(() => {
    // `cb`が呼び出されるまで、ユーザのページ遷移はブロックされます。
    console.log('[top]timer fired');
    cb();
    // `cb`をfalsyな値もしくはErrorオブジェクトを引数として呼び出した場合
    // router-reduxはrouteのonErrorを呼び出し、path(/)への遷移を中断します。
    // cb(new Error('[top]thrown error'));
  }, 1000);
});

// ユーザがpath(/)から別のpathに遷移する時に呼ばれます。
router.onLeave('/', (state) => {
  console.log('[top]leave');
});
```

詳細なサンプルは `example/components` 配下を見てみてください。
- `/react` -> [React](https://github.com/facebook/react) と [JSX](https://github.com/babel/babel/tree/master/packages/babel-plugin-transform-react-jsx) プラグインを使ったサンプルです。
- `/vidom` -> [vidom](https://github.com/dfilatov/vidom) を使ったサンプルです。
- `/snabbdom` -> [snabbdom](https://github.com/paldepind/snabbdom) を使ったサンプルです。
- 他(`actions/reducers/store`)は共通のredux向けのファイルです。

## Documentation

- 基本的なAPIのアイデアは [react-router-redux](https://github.com/reactjs/react-router-redux) を参考にしてます。thanks!
- 変更を加えた[object-assign](https://github.com/sindresorhus/object-assign)をライブラリサイズを減らす目的で含んでいます。thanks!

### `routerMiddleware`
Redux向けのrouter-reduxのmiddlewareです。
このmiddlewareは`createStore`関数に渡す必要があります。

```javascript
// in store.js
import routerCreator, {routerMiddleware} from 'router-redux';

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

const rootReducer = combineReducers({
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
- `path`には`/foo/:id`のような`path parameter`を含む事が出来ます。
- もし`path parameter`を指定した場合、`route-redux`は`route`オブジェクトの`route`と`params`プロパティを更新します。(詳細は`selectors`セクションを参照)
- `handler({state, dispatch}, [callback])`
- ユーザがpushState/popStateもしくはURLバーなどからの直接の遷移によって`path`に来た時に呼ばれます。
- handlerは`callback`関数が呼ばれるまで処理をブロックします。
(これは認証処理や、ページに関連するデータをAjaxで読み込む場合に便利です。)
- もし`callback`関数をfalsyな値もしくはErrorオブジェクトを引数として呼び出した場合は、
`router-redux`側で`router.onError`を呼び出し、遷移をキャンセルします。
(これは認証失敗や、サーバエラーが発生した場合に便利です。)
- もし`callback`関数を省略した場合は、onEnter関数内の結果はページ遷移に影響を及ぼしません。(非同期になるイメージ)
- もし`/`から`/foo/1`に遷移した場合は、`onEnter`に渡される`state.routing`は以下のようになります。

| key                    | value                          |
|:-----------------------|:-------------------------------|
| current                | 現在のroute (`/`)               |
| next                   | これから遷移するroute (`/foo/1`) |
| last                   | 直前のroute                     |
  
#### `router.onLeave(path, handler)`
- `handler({state, dispatch})`
- ユーザがpushState/popStateによって、`path`から去った時に呼ばれます。
- onLeaveは `初回ページ遷移後(initialRouteResolved)` に、`path`から去ったときに呼ばれます。onLeaveが呼ばれるためには、`一度はonEnterが呼ばれている`必要があります。
- もし`/`から`/foo/1`に遷移した場合は、`onLeave`に渡される`state.routing`は以下のようになります。 
  
| key                    | value            |
|:-----------------------|:-----------------|
| current                | 現在のroute (`/`) |
| next                   | `null`           |
| last                   | 直前のroute       |
 
#### `router.onError(handler)`
- `handler({state, dispatch})`
- routeErrorが`router.onEnter`で発生した時に呼ばれます。
- 実際のrouteErrorは`getRouteError`セレクタを利用して取得できます。

### `match`
- `math({path, anotherPath})`
- この関数を使うことで、currentPath(location)がpathにmatchするかチェックする事ができます。
- もしpathが`path parameter`を含んでいる場合、matchはマッチしたパラメータをオブジェクトとして返却します。

```javascript
import {
  getCurrent,
  match
} from 'router-redux';

const currentPath = getCurrent(state) && getCurrent(state).path;

// もしcurrentPath = `/`の場合
match('/', currentPath) // `{}`を返却します。

// もしcurrentPath = `/foo/1`の場合
match('/foo/:id', currentPath) // `{id: 1}`を返却します。
```

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
- `route`は以下のプロパティを持ちます。
  - path(`String`): `/foo/1 // path`
  - query(`String`): `sample=true // クエリパラメータ. クエリ文字列のparseをするためには、外部のライブラリ(https://github.com/ljharb/qs など)を利用してください。`
  - params(`Object`): `{id: 1} // matchしたパラメータ(onEnterで宣言したもの)`
  - route(`String`):  `/foo/:id // matchしたroute(onEnterで宣言したもの)`


#### `getCurrent(state)`
- `現在のroute`を`state`から抽出します。

#### `getLast(state)`
- `直前のroute`を`state`から抽出します。

#### `getNext(state)`
- `これから遷移するroute`を`state`から抽出します。

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

# Open link.
open http://localhost:3000
```

## LICENSE
[MIT](https://opensource.org/licenses/MIT)
