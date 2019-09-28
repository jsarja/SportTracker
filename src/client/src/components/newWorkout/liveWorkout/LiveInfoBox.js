import React from 'react';
import { connect } from 'react-redux';

import { updateLiveTime } from '../../../actions';
import { secondsToTimeFormat, formatNumbers } from '../../../utils/modifyWorkoutValues';

// import './LiveInfo.css';

class LiveInfoBox extends React.Component {
	componentDidMount() {
		// Update workout duration every second.
		this.timer = setInterval(() => {
			this.updateTimer();
		}, 1000)

	}

	componentWillUnmount() {
		clearInterval(this.timer);
	}

	updateTimer() {
		// Calculate seconds between the start time and current time.
		const curTime = new Date();
		const ms_difference = curTime.getTime()-this.props.liveWorkout
			.startTime.getTime();
		this.props.updateLiveTime(Math.round(ms_difference/1000));
	}

	renderDuration() {
		// Convert seconds to hh:mm:ss format.
		const {hours, minutes, seconds} = 
			secondsToTimeFormat(this.props.liveWorkout.duration);
		return <h3>{`${hours}:${minutes}:${seconds}`}</h3>
	}

	displayTime(date) {
    	return `${formatNumbers(date.getHours())}:${formatNumbers(
			date.getMinutes())}`
	}

	render() {
		return (
			<div>
				{this.renderDuration()}
				<div>
					Workout Started at {this.displayTime(this.props.liveWorkout.startTime)} <br/>
					Current Time: {this.displayTime(new Date())}
				</div>
				<div>
					<b>Distance (km):</b> {this.props.liveWorkout.distance}
				</div>
			</div>
		);
	};
}

const mapStateToProps = state => {
	return { liveWorkout: state.liveWorkout }
}
export default connect(mapStateToProps, { updateLiveTime })(LiveInfoBox);