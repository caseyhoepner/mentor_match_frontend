import { isLoading, hasErrored } from '../actions';
import { setStudents } from '../actions/student-actions';
import { fetchStudents } from '../utils/api';

export const retrieveStudents = (token) => {

  return async (dispatch) => {
    try {
      dispatch(isLoading(true));
      const students = await fetchStudents(token);

      if (students) {
        dispatch(isLoading(false));
        dispatch(setStudents(students))
      }

    } catch (error) {
      console.log(error);
      dispatch(hasErrored(true));
    }
  }
}