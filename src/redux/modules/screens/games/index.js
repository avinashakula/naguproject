import React from 'react';
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import * as actions from "./actions";
import * as actionTypes from "./actionTypes";
import Games from "./components";
import { FooterContainer } from "../footer";
import { HeaderContainer } from "../header";
import * as constants from "./constants";
import reducer from "./reducer";
import home from '../home';
import common from "../../common";
import WelcomePopup from '../../common/startupScreens/welcomePopup';
import Constants from '../../../../utils/Constants';
import $ from 'jquery';


class GamesSmart extends React.Component {

    componentDidMount() {
        this.props.callOnPageLoad();
    }

    handleSubmitWalkthourgh = () => {
        var key = Constants.sz_game_card_wt;
        if($(".gold-stats").hasClass('wt-show')) {
            key = Constants.sz_gold_wt;
        } else if($(".status").hasClass('wt-show')){
            key = Constants.sz_xp_wt;
        }
        this.props.setUserPopups(key, true);
        this.props.whichWalkthroughWillShow(null);
    }

    render() {
        return (
            <React.Fragment>
                {
                    // this.props.welcomeScreenData === false ? 
                    <div className="main-section game-wrap">
                        <div className="page-container">
                            <HeaderContainer path={this.props.match.path} historyProps={this.props.history} />
                            <Games {...this.props} />
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
    games: state[home.constants.NAME].games,
    gamesDataLoading: state[home.constants.NAME].gamesDataLoading,
    userBenefits: state[home.constants.NAME].userBenefits,
    isNickNameAvailable: state[common.constants.NAME].isNickNameAvailable,
    welcomeScreenData: state[common.constants.NAME].welcomeScreenData,
    activeWT: state[common.constants.NAME].activeWT,
    userPopups: state[common.constants.NAME].userPopups,
});

const mapDispatchToProps = dispatch => {
    return {
        disableLoader: () => dispatch(home.actions.disableLoader()),
        getGames: () => dispatch(home.actions.getGames()),
        callOnPageLoad: () => dispatch(actions.callOnPageLoad()),
        userTracking: (actionVal, propObj) => dispatch(common.actions.userTracking(actionVal, propObj)),
        toCheckWhichGameClicked: (game) => dispatch(common.actions.toCheckWhichGameClicked(game)),
        toCheckNicknameAvailable: () => dispatch(common.actions.toCheckNicknameAvailable()),
        setUserPopups: (key, value) => dispatch(common.actions.setUserPopups(key, value)),
        whichWalkthroughWillShow: (wt) => dispatch(common.actions.whichWalkthroughWillShow(wt)),
    }
};

export const GamesContainer = withRouter(connect(mapStateToProps, mapDispatchToProps)(GamesSmart));
export default { actionTypes, actions, reducer, constants };
