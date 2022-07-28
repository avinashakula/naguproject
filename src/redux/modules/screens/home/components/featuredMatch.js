import React, {PureComponent} from "react";
import OwlCarousel from "react-owl-carousel2";
import ContentLoader from "../../../../../commons/components/contentLoader";
import DateHelper from "../../../../../utils/DateHelper";
import $ from "jquery";
import HelperFunctions from "../../../../../utils/HelperFunctions";

class FeaturedMatch extends PureComponent {

    constructor(props) {
        super(props);

        this.currentMatchIndex = 0;

        this.innerCarTimer = null;

        this.options = {
            items: 1,
            autoplay: true,
            center: true,
            loop: false,
            nav: false,
            pagination: true,
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
            onChanged: (event) => {
                if (event.target.className.includes("facts-carousel-" + this.currentMatchIndex)) {
                    if (event.item.count === (event.item.index + 1)) {
                        this.innerCarTimer = setTimeout(() => {
                            if (this.innerCarTimer) {
                                clearTimeout(this.innerCarTimer);
                            }
                            this.jumpToNextMatch(this.currentMatchIndex >= this.props.funfacts.length - 1);
                        }, 5000);
                    } else {
                        if (this.innerCarTimer) {
                            clearTimeout(this.innerCarTimer);
                        }
                    }
                }
            }
        };

        this.mainOptions = {
            items: 1,
            autoplay: false,
            center: true,
            loop: false,
            nav: true,
            pagination: false,
            dots: false,
            autoHeight: false,
            autoWidth: false,
            margin: 0,
            touchDrag: false,
            mouseDrag: false,
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
            },
            navText: [
                '<span aria-label="' + 'prev' + '"><i class="icon pp-arrow-left match-prev"></i></span>',
                '<span aria-label="' + 'next' + '"><i class="icon pp-arrow-right match-next"></i></span>'
            ]
        };
        this.mainEvents = {
            onChanged: (event) => {
                if (event.item.index !== null) {
                    if (this.currentMatchIndex !== event.item.index) {
                        this.currentMatchIndex = event.item.index;
                        this.resetFacts();
                    }
                    // console.log("main item on changed " + event.item.index);
                }
            }
        };

        this.matchCarRef = null;
        this.matchFactCarRef = [];
    }

    resetFacts = () => {
        if (this.matchFactCarRef[this.currentMatchIndex]) {
            this.matchFactCarRef[this.currentMatchIndex].goTo(0);
        }
    }

    jumpToNextMatch = (flag) => {
        // console.log(this.currentMatchIndex, "this.currentMatchIndex");
        if (this.matchCarRef)
            if (flag) {
                this.matchCarRef.goTo(0);
            } else {
                this.matchCarRef.next();
            }

    }

    componentDidMount() {
        let self = this;
        $(document).on("click.myevent", ".match-next", function () {
            self.props.handleTracking("clicked_next_featured-match");
        });

        $(document).on("click.myevent", ".match-prev", function () {
            self.props.handleTracking("clicked_prev_featured-match");
        });

        $(document).on("click.myevent", ".facts-carousel .owl-dot", function () {
            self.props.handleTracking("clicked_featured-match-funfacts");
        });
    }

    componentWillUnmount() {
        $(document).off("click.myevent", ".match-next");
        $(document).off("click.myevent", ".match-prev");
        $(document).off("click.myevent", ".facts-carousel .owl-dot");
        // console.log('unmounted');
        if (this.innerCarTimer) {
            clearTimeout(this.innerCarTimer);
        }
    }

    addToBetSlip = (url, trackingInfo) => {
        // console.log(trackingInfo)
        this.props.handleTracking("add_to_betslip", trackingInfo)
        if (url) {
            // window.location.href = url;
        }
    }

    render() {
        const {funfacts} = this.props;
        // console.log(funfacts, "funfacts");
        return (
            <div className="card-info featured-match-info">
                {
                    funfacts ? funfacts === 404 ? null : <React.Fragment>
                        <div className="title animated slideInUpLess">
                            <h2 className="card-title">Featured Matches</h2>
                        </div>
                        <div className="card-outer animated slideInUpLess">
                            <div className="wcard">
                                <OwlCarousel className={"featured-item-block featured-carousel"}
                                             ref={r => {
                                                 this.matchCarRef = r
                                             }} options={this.mainOptions}
                                             events={this.mainEvents}>
                                    {
                                        funfacts.map((match, index) => {

                                            const childOptions = HelperFunctions.copyObject(this.options);
                                            if (index === this.currentMatchIndex) {
                                                childOptions.loop = false;
                                                childOptions.autoplay = true;
                                            }

                                            return (
                                                <div className="featured-item" key={index} data-match={index}
                                                     data-total-match={funfacts.length}>
                                                    <div className="featured-match-card">
                                                        <div className="match-card">
                                                            <div className="match-teams">
                                                                <div className="match-vanue">
                                                                    <span>{match.league.replace("Soccer", "Football")}</span>
                                                                </div>
                                                                <div className="match-teams-outer">
                                                                    <div className="col tm-one">
                                                                        <div className="team-block">
                                                                            <div className="team-name"><span
                                                                                className="name-label">{match.home.name}</span>
                                                                            </div>
                                                                            <div className="team-figure">
                                                                                <figure className="icon-figure"><img
                                                                                    src={match.home.icon} alt=""/>
                                                                                </figure>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div className="col-md"><span
                                                                        className="vs-at">Vs</span></div>
                                                                    <div className="col tm-two">
                                                                        <div className="team-block">
                                                                            <div className="team-name"><span
                                                                                className="name-label">{match.away.name}</span>
                                                                            </div>
                                                                            <div className="team-figure">
                                                                                <figure className="icon-figure"><img
                                                                                    src={match.away.icon} alt=""/>
                                                                                </figure>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="vanue-place">
                                                                <span className="vanue-time">
                                                                    {/* June 17, 2020, 7:45 pm */}
                                                                    {` ${DateHelper.formatDateForFunfacts(match.local_date)} ${DateHelper.convertTimeTo12HourFrom24Hour(match.local_time)}`}
                                                                </span>
                                                                <div className="vanue-stadium"><i
                                                                    className="icon pp-stadium"></i><span>{match.venue.name}</span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="funfact-info">
                                                            <h3 className="funfact-title">Fun Facts</h3>
                                                            <div className="funfact">
                                                                {/* <div className="funfact-outer facts-carousel"> */}
                                                                <OwlCarousel
                                                                    className={`funfact-outer facts-carousel ${'facts-carousel-' + index}`}
                                                                    ref={r => {
                                                                        this.matchFactCarRef[index] = r
                                                                        // r.$car._plugins.autoplay._handlers["stop.owl.autoplay"]();
                                                                    }}
                                                                    options={this.options}
                                                                    events={this.events}>
                                                                    {
                                                                        match.funfacts.map((fact, factIndex) => {
                                                                            // console.log(fact)
                                                                            return (
                                                                                <div className="funfact-item"
                                                                                     key={factIndex}
                                                                                     data-facts={factIndex + 1}
                                                                                     data-total-facts={match.funfacts.length}>
                                                                                    <div className="funfact-line">
                                                                                        <p>{fact.fact}</p>
                                                                                    </div>
                                                                                    {/* {
                                                                                        fact.target_bet.fractionOdds && <div className="block">
                                                                                            <div className="odds-btn">
                                                                                                <p className="odds-pre">{fact.target_bet.market}</p>
                                                                                                <div style={{ cursor: "pointer" }} onClick={this.addToBetSlip.bind(this, fact.target_bet.betSlipURL, fact.target_bet.trackingData)} className="funfuct-bx">
                                                                                                    <p className="odds-type">{fact.target_bet.result}</p>
                                                                                                    <span>{fact.target_bet.fractionOdds}</span>
                                                                                                </div>
                                                                                            </div>
                                                                                        </div>
                                                                                    } */}
                                                                                </div>
                                                                            )
                                                                        })
                                                                    }

                                                                </OwlCarousel>
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
                    </React.Fragment> : <ContentLoader loaderType={"content-relative"}/>
                }
            </div>
        );
    }
}

export default FeaturedMatch;