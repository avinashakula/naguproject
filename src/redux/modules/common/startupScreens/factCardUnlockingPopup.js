import React from 'react';
import {connect} from "react-redux";
import images from "../../../../assets/images";
import Reward from "../../../../commons/libs/gtg-reawards";
import Constants from "../../../../utils/Constants";
import Home from '../../screens/home';
import * as actions from "../actions";
import * as constants from "../constants";

class FactCardUnlockingPopup extends React.Component {

    constructor(props) {
        super(props);
    }

    popupFlag = () => {
        this.props.toggleFactCardUnlockingPopup(false);
        //$("body").removeClass("show-modal");
    };

    componentDidUpdate(prevProps) {
        if (this.props.unlockingFactCardPopupFlag !== prevProps.unlockingFactCardPopupFlag) {
            if (this.props.unlockingFactCardPopupFlag) {
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
        const {unlockingFactCardPopupFlag, userBenefits} = this.props;

        return unlockingFactCardPopupFlag === true && userBenefits ? (
            <div className="modal unlocked-modal animated fadeIn faster skillzone-popup-visible" style={{display: 'block'}}>
                <div className="modal-contenier animated bounceIn">
                    <div className="modal-outer">
                        <div className="modal-body">
                            <div className="popup-info unlocked-info">
                                <div className="unlocked-content">
                                    <div className="store-card-top">
                                        <div className="shiled">
                                            <figure className="badge-figure"><img src={images.shiled} alt=""/>
                                                <figcaption className="badge-num">3</figcaption>
                                            </figure>
                                        </div>
                                        <div className="unlocked-title"><span className="level-text">YOU'VE REACHED LEVEL 3!</span> <span className="unlocked-text">You have unlocked Fun Facts!</span></div>
                                        <div className="store-label"><i className="icon pp-power"></i><span>Fun Facts</span></div>

                                    </div>
                                    <div className="store-card-content">
                                        <p>Check the home page everyday for the best facts on sport all around the world!</p>
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
        unlockingFactCardPopupFlag: state[constants.NAME].unlockingFactCardPopupFlag,
        userBenefits: state[Home.constants.NAME].userBenefits,
    }
};

const mapDispatchToProps = dispatch => {
    return {
        toggleFactCardUnlockingPopup: (flag) => dispatch(actions.toggleFactCardUnlockingPopup(flag)),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(FactCardUnlockingPopup);
