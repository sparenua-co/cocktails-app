import { combineReducers } from 'redux';
import cocktailsReducer from './cocktailsReducer';

const rootReducer = combineReducers({
  cocktails: cocktailsReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
