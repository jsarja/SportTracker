import React from 'react';
import { getWeights, saveWeight } from '../../apis/sportTrackerApi';
import { createMessage } from '../../actions';
import { connect } from 'react-redux';

import './Weight.css'
import Chart from '../workoutSummaries/Chart';

class Weight extends React.Component {
	state = {weights: [], currentWeight: 0};
	async componentDidMount() {
		try {
			const { weights } = await getWeights(this.props.googleId);
			if(weights.length > 0) {
				const currentWeight = weights[weights.length-1].weight;
				this.setState({ weights, currentWeight });
			}
		}
		catch (e) {
			this.props.createMessage(`Error! ${e}`, "error");
		}
	}

	async saveWeight() {
		try {
			const values = { 
				weight: parseFloat(this.state.currentWeight), 
				date: new Date() 
			};
			await saveWeight(this.props.googleId, values);
			values.date = values.date.getFullYear() + "-" + 
				("0" + (values.date.getMonth() + 1)).slice(-2) 
				+ "-" + values.date.getDate();
			this.setState({ weights: [...this.state.weights, values] });
			this.props.createMessage(`Weight updated suucessfully`, "success");
		}
		catch (e) {
			this.props.createMessage(`Error! ${e}`, "error");
		}
	}

	render() {
		return(
			<div className="text-center">
				<h2>Current Weight</h2>
				<input 
					className="weight-input" 
					value={this.state.currentWeight}
					onChange={e => this.setState({currentWeight: e.target.value})}
					type="number"	
				/> <span style={{fontSize: '3rem'}}>KG</span>
				<br/>
				<button 
					className="btn btn-lg btn-primary" 
					onClick={this.saveWeight.bind(this)}
				>
					Save Weight
				</button>
				<div className="row" style={{height: '350px'}}>
					<Chart 
						data={this.state.weights} 
						variableName='weight'
					/>
				</div>
			</div>
		);
	}
}

const mapStateToProps = state => {
	return {googleId: state.auth.googleId}
} 

export default connect(mapStateToProps, {createMessage})(Weight);