import React, { Component } from 'react';
import PropTypes from "prop-types";

class ContentLoader extends Component {
    render() {
        return (
            <div className={`loading-wrapper ${this.props.loaderType}`}>
                <div className="page-overlay">
                    <div className="loader-ring"></div>
                </div>
            </div>
        );
    }
}

ContentLoader.propTypes = {
    loaderType: PropTypes.string,
};

ContentLoader.defaultProps = {
    loaderType: "",
}


export default ContentLoader;