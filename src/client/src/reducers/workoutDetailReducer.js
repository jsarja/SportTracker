import { GET_WORKOUT_DETAIL, CLEAR_WORKOUT_DETAIL } from '../actions/types';

export default (prevState = {}, action) => {
	switch(action.type) {
		case GET_WORKOUT_DETAIL:
            return {...action.payload}
        case CLEAR_WORKOUT_DETAIL:
            return {}
		default:
			return prevState;
	}
}