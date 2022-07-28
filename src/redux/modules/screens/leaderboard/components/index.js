import $ from 'jquery';
import React from 'react';
import images from "../../../../../assets/images";
import ContentLoader from '../../../../../commons/components/contentLoader';
import PPHeadCard from "../../../../../commons/components/ppHeadCard";
import HelperFunctions from '../../../../../utils/HelperFunctions';
import Constants from "../../../../../utils/Constants";
import StartUpPopups from '../../../common/startupScreens';
import UserPopup from '../../../common/startupScreens/userPopup';
import WalkThrough from '../../../../../commons/components/walkthrough';

export default class Leaderboard extends React.Component {

    constructor(props) {
        super(props);
        this.activeWeek = null;
        this.activeSeason = null;
    }

    componentDidMount() {
        $(document).off('click').on("click", ".leader-tr", function () {
            $(this).closest('tr').next('.resulted-tr').children('td').children('.tr-info').slideToggle('');
            $(this).closest('tr').toggleClass('open');
        });
    }

    handleLoadMore = () => {
        this.props.loadMore(this.activeWeek);
    };

    toggleFAQPopup = () => {
        this.props.handleHowToPopup(true, this.props.match.path);
    };

    expandRow = (index, userId, isWeekStatsAvailable) => {
        // console.log(userId, "userId");
        if (isWeekStatsAvailable) return;
        // console.log(this.activeWeek, this.activeSeason, "this.activeWeek")
        this.props.getWeekStats(index, this.activeWeek, this.activeSeason, userId);
    };

    handlePrizeBreakDownPopup = (currencyType) => {
        this.props.togglePrizePopup(currencyType);
    }

    weekOnChange = (e) => {
        this.activeWeek = e.target.value;

        var index = e.target.selectedIndex;
        var optionElement = e.target.childNodes[index]
        this.activeSeason = optionElement.getAttribute('seasonval');

        this.props.weekChange(e.target.value, this.activeSeason)
    };

    handleOpenDblRePopup = () => {
        this.props.userTracking("leaderboard_double-reward-week");
        this.props.toggleDoubleRewardsPopup(true)
    }

    render() {
        const { leaderboardData, userInfo, leaderboardWeeks, activeWT, isNickNameAvailable } = this.props;

        if (activeWT && (activeWT.includes(Constants.sz_leaderboard_wt))) {
            HelperFunctions.toggleWTBodyClass(true);
        } else {
            HelperFunctions.toggleWTBodyClass(false);
        }
        // console.log(leaderboardData, userInfo, leaderboardWeeks);
        return (
            <React.Fragment>
                <div className="mid-wrapper">
                    <PPHeadCard title={"Leaderboard"} />
                    <div className="container">
                        <div className="block leaderboard-widget">

                            {
                                !leaderboardData.weekChangeLoader && leaderboardData.isLoading && leaderboardData.data === null && !leaderboardData.isMessageShow ? <ContentLoader loaderType={"content-relative"} /> :
                                    <div className="card-info leader-info animated slideInUpLess">

                                        {
                                            HelperFunctions.doubleRewardTimeToShow() && <div className="link-block">
                                                <a onClick={this.handleOpenDblRePopup} className="link-label">Double Rewards Week! All Prizes below will be doubled</a>
                                            </div>
                                        }
                                        <div className="title">
                                            <h2 className="card-title">
                                                <span className="title-inner"> Weekly Master Leaderboard
                                                    {leaderboardData.leaderboardDate && <span className="normal-weight">{" (" + leaderboardData.leaderboardDate + ")"}</span>} </span>
                                                <div className="title-right">
                                                    <a onClick={this.toggleFAQPopup} className="info-btn"><i className="icon pp-info"></i> <span>Learn More</span></a>
                                                    {
                                                        leaderboardWeeks && leaderboardWeeks.length > 1 && <div className="select-week">
                                                            <div className="select-dropdown">
                                                                <select className="form-control" onChange={this.weekOnChange}>
                                                                    {
                                                                        leaderboardWeeks.map((lbWeek, lbWIndex) => {
                                                                            return (
                                                                                <option key={lbWIndex} seasonval={lbWeek.season} value={lbWeek.week}>{lbWeek.date_range}</option>
                                                                            )
                                                                        })
                                                                    }
                                                                </select>
                                                            </div>
                                                        </div>
                                                    }


                                                </div>
                                            </h2>
                                        </div>

                                        {
                                            leaderboardData.weekChangeLoader ? <ContentLoader loaderType={"content-relative"} /> : <React.Fragment>
                                                <div className="page-title">
                                                    <div className="page-title-outer">
                                                        <p className="title-msg">The master leaderboard shows a cumulative total of the ranking points acquired from your best 2 games each week. All leaderboards are updated daily
                                                            at 6am.</p>
                                                        {leaderboardData.data && <p className="title-msg2">Master Leaderboard as at the end of {leaderboardData.leaderboardDate}</p>}
                                                    </div>
                                                </div>
                                                <div className={`leaderboard-table walkthrought-item  ${activeWT && activeWT.includes(Constants.sz_leaderboard_wt) && "wt-show"}`}>
                                                    <div className="table-outer">
                                                        <div className="table-container">
                                                            <div className="table-card">
                                                                <table>
                                                                    <thead>
                                                                        <tr>
                                                                            <th className="sticked-1">Rank</th>
                                                                            <th className="sticked-2">Nickname</th>
                                                                            <th>Level</th>
                                                                            <th>Ranking Points</th>
                                                                            <th>Prizes</th>
                                                                        </tr>
                                                                    </thead>
                                                                    <tbody>
                                                                        {
                                                                            leaderboardData.data && leaderboardData.data.length > 0 && leaderboardData.data.map((leaderboard, index) => {
                                                                                //let prize = leaderboard.prize === "powerup" ? leaderboard.prize + 'x Power Up' : userInfo && HelperFunctions.getCurrency(userInfo ? userInfo.currency : '') + leaderboard.Prizes;
                                                                                let prize = <span className={"text-center"}>-</span>;
                                                                                let prizeIcon = null;

                                                                                if (leaderboard.prize && leaderboard.prize !== "" && leaderboard.prize !== undefined) {

                                                                                    if (leaderboard.currency_type === Constants.freeBetText) {

                                                                                        prize = <span>{HelperFunctions.getCurrency(userInfo.currency) + HelperFunctions.formatCurrency(leaderboard.prize)}</span>;
                                                                                        prizeIcon = <figure className={"free-bet"} onClick={this.handlePrizeBreakDownPopup.bind(this, "cash")}><img src={images.freeBetIcon} alt="" /></figure>;
                                                                                    } else if (leaderboard.currency_type === "gold") {
                                                                                        prize = <span>{leaderboard.prize + ' Gold'}</span>;
                                                                                        //prizeIcon = " PowerUp";
                                                                                        //prizeIcon = <figure onClick={this.handlePrizeBreakDownPopup.bind(this, "gold")}><img src={images.coinIcon} alt=""/></figure>;
                                                                                    }
                                                                                }
                                                                                return (
                                                                                    <React.Fragment>
                                                                                        {
                                                                                            leaderboard.user_name !== '' && <tr key={index} onClick={this.expandRow.bind(this, index, leaderboard.account_id, leaderboard.this_week_stats)} className={`tr-expand-custom ${leaderboard.rank > 0 && "leader-tr"}  ${index === 0 && "selected"}`}>
                                                                                                <td className="sticked-1">{leaderboard.rank === 0 ? "-" : leaderboard.display ? "=" + HelperFunctions.ordinal_suffix_of(leaderboard.rank) : HelperFunctions.ordinal_suffix_of(leaderboard.rank)}</td>
                                                                                                <td className="sticked-2"><span className="user-td">{leaderboard.user_name === "" ? "-" : leaderboard.user_name}</span></td>
                                                                                                <td><span className="points">{leaderboard.rank === 0 ? "-" : leaderboard.level}</span></td>
                                                                                                <td><span className="points">{leaderboard.rank === 0 ? "-" : leaderboard.score}</span></td>
                                                                                                <td>
                                                                                                    <span className="points">
                                                                                                        {leaderboard.rank === 0 ? "-" : prize}
                                                                                                    </span>
                                                                                                    {
                                                                                                        leaderboard.rank === 0 ? "" : <a className="icon pp-arrow-down td-arrow" />
                                                                                                    }
                                                                                                </td>

                                                                                            </tr>
                                                                                        }
                                                                                        <tr className="resulted-tr">
                                                                                            <td colSpan="6">
                                                                                                <div className="tr-info" style={{ display: 'none' }}>
                                                                                                    {leaderboard.this_week_stats ? (
                                                                                                        <div className="tr-grade-card">
                                                                                                            <div className="stats-card">
                                                                                                                <div className="stats-card-outer">
                                                                                                                    {
                                                                                                                        leaderboard.this_week_stats[0] && <div className="col">
                                                                                                                            <span className="stats-label">
                                                                                                                                <figure className="title-figure">
                                                                                                                                    <img src={leaderboardData.cdnPath + 'images/' + leaderboard.this_week_stats[0].game.mini_game_logo} alt="" />
                                                                                                                                </figure>
                                                                                                                            </span>
                                                                                                                            <div className="stats-bx">
                                                                                                                                <div className="stats-sm-bx">
                                                                                                                                    <div className="sm-col">
                                                                                                                                        <span className="stats-cp">
                                                                                                                                            <strong className="stats-value">{HelperFunctions.ordinal_suffix_of(leaderboard.this_week_stats[0].rank)}</strong>
                                                                                                                                            <p className="stats-pre">Rank</p>
                                                                                                                                        </span>
                                                                                                                                    </div>
                                                                                                                                    <div className="sm-col">
                                                                                                                                        <span className="stats-cp">
                                                                                                                                            <strong className="stats-value">{leaderboard.this_week_stats[0].points}</strong>
                                                                                                                                            <p className="stats-pre">Points</p>
                                                                                                                                        </span>
                                                                                                                                    </div>
                                                                                                                                </div>
                                                                                                                            </div>
                                                                                                                        </div>
                                                                                                                    }

                                                                                                                    {
                                                                                                                        leaderboard.this_week_stats[1] && <div className="col">
                                                                                                                            <span className="stats-label">
                                                                                                                                <figure className="title-figure">
                                                                                                                                    <img src={leaderboardData.cdnPath + 'images/' + leaderboard.this_week_stats[1].game.mini_game_logo} alt="" />
                                                                                                                                </figure>
                                                                                                                            </span>
                                                                                                                            <div className="stats-bx">
                                                                                                                                <div className="stats-sm-bx">
                                                                                                                                    <div className="sm-col">
                                                                                                                                        <span className="stats-cp">
                                                                                                                                            <strong className="stats-value">{HelperFunctions.ordinal_suffix_of(leaderboard.this_week_stats[1].rank)}</strong>
                                                                                                                                            <p className="stats-pre">Rank</p>
                                                                                                                                        </span>
                                                                                                                                    </div>
                                                                                                                                    <div className="sm-col">
                                                                                                                                        <span className="stats-cp">
                                                                                                                                            <strong className="stats-value">{leaderboard.this_week_stats[1].points}</strong>
                                                                                                                                            <p className="stats-pre">Points</p>
                                                                                                                                        </span>
                                                                                                                                    </div>
                                                                                                                                </div>
                                                                                                                            </div>
                                                                                                                        </div>
                                                                                                                    }
                                                                                                                </div>
                                                                                                            </div>
                                                                                                        </div>
                                                                                                    ) : (
                                                                                                        <ContentLoader loaderType={"content-relative"} />
                                                                                                    )}
                                                                                                </div>
                                                                                            </td>
                                                                                        </tr>
                                                                                    </React.Fragment>
                                                                                )
                                                                            })
                                                                        }
                                                                    </tbody>
                                                                </table>
                                                            </div>

                                                            {!leaderboardData.weekChangeLoader && leaderboardData.isLoading && <ContentLoader loaderType={"content-relative"} />}

                                                            {
                                                                !leaderboardData.isLoading && leaderboardData.isLoadMore && <div className="veiw-more" onClick={this.handleLoadMore}>
                                                                    <a className="show-more btn">
                                                                        <span>View More</span>
                                                                        <i className="icon pp-arrow-down"></i>
                                                                    </a>
                                                                </div>
                                                            }
                                                        </div>

                                                        {
                                                            leaderboardData.data === null && leaderboardData.isMessageShow && <div className="no-found-msg animated slideInUpLess">
                                                                <div className="no-found-msg-outer">
                                                                    <i className="icon pp-info"></i>
                                                                    <span>The master leaderboard will display after the first day!</span>
                                                                </div>
                                                            </div>
                                                        }
                                                    </div>

                                                    <WalkThrough wtText={"Here you can see the Master Leaderboard which determines prizes! The ranking points from your two best games for the week are added together to give you an overall ranking on the Master Leaderboard."} />



                                                </div>
                                            </React.Fragment>
                                        }

                                    </div>
                            }


                        </div>
                    </div>
                </div>

                {/* FAQ */}
                <StartUpPopups />
                {isNickNameAvailable && <UserPopup />}
                <StartUpPopups />
            </React.Fragment>
        )
    }

}
