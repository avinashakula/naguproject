import React, {Component} from 'react';
import {connect} from "react-redux";
import menu from '../../screens/menu';
import FAQ from '../../screens/menu/components/faq';
import * as actions from "../actions";
import * as constants from "../constants";

class CommonFAQ extends Component {

    toggleFAQPopup = () => {
        this.props.handleHowToPopup(false);
    }

    render() {

        const {faqData, howTo, userInfo} = this.props;
        // console.log(this.props, "howTo");
        return howTo.isShow && (
            <div className="modal defalut-modal faq-modal-single slide-modal" style={{display: "block"}}>
                <FAQ indexToDefault={howTo.activeIndexArr} closePopup={this.toggleFAQPopup} faqData={faqData} isPopup={true} userInfo={userInfo}/>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        // unlockingItemsPopupFlag: state[Constants.NAME].unlockingItemsPopupFlag,
        // userBenefits: state[constants.NAME].userBenefits,
        faqData: state[menu.constants.NAME].faq,
        howTo: state[constants.NAME].howTo,
        userInfo: state[constants.NAME].userInfo,
    }
};

const mapDispatchToProps = dispatch => {
    return {
        handleHowToPopup: (isShow, current_page_url, indexToShow) => dispatch(actions.handleHowToPopup(isShow, current_page_url, indexToShow)),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(CommonFAQ);