import { combineReducers } from 'redux';
import { setLocale, setSearch } from './search-reducers';
import { setMentors, hasErrored, isLoading } from './mentors-reducers';

const rootReducer = combineReducers({
  hasErrored,
  isLoading,
  locale: setLocale,
  searchTerm: setSearch,
  mentors: setMentors
});

export default rootReducer;