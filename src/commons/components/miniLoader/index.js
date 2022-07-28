import React, {Component} from 'react';
import PropTypes from "prop-types";

class MiniLoader extends Component {
    render() {
        return (
            <div className={`spinner-holder samll-center-loader ${this.props.loaderType}`}>
                <div className="small-loader"></div>
            </div>
        );
    }
}

MiniLoader.propTypes = {
    loaderType: PropTypes.string,
};

MiniLoader.defaultProps = {
    loaderType: "",
}


export default MiniLoader;