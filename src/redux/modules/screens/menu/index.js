import React from 'react';
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import * as actions from "./actions";
import * as actionTypes from "./actionTypes";
import Menu from "./components";
import { FooterContainer } from "../footer";
import { HeaderContainer } from "../header";
import * as constants from "./constants";
import reducer from "./reducer";
import common from '../../common';
import { getLeaderboardPrizes } from "./actions";
import WelcomePopup from '../../common/startupScreens/welcomePopup';

class MenuSmart extends React.Component {

    componentDidMount() {
        this.props.callOnPageLoad();
    }

    handleSubmitWalkthourgh = () => {
        this.props.setUserPopups(this.props.activeWT, true);
        this.props.whichWalkthroughWillShow(null);
    }

    render() {
        //console.log(this.props.leaderboardPrizesData)
        return (
            <React.Fragment>
                {
                    // this.props.welcomeScreenData === false ?
                        <div className="main-section menu-wrap">
                            <div className="page-container">
                                <HeaderContainer path={this.props.match.path} historyProps={this.props.history} />
                                <Menu {...this.props} />
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

const mapStateToProps = state => {
    return {
        faqData: state[constants.NAME].faq,
        currentOrientation: state[common.constants.NAME].currentOrientation,
        pageContent: state[constants.NAME].pageContent,
        myHistory: state[constants.NAME].myHistory,
        nav: state[constants.NAME].nav,
        isShowIframe: state[constants.NAME].isShowIframe,
        isUserSuspended: state[constants.NAME].isUserSuspended,
        isNavOpen: state[constants.NAME].isNavOpen,
        userInfo: state[common.constants.NAME].userInfo,
        leaderboardPrizesData: state[constants.NAME].leaderboardPrizesData,
        welcomeScreenData: state[common.constants.NAME].welcomeScreenData,
activeWT: state[common.constants.NAME].activeWT,
    }
};

const mapDispatchToProps = dispatch => {
    return {
        selectItemInNav: (selectedIndexInNav, menuItem) => dispatch(actions.selectItemInNav(selectedIndexInNav, menuItem)),
        toggleNav: () => dispatch(actions.toggleNav()),
        gameData: (game_id, gameType) => dispatch(actions.gameDataApi(game_id, gameType)),
        groupsApi: (gameType) => dispatch(actions.groupsApi(gameType)),
        userTracking: (actionVal, propObj) => dispatch(common.actions.userTracking(actionVal, propObj)),
        callOnPageLoad: () => dispatch(actions.callOnPageLoad()),
        toggleIframe: () => dispatch(actions.toggleIframe()),
        getLeaderboardPrizes: () => dispatch(getLeaderboardPrizes()),
        pageContentAPI: (page_url = null) => dispatch(actions.pageContentAPI(page_url)),
        setUserPopups: (key, value) => dispatch(common.actions.setUserPopups(key, value)),
        whichWalkthroughWillShow: (wt) => dispatch(common.actions.whichWalkthroughWillShow(wt)),
    }
};

export const MenuContainer = withRouter(connect(mapStateToProps, mapDispatchToProps)(MenuSmart));
export default { actionTypes, actions, reducer, constants };
