import { combineReducers } from 'redux';
import chat from './chat';

const allReducers = combineReducers({
  chat,
});

export default allReducers;
