import React from 'react';
import { connect } from 'react-redux';

import { getSummaryData, getSummaryChart } from '../../actions';
import './SummaryTab.css';
import ChartModal from './ChartModal';

class SummaryTab extends React.Component {
    state = {showChart: false, chartVariable: null}

    componentDidMount() {
        this.getSummaryData();
    }

    componentDidUpdate(prevProps) {
        // Get new data when timePeriod or sport changes. 
        if(prevProps.timePeriod !== this.props.timePeriod ||
        prevProps.sport !== this.props.sport) {
            this.getSummaryData();
        }
    }

    // Get data, that is displayed in component, from server.
    getSummaryData() {
        if(this.props.sport.toLowerCase() === 'all') {
            this.props.getSummaryData(this.props.timePeriod)
            this.props.getSummaryChart(this.props.timePeriod);
        }
        else {
            this.props.getSummaryData(this.props.timePeriod, this.props.sport);
            this.props.getSummaryChart(this.props.timePeriod, this.props.sport);
        }
    }

    renderAvgSum(render, statKey) {
        if(render) {
            return(<>
                <div className="col border border-primary rounded"> 
                    <p><b>Average</b></p>
                    <p>{this.props.summaryData.avgData[statKey]}</p> 
                </div>
                <div className="col border border-primary rounded"> 
                    <p><b>Total</b></p>
                    <p>{this.props.summaryData.sumData[statKey]}</p> 
                </div>
            </>);
        }
    }

    // Renders statistic name, min value and max value columns for all
    // statistics and average and total columns for all statistics except
    // start and end times.
    renderRow(statName, statKey, timeRow=false) {
        return ( 
            <div className="mb-2 py-2 px-4 border border-primary rounded">
                <div className="row">
                    <div className="text-center col-sm-12"> 
                    <h4>{statName}</h4> 
                    </div>
                </div>
                <div className="row">
                    <div className="col border border-primary rounded"> 
                        <p><b>Min</b></p>
                        <p>{this.props.summaryData.minData[statKey]}</p> 
                    </div>
                    <div className="col border border-primary rounded"> 
                        <p><b>Max</b></p>
                        <p>{this.props.summaryData.maxData[statKey]}</p> 
                    </div>
                    {this.renderAvgSum(!timeRow, statKey)}
                </div>
                <div className="row mt-2">
                    <div className="text-center col-sm-12"> 
                    <button 
                        className="btn btn-outline-primary btn-sm"
                        onClick={() => 
                            this.setState({showChart: true, chartVariable: statKey})}
                        >
                        Progression Chart
                    </button>
                    </div>
                </div>
            </div>
        );
    }

    // Display chart modal when user clicks a statitic row.
    renderChart() {
        if(this.state.showChart) {
            console.log("HERE")
            return (
                <ChartModal 
                    onClose={() => this.setState({showChart: false})}
                    data = {this.props.chartData[this.state.chartVariable]}
                    variableName = {this.state.chartVariable}
                />  
            )
        }
    }

	render() {
        if(!this.props.summaryData) {
            return <p>Loading...</p>
        }
        if(Object.keys(this.props.summaryData).length === 0) {
            return <p>No data found.</p>
        }

		return (
            <div id="summary-tab">
                {this.renderRow('Distance (km)', 'distance')}
                {this.renderRow('Duration (hh:mm:ss)', 'duration')}
                {this.renderRow('Calories (kcal)', 'calories')}
                {this.renderRow('Average Heart Rate (bpm)', 'heartRate')}
                {this.renderRow('Average Speed', 'speed')}
                {this.renderRow('Start Time', 'startTime', true)}
                {this.renderRow('End Time', 'endTime', true)}
                {this.renderChart()}
            </div>
        );
	}
}

const mapStateToProps = state => {
    console.log()
    return {summaryData: state.summaryData, chartData: state.summaryCharts};
}
export default connect(mapStateToProps, { getSummaryData, 
    getSummaryChart })(SummaryTab);