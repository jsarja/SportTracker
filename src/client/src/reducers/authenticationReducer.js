import { USER_LOGIN, USER_LOGOUT } from '../actions/types';

const NO_USER = {
	loggedIn: false,
	googleId: null,
	newUser: false
}

export default function(prevState = NO_USER, action) {
	switch(action.type) {
		case USER_LOGIN:
			const {googleId, newUser} = action.payload;
			return {...true, loggedIn: true, googleId, newUser};

		case USER_LOGOUT:
			return {...NO_USER};

		default:
			return prevState;
	}
}
