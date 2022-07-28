import PropTypes from "prop-types";
import React, {Component} from 'react';

class MessageContainer extends Component {
    render() {
        return (
            <div className="alert-msg">
                <div className={`alert-msg-outer${this.props.animclass ? " " + this.props.animclass : ''}`}>
                    <h2 className="alert-title">{this.props.msg}</h2>
                    {/* <p class="aleft-text">There are no challenges currently happening! More challenges are in the works, check back soon to see what's coming up!</p> */}
                </div>
            </div>
        );
    }
}

MessageContainer.propTypes = {
    msg: PropTypes.string,
    animclass: PropTypes.string,
};

MessageContainer.defaultProps = {
    msg: "",
    animclass: "",
}

export default MessageContainer;