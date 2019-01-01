import { combineReducers } from 'redux';
import { setLocale, setSearch, toggleShowingMentors } from './search-reducers';
import { setMentors, setMentorModal, isEditable, hasErrored, isLoading } from './mentors-reducers';
import { changeMentorFilters } from './preferences-reducers';

const rootReducer = combineReducers({
  hasErrored,
  isLoading,
  isEditable,
  locale: setLocale,
  searchTerm: setSearch,
  mentors: setMentors,
  modalInfo: setMentorModal,
  showingAllMentors: toggleShowingMentors,
  mentorFilters: changeMentorFilters
});

export default rootReducer;