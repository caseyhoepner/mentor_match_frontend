export const setLocale = (locale) => ({
  type: "SET_LOCALE",
  locale
})

export const setSearch = (searchTerm) => ({
  type: "SET_SEARCH",
  searchTerm
})

export const toggleShowingMentors = (bool) => ({
  type: "TOGGLE_SHOWING_MENTORS",
  showingAllMentors: bool
});