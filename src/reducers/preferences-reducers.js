export const changeMentorFilters = (state = {}, action) => {
  switch(action.type) {

    case 'CHANGE_MENTOR_FILTERS':
      return action.mentorFilters;

    default:
      return state;
  }
}