import React from 'react';
import { connect } from 'react-redux';

import SelectSport from '../SelectSport';
import history from '../../../history';
import { startLive } from '../../../actions';

class LiveStartForm extends React.Component {
	activeSport = "Running";

	startLive = () => {
		this.props.startLive(this.activeSport);
		history.push('/sportTracker/newWorkout/live')
	}

	render() {
		return (
			<div className="start-live-form" style={{textAlign: "center", marginTop: "3rem"}}>
				<SelectSport 
					onChange={activeSport => this.activeSport = activeSport} 
					initialValue = {SelectSport.RUNNING}
				/>
				<button 
					className="btn btn-primary workout-main-btn start-btn my-4" 
					onClick={this.startLive}
				>	
					Start Workout
				</button>
			</div>
		);
	};
}

export default connect(null, { startLive })(LiveStartForm);