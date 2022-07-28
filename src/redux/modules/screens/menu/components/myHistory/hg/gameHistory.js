import React, { Component } from 'react';
import images from "../../../../../../../assets/images";
import HelperFunctions from "../../../../../../../utils/HelperFunctions";
import ContentLoader from "../../../../../../../commons/components/contentLoader";
import MiniLoader from "../../../../../../../commons/components/miniLoader";

class GameHistory extends Component {
    render() {
        const { monthIndex, index, games, userInfo, seasonIndex, base_url } = this.props;
        // console.log("hts", base_url)
        return (
            <div className="accordion-content accordian-inner-content"
                id={"inner_content_" + seasonIndex + "_" + monthIndex + "_" + index}>
                <ul className="game-history-list">
                    {!games ?
                        games === null ?
                            <li style={{ paddingTop: '10px', paddingBottom: '10px', textAlign: 'center' }}>No game played on this day.</li>
                            :
                            <ContentLoader loaderType={'content-relative'} />
                        :
                        games && games.map((item, j) => {
                            // console.log(games);
                            return (
                                <li key={j}>
                                    <div className="col col-day">
                                        <span>Game {item.game_number}</span>
                                    </div>
                                    <div className="col col-date">
                                        <div className="icon-history">
                                            {
                                                item.rounds && item.rounds.map((item, index) => {
                                                    const score_types = item.score_type;
                                                    let icon = null;

                                                    if (score_types.basket_with_fire_streak_ball) {
                                                        if (score_types.basket_with_orange_ball) {
                                                            icon = "hg_orange_streak.png";
                                                        } else if (score_types.basket_with_blue_ball) {
                                                            icon = "hg_green_streak.png";
                                                        }
                                                    } else {
                                                        if (score_types.basket_with_orange_ball) {
                                                            icon = "hg_orange.png";
                                                        } else if (score_types.basket_miss) {
                                                            icon = "hg_missed.png";
                                                        } else if (score_types.basket_with_blue_ball) {
                                                            icon = "hg_green.png";
                                                        }
                                                    }

                                                    const clas = 'extra-target';
                                                    return (
                                                        <figure key={index} className={clas}>
                                                            <img src={`${HelperFunctions.generateLocalImgPath(icon)}`} alt="" />
                                                        </figure>
                                                    )
                                                })
                                            }
                                        </div>
                                    </div>
                                    <div className="col col-prize">
                                        {item.score ?
                                            <span>{item.score}</span>
                                            :
                                            <span>0</span>
                                        }
                                    </div>
                                </li>
                            )
                        })
                    }
                </ul>
            </div>
        );
    }
}

export default GameHistory;