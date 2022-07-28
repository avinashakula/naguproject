import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import images from '../../../assets/images';
import ProjectRoutes from '../../../config/routes/projectRoutes';
import Constants from '../../../utils/Constants';
import HelperFunctions from '../../../utils/HelperFunctions';
import PropTypes from 'prop-types';

class FooterHTML extends Component {
    render() {
        const { userInfo } = this.props;
        return (
            <footer className={`theme-footer animated fadeInUpLess delay-04s ${userInfo && userInfo.country_code === "IE" && "ft-ireland"}`} style={{ opacity: 0 }}>
                <div className="container">
                    <div className="footer-outer">
                        {/* <div className="footer-logos">
                            <a href={Constants.EIGHTEEN_PLUS_URL} target="_blank" className="logo-icon"><img src={images.eighteenPlus} alt="" /></a>
                            <a href={Constants.GAME_CARE_URL} target="_blank" className="logo-icon"><img src={images.gameCare} alt="" /></a>
                            <a href={Constants.GAMBLING_THERAPY_URL} target="_blank" className="logo-icon"><img src={images.gameTherapy} alt="" /></a>
                            <a href={Constants.WHEN_THE_FUN_URL} target="_blank" className="logo-icon"><img src={images.funBg} alt="" /></a>
                        </div>
                        <div className="footer-logos">
                            <a href={Constants.AUTHORISATION_MGA_URL} target="_blank" className="logo-icon"><img src={images.mga} alt="" /></a>
                            <a href={Constants.SECURE_GAMBLING_COMMISION_URL} target="_blank" className="logo-icon"><img src={images.gamblingCommission} alt="" /></a>
                            <a href={Constants.GAM_STOP_URL} target="_blank" className="logo-icon"><img src={images.gameStop} alt="" />
                            </a>
                        </div> */}

                        <div className="footer-logos-block">
                            <div className="footer-logos">
                                <a href={Constants.AUTHORISATION_MGA_URL} target="_blank" className="logo-icon"><img src={images.mgaNew} alt="" /></a>
                                <a href={Constants.SECURE_GAMBLING_COMMISION_URL} target="_blank" className="logo-icon"><img src={images.gamblingCommissionNew} alt="" /></a>
                                <a href={Constants.EIGHTEEN_PLUS_URL} target="_blank" className="logo-icon"><img src={images.eighteenPlusNew} alt="" /></a>
                            </div>
                            <div className="footer-logos">
                                <a href={Constants.GAMBLING_THERAPY_URL} target="_blank" className="logo-icon"><img src={images.gameTherapyNew} alt="" /></a>
                                {
                                    <React.Fragment>
                                        <a href={Constants.GAME_CARE_URL_UK} target="_blank" className="logo-icon uk-logo"><img src={images.gameCare_UK} alt="" /></a>
                                        <a href={Constants.GAME_CARE_URL_IRELAND} target="_blank" className="logo-icon ire-logo"><img src={images.gameCare_IRELAND} alt="" /></a>
                                    </React.Fragment>
                                }


                                <a href={Constants.BLUE_LOGO_WITH_CHECK_URL} target="_blank" className="logo-icon"><img src={images.checkLogo} alt="" /></a>
                            </div>

                            <div className="footer-logos last-row">
                                <a href={Constants.BEGAMBLE_URL} target="_blank" className="logo-icon full-row"><img src={images.BeGambleAware} alt="" /></a>
                                <a href={Constants.GAM_STOP_URL} target="_blank" className="logo-icon uk-logo"><img src={images.gameStopNew} alt="" /></a>
                                <a href={Constants.SAFER_GAMBLING_URL} target="_blank" className="logo-icon"><img src={images.saferGambling} alt="" /></a>
                            </div>

                        </div>


                        <div className="footer-info">
                            <div className="footer-parag">
                                <Link style={{ color: "#474752" }} to={{
                                    pathname: ProjectRoutes.ffDemo.url,
                                    search: HelperFunctions.getQueryStringFromURL(),
                                }}>PPB </Link>

                                Counterparty Services Ltd having its registered address at
                                <Link style={{ color: "#474752" }} to={{
                                    pathname: ProjectRoutes.ffDemoOne.url,
                                    search: HelperFunctions.getQueryStringFromURL(),
                                }}> Triq </Link>


                                il-Kappillan Mifsud, St. Venera, SVR 1851, MALTA, is licensed and regulated by the <a
                                    href={Constants.MGA_URL} target="_blank">Malta Gaming Authority</a> under Licence Number MGA/CL2/294/2006 (issued on 12 March 2018).
                            </div>

                            <div className="footer-parag"> PPB Counterparty Services Limited are licensed and regulated in Great Britain by the Gambling Commission under account numbers  <a
                                href={Constants.GAMBLING_NEW_URL} target="_blank">39439</a></div>


                            <div className="footer-parag">Warning: Live scores and other data on this site is sourced from third party feeds and may be subject to time delays and/or be inaccurate.
                                Other customers may have access to faster or more accurate data.
                                If you rely on this data to place bets, you do so at your own risk.
                                paddypower
                                does not accept responsibility for loss suffered as a result of reliance on this data.
                            </div>
                            <div className="footer-parag"><a href={Constants.RESPONSIBLE_GAMING} target="_blank"> Gambling can be addictive, use our online tools for a safer way to play. </a></div>
                            <div className="footer-parag footer-link"><span>
                                <span className="jurisdiction-gambling-text">
                                    <a href={Constants.BLUE_LOGO_WITH_CHECK_URL} target="_blank">Safer Gambling</a>
                                </span>
                                <span className="pipe">|</span>
                            </span>
                                <span>
                                    <a target="_blank" href={Constants.GAME_CARE_URL_SECOND} className="jurisdiction-gambling-text">GamCare</a>
                                    <span className="pipe">|</span>
                                </span>
                                <span>
                                    <a target="_blank" href={Constants.GAMBLING_THERAPY_REFER_URL} className="jurisdiction-gambling-text">Gambling Therapy</a>
                                    <span className="pipe">|</span>
                                </span>
                                <span>
                                    <a target="_blank" href={Constants.PP_COOKIE_POLICY_URL} className="jurisdiction-gambling-text">Cookie Policy</a>
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
        );
    }
}

FooterHTML.propTypes = {
    userInfo: PropTypes.object
};

FooterHTML.defaultProps = {
    userInfo: null
}

export default FooterHTML;