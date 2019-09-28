import { START_LIVE, UPDATE_LIVE_TIME, CLEAR_LIVE, 
		SET_WORKOUT_END_TIME, UPDATE_LOCATION } from '../actions/types';

export default function(prevState = {coordinates: []}, action) {
	switch(action.type) {
		case START_LIVE:
			const { startTime, sport} = action.payload;
			return {...prevState, startTime, sport, duration: 0, distance: 0.0}

		case UPDATE_LIVE_TIME:
			return {...prevState, duration: action.payload}

		case CLEAR_LIVE:
			return {coordinates: []}

		case SET_WORKOUT_END_TIME:
			return {...prevState, endTime: action.payload}

		case UPDATE_LOCATION:
			const coordinates = [...prevState.coordinates, 
				action.payload.coordinates];
			const distance = +(Math.round(prevState.distance + 
				action.payload.distance + "e+3")  + "e-3")
			return {...prevState, coordinates, distance }
			
		default:
			return prevState;
	}
}