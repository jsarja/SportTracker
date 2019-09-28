import { getWorkouts, getWorkout, deleteWorkout } from '../apis/sportTrackerApi';

import { GET_WORKOUTS, GET_WORKOUT_DETAIL, CLEAR_WORKOUT_DETAIL, 
	DELETE_WORKOUT } from './types';
import { createMessage } from './messageActions';
import history from '../history';

// Fetches the basic information for each workout.
export const fetchWorkouts = () => async (dispatch, getState) => {
	const { auth: {googleId} } = getState();

	// Fetch workouts that match the filters from server in wanted order.
	const { workoutsFilters: {order, filterOptions} } = getState();
	try {
		const {workouts} = await getWorkouts(googleId, order, filterOptions);
		dispatch({
			type: GET_WORKOUTS,
			payload: workouts
		});
	}
	catch(e) {
		dispatch(createMessage(`Error! ${e}`, "error"));
	}
}

// Fetches detailed information including coordinates for one workout.
export const fetchWorkout = (workoutId) => async (dispatch, getState) => {
	const { auth: {googleId} } = getState();
	try {
		const workout = await getWorkout(googleId, workoutId);
		dispatch({
			type: GET_WORKOUT_DETAIL,
			payload: workout
		});
	}
	catch(e) {
		dispatch(createMessage(`Error! ${e}`, "error"));
	}
}

export const clearWorkoutDetail = () => {
	return {type: CLEAR_WORKOUT_DETAIL}
}

export const removeWorkout = (workoutId) => async (dispatch, getState) => {
	const { auth: {googleId} } = getState();
	try {
		await deleteWorkout(googleId, workoutId);
		dispatch({
			type: DELETE_WORKOUT,
			payload: workoutId
		});
		dispatch(createMessage("Workout removed!", "success"));
		history.push('/sportTracker/workouts');

	}
	catch(e) {
		dispatch(createMessage(`Error! ${e}`, "error"));
	}
}