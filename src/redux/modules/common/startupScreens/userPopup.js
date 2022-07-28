import PropTypes from "prop-types";
import React, { Component } from 'react';
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import ProjectRoutes from "../../../../config/routes/projectRoutes";
import HelperFunctions from "../../../../utils/HelperFunctions";
import home from '../../screens/home';
import menu from "../../screens/menu";
import * as actions from "../actions";
import * as constants from "../constants";

class UserPopup extends Component {

    constructor(props) {
        super(props);
        this.state = {
            displayName: props.userBenefits && props.userBenefits.display_name !== undefined ? props.userBenefits.display_name : null,
            errorMsg: null
        }
    }

    handleSubmit = (e) => {
        if (this.state.displayName !== null && this.state.displayName != "" && HelperFunctions.validateSpecialChar(this.state.displayName)) {
            this.props.submitUserDisplayName(this.state.displayName, this.props.history, this.props.clickedFromPlay, this.props.whichTab)
        }
    };

    submitOnEnterKey = (e) => {
        if (e.keyCode === 13 && !this.props.displayNameData.isSubmitting && !this.props.displayNameData.isAdded) {
            this.handleSubmit();
        }
    };

    handleChange = (e) => {

        this.props.emptySubmitNameData();
        this.setState({
            displayName: e.target.value,
            errorMsg: !HelperFunctions.validateSpecialChar(e.target.value) ? "Please choose a nickname that only has letters and numbers - no spaces either" : e.target.value.length > 15 ? "Please choose a nickname that is 15 characters or less" : null
        })
    };

    componentDidUpdate(prevProps) {
        if (this.props.userBenefits !== prevProps.userBenefits) {
            HelperFunctions.toCheckPopupVisible();
            if (this.props.userBenefits) {
                if (this.props.userBenefits.display_name === undefined) {
                    //$("body").addClass("show-modal");
                } else {
                    this.setState({
                        displayName: this.props.userBenefits.display_name
                    })
                }
            }

        }
    }

    handleClose = (evt) => {
        if (this.props.location.pathname === ProjectRoutes.leaderboard.url) {
            this.props.emptyStoreData();
            this.props.getLeaderboardData();
        }
        this.props.getUserBenefits();

        if (this.props.clickedFromPlay) {
            this.props.history.push({
                pathname: ProjectRoutes.play.hts.url,
                search: HelperFunctions.getQueryStringFromURL(),
                state: { button_click: this.props.whichTab }
            });
        }
    };

    render() {
        const { displayName, errorMsg } = this.state;
        const { displayNameData, userBenefits, leaderboardPrizesData } = this.props;
        // console.log(displayNameData, "userBenefits")
        return (userBenefits && (userBenefits.display_name === undefined || userBenefits.is_username_censor)) && (
            <div className="modal nickname-modal skillzone-popup-visible" style={{ display: 'block' }}>
                <div className="modal-contenier animated fadeInUpLess">
                    <div className="modal-outer">
                        <div className="modal-body">
                            <div className="popup-info user-form-info">
                                <div className="modal-head">
                                    <h2 className="modal-head-title">PLEASE ENTER A NICKNAME</h2>
                                </div>
                                <div className="user-form">
                                    {/* <div className="alert-card success-alert">
                                        <div className="alert-card-outer">
                                            <div className="alert-icons"><i className="icon pp-check2"></i></div>
                                            <div className="alert-content">
                                                <p>Looks Like your email or password is incorrect. To reset, click the Forgot your password’ link below.</p>
                                            </div>
                                        </div>
                                    </div> */}
                                    {/*  <div className="alert-card error-alert">
                                        <div className="alert-card-outer">
                                            <div className="alert-icons"><i className="icon pp-cancel-circle"></i></div>
                                            <div className="alert-content">
                                                <p>Looks Like your email or password is incorrect. To reset, click the Forgot your password’ link below.</p>
                                            </div>
                                        </div>
                                    </div> */}
                                    {leaderboardPrizesData && leaderboardPrizesData.score_prizes && leaderboardPrizesData.user_info && leaderboardPrizesData.score_prizes.ws_total_prize &&
                                        <h2 className={"form-heading"}>Weekly Leaderboards <br /> Share
                                        In {HelperFunctions.getCurrency(leaderboardPrizesData.user_info.currency) + HelperFunctions.formatNumber(leaderboardPrizesData.score_prizes.ws_total_prize)} In
                                        Cash</h2>}
                                    <p className="form-title">Your nickname will be shown publicly on the leaderboard. All leaderboards updated daily at 6am.</p>

                                    <div className="form">
                                        <div className="form-group">
                                            <input
                                                type="text"
                                                autoComplete="off"
                                                placeholder="Please enter a nickname here..."
                                                name={"display_name"}
                                                value={displayName ? displayName : ""}
                                                onChange={this.handleChange}
                                                onKeyDown={this.submitOnEnterKey}
                                                className="form-control" />
                                        </div>

                                        {
                                            displayNameData.errorMsg && !errorMsg &&
                                            <p
                                                className={`${displayNameData.isAdded ? "valid-feedback" : "invalid-feedback"} error`}
                                                id="email_error">{displayNameData.errorMsg}</p>
                                        }

                                        {
                                            errorMsg && <p className="invalid-feedback"
                                                id="email_error">{errorMsg}</p>
                                        }
                                    </div>
                                    <div className="button-bar">
                                        <div className="button-bar-outer">
                                            <div className="col">
                                                <a onClick={this.handleSubmit}
                                                    className={`btn primary-btn ${displayName === null || displayName == "" || errorMsg || displayNameData.isAdded || displayNameData.isSubmitting ? "disabled" : ""} `}>
                                                    {displayNameData.isSubmitting ? "SUBMITTING..." : displayNameData.isAdded ? "SUBMITTED SUCCESSFULLY" : "SUBMIT"}
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

UserPopup.propTypes = {
    clickedFromPlay: PropTypes.bool,
    whichTab: PropTypes.string,
};

UserPopup.defaultProps = {
    clickedFromPlay: false,
    whichTab: null,
}

const mapStateToProps = state => {
    return {
        userBenefits: state[home.constants.NAME].userBenefits,
        displayNameData: state[constants.NAME].displayNameData,
        leaderboardPrizesData: state[menu.constants.NAME].leaderboardPrizesData,
    }
};

const mapDispatchToProps = dispatch => {
    return {
        submitUserDisplayName: (name, router, clickedFromPlay, tabClicked) => dispatch(actions.submitUserDisplayName(name, router, clickedFromPlay, tabClicked)),
        emptySubmitNameData: () => dispatch(actions.emptySubmitNameData()),
        getUserBenefits: () => dispatch(home.actions.getUserBenefits()),
    }
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(UserPopup));