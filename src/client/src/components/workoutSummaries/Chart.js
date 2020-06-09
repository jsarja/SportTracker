import React from 'react'
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, 
    ResponsiveContainer } from 'recharts';
import { secondsToTimeFormat } from '../../utils/modifyWorkoutValues';

const formatter = (variableName, val) => {
    // Display seconds in hh:mm:ss format when hovering value and in y-axis.
    if (variableName === 'duration') {
        const {hours, minutes, seconds} = secondsToTimeFormat(val);
		return `${hours}:${minutes}:${seconds}`;
    }

    // Display decimal times in hh:mm format when hovering value and in y-axis.
    if (variableName === 'endTime' || variableName === 'startTime') {
        let [intHours, decimalMinutes] = val.toString().split('.');

        const hours = intHours.length === 1 ? "0" + intHours: intHours;
        if(!decimalMinutes) {
            return hours;
        }

        if(decimalMinutes.length === 1) {
            decimalMinutes = decimalMinutes + "0";
        }
        let minutes = Math.round(decimalMinutes/100*60);
        minutes = minutes.toString();
        minutes = minutes.length === 1 ? "0" + minutes: minutes;
        return hours + ":" + minutes;
    }
    return val;
}

const headerConverter = {
    'distance': 'Distance',
    'duration': 'Duration',
    'calories': 'Calories',
    'heartRate': 'Average Heart Rate',
    'startTime': 'Start Time',
    'endTime': 'End Time',
    'speed': 'Speed'
}

const Chart = ({ data, variableName }) => {
    let unit = "";
    if(variableName === 'distance') {unit = 'km'}
    if(variableName === 'heartRate') {unit = 'bpm'}
    if(variableName === 'calories') {unit = 'kcal'}

    return (<>
        <h4 className="text-center">{headerConverter[variableName]}</h4>
        <ResponsiveContainer width = "100%" height = "95%">
            <LineChart data={data} margin={{ top: 10, right: 10, left: 15 }}>
                <Line type="linear" dataKey={variableName} stroke="#8884d8"
                />
                <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                <XAxis dataKey="date"/>
                <YAxis 
                    unit={unit} 
                    tickFormatter={value => formatter(variableName, value)}
                    domain={['auto', 'auto']}
                />
                <Tooltip formatter={value => formatter(variableName, value)}/>
            </LineChart>
        </ResponsiveContainer>
    </>)
}

export default Chart;
