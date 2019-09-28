import { SET_WORKOUTS_ORDER, SET_WORKOUTS_FILTERS } from '../actions/types';

const intialState = {
    order: 'dateNew',
    filterOptions: {}
};

export default (prevState=intialState, action) => {
	switch(action.type) {
		case SET_WORKOUTS_ORDER:
			return {...prevState, order: action.payload }
		case SET_WORKOUTS_FILTERS:
			return {...prevState, filterOptions: action.payload}
		default:
			return prevState
	}
}
