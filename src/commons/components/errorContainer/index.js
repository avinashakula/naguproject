import React, { Component } from 'react';
import images from "../../../assets/images";
import HelperFunctions from '../../../utils/HelperFunctions';

class ErrorContainer extends Component {

    redirectToHome = () => {
        let redirectURL = window.location.origin + HelperFunctions.getQueryStringFromURL();
        window.location.href = redirectURL;
    }

    render() {
        return (

            <div className="main-section">
                <div className="page-container">
                    <div className="page-not-found">
                        <div className="not-found-mid">
                            <div className="container-not-found">
                                <div className="mid-card-not-found">
                                    <div className="inner-red-card">
                                        <h2>RED CARD</h2>
                                        <p>We are unable to process your request at the moment. Please try again later.</p>
                                        <div className="btn-home">
                                            <a className="skyblue-btn" onClick={this.redirectToHome}>Return to the game</a>
                                        </div>
                                    </div>
                                </div>
                                <div className="red-card-pic"><img src={images.redCard} alt="" /></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        );
    }
}

export default ErrorContainer;