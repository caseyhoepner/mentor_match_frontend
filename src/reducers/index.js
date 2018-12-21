import { combineReducers } from 'redux';
import { setLocale, setSearch } from './searchReducers';

const rootReducer = combineReducers({
  locale: setLocale,
  searchTerm: setSearch
});

export default rootReducer;