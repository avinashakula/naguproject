import React from 'react';
import * as actionTypes from "./actionTypes";
import * as actions from "./actions";
import * as constants from "./constants";
import reducer from "./reducer";
import { connect } from "react-redux";
import Header from "./components";
import { withRouter } from "react-router-dom";
import common from "../../common";
import Home from '../home';

class HeaderSmart extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isRouteChanged: false
        }

        this.isRouteChanged = false;

        this.coinRef = null;
        this.rotationValue = 1440;
    }

    componentDidMount() {
        this.props.callOnPageLoad();
    }

    componentWillMount() {
        var self = this;
        this.unlisten = this.props.history.listen((location, action) => {
            this.props.toCheckIfRouteChanged();
        });
    }

    componentWillUnmount() {
        this.unlisten();
    }

    render() {
        return (
            <Header {...this.props} />
        )
    }
}

const mapStateToProps = state => ({
    userBenefits: state[Home.constants.NAME].userBenefits,
    userPopups: state[common.constants.NAME].userPopups,
    navigation: state[common.constants.NAME].navigation,
    userNotification: state[common.constants.NAME].userNotification,
    playTabAnim: state[common.constants.NAME].playTabAnim,
    challengesTabAnim: state[common.constants.NAME].challengesTabAnim,
    isRouteChanged: state[common.constants.NAME].isRouteChanged,
    activeWT: state[common.constants.NAME].activeWT,
});

const mapDispatchToProps = dispatch => {
    return {
        handleHowToPopup: (isShow, current_page_url) => dispatch(common.actions.handleHowToPopup(isShow, current_page_url)),
        userTracking: (actionVal, propObj) => dispatch(common.actions.userTracking(actionVal, propObj)),
        getUserBenefits: () => dispatch(Home.actions.getUserBenefits()),
        callOnPageLoad: () => dispatch(actions.callOnPageLoad()),
        getUserNotifications: () => dispatch(common.actions.getUserNotifications()),
        toCheckIfRouteChanged: () => dispatch(common.actions.toCheckIfRouteChanged()),
    }
};

export const HeaderContainer = withRouter(connect(mapStateToProps, mapDispatchToProps)(HeaderSmart));
export default { actionTypes, actions, reducer, constants };
