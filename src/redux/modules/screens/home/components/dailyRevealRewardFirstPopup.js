import React, { Component } from 'react';
import images from '../../../../../assets/images';
import ContentLoader from '../../../../../commons/components/contentLoader';

class DailyRevealRewardFirstPopup extends Component {
    render() {
        const { claimDailyReveal, claimReward } = this.props;
        return (
            <div className="modal enjoy-reveal-modal skillzone-popup-visible" style={{ display: 'block' }}>
                <div className="modal-contenier">
                    <div className="modal-outer bounceIn animation">
                        <div className="modal-body">
                            <div className="popup-info enjoy-reveal-info">
                                <div className="unlocked-content">
                                    <div className="store-card-top">
                                        <div className="shiled">
                                            <figure className="badge-figure"><img src={images.giftIconTwo} alt="" /> </figure>
                                        </div>
                                        <div className="unlocked-title"> <span className="level-text">Enjoy your daily reveal!</span></div>
                                    </div>
                                    <div className="store-card-content">
                                        <p>Everyone loves a freebie! Tap on 'Claim My Reward' below to reveal your Daily Bonus! Come back each day to receive another reward for your loyalty in Game Center.</p>
                                    </div>
                                    <div className="button-bar center-bar">
                                        <div className="button-bar-outer">
                                            {
                                                claimReward.isLoading ? <ContentLoader loaderType={"mini-loader"} /> : <div className="col"><a className="btn primary-btn" onClick={claimDailyReveal}>Claim My Reward</a></div>
                                            }
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default DailyRevealRewardFirstPopup;