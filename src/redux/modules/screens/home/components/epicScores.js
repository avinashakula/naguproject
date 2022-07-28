import React, { Component } from 'react';
import OwlCarousel from 'react-owl-carousel2';
import images from '../../../../../assets/images';
import ContentLoader from '../../../../../commons/components/contentLoader';
import HelperFunctions from '../../../../../utils/HelperFunctions';

class EpicScores extends Component {

    constructor(props) {
        super(props);

        this.options = {
            items: 1,
            autoplay: true,
            center: true,
            loop: true,
            nav: false,
            pagination: false,
            dots: true,
            autoHeight: false,
            autoWidth: false,
            margin: 0,
            responsive: {
                0: {
                    items: 1
                },
                640: {
                    items: 1
                },
                767: {
                    items: 1
                },
                1200: {
                    items: 1
                },
                1600: {
                    items: 1
                },
            }
        };
        this.events = {

        };
    }

    toggleHowTo = () => {
        this.props.handleHowToPopup(true, null, 9);
    }

    render() {
        const { stats } = this.props;
        // console.log(stats, "stats");
        return (
            <React.Fragment>
                {
                    stats && stats.epicScores && <div className="card-info epic-scores-info desk-half-coll">
                        {
                            stats ?
                                stats.epicScores && <React.Fragment>
                                    <div className="title">
                                        <h2 className="card-title animated slideInUpLess"><span>Epic Scores</span></h2>
                                    </div>
                                    <div className="card-outer">
                                        <div className="wcard animated slideInUpLess">
                                            <OwlCarousel className={"epic-scores-block game-score-carousel"} ref="car" options={this.options} events={this.events}>

                                                {
                                                    stats.epicScores.map((games, index) => {
                                                        // console.log(games)

                                                        // console.log(timer, "timer");
                                                        return (
                                                            <div className="epic-item" key={index}>
                                                                <div className="epic-scores-users">
                                                                    <div className="epic-scores-logo">
                                                                        <figure className="scores-figure">
                                                                            <img src={stats.basePath + "images/" + games.game.mini_game_logo} alt="" />
                                                                        </figure>
                                                                    </div>

                                                                    <div className="stats-card">
                                                                        <div className="stats-card-outer">

                                                                            {
                                                                                games.last_week && <div className="col">
                                                                                    <span className="stats-label">
                                                                                        {/* {games.game.game_id === "mg" ? "Quickest Round " : "Highest Score "} Last Week */}
                                                                                        Highest Score Last Active Week
                                                                                    </span>
                                                                                    <div className="stats-bx">
                                                                                        <span className="stats-cp">
                                                                                            <strong>
                                                                                                {
                                                                                                    games.game.game_id === "mg" ? HelperFunctions.addPlusSign(games.last_week.score) :
                                                                                                        HelperFunctions.numberFormatter(games.last_week.score)
                                                                                                }
                                                                                            </strong>

                                                                                            {
                                                                                                games.last_week.played_time && getCounterHTML(games.last_week.played_time)
                                                                                            }

                                                                                            <p className="stats-pre"><i className="icon pp-user"></i><label>{games.last_week.user_name}</label></p>

                                                                                        </span></div>
                                                                                </div>
                                                                            }

                                                                            {
                                                                                games.this_week ? <div className="col">
                                                                                    <span className="stats-label">
                                                                                        {/* {games.game.game_id === "mg" ? "Quickest Round " : "Highest Score "} This Week */}
                                                                                        Highest Score This Week
                                                                                    </span>
                                                                                    <div className="stats-bx">
                                                                                        <span className="stats-cp">

                                                                                            <strong>
                                                                                                {
                                                                                                    games.game.game_id === "mg" ? HelperFunctions.addPlusSign(games.this_week.score) :
                                                                                                        HelperFunctions.numberFormatter(games.this_week.score)
                                                                                                }
                                                                                            </strong>
                                                                                            {
                                                                                                games.this_week.played_time && getCounterHTML(games.this_week.played_time)
                                                                                            }

                                                                                            <p className="stats-pre"><i className="icon pp-user"></i><label>{games.this_week.user_name}</label></p>
                                                                                        </span>
                                                                                    </div>
                                                                                </div> :
                                                                                    games.last_week ? <div className="col"><span className="stats-label">Bonus Gold</span>
                                                                                        <div className="bonus-col">
                                                                                            <div className="gold-stats">
                                                                                                <figure className="gold-badge"><img src={images.starBadge} alt="" /></figure>
                                                                                                <div className="gold-top"> <span className="gold-point">{games.last_week.prize}</span></div>
                                                                                            </div>
                                                                                            <a className="card-play" onClick={this.toggleHowTo}><span className="btn primary-btn">Learn More</span> </a>
                                                                                        </div>
                                                                                    </div> : null

                                                                            }
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        )
                                                    })
                                                }
                                            </OwlCarousel>
                                        </div>
                                    </div>
                                </React.Fragment>
                                :
                                <ContentLoader loaderType={"content-relative"} />
                        }
                    </div>
                }

            </React.Fragment>
        );
    }
}

function getCounterHTML(timer) {
    const cTimer = HelperFunctions.msToTime(timer);
    // console.log(cTimer, "cTimer")
    return (
        <div className="countdown-box">
            <div className="countdown">
                {cTimer.hour !== "00" && cTimer.hour !== "0" && <div className="col"> <strong>{cTimer.hour}</strong> <span>h</span> </div>}
                <div className="col"> <strong>{cTimer.min}</strong> <span>m</span> </div>
                <div className="col"> <strong>{cTimer.sec}</strong> <span>s</span> </div>
                <div className="col"> <strong>{cTimer.milisec}</strong> <span>ms</span> </div>
            </div>
        </div>
    )
}

export default EpicScores;