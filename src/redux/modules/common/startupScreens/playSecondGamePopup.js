import React, { Component } from 'react';
import menu from '../../screens/menu';
import * as actions from "../actions";
import { connect } from "react-redux";
import * as constants from "../constants";
import OwlCarousel from 'react-owl-carousel2';
import ProjectRoutes from '../../../../config/routes/projectRoutes';
import ContentLoader from '../../../../commons/components/contentLoader';
import HelperFunctions from '../../../../utils/HelperFunctions';

class PlaySecondGamePopup extends Component {

    constructor(props) {
        super(props);

        this.options = {
            items: 3,
            autoplay: false,
            center: false,
            loop: false,
            nav: true,
            pagination: true,
            dots: true,
            autoHeight: false,
            autoWidth: false,
            margin: 0,
            navText: [
                '<span aria-label="' + 'prev' + '"><i class="icon pp-arrow-left"></i></span>',
                '<span aria-label="' + 'next' + '"><i class="icon pp-arrow-right"></i></span>'
            ],
            responsive: {
                0: {
                    items: 2,

                },
                768: {
                    items: 2,

                },
                1025: {
                    items: 3,

                }
            }
        };
        this.events = {

        };

        this.state = {
            loaderFlag: false
        }
    }

    toggleFAQ = () => {
        this.props.handleHowToPopup(true, ProjectRoutes.leaderboard.url);
    }

    close = () => {
        this.props.toggleOneGamePlayedPopup(false);
    }

    tracking = (game) => {
        var self = this;
        this.props.userTracking("from_one_time_played_" + game);

        this.setState({
            loaderFlag: true
        });

        setTimeout(function () {
            self.close();
            window.location.href = HelperFunctions.getRedirectGameURL(game);
        }, 1500)
    }

    render() {
        const { oneGamePlayedPopup, leaderboardPrizesData } = this.props;
        const { loaderFlag } = this.state;
        const userPlayedData = leaderboardPrizesData && leaderboardPrizesData.user_played_game;
        
        // const gameType = userPlayedData && (userPlayedData.played_game.game_id === "hg" || userPlayedData.played_game.game_id === "hgo") ? (userPlayedData.played_game.game_id === "hg" ? " Indoor" : " Outdoor") : "";
        return userPlayedData && oneGamePlayedPopup ? (
            <React.Fragment>
                {
                    loaderFlag ? <ContentLoader /> :
                        <div className="modal first-time-modal animated fadeIn faster skillzone-popup-visible" style={{ display: "block" }}>
                            <div className="modal-contenier animated bounceIn">
                                <div className="modal-outer">
                                    <div className="modal-body">
                                        <div className="popup-info">
                                            <div className="modal-head">
                                                <h2 className="modal-head-title">Play A Second Game</h2>
                                            </div>
                                            <div className="first-time-content">
                                                {
                                                    userPlayedData.played_game && <p>
                                                        You have only played one game ({userPlayedData.played_game.game_name}) so far in the new Game Center. Your best two games contribute to prizes on weekly leaderboards. Make sure you try out some of our other games for your chance to share in great prizes!</p>
                                                }

                                                <div className="games-info">
                                                    <div className="games-scroll-content">
                                                        <div className="games-scroll-wrap">
                                                            <div className="games-scroll-container">
                                                                <OwlCarousel className={"games-list game-carousel"} ref="car" options={this.options} events={this.events}>

                                                                    {
                                                                        userPlayedData.cta_games && userPlayedData.cta_games.map((game, index) => {
                                                                            return (
                                                                                <div className="col" key={index} onClick={this.tracking.bind(this, game.game_url)}>
                                                                                    <div className="games">
                                                                                        <figure className="game-figure">
                                                                                            <img src={leaderboardPrizesData.base_url + "images/" + game.game_card} alt="" />
                                                                                        </figure>
                                                                                    </div>
                                                                                </div>
                                                                            )
                                                                        })
                                                                    }


                                                                </OwlCarousel>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="button-bar">
                                                    <div className="button-bar-outer">
                                                        <div className="col"><a onClick={this.toggleFAQ} className="btn primary-btn">Learn More</a></div>
                                                        <div className="col"><a onClick={this.close} className="btn bdr-btn">Okay, Thanks</a></div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                }
            </React.Fragment>

        ) : null;
    }
}

const mapStateToProps = state => {
    return {
        leaderboardPrizesData: state[menu.constants.NAME].leaderboardPrizesData,
        oneGamePlayedPopup: state[constants.NAME].oneGamePlayedPopup,
        userPopups: state[constants.NAME].userPopups,
    }
};

const mapDispatchToProps = dispatch => {
    return {
        toggleOneGamePlayedPopup: (flag) => dispatch(actions.toggleOneGamePlayedPopup(flag)),
        handleHowToPopup: (isShow, current_page_url, indexToShow) => dispatch(actions.handleHowToPopup(isShow, current_page_url, indexToShow)),
        userTracking: (actionVal, propObj) => dispatch(actions.userTracking(actionVal, propObj)),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(PlaySecondGamePopup);