import {combineReducers} from 'redux';
import {routerReducer} from 'router-redux';

const rootReducer = combineReducers({
  routing: routerReducer
});

export default rootReducer;
