export const setMentors = (state = [], action) => {
  switch(action.type) {

    case 'SET_MENTORS':
      return action.mentors;

    case 'UPDATE_CHANGED_MENTOR':
    console.log('state' + JSON.stringify(state))
    console.log('action' + JSON.stringify(action))
      return state.map(mentor => {
        if (mentor.id === action.mentor.id) {
          return action.mentor;
        } else {
          return mentor
        }
      })

    default:
      return state;
  }
}

export const setMentorModal = (state = null, action) => {
  switch(action.type) {

    case 'SET_MENTOR_MODAL':
      return action.modalInfo

    default:
      return state;
  }
}

export const isLoading = (state = false, action) => {
  switch(action.type) {

    case 'IS_LOADING':
      return action.isLoading;

    default:
      return state;
  }
}

export const hasErrored = (state = false, action) => {
  switch(action.type) {

    case 'HAS_ERRORED':
      return action.hasErrored;

    default:
      return state;
  }
}