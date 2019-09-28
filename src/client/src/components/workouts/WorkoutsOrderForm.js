import React from 'react';
import { connect } from 'react-redux';

import { setWorkoutsOrder } from '../../actions';

class WorkoutsOrderForm extends React.Component {
    state = { order: "Workout Date (newest)"}   
    orderOptions = ["Workout Date (newest)", "Workout Date (oldest)",
                    "Duration (longest)", "Duration (shortest)",
                    "Distance (longest)", "Distance (shortest)"];

    queryConverter(order) {
        switch (order) {
            case('Workout Date (newest)'):
                return 'dateNew'
            case('Workout Date (oldest)'):
                return 'dateOld'
            case('Duration (longest)'):
                return 'durationLong'
            case('Duration (shortest)'):
                return 'durationSmall'
            case('Distance (longest)'):
                return 'distanceLong'
            case('Distance (shortest)'):
                return 'distanceSmall'
            default:
                return ''
        }
    }

    renderOptions() {
        return this.orderOptions.map(option => {
            return (
                <option key={option} name={option} value={option}>
                    {option}
                </option>
            );
        })
    }

    orderWorkouts = () => {
        const query = this.queryConverter(this.state.order);
        this.props.setWorkoutsOrder(query);
    }

    handleOrderChange(e){ this.setState({order: e.target.value}) }

    render() {
        return (<>
            <div className="row">
                <div className="col-sm-4 offset-sm-4 text-center">
                    <p className="mb-0">Order by</p>
                    <select 
                        className="form-control" 
                        style={{maxHeight: "34px", fontSize:"0.85rem"}}
                        onChange={this.handleOrderChange.bind(this)} 
                        value={this.state.order}
                    >
                        {this.renderOptions()}
                    </select>
                </div>
            </div> 
            <div className="text-center mb-2">
                <button 
                    onClick={this.orderWorkouts.bind(this)} 
                    className="btn btn-info h-50 mt-3" 
                >
                    Order
                </button>
            </div>
        </>);
    }
}

export default connect(null, { setWorkoutsOrder })(WorkoutsOrderForm);