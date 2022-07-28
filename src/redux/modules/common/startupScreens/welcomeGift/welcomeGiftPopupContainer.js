import React, {Component} from 'react';
import {connect} from "react-redux";
import Play from '../../../screens/play';
import * as actions from "../../actions";
import * as constants from "../../constants";
import WelcomeGiftKitBag from './welcomeGiftKitBag';
import WgInfo from './wgInfo';
import WgPopup from './wgPopup';

class WelcomeGiftPopupContainer extends Component {
    // render() {
    //     return this.props.wgPopupFlag ? (
    //        <WgPopup {...this.props}/>
    //     ) : this.props.wgInfoPopupFlag ? <WgInfo/> : null;
    // }

    componentDidMount() {
        this.props.currentEventApi();
    }

    render() {
        return (
            <React.Fragment>
                <WgPopup {...this.props} />
                <WgInfo {...this.props} />
                <WelcomeGiftKitBag {...this.props}/>
            </React.Fragment>
        )
    }
}

const mapStateToProps = state => {
    return {
        welcomeGiftTimer: state[constants.NAME].welcomeGiftTimer,
        wgPopupFlag: state[constants.NAME].wgPopupFlag,
        wgInfoPopupFlag: state[constants.NAME].wgInfoPopupFlag,
        kitBagRewards: state[constants.NAME].kitBagRewards,
        kitBagAnimation: state[constants.NAME].kitBagAnimation,
        bagTypeImg: state[constants.NAME].bagTypeImg,
        userBenefits: state[constants.NAME].userBenefits,
        currentEventData: state[Play.constants.NAME].currentEventData,
        //currentEventData.is_play_disabled
    }
};

const mapDispatchToProps = dispatch => {
    return {
        toggleWGpopup: () => dispatch(actions.toggleWGpopup()),
        openWelcomeGift: () => dispatch(actions.openWelcomeGift()),
        showKitBagAnimations: (flag) => dispatch(actions.showKitBagAnimations(flag)),
        handleABoutBoostsBtn: (flag) => dispatch(actions.handleABoutBoostsBtn(flag)),
        currentEventApi: () => dispatch(Play.actions.currentEventApi()),
        // getKitbagsRewards: (data, bagType) => dispatch(Items.actions.getKitbagsRewards(data, bagType)),

    }
};

export default connect(mapStateToProps, mapDispatchToProps)(WelcomeGiftPopupContainer);
