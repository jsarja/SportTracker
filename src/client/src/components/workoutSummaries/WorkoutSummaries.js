import React from 'react';

import SummaryTab from './SummaryTab';
import SportDropdown from '../utils/SportDropdown';

class WorkoutSummaries extends React.Component {
	state = {activeTab: 'week', activeSport: 'all'};

	tabs = [['Last Week', 'week'], 
		['Last Month', 'month'], 
		['Last Year', 'year'], 
		['All Time', 'all']];

	componentDidMount() {
		if(document.querySelector("#week")) {
			document.querySelector("#week").classList.add('bg-primary');
			document.querySelector("#week").classList.add('text-light');
		}
		
		this.updateComponent = this.updateComponent.bind(this)
		window.addEventListener('resize', this.updateComponent);
	}
	componentWillUnmount() {
		window.removeEventListener('resize', this.updateComponent);
	}

	componentDidUpdate() {
		if(document.querySelector(`#${this.state.activeTab}`)) {
			document.querySelector(`#${this.state.activeTab}`)
				.classList.add('bg-primary');
			document.querySelector(`#${this.state.activeTab}`)
				.classList.add('text-light');
		}
	}

	updateComponent() {
		this.forceUpdate();
	}

	// Highlight selected tab in nav and update activeTab state.
	tabNavClicked(e) {
		if(window.matchMedia("(max-width: 825px)").matches) {
			return this.setState({activeTab: e.target.value})
		}

		document.querySelector(".nav-link.text-light").classList.remove("text-light");
		document.querySelector(".nav-link.bg-primary").classList.remove("bg-primary");
		this.setState({activeTab: e.target.id});
	}

	renderTabNavigation() {
		const smallScreen = window.matchMedia("(max-width: 825px)").matches;
		if(smallScreen) {
			return (
				<select 
					className="form-control mb-3" 
					style={{maxHeight: "34px", fontSize:"0.85rem"}}
					onChange={this.tabNavClicked.bind(this)} 
				>
					{this.tabs.map(([name, id]) => {
						return (
							<option key={id} name={id} value={id}>{name}</option>
						)
					})}
				</select>
			);
		}
		
		return (
			<ul className="nav nav-tabs pb-1">
				{
					this.tabs.map(([name, id]) => {
						return (
							<li className="nav-item mr-1" key={id}>
								<button 
									id={id}
									className="nav-link" 
									onClick={this.tabNavClicked.bind(this)}>
									{name}
								</button>
							</li>
						);
					})
				}
			</ul>
		);
	}

	render() {
		return (<>
			<h2 className="text-center">Workout Summaries</h2>
			{this.renderTabNavigation()}
			<p className="mb-1 mt-2">Get summary by sport:</p>
			<SportDropdown 
				onChange={e => this.setState({activeSport: e.target.value})} 
			/>
			<SummaryTab 
				sport={this.state.activeSport} 
				timePeriod={this.state.activeTab}
			/>
		</>)
	}
}

export default WorkoutSummaries