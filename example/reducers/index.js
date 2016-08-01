import {combineReducers} from 'redux';
import {routerReducer} from '/lib/index.js';

import counter from './counter.js';

const rootReducer = combineReducers({
  counter,
  routing: routerReducer
});

export default rootReducer;
