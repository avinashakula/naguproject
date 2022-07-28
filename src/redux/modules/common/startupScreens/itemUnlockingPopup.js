import React from 'react';
import { connect } from "react-redux";
import images from "../../../../assets/images";
import Reward from "../../../../commons/libs/gtg-reawards";
import Constants from "../../../../utils/Constants";
import Home from '../../screens/home';
import * as actions from "../actions";
import * as constants from "../constants";

class ItemsUnlockingPopup extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            popupOne: "show",
            popupTwo: "",
            popupThree: "",
            popupFour: ""
        }
    }

    handleSlides = (slide) => {
        switch (slide) {
            case 1:
                this.setState({
                    popupOne: "show slide",
                    popupTwo: "show"
                });
                break;
            case 2:
                this.setState({
                    popupTwo: "show slide",
                    popupThree: "show"
                });
                break;
            case 3:
                this.setState({
                    popupThree: "show slide",
                    popupFour: "show"
                });
                break;
        }
    }

    popupFlag = () => {
        this.props.toggleItemsUnlockingPopup(false);
        //$("body").removeClass("show-modal");
    };

    componentDidUpdate(prevProps) {
        if (this.props.unlockingItemsPopupFlag !== prevProps.unlockingItemsPopupFlag) {
            if (this.props.unlockingItemsPopupFlag) {
                //$("body").addClass("show-modal temp");
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
        const { unlockingItemsPopupFlag, userBenefits } = this.props;

        const { popupOne, popupTwo, popupThree, popupFour } = this.state;

        return unlockingItemsPopupFlag === true && userBenefits ? (
            <div className="modal-wrap animated fadeIn faster skillzone-popup-visible" style={{ display: 'block' }}>

                {/* Modal 01 */}
                <div className={`modal store-unlocked-modal animate-left-modal ${popupOne}`}>
                    <div className="modal-contenier">
                        <div className="modal-outer">
                            <div className="modal-body">
                                <div className="popup-info store-unlocked-info">
                                    <div className="unlocked-content">
                                        <div className="store-card-top">
                                            <div className="shiled">
                                                <figure className="badge-figure"><img src={images.shiled} alt="" />
                                                    <figcaption className="badge-num">{Constants.itemsTabLevel}</figcaption>
                                                </figure>
                                            </div>
                                            <div className="unlocked-title"> <span className="level-text">YOU'VE REACHED LEVEL {Constants.itemsTabLevel}!</span></div>
                                            <div className="store-label"><i className="icon pp-item"></i><span>store is unlocked</span></div>
                                        </div>
                                        <div className="button-bar center-bar">
                                            <div className="button-bar-outer">
                                                <div className="col"><a onClick={this.handleSlides.bind(this, 1)} className="btn primary-btn">Next</a></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* <!--Modal 02--> */}
                <div className={`modal store-boost-modal animate-left-modal ${popupTwo}`}>
                    <div className="modal-contenier">
                        <div className="modal-outer">
                            <div className="modal-body">
                                <div className="popup-info store-boost-info">
                                    <div className="unlocked-content">
                                        <div className="store-card-top">
                                            <div className="shiled">
                                                <figure className="badge-figure"><img src={images.shiled} alt="" />
                                                    <figcaption className="badge-num">{Constants.itemsTabLevel}</figcaption>
                                                </figure>
                                            </div>

                                            <div className="unlocked-top">
                                                <div className="unlock-figure"><img src={images.storeItemOne} alt="" /></div>
                                            </div>

                                        </div>
                                        <div className="store-card-content">
                                            <p>Now you can purchase boosts with your gold! Simply click on the ‘Store’ tab or your gold total to visit the store! </p>
                                        </div>
                                        <div className="button-bar center-bar">
                                            <div className="button-bar-outer">
                                                <div className="col"><a onClick={this.handleSlides.bind(this, 2)} className="btn primary-btn">Next</a></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* <!--Modal 03--> */}
                <div className={`modal buy-boosts-modal animate-left-modal ${popupThree}`}>
                    <div className="modal-contenier">
                        <div className="modal-outer">
                            <div className="modal-body">
                                <div className="popup-info buy-boosts-info">
                                    <div className="unlocked-content">
                                        <div className="store-card-top">
                                            <div className="shiled">
                                                <figure className="badge-figure"><img src={images.shiled} alt="" />
                                                    <figcaption className="badge-num">{Constants.itemsTabLevel}</figcaption>
                                                </figure>
                                            </div>

                                            <div className="unlocked-top">
                                                <div className="unlock-figure"><img src={images.storeItemTwo} alt="" /></div>
                                            </div>

                                        </div>
                                        <div className="store-card-content">
                                            <p>You can buy boosts, or be awarded them as you level up and complete challenges. Any boosts you acquire will show in your inventory, which you can then use inside the relevant game!</p>
                                        </div>
                                        <div className="button-bar center-bar">
                                            <div className="button-bar-outer">
                                                <div className="col"><a onClick={this.handleSlides.bind(this, 3)} className="btn primary-btn">Next</a></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* <!--Modal 04--> */}
                <div className={`modal ticket-modal animate-left-modal ${popupFour}`}>
                    <div className="modal-contenier">
                        <div className="modal-outer">
                            <div className="modal-body">
                                <div className="popup-info ticket-info">
                                    <div className="unlocked-content">
                                        <div className="store-card-top">
                                            <div className="shiled">
                                                <figure className="badge-figure"><img src={images.shiled} alt="" />
                                                    <figcaption className="badge-num">{Constants.itemsTabLevel}</figcaption>
                                                </figure>
                                            </div>

                                            <div className="unlocked-top">

                                                <div className="game-items">
                                                    <ul className="game-items-ul">
                                                        <li><div className="game-item"><figure><img src={images.storeItemThree} alt="" /></figure></div></li>
                                                        <li><div className="game-item"><figure><img src={images.storeItemFour} alt="" /></figure></div></li>
                                                    </ul>
                                                </div>
                                            </div>

                                        </div>
                                        <div className="store-card-content">
                                            <p>So go on, check it out! Boosts are your ticket to the top of the leaderboards!</p>
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
                    </div>

                    <Reward onRef={this.rewardRef2} config={Constants.rewardsConfig.confetti} />
                </div>


            </div>
        ) : null;
    }
}

const mapStateToProps = state => {
    return {
        unlockingItemsPopupFlag: state[constants.NAME].unlockingItemsPopupFlag,
        userBenefits: state[Home.constants.NAME].userBenefits,
    }
};

const mapDispatchToProps = dispatch => {
    return {
        toggleItemsUnlockingPopup: (flag) => dispatch(actions.toggleItemsUnlockingPopup(flag)),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(ItemsUnlockingPopup);
