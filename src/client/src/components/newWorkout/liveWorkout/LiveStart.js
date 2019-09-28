import React from 'react';

import NewWorkoutNav from '../NewWorkoutNav';
import LiveStartForm from './LiveStartForm';


const LiveStart = () => {
	return (
		<>
			<NewWorkoutNav live="active" insert="" />
			<LiveStartForm />
		</>
	);
};

export default LiveStart;