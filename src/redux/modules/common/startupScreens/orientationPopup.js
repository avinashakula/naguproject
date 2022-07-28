import React, {Component} from 'react';
import images from "../../../../assets/images";

class OrientationPopup extends Component {
    render() {
        return (
            <div className="orientation-modal">
                <div className="orient-inner">
                    <figure className="orient-icon"><img src={images.orientationLogo} alt=""/></figure>
                    <div className="orient-msg">
                        <figure className="orient-logo"><img src={images.htsLogo} alt=""/></figure>
                        <h2>INSTRUCTIONS</h2>
                        <h3>ROTATE BACK TO PORTRAIT TO RETURN TO THE HIT THE SPOT DASHBOARD</h3>
                    </div>
                </div>
            </div>
        );
    }
}

export default OrientationPopup;