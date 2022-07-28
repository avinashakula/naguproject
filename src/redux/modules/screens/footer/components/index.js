import React from 'react';
import { Link } from "react-router-dom";
import images from "../../../../../assets/images";
import FooterHTML from '../../../../../commons/components/footer/footer';
import ProjectRoutes from '../../../../../config/routes/projectRoutes';
import Constants from '../../../../../utils/Constants';
import HelperFunctions from "../../../../../utils/HelperFunctions";

export default class Footer extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        const { path, userBenefits, userPopups, userNotification, navigation, playTabAnim, challengesTabAnim, userInfo } = this.props;
        let isItemsLocked = HelperFunctions.lockedTab(userBenefits, "store");
        isItemsLocked = false;
        return (
            <React.Fragment>

                <FooterHTML userInfo={userInfo} />

                <div className="footer-nav-bar">
                    <div className="nav-bar">
                        <div className="nav-bar-outer">
                            <div className="nav-bar-inner">
                                <ul className="nav-list">
                                    {
                                        navigation.map((navItem, index) => {
                                            return (
                                                <li key={'' + index}
                                                    className={`${path === navItem.page_url ? "active" : ""} ${navItem.page === "Store" && isItemsLocked && "locked"}`}>
                                                    <Link to={navItem.page_path_obj}>
                                                        <i className={navItem.page_icon}></i>
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
                                                        <span className="nav-label">{navItem.page}</span>
                                                        {
                                                            navItem.page === "Store" && isItemsLocked && <i className="icon pp-lock locked-icon"></i>
                                                        }

                                                        {
                                                            navItem.page === "Store" && userNotification && userNotification.store && userNotification.store.store_count && <label className="noti-label">{userNotification.store.store_count}</label>
                                                        }
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
                    </div>
                </div>

            </React.Fragment>
        )
    }
}