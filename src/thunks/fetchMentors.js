import { isLoading, hasErrored } from '../actions';
import { setMentors } from '../actions/mentor-actions';
import { fetchMentors } from '../utils/api';

export const retrieveMentors = (token) => {

  return async (dispatch) => {
    try {
      dispatch(isLoading(true));
      const mentors = await fetchMentors(token);

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