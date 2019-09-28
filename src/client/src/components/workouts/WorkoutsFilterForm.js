import React from 'react';
import { connect } from 'react-redux';

import { setWorkoutsFilters  } from '../../actions';
import { timeFormatToSeconds } from '../../utils/modifyWorkoutValues';
import SportDropdown from '../utils/SportDropdown';

class WorkoutsFilterForm extends React.Component {
    state = {errors: []}
    sport = 'all'

    validateTimes(hours, minutes, seconds, errors) {
        if(minutes < 0 || minutes > 60) {
            errors.push('Minutes must be between 0 and 60!');
        }
        if(seconds < 0 || seconds > 60) {
            errors.push('Seconds must be between 0 and 60!');
        }
        if(hours < 0) { 
            errors.push('Hours must be positive value!');
        }
    }

    calculateTimes(errors) {
        const durationFilters = {}

        const minHours = document.querySelector('#minDurationHours');
        const minMinutes = document.querySelector('#minDurationMinutes');
        const minSeconds = document.querySelector('#minDurationSeconds');

        if(minHours.value || minMinutes.value || minSeconds.value) {
			const hours = minHours.value  ? minHours.value : 0;
			const minutes = minMinutes.value ? minMinutes.value : 0;
            const seconds = minSeconds.value ? minSeconds.value : 0;

            if(minutes < 0 || minutes > 60) {
                errors.push('Min minutes must be between 0 and 60!');
            }
            if(seconds < 0 || seconds > 60) {
                errors.push('Min seconds must be between 0 and 60!');
            }
            if(hours < 0) {
                errors.push('Min hours must be positive value!');
            }

			durationFilters.minDuration = timeFormatToSeconds(hours, minutes, seconds);

			if(isNaN(durationFilters.minDuration)) {
				durationFilters.minDuration = undefined;
			}
        }
        
        const maxHours = document.querySelector('#maxDurationHours');
        const maxMinutes = document.querySelector('#maxDurationMinutes');
        const maxSeconds = document.querySelector('#maxDurationSeconds');

        if(maxHours.value || maxMinutes.value || maxSeconds.value) {
			const hours = maxHours.value  ? maxHours.value : 0;
			const minutes = maxMinutes.value ? maxMinutes.value : 0;
			const seconds = maxSeconds.value ? maxSeconds.value : 0;

            if(minutes < 0 || minutes > 60) {
                errors.push('Max minutes must be between 0 and 60!');
            }
            if(seconds < 0 || seconds > 60) {
                errors.push('Max seconds must be between 0 and 60!');
            }
            if(hours < 0) {
                errors.push('Max hours must be positive value!');
            }

			durationFilters.maxDuration = timeFormatToSeconds(hours, minutes, seconds);

			if(isNaN(durationFilters.maxDuration)) {
				durationFilters.maxDuration = undefined;
			}
        }
        
        return durationFilters
    }

    filterWorkouts = e => {
        const errors = []
        const filters = this.calculateTimes(errors);
        
        const inputs = document.querySelectorAll('#filter-menu input:not(.time)');
        inputs.forEach(input => {
            if(input.value) {
                filters[input.id] = input.value
                if((input.id === 'minDistance' || input.id === 'maxDistance') && input.value < 0) {
                    errors.push(`${input.id} must be positive!`);
                }
            }
        });
        if(this.sport.toLowerCase() !== 'all') {
            filters.sport = this.sport;
        }

        this.setState({errors});
        if(errors.length === 0) {
            this.props.setWorkoutsFilters(filters);   
        }
    }

    renderError() {
        return this.state.errors.map(error => {
            return (
                <div className="row text-center mb-2" key={error}>
                    <span className="text-danger">{error}</span>
                </div>
            );
        })
    }

    render() {
        return (
            <div id="filter-menu"> 
                <div className="row col">
                    <p className="mb-1 mt-2">Sport:</p>
                    <SportDropdown onChange={e => this.sport = e.target.value}/>
                </div>
                <div className="row text-center">
                    <div className="col-2"></div>
                    <div className="col-5">Min</div>
                    <div className="col-5">Max</div>
                </div>
                <div className="row text-center mb-2">
                    <div className="col-2">
                        Duration
                    </div>
                    <div className="col-5">
                        <input id="minDurationHours" type="number"
                            className="time form-control input-sm mr-1 d-inline w-25" />:
                        <input id="minDurationMinutes" type="number" 
                            className="time form-control input-sm mx-1 d-inline w-25" />:
                        <input id="minDurationSeconds" type="number" 
                            className="time form-control input-sm ml-1 d-inline w-25" />
                    </div>
                    <div className="col-5">
                        <input id="maxDurationHours" type="number" 
                            className="time form-control input-sm mr-1 w-25 d-inline w-25" />:
                        <input id="maxDurationMinutes" type="number" 
                            className="time form-control input-sm mx-1 w-25 d-inline w-25" />:
                        <input id="maxDurationSeconds" type="number" 
                            className="time form-control input-sm ml-1 w-25 d-inline w-25" />
                    </div>
                </div>
                <div className="row text-center mb-2">
                    <div className="col-2">
                        Distance(km)
                    </div>
                    <div className="col-5">
                        <input id="minDistance"  type="number" className="form-control input-sm mx-auto w-50" />
                    </div>
                    <div className="col-5">
                        <input id="maxDistance"  type="number" className="form-control input-sm mx-auto w-50" />
                    </div>
                </div>
                <div className="row text-center mb-2">
                    <div className="col-2 px-1">
                        Date
                    </div>
                    <div className="col-5 px-1">
                        <input id="minWorkoutDate"  type="date" className="form-control input-sm" />
                    </div>
                    <div className="col-5 px-1">
                        <input id="maxWorkoutDate"  type="date" className="form-control input-sm" />
                    </div>
                </div>
                {this.renderError()}
                <div className="row text-center mb-3">
                    <button onClick={this.filterWorkouts} className="btn btn-primary mx-auto">
                        Filter
                    </button>
                </div>
            </div>
        );
    }
}

export default connect(null, { setWorkoutsFilters })(WorkoutsFilterForm);