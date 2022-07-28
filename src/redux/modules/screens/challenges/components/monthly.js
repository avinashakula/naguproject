import React, { Component } from 'react';
import images from '../../../../../assets/images';
import MessageContainer from '../../../../../commons/components/contentMessage';
import WalkThrough from '../../../../../commons/components/walkthrough';
import HelperFunctions from '../../../../../utils/HelperFunctions';

class Monthly extends Component {

    constructor(props) {
        super(props);
        this.state = {
            progressWidth: "0px",
            tierReached: 'Work your way towards the Bronze Tier to earn bonus Gold, you can do it!',
            image: images.bronzeCoin,
            tierActive: null,
            title: "",
        }
    }

    componentDidMount() {
        let self = this;
        setTimeout(function () {
            self.calculateProgressBarWidth();
        }, 100);
    }

    componentDidUpdate(prevProps, prevState) {
        // only update progress if the data has changed
        let self = this;
        if ((prevProps.currentOrientation !== this.props.currentOrientation) || (this.props.data && this.props.data.monthly.points !== prevProps.data.monthly.points)) {
            setTimeout(function () {
                self.calculateProgressBarWidth();
            }, 100);
        }
    }

    calculateProgressBarWidth = () => {
        const { tierInfo, currentMonth } = this.props;
        if (currentMonth) {
            let monthPoints = currentMonth.points;
            //let monthPoints = 4000;
            const bi = document.getElementById("bronzeBar");

            const si = document.getElementById("silverBar");
            const gi = document.getElementById("goldBar");
            let bronzeBarWidth = bi ? bi.offsetWidth : 0;
            // console.log(bronzeBarWidth)
            let silversBarWidth = si ? si.offsetWidth + bronzeBarWidth : 0;
            let goldBarWidth = gi ? gi.offsetWidth + silversBarWidth : 0;
            let progressWidth = "0px";
            if (monthPoints <= tierInfo.bronze.points) {
                let width = HelperFunctions.generateRangeForRange(monthPoints, 0, tierInfo.bronze.points, 0, bronzeBarWidth);
                progressWidth = width + "px";
            } else if (monthPoints <= tierInfo.silver.points) {
                let width = HelperFunctions.generateRangeForRange(monthPoints, tierInfo.bronze.points, tierInfo.silver.points, bronzeBarWidth, silversBarWidth);
                progressWidth = width + "px";
            } else if (monthPoints <= tierInfo.gold.points) {
                let width = HelperFunctions.generateRangeForRange(monthPoints, tierInfo.silver.points, tierInfo.gold.points, silversBarWidth, goldBarWidth);
                progressWidth = width + "px";
            }
            else {
                progressWidth = goldBarWidth + "px";
            }

            let tierReached = 'Work your way towards the Bronze Tier to earn bonus Gold, you can do it!';
            let image = images.bronzeCoin;
            let tierActive = null;
            let title = "";
            if (monthPoints >= tierInfo.bronze.points) {
                tierReached = 'You have reached the Bronze Tier, keep trying to reach the Silver Tier!';
                image = images.silverCoin;
                tierActive = "bronze";
                title = "Congratulations!"
            }
            if (monthPoints >= tierInfo.silver.points) {
                tierReached = 'The Silver Tier has been reached, you are so close to the Gold Tier now!';
                image = images.goldCoin;
                tierActive = "silver";
                title = "Woohoo!"
            }
            if (monthPoints >= tierInfo.gold.points) {
                tierReached = 'You have reached the Gold Tier for ' + currentMonth.month + '. The maximum Gold bonus is coming your way!';
                image = images.bangIcon;
                tierActive = "gold";
                title = "Bang!"
            }

            this.setState({
                progressWidth: progressWidth,
                tierReached,
                image,
                tierActive,
                title
            });
        }


    };

    render() {
        const { currentMonth, tierInfo, wtFlag } = this.props;
        return (
            <div className="tab-content" style={{ display: 'block' }}>
                {
                    tierInfo ? <div className="block weekly-prizes">
                        <div className={`weekly-prizes-wrap walkthrought-item animated slideInUpLess ${wtFlag && "wt-show"}`}>
                            <h2 className="card-title">Monthly Gold Tier Challenge</h2>
                            <div className="week-prize-bar">
                                <div className="days-info">
                                    {currentMonth && <span>{currentMonth.month}</span>}
                                    {currentMonth && <span className={`less`}>{currentMonth.remaining_days === 1 ? "1 Day Remaining" : currentMonth.remaining_days + " Days Remaining"}</span>}
                                    <span>End</span>
                                </div>
                                {currentMonth && <div className="bar-points"><span>{currentMonth.points === 1 ? "1 XP" : currentMonth.points + " XP"}</span></div>}
                                <div className="prize-progress">
                                    <div className="progress">
                                        <div className="progress-bar" style={{ width: this.state.progressWidth }}></div>
                                    </div>
                                    <div className="progress-label-block">
                                        <div className="progress-label" id="bronzeBar">
                                            <div className="prog-label">
                                                <div className="score-tip"><span>{HelperFunctions.numberFormatter(tierInfo.bronze.points)}</span></div>
                                                <span className="label-line"></span>
                                                <p>{tierInfo.bronze.name + " Tier"}</p>
                                            </div>
                                        </div>
                                        <div className="progress-label" id="silverBar">
                                            <div className="prog-label">
                                                <div className="score-tip"><span>{HelperFunctions.numberFormatter(tierInfo.silver.points)}</span></div>
                                                <span className="label-line"></span>
                                                <p>{tierInfo.silver.name + " Tier"}</p>
                                            </div>
                                        </div>
                                        <div className="progress-label" id="goldBar">
                                            <div className="prog-label">
                                                <div className="score-tip"><span>{HelperFunctions.numberFormatter(tierInfo.gold.points)}</span></div>
                                                <span className="label-line"></span>
                                                <p>{tierInfo.gold.name + " Tier"}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="alert-msg info-alert">
                                    <div className="alert-msg-outer">
                                        <h2 className="alert-title">All Gold Prizes are paid out on the 1st of each month.</h2>
                                        <div className="info-alert-in">
                                            <figure className="alert-figure"><img src={this.state.image} alt="" /></figure>
                                            <div className="alert-text-in">
                                                <h3 className="aleft-text-title">{this.state.title}</h3>
                                                <p className="aleft-text">{this.state.tierReached}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="tiers-prize-wrap">
                                <div className="chalng-prizes">
                                    <div className="prizes-col">
                                        <div className="prizes-head">
                                            <h2>Prizes</h2>
                                        </div>
                                        <div className="tier-prizes">
                                            <div className="prizes-row">
                                                <div className="tiers-col">
                                                    <div className="col-1">
                                                        <h3>{tierInfo.gold.name + " Tier"}</h3>
                                                        <p>Receive {tierInfo.gold.prize_amount} bonus gold when you reach {tierInfo.gold.points} XP in {currentMonth ? currentMonth.month : ""}</p>
                                                    </div>
                                                    <div className="col">
                                                        <div className={`tiers-col-box ${this.state.tierActive == 'gold' ? "active" : ""}`}>
                                                            <figure><img src={images.starBadge} alt="" /></figure>
                                                            <span>{tierInfo.gold.prize_amount}</span></div>
                                                    </div>
                                                </div>
                                                <div className="tiers-col">
                                                    <div className="col-1">
                                                        <h3>{tierInfo.silver.name + " Tier"}</h3>
                                                        <p>Receive {tierInfo.silver.prize_amount} bonus gold when you reach {tierInfo.silver.points} XP in {currentMonth ? currentMonth.month : ""}</p>
                                                    </div>
                                                    <div className="col">
                                                        <div className={`tiers-col-box ${this.state.tierActive == 'silver' ? "active" : ""}`}>
                                                            <figure><img src={images.starBadge} alt="" /></figure>
                                                            <span>{tierInfo.silver.prize_amount}</span></div>
                                                    </div>
                                                </div>
                                                <div className="tiers-col">
                                                    <div className="col-1">
                                                        <h3>{tierInfo.bronze.name + " Tier"}</h3>
                                                        <p>Receive {tierInfo.bronze.prize_amount} bonus gold when you reach {tierInfo.bronze.points} XP in {currentMonth ? currentMonth.month : ""}</p>
                                                    </div>
                                                    <div className="col">
                                                        <div className={`tiers-col-box ${this.state.tierActive == 'bronze' ? "active" : ""}`}>
                                                            <figure><img src={images.starBadge} alt="" /></figure>
                                                            <span>{tierInfo.bronze.prize_amount}</span></div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <WalkThrough wtText = {"By completing Challenges you earn you extra Gold and XP. The monthly Gold tier challenge is one example of a Challenge, where the amount of XP correlates to a Gold prize!"} />
                        </div>
                    </div> : (
                        <MessageContainer animclass={'animated slideInUpLess'} msg={"There are no monthly challenges currently happening! More challenges are in the works, check back soon to see what's coming up!"} />
                    )
                }



            </div>
        )
    }
}

export default Monthly;