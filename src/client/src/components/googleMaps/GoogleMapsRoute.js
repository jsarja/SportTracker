import React from 'react';
import { Map, GoogleApiWrapper, Polyline} from 'google-maps-react';

const mapStyles = {
	width: '90%',
	height: '300px',
	margin: "auto",
	position: "static"
};

class GoogleMapsRoute extends React.Component {
    componentDidMount() {
		document.querySelector('.map div[style*="position: absolute"]')
			.style.position = 'static';

		// Zooms the map automatically so that the whole route will be vissible.
		const bounds = new window.google.maps.LatLngBounds();
		this.props.coordinates.forEach(coord => {
		  bounds.extend(coord);
		});
		this._map.map.fitBounds(bounds);
		console.log(this._map);
	}
    
	render() {
		return (
			<div className="map my-1">
				<Map
					google={this.props.google}
					style={mapStyles}
					ref={(map) => this._map = map}
					maxZoom={20}
				>
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

export default GoogleApiWrapper({
	apiKey: 'AIzaSyAIQZeV5xkY2DqGmqdwsoIkRCZL8qsWlwA'
  })(GoogleMapsRoute);