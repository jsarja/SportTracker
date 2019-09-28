import React from 'react';
import { Link } from 'react-router-dom';

import DeleteWorkoutButton from './DeleteWorkoutButton';
import WorkoutInfoRow from './WorkoutInfoRow';
import { parseWorkoutValues } from '../../utils/modifyWorkoutValues';

const renderInfoRows = (headers, values) => {
	return headers.map((header, index) => {
		const value = values[index];
		return <WorkoutInfoRow key={header[0]} header={header} value={value} />
	})
}

const WorkoutPreview = (props) => {
	const { date, distance, duration, sport } = parseWorkoutValues(props.workout);
	const headers = [['Date', 'Duration'], ['Distance', 'Sport']];
	const values = [[date, duration], [distance, sport]];
	
	return (
		<div className="w-75 mx-auto mb-2 border border-dark lead">
			{renderInfoRows(headers, values)}
			<div className="row pt-3">
				<div className="col-sm-4 offset-sm-2 text-center pb-2">
					<Link to={`/sportTracker/workouts/${props.workout.workoutId}`} className="btn btn-info">View Workout</Link>
				</div>
				<div className="col-sm-4 text-center pb-2">
					<DeleteWorkoutButton workoutId={props.workout.workoutId}/>
				</div>
			</div>
		</div>
	);
}

export default WorkoutPreview;