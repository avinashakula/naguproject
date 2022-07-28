import PropTypes from "prop-types";
import React, { Component } from 'react';
// import HappyHourPopup from './happyHourPopup';
// import HowTo from './howTo';
import ItemsUnlockingPopup from './itemUnlockingPopup';
import FactCardUnlockingPopup from './factCardUnlockingPopup';
import ChallengesUnlockingPopup from './challengesUnlockingPopup';
// import LoyaltyPopup from './loyaltyPopup';
// import OrientationPopup from "./orientationPopup";
// import SuspendedUser from "./suspendedUser";
// import TrainingUnlockingPopup from './traniningUnlockingPopup';
import WelcomeScreen from './welcomePopup';
// import DailyBonus from './dailyBonus/dailyBonus'
// import WelcomeGift from './welcomeGift/welcomeGiftPopupContainer'
import CommonFAQ from "./commonFAQ";
import UserPopup from "./userPopup";
import SuspendedUser from "./suspendedUser";
import TierPopup from "./tierPopup";
import Congratulations from "./congratulations";
import PlaySecondGamePopup from "./playSecondGamePopup";
import DoubleRewardsWeek from "./doubleRewardsWeek";
import $ from 'jquery';

class StartUpPopups extends Component {

    // componentDidMount() {
    //     $.getJSON('http://ip-api.com/json', function (data) {
    //         console.log(JSON.stringify(data, null, 2));
    //     });
    // }


    // componentDidMount() {
    //     fetch('http://api.hostip.info').then(response => {
    //         return response.text();
    //     }).then(xml => {
    //         return (new window.DOMParser()).parseFromString(xml, "text/xml");
    //     }).then(xmlDoc => {
    //         console.log(xmlDoc, "xmlDoc")
    //         // countryName = getElementText(xmlDoc, "countryName");
    //         // countryCode = getElementText(xmlDoc, "countryAbbrev");
    //         // console.log(countryCode, countryName);
    //         // $("#output").html("Country name: " + countryName + "<br>" + "Country code: " + countryCode);
    //     });
    // }

    render() {
        return (
            <React.Fragment>
                <PlaySecondGamePopup />
                <CommonFAQ />
                {/* <WelcomeScreen /> */}
                {/* <UserPopup /> */}
                <SuspendedUser />
                {/* <ChallengesUnlockingPopup /> */}
                {/* <FactCardUnlockingPopup /> */}
                {/* <ItemsUnlockingPopup /> */}
                <TierPopup />
                <Congratulations />
                <DoubleRewardsWeek />


                {/* <DailyBonus/> */}
                {/*   <WelcomeGift/>
                
                <HowTo/>
                <TrainingUnlockingPopup/>
                <LoyaltyPopup/>
                {this.props.url === '/challenges' && <HappyHourPopup {...this.props}/>}
                <WelcomeScreen/>  */ }
                {/* <OrientationPopup/> */}
            </React.Fragment>
        )
    }
}

StartUpPopups.propTypes = {
    url: PropTypes.string,
    action: PropTypes.func,
};

StartUpPopups.defaultProps = {
    url: "/",
    action: () => { }
}

export default StartUpPopups;