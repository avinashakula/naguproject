import React from 'react';
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import * as actions from "./actions";
import * as actionTypes from "./actionTypes";
import Challenges from "./components";
import { FooterContainer } from "../footer";
import { HeaderContainer } from "../header";
import * as constants from "./constants";
import reducer from "./reducer";
import common from '../../common';
import home from '../home';
import WelcomePopup from '../../common/startupScreens/welcomePopup';
import Constants from '../../../../utils/Constants';

class ChallengesSmart extends React.Component {

    componentDidMount() {
        this.props.callOnPageLoad(this.props.match.path);
    }

    handleSubmitWalkthourgh = () => {
        this.props.setUserPopups(Constants.sz_challenges_wt, true);
        this.props.whichWalkthroughWillShow(null);
    }

    render() {
        // console.log(this.props.challengesData, "challengesData");
        return (
            <React.Fragment>
                {
                    // this.props.welcomeScreenData === false ? 
                    <div className="main-section challenges-wrap">
                        <div className="page-container">
                            <HeaderContainer path={this.props.match.path} historyProps={this.props.history} />
                            <Challenges {...this.props} />
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
    challengesData: state[constants.NAME].challengesData,
    happyHourCounter: state[constants.NAME].happyHourCounter,
    currentOrientation: state[common.constants.NAME].currentOrientation,
    userBenefits: state[home.constants.NAME].userBenefits,
    welcomeScreenData: state[common.constants.NAME].welcomeScreenData,
    activeWT: state[common.constants.NAME].activeWT,

});

const mapDispatchToProps = dispatch => {
    return {
        callOnPageLoad: (page_url) => dispatch(actions.callOnPageLoad(page_url)),
        happyHourStatuschange: (page_url) => dispatch(actions.happyHourStatuschange()),
        userTracking: (actionVal, propObj) => dispatch(common.actions.userTracking(actionVal, propObj)),
        happyHourCounterData: (data, isCheckForStatus) => dispatch(actions.happyHourCounterData(data, isCheckForStatus)),
        setUserPopups: (key, value) => dispatch(common.actions.setUserPopups(key, value)),
        whichWalkthroughWillShow: (wt) => dispatch(common.actions.whichWalkthroughWillShow(wt)),
    }
};

export const ChallengesContainer = withRouter(connect(mapStateToProps, mapDispatchToProps)(ChallengesSmart));
export default { actionTypes, actions, reducer, constants };
