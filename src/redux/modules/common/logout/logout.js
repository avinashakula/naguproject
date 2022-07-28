import React, { Component } from 'react';
import images from '../../../../assets/images';
import HelperFunctions from '../../../../utils/HelperFunctions';
import PPHeadCard from "../../../../commons/components/ppHeadCard";
import Constants from '../../../../utils/Constants';
import FooterHTML from '../../../../commons/components/footer/footer';
import CookieBanner from '../../../../commons/components/cookieBanner';


class Logout extends Component {

    redirectSSO = () => {
        HelperFunctions.redirectToLoginSSO(window.location.origin);
    }

    redirecttoGame = (game) => {
        HelperFunctions.redirectToQuickPlayLink(game);
    }

    componentDidMount() {
        var code = HelperFunctions.getParameterByName('code');
        console.log(code);
    }


    render() {
        return (
            <React.Fragment>
                <div className="main-section login-wrap before-login">
                    <div className="page-container">

                        <div className="mid-wrapper">
                            <PPHeadCard title={'FREE TO PLAY'} />
                            <div className="container">
                                <div className="block splash-widget">


                                    <a className="card-info prize-card-info animated slideInUpLess" onClick={this.redirectSSO}>
                                        <div className="card-outer animated slideInUpLess">
                                            <div className="wcard">
                                                <div className="prize-card">
                                                    <div className="prize-icon">
                                                        <figure className="prize-figure"><img src={images.trophyTwo} alt="" /> </figure>
                                                    </div>
                                                    <div className="prize-detail">
                                                        <div className="prize-title"><span>Prizes</span></div>
                                                        <p className="prize-label"><span>20,000</span> total winners each week!</p>
                                                        <div className="card-play"> <span className="btn primary-btn">Learn More</span> </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </a>

                                    <a className="card-info login-play-info animated slideInUpLess" onClick={this.redirectSSO}>
                                        <div className="card-outer animated slideInUpLess">
                                            <div className="wcard">
                                                <div className="login-to-play">
                                                    <div className="login-title"><span>Login to play</span></div>
                                                    <div className="card-play"> <span className="btn primary-btn">Login</span> </div>
                                                </div>

                                            </div>
                                        </div>
                                    </a>

                                    <div className="card-info featured-game-card animated slideInUpLess">
                                        <div className="card-outer animated slideInUpLess">
                                            <ul className="game-listing">

                                                <li onClick={() => { this.redirecttoGame("hoopsgalore") }}>
                                                    <div className="game-card"> <a className="game-card-outer">
                                                        <div className="game-bg">
                                                            <figure className="image-figure"><img src={images.hoopsBanner} alt="" /></figure>
                                                        </div>
                                                        <div className="card-content">
                                                            <div className="game-content-inner">
                                                                <div className="card-game-logo">
                                                                    <figure className="logo-figure"><img src={images.hoopsIndoorLogo} alt="" /></figure>
                                                                </div>
                                                                <div className="card-play"> <span className="btn primary-btn">Play Now</span> </div>
                                                            </div>
                                                        </div>
                                                    </a> </div>
                                                </li>

                                                <li onClick={() => { this.redirecttoGame("hoopsgalore-outdoor") }}>
                                                    <div className="game-card"> <a className="game-card-outer">
                                                        <div className="game-bg">
                                                            <figure className="image-figure"><img src={images.hoopsOutdoorBanner} alt="" /></figure>
                                                        </div>
                                                        <div className="card-content">
                                                            <div className="game-content-inner">
                                                                <div className="card-game-logo">
                                                                    <figure className="logo-figure"><img src={images.hoopsLogo} alt="" /></figure>
                                                                </div>
                                                                <div className="card-play"> <span className="btn primary-btn">Play Now</span> </div>
                                                            </div>
                                                        </div>
                                                    </a> </div>
                                                </li>

                                                <li onClick={() => { this.redirecttoGame("puckluck") }}>
                                                    <div className="game-card"> <a className="game-card-outer">
                                                        <div className="game-bg">
                                                            <figure className="image-figure"><img src={images.puckLuckBanner} alt="" /></figure>
                                                        </div>
                                                        <div className="card-content">
                                                            <div className="game-content-inner">
                                                                <div className="card-game-logo">
                                                                    <figure className="logo-figure"><img src={images.puckLuckLogo} alt="" /></figure>
                                                                </div>
                                                                <div className="card-play"> <span className="btn primary-btn">Play Now</span> </div>
                                                            </div>
                                                        </div>
                                                    </a> </div>
                                                </li>

                                                <li onClick={() => { this.redirecttoGame("baseball-bash") }}>
                                                    <div className="game-card"> <a className="game-card-outer">
                                                        <div className="game-bg">
                                                            <figure className="image-figure"><img src={images.baseballBashBanner} alt="" /></figure>
                                                        </div>
                                                        <div className="card-content">
                                                            <div className="game-content-inner">
                                                                <div className="card-game-logo">
                                                                    <figure className="logo-figure"><img src={images.baseballBashLogo} alt="" /></figure>
                                                                </div>
                                                                <div className="card-play"> <span className="btn primary-btn">Play Now</span> </div>
                                                            </div>
                                                        </div>
                                                    </a> </div>
                                                </li>

                                                <li onClick={() => { this.redirecttoGame("trivia") }}>
                                                    <div className="game-card"> <a className="game-card-outer">
                                                        <div className="game-bg">
                                                            <figure className="image-figure"><img src={images.triviaBanner} alt="" /></figure>
                                                        </div>
                                                        <div className="card-content">
                                                            <div className="game-content-inner">
                                                                <div className="card-game-logo">
                                                                    <figure className="logo-figure"><img src={images.triviaLogo} alt="" /></figure>
                                                                </div>
                                                                <div className="card-play"> <span className="btn primary-btn">Play Now</span> </div>
                                                            </div>
                                                        </div>
                                                    </a> </div>
                                                </li>

                                            </ul>
                                        </div>
                                    </div>



                                </div>
                            </div>




                        </div>

                        <FooterHTML />
                    </div>
                </div>

                {/* CookieBanner */}
                <CookieBanner />

            </React.Fragment>


        );
    }
}

export default Logout;
