import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { userLoggedOut } from '../../actions';
import { authInstance } from '../../utils/googleAuth';

class Logout extends React.Component {
    onClick() {
        authInstance.signOut();
        this.props.userLoggedOut()
    }

    render() {
        return <Link to="#" onClick={this.onClick.bind(this)}>Logout</Link>
    }
}

export default connect(null, { userLoggedOut })(Logout);