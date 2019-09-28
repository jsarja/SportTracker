import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const BootstrapModal = (props) => {
	const handleClose = () => props.onDissmiss();

	return (
		<Modal show={props.show} onHide={handleClose}>
        	<Modal.Header closeButton>
        		<Modal.Title>{props.title}</Modal.Title>
        	</Modal.Header>
        	<Modal.Body>{props.content}</Modal.Body>
        	<Modal.Footer>
				<Button variant="secondary" onClick={handleClose}>
					Close
				</Button>
				<Button variant="primary" onClick={props.button.action}>
					{props.button.text}
				</Button>
        	</Modal.Footer>
      </Modal>
	);
}

export default BootstrapModal;