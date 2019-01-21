import { combineReducers } from 'redux';
import { setLocale, setSearch, toggleShowingMentors } from './search-reducers';
import { setMentors, setMentorModal, isEditable, hasErrored, isLoading, setToken } from './mentors-reducers';
import { setStudents, setRelationships } from './students-reducers';
import { changeMentorFilters } from './preferences-reducers';

const rootReducer = combineReducers({
  hasErrored,
  isLoading,
  token: setToken,
  isEditable,
  locale: setLocale,
  searchTerm: setSearch,
  mentors: setMentors,
  modalInfo: setMentorModal,
  showingAllMentors: toggleShowingMentors,
  mentorFilters: changeMentorFilters,
  students: setStudents,
  relationships: setRelationships
});

export default rootReducer;