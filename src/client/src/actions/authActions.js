import { USER_LOGIN, USER_LOGOUT } from '../actions/types';
import history from '../history';
import { getLoginInformation } from '../apis/sportTrackerApi';

export function userLoggedOut() {
	return dispatch => {
		dispatch({type: USER_LOGOUT});
	}
}


export function userLoggedIn(googleId) {
	return async dispatch => {
		// Check from server if user is new show the app can display new user
		// welcome modal accordingly.
		const response = await getLoginInformation(googleId);
		dispatch({
			type: USER_LOGIN,
			payload: {
				googleId,
				newUser: response.newUser
			}
		});
		history.push('/sportTracker/newWorkout');
	};
}

// This action is called if user refreshes page or navigates to the page 
// when he/she is already logged in.
export function updateAuthOnRefresh(googleId) {
	return {
		type: USER_LOGIN,
		payload: {
			googleId,
			newUser: false
		}
	}
}
