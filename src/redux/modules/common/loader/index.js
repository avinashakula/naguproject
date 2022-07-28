// import GModal from '@commons/components/gModal';
import React from 'react';
import { connect } from "react-redux";
import ContentLoader from "../../../../commons/components/contentLoader";
import HelperFunctions from "../../../../utils/HelperFunctions";
import * as actions from "../actions";
import * as constants from "../constants";
import $ from "jquery";

class Loader extends React.Component {

    componentWillReceiveProps(nextProps) {
        if (nextProps.error !== this.props.error) {
            if (nextProps.error.isError) {
                switch (nextProps.error.error.code) {
                    case 401:
                        // console.log('in here');
                        // this.props.storeUserInfo({isUserSuspended : true});
                        break;
                    case 403:
                        this.props.storeUserInfo();
                        break;
                    default:
                    // alert('in Error Loader', nextProps.error.error.message)
                }
            }
        }
    }

    componentDidUpdate(prevProps) {
        // Typical usage (don't forget to compare props):

    }

    render() {
        // console.log(this.props.currentOrientation, "currentOrientation");
        const loader = this.props.isRequesting ? (
            <ContentLoader />
        ) : null;
        return loader;
    }
}

const mapStateToProps = state => {
    const commonState = state[constants.NAME];
    return {
        isRequesting: commonState.isRequesting,
        isRequestingForWhom: commonState.isRequestingForWhom,
        error: commonState.error,
        currentOrientation: commonState.currentOrientation,
        totalRequestCount: commonState.totalRequestCount,
    }
}
    ;

const mapDispatchToProps = dispatch => {
    return {
        storeUserInfo: (info) => dispatch(actions.storeUserInfo(info))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Loader);