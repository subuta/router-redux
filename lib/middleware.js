import {
  PUSH_STATE
} from "lib/actions.js";

export const isRouterReduxAction = (str) => str.indexOf("@@router-redux/") === 0;

export default function routerMiddleware(_history) {
  return (store) => (next) => (action) => {
    if (!isRouterReduxAction(action.type)) {
      return next(action)
    }

    console.log('action.type = ', action.type);

    if (action.type === PUSH_STATE) {
      _history.pushState(null, null, action.payload);
    }
  }
}
