import React from 'react';
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import common from "../../common";
import { FooterContainer } from "../footer";
import { HeaderContainer } from "../header";
import home from '../home';
import menu from '../menu';
import * as actions from "./actions";
import * as actionTypes from "./actionTypes";
import Leaderboard from "./components";
import * as constants from "./constants";
import reducer from "./reducer";
import WelcomePopup from '../../common/startupScreens/welcomePopup';
import Constants from '../../../../utils/Constants';


class LeaderboardSmart extends React.Component {

    componentDidMount() {
        this.props.callOnPageLoad(this.props.match.path);
        // this.props.toCheckNicknameAvailable();
    }

    handleSubmitWalkthourgh = () => {
        this.props.setUserPopups(Constants.sz_leaderboard_wt, true);
        this.props.whichWalkthroughWillShow(null);
    }

    // componentWillReceiveProps(nextProps, nextState) {
    //     if (this.props.userBenefits !== nextProps.userBenefits) {
    //         this.props.toCheckNicknameAvailable();
    //         this.props.toCheckWhichGameClicked("lb")
    //     }
    // }

    render() {
        return (
            <React.Fragment>
                {
                    // this.props.welcomeScreenData === false ? 
                    <div className="main-section leaderboard-wrap">
                        <div className="page-container">
                            <HeaderContainer path={this.props.match.path} historyProps={this.props.history} />
                            <Leaderboard {...this.props} />
                            <FooterContainer path={this.props.match.path} />
                        </div>
                    </div>
                    // : <WelcomePopup />
                }

                <div className="walkthrought-overlay" onClick={this.handleSubmitWalkthourgh}></div>
            </React.Fragment>
        )
    }
}

const mapStateToProps = state => ({
    leaderboardData: state[constants.NAME].leaderboardData,
    leaderboardWeeks: state[constants.NAME].leaderboardWeeks,
    userPopupInfo: state[constants.NAME].userPopupInfo,
    currentOrientation: state[common.constants.NAME].currentOrientation,
    userInfo: state[common.constants.NAME].userInfo,
    doubleRewardsPopup: state[common.constants.NAME].doubleRewardsPopup,
    leaderboardPrize: state[constants.NAME].leaderboardPrize,
    faqData: state[menu.constants.NAME].faq,
    isNickNameAvailable: state[common.constants.NAME].isNickNameAvailable,
    userBenefits: state[home.constants.NAME].userBenefits,
    welcomeScreenData: state[common.constants.NAME].welcomeScreenData,
    activeWT: state[common.constants.NAME].activeWT,
});

const mapDispatchToProps = dispatch => {
    return {
        callOnPageLoad: (page_url) => dispatch(actions.callOnPageLoad(page_url)),
        getWeekStats: (index, week, season, userId) => dispatch(actions.getWeekStats(index, week, season, userId)),
        loadMore: (week) => dispatch(actions.loadMore(week)),
        weekChange: (week, season) => dispatch(actions.weekChange(week, season)),
        getUserPopupInfo: (accountId) => dispatch(actions.getUserPopupInfo(accountId)),
        closeUserInfoPopup: () => dispatch(actions.closeUserInfoPopup()),
        togglePrizePopups: (currencyType) => dispatch(actions.togglePrizePopups(currencyType)),
        handleHowToPopup: (isShow, current_page_url, indexToShow) => dispatch(common.actions.handleHowToPopup(isShow, current_page_url, indexToShow)),
        toggleDoubleRewardsPopup: (flag) => dispatch(common.actions.toggleDoubleRewardsPopup(flag)),
        userTracking: (actionVal, propObj) => dispatch(common.actions.userTracking(actionVal, propObj)),
        toCheckNicknameAvailable: () => dispatch(common.actions.toCheckNicknameAvailable()),
        toCheckWhichGameClicked: (game) => dispatch(common.actions.toCheckWhichGameClicked(game)),
        setUserPopups: (key, value) => dispatch(common.actions.setUserPopups(key, value)),
        whichWalkthroughWillShow: (wt) => dispatch(common.actions.whichWalkthroughWillShow(wt)),
    }
};

export const LeaderboardContainer = withRouter(connect(mapStateToProps, mapDispatchToProps)(LeaderboardSmart));
export default { actionTypes, actions, reducer, constants };
