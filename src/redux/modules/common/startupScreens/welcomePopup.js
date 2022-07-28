import $ from 'jquery';
import React, { Component } from 'react';
import OwlCarousel from 'react-owl-carousel2';
import { connect } from "react-redux";
import images from '../../../../assets/images';
import ContentLoader from '../../../../commons/components/contentLoader';
import Reward from "../../../../commons/libs/gtg-reawards";
import Constants from "../../../../utils/Constants";
import HelperFunctions from '../../../../utils/HelperFunctions';
import home from '../../screens/home';
import menu from '../../screens/menu';
import LbPrizes from '../../screens/menu/components/lbPrizes';
import * as actions from "../actions";
import * as constants from "../constants";
import ImagePreload from '../../../../commons/components/imagePreload/imagePreload';

class WelcomeScreen extends Component {

    constructor(props) {
        super(props);

        this.options = {
            items: 1,
            autoplay: false,
            center: true,
            loop: false,
            nav: true,
            pagination: false,
            dots: false,
            autoHeight: false,
            autoWidth: false,
            margin: 20,
            navText: [
                '<div class="col ' + 'col-first' + '"><a class="btn white-btn">Back</a></div>',
                '<div class="col ' + 'col-first' + '"><a class="btn primary-btn">Next</a></div>'
            ]
        };
        this.totalItems = null;
        this.currentItemIndex = null;
        this.isClickedOnClaimNow = false;
        this.events = {
            onChanged: (event) => {
                let self = this;
                setTimeout(function () {
                    let element = document.getElementsByClassName("owl-next");
                    if (element[0] && !self.isClickedOnClaimNow) {
                        // console.log(event.item.count, event.item.index);
                        if (event.item.count === (event.item.index + 1)) {
                            // console.log("in side", element[0]);
                            $(".owl-next .col-first a").text("I'M Ready");
                            $(".owl-next").addClass("claim");
                            $(".owl-next").removeClass("disabled");
                        } else {
                            $(".owl-next .col-first a").text("Next");
                            $(".owl-next").removeClass("claim");
                        }
                    }
                }, 100)
            },
            onInitialized: (event) => {

            }
        };
        this.state = {
            show: true,
            imagePreloaded: false
        }

    }

    disableLoader = () => {
        this.setState({
            imagePreloaded: true
        })
    }

    componentDidMount() {
        let self = this;
        $("body").off('click').on("click", ".owl-next", function () {
            if ($(".owl-next").hasClass("claim")) {
                $(".owl-next").addClass("disabled-nav");
                self.claimRewards();
            }
        });
    }

    claimRewards = (evt) => {
        if (!this.isClickedOnClaimNow) {
            this.isClickedOnClaimNow = true;
            this.props.claimWelcomeBonus();
        }
    };

    rewardRef = (ref) => {
        this.reward = ref
    };

    rewardRef2 = (ref) => {
        this.reward2 = ref;
        if (ref) {
            const time = setTimeout(() => {
                clearTimeout(time)
                if (this.reward2) {
                    this.reward2.rewardMe(window.innerWidth / 2, window.innerHeight * 0.8)
                }
            }, 1000);
        }
    }

    componentDidUpdate(prevProps) {
        if (this.props.claimWC !== prevProps.claimWC) {
            // console.log(this.props.claimWC, "this.props.claimWC")

            if (this.props.claimWC.isSubmitting) {
                $(".owl-nav").hide();
            }

            if (this.props.claimWC.isAdded === false) {
                $(".owl-nav").show();
            }

            if (this.props.claimWC.isAdded) {
                $(".owl-nav").hide();
            }
        }
    }

    render() {
        const { currentOrientation, welcomeScreenData, userBenefits, claimWC, leaderboardPrizesData } = this.props;
        // console.log(welcomeScreenData, leaderboardPrizesData,  "welcomeScreenData");
        const {imagePreloaded} = this.state;
        const gamesImgArr = [images.wtMobOne, images.wtDeskOne, images.wtMobTwo, images.wtDeskTwo, images.wtMobThree, images.wtDeskThree, images.wtMobFour, images.wtDeskFour, images.wtMobFive, images.wtDeskFive, images.wtMobSix, images.wtDeskSix, images.wtMobSeven, images.wtDeskSeven, images.wtMobEight, images.wtDeskEight, images.wtMobNine, images.wtDeskNine, images.wtMobTen, images.wtDeskTen];
        return welcomeScreenData && leaderboardPrizesData ? (
            <React.Fragment>
                <div className="iframe-container">
                    <div className="main-section draft-wrap walkthrough-bg">
                        {
                            !imagePreloaded ?
                                <React.Fragment>
                                    <ContentLoader loaderType={"content-relative"} />
                                    <ImagePreload disableLoader={this.disableLoader} images={gamesImgArr} />
                                </React.Fragment> : <div className="page-container">
                                    <div className="walkthrough-wrap walkthrough-info">
                                        {/* <div className="walkthrough-outer wt-carousel"> */}
                                        <OwlCarousel className={"walkthrough-outer wt-carousel"} ref="car" options={this.options} events={this.events}>

                                            <div className="walkthrough wt-add-card">
                                                <div className="wt-img mobile-wt"><img src={images.wtMobOne} alt="" /> </div>
                                                <div className="wt-img desktop-wt"><img src={images.wtDeskOne} alt="" /> </div>
                                            </div>
                                            <div className="walkthrough wt-add-card">
                                                <div className="wt-img mobile-wt"><img src={images.wtMobTwo} alt="" /> </div>
                                                <div className="wt-img desktop-wt"><img src={images.wtDeskTwo} alt="" /> </div>
                                            </div>
                                            <div className="walkthrough wt-add-card">
                                                <div className="wt-img mobile-wt"><img src={images.wtMobThree} alt="" /> </div>
                                                <div className="wt-img desktop-wt"><img src={images.wtDeskThree} alt="" /> </div>
                                            </div>
                                            <div className="walkthrough wt-add-card">
                                                <div className="wt-img mobile-wt"><img src={images.wtMobFour} alt="" /> </div>
                                                <div className="wt-img desktop-wt"><img src={images.wtDeskFour} alt="" /> </div>
                                            </div>
                                            <div className="walkthrough wt-add-card">
                                                <div className="wt-img mobile-wt"><img src={images.wtMobFive} alt="" /> </div>
                                                <div className="wt-img desktop-wt"><img src={images.wtDeskFive} alt="" /> </div>
                                            </div>
                                            <div className="walkthrough wt-add-card">
                                                <div className="wt-img mobile-wt"><img src={images.wtMobSix} alt="" /> </div>
                                                <div className="wt-img desktop-wt"><img src={images.wtDeskSix} alt="" /> </div>
                                            </div>
                                            <div className="walkthrough wt-add-card">
                                                <div className="wt-img mobile-wt"><img src={images.wtMobSeven} alt="" /> </div>
                                                <div className="wt-img desktop-wt"><img src={images.wtDeskSeven} alt="" /> </div>
                                            </div>
                                            <div className="walkthrough wt-add-card">
                                                <div className="wt-img mobile-wt"><img src={images.wtMobEight} alt="" /> </div>
                                                <div className="wt-img desktop-wt"><img src={images.wtDeskEight} alt="" /> </div>
                                            </div>
                                            <div className="walkthrough wt-add-card">
                                                <div className="wt-img mobile-wt"><img src={images.wtMobNine} alt="" /> </div>
                                                <div className="wt-img desktop-wt"><img src={images.wtDeskNine} alt="" /> </div>
                                            </div>
                                            <div className="walkthrough wt-add-card">
                                                <div className="wt-img mobile-wt"><img src={images.wtMobTen} alt="" /> </div>
                                                <div className="wt-img desktop-wt"><img src={images.wtDeskTen} alt="" /> </div>
                                            </div>
                                            {/* </div> */}
                                        </OwlCarousel>



                                    </div>

                                    {
                                        claimWC.isSubmitting && <ContentLoader />
                                    }

                                    {
                                        claimWC.isAdded && <div className="msg-card">
                                            <div className="msg-card-outer">
                                                <p>The gold has been automatically added to your total!</p>
                                            </div>
                                        </div>
                                    }

                                </div>
                        }

                        {/* <!--Main Section End--> */}
                    </div>
                </div>
                {imagePreloaded && <Reward onRef={this.rewardRef2} config={Constants.rewardsConfig.confetti} /> }
                {
                    claimWC.isAdded && <Reward onRef={this.rewardRef2} config={Constants.rewardsConfig.welcome} />
                }
            </React.Fragment>
        ) : null
    }
}

const mapStateToProps = state => {
    return {
        currentOrientation: state[constants.NAME].currentOrientation,
        welcomeScreenData: state[constants.NAME].welcomeScreenData,
        claimWC: state[constants.NAME].claimWC,
        userBenefits: state[home.constants.NAME].userBenefits,
        leaderboardPrizesData: state[menu.constants.NAME].leaderboardPrizesData,
    }
};

const mapDispatchToProps = dispatch => {
    return {
        claimWelcomeBonus: () => dispatch(actions.claimWelcomeBonus()),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(WelcomeScreen);
