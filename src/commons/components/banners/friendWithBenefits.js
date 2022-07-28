import PropTypes from "prop-types";
import React, { Component } from 'react';
import images from '../../../assets/images';
import Constants from '../../../utils/Constants';

class FriendWithBenefits extends Component {

    tracking = () => {
        this.props.handleTracking("clicked-on-refer-a-friend")
    }
    render() {
        return (
            <div className={`card-info special-offer-info${this.props.animclass ? " " + this.props.animclass : ''}`}>
                <div className="card-outer">
                    <div className="wcard">
                        <div className="special-offer-card">
                            <div className="offer-left">
                                {/* <!-- <div className="offer-figure">
                      <figure><img src="assets/images/special-offer.png" alt=""/></figure>
                    </div> --> */}
                                <div className="offer-left-block">
                                    <span>Your Referal code</span>
                                    <div className="offer-code">UZ3Q91</div>
                                </div>
                                <div className="block d-none"><a className="btn primary-btn">More Info</a></div>


                            </div>
                            <div className="offer-right">
                                <h3 className="offer-info">refer your friends to <span>Game Center Bet</span>. you get <span>cash</span> and they get a <span>special offer</span>!</h3>
                                {/* <h3 className="offer-info">refer your friends to <span>Sinclair</span>. you get <span>cash</span> and they get a <span>special offer</span>!</h3> */}
                                {/* <!-- <p className="offer-pera">Share your referral link  to get started. Deposit method restrictions apply. T&Cs apply.</p> --> */}
                                <div className="tnc">
                                    <div className="pull-left m-none"><a className="btn primary-btn">More Info</a></div>
                                    <span className="tnc-btn">T&amp;Cs <i className="icon pp-arrow-thin-right"></i> </span></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

FriendWithBenefits.propTypes = {
    animclass: PropTypes.string,
};

FriendWithBenefits.defaultProps = {
    animclass: "",
}

export default FriendWithBenefits;