import React from 'react';
import { useState } from 'react';
import { connect } from 'react-redux';

import BootstrapModal from '../utils/BootstrapModal';
import { removeWorkout } from '../../actions'

const DeleteWorkoutButton = props => {
	const [modalActive, setModalState] = useState(false);

	const closeDeleteModal = () => setModalState(false);
	const showDeleteModal = () => setModalState(true);

	return (
		<>
			<button 
				onClick={showDeleteModal} 
				className="btn btn-danger">
				Delete Workout
			</button>
			<BootstrapModal 
				title='Delete?' 
				button={{
					action: () => {
						closeDeleteModal();
						props.removeWorkout(props.workoutId);
					},
					text: "Delete"
				}}
				content="Are you sure you want to delete the workout."
				show={modalActive}
				onDissmiss={closeDeleteModal}
			/>
		</>
	);
}

export default connect(null, { removeWorkout })(DeleteWorkoutButton);