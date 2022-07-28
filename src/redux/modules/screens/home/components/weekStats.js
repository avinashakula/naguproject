import React, { Component } from 'react';
import ContentLoader from '../../../../../commons/components/contentLoader';
import HelperFunctions from '../../../../../utils/HelperFunctions';

class WeekStats extends Component {
    render() {
        const { stats, userInfo } = this.props;
        // console.log(stats, "stats")
        return (
            <React.Fragment>
                {
                    stats ? <React.Fragment>
                        <div className="card-block">
                            {/* Last week stats */}
                            {
                                stats.currentWeek && <div className="card-info weekly-status-info animated slideInUpLess">
                                    <div className="title">
                                        <h2 className="card-title">My Stats This Week {stats.currentWeekDateHeading && <span className="title-sm-label">{stats.currentWeekDateHeading}</span>}</h2>
                                    </div>
                                    <div className="card-outer">
                                        <div className="wcard">
                                            <div className="weekly-status-card">
                                                <div className="stats-card">
                                                    <div className="stats-card-outer">
                                                        <div className="col"><span className="stats-label">WEEKLY RANK</span>
                                                            <div className="stats-bx">
                                                                <span className="stats-cp">
                                                                    {stats.currentWeek === " " ? "-" : HelperFunctions.ordinal_suffix_of(stats.currentWeek.rank)}
                                                                </span>
                                                            </div>
                                                        </div>
                                                        <div className="col"><span className="stats-label">MASTER LEADERBOARD</span>
                                                            <div className="stats-bx"><span className="stats-cp">{stats.currentWeek === " " ? "-" : HelperFunctions.strBasedOnOneMore(stats.currentWeek.score, 'POINT', 'POINTS')}</span></div>
                                                        </div>
                                                        <div className="col"><span className="stats-label">Prizes</span>
                                                            
                                                            
                                                            <div className="stats-bx">
                                                                <span className="stats-cp">
                                                                    {stats.currentWeek === " " ? "-" : stats.currentWeek.currency_type !== "cash" ? "1x Power Up" : userInfo ? HelperFunctions.getCurrency(userInfo ? userInfo.currency : '') + HelperFunctions.formatCurrency(stats.currentWeek.prize) : ''}
                                                                </span>
                                                                {stats.currentWeek !== " " && stats.currentWeek.currency_type === "cash" && <p className="stats-pre">(Cash)</p>}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            }

                            {/* week stats */}
                            {
                                stats.currentWeekGames && <div className="card-info best-grade-info animated slideInUpLess">
                                    <div className="title">
                                        {/* <h2 className="card-title">{`Top ${stats.currentWeek.length} ${stats.currentWeek.length === 1 ? "Game" : "Games"}`}</h2> */}
                                        <h2 className="card-title">&nbsp;</h2>
                                    </div>
                                    <div className="card-outer">
                                        <div className="wcard">
                                            <div className="best-grade-card">
                                                <div className="stats-card">
                                                    <div className="stats-card-outer">

                                                        {
                                                            stats.currentWeekGames.map((cStat, index) => {
                                                                return (
                                                                    <div className="col" key={index}>
                                                                        <span className="stats-label">
                                                                            <figure className="title-figure">
                                                                                <img src={stats.basePath + "images/" + cStat.game.mini_game_logo} alt="" />
                                                                            </figure>
                                                                        </span>
                                                                        <div className="stats-bx">
                                                                            <div className="stats-sm-bx">
                                                                                <div className="sm-col">
                                                                                    <span className="stats-cp"><strong className="stats-value">
                                                                                        {
                                                                                            HelperFunctions.ordinal_suffix_of(cStat.rank)
                                                                                        }
                                                                                    </strong> <p className="stats-pre">Rank</p></span>
                                                                                </div>
                                                                                <div className="sm-col">
                                                                                    <span className="stats-cp"><strong className="stats-value">{cStat.points}</strong> <p className="stats-pre">Points</p></span>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                )
                                                            })
                                                        }

                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            }

                        </div>

                        <div className="card-block">
                            {/* Last week stats */}
                            {
                                stats.lastWeek && <div className="card-info weekly-status-info animated slideInUpLess">
                                    <div className="title">
                                        <h2 className="card-title">My Stats Last Week {stats.lastWeekDateHeading && <span className="title-sm-label">{stats.lastWeekDateHeading}</span>}</h2>
                                    </div>
                                    <div className="card-outer">
                                        <div className="wcard">
                                            <div className="weekly-status-card">
                                                <div className="stats-card">
                                                    <div className="stats-card-outer">
                                                        <div className="col"><span className="stats-label">WEEKLY RANK</span>
                                                            <div className="stats-bx"><span className="stats-cp">{stats.lastWeek === " " ? "-" : HelperFunctions.ordinal_suffix_of(stats.lastWeek.rank)}</span></div>
                                                        </div>
                                                        <div className="col"><span className="stats-label">MASTER LEADERBOARD</span>
                                                            <div className="stats-bx"><span
                                                                className="stats-cp">{stats.lastWeek === " " ? "-" : HelperFunctions.strBasedOnOneMore(stats.lastWeek.score, 'POINT', 'POINTS')}</span></div>
                                                        </div>
                                                        <div className="col"><span className="stats-label">Prizes</span>
                                                            <div className="stats-bx"><span className="stats-cp">
                                                                {stats.lastWeek === " " ? "-" : stats.lastWeek.currency_type !== "cash" ? "1x Power Up" : userInfo ? HelperFunctions.getCurrency(userInfo ? userInfo.currency : '') + HelperFunctions.formatCurrency(stats.lastWeek.prize) : ''}
                                                            </span>
                                                                {stats.lastWeek !== " " && stats.lastWeek.currency_type === "cash" && <p className="stats-pre">(Cash)</p>}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            }

                            {/* week stats */}
                            {
                                stats.lastWeekGames && <div className="card-info best-grade-info animated slideInUpLess">
                                    <div className="title">
                                        {/* <h2 className="card-title">{`Top ${stats.currentWeek.length} ${stats.currentWeek.length === 1 ? "Game" : "Games"}`}</h2> */}
                                        <h2 className="card-title">&nbsp;</h2>
                                    </div>
                                    <div className="card-outer">
                                        <div className="wcard">
                                            <div className="best-grade-card">
                                                <div className="stats-card">
                                                    <div className="stats-card-outer">

                                                        {
                                                            stats.lastWeekGames.map((cStat, index) => {
                                                                return (
                                                                    <div className="col" key={index}>
                                                                        <span className="stats-label">
                                                                            <figure className="title-figure">
                                                                                <img src={stats.basePath + "images/" + cStat.game.mini_game_logo} alt="" />
                                                                            </figure>
                                                                        </span>
                                                                        <div className="stats-bx">
                                                                            <div className="stats-sm-bx">
                                                                                <div className="sm-col">
                                                                                    <span className="stats-cp"><strong className="stats-value">
                                                                                        {
                                                                                            HelperFunctions.ordinal_suffix_of(cStat.rank)
                                                                                        }
                                                                                    </strong> <p className="stats-pre">Rank</p></span>
                                                                                </div>
                                                                                <div className="sm-col">
                                                                                    <span className="stats-cp"><strong className="stats-value">{cStat.points}</strong> <p className="stats-pre">Points</p></span>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                )
                                                            })
                                                        }

                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            }

                        </div>
                    </React.Fragment> : <ContentLoader loaderType={"content-relative"} />
                }
            </React.Fragment>
        );
    }
}

export default WeekStats;