import React, { PureComponent } from 'react';
import HelperFunctions from '../../../utils/HelperFunctions';

class CookieBanner extends PureComponent {

    state = {
        isCookieBannerSeen: null
    }

    handleClick = () => {
        HelperFunctions.createCookie('cookieBannerSeen', true);
        this.setState({
            isCookieBannerSeen: true
        })
    }

    componentDidMount() {
        let flag = HelperFunctions.readCookie('cookieBannerSeen');
        this.setState({
            isCookieBannerSeen: flag
        })
    }


    render() {
        const { isCookieBannerSeen } = this.state;
        return (isCookieBannerSeen === null) && (
            <div className="modal cookies-modal" style={{ display: 'block' }}>
                <div className="modal-contenier">
                    <div className="modal-outer">
                        <div className="modal-body">
                            <div className="popup-info">
                                <div className="cookies-popup-info">
                                    <p className="cookies-pre">To help personalise content, tailor your experience and help us improve our services, Game Center uses cookies. By navigating our site, you agree to allow us to use cookies, in accordance with our <a target="_blank" href="https://sbgi.net/privacy-policy/#cookie-policy" className="highlight">Cookie Policy</a> and <a target="_blank" href="https://sbgi.net/privacy-policy/" className="highlight">Privacy Policy</a>.</p>
                                </div>
                                <div className="button-bar">
                                    <div className="button-bar-outer">
                                        <div className="col">
                                            <a onClick={this.handleClick} className="btn primary-btn">Ok, I get it</a></div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default CookieBanner;
