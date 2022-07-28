import React from 'react';
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import * as actions from "./actions";
import * as actionTypes from "./actionTypes";
import Shop from "./components";
import { FooterContainer } from "../footer";
import { HeaderContainer } from "../header";
import * as constants from "./constants";
import reducer from "./reducer";
import common from '../../common';
import Home from '../home';
import Constants from '../../../../utils/Constants';
import HelperFunctions from '../../../../utils/HelperFunctions';
import ProjectRoutes from '../../../../config/routes/projectRoutes';
import WelcomePopup from '../../common/startupScreens/welcomePopup';

class ShopSmart extends React.Component {

    componentDidMount() {
        this.props.callOnPageLoad(this.props.match.path);
        const locationProps = this.props.location;
        let defaultTab = locationProps.state && locationProps.state.defaultShow ? locationProps.state.defaultShow : "store";
        this.callItemAPI(defaultTab);
    }

    callItemAPI = (tab) => {
        if (tab === "inventory") {
            //  this.props.getInventoryItems();
            this.props.getUserKitbags();
        } else if (tab === "store") {
            this.props.getStoreItems();
        }
    };

    componentDidUpdate(prevProps) {
        // Typical usage (don't forget to compare props):
        if (this.props.userBenefits !== prevProps.userBenefits) {

            // var flag = false;
            // if(this.props.userPopups && this.props.userPopups.two_day_retention_gift) {
            //     flag = this.props.userPopups.two_day_retention_gift === "complete";
            // }

            // if(flag) {

            // } else {
            // if ((this.props.userBenefits.user_level.level_id < Constants.itemsTabLevel)) {
            //     this.props.history.push(ProjectRoutes.home.url + HelperFunctions.getQueryStringFromURL());
            // }
            // }
        }
    }

    handleSubmitWalkthourgh = () => {
        this.props.setUserPopups(Constants.sz_shop_wt, true);
        this.props.whichWalkthroughWillShow(null);
    }

    render() {
        return (
            <React.Fragment>
                {
                    // this.props.welcomeScreenData === false ? 
                    <div className="main-section shop-wrap">
                        <div className="page-container">
                            <HeaderContainer path={this.props.match.path} historyProps={this.props.history} />
                            <Shop callItemAPI={this.callItemAPI.bind(this)} {...this.props} />
                            <FooterContainer path={this.props.match.path} />
                        </div>
                    </div>
                    // : <WelcomePopup />

                }
                <div className="walkthrought-overlay" onClick={this.handleSubmitWalkthourgh}></div>
            </React.Fragment>
        )
    }
}

const mapStateToProps = state => ({
    storeData: state[constants.NAME].storeData,
    errorMessage: state[constants.NAME].errorMessage,
    inventoryData: state[constants.NAME].inventoryData,
    seletedItem: state[constants.NAME].seletedItem,
    whichTab: state[constants.NAME].whichTab,
    itemPurchaseData: state[constants.NAME].itemPurchaseData,
    openUserInventory: state[constants.NAME].openUserInventory,
    userBenefits: state[Home.constants.NAME].userBenefits,
    userPopups: state[common.constants.NAME].userPopups,
    kitBagRewards: state[constants.NAME].kitBagRewards,
    kitBagAnimation: state[constants.NAME].kitBagAnimation,
    bagTypeImg: state[constants.NAME].bagTypeImg,
    selectedItem: state[constants.NAME].selectedItem,
    selectedInventory: state[constants.NAME].selectedInventory,
    userNotification: state[common.constants.NAME].userNotification,
    welcomeScreenData: state[common.constants.NAME].welcomeScreenData,
    activeWT: state[common.constants.NAME].activeWT,
    claimWC: state[common.constants.NAME].claimWC,
});

const mapDispatchToProps = dispatch => {
    return {
        callOnPageLoad: (page_url) => dispatch(actions.callOnPageLoad(page_url)),
        getStoreItems: () => dispatch(actions.getStoreItems()),
        getUserKitbags: () => dispatch(actions.getUserKitbags()),
        getInventoryItems: () => dispatch(actions.getInventoryItems()),
        addInventory: (data) => dispatch(actions.addInventory(data)),
        getKitbagsRewards: (data, bagType) => dispatch(actions.getKitbagsRewards(data, bagType)),
        toggleStoreItemPopup: (selectedItem, from) => dispatch(actions.toggleStoreItemPopup(selectedItem, from)),
        showKitBagAnimations: (flag, bagType) => dispatch(actions.showKitBagAnimations(flag, bagType)),
        toggleBoostPopup: (flag) => dispatch(actions.toggleBoostPopup(flag)),
        toggleInventoryPopup: (data) => dispatch(actions.toggleInventoryPopup(data)),
        setUserPopups: (key, value) => dispatch(common.actions.setUserPopups(key, value)),
        whichWalkthroughWillShow: (wt) => dispatch(common.actions.whichWalkthroughWillShow(wt)),

    }
};

export const ShopContainer = withRouter(connect(mapStateToProps, mapDispatchToProps)(ShopSmart));
export default { actionTypes, actions, reducer, constants };
