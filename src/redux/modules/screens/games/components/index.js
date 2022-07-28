import React from 'react';
import OwlCarousel from 'react-owl-carousel2';
import images from "../../../../../assets/images";
import ContentLoader from "../../../../../commons/components/contentLoader/index";
import ImagePreload from '../../../../../commons/components/imagePreload/imagePreload';
import PPHeadCard from "../../../../../commons/components/ppHeadCard";
import HelperFunctions from '../../../../../utils/HelperFunctions';
import StartUpPopups from '../../../common/startupScreens';
import UserPopup from '../../../common/startupScreens/userPopup';
// import GameCard from './gameCard';
import GameDetails from './gameDetails';
import $ from "jquery";
import Constants from '../../../../../utils/Constants';

export default class Games extends React.Component {

    constructor(props) {
        super(props);
        this.activeIndex = 0;
        this.totalItems = 0;
        this.state = {
            loaderFlag: false,
            showNickNamePopup: false
        }

        this.options = {
            items: 1,
            autoplay: false,
            center: true,
            loop: false,
            nav: false,
            pagination: false,
            dots: false,
            autoHeight: false,
            autoWidth: false,
            margin: 0,
            mouseDrag: false,
            touchDrag: false,
            animateOut: "fadeOut",
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
                this.totalItems = event.item.count;
                this.activeIndex = event.item.index;

                if (event.item.index === 0) {
                    $(".prev-games").addClass("disabled-nav");
                } else {
                    $(".prev-games").removeClass("disabled-nav");
                }

                if (event.item.count === (event.item.index + 1)) {
                    $(".next-games").addClass("disabled-nav");
                } else {
                    $(".next-games").removeClass("disabled-nav");
                }
            }
        };

        this.matchCarRef = null;

    }

    jumpToNext = (isPresseNext) => {
        if (isPresseNext) {
            this.activeIndex++;
        } else {
            this.activeIndex--;
        }

        if (this.matchCarRef)
            this.matchCarRef.goTo(this.activeIndex);

        var currDate = $(".owl-item.active").find(".card-info").attr("data-week-date");
        $(".current-week").html(currDate);
    }

    tracking = (game) => {
        let userBenefits = this.props.userBenefits;
        let userNameCase = (userBenefits && (userBenefits.display_name === undefined || userBenefits.is_username_censor))

        if (userNameCase) {
            this.props.toCheckWhichGameClicked(game)
            this.props.toCheckNicknameAvailable();
        } else {
            this.props.userTracking("all-games_" + game);
            this.setState({
                loaderFlag: true
            })
            setTimeout(function () {
                window.location.href = HelperFunctions.getRedirectGameURL(game);
            }, 1000)
        }
    }



    callGamesAPI = () => {
        this.props.getGames();
    }

    render() {
        const { games, userPopups, gamesDataLoading, disableLoader, isNickNameAvailable, activeWT } = this.props;
        const { loaderFlag } = this.state;
        // console.log(activeWT, "activeWT")
        const gamesImgArr = games && games.gamesImg;
        if (gamesImgArr)
            gamesImgArr.push(images.ppSkillLogo);

        // if(activeWT && (activeWT.includes(Constants.sz_gold_wt) || activeWT.includes(Constants.sz_xp_wt))) {
        //     HelperFunctions.toggleWTBodyClass(true);
        //     HelperFunctions.toggleBodyGrayedOutClass(true);
        // } else if(userPopups && (userPopups.sz_gold_wt && userPopups.sz_xp_wt)) {
        //     HelperFunctions.toggleBodyGrayedOutClass(false);
        // }
        // else {
        //     HelperFunctions.toggleWTBodyClass(false);
        // }

        //add class on body if all wal
        return loaderFlag ? <ContentLoader /> : (
            <React.Fragment>
                <div className="mid-wrapper">
                    <PPHeadCard title={"Games"} />
                    <div className="container">
                        <div className="block game-widget">
                            {
                                games ? (gamesDataLoading ? <React.Fragment>
                                    <ContentLoader loaderType={"content-relative"} />
                                    <ImagePreload disableLoader={disableLoader} images={gamesImgArr} />
                                </React.Fragment> :

                                    games.fourGamesData && <React.Fragment>
                                        {
                                            games.fourGamesData && games.fourGamesData.length > 0 && <div className="card-info current-week-info">
                                                {/* <div className="wcard animated fadeIn">
                                                    <div className="current-week-card">
                                                        <div className="current-select-label">
                                                            disabled-nav
                                                            <i className="icon prev-games prev-icon pp-arrow-left" onClick={this.jumpToNext.bind(this, false)}></i>
                                                            <span className="current-week" dangerouslySetInnerHTML={{ __html: games.fourGamesData[0].weekDate }}></span>
                                                            <i className="icon next-games next-icon pp-arrow-right" onClick={this.jumpToNext.bind(this, true)}></i>
                                                        </div>
                                                    </div>
                                                </div> */}
                                            </div>
                                        }


                                        <div className={`current-games-item-block current-games-carousel`}>

                                            {
                                                games.fourGamesData && games.fourGamesData.length > 0 && games.fourGamesData.map((gamesType, gamesIndex) => {
                                                    return (
                                                        <div className="current-games-item" key={gamesIndex}>
                                                            {
                                                                gamesType && gamesType.gameInfo && gamesType.gameInfo.map((weekGames, weekIndex) => {
                                                                    return (
                                                                        <GameDetails
                                                                            weekDate={gamesType.weekDate}
                                                                            weekGames={weekGames}
                                                                            isCurrentWeek={gamesType.isCurrentWeek}
                                                                            weekIndex={weekIndex}
                                                                            callGamesAPI={this.callGamesAPI}
                                                                            tracking={this.tracking.bind(this)}
                                                                            activeWT={activeWT}
                                                                            key={weekIndex} />
                                                                    )
                                                                })
                                                            }
                                                        </div>
                                                    )
                                                })
                                            }


                                            {/* <div className="current-games-item">
                                                {
                                                    games.fourGamesData.nextWeekGames && games.fourGamesData.nextWeekGames.gameInfo && games.fourGamesData.nextWeekGames.gameInfo.map((weekGames, weekIndex) => {
                                                        return (
                                                            <GameDetails
                                                                weekDate={games.fourGamesData.nextWeekGames.weekDate}
                                                                weekGames={weekGames}
                                                                weekIndex={weekIndex}
                                                                callGamesAPI={this.callGamesAPI}
                                                                tracking={this.tracking.bind(this)}
                                                                key={weekIndex} />
                                                        )
                                                    })
                                                }
                                            </div> */}
                                        </div>
                                    </React.Fragment>
                                ) : <ContentLoader loaderType={"content-relative"} />

                            }


                        </div>
                    </div>
                </div>

                <StartUpPopups />
                {isNickNameAvailable && <UserPopup />}
            </React.Fragment>
        )
    }
}
