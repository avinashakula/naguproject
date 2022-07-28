import React, {Component} from 'react';
import {connect} from "react-redux";
import common from "../../common";
import {FooterContainer} from "../footer";
import {HeaderContainer} from "../header";
import * as actions from './actions';
import * as actionTypes from './actionTypes';
import Home from "./components";
import * as constants from './constants';
import reducer from './reducer';
import shop from '../shop';
import menu from '../menu';

class FactsSmart extends Component {

    componentDidMount() {
        this.props.callOnPageLoad();
    }

    render() {
        return (
            <React.Fragment>
                <div className="main-section login-wrap">
                    <div className="page-container">
                        {/* <HeaderContainer path={this.props.match.path} historyProps={this.props.history}/> */}
                        <Home {...this.props}/>
                        {/* <FooterContainer path={this.props.match.path}/> */}
                    </div>
                </div>
            </React.Fragment>
        )
    }
}

const mapStateToProps = state => ({
    // games: state[constants.NAME].games,
    // gamesDataLoading: state[constants.NAME].gamesDataLoading,
    // userBenefits: state[constants.NAME].userBenefits,
    // howToContent: state[constants.NAME].howToContent,
    // isUserSuspended: state[constants.NAME].isUserSuspended,
    // isUserLoggedOut: state[constants.NAME].isUserLoggedOut,
    
    // currentOrientation: state[common.constants.NAME].currentOrientation,
    // userStatsData: state[constants.NAME].userStatsData,
    // isCookieBannerSeen: state[constants.NAME].isCookieBannerSeen,
    // userPopups: state[common.constants.NAME].userPopups,
    // userInfo: state[common.constants.NAME].userInfo,

    // itemPurchaseData: state[shop.constants.NAME].itemPurchaseData,
    // stats: state[constants.NAME].stats,
    funfacts: state[constants.NAME].funfacts,
    // dailyRewardFirstPopup: state[constants.NAME].dailyRewardFirstPopup,
    // dailyRewardClaimedPopup: state[constants.NAME].dailyRewardClaimedPopup,
    // claimReward: state[constants.NAME].claimReward,

    // leaderboardPrizesData: state[menu.constants.NAME].leaderboardPrizesData,
    // pollVoteData: state[constants.NAME].pollVoteData,
    // dailyRewardBeforeCounterPopup: state[constants.NAME].dailyRewardBeforeCounterPopup,
});

const mapDispatchToProps = dispatch => {
    return {
        callOnPageLoad: () => dispatch(actions.callOnPageLoad()),
        // disableLoader: () => dispatch(actions.disableLoader()),
        userTracking: (actionVal, propObj) => dispatch(common.actions.userTracking(actionVal, propObj)),
        // getUserBenefits:  () => dispatch(actions.getUserBenefits()),
        // addInventory: (data) => dispatch(shop.actions.addInventory(data)),
        // claimDailyRewards: () => dispatch(actions.claimDailyRewards()),
        // endCurrentFlashSale: () => dispatch(actions.endCurrentFlashSale()),
        // toggleDailyRewardClaimedPopup: () => dispatch(actions.toggleDailyRewardClaimedPopup()),
        // submitPollVote: (data) => dispatch(actions.submitPollVote(data)),
        // getPollVoteData: (flag) => dispatch(actions.getPollVoteData(flag)),
        // toggleDailyRewardFirstPopup: () => dispatch(actions.toggleDailyRewardFirstPopup()),    
        // toggleDailyRewardBeforeCountDownPopup: (flag) => dispatch(actions.toggleDailyRewardBeforeCountDownPopup(flag)),    
        // handleHowToPopup: (isShow, current_page_url, indexToShow) => dispatch(common.actions.handleHowToPopup(isShow, current_page_url, indexToShow)),
    
    }
};

export const FactsContainer = connect(mapStateToProps, mapDispatchToProps)(FactsSmart);
export default {actionTypes, actions, reducer, constants};
