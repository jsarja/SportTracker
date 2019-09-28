import React from 'react'
import $ from 'jquery';
import 'malihu-custom-scrollbar-plugin';
import { Link } from 'react-router-dom';

import './SideBar.css';
import history from '../../history';
import Logout from '../authentication/Logout';

class SideBar extends React.Component {
    state = {active: history.location.pathname}

    navItems = [
        { path: '/sportTracker/newWorkout', title: 'New Workout'},
        { path: '/sportTracker/workoutSummaries', title: 'Workout Summaries'},
        { path: '/sportTracker/workouts', title: 'Workout History'},
        { path: '/sportTracker/weight', title: 'Weight'},
    ]

    componentDidMount() {
        // Add script to use malihu-custom-scrollbar library.
        const script = document.createElement("script");
        script.src = "https://cdnjs.cloudflare.com/ajax/libs/malihu-custom-scrollbar-plugin/3.1.5/jquery.mCustomScrollbar.concat.min.js";
        script.async = true;
        document.body.appendChild(script);
        $("#sidebar").mCustomScrollbar({
            theme: "minimal"
        });
        
        // Set event listeners for displaying and hiding the side bar on smaller 
        // screens.
        document.querySelector('#sidebarCollapse').addEventListener('click', 
        () => {
            document.querySelector('#sidebar').classList.remove('active');
        });

        document.querySelector('#sidebarOpen').addEventListener('click', () => {
            document.querySelector('#sidebar').classList.add('active');
        });

        document.querySelector('.container').addEventListener('click', () => {
            document.querySelector('#sidebar').classList.remove('active');
        });

        // Listen to changes in url to highlight the active tab correctly.
        history.listen((location, action) => {
            this.setState({active: location.pathname});
        });
    
    }

    renderLinks() {
        return this.navItems.map(({path, title}) => {
            const elemClass = this.state.active.includes(path) ? 'active' : '';
            return (
                <li key={path} className={elemClass}
                 onClick={() => document.querySelector('#sidebar').classList.remove('active')}>
                    <Link to={path}>{title}</Link>
                </li>
            );
        })
    }

    render() {
        return (
            <React.Fragment>
                <nav id="sidebar" className="">
                    <i 
                        id="sidebarCollapse" 
                        className="sidebarToggle fas fa-times"
                        style={{fontSize: "1.75rem"}}/>
                    <div className="sidebar-header">
                        <h3>Sport <br/> Tracker</h3>
                    </div>
    
                    <ul className="list-unstyled">
                       
                        {this.renderLinks()}
    
                        <div id="secondary-list">
                            <li>
                                <Logout />
                            </li>
                        </div>
                    </ul>
                </nav>
                
                <button type="button" id="sidebarOpen" className="btn btn-dark sidebarToggle">
                    <i className="fas fa-align-justify"></i>
                </button>
            </React.Fragment>
        );
    }
    
}

export default SideBar;