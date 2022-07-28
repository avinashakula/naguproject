import React, { Component } from 'react';
import Fantasy from '../../../../../commons/components/banners/fantasy';
import FriendWithBenefits from '../../../../../commons/components/banners/friendWithBenefits';

import ContentLoader from "../../../../../commons/components/contentLoader/index";
import PPHeadCard from "../../../../../commons/components/ppHeadCard";
import DateHelper from '../../../../../utils/DateHelper';
import HelperFunctions from '../../../../../utils/HelperFunctions';
import StartUpPopups from '../../../common/startupScreens';
import Prizes from '../../menu/components/prizes';
import ActiveUsers from './activeUsers';
import DailyRevealReward from './dailyRevealReward';
import DailyRevealRewardBeforeCounterCompleted from './dailyRevealRewardBeforeCounterCompleted';
import DailyRevealRewardClaimed from './dailyRevealRewardClaimed';
import DailyRevealRewardFirstPopup from './dailyRevealRewardFirstPopup';
import EpicScores from './epicScores';
import FeaturedGame from './featuredGame';
import FeaturedMatch from './featuredMatch';
import FlashSale from './flashSale';
import NewReleaseGames from "./newReleaseGames";
import PrizesCard from './prizesCard';
import TriviaVote from './triviaVote';
import WeekStats from './weekStats';
import UserPopup from '../../../common/startupScreens/userPopup';
import Constants from '../../../../../utils/Constants';
import Reward from '../../../../../commons/libs/gtg-reawards';

export default class Home extends Component {


    handleTracking = (type) => {
        this.props.userTracking("home_" + type);
    }

    handleFeaturedTracking = (type, props) => {
        this.props.userTracking(type, props);
    }

    claimDailyReveal = () => {
        this.props.claimDailyRewards();
    }

    handleDailyRewardPopup = (flag) => {
        this.props.toggleDailyRewardBeforeCountDownPopup(flag);
    }

    handleNicknamePopup = (game) => {
        this.props.toCheckWhichGameClicked(game);
        this.props.toCheckNicknameAvailable();
    }

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


    render() {
        const { dailyRewardBeforeCounterPopup, isNickNameAvailable, getPollVoteData, handleHowToPopup,
            funfacts, toggleDailyRewardFirstPopup, pollVoteData, submitPollVote, submittedPollVoteData,
            claimReward, toggleDailyRewardClaimedPopup, dailyRewardClaimedPopup, dailyRewardFirstPopup,
            claimDailyRewards, userPopups, userInfo, games, disableLoader, gamesDataLoading,
            userBenefits, getUserBenefits, itemPurchaseData, addInventory, stats,
            leaderboardPrizesData, endCurrentFlashSale, activeWT, claimWC } = this.props;
        const featuredGame = games && games.featuredGame;
        const featuredGamesImg = games && games.featuredGamesImg;
        const upcomingGame = games && games.upcomingGame;
        const upcomingGamesImg = games && games.upcomingGamesImg;
        const flashSale = userBenefits && userBenefits.flash_sale;
        const cdnBasePath = userBenefits && userBenefits.cdn_url;
        // const isFactCardOpen = userBenefits && userBenefits.user_level.level_id >= Constants.factCardLevel;
        const isFactCardOpen = true;

        const revealPrize = leaderboardPrizesData && leaderboardPrizesData.reveal_rewards;
        let releaseTime = null;
        if (revealPrize) {
            releaseTime = DateHelper.calculateMatchDateTimeDifferenceFromCurrent(DateHelper.getDateFromStringMoment(revealPrize.end_date));
            // releaseTime = DateHelper.calculateMatchDateTimeDifferenceFromCurrent(DateHelper.getDateFromStringMoment("2020-10-28 07:50:00"));
        }

        let gameWT = null;

        // if(activeWT && (activeWT.includes(Constants.sz_game_card_wt) && (activeWT.includes(Constants.sz_gold_wt) || activeWT.includes(Constants.sz_xp_wt)))) {
        //     HelperFunctions.toggleWTBodyClass(true);
        //     HelperFunctions.toggleBodyGrayedOutClass(true);
        //     gameWT = true;
        // } else if(userPopups && (userPopups.sz_gold_wt && userPopups.sz_xp_wt)) {
        //     HelperFunctions.toggleBodyGrayedOutClass(false);
        // }
        // else {
        //     HelperFunctions.toggleWTBodyClass(false);
        //     gameWT = false;
        // }



        if (activeWT && (activeWT.includes(Constants.sz_game_card_wt) || activeWT.includes(Constants.sz_gold_wt) || activeWT.includes(Constants.sz_xp_wt))) {
            // console.log(activeWT);
            HelperFunctions.toggleWTBodyClass(true);
            HelperFunctions.toggleBodyGrayedOutClass(true);
            if (activeWT.includes(Constants.sz_game_card_wt))
                gameWT = true;
            else
                gameWT = false;
        } else if (userPopups && (userPopups.sz_game_card_wt && userPopups.sz_gold_wt && userPopups.sz_xp_wt)) {
            HelperFunctions.toggleBodyGrayedOutClass(false);
            gameWT = false;
        } else {
            HelperFunctions.toggleWTBodyClass(false);
            gameWT = false;
        }


        // if(activeWT && activeWT.includes(Constants.sz_game_card_wt)) {
        //     HelperFunctions.toggleWTBodyClass(true);
        //     gameWT = true;
        // } else {
        //     HelperFunctions.toggleWTBodyClass(false);
        //     gameWT = false;
        // }

        // console.log(userPopups, "userPopups");
        return (
            <React.Fragment>
                <div className="mid-wrapper">
                    <div className="container">
                        <div className="block home-widget">

                            <PPHeadCard title={'FREE TO PLAY'} isHome={true} />

                            <PrizesCard
                                prizeInfo={leaderboardPrizesData}
                                handleHowToPopup={handleHowToPopup}
                            />

                            {/* Featured Game Section */}
                            <FeaturedGame
                                featuredGame={featuredGame}
                                featuredGamesImg={featuredGamesImg}
                                disableLoader={disableLoader}
                                handleTracking={this.handleTracking}
                                userBenefits={userBenefits}
                                handleNicknamePopup={this.handleNicknamePopup}
                                gameWT={gameWT}
                                gamesDataLoading={gamesDataLoading} />

                            {/* New Release Game Section */}

                            {
                                upcomingGame && upcomingGame.length > 0 && <NewReleaseGames
                                    upcomingGame={upcomingGame}
                                    upcomingGamesImg={upcomingGamesImg}
                                    disableLoader={disableLoader}
                                    handleTracking={this.handleTracking}
                                    gamesDataLoading={gamesDataLoading} />
                            }


                            <DailyRevealReward
                                handleDailyRewardPopup={this.handleDailyRewardPopup}
                                releaseTime={releaseTime}
                                claimReward={claimReward}
                                claimDailyReveal={this.claimDailyReveal}
                                leaderboardPrizesData={leaderboardPrizesData}
                            />

                            <TriviaVote
                                pollVoteData={pollVoteData}
                                getPollVoteData={getPollVoteData}
                                submitPollVote={submitPollVote}
                                stats={stats}
                                newGameFlag={upcomingGame && upcomingGame.length === 0}
                                submittedPollVoteData={submittedPollVoteData}
                            />

                            {stats ? <ActiveUsers stats={stats} /> : <ContentLoader loaderType={"content-relative"} />}

                            {/* {
                                isFactCardOpen && <FeaturedMatch funfacts={funfacts} handleTracking={this.handleFeaturedTracking} />
                            } */}




                            {/* <FriendWithBenefits handleTracking={this.handleTracking} animclass={'animated slideInUpLess'} /> */}



                            <WeekStats
                                userInfo={userInfo}
                                stats={stats} />

                            {/* <RiskFree/> */}



                            <EpicScores stats={stats} handleHowToPopup={handleHowToPopup} />

                            <div className="card-info flash-sale-info animated slideInUpLess">
                                {
                                    userBenefits ? (
                                        userBenefits.flash_sale ? (
                                            <FlashSale
                                                flashSale={flashSale}
                                                cdnBasePath={cdnBasePath}
                                                userBenefits={userBenefits}
                                                getUserBenefits={getUserBenefits}
                                                addInventory={addInventory}
                                                itemPurchaseData={itemPurchaseData}
                                                endCurrentFlashSale={endCurrentFlashSale}
                                            />
                                        ) : userBenefits.flash_sale === null ? (
                                            <ContentLoader loaderType={"content-relative"} />
                                        ) : null
                                    ) : <ContentLoader loaderType={"content-relative"} />
                                }
                            </div>

                            {/* <Fantasy handleTracking={this.handleTracking} /> */}
                        </div>
                    </div>
                </div>

                {/* {
                    claimWC.isSubmitting && <ContentLoader loaderType={"transparent_loader"} />
                } */}

                {
                    // claimWC.isAdded && <div className="msg-card">
                    //     <div className="msg-card-outer">
                    //         <p>A welcome Gold bonus has been automatically added to your total!</p>
                    //     </div>
                    // </div>
                }

                {/* {
                    claimWC.isAdded && <Reward onRef={this.rewardRef2} config={Constants.rewardsConfig.welcome} />
                } */}

                {dailyRewardFirstPopup && <DailyRevealRewardFirstPopup
                    claimReward={claimReward}
                    claimDailyReveal={this.claimDailyReveal} />}

                {dailyRewardClaimedPopup && <DailyRevealRewardClaimed
                    toggleDailyRewardClaimedPopup={toggleDailyRewardClaimedPopup}
                    claimReward={claimReward} />}

                {
                    dailyRewardBeforeCounterPopup && <DailyRevealRewardBeforeCounterCompleted
                        claimReward={claimReward}
                        handleDailyRewardPopup={this.handleDailyRewardPopup}
                        claimDailyReveal={this.claimDailyReveal}
                        releaseTime={releaseTime}
                        toggleDailyRewardFirstPopup={toggleDailyRewardFirstPopup}
                        leaderboardPrizesData={leaderboardPrizesData} />
                }

                {isNickNameAvailable && <UserPopup />}

                <StartUpPopups />
            </React.Fragment>
        )
    }
}
