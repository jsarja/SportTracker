import React from 'react';
import { Field, reduxForm } from 'redux-form';

import SelectSport from './SelectSport';
import { timeFormatToSeconds } from '../../utils/modifyWorkoutValues';
import './WorkoutForm.css';

class WorkoutForm extends React.Component{
	constructor(props) {
		super(props);
		this.activeSport = 
			!this.props.initialValues ? SelectSport.RUNNING : this.props.initialValues.sport
	}
	
	onSubmit = (formValues) => {
		if(this.props.initialValues) {
			formValues.endTime = this.props.initialValues.endTime;
			formValues.coordinates = this.props.initialValues.coordinates;
		}

		formValues.sport = this.activeSport;
		if(formValues.hours || formValues.minutes ||  formValues.seconds) {
			const hours = formValues.hours  ? formValues.hours : 0;
			const minutes = formValues.minutes ? formValues.minutes : 0;
			const seconds = formValues.seconds ? formValues.seconds : 0;

			formValues.duration = timeFormatToSeconds(hours, minutes, seconds);

			if(isNaN(formValues.duration)) {
				formValues.duration = undefined;
			}
		}
		
		this.props.onSubmit(formValues);
	}

	inputField = ({input, label, meta: {touched, error}}) => {
		return (
			<div className="form-group row">
				<label className="col-lg-4 col-form-label">{label}:</label>
				<div className="col-lg-8">
					<input {...input} type="number" className="form-control" />
					{touched && (error && <span className="text-danger">{error}</span>)}
				</div>
			</div>
		);
	};

	timeField= ({input, meta: {touched, error}}) => {
		let separator = '';
		if(input.name !== 'seconds') {
			separator = <div className="px-1 time-separator" >:</div>;
		}
		return (
			<>
			<div className="px-1" style={{width: '30%'}}>
				<input {...input} type="number" className="form-control"/>
			</div>
			{separator}
			</>
		);
	};

	renderTimeError = ({ meta: {touched, error}}) => {
		return <>{touched && (error && <span className="text-danger">{error}</span>)}</>
	}

	notesField = ({input, label}) => {
		return (
			<div className="form-group mx-auto">
				<label className="text-center">{label}:</label>
				<textarea className="form-control" {...input} rows="3" cols="80" />
			</div>
		);
	}

	renderDiscardBtn = () => {
		if (!this.props.discardForm) {
			return
		}
		return (
			<button 
				type="button" 
				className="btn btn-outline-danger w-50"
				onClick = {this.props.discardForm}
				disabled={this.props.submitting}
			>
				Discard Workout
			</button>
		);
	}

	render() {
		return (
			<form className="px-4" onSubmit={this.props.handleSubmit(this.onSubmit)}>
				<SelectSport 
					onChange={activeSport => this.activeSport = activeSport} 
					initialValue = {this.activeSport}
				/>
				<div className="row">
					<div className="col-md">
						<Field name="distance" component={this.inputField} label="Distance (km)"/>
					</div>
					<div className="col-md">
						<div className="form-group row">
							<label className="col-lg-4 col-form-label">Time (hh:mm:ss):</label>
							<div className="col-lg-8 row">
								<Field name="hours" component={this.timeField}/>
								<Field name="minutes" component={this.timeField}/>
								<Field name="seconds" component={this.timeField}/>
							</div>
							<div className="col-lg-8 offset-lg-4">
								<Field name="hours" component={this.renderTimeError}/> <br/>
								<Field name="minutes" component={this.renderTimeError}/> <br/>
								<Field name="seconds" component={this.renderTimeError}/>
							</div>
						</div>
					</div>
				</div>
				<div className="row">
					<div className="col-md">
						<Field name="avgHeartRate" component={this.inputField} label="Heart Rate (bpm)"/>
					</div>
					<div className="col-md">
						<Field name="calories" component={this.inputField} label="Calories"/>
					</div>
				</div>
				<div className="row">
					<Field name="notes" component={this.notesField} label="Notes"/>
				</div>
				
				<button 
					type="submit" 
					className="btn btn-primary workout-main-btn my-2"
					disabled={this.props.submitting}
				>
					Save
				</button>

				{this.renderDiscardBtn()}
			</form>
		);
	}
}

const validate = values => {
	const errors = {};
	if(values.minutes && (values.minutes < 0 || values.minutes > 60)) {
		errors.minutes = 'Minutes must be between 0 and 60!';
	}
	if(values.seconds && (values.seconds < 0 || values.seconds > 60)) {
		errors.seconds = 'Seconds must be between 0 and 60!';
	}

	const positiveFields = ['distance', 'hours', 'avgHeartRate', 'calories']
	positiveFields.forEach(fieldName => {
		if(values[fieldName] < 0) {
			errors[fieldName] = `${fieldName} must be positive value!`;
		}
	});
	
	return errors;
};

export default reduxForm({ 
	form: 'workoutForm', 
	validate
})(WorkoutForm);