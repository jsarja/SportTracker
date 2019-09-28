import React from 'react';
import { Link } from 'react-router-dom';

import './NewWorkoutNav.css';

function NewWorkoutNav(props) {
	return (
		<div className="nav-container">
			<Link to="/sportTracker/newWorkout" className={"nav-btn " + props.live}>
				<span className="Centerer"></span>
				<span className='Centered'>Start Tracking</span>
			</Link>
			<Link to="/sportTracker/newWorkout/create"  className={"nav-btn " + props.insert}>
				<span className="Centerer"></span>
				<span className='Centered'>Insert Manually</span>
			</Link>
		</div>
	)
}

export default NewWorkoutNav;