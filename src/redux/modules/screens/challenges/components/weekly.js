import React, { Component } from 'react';
import ContentLoader from "../../../../../commons/components/contentLoader";
import MessageContainer from '../../../../../commons/components/contentMessage';
import WalkThrough from '../../../../../commons/components/walkthrough';
import Reward from "../../../../../commons/libs/gtg-reawards";
import Constants from "../../../../../utils/Constants";
import DateHelper from '../../../../../utils/DateHelper';
import HelperFunctions from '../../../../../utils/HelperFunctions';
import TimeCounter from '../../../common/countDown/timeCounter';

class Weekly extends Component {
    rewardRef2 = (ref) => {
        if (ref) {
            this.time = setTimeout(() => {
                clearTimeout(this.time);
                if (ref) {
                    ref.rewardMe('50%', '100%')
                }
            }, 1000);
        }
    };
    rewardRef1 = (ref) => {
        if (ref) {
            this.time = setTimeout(() => {
                clearTimeout(this.time);
                if (ref) {
                    ref.rewardMe('50%', '100%')
                }
            }, 1000);
        }
    };

    componentWillUnmount() {
        if (this.time) {
            clearTimeout(this.time);
        }
    }

    render() {
        const { challengesData, happyHourStatuschange, wtFlag } = this.props;
        // console.log(challengesData, "challengesData")
        return (
            <div className={`tab-content walkthrought-item ${wtFlag && "wt-show"}`} style={{ display: "block" }}>
                {
                    challengesData.happyHour ? challengesData.happyHour.loader ? (
                        <ContentLoader loaderType={"content-relative"} />
                    ) : (
                        <div className="block weekly-content">

                            {
                                challengesData.happyHour.active && (
                                    <div className="card-info weekly-card-info currently-active-info animated slideInUpLess">
                                        <div className="title">
                                            <h2 className="card-title">Happy Hour Is Now Active</h2>
                                        </div>
                                        <div className="card-outer">

                                            {
                                                challengesData.happyHour.active.map((activeHH, activeIndex) => {

                                                    // console.log(activeHH, "activeHH");
                                                    let endTime = DateHelper.calculateMatchDateTimeDifferenceFromCurrent(DateHelper.getDateFromStringMoment(activeHH.end_date_time));
                                                    let pointsText = '';
                                                    if (activeHH.hh_points === undefined) {
                                                        pointsText = '0 Point'
                                                    } else if (activeHH.hh_points === 1) {
                                                        pointsText = "1 Point";
                                                    } else {
                                                        pointsText = activeHH.hh_points + " Points";
                                                    }

                                                    return (
                                                        <div className="wcard" key={activeIndex}>
                                                            <div className="game-info-card">
                                                                {(activeHH.is_played) && (
                                                                    <div className="completed-match">
                                                                        <div className="completed-match-outer">
                                                                            {
                                                                                activeHH.is_played && <React.Fragment>
                                                                                    <span className="comp-label animated bounceIn delay-1s"><i className="icon pp-check"></i><span>Completed!</span></span>
                                                                                    <p className={"animated fadeInUpLess slower delay-1s"}>Well done you played during Happy Hour. Come back for the next one!</p>
                                                                                </React.Fragment>
                                                                            }
                                                                        </div>
                                                                    </div>
                                                                )}
                                                                {
                                                                    activeHH.already_start && (
                                                                        <div class="already-played"><p className={"animated fadeInUpLess slower delay-1s"}>Sorry you have already played Hit The Spot today. Keep a look out for future Happy Hours and play within those windows!</p></div>
                                                                    )
                                                                }
                                                                <span className="sports-figure-block">
                                                                    <figure className="title-figure">
                                                                        <img className={"animated slideInDownLess slow"} src={challengesData.base_url + "images/" + activeHH.game_info.mini_game_logo} alt="" />
                                                                    </figure>
                                                                </span>
                                                                <div className="card-counter">
                                                                    <TimeCounter timerValue={endTime} timerText={"ENDS IN"} onComplete={happyHourStatuschange} />
                                                                </div>
                                                                <div className="game-title light-texture">
                                                                    <div className="game-title-outer">
                                                                        <h2>{activeHH.hh_name}</h2>
                                                                    </div>
                                                                </div>
                                                                {
                                                                    (activeHH.big_target || activeHH.double_xp) ? null : <div className="game-info-wrap">
                                                                        <p>
                                                                            {activeHH.description}
                                                                        </p>
                                                                    </div>
                                                                }
                                                                {
                                                                    (activeHH.big_target || activeHH.double_xp) ? null : <div className="game-points-wrap">
                                                                        <div className="game-points-outer"><span className="progress-points">{pointsText}</span>
                                                                            <div className="progress-bar">
                                                                                <div className="progress-fill"
                                                                                    style={{ width: HelperFunctions.getHappyHourBarPer(activeHH.hh_points, activeHH.target_points), animationDuration: '2s' }}></div>
                                                                            </div>
                                                                            <div className="progress-labsl"><span className="pull-left">0</span> <span className="pull-right">{activeHH.target_points}</span></div>
                                                                        </div>
                                                                    </div>
                                                                }
                                                            </div>
                                                            {activeHH.is_played && <Reward onRef={this.rewardRef2} config={Constants.rewardsConfig.confetti} />}
                                                        </div>
                                                    )
                                                })
                                            }
                                        </div>
                                    </div>
                                )
                            }
                            {
                                challengesData.happyHour.upcoming && (
                                    <div className="card-info weekly-card-info currently-active-info animated slideInUpLess">
                                        <div className="title">
                                            <h2 className="card-title">Upcoming</h2>
                                        </div>
                                        <div className="card-outer">

                                            {
                                                challengesData.happyHour.upcoming.map((activeHH, activeIndex) => {
                                                    let startTime = DateHelper.calculateMatchDateTimeDifferenceFromCurrent(DateHelper.getDateFromStringMoment(activeHH.start_date_time));
                                                    return (
                                                        <div className="wcard" key={activeIndex}>
                                                            <div className="game-info-card">
                                                                <span className="sports-figure-block">
                                                                    <figure className="title-figure"><img src={challengesData.base_url + "images/" + activeHH.game_info.mini_game_logo} alt="" /></figure>
                                                                </span>
                                                                <div className="card-counter">
                                                                    <TimeCounter timerValue={startTime} timerText={"STARTS IN"} onComplete={happyHourStatuschange} />
                                                                </div>
                                                                <div className="game-title light-texture">
                                                                    <div className="game-title-outer">
                                                                        <h2>{activeHH.hh_name}</h2>
                                                                    </div>
                                                                </div>
                                                                {
                                                                    (activeHH.big_target || activeHH.double_xp) ? null : <div className="game-info-wrap">
                                                                        <p>
                                                                            {activeHH.description}
                                                                        </p>
                                                                    </div>
                                                                }
                                                                {/*<div className="game-points-wrap">
                                                                    <div className="game-points-outer"><span className="progress-points">{activeHH.hh_points === 1 ? "1 Point" : activeHH.hh_points + " Points"}</span>
                                                                        <div className="progress-bar">
                                                                            <div className="progress-fill" style={{width: HelperFunctions.getHappyHourBarPer(activeHH.hh_points, activeHH.target_points)}}></div>
                                                                        </div>
                                                                        <div className="progress-labsl"><span className="pull-left">0</span> <span className="pull-right">{activeHH.target_points}</span></div>
                                                                    </div>
                                                                </div>*/}
                                                            </div>
                                                        </div>
                                                    )
                                                })
                                            }
                                        </div>
                                    </div>
                                )
                            }
                            {
                                challengesData.happyHour.closed && (
                                    <div className="card-info weekly-card-info currently-active-info animated slideInUpLess">
                                        <div className="title">
                                            <h2 className="card-title">Closed</h2>
                                        </div>
                                        <div className="card-outer">

                                            {
                                                challengesData.happyHour.closed.map((activeHH, activeIndex) => {
                                                    let endTime = DateHelper.calculateMatchDateTimeDifferenceFromCurrent(DateHelper.getDateFromStringMoment(activeHH.end_date_time));
                                                    let pointsText = '';
                                                    if (activeHH.hh_points === undefined) {
                                                        pointsText = '0 Point'
                                                    } else if (activeHH.hh_points === 1) {
                                                        pointsText = "1 Point";
                                                    } else {
                                                        pointsText = activeHH.hh_points + " Points";
                                                    }

                                                    return (
                                                        <div className="wcard" key={activeIndex}>
                                                            <div className="game-info-card">
                                                                {(activeHH.is_played) && (
                                                                    <div className="completed-match">
                                                                        <div className="completed-match-outer">
                                                                            {
                                                                                activeHH.is_played && <React.Fragment>
                                                                                    <span className="comp-label animated bounceIn delay-1s"><i className="icon pp-check"></i><span>Completed!</span></span>
                                                                                    <p className={"animated fadeInUpLess slower delay-1s"}>Well done you played during Happy Hour. Come back for the next one!</p>
                                                                                </React.Fragment>
                                                                            }
                                                                        </div>
                                                                    </div>
                                                                )}
                                                                {
                                                                    activeHH.already_start && (
                                                                        <div class="already-played"><p className={"animated fadeInUpLess slower delay-1s"}>Sorry you have already played Hit The Spot today. Keep a look out for future Happy Hours and play within those windows!</p></div>
                                                                    )
                                                                }
                                                                <span className="sports-figure-block">
                                                                    <figure className="title-figure">
                                                                        <img className={"animated slideInDownLess slow"} src={challengesData.base_url + "images/" + activeHH.game_info.mini_game_logo} alt="" />
                                                                    </figure>
                                                                </span>
                                                                <div className="card-counter">
                                                                    {/*<TimeCounter timerValue={endTime} timerText={"ENDS IN"} onComplete={happyHourStatuschange}/>*/}
                                                                </div>
                                                                <div className="game-title light-texture">
                                                                    <div className="game-title-outer">
                                                                        <h2>{activeHH.hh_name}</h2>
                                                                    </div>
                                                                </div>
                                                                {
                                                                    (activeHH.big_target || activeHH.double_xp) ? null : <div className="game-info-wrap">
                                                                        <p>
                                                                            {activeHH.description}
                                                                        </p>
                                                                    </div>
                                                                }
                                                                {
                                                                    (activeHH.big_target || activeHH.double_xp) ? null : <div className="game-points-wrap">
                                                                        <div className="game-points-outer"><span className="progress-points">{pointsText}</span>
                                                                            <div className="progress-bar">
                                                                                <div className="progress-fill"
                                                                                    style={{ width: HelperFunctions.getHappyHourBarPer(activeHH.hh_points, activeHH.target_points), animationDuration: '2s' }}></div>
                                                                            </div>
                                                                            <div className="progress-labsl"><span className="pull-left">0</span> <span className="pull-right">{activeHH.target_points}</span></div>
                                                                        </div>
                                                                    </div>
                                                                }
                                                            </div>
                                                            {activeHH.is_played && <Reward onRef={this.rewardRef1} config={Constants.rewardsConfig.confetti} />}
                                                        </div>
                                                    )
                                                })
                                            }
                                        </div>
                                    </div>
                                )
                            }


                        </div>
                    ) : (
                        <MessageContainer animclass={'animated slideInUpLess'} msg={"There are no challenges currently happening! More challenges are in the works, check back soon to see what's coming up!"} />
                    )
                }
                <WalkThrough wtText={"By completing Challenges you earn you extra Gold and XP. The monthly Gold tier challenge is one example of a Challenge, where the amount of XP correlates to a Gold prize!"} />

            </div>
        );
    }
}

export default Weekly;