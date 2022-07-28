import React from 'react';
import { Link } from "react-router-dom";
// import {Bounce, TweenMax} from "gsap";
import images from "../../../../../assets/images";
import WalkThrough from '../../../../../commons/components/walkthrough';
import ProjectRoutes from "../../../../../config/routes/projectRoutes";
import Constants from '../../../../../utils/Constants';
import HelperFunctions from '../../../../../utils/HelperFunctions';
import CurrencyUp from "./currencyUp";
import XpStatus from './xpStatus';

export default class Header extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            popupFlag: false,
            startNumber: this.props.userBenefits && this.props.userBenefits.gold_amount
        }

        this.coinRef = null;
        this.rotationValue = 1440;
    }

    handleFaqClick = () => {
        this.trackUser("faq");
        this.props.handleHowToPopup(true, this.props.match.path);
    }

    // componentDidUpdate(prevProps) {
    //     if (this.props.userBenefits && this.props.userBenefits.gold_amount !== prevProps.userBenefits.gold) {
    //         this.numberIncreament(prevProps.gold, this.props.gold);
    //     }
    // }

    numberIncreament(from, to) {
        var value = { val: from };
        // TweenMax.to(value, 2, {
        //     val: to, roundProps: "val", onUpdate: () => {
        //         this.setState({
        //             startNumber: value.val
        //         });
        //     }
        // });
        // TweenMax.to(this.coinRef, 2, {
        //     rotationY: this.rotationValue, onComplete: () => {
        //         this.rotationValue = this.rotationValue === 1440 ? 0 : 1440;
        //     }
        // });
    }

    handlePopup = () => {
        this.setState((prevState, props) => ({
            popupFlag: !prevState.popupFlag
        }));

        HelperFunctions.toCheckPopupVisible();
    }

    handleTrack = () => {
        this.trackUser("user-popup");
        this.handlePopup();
    }

    trackUser = (type) => {
        this.props.userTracking("header_" + type);
    }

    gotoPP = () => {
        // window.location.href = Constants.PP_URL;
    }





    render() {
        const { navigation, userPopups, activeWT, isRouteChanged, path, userBenefits, userNotification, playTabAnim, challengesTabAnim } = this.props;
        const { popupFlag, startNumber } = this.state;
        let isItemsLocked = HelperFunctions.lockedTab(userBenefits, "store");

        // console.log(this.props.path, ProjectRoutes.home.url, "this.props");
        var flagWT = false;
        if (this.props.path === ProjectRoutes.home.url && activeWT && !activeWT.includes(Constants.sz_game_card_wt)) {
            flagWT = true;
        }
        isItemsLocked = false;
        // if (userPopups && userPopups.two_day_retention_gift) {
        //     isItemsLocked = userPopups.two_day_retention_gift === "complete" ? false : true;
        // }
        return (
            <React.Fragment>
                <header className="top-header animated slideInDownLess">
                    <div className="top-bar">
                        <div className="container">
                            <div className="top-bar-wrap">
                                {/* <div className="back-left">
                                    <a onClick={this.gotoPP} className="icon pp-arrow-left back-arrow"></a>
                                </div> */}
                                <div className="top-nav-bar">
                                    {/* <a onClick={this.gotoPP} className="brand-logo">
                                        <figure className="brand-figure"><img src={images.mainLogo} alt="" /></figure>
                                    </a> */}
                                    <div className="top-nav">
                                        <ul className="nav-ul">
                                            {
                                                navigation.map((navItem, index) => {

                                                    return (
                                                        <li key={'' + index}
                                                            className={`${path === navItem.page_url ? "active" : ""} ${navItem.page === "Store" && isItemsLocked && "locked"}`}>
                                                            <Link to={navItem.page_path_obj}>

                                                                {
                                                                    (navItem.page === "Play" && playTabAnim) && <div className="pulse-animate">
                                                                        <div className="pulse"></div>
                                                                        <div className="pulse2"></div>
                                                                        <div className="pulse3"></div>
                                                                    </div>
                                                                }

                                                                {
                                                                    (navItem.page === "Challenges" && challengesTabAnim) && <div className="pulse-animate">
                                                                        <div className="pulse"></div>
                                                                        <div className="pulse2"></div>
                                                                        <div className="pulse3"></div>
                                                                    </div>
                                                                }

                                                                {
                                                                    navItem.page === "Store" && isItemsLocked && <i className="icon pp-lock"></i>
                                                                }

                                                                {
                                                                    navItem.page === "Store" && userNotification && userNotification.store && userNotification.store.store_count && <label className="noti-label">{userNotification.store.store_count}</label>
                                                                }

                                                                {navItem.page}
                                                            </Link>
                                                            {
                                                                navItem.page === "Store" && isItemsLocked && <div className="tooltip-nav">
                                                                    <div className="tooltip-inner">
                                                                        <div className="tooltip-box">
                                                                            <span className="tooltip-content">The store is unlocked at Level 2.</span>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            }
                                                        </li>
                                                    )
                                                })
                                            }
                                        </ul>
                                    </div>
                                </div>

                                {
                                    userBenefits && <div className="top-bar-outer">
                                        <a className={`status walkthrought-item ${activeWT && flagWT && activeWT.includes(Constants.sz_xp_wt) && "wt-show"}`} onClick={this.handleTrack}>
                                            <div className="lavel-stats">
                                                <figure className="lavel-badge"><img src={images.badge} alt="" /></figure>
                                                <div className="lavel-top">
                                                    <span className="lavel-point">{userBenefits.user_level.level_id}</span>
                                                    <span className="lavel-label">level</span>
                                                </div>
                                            </div>
                                            <div className={`xp-progress ${isRouteChanged ? "fix-progress" : ""}`}>
                                                <div className="progress-bar">
                                                    <div className="progress-fill" style={{
                                                        width: HelperFunctions.calculateLevelBarWidthNew(userBenefits) + "%"
                                                    }}></div>
                                                </div>
                                                <div className="xp-label">
                                                    <span>{userBenefits.current_xp + " / " + userBenefits.required_xp_next_level + " XP"}</span>
                                                </div>
                                            </div>


                                            <WalkThrough wtText={"Every game you play earns you Experience Points (XP). As you level up, you will receive additional rewards and benefits."} />

                                        </a>
                                        <div className="top-right">
                                            <Link onClick={this.trackUser.bind(this, "gold")} className={`gold-stats walkthrought-item ${activeWT && flagWT && activeWT.includes(Constants.sz_gold_wt) && "wt-show"} ${isItemsLocked && "event-none"}`} to={{
                                                pathname: ProjectRoutes.shop.url,
                                                search: HelperFunctions.getQueryStringFromURL(),
                                                state: { defaultShow: "store", isNavClicked: true }
                                            }}>
                                                {
                                                    userBenefits &&
                                                    <CurrencyUp
                                                        gold={userBenefits.gold_amount}
                                                    />
                                                }
                                            </Link>
                                            <div className="faq-label" onClick={this.handleFaqClick}>
                                                <a className="icon pp-faq faq-btn"></a>
                                            </div>
                                        </div>
                                    </div>
                                }


                            </div>
                        </div>
                    </div>
                </header>

                {popupFlag && userBenefits && <XpStatus handlePopup={this.handlePopup} userBenefits={userBenefits} />}
            </React.Fragment>
        )
    }
}
