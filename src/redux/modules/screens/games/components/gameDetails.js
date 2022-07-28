import React, { Component } from 'react';
import WalkThrough from '../../../../../commons/components/walkthrough';
import Constants from '../../../../../utils/Constants';
import DateHelper from '../../../../../utils/DateHelper';
import TimeCounter from '../../../common/countDown/timeCounter';

class GameDetails extends Component {


    makeGameActive = () => {
        this.props.callGamesAPI();
    }

    trackUser = (game_url) => {
        this.props.tracking(game_url)
    }


    render() {
        const { weekIndex, weekGames, weekDate, isCurrentWeek, activeWT } = this.props;
        // console.log(activeWT, "activeWT");
        // game-other-info
        return (

            weekGames.games && weekGames.games.length > 0 && <div className={`card-info game-list-info animated slideInUpLess`} data-week-date={weekDate}>
                <div className="title">
                    <h2 className="card-title sport-title"><span>{weekGames.heading}</span></h2>
                </div>
                <div className="card-outer">
                    <ul className="game-listing">
                        {
                            weekGames.games.map((gameInfo, gameIndex) => {
                                let releaseTime = null;
                                // console.log(gameInfo);
                                if (gameInfo.release_time && gameInfo.status === "U") {
                                    releaseTime = DateHelper.calculateMatchDateTimeDifferenceFromCurrent(DateHelper.getDateFromStringMoment(gameInfo.release_time));
                                }
                                return (
                                    // <li className={`walkthrought-item ${(activeWT && (activeWT.includes(Constants.sz_game_card_wt)) && gameInfo.game_id === "hgo") && "wt-show"} ${(releaseTime || gameInfo.status === "U") && "disable-game"}`} key={gameIndex}>
                                    <li className={`${(releaseTime || gameInfo.status === "U") && "disable-game"}`} key={gameIndex}>
                                        <div className="game-card">
                                            <a className="game-card-outer" onClick={(releaseTime || gameInfo.status === "U") ? null : this.trackUser.bind(this, gameInfo.game_url)}>
                                                <div className="game-bg">
                                                    <figure className="image-figure"><img src={gameInfo.game_banner_path} alt="" /></figure>
                                                </div>
                                                <div className="card-content">
                                                    <div className="game-content-inner">
                                                        {
                                                            gameInfo.activeTriviaTopic && <div className="active-topic"><span>Active Topic: {gameInfo.activeTriviaTopic}</span></div>
                                                        }
                                                        {/* <div className="active-topic"><span>Active Topic: Golf</span></div> */}

                                                        {
                                                            (gameInfo.game_id === "hg" || gameInfo.game_id === "hgo") &&
                                                            <div className="game-heading"><h3 className="title-label">{gameInfo.game_id === "hg" ? "Indoor" : "Outdoor"}</h3></div>
                                                        }

                                                        {
                                                            (gameInfo.game_id === "ppsqnfl") &&
                                                            <div className="game-heading"><h3 className="title-label">{"New"}</h3></div>
                                                        }

                                                        <div className="card-game-logo">
                                                            <figure className="logo-figure"><img src={gameInfo.game_logo_path} alt="" /></figure>
                                                        </div>
                                                        <div className="card-play">
                                                            {
                                                                (releaseTime || gameInfo.status === "U") ?
                                                                    <React.Fragment>
                                                                        <h3 className="countdown-title">Coming Soon</h3>
                                                                        {releaseTime && <TimeCounter timerValue={releaseTime} onComplete={this.makeGameActive} />}
                                                                    </React.Fragment>
                                                                    : <React.Fragment>

                                                                        {
                                                                            gameInfo.game_score && <span className="score-today">Score Today: {gameInfo.game_score}</span>
                                                                        }

                                                                        <span className={`btn ${gameInfo.btn_class} ${gameInfo.game_score || gameInfo.is_season_completed ? "yellow-btn" : "primary-btn"}`}>{gameInfo.game_card_text ? gameInfo.game_card_text : gameInfo.game_score || gameInfo.is_season_completed ? "Open" : "Play Now"}</span>
                                                                    </React.Fragment>
                                                            }
                                                        </div>
                                                    </div>
                                                </div>
                                            </a>
                                        </div>

                                        <WalkThrough wtText = {"You can play a range of games once per day in the Game Center."} />

                                        {/* {isCurrentWeek === false && gameInfo.is_current_week && gameInfo.game_score === undefined && <div className="current-play"><a onClick={this.trackUser.bind(this, gameInfo.game_url)} className="btn primary-btn">Play in Current Week</a></div>}
                                        {!gameInfo.is_current_week && <div className="current-play"><a onClick={this.trackUser.bind(this, gameInfo.game_url)} className="btn bdr-btn">View Leaderboard</a></div>} */}
                                    </li>
                                )
                            })
                        }
                    </ul>
                </div>
            </div>

        );
    }
}

export default GameDetails;