import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';


import Login from './authentication/Login';
import LiveStart from './newWorkout/liveWorkout/LiveStart';
import LiveView from './newWorkout/liveWorkout/LiveView';
import CreateWorkout from './newWorkout/CreateWorkout';
import Weight from './weight/Weight';
import Workouts from './workouts/Workouts';
import WorkoutDetail from './workouts/WorkoutDetail';
import workoutSummaries from './workoutSummaries/WorkoutSummaries';
import Logout from './authentication/Logout'; 
import Message from './utils/Message';
import SideBar from './utils/SideBar';
import Footer from './utils/Footer';
import RedirectToMain from './utils/redirect404';
import history from '../history';
import { authInstance, getAuthInstance } from '../utils/googleAuth';
import { updateAuthOnRefresh } from '../actions';
import './app.css';

class App extends React.Component {
	componentDidMount() {
		// Load and get gapi.auth2 instance to get login information.
		getAuthInstance().then(authInstance => {
			// If user is logged in call action to update the state.
			if(authInstance.isSignedIn.get()) {
				this.props.updateAuthOnRefresh(authInstance.currentUser.get().getId());
			}
			this.forceUpdate();
		});
	}

	renderRoutes() {
		return (
			<div>
				<Router history={history}>
					<div id="main">
						<SideBar />
						<div className="content">
							<div className="container">
							<Message/>
							<Switch>
								<Route path="/sportTracker/login" exact component={Login}/>
								<Route path="/sportTracker/logout" exact component={Logout}/>

								<Route path="/sportTracker/newWorkout" exact component={LiveStart}/>
								<Route path="/sportTracker/newWorkout/live" exact component={LiveView}/>
								<Route path="/sportTracker/newWorkout/create" exact component={CreateWorkout}/>

								<Route path="/sportTracker/workoutSummaries" exact component={workoutSummaries}/>

								<Route path="/sportTracker/workouts" exact component={Workouts}/>
								<Route path="/sportTracker/workouts/:id" exact component={WorkoutDetail}/>

								<Route path="/sportTracker/weight" exact component={Weight}/>

								<Route path="/sportTracker"component={RedirectToMain}/>
								<Route path="/sportTracker/*"component={RedirectToMain}/>
							</Switch>
							</div>
						</div>
						<Footer />
					</div>
				</Router>
			</div>
		);
	}

	render() {
		// Don't render anything until the app has access to login information.
		if(!authInstance) {
			return null;
		}

		// Return user to Login page if user is not loggedin.
		if(!this.props.userIsLoggedIn) {
			setTimeout(() => history.push('/sportTracker/login'), 10);
		}
		
		// Render router and routes to different views.
		return this.renderRoutes();
	}
}

function mapStateToProps(state) {
	return {userIsLoggedIn: state.auth.loggedIn};
}

export default connect(mapStateToProps, { updateAuthOnRefresh })(App);