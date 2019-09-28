import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { parseWorkoutValues } from '../../utils/modifyWorkoutValues';
import { fetchWorkout, clearWorkoutDetail } from '../../actions';
import DeleteWorkoutButton from './DeleteWorkoutButton';
import WorkoutInfoRow from './WorkoutInfoRow';
import GoogleMapsRoute from '../googleMaps/GoogleMapsRoute';

class WorkoutDetail extends React.Component {
	componentDidMount() {
		this.props.fetchWorkout(this.props.match.params.id);
	}

	componentWillUnmount() {
		this.props.clearWorkoutDetail();
	}

	renderInfoRows(headers, values) {
		return headers.map((header, index) => {
			const value = values[index];
			return <WorkoutInfoRow key={header} header={header} value={value} />
		})
	}

	renderMap(){
		if(this.props.workout.workoutCoordinates) {
			return (
				<div className="text-center">
					<b>Route:</b>
					<GoogleMapsRoute 
						coordinates={this.props.workout.workoutCoordinates}
					/>
				</div>
			);
		}
	}

	render() {
		if(!this.props.workout.workoutInfo) {
			return <p><i>Loading...</i></p>
		} 
		
		const { date, distance, duration, heartRate, calories, sport, startTime, 
			endTime, notes, speed } = parseWorkoutValues(this.props.workout.workoutInfo);
		const headers = [['Date', 'Duration'], ['Distance', 'Heart Rate'], 
			['Calories', 'Sport'], ['Average Speed']];
		const values = [[date, duration], [distance, heartRate], 
			[calories, sport], [speed]];

		if(startTime !== '-') {
			values.push([startTime])
			values.push([endTime])
			headers.push(['Sarted At'])
			headers.push(['Ended At'])
		}
		if(notes !== '-') {
			values.push([notes])
			headers.push(['Notes'])
		}

		return (
			<>
			<div className="row">
				<div className="col-lg-6 offset-lg-3 col-md-4 offset-md-4">
					<h3 className="text-center">Workout at <br/> {date}</h3>
				</div>
				<div className="col-lg-3 col-md-4 text-center mb-2">
					<Link to="/sportTracker/workouts" className="btn btn-info">Back to workouts</Link>
				</div>
			</div>
				
			<div className="w-75 mx-auto mb-2 border border-dark lead">
				{this.renderInfoRows(headers, values)}
				{this.renderMap()}
				<div className="row pt-3 pb-2">
					<div className="col-sm-4 offset-sm-4 text-center">
						<DeleteWorkoutButton workoutId={this.props.workout.workoutInfo.workoutId}/>
					</div>
				</div>
			</div>
			</>
		);	
	}
}

const mapStateToProps = (state, ownProps) => {
	return { 
		workout: state.workoutDetail
	}
}
export default connect(mapStateToProps, { fetchWorkout, clearWorkoutDetail })(WorkoutDetail)
