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
                                                    const targetTypesArray = [];
                                                    let boostOverlay = null;
                                                    if (score_types && score_types.used_powers) {
                                                        boostOverlay = getBoostImages(score_types.used_powers, base_url);
                                                    }

                                                    let obj = {};

                                                    if (score_types.circle_target1_hit) {
                                                        let targetHitImg = images.plTarget1;
                                                        obj = { targetHitImg }
                                                        targetTypesArray.push(obj);
                                                    }

                                                    if (score_types.circle_target2_hit) {
                                                        let targetHitImg = images.plTarget2;
                                                        obj = { targetHitImg }
                                                        targetTypesArray.push(obj);
                                                    }

                                                    if (score_types.circle_target3_hit) {
                                                        let targetHitImg = images.plTarget3;
                                                        obj = { targetHitImg }
                                                        targetTypesArray.push(obj);
                                                    }

                                                    if (score_types.circle_target4_hit) {
                                                        let targetHitImg = images.plTarget4;
                                                        obj = { targetHitImg }
                                                        targetTypesArray.push(obj);
                                                    }

                                                    if (score_types.circle_target5_hit) {
                                                        let targetHitImg = images.plTarget5;
                                                        obj = { targetHitImg }
                                                        targetTypesArray.push(obj);
                                                    }

                                                    if (score_types.ground_target1_hit) {
                                                        let targetHitImg = images.plTarget1;
                                                        obj = { targetHitImg }
                                                        targetTypesArray.push(obj);
                                                    }

                                                    if (score_types.ground_target2_hit) {
                                                        let targetHitImg = images.plTarget2;
                                                        obj = { targetHitImg }
                                                        targetTypesArray.push(obj);
                                                    }

                                                    if (score_types.ground_target3_hit) {
                                                        let targetHitImg = images.plTarget3;
                                                        obj = { targetHitImg }
                                                        targetTypesArray.push(obj);
                                                    }

                                                    if (score_types.ground_target4_hit) {
                                                        let targetHitImg = images.plTarget4;
                                                        obj = { targetHitImg }
                                                        targetTypesArray.push(obj);
                                                    }

                                                    if (score_types.ground_target5_hit) {
                                                        let targetHitImg = images.plTarget5;
                                                        obj = { targetHitImg }
                                                        targetTypesArray.push(obj);
                                                    }

                                                    if (score_types.goal_hit) {
                                                        let goalHit = score_types.golden_net ? images.plGlowingGoalPost : images.plGoalPost;
                                                        if (boostOverlay) {
                                                            obj = { goalHit }
                                                        } else {
                                                            obj = { goalHit }
                                                        }
                                                        scoreTypesArray.push(obj);
                                                    }
                                                    if (score_types.goal_miss && scoreTypesArray.length === 0) {
                                                        let plCross = images.plCross;
                                                        if (boostOverlay) {
                                                            obj = { plCross }
                                                        } else {
                                                            obj = { plCross }
                                                        }
                                                        scoreTypesArray.push(obj);
                                                    }
                                                    if (scoreTypesArray.length === 0) {
                                                        let plCross = images.plCross;
                                                        obj = { plCross }
                                                        scoreTypesArray.push(obj);
                                                    }

                                                    /* let keysss = Object.keys(scoreTypesArray[0]);
                                                     console.log(keysss);
                                                     console.log(scoreTypesArray[0][keysss[1]]);*/
                                                    // const clas = 'extra-target' + (scoreTypesArray.length === 3 ? " three-targets" : scoreTypesArray.length === 2 ? " dubble-target" : '');

                                                    return (
                                                        <div key={index} className="target-icon">
                                                            <figure key={index} className="goal-icon">
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
                                                            <figure key={index + "score-icon"} className="score-icon">
                                                                {
                                                                    targetTypesArray.length > 0 ? targetTypesArray.map((item, index) => {
                                                                        let targetIcon = item[Object.keys(item)[0]];
                                                                        let boostOverlay = null;
                                                                        if (item[Object.keys(item)[1]]) {
                                                                            boostOverlay = item[Object.keys(item)[1]];
                                                                        }
                                                                        return (
                                                                            
                                                                                <img key={index} src={targetIcon} />
                                                                            
                                                                        );
                                                                    }) : null
                                                                }
                                                            </figure>
                                                            <figure key={index + "score-boost"} className="score-boost">
                                                                {
                                                                    boostOverlay != null ? <img key={index} src={boostOverlay} />: null
                                                                }
                                                            </figure>
                                                        </div>
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
            let boostIcon = base_url + boost.item_name.replace("puckluck_","") + ".png";
            boostImageOverlay = boostIcon;
        })
    }
    return boostImageOverlay;
}

export default GameHistory;