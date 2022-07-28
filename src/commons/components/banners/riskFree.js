import React, { Component } from 'react';
import images from '../../../assets/images';
import Constants from '../../../utils/Constants';

class RiskFree extends Component {
    render() {
        return (
            <div className="card-info money-back-info animated slideInUpLess">
                <a href = {Constants.RISK_FREE_URL} target="_blank" className="card-outer">
                    <div className="wcard">
                        <div className="special-offer-card">
                            <div className="offer-left">
                                <div className="offer-figure">
                                    <figure><img src={images.riskFreePlayer} alt="" /></figure>
                                </div>
                            </div>
                            <div className="offer-right">
                                <h3 className="offer-info">risk free £/€10 for new customers - <span>money back as cash if your first bet loses.</span></h3>
                                <p className="offer-pera">Max £/€10 refund. Sportsbok only. Payment restrictions apply. T&Cs apply.</p>
                                <div className="tnc">
                                    <div className="pull-left"><span className="btn primary-btn">Join Now</span></div>
                                    <span className="tnc-btn">T&Cs <i className="icon pp-arrow-thin-right"></i> </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </a>
            </div>
        );
    }
}

export default RiskFree;