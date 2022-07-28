import React from 'react';
import ContentLoader from '../../../../../commons/components/contentLoader';
import PPHeadCard from "../../../../../commons/components/ppHeadCard";
import Constants from '../../../../../utils/Constants';
import HelperFunctions from '../../../../../utils/HelperFunctions';
import StartUpPopups from '../../../common/startupScreens';
import Monthly from './monthly';
import Weekly from './weekly';

export default class Challenges extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            activeTab: "weekly"
            // activeTab: "monthly"
        }
    }

    handleTabs = (tab) => {
        this.setState({
            activeTab: tab
        })
        this.props.userTracking("challenges_" + tab);
    }

    // componentDidUpdate(prevProps) {
    //     if (this.props.userBenefits !== prevProps.userBenefits) {
    //         if (this.props.userBenefits) {
    //             if (this.props.userBenefits.user_level.level_id < Constants.challengesHappyHourLevel) {
    //                 this.setState({
    //                     activeTab: "monthly"
    //                 })
    //             }
    //         }
    //     }
    // }

    render() {
        const { activeTab } = this.state;
        const { challengesData, activeWT, currentOrientation, happyHourStatuschange, userBenefits } = this.props;
        const userLevel = userBenefits && userBenefits.user_level.level_id;
        // const flag = userLevel >= Constants.challengesHappyHourLevel;
        const flag = true;
        let wtFlag = false;
        if (activeWT && activeWT.includes(Constants.sz_challenges_wt)) {
            wtFlag = true;
            HelperFunctions.toggleWTBodyClass(true);
        } else {
            HelperFunctions.toggleWTBodyClass(false);
        }
        return (
            <React.Fragment>
                <div className="mid-wrapper">
				 <PPHeadCard  title={"CHALLENGES"}/>
                    <div className="container">
                        <div className="block challenges-widget">

                           

                            {
                                challengesData ? <div className="weekly-monthly-warp content-tabs  animated fadeIn delay-02s">

                                    {
                                        flag && <div className="tabs-wrap">
                                            <div className="tabs-outer">
                                                <ul className="tabs-nav">
                                                    <li onClick={this.handleTabs.bind(this, "weekly")}>
                                                        <a className={`${activeTab === "weekly" && "active"}`}>
                                                            <span className="tab-label"><span>Weekly</span>
                                                              {challengesData.stats_type &&  <p>{"(" + challengesData.stats_type.week.display_name + ")"}</p>} 
                                                            </span></a></li>
                                                    <li onClick={this.handleTabs.bind(this, "monthly")}>
                                                        <a className={`${activeTab === "monthly" && "active"}`}>
                                                            <span className="tab-label">
                                                                <span>Monthly</span>
                                                              {challengesData.stats_type && <p>{"(" + challengesData.stats_type.month.display_name + ")"}</p>}  
                                                            </span></a></li>
                                                </ul>
                                            </div>
                                        </div>
                                    }

                                    <div className="tabs-content-wrap">

                                        {activeTab === "weekly" && <Weekly 
                                        challengesData={challengesData} 
                                        wtFlag={wtFlag}
                                        happyHourStatuschange={happyHourStatuschange} />}
                                        {
                                        activeTab === "monthly" && <Monthly
                                            currentOrientation={currentOrientation}
                                            wtFlag={wtFlag}
                                            currentMonth={challengesData.monthly}
                                            tierInfo={challengesData.tier_info}
                                        />
                                        }
                                    </div>
                                </div> : <ContentLoader loaderType="content-relative" />
                            }
                        </div>
                    </div>
                </div>
                <StartUpPopups />
            </React.Fragment>
        )
    }
}
