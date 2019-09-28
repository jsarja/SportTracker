import { SET_WORKOUTS_ORDER, SET_WORKOUTS_FILTERS } from './types';
import { fetchWorkouts } from './workoutListActions';

export const setWorkoutsOrder = order => dispatch => {
    dispatch({
        type: SET_WORKOUTS_ORDER,
        payload: order
    });
    dispatch(fetchWorkouts())
}

export const setWorkoutsFilters = filters => dispatch => {
    dispatch({
        type: SET_WORKOUTS_FILTERS,
        payload: filters
    });
    dispatch(fetchWorkouts())
}