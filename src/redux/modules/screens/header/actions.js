import APIEndpoints from "../../../../config/APIEndpoints";
import HelperFunctions from "../../../../utils/HelperFunctions";
import common from "../../common";
import * as ActionTypes from "./actionTypes";
import * as constants from "../home/constants";
import images from "../../../../assets/images";
import Home from "../home";

export function callOnPageLoad(current_game_url = '') {
    // HelperFunctions.postMessageToGame({ current_game_url: current_game_url });
    return (dispatch, getState) => {
        // dispatch(common.actions.getUserBenefits());
        dispatch(common.actions.getUserPopups());
        // dispatch(common.actions.logAccess({ 'path': current_game_url, 'code': 'pp' }));
        dispatch(common.actions.getUserNotifications());
        dispatch(Home.actions.getUserBenefits());
        //tracking
        // dispatch(common.actions.userTracking("items", 0, null));
    }
}