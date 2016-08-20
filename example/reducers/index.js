import {combineReducers} from 'redux';
import {routerReducer} from 'lib/index.js';

const rootReducer = combineReducers({
  routing: routerReducer
});

export default rootReducer;
