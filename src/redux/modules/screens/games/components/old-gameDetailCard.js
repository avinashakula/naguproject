import React, { Component } from 'react';
import DateHelper from '../../../../../utils/DateHelper';
import TimeCounter from '../../../common/countDown/timeCounter';

class GameDetailCard extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isActive: false
        }
    }

    trackUser = (game_url) => {
        this.props.tracking(game_url)
    }

    makeGameActive = () => {
        this.setState({
            isActive: true
        })
    }

    render() {
        const { game } = this.props;
        const { isActive } = this.state;
        const isUpcoming = game && game.status === "U" && game.release_time;
        let releaseTime = null;
        if (isUpcoming) {
            releaseTime = DateHelper.calculateMatchDateTimeDifferenceFromCurrent(DateHelper.getDateFromStringMoment(game.release_time));
        }

        // console.log(game, "game");

        return (
            <li className={`${isUpcoming && !isActive  && "disable-game"}`}>
                <div className="game-card">
                    <a onClick={isUpcoming && !isActive ? null : this.trackUser.bind(this, game.game_url)}
                        className="game-card-outer">
                        <div className="game-bg">
                            <figure className="image-figure"><img src={game.game_banner_path} alt="" /></figure>
                        </div>
                        <div className="card-content">
                            <div className="game-content-inner">
                                {
                                    (game.game_id === "hg" || game.game_id === "hgo") &&
                                    <div className="game-heading"><h3 className="title-label">{game.game_id === "hg" ? "Indoor" : "Outdoor"}</h3></div>
                                }

                                {
                                    (game.game_id === "ppsqnfl") &&
                                    <div className="game-heading"><h3 className="title-label">{"New"}</h3></div>
                                }

                                <div className="card-game-logo">
                                    <figure className="logo-figure"><img src={game.game_logo_path} alt="" /></figure>
                                </div>

                                {
                                    isUpcoming && !isActive ? <div className="card-play">
                                        <TimeCounter timerValue={releaseTime} onComplete={this.makeGameActive} />
                                    </div> : <div className="card-play">
                                            {
                                                game.game_score && <span className="score-today">Score Today: {game.game_score}</span>
                                            }
                                            <span className={`btn ${game.btn_class} ${game.game_score || game.is_season_completed ? "yellow-btn" : "primary-btn"}`}>{game.game_card_text ? game.game_card_text : game.game_score || game.is_season_completed ? "Open" : "Play Now"}</span>
                                        </div>
                                }

                            </div>
                        </div>
                    </a>
                </div>
            </li>
        );
    }
}

export default GameDetailCard;