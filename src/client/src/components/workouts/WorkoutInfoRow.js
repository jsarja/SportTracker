import React from 'react';

class WorkoutInfoRow extends React.Component {
	renderHeaderAndValue= (header, value) => {
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
		</>)
	}

	render() {
		const {header, value} = this.props;
		if(header.length === 1) {
			return (
				<div className="row mx-0 workout-info-row">
					<div className="col-12 text-center border border-dark py-2">
						{this.renderHeaderAndValue(header[0], value[0])}
					</div>
				</div>
			);
		}
		return (
			<div className="row mx-0 workout-info-row">
				<div className="col-6 text-center border border-dark py-2">
					{this.renderHeaderAndValue(header[0], value[0])}
				</div>
				<div className="col-6 text-center border border-dark py-2">
					{this.renderHeaderAndValue(header[1], value[1])}
				</div>
			</div>
		);
	}
}


export default WorkoutInfoRow;