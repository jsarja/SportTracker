import React from 'react';

class WorkoutInfoRow extends React.Component {
	// Update component when window size changes to determ how component
	// should be rendered.
	componentDidMount() {
		this.updateComponent = this.updateComponent.bind(this)
		window.addEventListener('resize', this.updateComponent);
	}
	componentWillUnmount() {
		window.removeEventListener('resize', this.updateComponent);
	}
	updateComponent() {
		this.forceUpdate();
	}

	renderSmallScreen = (header, value) => {
		return (<>
			<div className="row">
				<div className="col-sm-12 text-center">
					<b>{header}:</b>
				</div>
			</div> 
			<div className="row">
				<div className="col-sm-12 text-center">
					<span>{value}</span>
				</div>
			</div>
			<hr/>
		</>)
	}

	render() {
		const {header, value} = this.props;
		const smallScreen = window.matchMedia("(max-width: 825px)").matches;
		if(header.length === 1) {
			if(smallScreen) {
				return this.renderSmallScreen(header[0], value[0]);
			}
			return (
				<div className="row">
					<div className="col-sm-12 text-center">
						<b>{header[0]}:</b> <span className="mr-4">{value[0]}</span>
					</div>
				</div>
			);
		}
		if(smallScreen) {
			return (<>
				{this.renderSmallScreen(header[0], value[0])}
				{this.renderSmallScreen(header[1], value[1])}
			</>);
		}
		return (
			<div className="row">
				<div className="col-sm-6 text-center">
					<b>{header[0]}:</b> <span className="mr-4">{value[0]}</span>
				</div>
				<div className="col-sm-6 text-center">
					<b className="ml-4">{header[1]}:</b> <span>{value[1]}</span>
				</div>
			</div>
		);
	}
}


export default WorkoutInfoRow;