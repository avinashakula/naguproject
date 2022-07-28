import React, { Component } from 'react';
import { connect } from "react-redux";
import * as constants from "../constants";
import * as actions from "../actions";
import Apiendpoints from "../../../../config/APIEndpoints";
import home from '../../screens/home';
import $ from 'jquery';
import Constants from '../../../../utils/Constants';

class SuspendedUser extends React.Component {

    componentDidUpdate(prevProps) {
        if (this.props.isUserSuspended !== prevProps.isUserSuspended) {
            if (this.props.isUserSuspended) {
                //$("body").addClass("show-modal");
            } else {
                //$("body").removeClass("show-modal");
            }
        }
    }

    gotoPP = () => {
        // window.location.href = Constants.PP_URL;
    }

    render() {
        const { isUserSuspended } = this.props;
        // console.log(isUserSuspended, "isUserSuspended");
        return isUserSuspended ? (
            <div className="modal suspended-modal" style={{ display: 'block' }}>
                <div className="modal-contenier">
                    <div className="modal-outer">
                        <div className="modal-body">
                            <div className="popup-info">
                                {
                                    isUserSuspended === "blocked" ? <React.Fragment>
                                        <p className="suspended-pre">You are no longer eligible to play Game Center on business grounds. We apologise for any inconvenience caused.</p>
                                        <div className="button-bar">
                                            <div className="button-bar-outer">
                                                <div className="col">
                                                    <a onClick={this.gotoPP} className="btn primary-btn">Back To Game Center</a>
                                                </div>
                                            </div>
                                        </div>
                                    </React.Fragment> : <p className="suspended-pre">Your account has been suspended.<br /> Please contact <a className="highlight" href={Apiendpoints.accountSummary.url}>Customer Service</a> for more information.</p>
                                }

                                {
                                    window.isNativeApp && <div className="button-bar">
                                        <div className="button-bar-outer">
                                            <div className="col">
                                                <a className="btn primary-btn">Exit</a>
                                            </div>
                                        </div>
                                    </div>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        ) : null
    }
}

const mapStateToProps = state => {
    return {
        isUserSuspended: state[home.constants.NAME].isUserSuspended,
    }
};

const mapDispatchToProps = dispatch => {
    return {
        // toggleLoyaltyPopup: (flag, data) => dispatch(actions.toggleLoyaltyPopup(flag, data)),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(SuspendedUser);



