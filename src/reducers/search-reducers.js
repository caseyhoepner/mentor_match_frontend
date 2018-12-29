export const setLocale = (state = '', action) => {
  switch(action.type) {

    case 'SET_LOCALE':
      return action.locale;

    default:
      return state
  }
}

export const setSearch = (state = '', action) => {
  switch(action.type) {

    case 'SET_SEARCH':
      return action.searchTerm;

    default:
      return state
  }
}

export const toggleShowingMentors = (state = false, action) => {
  switch(action.type) {

    case 'TOGGLE_SHOWING_MENTORS':
    // console.log(action.showingAllMentors)
      return action.showingAllMentors;

    default:
      return state;
  }
}