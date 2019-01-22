import { isLoading, hasErrored } from '../actions';
import { setMentors } from '../actions/mentor-actions';
import { fetchMentors, adminFetchMentors } from '../utils/api';

export const retrieveMentors = (token) => {

  return async (dispatch) => {
    try {
      dispatch(isLoading(true));
      let mentors;
      
      if(token) {
        mentors = await adminFetchMentors();
      } else {
        mentors = await fetchMentors();
      }

      if (mentors) {
        dispatch(isLoading(false));
        dispatch(setMentors(mentors))
      }

    } catch (error) {
      console.log(error);
      dispatch(hasErrored(true));
    }
  }
}