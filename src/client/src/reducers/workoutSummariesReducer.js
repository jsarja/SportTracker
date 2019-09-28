import { GET_SUMMARY_DATA, GET_CHART_DATA } from '../actions/types';

export const summaryReducer = (prevState = null, action) => {
	if (action.type === GET_SUMMARY_DATA) {
			return action.payload;
    }
    return prevState;
}

export const chartReducer = (prevState = null, action) => {
	if (action.type === GET_CHART_DATA) {
			return action.payload;
    }
    return prevState;
}