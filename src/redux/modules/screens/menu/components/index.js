import React from 'react';
import images from "../../../../../assets/images";
import PPHeadCard from "../../../../../commons/components/ppHeadCard";
import ResponsibleGambling from './responsibleGambling';
import { joinLoginButton } from "../../../../../utils/Gtm";
import TermsCondition from './termsCondition';
import APIEndpoints from "../../../../../config/APIEndpoints";
import MyAccount from "../../home/components/myAccount";
import HelperFunctions from "../../../../../utils/HelperFunctions";
import FAQ from './faq';
import Prizes from './prizes';
import MyHistory from './myHistory';
import ContentLoader from '../../../../../commons/components/contentLoader';
import ReferAFriend from './referAFriend';
import StartUpPopups from '../../../common/startupScreens';
import $ from "jquery";

export default class Menu extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            activeTab: "faq"
        }
    }

    setJoinTag = (url) => {
        joinLoginButton(url)
    };

    handleTracking = (obj) => {
        // console.log(page, obj, "handletrcking");
        if (typeof obj === "string") {
            obj = "menu_" + obj;
            this.props.userTracking(obj);
        } else {
            this.props.userTracking("menu_my-history", obj);
        }
    }

    // to check that mobile device active or desktop to show hide faq bydefault
    componentDidUpdate(prevProps) {
        if (this.props.currentOrientation.width !== prevProps.currentOrientation.width) {
            if (this.props.currentOrientation.width >= 1025) {
                this.handleTabs("faq");
            } else {
                this.handleTabs(null);
                $("body").removeClass("show-modal");
            }
        }
    }

    componentDidMount() {
        // console.log(this.props.currentOrientation.width);
        if (this.props.currentOrientation.width >= 1025) {
            this.handleTabs("faq");
        } else {
            this.handleTabs(null);
        }
        if (this.props.isShowIframe) {
            this.props.toggleIframe()
        }
    }

    handleTabs = (tab) => {
        // console.log(tab, this.props.currentOrientation.width);

        if (tab) {
            if (this.props.currentOrientation.width < 1025) {
                if (!$("body").hasClass("show-modal")) {
                    $("body").addClass("show-modal")
                }
            }
            this.handleTracking(tab);
        }


        this.setState({
            activeTab: tab
        })
    }

    handleClose = () => {
        $("body").removeClass("show-modal")
        this.setState({
            activeTab: null
        })
    }

    handleMultiEvents = (type) => {
        this.handleTracking(type);
        let self = this;
        setTimeout(function () {
            self.props.toggleIframe();
        }, 150)

    }

    render() {
        const { activeTab } = this.state;
        const { faqData, pageContent, nav, userInfo, isUserSuspended, toggleIframe, leaderboardPrizesData, isShowIframe, myHistory, gameData, groupsApi } = this.props;

        return (
            <React.Fragment>
                <div className="mid-wrapper">
                    <PPHeadCard title={"Menu"}/>
                    <div className="container">
                        <div className="block menu-widget">

                            {
                                userInfo && nav && nav.data.length > 0 ? <React.Fragment>
                                    {/* {
                                        !isUserSuspended && <div className="user-account animated fadeIn">
                                            {userInfo ?
                                                <a className="card-info balance-info" onClick={this.handleMultiEvents.bind(this, "balance")}>
                                                    <div className="wcard"><div className="calance-card">Balance:
                                                    <small>{userInfo ? HelperFunctions.getCurrency(userInfo ? userInfo.currency : '') + HelperFunctions.toFixedToOnePlace(userInfo.balance) : ''}</small>
                                                    </div></div>
                                                </a>
                                                :
                                                <React.Fragment>
                                                    <a className="card-info balance-info" onClick={this.handleMultiEvents.bind(this, "join/login-button")}>
                                                        <div className="wcard">
                                                            <a className="calance-card">
                                                                <small>Join/Login</small>
                                                            </a>
                                                            <a href={APIEndpoints.registerIdentitySSO.url}
                                                                                                           onClick={this.setJoinTag.bind(this, APIEndpoints.registerIdentitySSO.url)}>Join</a>
                                                                                                        <span>/</span>
                                                                                                        <a href={APIEndpoints.identitySSO.url}
                                                                                                           onClick={this.setJoinTag.bind(this, APIEndpoints.identitySSO.url)}>Login</a>
                                                        </div>
                                                    </a>
                                                </React.Fragment>
                                            }
                                        </div>
                                    } */}

                                    {/* {isShowIframe && <MyAccount onClose={toggleIframe} />} */}

                                    {
                                        <div className="block content-tabs">
                                            <div className="card-info animated slideInUpLess">
                                                <div className="menu-card">
                                                    <div className="menu-card-outer">
                                                        <ul className="menus tabs-nav">
                                                            {
                                                                nav.data.map((item, index) => {
                                                                    // console.log('item >>>> ' , item);
                                                                    if (item.page_url === "store") {

                                                                    } else {
                                                                        return (
                                                                            <li key={index} onClick={this.handleTabs.bind(this, item.page_url)}>
                                                                                <a className={`${activeTab === item.page_url && 'active'}`}>
                                                                                    <span className="nav-label faq-modal-btn">{item.page_name}</span>
                                                                                </a>
                                                                            </li>
                                                                        )
                                                                    }
                                                                })
                                                            }
                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="modal-widget">
                                                {activeTab === "faq" &&
                                                    <div className="modal-widget-wrap faq-modal-wrap" style={{ display: 'block' }}>
                                                        {/* FAQ MODAL START */}
                                                        <div className="modal faq-modal slide-modal">
                                                            <FAQ closePopup={this.handleClose} faqData={faqData} userInfo={userInfo} />
                                                        </div>
                                                    </div>
                                                }
                                                {activeTab === "prizes" && <Prizes closePopup={this.handleClose} leaderboardPrizesData={leaderboardPrizesData} />}
                                                {activeTab === "my-history" && <MyHistory closePopup={this.handleClose} myHistory={myHistory} handleTracking={this.handleTracking} gameData={gameData} groupsApi={groupsApi} />}
                                                {activeTab === "responsible-gambling" && <ResponsibleGambling closePopup={this.handleClose} />}
                                                {activeTab === "refer-a-friend" && <ReferAFriend handleTracking={this.handleTracking} closePopup={this.handleClose} />}
                                                {activeTab === "terms-and-conditions" && <TermsCondition closePopup={this.handleClose} pageContent={pageContent} userInfo={userInfo} />}
                                            </div>

                                        </div>
                                    }

                                    <StartUpPopups />

                                </React.Fragment> : <ContentLoader loaderType={"content-relative"} />
                            }







                        </div>
                    </div>
                </div>
            </React.Fragment>

        )
    }
}
