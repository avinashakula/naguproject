import React, { Component } from 'react';
import images from '../../../../../assets/images';
import ContentLoader from '../../../../../commons/components/contentLoader';
import ImagePreload from '../../../../../commons/components/imagePreload/imagePreload';
import Reward from '../../../../../commons/libs/gtg-reawards';
import Constants from '../../../../../utils/Constants';

class DailyRevealRewardClaimed extends Component {

    constructor(props) {
        super(props);

        this.state = {
            imagePreloaded: false
        }
    }

    disableLoader = () => {
        this.setState({
            imagePreloaded: true
        })
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
        const { claimReward, toggleDailyRewardClaimedPopup } = this.props;
        const { imagePreloaded } = this.state;
        // console.log(claimReward, "claimReward")
        const gamesImgArr = [images.welcomeGiftAuraRaysFive, images.welcomeGiftAuraRaysFive, images.starGlowTwo]
        return claimReward.data ? (
            <div className="modal gift-open-modal skillzone-popup-visible" style={{ display: 'block' }}>
                <div className="modal-contenier">
                    <div className="modal-outer animated bounceIn">
                        {
                            !imagePreloaded ?
                                <React.Fragment>
                                    <ContentLoader loaderType={"content-relative"} />
                                    <ImagePreload disableLoader={this.disableLoader} images={gamesImgArr} />
                                </React.Fragment> :
                                <React.Fragment>
                                    <div className="modal-body">
                                        <div className="popup-info">
                                            <div className="gift-open">
                                                <div className="gift-open-figure">
                                                    <div className="open-gift">
                                                        <div className="animate-box">
                                                            <div className="animate-inner">
                                                                <figure className="animate-figure round-animate"><img src={images.welcomeGiftAuraRaysFive} alt="" /></figure>
                                                                <figure className="animate-figure round-animate2"><img src={images.welcomeGiftAuraRaysFive} alt="" /></figure>
                                                                <figure className="animate-figure flash-animate"><img className="round-animate" src={images.starGlowTwo} alt="" /></figure>
                                                            </div>
                                                        </div>
                                                        <figure className="open-gift-item"><img src={images.openGift} alt="" /></figure>
                                                    </div>
                                                </div>
                                                <div className="gold-win-content">
                                                    <div className="gold-icon-bar">
                                                        <figure className="gold-figure"><img src={images.goldsIcons} alt="" /></figure>
                                                    </div>
                                                    <h2 className="gold-won-title">You've won {claimReward.data.reveal_claim.reveal_gold} gold!</h2>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <a className="close-btn animated bounceIn fast delay-1s" onClick={toggleDailyRewardClaimedPopup}><i className="icon pp-cross"></i></a>
                                </React.Fragment>

                        }
                    </div>

                    <div onClick={toggleDailyRewardClaimedPopup} className="modal-overlay"></div>
                </div>
                <Reward onRef={this.rewardRef2} config={Constants.rewardsConfig.confetti} />
            </div>
        ) : null;
    }
}

export default DailyRevealRewardClaimed;