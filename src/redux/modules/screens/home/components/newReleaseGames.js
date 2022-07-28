import React, {PureComponent} from 'react';
import ContentLoader from '../../../../../commons/components/contentLoader';
import ImagePreload from '../../../../../commons/components/imagePreload/imagePreload';
import Reward from "../../../../../commons/libs/gtg-reawards";
import Constants from "../../../../../utils/Constants";
import DateHelper from "../../../../../utils/DateHelper";
import HelperFunctions from '../../../../../utils/HelperFunctions';
import TimeCounter from "../../../common/countDown/timeCounter";

class NewReleaseGames extends PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            loaderFlag: false,
            isActive: false,
        }
    }

    tracking = (game) => {
        if (this.state.isActive) {
            this.props.handleTracking(game);

            this.setState({
                loaderFlag: true
            });
            setTimeout(function () {
                window.location.href = HelperFunctions.getRedirectGameURL(game);
            }, 1000)
        }
    };

    makeGameActive = () => {
        this.setState({isActive: true});
    };

    rewardRef1 = (ref) => {
        if (ref) {
            this.time = setTimeout(() => {
                clearTimeout(this.time);
                if (ref) {
                    ref.rewardMe('50%', '100%')
                }
            }, 1000);
        }
    };

    render() {
        const {upcomingGame, disableLoader, upcomingGamesImg, gamesDataLoading} = this.props;
        const {loaderFlag, isActive} = this.state;

        // console.log(upcomingGame, "featuredGame")
        return loaderFlag ? <ContentLoader/> : (
            <div className="card-info game-release-card animated slideInUpLess">

                <div className="title">
                    <h2 className="card-title">
                        <span className="mob">New Game Release</span>
                        <span className="desk">New Game Release</span>
                    </h2>
                </div>
                {
                    upcomingGame ? (gamesDataLoading ? <React.Fragment>
                            <ContentLoader loaderType={"content-relative"}/>
                            <ImagePreload disableLoader={disableLoader} images={upcomingGamesImg}/>
                        </React.Fragment> :
                        <div className="card-outer">
                            <ul className="game-listing">
                                {
                                    upcomingGame.map((game, index) => {
                                        let releaseTime = DateHelper.calculateMatchDateTimeDifferenceFromCurrent(DateHelper.getDateFromStringMoment(game.release_time));
                                        return (
                                            <li key={index} className={`${isActive ? "" : 'disable-game'}`}>
                                                <div className="game-card animated slideInUpLess">
                                                    <a onClick={this.tracking.bind(this, game.game_url)} className="game-card-outer">
                                                        <div className="game-bg">
                                                            <figure className="image-figure"><img src={game.game_banner_path} alt=""/></figure>
                                                        </div>
                                                        <div className="card-content">
                                                            <div className="game-content-inner">
                                                                {
                                                                    (game.game_id === "hg" || game.game_id === "hgo") &&
                                                                    <div className="game-heading"><h3 className="title-label">{game.game_id === "hg" ? "Indoor" : "Outdoor"}</h3></div>
                                                                }
                                                                <div className="card-game-logo">
                                                                    <figure className="logo-figure"><img src={game.game_logo_path} alt=""/></figure>
                                                                </div>

                                                                <div className="card-play">
                                                                    {isActive ? <span className={`btn primary-btn animated slideInUpLess`}>{"Play Now"}</span> :
                                                                        <TimeCounter timerValue={releaseTime} onComplete={this.makeGameActive}/>}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </a>
                                                    {isActive && <Reward onRef={this.rewardRef1} config={Constants.rewardsConfig.confetti}/>}
                                                </div>
                                            </li>
                                        )
                                    })
                                }
                            </ul>
                        </div>) : <ContentLoader loaderType={"content-relative"}/>
                }
            </div>
        );
    }
}

export default NewReleaseGames;