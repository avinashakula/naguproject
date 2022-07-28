import React from 'react';
import {connect} from "react-redux";
import images from "../../../../assets/images";
import Reward from "../../../../commons/libs/gtg-reawards";
import Constants from "../../../../utils/Constants";
import Home from '../../screens/home';
import * as actions from "../actions";
import * as constants from "../constants";

class ChallengesUnlockingPopup extends React.Component {

    constructor(props) {
        super(props);
    }

    popupFlag = () => {
        this.props.toggleChallengesUnlockingPopup(false);
        //$("body").removeClass("show-modal");
    };

    componentDidUpdate(prevProps) {
        if (this.props.unlockingChallengesPopupFlag !== prevProps.unlockingChallengesPopupFlag) {
            if (this.props.unlockingChallengesPopupFlag) {
                //$("body").addClass("show-modal");
            }
        }
    }

    rewardRef2 = (ref) => {
        this.reward2 = ref
        if (ref) {
            const time = setTimeout(() => {
                clearTimeout(time)
                if (this.reward2) {
                    this.reward2.rewardMe(window.innerWidth / 2, window.innerHeight * 0.7)
                }
            }, 1000);
        }
    }

    render() {
        const {unlockingChallengesPopupFlag, userBenefits} = this.props;

        return unlockingChallengesPopupFlag === true && userBenefits ? (
            <div className="modal unlocked-modal animated fadeIn faster skillzone-popup-visible" style={{display: 'block'}}>
                <div className="modal-contenier animated bounceIn">
                    <div className="modal-outer">
                        <div className="modal-body">
                            <div className="popup-info unlocked-info">
                                <div className="unlocked-content">
                                    <div className="store-card-top">
                                        <div className="shiled">
                                            <figure className="badge-figure"><img src={images.shiled} alt=""/>
                                                <figcaption className="badge-num">4</figcaption>
                                            </figure>
                                        </div>
                                        <div className="unlocked-title"><span className="level-text">YOU'VE REACHED LEVEL 4!</span> <span className="unlocked-text">You have unlocked Weekly Challenges!</span></div>
                                        <div className="store-label"><i className="icon pp-challenges"></i><span>weekly challenges</span></div>
                                    </div>
                                    <div className="store-card-content">
                                        <p>Now you have access to special challenges that allow you to earn more rewards! Check the Challenges tab for more information.</p>
                                    </div>
                                    <div className="button-bar center-bar">
                                        <div className="button-bar-outer">
                                            <div className="col"><a onClick={this.popupFlag} className="btn primary-btn">Continue</a></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <Reward onRef={this.rewardRef2} config={Constants.rewardsConfig.confetti}/>
                </div>
            </div>
        ) : null;
    }
}

const mapStateToProps = state => {
    return {
        unlockingChallengesPopupFlag: state[constants.NAME].unlockingChallengesPopupFlag,
        userBenefits: state[Home.constants.NAME].userBenefits,
    }
};

const mapDispatchToProps = dispatch => {
    return {
        toggleChallengesUnlockingPopup: (flag) => dispatch(actions.toggleChallengesUnlockingPopup(flag)),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(ChallengesUnlockingPopup);
