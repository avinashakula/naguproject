import React, { Component } from 'react';
import ContentLoader from '../../../../../commons/components/contentLoader';
import ImagePreload from '../../../../../commons/components/imagePreload/imagePreload';
import WalkThrough from '../../../../../commons/components/walkthrough';
import DateHelper from '../../../../../utils/DateHelper';
import HelperFunctions from '../../../../../utils/HelperFunctions';
import TimeCounter from '../../../common/countDown/timeCounter';

class FeaturedGame extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loaderFlag: false
        }
    }

    tracking = (game) => {

        let userBenefits = this.props.userBenefits;
        let userNameCase = (userBenefits && (userBenefits.display_name === undefined || userBenefits.is_username_censor))

        if (userNameCase) {
            console.log("nickname")
            this.props.handleNicknamePopup(game);
        } else {
            this.props.handleTracking(game);

            this.setState({
                loaderFlag: true
            });
            setTimeout(function () {
                window.location.href = HelperFunctions.getRedirectGameURL(game);
            }, 1000)
        }
    };

    render() {
        const { featuredGame, disableLoader, featuredGamesImg, gamesDataLoading, gameWT } = this.props;
        const { loaderFlag } = this.state;

        // console.log(featuredGame, "featuredGame")
        return loaderFlag ? <ContentLoader /> : (
            <div className="card-info featured-game-card animated slideInUpLess">

                <div className="title">
                    <h2 className="card-title"><span className="mob">Featured Game</span>
                        <span className="desk">Featured Games</span></h2>
                </div>
                {
                    featuredGame ? (gamesDataLoading ? <React.Fragment>
                        <ContentLoader loaderType={"content-relative"} />
                        <ImagePreload disableLoader={disableLoader} images={featuredGamesImg} />
                    </React.Fragment> :
                        <div className="card-outer">
                            <ul className="game-listing">
                                {
                                    featuredGame.map((game, index) => {
                                        let releaseTime = null;
                                        if (game.upcoming_date && game.is_upcoming_week) {
                                            releaseTime = DateHelper.calculateMatchDateTimeDifferenceFromCurrent(DateHelper.getDateFromStringMoment(game.upcoming_date));
                                        }
                                        return (
                                            <li className={`${index === 0 && "game-card-wt"} walkthrought-item ${gameWT && index === 0 && "wt-show"} ${releaseTime && "disable-game"}`} key={index}>
                                                <div className="game-card animated slideInUpLess">
                                                    <a onClick={releaseTime ? null : this.tracking.bind(this, game.game_url)} className="game-card-outer">
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
                                                                <div className="card-play">
                                                                    {
                                                                        releaseTime ?
                                                                            <React.Fragment>
                                                                                <h3 className="countdown-title">Coming Soon</h3>
                                                                                <TimeCounter timerValue={releaseTime} onComplete={this.makeGameActive} />
                                                                            </React.Fragment>
                                                                            : <React.Fragment>

                                                                                {
                                                                                    game.game_score && <span className="score-today">Score Today: {game.game_score}</span>
                                                                                }

                                                                                <span className={`btn ${game.btn_class} ${game.game_score || game.is_season_completed ? "yellow-btn" : "primary-btn"}`}>{game.game_card_text ? game.game_card_text : game.game_score || game.is_season_completed ? "Open" : "Play Now"}</span>
                                                                            </React.Fragment>
                                                                    }
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </a></div>
                                                    <WalkThrough wtText={"You can play a range of games once per day in the Game Center."} />

                                            </li>
                                        )

                                    })
                                }

                            </ul>
                        </div>) : <ContentLoader loaderType={"content-relative"} />
                }
            </div>
        );
    }
}

export default FeaturedGame;