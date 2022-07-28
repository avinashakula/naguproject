import APIEndpoints from "../../../../config/APIEndpoints";
import Constants from "../../../../utils/Constants";
import HelperFunctions from "../../../../utils/HelperFunctions";
import common from "../../common";
import * as ActionTypes from "./actionTypes";
import * as constants from "./constants";

export function callOnPageLoad(current_game_url = '') {
    // HelperFunctions.postMessageToGame({current_game_url: current_game_url});
    return (dispatch, getState) => {
        // dispatch(common.actions.getUserBenefits());
        dispatch(common.actions.getUserPopups());
        dispatch(common.actions.toggleChallengesTabAnim(false));
        dispatch(common.actions.logAccess({'path': current_game_url, 'code': Constants.LOGACCESS_CODE}));
        dispatch(happyHourCounterData(undefined));
        dispatch(getChallenges());
        // dispatch(common.actions.getUserNotifications());
        dispatch(common.actions.userTracking("challenges"));
        dispatch(common.actions.toCheckNicknameAvailable(false));
    }
}

export function getChallenges() {
    return (dispatch, getState) => {
        dispatch({
            type: ActionTypes.GET_CHALLENGES,
            disableGlobalLoader: true,
            promise: APIEndpoints.getChallenges(),
            callback: (payload) => {
                // if (payload.challengesData.happyHour) {
                //     HelperFunctions.postMessageToGame({happHourData: payload.challengesData.happyHour, happy_hour_counter: true})
                // }
                // else {
                //     dispatch(happyHourCounterData(null));
                // }
            }
        });
    }
}

export function happyHourStatuschange() {
    return (dispatch, getState) => {
        const {challengesData} = getState()[constants.NAME];

        const copy = HelperFunctions.copyObject(challengesData);
        copy.happyHour.loader = true;
        dispatch({
            type: ActionTypes.GET_CHALLENGES,
            payload: {challengesData: copy}
        });
        dispatch(getChallenges());
    }
}

export function happyHourStatusToActive() {
    return (dispatch, getState) => {
        /*const {challengesData} = getState()[constants.NAME];

        const copy = HelperFunctions.copyObject(challengesData);
        copy.happyHour.status = "active";
        dispatch({
            type: ActionTypes.GET_CHALLENGES,
            payload: {challengesData: copy}
        });
        dispatch(getChallenges());
        HelperFunctions.postMessageToGame({happHourData: copy.happyHour, happy_hour_counter: true})*/

        dispatch(happyHourCounterData(undefined));
        setTimeout(() => {
            dispatch(getChallenges());
        }, 3000);
    }
}

export function happyHourCounterData(happyHour, isCheckForStatus = false) {
    return (dispatch, getState) => {
        // console.log(happyHour)
        const {challengesData} = getState()[constants.NAME];
        dispatch({
            type: ActionTypes.HAPPY_HOUR_COUNTER,
            payload: {happyHourCounter: happyHour}
        })
        if (isCheckForStatus && challengesData && challengesData.happyHour) {
            dispatch(happyHourStatusToActive());
        }
    }
}
