import React from 'react';
import {connect} from "react-redux";
import images from "../../../../assets/images";
import Reward from "../../../../commons/libs/gtg-reawards";
import Constants from "../../../../utils/Constants";
import * as actions from "../actions";
import * as constants from "../constants";

class LoyaltyPopup extends React.Component {

    popupFlag = () => {
        this.props.toggleLoyaltyPopup(false, null);
    };

    componentDidMount() {
        this.props.toggleLoyaltyPopup(true, null);
    }

    rewardRef2 = (ref) => {
        this.reward2 = ref
        if (ref) {
            const time = setTimeout(() => {
                clearTimeout(time)
                if (this.reward2) {
                    this.reward2.rewardMe(window.innerWidth / 2, window.innerHeight * 0.8)
                }
            }, 1000);
        }
    }

    render() {
        const {loyaltyData} = this.props;
        return loyaltyData.flag === true && loyaltyData.data && (
            <div className="modal-popup Loyalty-popup wow fadeIn">
                <div className="modal-container">
                    <div className="modal-outer  ">
                        <div className="popup-head">
                            <div className="score-head">
                                <figure><img src={images.loyaltyIcon} alt="icon"/></figure>
                                <a className="btn-close trigger animated bounceIn fast delay-1s" onClick={this.popupFlag}>
                                    <figure><img src={images.closeButton} alt=""/></figure>
                                </a>
                            </div>
                            <div className="popup-title">
                                <h3>{loyaltyData.data.popupHeading}</h3>
                            </div>
                        </div>
                        <div className="popup-body">
                            <div className="mid-popup-section">
                                <div className="popup-top">
                                    <div className="skill-text drag-text">
                                        <h5>
                                            {loyaltyData.data.innerHeading}
                                        </h5>
                                    </div>
                                </div>
                                <div className="loyalty-sec">
                                    <div className="loyalty-points">
                                        <ul>
                                            {loyaltyData.data.backpay_gold && bonusTypeHTML("Loyalty Bonus", loyaltyData.data.backpay_gold)}
                                            {loyaltyData.data.survey_gold && bonusTypeHTML("Survey Completed", loyaltyData.data.survey_gold)}
                                            {loyaltyData.data.welcome_gold && bonusTypeHTML("Welcome to the new hit the spot", loyaltyData.data.welcome_gold)}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>


                    </div>
                    <Reward onRef={this.rewardRef2} config={Constants.rewardsConfig.welcome}/>
                    <div className="popup-overlay" onClick={this.popupFlag}></div>
                </div>
            </div>

        );
    }
}

function bonusTypeHTML(text, coin) {
    return (
        <li>
            <div className="available-block">
                <div className="col pull-left"><span className="loyalty-title">{text}</span></div>
                <div className="col pull-right">
                    <div className="user-points">
                        <div className="score-point">
                            <div className="score-icon">
                                <figure><img src={images.coinIcon} alt=""/></figure>
                            </div>
                            <span>{coin}</span></div>
                    </div>
                </div>
            </div>
        </li>
    )
}

const mapStateToProps = state => {
    return {
        loyaltyData: state[constants.NAME].loyaltyData,
    }
};

const mapDispatchToProps = dispatch => {
    return {
        toggleLoyaltyPopup: (flag, data) => dispatch(actions.toggleLoyaltyPopup(flag, data)),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(LoyaltyPopup);
