import React, { Component } from 'react';
import { connect } from "react-redux";
import common from "../../common";
import { FooterContainer } from "../footer";
import { HeaderContainer } from "../header";
import * as actions from './actions';
import * as actionTypes from './actionTypes';
import Home from "./components";
import * as constants from './constants';
import reducer from './reducer';
import shop from '../shop';
import menu from '../menu';
import WelcomePopup from '../../common/startupScreens/welcomePopup';
import Constants from '../../../../utils/Constants';
import HelperFunctions from '../../../../utils/HelperFunctions';
import $ from 'jquery';

class HomeSmart extends Component {

    componentDidMount() {
        this.props.callOnPageLoad();
    }

    handleSubmitWalkthourgh = () => {
        var key = Constants.sz_game_card_wt;
        if($(".game-card-wt").hasClass('wt-show')) {
            key = Constants.sz_game_card_wt;
            this.props.whichWalkthroughWillShow([Constants.sz_xp_wt]);
        } else if($(".status").hasClass('wt-show')){
            key = Constants.sz_xp_wt;
            this.props.whichWalkthroughWillShow([Constants.sz_gold_wt]);
        } else if($(".gold-stats").hasClass('wt-show')) {
            key = Constants.sz_gold_wt;
            this.props.whichWalkthroughWillShow(null);
            HelperFunctions.toggleBodyGrayedOutClass(false);
            HelperFunctions.toggleWTBodyClass(false);
        }
        this.props.setUserPopups(key, true);
        // this.props.whichWalkthroughWillShow(null);
    }

    render() {
        
        return (
            <React.Fragment>
                <div className="main-section login-wrap">
                    <div className="page-container">
                        <HeaderContainer path={this.props.match.path} historyProps={this.props.history} />
                        <Home {...this.props} />
                        <FooterContainer path={this.props.match.path} />
                    </div>
                </div>
                <div className="walkthrought-overlay" onClick={this.handleSubmitWalkthourgh}></div>
            </React.Fragment>
        )
    }
}

const mapStateToProps = state => ({
    games: state[constants.NAME].games,
    gamesDataLoading: state[constants.NAME].gamesDataLoading,
    userBenefits: state[constants.NAME].userBenefits,
    howToContent: state[constants.NAME].howToContent,
    isUserSuspended: state[constants.NAME].isUserSuspended,
    isUserLoggedOut: state[constants.NAME].isUserLoggedOut,

    currentOrientation: state[common.constants.NAME].currentOrientation,
    userStatsData: state[constants.NAME].userStatsData,
    isCookieBannerSeen: state[constants.NAME].isCookieBannerSeen,
    userPopups: state[common.constants.NAME].userPopups,
    userInfo: state[common.constants.NAME].userInfo,

    itemPurchaseData: state[shop.constants.NAME].itemPurchaseData,
    stats: state[constants.NAME].stats,
    funfacts: state[constants.NAME].funfacts,
    dailyRewardFirstPopup: state[constants.NAME].dailyRewardFirstPopup,
    dailyRewardClaimedPopup: state[constants.NAME].dailyRewardClaimedPopup,
    claimReward: state[constants.NAME].claimReward,

    leaderboardPrizesData: state[menu.constants.NAME].leaderboardPrizesData,
    pollVoteData: state[constants.NAME].pollVoteData,
    dailyRewardBeforeCounterPopup: state[constants.NAME].dailyRewardBeforeCounterPopup,
    isNickNameAvailable: state[common.constants.NAME].isNickNameAvailable,
    welcomeScreenData: state[common.constants.NAME].welcomeScreenData,
    activeWT: state[common.constants.NAME].activeWT,
    claimWC: state[common.constants.NAME].claimWC,
});

const mapDispatchToProps = dispatch => {
    return {
        callOnPageLoad: () => dispatch(actions.callOnPageLoad()),
        disableLoader: () => dispatch(actions.disableLoader()),
        userTracking: (actionVal, propObj) => dispatch(common.actions.userTracking(actionVal, propObj)),
        toCheckWhichGameClicked: (game) => dispatch(common.actions.toCheckWhichGameClicked(game)),
        getUserBenefits: () => dispatch(actions.getUserBenefits()),
        addInventory: (data) => dispatch(shop.actions.addInventory(data)),
        claimDailyRewards: () => dispatch(actions.claimDailyRewards()),
        endCurrentFlashSale: () => dispatch(actions.endCurrentFlashSale()),
        toggleDailyRewardClaimedPopup: () => dispatch(actions.toggleDailyRewardClaimedPopup()),
        submitPollVote: (data) => dispatch(actions.submitPollVote(data)),
        getPollVoteData: (flag) => dispatch(actions.getPollVoteData(flag)),
        toggleDailyRewardFirstPopup: () => dispatch(actions.toggleDailyRewardFirstPopup()),
        toggleDailyRewardBeforeCountDownPopup: (flag) => dispatch(actions.toggleDailyRewardBeforeCountDownPopup(flag)),
        handleHowToPopup: (isShow, current_page_url, indexToShow) => dispatch(common.actions.handleHowToPopup(isShow, current_page_url, indexToShow)),
        toCheckNicknameAvailable: () => dispatch(common.actions.toCheckNicknameAvailable()),
        setUserPopups: (key, value) => dispatch(common.actions.setUserPopups(key, value)),
        whichWalkthroughWillShow: (wt) => dispatch(common.actions.whichWalkthroughWillShow(wt)),

    }
};

export const SkillZoneContainer = connect(mapStateToProps, mapDispatchToProps)(HomeSmart);
export default { actionTypes, actions, reducer, constants };
