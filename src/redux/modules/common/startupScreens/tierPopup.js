import React from 'react';
import { connect } from "react-redux";
import images from "../../../../assets/images";
import ContentLoader from '../../../../commons/components/contentLoader';
import Reward from "../../../../commons/libs/gtg-reawards";
import Constants from "../../../../utils/Constants";
import HelperFunctions from '../../../../utils/HelperFunctions';
import Home from '../../screens/home';
import * as actions from "../actions";
import * as constants from "../constants";

class TierPopup extends React.Component {

    constructor(props) {
        super(props);
    }

    popupFlag = () => {
        this.props.toggleItemsUnlockingPopup(false);
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

    handleClaim = () => {
        this.props.claimTierPrize();
    }

    render() {
        const { tierPopup, claimData } = this.props;
        // console.log(tierPopup, claimData, "tierPopup");
        return tierPopup ? (
            <div className="modal tier-modal skillzone-popup-visible" style={{ display: 'block' }}>
                <div className="modal-contenier">
                    <div className="modal-outer">
                        <div className="modal-body">
                            <div className="popup-info tier-info">
                                <div className="tier-content">
                                    <div className="tier-card-top">
                                        <div className="tier-shiled">
                                            <figure className="tier-figure"><img src={HelperFunctions.generateLocalImgPath(tierPopup.trophyIcon)} alt="" />
                                            </figure>
                                        </div>

                                        <h2 className="tier-title">congratulations</h2>
                                    </div>

                                    <div className="tier-mid">
                                        <div className="tier-prize-block">
                                            <div className="tier-prize-outer">
                                                <div className="tier-prize-pre"><p>{`You have made it into the ${tierPopup.tier} tier for ${tierPopup.month}`}</p></div>
                                                <div className="tier-prize-right">
                                                    <figure className="tier-prize">
                                                        <img src={HelperFunctions.generateLocalImgPath(tierPopup.badgeIcon)} alt="" />
                                                    </figure>
                                                </div>
                                            </div>
                                        </div>


                                        <div className="tier-won">
                                            <h3 className="tier-won-title">{`YOU HAVE WON ${tierPopup.prize} GOLD!`}</h3>
                                            {claimData.isAdded && <p className="tier-won-pre">The gold has been automatically added to your total!</p>}
                                        </div>


                                    </div>


                                    <div className="button-bar center-bar">
                                        {
                                            <div className="button-bar-outer">
                                                {
                                                    claimData.isSubmitting ? <ContentLoader loaderType={"mini-loader"} /> :
                                                        claimData.isAdded ? null : <div className="col"><a className="btn primary-btn" onClick={this.handleClaim}>Continue</a></div>

                                                }
                                            </div>
                                        }

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <Reward onRef={this.rewardRef2} config={Constants.rewardsConfig.confetti} />
            </div>
        ) : null;
    }
}

const mapStateToProps = state => {
    return {
        tierPopup: state[constants.NAME].tierPopup,
        claimData: state[constants.NAME].claimData,
        userBenefits: state[Home.constants.NAME].userBenefits,
    }
};

const mapDispatchToProps = dispatch => {
    return {
        toggleTierPopup: (flag) => dispatch(actions.toggleTierPopup(flag)),
        claimTierPrize: () => dispatch(actions.claimTierPrize()),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(TierPopup);
