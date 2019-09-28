import React from 'react';

import SelectSport from '../newWorkout/SelectSport';

const renderSportOptions = () => {
    const sports = ['All', SelectSport.RUNNING, SelectSport.BIKING, 
        SelectSport.SKIING, SelectSport.SWIMMING];
    return sports.map(sport => {
        return <option key={sport} name={sport} value={sport}>{sport}</option>
    });
}

const SportDropdown = (props) => {
    return (
        <select 
            className="form-control mb-3" 
            style={{maxHeight: "34px", fontSize:"0.85rem"}}
            onChange={props.onChange} 
        >
            {renderSportOptions()}
        </select>
    );
}

export default SportDropdown;
