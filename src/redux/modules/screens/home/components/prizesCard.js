import React, { Component } from 'react';
import images from '../../../../../assets/images';
import ProjectRoutes from '../../../../../config/routes/projectRoutes';
import HelperFunctions from '../../../../../utils/HelperFunctions';

class PrizesCard extends Component {

    toggleFAQ = (type) => {
        switch (type) {
            case "lm":
                this.props.handleHowToPopup(true, ProjectRoutes.leaderboard.url);
                return;
            case "day":
                this.props.handleHowToPopup(true, null, 1);
                return;
            case "prize":
                this.props.handleHowToPopup(true, null, 2);
                return;
        }

    }

    render() {
        const { prizeInfo } = this.props;
        const dblReFlag = HelperFunctions.doubleRewardTimeToShow();
        return prizeInfo && prizeInfo.score_prizes ? (
            <div className="card-info prize-card-info  animated slideInDownLess">
                <div className="card-outer">
                    <div className="wcard">
                        <div className="prize-card">
                            {/* {prizeInfo.active_day && <span className="card-num">Day {prizeInfo.active_day} of 7</span>} */}
                            <div className="prize-icon">
                                <figure className="prize-figure"><img src={images.trophyTwo} alt="" /></figure>
                            </div>
                            <div className="prize-detail">
                                <div className="prize-title"><span>{dblReFlag ? "Double Rewards Week!" : "Prizes"}</span></div>
                                <p className="prize-label">

                                    {
                                        dblReFlag ? <span>{`${HelperFunctions.getCurrency(prizeInfo.user_info.currency) + HelperFunctions.formatNumber(20000)} `}</span> : <span>{`${HelperFunctions.getCurrency(prizeInfo.user_info.currency) + HelperFunctions.formatNumber(prizeInfo.score_prizes.ws_total_prize)} `}</span>
                                    }

                                    {
                                        dblReFlag ? "in cash prizes and 24,000 power ups to give away this week!" : "in cash prizes and " + HelperFunctions.formatNumber(prizeInfo.score_prizes.weekly_total_winners) +" Gold are given away each week!"
                                    }
                                    
                                    </p>
                                <div className="card-play">
                                    <a className="btn primary-btn" onClick={this.toggleFAQ.bind(this, "prize")}>View Prizes</a>
                                    {prizeInfo.active_day ? <a className="btn primary-btn" onClick={this.toggleFAQ.bind(this, "day")}>Day {prizeInfo.active_day} of 7</a> : null}
                                    <a className="btn primary-btn" onClick={this.toggleFAQ.bind(this, "lm")}>Learn More</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        ) : null;
    }
}

export default PrizesCard;