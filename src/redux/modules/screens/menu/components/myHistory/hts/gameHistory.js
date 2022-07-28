import React, { Component } from 'react';
import images from "../../../../../../../assets/images";
import HelperFunctions from "../../../../../../../utils/HelperFunctions";
import ContentLoader from "../../../../../../../commons/components/contentLoader";
import MiniLoader from "../../../../../../../commons/components/miniLoader";

class GameHistory extends Component {
    render() {
        const { monthIndex, index, games, userInfo, seasonIndex, base_url, gameType } = this.props;
        // console.log(this.props);
        // console.log("hts", games)
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

                                                    const score_types = item.score_types;

                                                    const scoreTypesArray = [];
                                                    let boostOverlay = null;
                                                    if (score_types && score_types.used_powers) {
                                                        boostOverlay = getBoostImages(score_types.used_powers, base_url);
                                                    }

                                                    let obj = {};

                                                    if (gameType === "gaelic" && score_types.goal_above) {
                                                        let targetHitImg = images.gaelicGoalAbove;
                                                        obj = { targetHitImg }
                                                        scoreTypesArray.push(obj);
                                                    }

                                                    if (score_types.circle_target1_hit || score_types.circle_target2_hit) {

                                                        let targetHitImg = gameType === "hts" ? images.targetHit : images.gaelicTargetHit;


                                                        if (boostOverlay) {
                                                            obj = { targetHitImg, boostOverlay }
                                                        } else {
                                                            obj = { targetHitImg }
                                                        }

                                                        scoreTypesArray.push(obj);
                                                        // console.log(scoreTypesArray, "scoreTypesArray");
                                                    }
                                                    if (score_types.trophy_target_hit) {
                                                        let trophyHitImg = images.trophyHit;
                                                        if (boostOverlay) {
                                                            obj = { trophyHitImg, boostOverlay }
                                                        } else {
                                                            obj = { trophyHitImg }
                                                        }
                                                        scoreTypesArray.push(obj);
                                                    }
                                                    if (score_types.triangle_target_left_hit || score_types.triangle_target_right_hit) {
                                                        let topBinHit = images.topBinHit;
                                                        if (boostOverlay) {
                                                            obj = { topBinHit, boostOverlay }
                                                        } else {
                                                            obj = { topBinHit }
                                                        }
                                                        scoreTypesArray.push(obj);
                                                    }
                                                    if (score_types.goal_hit) {
                                                        let goalHit = gameType === "hts" ? images.goalHit : images.gaelicGoal;
                                                        if (boostOverlay) {
                                                            obj = { goalHit, boostOverlay }
                                                        } else {
                                                            obj = { goalHit }
                                                        }
                                                        scoreTypesArray.push(obj);
                                                    }
                                                    if (score_types.goal_miss && scoreTypesArray.length === 0) {
                                                        let goalMiss = images.goalMiss;
                                                        if (boostOverlay) {
                                                            obj = { goalMiss, boostOverlay }
                                                        } else {
                                                            obj = { goalMiss }
                                                        }
                                                        scoreTypesArray.push(obj);
                                                    }
                                                    if (scoreTypesArray.length === 0) {
                                                        let goalMiss = images.goalMiss;
                                                        obj = { goalMiss }
                                                        scoreTypesArray.push(obj);
                                                    }

                                                    /* let keysss = Object.keys(scoreTypesArray[0]);
                                                     console.log(keysss);
                                                     console.log(scoreTypesArray[0][keysss[1]]);*/
                                                    const clas = 'extra-target' + (scoreTypesArray.length === 3 ? " three-targets" : scoreTypesArray.length === 2 ? " dubble-target" : '');

                                                    return (
                                                        <figure key={index} className={clas}>
                                                            {
                                                                scoreTypesArray.length > 1 ? scoreTypesArray.map((item, index) => {
                                                                    let targetIcon = item[Object.keys(item)[0]];
                                                                    let boostOverlay = null;
                                                                    if (item[Object.keys(item)[1]]) {
                                                                        boostOverlay = item[Object.keys(item)[1]];
                                                                    }
                                                                    return (
                                                                        <samp key={index}>
                                                                            <img src={targetIcon} />
                                                                            {boostOverlay &&
                                                                                <label><img src={boostOverlay} /></label>}
                                                                        </samp>
                                                                    );
                                                                }) : (
                                                                        <React.Fragment>
                                                                            <img
                                                                                src={scoreTypesArray[0][Object.keys(scoreTypesArray[0])[0]]}
                                                                                alt="" />
                                                                            {
                                                                                scoreTypesArray[0][Object.keys(scoreTypesArray[0])[1]] &&
                                                                                <label><img
                                                                                    src={scoreTypesArray[0][Object.keys(scoreTypesArray[0])[1]]} /></label>
                                                                            }

                                                                        </React.Fragment>
                                                                    )
                                                            }
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
                                        {/*{item.win_game ?
                                            <figure><img className="icon-e"
                                                         src={HelperFunctions.getCurrencyImage(userInfo ? userInfo.currency : '')}/>
                                            </figure> : null}*/}
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

function getBoostImages(boosts, base_url) {
    let boostImageOverlay = null;
    if (boosts) {
        boosts.map((boost, boostIndex) => {
            let boostIcon = base_url + boost.item_name + "_overlay.png";
            boostImageOverlay = boostIcon;
        })
    }
    return boostImageOverlay;
}

export default GameHistory;