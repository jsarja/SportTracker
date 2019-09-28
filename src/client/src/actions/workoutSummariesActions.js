import { getWorkoutSummaries, getWorkoutSummaryChart }
	from '../apis/sportTrackerApi';
import { GET_SUMMARY_DATA, GET_CHART_DATA } from './types';
import { createMessage } from './messageActions';
import { secondsToTimeFormat } from '../utils/modifyWorkoutValues';

// Fetches min, max, average and total values for each workout statistic.
export const getSummaryData = (timePeriod = 'all', sport) => async (dispatch, getState) => {
	try {
		const { auth: {googleId} } = getState();
		const data = await getWorkoutSummaries(googleId, timePeriod, sport);
		for (let dataPoint in data) {
			const {hours, minutes, seconds} =
				secondsToTimeFormat(data[dataPoint].duration);
			data[dataPoint].duration = `${hours}:${minutes}:${seconds}`;
			data[dataPoint].speed = data[dataPoint].speed.toFixed(2);
		}
		dispatch({ type: GET_SUMMARY_DATA, payload: data });
	} 
	catch(e) {
		dispatch(createMessage(`Error! ${e}`, "error"));
	}
}

// Fetches values for each workout so they can be plotted for each statistic.
export const getSummaryChart = (timePeriod = 'all', sport) => async (dispatch, getState) => {
	try {
		const { auth: {googleId} } = getState();
		const data = await getWorkoutSummaryChart(googleId, timePeriod, sport);

		// Change times to decimal numbers for plotting
		if(data.endTime) {
			data.endTime.forEach(time => {
				const [hours, minutes] = time.endTime.split(':')
				time.endTime = parseInt(hours) + 
					parseFloat((parseInt(minutes)/60).toFixed(2));
			});
		}
		if(data.startTime) {
			data.startTime.forEach(time => {
				const [hours, minutes] = time.startTime.split(':')
				time.startTime = parseInt(hours) + 
					parseFloat((parseInt(minutes)/60).toFixed(2));
			});
		}

		if(data.speed) {
			data.speed.forEach(speed => {
				speed.speed = speed.speed.toFixed(2);
			});
		}
		
		dispatch({ type: GET_CHART_DATA, payload: data });
	} 
	catch(e) {
		dispatch(createMessage(`Error! ${e}`, "error"));
	}
}