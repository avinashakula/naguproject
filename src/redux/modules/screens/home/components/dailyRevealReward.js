import React, { Component } from 'react';
import images from '../../../../../assets/images';
import ContentLoader from '../../../../../commons/components/contentLoader';
import DateHelper from '../../../../../utils/DateHelper';
import TimeCounter from '../../../common/countDown/timeCounter';

class DailyRevealReward extends Component {

    constructor(props) {
        super(props);

        this.state = {
            readyToClaim: false
        }
    }

    makeClaimActive = () => {
        this.setState({ readyToClaim: true });
    };

    componentDidUpdate(prevProps) {
        if (this.props.leaderboardPrizesData !== prevProps.leaderboardPrizesData) {
            this.setState({ readyToClaim: false });
        }
    }

    render() {
        const { leaderboardPrizesData, claimDailyReveal, claimReward, handleDailyRewardPopup, releaseTime } = this.props;
        const { readyToClaim } = this.state;
        const revealPrize = leaderboardPrizesData && leaderboardPrizesData.reveal_rewards;
    
        return (
            <div className="card-info reveal-reward-card reveal-full-block">
                <div className="title">
                    <h2 className="card-title animated slideInUpLess"><span>Daily Reveal Reward</span></h2>
                </div>
                <div className="card-outer">
                    {
                        leaderboardPrizesData ? <div className="wcard animated slideInUpLess">
                            <div className="reveal-card-block" onClick={(readyToClaim || !revealPrize.is_reveal_claim) ? null : handleDailyRewardPopup.bind(this, true)}>
                                <div className="reveal-block">
                                    <div className={`reveal-card ${(readyToClaim  || !revealPrize.is_reveal_claim) && "show-prize"}`}>
                                        {/* <!--show-prize--> */}
                                        <div className="reveal-left">
                                            <div className="reveal-gift">
                                                <div className="animate-box">
                                                    <div className="animate-inner">
                                                        <figure className="animate-figure round-animate"><img src={images.welcomeGiftAuraRaysFour} alt="" /></figure>
                                                    </div>
                                                </div>
                                                <figure className="gift-figure">
                                                    <img src={images.welcomeGiftDisable} className="before-animate" alt="" />
                                                    <img className="after-animate" src={images.wgIcon} alt="" /></figure>
                                            </div>
                                        </div>
                                        <div className="reveal-counter-bar">
                                            <div className="reveal-count-outer">
                                                <h3 className="reveal-title">{(readyToClaim || !revealPrize.is_reveal_claim) ? "Reveal Your Daily Reward!" : "Gold Reward Revealed In"}</h3>
                                                <TimeCounter timerValue={releaseTime} onComplete={this.makeClaimActive} />
                                                {
                                                    claimReward.isLoading ? <ContentLoader loaderType={"mini-loader"} /> :
                                                        <div className="claim-bar">
                                                            <a className="btn primary-btn" onClick={claimDailyReveal}>Claim Now</a>
                                                        </div>
                                                }

                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div> : <ContentLoader loaderType={"content-relative"} />
                    }
                </div>
            </div>
        );
    }
}

export default DailyRevealReward;