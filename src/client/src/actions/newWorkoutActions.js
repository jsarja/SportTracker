import { START_LIVE, UPDATE_LIVE_TIME, CLEAR_LIVE, SET_WORKOUT_END_TIME,
	UPDATE_LOCATION } from './types';
import { createMessage } from './messageActions';
import history from '../history';
import { postWorkout } from '../apis/sportTrackerApi';

export function startLive(sport) {
	const currentTime = new Date();
	return {
		type: START_LIVE,
		payload: {
			sport,
			startTime: currentTime
		}
	};
}

export function updateLiveTime(duration) {
	return {
		type: UPDATE_LIVE_TIME,
		payload: duration
	};
}

export function updateLocation(coordinates, distance) {
	return {
		type: UPDATE_LOCATION,
		payload: {coordinates, distance}
	};
}

export function setWorkoutEndTime(time) {
	return {
		type: SET_WORKOUT_END_TIME,
		payload: time
	};
}

export function saveWorkout(formValues) {
	return async (dispatch, getState) => {
		try {
			const { auth: {googleId} } = getState();
			await postWorkout(googleId, formValues);

			// Live workout data is no longer needed after the workout is saved.
			dispatch({ type: CLEAR_LIVE });
			
			dispatch(createMessage("Workout saved!", "success"));
			history.push('/sportTracker/workouts');
		} 
		catch(e) {
			dispatch(createMessage(`Error! ${e}`, "error"));
		}
	}
}

export function discardWorkout() {
	history.push('/sportTracker/newWorkout');
	return {
		type: CLEAR_LIVE
	};
}

