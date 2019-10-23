// Parses data to more user friendly format.
export const parseWorkoutValues = workout => {
	const parsedData = {};
	parsedData.date = "-";
	if(workout.workoutDate) {
		const [year, month, day] = workout.workoutDate.split('-')
		parsedData.date = `${day}.${month}.${year}`;
	}

	parsedData.duration = "-";
	if(workout.duration) {
		const {hours, minutes, seconds} = secondsToTimeFormat(workout.duration);
		parsedData.duration = `${hours}:${minutes}:${seconds}`
	}

	parsedData.startTime = workout.startTime ? formatDateTime(workout.startTime) : "-"
	parsedData.endTime = workout.endTime ? formatDateTime(workout.endTime) : "-";
	parsedData.distance = workout.distance ? `${workout.distance} km` : "-";
	parsedData.heartRate = workout.avgHeartRate ? `${workout.avgHeartRate} bpm` : "-";
	parsedData.calories = workout.calories ? workout.calories : "-";
	parsedData.sport = workout.sport ? workout.sport : "-";
	parsedData.notes = workout.notes ? workout.notes : "-";
	parsedData.speed = workout.speed ? `${workout.speed.toFixed(2)} km/h` : "-";
	
	return parsedData;
}

// Parses datetime data from database to more user friendly format.
export const formatDateTime = dateTime => {
	const [date, time] = dateTime.split('T');
	const [year, month, day] = date.split('-');
	return `${day}.${month}.${year} ${time.split('.')[0]}`;
}

export const formatNumbers = number => number > 9 ? number : "0"+ number;

// Converts seconds to hours, minutes and seconds.
export const secondsToTimeFormat = (totalSeconds) => {
	const hours = Math.floor(totalSeconds/3600);
	const remainingSeconds = totalSeconds - hours*3600;
	const minutes = Math.floor(remainingSeconds/60);
	const seconds= parseInt(remainingSeconds - minutes*60);

	return {
		hours: formatNumbers(hours),
		minutes: formatNumbers(minutes),
		seconds: formatNumbers(seconds)
	}

};

// Converts hours, minutes and seconds to seconds.
export const timeFormatToSeconds = (hours, minutes, seconds) => {
	return (parseInt(hours)*3600+parseInt(minutes)*60+parseInt(seconds));
};

// Modifies times before stringify function so that the time zone is taken 
// into account.
export const datesForStringify = (formValues) => {
	const st = formValues.startTime;
	const et = formValues.endTime;
	if (st){
		const hDif = st.getHours() - st.getTimezoneOffset() / 60;
    	formValues.startTime.setHours(hDif);
	}
	if (et){
		const hDif = et.getHours() - et.getTimezoneOffset() / 60;
    	formValues.endTime.setHours(hDif);
	}
	
};