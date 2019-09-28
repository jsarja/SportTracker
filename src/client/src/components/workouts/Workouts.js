import React from 'react';
import { connect } from 'react-redux';
import { Accordion, Button } from 'react-bootstrap';

import { fetchWorkouts } from '../../actions';
import WorkoutPreview from './WorkoutPreview';
import WorkoutsOrderForm from './WorkoutsOrderForm';
import WorkoutsFilterForm from './WorkoutsFilterForm';

class Workouts extends React.Component {
	state = {showFilters: true}

	hideFilter() {
		if (this.mediaQuery.matches) { // If media query matches
		  this.setState({showFilters: false});
		} else {
			this.setState({showFilters: true});
		}
	}
	  
	componentDidMount() {
		this.props.fetchWorkouts();

		// Don't show filter form on small screens.
		this.mediaQuery = window.matchMedia("(max-width: 500px)");

		this.hideFilter = this.hideFilter.bind(this)

		this.hideFilter();
		this.mediaQuery.addListener(this.hideFilter.bind(this));
	}

	componentWillUnmount() {
		this.mediaQuery.removeListener(this.hideFilter);
	}

	renderWorkouts() {
		return this.props.workouts.map(workout => {
			return <WorkoutPreview key={workout.workoutId} workout={workout} />
		});
	}

	renderFilterMenu(){
		if(this.state.showFilters) {
			return (
				<Accordion className="text-center">
					<Accordion.Toggle as={Button} variant="link" eventKey="0">
						Filter options
					</Accordion.Toggle>
					<Accordion.Collapse eventKey="0">
						<WorkoutsFilterForm />
					</Accordion.Collapse>
				</Accordion>
			)
		}
	}

	render() {
		return(
			<>
				<h2 className="text-center">Workout History</h2>
				<WorkoutsOrderForm />
				{this.renderFilterMenu()}
				{this.renderWorkouts()}
			</>
		);
	}
}
const mapStateToProps = state => {
	return { 
		workouts: state.workouts
	 }
}

export default connect(mapStateToProps, { fetchWorkouts })(Workouts);