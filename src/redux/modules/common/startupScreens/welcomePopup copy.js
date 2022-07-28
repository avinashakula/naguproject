import $ from 'jquery';
import React, {Component} from 'react';
import OwlCarousel from 'react-owl-carousel2';
import {connect} from "react-redux";
import images from '../../../../assets/images';
import ContentLoader from '../../../../commons/components/contentLoader';
import Reward from "../../../../commons/libs/gtg-reawards";
import Constants from "../../../../utils/Constants";
import HelperFunctions from '../../../../utils/HelperFunctions';
import home from '../../screens/home';
import menu from '../../screens/menu';
import LbPrizes from '../../screens/menu/components/lbPrizes';
import * as actions from "../actions";
import * as constants from "../constants";

class WelcomeScreen extends Component {

    constructor(props) {
        super(props);

        this.options = {
            items: 1,
            autoplay: false,
            center: true,
            loop: false,
            nav: true,
            pagination: true,
            dots: true,
            autoHeight: false,
            autoWidth: false,
            margin: 0,
            responsive: {
                0: {
                    items: 1
                },
                640: {
                    items: 1
                },
                767: {
                    items: 1
                },
                1200: {
                    items: 1
                },
                1600: {
                    items: 1
                },
            }
        };
        this.totalItems = null;
        this.currentItemIndex = null;
        this.isClickedOnClaimNow = false;
        this.events = {
            onChanged: (event) => {
                let self = this;
                setTimeout(function () {
                    let element = document.getElementsByClassName("owl-next");
                    if (element[0] && !self.isClickedOnClaimNow) {
                        // console.log(event.item.count, event.item.index);
                        if (event.item.count === (event.item.index + 1)) {
                            // console.log("in side", element[0]);
                            $(".owl-next").text("Claim Now");
                            $(".owl-next").addClass("claim");
                        } else {
                            $(".owl-next").text("Next");
                            $(".owl-next").removeClass("claim");
                        }
                    }
                }, 100)
            },
            onInitialized: (event) => {

            }
        };
        this.state = {
            show: true,
        }

    }

    componentDidMount() {
        let self = this;
        $("body").off('click').on("click", ".owl-next", function () {
            if ($(".owl-next").hasClass("claim")) {
                $(".owl-next").addClass("disabled-nav");
                self.claimRewards();
            }
        });
    }

    claimRewards = (evt) => {
        if (!this.isClickedOnClaimNow) {
            this.isClickedOnClaimNow = true;
            this.props.claimWelcomeBonus();
        }
    };

    rewardRef = (ref) => {
        this.reward = ref
    };

    rewardRef2 = (ref) => {
        this.reward2 = ref;
        if (ref) {
            const time = setTimeout(() => {
                clearTimeout(time)
                if (this.reward2) {
                    this.reward2.rewardMe(window.innerWidth / 2, window.innerHeight * 0.8)
                }
            }, 1000);
        }
    }

    componentDidUpdate(prevProps) {
        if (this.props.claimWC !== prevProps.claimWC) {
            // console.log(this.props.claimWC, "this.props.claimWC")

            if (this.props.claimWC.isSubmitting) {
                $(".owl-nav").hide();
            }

            if (this.props.claimWC.isAdded === false) {
                $(".owl-nav").show();
            }

            if (this.props.claimWC.isAdded) {
                $(".owl-nav").hide();
            }
        }
    }

    render() {
        const {currentOrientation, welcomeScreenData, userBenefits, claimWC, leaderboardPrizesData} = this.props;
        // console.log(welcomeScreenData, leaderboardPrizesData,  "welcomeScreenData");
        return welcomeScreenData && leaderboardPrizesData ? (
            <React.Fragment>
                <div className="modal welcome-modal skillzone-popup-visible" style={{display: 'block'}}>
                    <div className="modal-contenier">
                        <div className="modal-outer">
                            <div className="modal-head">
                                <h2 className="modal-head-title">Welcome to the Game Center!</h2>
                            </div>
                            <div className="modal-body">
                                <div className="popup-info welcome-info">
                                    <div className="welcome-content">
                                        <OwlCarousel className={"welcome-block welcome-carousel"} ref="car" options={this.options} events={this.events}>

                                            <div className="wel-item wel-item1">
                                                <div className="wel-item-block">
                                                    <div className="item-top wel-card">
                                                        <figure className="item-figure"><img src={images.ppSkillLogo} alt=""/></figure>
                                                    </div>

                                                    <div className="item-content">

                                                        <p className="item-pre">Welcome to the new Game Center! </p>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="wel-item wel-item2">
                                                <div className="wel-item-block">
                                                    <div className="item-top single-location-card">
                                                        <figure className="item-figure"><img src={images.welcomeItemOne} alt=""/></figure>
                                                    </div>

                                                    <div className="item-content">

                                                        {/* <p className="item-pre">Why be just a footballer? Or just a golfer? In the new Game Center, you can access all of our existing games, plus a collection of upcoming
                                                            ones, in a single location!</p> */}
                                                            <p className="item-pre">The Game Center allows you to play a range of games in a single location!</p>
                                                    </div>
                                                </div>
                                            </div>


                                            {/* <div className="wel-item wel-item3">
                                                <div className="wel-item-block">
                                                    <div className="item-top item-level-card">
                                                        <figure className="item-figure"><img src={images.welcomeItemTwo} alt=""/></figure>
                                                    </div>

                                                    <div className="item-content">

                                                        <p className="item-pre">Instead of collecting different sets of Gold and XP, now all your games will contribute to the one total.</p>
                                                    </div>
                                                </div>
                                            </div> */}

                                            <div className="wel-item wel-item11">
                                                <div className="wel-item-block">
                                                    <div className="item-top item-grade-card">
                                                        <figure className="item-figure"><img src={images.welcomeItemNine} alt=""/></figure>
                                                    </div>

                                                    <div className="item-content">

                                                        <p className="item-pre">Every game you play will earn you Gold simply for playing, and XP based on how well you perform, so you will be levelling up in no time!</p>
                                                    </div>
                                                </div>
                                            </div>


                                            <div className="wel-item wel-item4">
                                                <div className="wel-item-block">
                                                    <div className="item-top item-boosts-card">
                                                        <figure className="item-figure"><img src={images.welcomeItemThree} alt=""/></figure>
                                                    </div>

                                                    <div className="item-content">

                                                        {/* <p className="item-pre">All your favorite  bits of the existing games are still around. Boosts for each game are now all in the one shop, and different challenges
                                                            and happy hours will become available.</p>*/}

                                                        <p className="item-pre">Use your Gold in the Store to unlock Boosts to give your gameplay an edge.</p>

                                                            
                                                    </div>
                                                </div>
                                            </div>


                                            {/* {
                                                leaderboardPrizesData && leaderboardPrizesData.score_prizes && <div className="wel-item wel-item5">
                                                    <div className="wel-item-block">
                                                        <div className="item-top item-prizes-card">
                                                            <figure className="item-figure"><img src={images.welcomeItemFour} alt="" /></figure>
                                                            <div className="prizes-box">
                                                                <div className="prizes-box-outer">
                                                                    <div className="prizes-box-in">
                                                                        <span>SHARE IN WEEKLY PRIZES OF</span>
                                                                        <h2>{`${HelperFunctions.getCurrency(leaderboardPrizesData.user_info ? leaderboardPrizesData.user_info.currency : '')}${HelperFunctions.formatNumber(leaderboardPrizesData.score_prizes.ws_total_prize)}`}</h2>
                                                                    </div>
                                                                </div>
                                                            </div>

                                                        </div>

                                                        <div className="item-content">

                                                            <p className="item-pre">Instead of competing for different sets of prizes, all prizes are now paid from one master leaderboard! But how do you win?</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            } */}


                                            <div className="wel-item wel-item6">
                                                <div className="wel-item-block">
                                                    <div className="item-top item-leader-card">
                                                        <figure className="item-figure"><img src={images.welcomeItemFive} alt=""/></figure>
                                                    </div>

                                                    <div className="item-content">

                                                        <p className="item-pre">You can play each game ONCE per day. Each game has its own in-game mini leaderboard. Your best 4 scores each week will accumulate to
                                                            make your total score on these in-game mini leaderboards. Any ties will be sorted using fastest time as a tiebreaker.</p>
                                                    </div>
                                                </div>
                                            </div>


                                            <div className="wel-item wel-item7">
                                                <div className="wel-item-block">
                                                    <div className="item-top item-mini-leader-card">
                                                        <figure className="item-figure"><img src={images.welcomeItemSix} alt=""/></figure>
                                                    </div>

                                                    <div className="item-content">

                                                        <p className="item-pre">Your position on each in-game mini leaderboard will earn you ‘Ranking Points’, which in turn decides how you win prizes…</p>
                                                    </div>
                                                </div>
                                            </div>

                                            {
                                               leaderboardPrizesData && leaderboardPrizesData.score_prizes && <div className="wel-item wel-item8">
                                                    <div className="wel-item-block">
                                                        <div className="item-top item-mini-prize-card">
                                                            <LbPrizes leaderboardPrizesData={leaderboardPrizesData}/>
                                                        </div>
                                                        <div className="item-content">
                                                            <p className="item-pre">Your best TWO ranking points totals (the 2 games where you performed best) will add together to give your final ranking on the master
                                                                leaderboard, where the prizes are handed out!</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            }

                                            <div className="wel-item wel-item9">
                                                <div className="wel-item-block">
                                                    <div className="item-top item-summary-card">
                                                        <h2 className="wel-item-title">That was too quick wasn’t it? Here’s a summary!</h2>
                                                    </div>

                                                    <div className="item-content">
                                                        <ul className="summary-ul">
                                                            <li>
                                                                <div className="summary-card">
                                                                    <p className="summary-title">You can play each game ONCE per day</p>
                                                                    <div className="summary-figures">
                                                                        <figure className="figure-port"><img src={images.hoopsLogo} alt=""/></figure>
                                                                        <figure className="figure-port"><img src={images.hoopsIndoorLogo} alt=""/></figure>        
                                                                        <figure className="figure-port"><img src={images.triviaLogo} alt=""/></figure>

                                                                        {/* <figure className="figure-port"><img src={images.itemMG} alt=""/></figure>
                                                                        <figure className="figure-port"><img src={images.homeHGLogo} alt=""/></figure>
                                                                        <figure className="figure-port"><img src={images.homeHTSLogo} alt=""/></figure>
                                                                        <figure className="figure-port"><img src={images.itemTrivia} alt=""/></figure> */}

                                                                    </div>
                                                                </div>

                                                            </li>

                                                            <li>
                                                                <div className="summary-card">
                                                                    <p className="summary-title">Your best FOUR scores each week contribute to the in-game mini leaderboard</p>
                                                                    <div className="summary-figures">
                                                                        <figure className="figure-port"><img src={images.itemLeader} alt=""/></figure>
                                                                    </div>
                                                                </div>

                                                            </li>

                                                            <li>
                                                                <div className="summary-card">
                                                                    <p className="summary-title">Your position on each in-game mini leaderboard earns you ranking points</p>
                                                                    <div className="summary-figures">
                                                                        <figure className="figure-port"><img src={images.itemWinner} alt=""/></figure>
                                                                    </div>
                                                                </div>

                                                            </li>


                                                            <li>
                                                                <div className="summary-card">
                                                                    <p className="summary-title">Ranking points from your TWO best performing games count towards your position on the master leaderboard</p>
                                                                    <div className="summary-figures">
                                                                        <figure className="figure-port"><img src={images.itemLeaderNoti} alt=""/></figure>
                                                                    </div>
                                                                </div>

                                                            </li>


                                                        </ul>

                                                    </div>
                                                </div>
                                            </div>


                                            {/* <div className="wel-item wel-item10">
                                                <div className="wel-item-block">
                                                    <div className="item-top item-levelup-card">
                                                        <figure className="item-figure"><img src={images.welcomeItemEight} alt=""/></figure>
                                                    </div>

                                                    <div className="item-content">

                                                        <p className="item-pre">We know you worked hard in the old versions of our games, but we want to welcome everyone into the new era on the same level playing field,
                                                            so everyone will start at Level 1. But don’t fear…</p>
                                                    </div>
                                                </div>
                                            </div> */}


                                            {/* <div className="wel-item wel-item11">
                                                <div className="wel-item-block">
                                                    <div className="item-top item-grade-card">
                                                        <figure className="item-figure"><img src={images.welcomeItemNine} alt=""/></figure>
                                                    </div>

                                                    <div className="item-content">

                                                        <p className="item-pre">Every game you play will earn you Gold simply for playing, and XP based on how well you perform, so you will be levelling up in no time!</p>
                                                    </div>
                                                </div>
                                            </div> */}


                                            {
                                                leaderboardPrizesData && <div className="wel-item wel-item12">
                                                    <div className="wel-item-block">
                                                        <div className="item-top item-bonus-card">
                                                            <figure className="item-figure"><img src={images.welcomeItemTen} alt=""/></figure>
                                                        </div>

                                                        <div className="item-content">

                                                            <div className="bonus-claim">
                                                                <ul className="bonus-ul">
                                                                    {
                                                                        leaderboardPrizesData && <li>
                                                                            <div className="bonus-block">
                                                                                <div className="pull-left">
                                                                                    <span className="bonus-label">Welcome to the Game Center</span>
                                                                                    <p className="bonus-pre">To get you started in the new Game Center we have credited your account
                                                                                        with {leaderboardPrizesData.welcome_bonus} gold!</p>
                                                                                </div>

                                                                                <div className="pull-right">
                                                                                    <div className="tiers-col-box">
                                                                                        <figure><img src={images.starBadge} alt=""/></figure>
                                                                                        <span>{leaderboardPrizesData.welcome_bonus}</span></div>
                                                                                </div>
                                                                            </div>
                                                                        </li>
                                                                    }
                                                                    {
                                                                        leaderboardPrizesData.loyality_bonus ? <li>
                                                                            <div className="bonus-block">
                                                                                <div className="pull-left">
                                                                                    <span className="bonus-label">Thanks for your Loyalty</span>
                                                                                    <p className="bonus-pre">{leaderboardPrizesData.loyality_text}</p>
                                                                                </div>
                                                                                <div className="pull-right">
                                                                                    <div className="tiers-col-box">
                                                                                        <figure><img src={images.starBadge} alt=""/></figure>
                                                                                        <span>{leaderboardPrizesData.loyality_bonus}</span></div>
                                                                                </div>
                                                                            </div>
                                                                        </li> : null
                                                                    }
                                                                </ul>

                                                            </div>

                                                            <p className="item-pre">So what are you waiting for? Jump on in! Press ‘Claim Now’ to grab a cheeky welcome bonus, on us!</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            }
                                        </OwlCarousel>

                                        {
                                            claimWC.isSubmitting && <ContentLoader loaderType={"mini-loader"}/>
                                        }

                                        {
                                            claimWC.isAdded && <div className="msg-block">
                                                <p>The gold has been automatically added to your total!</p>
                                            </div>
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <Reward onRef={this.rewardRef2} config={Constants.rewardsConfig.confetti}/>
                {
                    claimWC.isAdded && <Reward onRef={this.rewardRef2} config={Constants.rewardsConfig.welcome}/>
                }
            </React.Fragment>
        ) : null
    }
}

const mapStateToProps = state => {
    return {
        currentOrientation: state[constants.NAME].currentOrientation,
        welcomeScreenData: state[constants.NAME].welcomeScreenData,
        claimWC: state[constants.NAME].claimWC,
        userBenefits: state[home.constants.NAME].userBenefits,
        leaderboardPrizesData: state[menu.constants.NAME].leaderboardPrizesData,
    }
};

const mapDispatchToProps = dispatch => {
    return {
        claimWelcomeBonus: () => dispatch(actions.claimWelcomeBonus()),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(WelcomeScreen);
