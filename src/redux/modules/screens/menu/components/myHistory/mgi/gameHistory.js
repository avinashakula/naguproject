import React, {Component} from 'react';
import images from "../../../../../../../assets/images";
import HelperFunctions from "../../../../../../../utils/HelperFunctions";
import ContentLoader from "../../../../../../../commons/components/contentLoader";
import MiniLoader from "../../../../../../../commons/components/miniLoader";

class GameHistory extends Component {
    render() {
        const {monthIndex, index, games, userInfo, seasonIndex, base_url} = this.props;
        return (
            <div className="accordion-content accordian-inner-content"
                 id={"inner_content_" + seasonIndex + "_" + monthIndex + "_" + index}>
                <ul className="game-history-list">
                    {!games ?
                        games === null ?
                            <li style={{paddingTop: '10px', paddingBottom: '10px', textAlign: 'center'}}>No game played on this day.</li>
                            :
                            <ContentLoader loaderType={'content-relative'} />
                        :
                        games && games[0] && games[0].holes.map((item, j) => {
                            return (
                                <li key={j}>
                                    <div className="col col-day">
                                        <span>Hole {item.hole_no}</span>
                                    </div>
                                    <div className="col col-date">
                                        <div className="icon-history">
										{item.result.score === 0 ? "E" : HelperFunctions.addPlusSign(item.result.score)}
                                        </div>
                                    </div>
                                    <div className="col col-prize">
                                        {item.result.result}
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