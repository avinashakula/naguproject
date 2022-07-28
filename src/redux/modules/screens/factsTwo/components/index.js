import React, { Component } from 'react';
import { Link } from 'react-router-dom';
// import Fantasy from '../../../../../commons/components/banners/fantasy';
// import FriendWithBenefits from '../../../../../commons/components/banners/friendWithBenefits';

import ContentLoader from "../../../../../commons/components/contentLoader/index";
// import PPHeadCard from "../../../../../commons/components/ppHeadCard";
// import DateHelper from '../../../../../utils/DateHelper';
// import HelperFunctions from '../../../../../utils/HelperFunctions';
// import StartUpPopups from '../../../common/startupScreens';
// import Prizes from '../../menu/components/prizes';
// import ActiveUsers from './activeUsers';
// import DailyRevealReward from './dailyRevealReward';
// import DailyRevealRewardBeforeCounterCompleted from './dailyRevealRewardBeforeCounterCompleted';
// import DailyRevealRewardClaimed from './dailyRevealRewardClaimed';
// import DailyRevealRewardFirstPopup from './dailyRevealRewardFirstPopup';
// import EpicScores from './epicScores';
// import FeaturedGame from './featuredGame';
import FeaturedMatch from './featuredMatch';
// import FlashSale from './flashSale';
// import NewReleaseGames from "./newReleaseGames";
// import PrizesCard from './prizesCard';
// import TriviaVote from './triviaVote';
// import WeekStats from './weekStats';

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

    render() {
        const { dailyRewardBeforeCounterPopup, getPollVoteData, handleHowToPopup, funfacts, toggleDailyRewardFirstPopup, pollVoteData, submitPollVote, submittedPollVoteData, claimReward, toggleDailyRewardClaimedPopup, dailyRewardClaimedPopup, dailyRewardFirstPopup, claimDailyRewards, userPopups, userInfo, games, disableLoader, gamesDataLoading, userBenefits, getUserBenefits, itemPurchaseData, addInventory, stats, leaderboardPrizesData, endCurrentFlashSale } = this.props;
        // const featuredGame = games && games.featuredGame;
        // const featuredGamesImg = games && games.featuredGamesImg;
        // const upcomingGame = games && games.upcomingGame;
        // const upcomingGamesImg = games && games.upcomingGamesImg;
        // const flashSale = userBenefits && userBenefits.flash_sale;
        // const cdnBasePath = userBenefits && userBenefits.cdn_url;
        // // const isFactCardOpen = userBenefits && userBenefits.user_level.level_id >= Constants.factCardLevel;
        // const isFactCardOpen = true;

        // const revealPrize = leaderboardPrizesData && leaderboardPrizesData.reveal_rewards;
        // let releaseTime = null;
        // if (revealPrize) {
        //     releaseTime = DateHelper.calculateMatchDateTimeDifferenceFromCurrent(DateHelper.getDateFromStringMoment(revealPrize.end_date));
        //     // releaseTime = DateHelper.calculateMatchDateTimeDifferenceFromCurrent(DateHelper.getDateFromStringMoment("2020-10-28 07:50:00"));
        // }
        return (
            <React.Fragment>
                <div className="mid-wrapper">
                    <div className="container">
                        <div className="block home-widget">

                            {/* <PPHeadCard title={'FREE TO PLAY'} />

                            <PrizesCard
                                prizeInfo={leaderboardPrizesData}
                                handleHowToPopup={handleHowToPopup}
                            /> */}

                            {/* Featured Game Section */}
                            {/* <FeaturedGame
                                featuredGame={featuredGame}
                                featuredGamesImg={featuredGamesImg}
                                disableLoader={disableLoader}
                                handleTracking={this.handleTracking}
                                gamesDataLoading={gamesDataLoading} /> */}

                            {/* New Release Game Section */}
                            {/* <NewReleaseGames
                                upcomingGame={upcomingGame}
                                upcomingGamesImg={upcomingGamesImg}
                                disableLoader={disableLoader}
                                handleTracking={this.handleTracking}
                                gamesDataLoading={gamesDataLoading} /> */}


                            {/* <DailyRevealReward
                                handleDailyRewardPopup={this.handleDailyRewardPopup}
                                releaseTime={releaseTime}
                                claimReward={claimReward}
                                claimDailyReveal={this.claimDailyReveal}
                                leaderboardPrizesData={leaderboardPrizesData}
                            /> */}

                            {/* {stats ? <ActiveUsers stats={stats} /> : <ContentLoader loaderType={"content-relative"} />} */}

                            {
                                <FeaturedMatch funfacts={funfacts} handleTracking={this.handleFeaturedTracking}/>
                            }


                            {/* <div className="card-info flash-sale-info animated slideInUpLess">
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
                            </div> */}

                            {/* <FriendWithBenefits handleTracking={this.handleTracking} animclass={'animated slideInUpLess'} />

                            <WeekStats
                                userInfo={userInfo}
                                stats={stats} /> */}

                            {/* <RiskFree/> */}

                            {/* <TriviaVote
                                pollVoteData={pollVoteData}
                                getPollVoteData={getPollVoteData}
                                submitPollVote={submitPollVote}
                                stats = {stats}
                                submittedPollVoteData={submittedPollVoteData}
                            />

                            <EpicScores stats={stats} handleHowToPopup={handleHowToPopup}/>

                            <Fantasy handleTracking={this.handleTracking} /> */}
                        </div>
                    </div>
                </div>

                {/* {dailyRewardFirstPopup && <DailyRevealRewardFirstPopup
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

                <StartUpPopups /> */}
            </React.Fragment>
        )
    }
}
