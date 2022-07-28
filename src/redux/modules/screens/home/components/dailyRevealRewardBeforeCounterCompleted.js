import React, { Component } from 'react';
import images from '../../../../../assets/images';
import ContentLoader from '../../../../../commons/components/contentLoader';
import DateHelper from '../../../../../utils/DateHelper';
import TimeCounter from '../../../common/countDown/timeCounter';

class DailyRevealRewardBeforeCounterCompleted extends Component {

    constructor(props) {
        super(props);

        this.state = {
            readyToClaim: false
        }
    }

    makeClaimActive = () => {
        // this.setState({ readyToClaim: true });
        this.props.handleDailyRewardPopup(false);
        // this.props.toggleDailyRewardFirstPopup();
    };

    render() {
        const { leaderboardPrizesData, claimDailyReveal, claimReward, handleDailyRewardPopup, releaseTime } = this.props;
        const { readyToClaim } = this.state;
        return (
            <div className="modal skillzone-popup-visible" style={{ display: 'block' }}>
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
                                        <p>Everyone loves a freebie! Come back daily to Game Center, and the Daily Reveal to claim your reward on us!</p>
                                    </div>


                                    {
                                        readyToClaim ? <div className="button-bar center-bar">
                                            <div className="button-bar-outer">
                                                {
                                                    claimReward.isLoading ? <ContentLoader loaderType={"mini-loader"} /> : <div className="col"><a className="btn primary-btn" onClick={claimDailyReveal}>Claim My Reward</a></div>
                                                }
                                            </div>
                                        </div> : <div className="enjoy-reveal-counter">
                                                <TimeCounter timerValue={releaseTime} onComplete={this.makeClaimActive} />
                                            </div>
                                    }

                                </div>
                            </div>
                        </div>
                        <a className="close-btn animated bounceIn fast delay-1s" onClick={handleDailyRewardPopup.bind(this, false)}><i className="icon pp-cross"></i></a>
                    </div>

                    <div onClick={handleDailyRewardPopup.bind(this, false)} className="modal-overlay"></div>
                </div>
            </div>
        );
    }
}

export default DailyRevealRewardBeforeCounterCompleted;