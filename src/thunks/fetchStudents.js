import { isLoading, hasErrored } from '../actions';
import { setStudents } from '../actions/student-actions';
import { fetchStudents } from '../utils/api';

export const retrieveStudents = () => {

  return async (dispatch) => {
    try {
      dispatch(isLoading(true));
      const students = await fetchStudents();

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