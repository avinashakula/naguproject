import React from 'react';
import { connect } from "react-redux";
import images from "../../../../assets/images";
import Reward from "../../../../commons/libs/gtg-reawards";
import Constants from "../../../../utils/Constants";
import HelperFunctions from '../../../../utils/HelperFunctions';
import Home from '../../screens/home';
import menu from '../../screens/menu';
import * as actions from "../actions";
import * as constants from "../constants";

class Congratulations extends React.Component {

    constructor(props) {
        super(props);
    }

    popupFlag = () => {
        this.props.togglePrizeCongratulationsPopup(false);
        //$("body").removeClass("show-modal");
    };


    rewardRef2 = (ref) => {
        this.reward2 = ref
        if (ref) {
            const time = setTimeout(() => {
                clearTimeout(time)
                if (this.reward2) {
                    this.reward2.rewardMe(window.innerWidth / 2, window.innerHeight * 0.7)
                }
            }, 1000);
        }
    }

    render() {
        const { congratulationsPrizePopup, leaderboardPrizesData } = this.props;
        const lbPrize = leaderboardPrizesData && leaderboardPrizesData.last_week_lb_prizes;
        // console.log(lbPrize, "lbPrize");
        return congratulationsPrizePopup && lbPrize ? (
            <div className="modal congra-modal skillzone-popup-visible" style={{ display: 'block' }}>
                <div className="modal-contenier">
                    <div className="modal-outer">
                        <div className="modal-body">
                            <div className="popup-info congra-info">
                                <div className="congra-content">
                                    <div className="congra-card">
                                        <div className="shiled">
                                            <figure className="badge-figure"><img src={images.trophyTwo} alt="" /> </figure>
                                        </div>
                                        <div className="congra-detail">
                                            <h2 className="congra-title"><span>CONGRaTULATIONS!</span></h2>
                                            <div className="congra-pre">
                                                <p className="congra-pre-text">
                                                    You won <span>{
                                                        lbPrize.prize_type === "cash" &&
                                                        HelperFunctions.getCurrency(leaderboardPrizesData.user_info.currency) + HelperFunctions.formatCurrency(lbPrize.amount)
                                                    }</span>

                                                    {/* {
                                                        lbPrize.prize_type === "powerup" && <span>1x Power Up </span>
                                                    } */}

                                                    {
                                                        lbPrize.prize_type === "gold" && <span> {lbPrize.amount ? lbPrize.amount + " Gold" : "100 Gold"}</span>
                                                    }

                                                    {
                                                        lbPrize.prize_type === "cash" && " in Cash "
                                                    }

                                                    during the week of <span>{lbPrize.date_range}</span>!
                                                    <br />
                                                    {lbPrize.credit_date && " Prize credited to your account on " + lbPrize.credit_date}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {
                                    lbPrize.mini_game_prizes && <div className="congra-bottom">
                                        <div className="congra-bottom-iiner">
                                            {lbPrize.gold_winner_prizes_text && <div className="congra-caption">
                                                <p className="congra-span">{lbPrize.gold_winner_prizes_text}</p>
                                            </div>}
                                            <div className="stats-card">
                                                <div className="stats-card-outer">
                                                    {
                                                        lbPrize.mini_game_prizes && lbPrize.mini_game_prizes.map((gameInfo, gameIndex) => {
                                                            return (
                                                                <div className="col" key={gameIndex}>
                                                                    <span className="stats-label">
                                                                        <figure className="title-figure"><img src={leaderboardPrizesData.base_url + "images/" + gameInfo.game.mini_game_logo} alt="" /></figure>
                                                                    </span>
                                                                    <div className="stats-bx">
                                                                        <div className="stats-sm-bx">
                                                                            <div className="sm-col"> <span className="stats-cp"><strong className="stats-value">{gameInfo.game.game_id === "mg" ? HelperFunctions.addPlusSign(gameInfo.high_score) : gameInfo.high_score}</strong>
                                                                                <p className="stats-pre">High score</p>
                                                                            </span> </div>
                                                                            <div className="sm-col"> <span className="stats-cp"><strong className="stats-value">{gameInfo.amount}</strong>
                                                                                <p className="stats-pre">Gold</p>
                                                                            </span> </div>
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
                                }
                            </div>
                        </div>
                        <a className="close-btn" onClick={this.popupFlag}><i className="icon pp-cross"></i></a> </div>
                    <div onClick={this.popupFlag} className="modal-overlay"></div>
                </div>
                <Reward onRef={this.rewardRef2} config={Constants.rewardsConfig.confetti} />
            </div>
        ) : null;
    }
}

const mapStateToProps = state => {
    return {
        leaderboardPrizesData: state[menu.constants.NAME].leaderboardPrizesData,
        congratulationsPrizePopup: state[constants.NAME].congratulationsPrizePopup,
    }
};

const mapDispatchToProps = dispatch => {
    return {
        togglePrizeCongratulationsPopup: (flag) => dispatch(actions.togglePrizeCongratulationsPopup(flag)),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Congratulations);
