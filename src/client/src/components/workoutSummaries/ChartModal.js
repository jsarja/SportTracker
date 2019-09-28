import React from 'react';
import ReactDOM from "react-dom";

import './ChartModal.css';
import Chart from './Chart';

const ChartModal = props => {
    return ReactDOM.createPortal(
        <div id="myModal" className="my-modal">
            <div className="my-modal-content">
                <span className="close" onClick={props.onClose}>&times;</span>
                <Chart data={props.data} variableName={props.variableName}/>
            </div>
        </div>, 
        document.querySelector('#modal')
    );
}

export default ChartModal;