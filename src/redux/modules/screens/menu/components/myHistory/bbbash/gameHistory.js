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
                                        <div className="icon-history baseball-history">
                                            {
                                                item.rounds && item.rounds.map((item, index) => {

                                                    const score_types = item.score_types;

                                                    const scoreTypesArray = [];
                                                    let boostOverlay = null;
                                                    if (score_types && score_types.used_powers) {
                                                        boostOverlay = getBoostImages(score_types.used_powers, base_url);
                                                    }

                                                    let obj = {};

                                                    if (item.hit_type != -1) {

                                                        if(item.hit_type == 0) {
                                                            let foul = images.bbFouls;
                                                            if (boostOverlay) {
                                                                // obj = { foul, boostOverlay }
                                                                obj = { foul }
                                                            } else {
                                                                obj = { foul }
                                                            }
                                                        }

                                                        if(item.hit_type == 1) {
                                                            let single = images.bbSingle;
                                                            if (boostOverlay) {
                                                                // obj = { single, boostOverlay }
                                                                obj = { single }
                                                            } else {
                                                                obj = { single }
                                                            }
                                                        }

                                                        if(item.hit_type == 2) {
                                                            let double = images.bbDouble;
                                                            if (boostOverlay) {
                                                                // obj = { double, boostOverlay }
                                                                obj = { double }
                                                            } else {
                                                                obj = { double }
                                                            }
                                                        }

                                                        if(item.hit_type == 3) {
                                                            let triples = images.bbTriples;
                                                            if (boostOverlay) {
                                                                // obj = { triples, boostOverlay }
                                                                obj = { triples }
                                                            } else {
                                                                obj = { triples }
                                                            }
                                                        }

                                                        if(item.hit_type == 4) {
                                                            let homeRun = images.bbHomeRun;
                                                            if (boostOverlay) {
                                                                // obj = { homeRun, boostOverlay }
                                                                obj = { homeRun }
                                                            } else {
                                                                obj = { homeRun }
                                                            }
                                                        }

                                                        scoreTypesArray.push(obj);

                                                    } else {

                                                        if(item.out_type == -1) {
                                                            let strikeOuts = images.bbStrikeOuts;
                                                            if (boostOverlay) {
                                                                // obj = { strikeOuts, boostOverlay }
                                                                obj = { strikeOuts }
                                                            } else {
                                                                obj = { strikeOuts }
                                                            }
                                                        }

                                                        if(item.out_type == 1) {
                                                            let strikeOuts = images.bbStrikeOuts;
                                                            if (boostOverlay) {
                                                                // obj = { strikeOuts, boostOverlay }
                                                                obj = { strikeOuts }
                                                            } else {
                                                                obj = { strikeOuts }
                                                            }
                                                        }

                                                        if(item.out_type == 2) {
                                                            let flyout = images.bbFlyOut;
                                                            if (boostOverlay) {
                                                                // obj = { flyout, boostOverlay }
                                                                obj = { flyout }
                                                            } else {
                                                                obj = { flyout }
                                                            }
                                                        }

                                                        scoreTypesArray.push(obj);
                                                    }

                                                    if (scoreTypesArray.length === 0) {
                                                        let fouls = images.bbFouls;
                                                        obj = { fouls }
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
                                                                                <span key={index + "score-boost"} className="score-boost">
                                                                                    {
                                                                                        boostOverlay != null ? <img key={index} src={boostOverlay} />: null
                                                                                    }
                                                                                </span>
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
            let boostIcon = base_url + boost.item_name.replace("bbbash_","") + ".png";
            boostImageOverlay = boostIcon;
        })
    }
    return boostImageOverlay;
}

export default GameHistory;