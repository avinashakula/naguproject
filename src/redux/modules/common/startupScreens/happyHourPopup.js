import React from 'react';
import {connect} from "react-redux";
import images from "../../../../assets/images";
import Reward from "../../../../commons/libs/gtg-reawards";
import Constants from "../../../../utils/Constants";
import * as actions from "../actions";
import * as constants from "../constants";
import common from "../index";

class HappyHourPopup extends React.Component {

    popupFlag = () => {
        this.props.toggleHappyHourPopup(false, null);
        this.props.setUserPopups('pphts_happy_hour_intro');
    };

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
        const {happyHourData, isShowHappyHourPopup} = this.props;

        // if already seen the popup do not show the popup
        if (isShowHappyHourPopup) {
            return null;
        }

        return happyHourData.flag === true && happyHourData.data && (
            <div className="modal-popup happy-event-popup skillzone-popup-visible">
                <div className="modal-container">
                    <div className="modal-outer  ">
                        <div className="popup-head">
                            <div className="score-head">
                                <figure>
                                    <img src={images.loyaltyIcon} alt=""/>
                                </figure>
                                <a className="btn-close trigger animated fast delay-1s">
                                    <figure onClick={this.popupFlag}>
                                        <img src={images.closeButton} alt=""/>
                                    </figure>
                                </a>
                            </div>
                            <div className="popup-title">
                                <h3>Happy Hour events are now unlocked!</h3>
                            </div>
                        </div>
                        <div className="popup-body">
                            <div className="mid-popup-section">
                                <div className="popup-top">
                                    <div className="happy-text">
                                        <h5>
                                            Each week there will be a one hour window where you will be given a bonus reward for playing during this time.
                                            Be sure to keep watch of this weekly as times and rewards might change!
                                        </h5>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                    <Reward onRef={this.rewardRef2} config={Constants.rewardsConfig.confetti}/>
                    <div className="popup-overlay" onClick={this.popupFlag}></div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    const val = state[common.constants.NAME].userPopups.pphts_happy_hour_intro !== undefined ? state[common.constants.NAME].userPopups.pphts_happy_hour_intro : false;
    return {
        happyHourData: state[constants.NAME].happyHourData,
        isShowHappyHourPopup: val
    }
};

const mapDispatchToProps = dispatch => {
    return {
        toggleHappyHourPopup: (flag, data) => dispatch(actions.toggleHappyHourPopup(flag, data)),
        setUserPopups: (key) => dispatch(common.actions.setUserPopups(key)),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(HappyHourPopup);
