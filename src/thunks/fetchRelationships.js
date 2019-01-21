import { isLoading, hasErrored } from '../actions';
import { setRelationships } from '../actions/student-actions';
import { fetchRelationships } from '../utils/api';

export const retrieveRelationships = (token) => {

  return async (dispatch) => {
    try {
      dispatch(isLoading(true));
      const relationships = await fetchRelationships(token);

      if (relationships) {
        dispatch(isLoading(false));
        dispatch(setRelationships(relationships))
      }

    } catch (error) {
      console.log(error);
      dispatch(hasErrored(true));
    }
  }
}