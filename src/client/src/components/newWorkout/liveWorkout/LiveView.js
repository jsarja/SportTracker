import React from 'react';
import { connect } from 'react-redux';

import LiveInfo from './LiveInfoBox';
import GoogleMapsTracking from '../../googleMaps/GoogleMapsTracking';
import LiveEndBtn from './LiveEndBtn';
import history from '../../../history';
import { setWorkoutEndTime } from '../../../actions';

class LiveView extends React.Component {
	promptLeaving(e) {
		e = e || window.event;
		if (e) {
			e.returnValue = 'Sure?';
		}
		return 'Sure?';
	}

	componentDidMount() {
		// Hide side bar.
		if(document.querySelector('#sidebar')) {
			document.querySelector('#sidebar').style.display = "none";
			document.querySelector('#sidebarOpen').style.display = "none";
		}

		// Hide footer.
		if(document.querySelector('footer')) {
			document.querySelector('footer').style.display = "none";
		}

		// Check user if he wants to leave the page.
		window.addEventListener('beforeunload', this.promptLeaving);

		// Also block navigation to unwanted routes inside the react 
		// application.
		this.unblock = history.block(targetLocation => {
			if(targetLocation.pathname !== '/sportTracker/newWorkout/create') {
				return false;
			}
		});
	}

	componentWillUnmount() {
		this.props.setWorkoutEndTime(new Date());

		// Remove restrictions for leaving the page.
		window.removeEventListener("beforeunload", this.promptLeaving);
		this.unblock();

		// Show footer again.
		document.querySelector('footer').style.display = "block";
	}
	
	render() {
		return (<>
			<div style={{ textAlign: "center", border: "solid 1px", margin: "10px 10%"}}>
				<h2 style={{ marginBottom: '1rem' }}>Workout info</h2>
				<LiveInfo />
				<LiveEndBtn/>
			</div>
			<GoogleMapsTracking />
		</>);	
	}
};

export default connect(null, { setWorkoutEndTime })(LiveView);