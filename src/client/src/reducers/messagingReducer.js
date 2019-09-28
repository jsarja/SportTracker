import { CREATE_MESSAGE, CLEAR_MESSAGE } from '../actions/types';

export default (prevState=null, action) => {
	switch(action.type) {
		case CREATE_MESSAGE:
			return {...action.payload}
		case CLEAR_MESSAGE:
			return null
		default:
			return prevState
	}
}