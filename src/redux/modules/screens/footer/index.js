import React from 'react';
import * as actionTypes from "./actionTypes";
import * as actions from "./actions";
import * as constants from "./constants";
import reducer from "./reducer";
import {connect} from "react-redux";
import Footer from "./components";
import {withRouter} from "react-router-dom";
import common from "../../common";
import Home from '../home';

class FooterSmart extends React.Component {
    render() {
        return (
            <Footer {...this.props}/>
        )
    }
}

const mapStateToProps = state => ({
    userBenefits: state[Home.constants.NAME].userBenefits,
    userPopups: state[common.constants.NAME].userPopups,
    navigation: state[common.constants.NAME].navigation,
    playTabAnim: state[common.constants.NAME].playTabAnim,
    challengesTabAnim: state[common.constants.NAME].challengesTabAnim,
    userInfo: state[common.constants.NAME].userInfo,
    userNotification: state[common.constants.NAME].userNotification,
});

const mapDispatchToProps = dispatch => {
    return {
        userTracking: (actionVal, gameType, propObj) => dispatch(common.actions.userTracking(actionVal, gameType, propObj)),
    }
};

export const FooterContainer = withRouter(connect(mapStateToProps, mapDispatchToProps)(FooterSmart));
export default {actionTypes, actions, reducer, constants};
