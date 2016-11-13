# flows
```
call push/replace action -> REQUEST_LOCATION_CHANGE
popstate(history.listen) -> REQUEST_LOCATION_CHANGE

REQUEST_LOCATION_CHANGE -> (onEnter/onLeave) -> LOCATION_CHANGE/LOCATION_CHANGE_FAILURE

LOCATION_CHANGE -> history.push // navigation
```

# Action
- push/replace = REQUEST_LOCATION_CHANGEをdispatchする。

# ActionType
- REQUEST_LOCATION_CHANGE = push/replaceアクションによって発火される。ナビゲーションを開始する。
- LOCATION_CHANGE = ナビゲーションを完了する。(ここでhistory APIを呼ぶ。)
- LOCATION_CHANGE_FAILURE = ナビゲーションを完了する。

# ルール
- location/historyを直接触らない。wrapする。
- requestAnimationFrameは使わない。
                   
# middlewareの役割
- historyAPIの呼び出し(副作用)

# routerの役割
- locationの変更に応じて(history.listen)、適切なActionをstore(middleware)にdispatchする。
- API呼び出しに応じて、適切なActionをstore(middleware)にdispatchする。
- 現在のlocationをもとにrouteをレンダリングする。
- onで特定のpathに対するlistenerをセットする。
- createRouteでlocationからrouteを生成する。
- renderで現在のrouteをもとに、適切なrenderを呼び出す。

# reducerの役割
- locationの情報を `object` として保持する。
