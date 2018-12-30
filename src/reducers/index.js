import { combineReducers } from 'redux';
import { setLocale, setSearch, toggleShowingMentors } from './search-reducers';
import { setMentors, setMentorModal, isEditable, hasErrored, isLoading } from './mentors-reducers';

const rootReducer = combineReducers({
  hasErrored,
  isLoading,
  isEditable,
  locale: setLocale,
  searchTerm: setSearch,
  mentors: setMentors,
  modalInfo: setMentorModal,
  showingAllMentors: toggleShowingMentors
});

export default rootReducer;