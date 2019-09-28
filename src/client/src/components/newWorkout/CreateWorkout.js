import React from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';

import NewWorkoutNav from './NewWorkoutNav';
import WorkoutForm from './WorkoutForm';
import { secondsToTimeFormat } from '../../utils/modifyWorkoutValues';
import { saveWorkout, discardWorkout } from '../../actions';
import { datesForStringify } from '../../utils/modifyWorkoutValues';
import history from '../../history';

class CreateWorkout extends React.Component {
	promptLeaving(e) {
		e = e || window.event;
		if (e) {
			e.returnValue = 'Sure?';
		}
		return 'Sure?';
	}

	removeBlocking() {
		// Remove restrictions for leaving the page.
		if(this.props.liveWorkout.sport) {
			window.removeEventListener("beforeunload", this.promptLeaving);
			this.unblock();
		}
	}

	componentDidMount() {
		if(this.props.liveWorkout.sport) {
			// Hide side bar if user navigated to the page from live workout.
			if(document.querySelector('#sidebar')) {
				document.querySelector('#sidebar').style.display = "none";
				document.querySelector('#sidebarOpen').style.display = "none";
			}
			// Check user if he wants to leave the page.
			window.addEventListener('beforeunload', this.promptLeaving);

			// Also block navigation to unwanted routes inside the react 
			// application.
			this.unblock = history.block(targetLocation => {
				if(targetLocation.pathname !== '/sportTracker/newWorkout' 
				&& targetLocation.pathname !== '/sportTracker/workouts') {
					return false;
				}
			});
		}
	}

	saveWorkout = formValues => {
		// Remove restrictions set for the page when user navigated to the page 
		// from live workout.
		this.removeBlocking();
		document.querySelector('#sidebar').style.display = "flex";
		document.querySelector('#sidebarOpen').style.display = "flex";

		// Modify form values before sending them to the server.
		const dbValues = _.omit(formValues, ['hours', 'minutes', 'seconds']);
		dbValues.workoutDate = new Date();
		datesForStringify(dbValues);
		this.props.saveWorkout(dbValues);
	}

	discardForm = () => {
		this.removeBlocking();
		document.querySelector('#sidebar').style.display = "flex";
		document.querySelector('#sidebarOpen').style.display = "flex";

		this.props.discardWorkout();
	}

	render() {
		// Set initial values for form if user navigated to the page from 
		// live workout.
		if(this.props.liveWorkout.sport) {
			const {hours, minutes, seconds} = 
				secondsToTimeFormat(this.props.liveWorkout.duration);
			const {startTime, endTime, sport, coordinates, distance} = 
				this.props.liveWorkout;
			const initialValues = {startTime, endTime, sport, hours, minutes, 
				seconds, coordinates, distance};

			return (
				<div style={{textAlign: "center"}}>
					<h2>Insert new workout</h2>
					<WorkoutForm onSubmit={this.saveWorkout} initialValues={initialValues}  
					discardForm={this.discardForm}/>
				</div>
			)
		}
		return (
			<>

				<div style={{textAlign: "center"}}>
					<NewWorkoutNav live="" insert="active" />
					<h2>Insert new workout</h2>
					<WorkoutForm onSubmit={this.saveWorkout}/>
				</div>
			</>
		);
	};
}
const insertMapStateToProps = state => {
	return { liveWorkout: state.liveWorkout };
};

export default connect(insertMapStateToProps, { saveWorkout, 
	discardWorkout })(CreateWorkout);