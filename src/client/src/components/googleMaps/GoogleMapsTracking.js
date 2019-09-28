import React from 'react';
import { Map, GoogleApiWrapper, Marker, Polyline} from 'google-maps-react';
import { connect } from 'react-redux';
import getDistance from 'geolib/es/getDistance';

import { updateLocation } from '../../actions';

const mapStyles = {
	position: 'absolute', 
	left: '5%', 
	right: '5%', 
	bottom: '-150px', 
	top: '275px',
	marginBottom: '20px',
};

class GoogleMapsTracking extends React.Component {
	state = {userLocation: {lat:61, lng:25}, permissionDenied: false}

	componentDidMount() {
		// Get user initial position to center the map and draw user marker.
		navigator.geolocation.getCurrentPosition( position => {
			const {latitude: lat, longitude: lng}  = position.coords;
			// Save coords to redux state's array.
			this.props.updateLocation({lat, lng}, 0);

			// Keep track of current position and user's permission to use
			// position tracking.
			this.setState({userLocation: {lat, lng}, permissionDenied: false});
		}, error => this.setState({permissionDenied: true}), 
		{enableHighAccuracy: true});

		// Update map center and user marker when position changes.
		this.geoId = navigator.geolocation.watchPosition( position => {
			const {latitude, longitude} = position.coords;

			// Only update info if position is different than the previous one.
			if(latitude !== this.state.userLocation.lat || 
			   longitude !== this.state.userLocation.lng ) {
				// Calculate distance between previous and new position.
				const distance = getDistance(
					{ 
						latitude: this.state.userLocation.lat, 
						longitude: this.state.userLocation.lng
					},
					{ latitude, longitude}
				)/1000;

				// Only update the coordinates when user has moved over 5 meters
				// from last location
				if(distance > 0.005){
					// Append new coordinates to redux state's array and update 
					// total distance.
					this.props.updateLocation({lat: latitude, lng: longitude}, distance);
					this.setState({
						userLocation: {lat: latitude, lng: longitude},
						permissionDenied: false
					});
				}
			}
		}, error => this.setState({permissionDenied: true}));

		if(document.querySelector('.map div[style*="position: absolute"]')) {
			document.querySelector('.map div[style*="position: absolute"]')
				.style.position = 'static';
		}
	}

	componentWillUnmount() {
		navigator.geolocation.clearWatch(this.geoId);
	}

	render() { 
		if(this.state.permissionDenied) {
			return <p>Unable to retrieve the location</p>
		}
		return (
			<div className="map my-1" style={{height: '1px'}}>
				<Map
					google={this.props.google}
					zoom={16}
					style={mapStyles}
					center={this.state.userLocation}
				>
					<Marker 
						position={this.state.userLocation}
					/>
					<Polyline 
						path={this.props.coordinates} 
						options={{ 
						strokeColor: '#00ffff',
						strokeOpacity: 1,
						strokeWeight: 2,
						icons: [{ 
							icon: "hello",
							offset: '0',
							repeat: '10px'
						}],
						}}
					/>
				</Map>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		coordinates: state.liveWorkout.coordinates, 
	}
}

const googleWrapper = GoogleApiWrapper({
	apiKey: 'AIzaSyAIQZeV5xkY2DqGmqdwsoIkRCZL8qsWlwA'
})(GoogleMapsTracking);

export default connect(mapStateToProps, {updateLocation})(googleWrapper);