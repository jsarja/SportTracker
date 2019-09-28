import React from 'react';

import './SelectSport.css'


class SelectSport extends React.Component {
	static RUNNING = 'Running';
	static BIKING = 'Biking';
	static SKIING = 'Skiing';
	static SWIMMING = 'Swimming';

	constructor(props) {
		super(props);
		this.state = { activeSport: '' };
		this.sports = [SelectSport.RUNNING, SelectSport.BIKING, 
			SelectSport.SKIING, SelectSport.SWIMMING];
	}

	componentDidMount() {
		this.setState({activeSport: this.props.initialValue})
	}

	sportSelection = e => {
		// Keep track of currently selected sport.
		const activeSport = e.target.innerText;
		this.setState({ activeSport })
		this.props.onChange(activeSport);
	}

	renderBtns() {
		// Create button for each sport option. Higlight the selected one with
		// active class.
		return this.sports.map(s => {
			return (
				<div 
					className={"sport-btn" + (this.state.activeSport === s 
						? ' active' : '')}
					key={s}
					onClick={this.sportSelection}
				>
					{s}
				</div>
			)
		});
	}

	render() {
		return (
			<>
				<h4> Select Sport: </h4>
				<div className="sport-selection mb-4">
					{this.renderBtns()}
				</div>
			</>
		)
	}
}

export default SelectSport;