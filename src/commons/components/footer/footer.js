import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import images from '../../../assets/images';
import ProjectRoutes from '../../../config/routes/projectRoutes';
import Constants from '../../../utils/Constants';
import HelperFunctions from '../../../utils/HelperFunctions';
import PropTypes from 'prop-types';

class FooterHTML extends Component {
    render() {
        const { userInfo } = this.props;
        return (
            <footer className="theme-footer">
                <div className="container">
                    <div className="footer-outer">
                        <div className="powered-text">Powered By</div>
                        <div className="footer-logos">
                            {/* <a target="_blank" className="logo-footer">
                                <img src={images.ppLogo} alt="" />
                            </a> */}
                            <a target="_blank" className="gtg-logo-footer">
                                <img src={images.gtgLogo} alt="" />
                            </a>
                        </div>
                        <div className="footer-info">
                            <div className="footer-parag footer-link">
                                <span><a target="_blank">Terms &amp; Conditions </a></span>
                                <span><a target="_blank">Privacy Policy</a></span>
                                <span><a className="no-link">Copyright <span>© 2021</span></a></span>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
        );
    }
}

FooterHTML.propTypes = {
    userInfo: PropTypes.object
};

FooterHTML.defaultProps = {
    userInfo: null
}

export default FooterHTML;