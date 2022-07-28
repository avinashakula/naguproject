import React from 'react';
import {connect} from "react-redux";
import images from "../../../../assets/images";
import Reward from "../../../../commons/libs/gtg-reawards";
import Constants from "../../../../utils/Constants";
import * as actions from "../actions";
import * as constants from "../constants";

class TrainingUnlockingPopup extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            popupIndex: 0,
        }
    }

    handleNext = () => {
        this.setState({
            popupIndex: this.state.popupIndex + 1
        })
    };

    popupFlag = () => {
        this.props.toggleTrainingUnlockingPopup(false);
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
        const {popupIndex} = this.state;
        const {unlockingPopupFlag} = this.props;
        return (unlockingPopupFlag === true) && (
            <React.Fragment>
                <div className="modal-popup score-popup wow fadeIn skillzone-popup-visible">
                    <div className="modal-container">
                        <div className="modal-outer">
                            <div className="popup-head">
                                <div className="score-head">
                                    <figure><img src={images.levelIcon} alt="icon"/> <span>{Constants.trainingTabLevel}</span></figure>
                                </div>
                                <div className="popup-title">
                                    <h3>YOU'VE REACHED LEVEL {Constants.trainingTabLevel}! <br/>
                                        TRAINING MODE UNLOCKED</h3>
                                </div>
                                {/* <a className="close-icon" onClick={this.popupFlag}>
                                <figure><img src={images.closeButton} alt=""/></figure>
                            </a>*/}
                            </div>
                            <div className="popup-body">

                                {/* test you skills design first popup to display    wow fadeIn*/}
                                {popupIndex === 0 && <div className="mid-popup-section">
                                    <div className="popup-top">
                                        <div className="skill-text">
                                            <h5>TEST YOUR SKILLS AND EARN GOLD BY PLAYING MINI GAMES!</h5>
                                        </div>
                                    </div>
                                    <div className="popup-bottom">
                                        <div className="pp-skill-icon">
                                            <ul className="skill-icon">
                                                <li><img src={images.trainingPopupJugglingIcon} alt=""/></li>
                                                <li><img src={images.trainingPopupDribblingIcon} alt=""/></li>
                                                <li><img src={images.trainingPopupAccuracyIcon} alt=""/></li>
                                                <li><img src={images.trainingPopupCurvingIcon} alt=""/></li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>}

                                {/*stamina bar content second popup to display*/}
                                {<div className="mid-popup-section wow bounceInRight"
                                      style={{display: popupIndex === 1 ? "block" : "none"}}>
                                    <div className="popup-top">
                                        <div className="range-slide-section">
                                            <div className="range-progress">
                                                <div className="progress-range-inner"
                                                     style={{width: "66%", maxWidth: "100%"}}></div>
                                                <div className="range-value">
                                                    <figure><img src={images.staminaIcon} alt="stamina-icon"/>
                                                    </figure>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="popup-bottom">
                                        <div className="popup-title-text">
                                            <h4>TRAIN HARD TO EARN GOLD <br/>
                                                BUT KEEP AN EYE ON YOUR STAMINA!</h4>
                                        </div>
                                    </div>
                                </div>}

                                {/*third popup to display*/}
                                {<div className="mid-popup-section wow bounceInRight"
                                      style={{display: popupIndex === 2 ? "block" : "none"}}>
                                    <div className="popup-top">
                                        <div className="high-score-popup">
                                            <div className="high-scorein">
                                                <h2>HIGH SCORE</h2>
                                                <h3>1201</h3>
                                                <h4>My Score: 1008</h4>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="popup-bottom">
                                        <div className="popup-title-text">
                                            <h4>You can play training games at any time to work your way towards a bonus.</h4>
                                        </div>
                                    </div>
                                </div>}

                            </div>

                            {/*continue button */}
                            {
                                <div className="popup-foot">
                                    <div className="popup-inner-foot">
                                        <div className="popup-btn-block">
                                            <a className="btn green-btn"
                                               onClick={popupIndex < 2 ? this.handleNext : this.popupFlag}>{popupIndex < 2 ? 'Continue' : 'Okay, got it!'}</a>
                                        </div>
                                    </div>
                                </div>
                            }
                            {/*jumping-items*/}
                            <div className="jumping-arrow">
                                <figure><img src={images.popupBottomArrow} alt=""/></figure>
                            </div>
                        </div>


                        <div className="popup-overlay"></div>


                        <div className="user-nav tab-unlock-nav">
                            <div className="user-nav-outer">
                                <ul className="nav-list">
                                    <li></li>
                                    <li className="unlock-tab">
                                        <a>
                                            <figure><i className="pp-training"></i></figure>
                                            <span>Training</span>
                                        </a>
                                    </li>
                                    <li></li>
                                    <li></li>
                                    <li></li>
                                    <li></li>
                                </ul>
                            </div>
                        </div>

                    </div>
                </div>
                <Reward onRef={this.rewardRef2} config={Constants.rewardsConfig.confetti}/>
            </React.Fragment>
        );
    }
}

const mapStateToProps = state => {
    return {
        unlockingPopupFlag: state[constants.NAME].unlockingPopupFlag,
    }
};

const mapDispatchToProps = dispatch => {
    return {
        toggleTrainingUnlockingPopup: (flag) => dispatch(actions.toggleTrainingUnlockingPopup(flag)),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(TrainingUnlockingPopup);
