import { GET_WORKOUTS, DELETE_WORKOUT } from '../actions/types';

export default (prevState = [], action) => {
	switch(action.type) {
		case GET_WORKOUTS:
			return action.payload;
		case DELETE_WORKOUT:
			return prevState.filter(workout => workout.workoutId !== action.payload);
		default:
			return prevState;
	}
}