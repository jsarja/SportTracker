import React from 'react';
import { connect } from 'react-redux';

import { clearMessage } from '../../actions';
import './Message.css';

class Message extends React.Component{
    renderMessage() {
		if(this.props.message) {
			const { type, message } = this.props.message

            // Remove message after 4,5 seconds.
			setTimeout(() => this.props.clearMessage(), 4500)

			return (
                <div className={`message ${type}`}>
                    <p>{message}</p>
                </div>     
            );
        }
	}

    render() {
        return (
            <div style={{minHeight: "0px"}}>
                {this.renderMessage()}
            </div>
        );
    }
}

const mapStateToProps = state => {
	return { message: state.message };
}
export default connect(mapStateToProps, { clearMessage })(Message);