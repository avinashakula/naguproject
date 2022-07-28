import $ from 'jquery';
import React, {Component} from 'react';
import MessageContainer from '../../../../../../../commons/components/contentMessage';
import ContentScroll from '../../../../../../../commons/components/contentScroll/contentScroll';
import DateHelper from '../../../../../../../utils/DateHelper';
import HelperFunctions from '../../../../../../../utils/HelperFunctions';
import ChartDemo from './chartDemo';
import GameHistory from './gameHistory';

class PuckLuckHistory extends Component {

    constructor(props) {
        super(props);
        this.state = {
            activeTab: "list",
            activeSeasonIndex: 0,
        };
        this.selectedSeason = null;
        this.selectedTab = null;
        this.selectedMonth = null;
        this.groupId = null;
    }

    handleAccordian(season_index, index, group_id, month) {
        this.selectedMonth = month;
        if (group_id === null) {
            if ($("#month_list_" + season_index + "_" + index).hasClass("active")) {
                $("#month_list_" + season_index + "_" + index).removeClass('active');
                $(".list-bar").find(".bar-arrow > i").removeClass('icon pp-arrow-up').addClass('icon pp-arrow-down');
                $("#month_content_" + season_index + "_" + index).slideUp();
            } else {
                $(".list-bar").removeClass('active');
                $(".list-bar").find(".bar-arrow > i").removeClass('icon pp-arrow-up').addClass('icon pp-arrow-down');
                $(".accordin-content").slideUp();
                $("#month_list_" + season_index + "_" + index).addClass('active');
                $("#month_list_" + season_index + "_" + index).find(".bar-arrow > i").removeClass('icon pp-arrow-down').addClass('icon pp-arrow-up');
                $("#month_content_" + season_index + "_" + index).slideDown();
                this.trackUser();
            }
        } else {
            if (this.groupId !== group_id) {
                this.props.gameData(group_id, this.props.gameType);    //Pass selected GameType
            }
            this.groupId = group_id;
            //
            if ($("#inner_content_list_" + season_index + "_" + index).hasClass("active")) {
                $("#inner_content_list_" + season_index + "_" + index).removeClass('active');
                $(".inner-content").find(".btn_plus > i").removeClass('icon pp-minus').addClass('icon pp-plus');
                $("#inner_content_" + season_index + "_" + index).slideUp();
            } else {
                $(".inner-content").removeClass('active');
                $(".inner-content").find(".btn_plus > i").removeClass('icon pp-minus').addClass('icon pp-plus');
                $(".accordian-inner-content").slideUp();
                $("#inner_content_list_" + season_index + "_" + index).addClass('active');
                $("#inner_content_list_" + season_index + "_" + index).find(".btn_plus > i").removeClass('icon pp-plus').addClass('icon pp-minus');
                $("#inner_content_" + season_index + "_" + index).slideDown();
                this.trackUser();
            }
        }
        var selectVal = index.toString();
        var arr = selectVal.split('_');

        var selectedIndexVal = arr.length === 1 ? arr[0] : arr[0];

        //$(".scrollbar-container").animate({ scrollTop: selectedIndexVal * 50 }, "slow");
    }

    handleTabs(tab) {
        // console.log(tab, "tab");
        this.setState({
            activeTab: tab
        });
        this.selectedTab = tab;
        this.selectedMonth = "all";
        this.groupId = null;
        this.trackUser();
    }

    handleSeasonTabs(seasonIndex) {
        this.setState({
            activeSeasonIndex: seasonIndex,
        });
        // console.log(this.props.myHistory, "this.props.myHistory");
        this.selectedSeason = this.props.myHistory.data.seasons[seasonIndex].season;
        this.selectedMonth = "all";
        this.groupId = null;
        this.trackUser();
    }

    setSelectedMonth = (month) => {
        this.selectedMonth = month;
        this.trackUser();
    }

    trackUser = () => {
        let obj = null;
        if (this.groupId) {
            obj = {
                season: this.selectedSeason,
                gamegroup: this.selectedMonth,
                group: this.groupId,
                tab: this.selectedTab ? this.selectedTab : this.state.activeTab,
                game: this.props.gameType
            };
        } else {
            obj = {
                season: this.selectedSeason,
                gamegroup: this.selectedMonth,
                tab: this.selectedTab ? this.selectedTab : this.state.activeTab,
                game: this.props.gameType
            };
        }

        this.props.handleTracking(obj);
    }

    componentDidUpdate(prevProps) {
        // Typical usage (don't forget to compare props):
        if (this.props.myHistory !== prevProps.myHistory) {
            if (this.props.myHistory.data != null && this.props.myHistory.data.seasons) {
                // console.log(this.props.myHistory, "this.props.myHistory")
                this.selectedSeason = this.props.myHistory.data.seasons[this.state.activeSeasonIndex].season;
                // this.selectedTab = this.state.activeTab;
                this.selectedMonth = "all";
            }
        }
    }

    render() {
        const {data, userInfo, gameType} = this.props;
        let self = this;
        return (
            (data && data.seasons && data.seasons.length > 0) ?
                <div className="tab-container content-tabs top-tabs-container">
                    <div className="tabs top-tabs">
                        <ul className="tabs-nav">
                            {
                                data.seasons.length > 1 && data.seasons.map((season, seasonIndex) => {
                                    return (
                                        <li
                                            key={seasonIndex}
                                            className={this.state.activeSeasonIndex === seasonIndex ? "active" : ""}
                                            onClick={() => this.handleSeasonTabs(seasonIndex)}>
                                            <a>{season.season}</a></li>
                                    )
                                })
                            }

                        </ul>
                    </div>
                    {
                        data.seasons.map((seasonData, seasonIndex) => {
                            return (

                                <div key={seasonIndex} className={"season_" + seasonIndex}
                                     style={{display: this.state.activeSeasonIndex === seasonIndex ? "block" : "none"}}>
                                    <div className="tabs-wrap history-tabs animated slideInUpLess">
                                        <div className="tabs tabs-outer">
                                            <ul className="tabs-nav">
                                                <li onClick={() => this.handleTabs("list")}><a className={this.state.activeTab === "list" ? "active" : ""}><span className="tab-label"><span>List</span></span></a></li>
                                                <li onClick={() => this.handleTabs("graph")}><a className={this.state.activeTab === "graph" ? "active" : ""}><span className="tab-label"><span>Graph</span></span></a></li>
                                            </ul>
                                        </div>
                                    </div>

                                    <div className="history-tab-content tab-content animated slideInUpLess" id="list"
                                         style={{display: this.state.activeTab === 'list' ? 'block' : 'none'}}>
                                        <div className={"content-mid"}>
                                            {
                                                <React.Fragment>
                                                    <div className="history-list-wrap">
                                                        {
                                                            (data.seasons && data.seasons.length > 0) && <div className="month-heading">
                                                                <div className="col month-col"><span>Month</span></div>
                                                                <div className="col score-col"><span>Total Score</span></div>
                                                                <div className="col prize-col"><span>High Score</span></div>
                                                            </div>
                                                        }
                                                        <ul className="month-listing add-accordin">
                                                            {
                                                                (seasonData.months && seasonData.months.length > 0) && seasonData.months.map((monthData, monthIndex) => {
                                                                    return (
                                                                        <li
                                                                            key={monthIndex}>
                                                                            <a className="list-bar"
                                                                               id={"month_list_" + seasonIndex + "_" + monthIndex}
                                                                               onClick={this.handleAccordian.bind(this, seasonIndex, monthIndex, null, monthData.month)}>
                                                                                <div className="col month-col"><span
                                                                                    className="month">{monthData.month}</span></div>
                                                                                <div className="col score-col"><span
                                                                                    className="history-score">{HelperFunctions.numberFormatter(monthData.total_score)}</span>
                                                                                </div>
                                                                                <div className="col prize-col"><span className="history-score">{monthData.max_score}</span></div>
                                                                                <span className="bar-arrow"> <i className="icon pp-arrow-down"
                                                                                                                aria-hidden="true"></i> </span>
                                                                            </a>
                                                                            <div className="content-block accordin-content"
                                                                                 id={"month_content_" + seasonIndex + "_" + monthIndex}>
                                                                                <div className="table-container">
                                                                                    <div className="inner-table">
                                                                                        {monthData && monthData.groups && monthData.groups.length > 0 &&
                                                                                        <div className="history-thead">
                                                                                            <div className="col col-day">Day</div>
                                                                                            <div className="col col-date">Date</div>
                                                                                            <div className="col col-score">Daily Score</div>
                                                                                            {/*  <div className="col col-prize">Prize</div>*/}
                                                                                        </div>
                                                                                        }

                                                                                        {
                                                                                            monthData && monthData.groups && monthData.groups.length > 0 ? <div className="history-body">
                                                                                                <ul className="history-list add-accordin">
                                                                                                    {

                                                                                                        monthData.groups.map((group, index) => {
                                                                                                            const {group_date, group_prize, win_prize, max_score, total_score} = group;
                                                                                                            const dateObj = DateHelper.getFullDateWithDay(group_date);
                                                                                                            const games = group.games;

                                                                                                            return (

                                                                                                                <li key={index}>
                                                                                                                    <a
                                                                                                                        className={"history-class inner-content historyitem" + index}
                                                                                                                        id={"inner_content_list_" + seasonIndex + "_" + monthIndex + "_" + index}
                                                                                                                        onClick={self.handleAccordian.bind(self, seasonIndex, monthIndex + "_" + index, group.group_id, monthData.month)}
                                                                                                                    >
                                                                                                                        <div className="block">
                                                                                                                            <div
                                                                                                                                className="col col-day">
                                                                                                                                <span>{dateObj.day}</span>
                                                                                                                            </div>
                                                                                                                            <div
                                                                                                                                className="col col-date">
                                                                                                                                <span>{dateObj.date + ' ' + dateObj.month + ' ' + dateObj.year}</span>
                                                                                                                            </div>
                                                                                                                            <div
                                                                                                                                className="col col-score">
                                                                                                                                <span>{total_score} </span>
                                                                                                                            </div>

                                                                                                                        </div>
                                                                                                                        <span className="btn_plus"><i className="icon pp-plus" aria-hidden="true"></i></span></a>

                                                                                                                    <GameHistory
                                                                                                                        monthIndex={monthIndex}
                                                                                                                        seasonIndex={seasonIndex}
                                                                                                                        index={index}
                                                                                                                        gameType={gameType}
                                                                                                                        userInfo={userInfo}
                                                                                                                        base_url={data.cdn_url ? data.cdn_url + "images/" : null}
                                                                                                                        games={games}/>
                                                                                                                </li>
                                                                                                            )
                                                                                                        })

                                                                                                    }
                                                                                                </ul>
                                                                                            </div> : <MessageContainer animclass={"animated slideInUpLess"} msg={"Your history will start displaying at the conclusion of the day you first play a game."}/>
                                                                                        }

                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </li>
                                                                    )
                                                                })
                                                            }

                                                        </ul>
                                                    </div>
                                                </React.Fragment>
                                            }
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    }
                    <div className="tab-content animated slideInUpLess"
                         style={{display: this.state.activeTab === 'graph' ? 'block' : 'none'}}>
                        {
                            data && data.seasons && data.seasons.length > 0 && this.state.activeTab === 'graph' &&
                            <ChartDemo
                                graphData={data.seasons[this.state.activeSeasonIndex].graphData}
                                setSelectedMonth={this.setSelectedMonth}
                            />
                        }

                    </div>

                </div> : <MessageContainer animclass={"animated slideInUpLess"} msg={"Your history will start displaying at the conclusion of the day you first play a game."}/>
        );
    }
}

export default PuckLuckHistory;