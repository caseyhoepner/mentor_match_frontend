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

