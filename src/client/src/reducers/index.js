import { combineReducers } from 'redux';
import authenticationReducer from './authenticationReducer';
import liveWorkoutReducer from './liveWorkoutReducer';
import messagingReducer from './messagingReducer';
import workoutsReducer from './workoutsReducer'
import workoutsFiltersReducer from './workoutsFiltersReducer'
import workoutDetailReducer from './workoutDetailReducer'
import {summaryReducer, chartReducer } from './workoutSummariesReducer'
import { reducer as formReducer } from 'redux-form';

export default combineReducers({
	auth: authenticationReducer,
	liveWorkout: liveWorkoutReducer,
	message: messagingReducer,
	form: formReducer,
	workouts: workoutsReducer,
	workoutDetail: workoutDetailReducer,
	workoutsFilters: workoutsFiltersReducer,
	summaryData: summaryReducer,
	summaryCharts: chartReducer,
});