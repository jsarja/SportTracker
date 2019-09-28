import React from 'react';
import { Redirect } from 'react-router-dom';

function RedirectToMain() {
	return <Redirect to='/sportTracker/newWorkout' />
}

export default RedirectToMain;