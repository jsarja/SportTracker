import React from 'react';

import history from '../../../history'

// import './LiveEndBtn.css';

class LiveEndBtn extends React.Component {
	render() {

		return (
				<button 
					onClick={() => history.push("/sportTracker/newWorkout/create")}
					className="btn btn-primary mt-2 mb-4"
				>
					End Workout
				</button>
		);
	};
}

export default LiveEndBtn;