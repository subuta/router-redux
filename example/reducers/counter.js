import {combineReducers} from 'redux';

const count = (state = 0, action) => {
  switch (action.type) {
    case 'increment':
      return state + 1;
    case 'decrement':
      return state - 1;
    default:
      return state;
  }
};

const counter = combineReducers({
  count
});

export default counter;


// selectors
export const getCount = (state) => {
  return state.counter.count;
};
