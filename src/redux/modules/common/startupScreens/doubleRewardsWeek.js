import React, { Component } from 'react';
import Reward from "../../../../commons/libs/gtg-reawards";
import Constants from '../../../../utils/Constants';
import { connect } from "react-redux";
import * as actions from "../actions";
import * as constants from "../constants";
import HelperFunctions from '../../../../utils/HelperFunctions';
import images from '../../../../assets/images';

class DoubleRewardsWeek extends Component {

    popupFlag = () => {
        this.props.toggleDoubleRewardsPopup(false);
        //$("body").removeClass("show-modal");
    };

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
        const {userInfo, doubleRewardsPopup} = this.props;
        // console.log(doubleRewardsPopup, "userInfo");
        return userInfo && doubleRewardsPopup ? (
            <div className="modal congra-modal double-rewards-modal skillzone-popup-visible" style={{ display: 'block' }}>
                <div className="modal-contenier">
                    <div className="modal-outer">
                        <div className="modal-body">
                            <div className="popup-info congra-info">
                                <div className="congra-content">
                                    <div className="congra-card">
                                        <div className="shiled">
                                            <figure className="badge-figure"><img src={images.trophyTwo} alt="" /> </figure>
                                        </div>
                                        <div className="congra-detail">
                                            <h2 className="congra-title"><span>DOUBLE REWARDS WEEK!</span></h2>
                                            <div className="congra-pre">
                                                <p className="congra-pre-text">
                                                Based on your finishing position on the leaderboard this week, get double the prizes! For example, if you finish 100th on the leaderboard, instead of winning {HelperFunctions.getCurrency(userInfo.currency) + HelperFunctions.formatCurrency(4)} you would win {HelperFunctions.getCurrency(userInfo.currency) + HelperFunctions.formatCurrency(8)}!
                                                    </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <a className="close-btn" onClick={this.popupFlag}><i className="icon pp-cross"></i></a> </div>
                </div>
                <Reward onRef={this.rewardRef2} config={Constants.rewardsConfig.confetti} />
            </div>
        ) : null;
    }
}

const mapStateToProps = state => {
    return {
        userInfo: state[constants.NAME].userInfo,
        doubleRewardsPopup: state[constants.NAME].doubleRewardsPopup,
    }
};

const mapDispatchToProps = dispatch => {
    return {
        toggleDoubleRewardsPopup: (flag) => dispatch(actions.toggleDoubleRewardsPopup(flag)),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(DoubleRewardsWeek);