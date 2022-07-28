/*
* This is Navigation Container
* Presentational component for this container is RootNavigator (/component/Navigator/RootNavigator)
* Container is connected with store with the help of connect() function
* in connect() function mapStateToProps and container is passed
* */

import React, { Component } from 'react';
import { connect } from "react-redux";
import Cookies from "universal-cookie";
import userTokens from "../../../../assets/jsonData/userToken";
import HelperFunctions from "../../../../utils/HelperFunctions";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import common, { Loader } from "../../common";
import Logout from '../../common/logout/logout';
import home from '../../screens/home';
import * as actions from './actions';
import * as actionTypes from './actionTypes';
import RootNavigator from "./components";
import * as constants from './constants';
import reducer from "./reducer";
import ContentLoader from '../../../../commons/components/contentLoader';

class RootNavigatorSmart extends Component {
    constructor(props) {
        super(props);

        // remove this code for production envirmnment
        if (process.env.NODE_ENV === 'development') {
            const token = userTokens[HelperFunctions.getQueryStringValue("user_token")];
            if (token) {
                const cookies = new Cookies();
                let expires = new Date();
                expires.setDate(expires.getDate() + 365);
                cookies.set('productToken', token, { path: '/', expires });

                const cookies1 = new Cookies();
                let expires1 = new Date();
                expires1.setDate(expires1.getDate() + 365);
                cookies1.set('ssoid', token, { path: '/', expires1 });

            }
        }

    }

    componentDidMount() {
        window.addEventListener("resize", this.resize);

        // get the common APIs only for once from common actions
        // this.props.callOnPageLoad();
    }

    componentWillUnmount() {
        window.removeEventListener("resize", this.resize);
    }

    resize = () => {
        let self = this;
        if (self.timeout) {
            clearTimeout(self.timeout);
        }
        this.timeout = setTimeout(() => {
            self.props.setCurrentOrientation();
            clearTimeout(self.timeout);
        }, 100);
    };


    render() {
        // console.log(this.props.globalLoader, this.props.isUserLoggedOut, "this.props.globalLoader")
        return this.props.globalLoader ? <ContentLoader /> : (
            this.props.isUserLoggedOut ? (
                <Router basename={process.env.RELATIVE_PATH}>
                    <Logout />
                </Router>

            ) : (
                <RootNavigator {...this.props} />
            )
        )
    }
}

const mapStateToProps = state => ({
    isUserLoggedOut: state[home.constants.NAME].isUserLoggedOut,
    globalLoader: state[common.constants.NAME].globalLoader,
});

const mapDispatchToProps = dispatch => {
    return {
        setCurrentOrientation: (currentOrientation) => dispatch(common.actions.setCurrentOrientation(currentOrientation)),
        callOnPageLoad: () => dispatch(common.actions.callOnPageLoad()),
    }
};

export const RootNavigatorContainer = connect(mapStateToProps, mapDispatchToProps)(RootNavigatorSmart);
export default { actionTypes, actions, reducer, constants };