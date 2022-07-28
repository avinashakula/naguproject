import APIEndpoints from "../../../../config/APIEndpoints";
import Constants from "../../../../utils/Constants";
import HelperFunctions from "../../../../utils/HelperFunctions";
import common from "../../common";
import menu from "../menu";
import * as ActionTypes from "./actionTypes";
import * as constants from "./constants";


export function callOnPageLoad(current_game_url = '') {
    HelperFunctions.postMessageToGame({ current_game_url: current_game_url });
    return (dispatch, getState) => {
        // dispatch(common.actions.getUserPopups());
        dispatch(common.actions.logAccess({ 'path': current_game_url, 'code': Constants.LOGACCESS_CODE }));
        dispatch(emptyStoreData());
        // dispatch(getLeaderboardData());
        dispatch(getLeaderboardWeeks());
        // dispatch(common.actions.getUserNotifications());
        //tracking
        dispatch(common.actions.userTracking("leaderboard"));

        dispatch(menu.actions.faqApi())

        dispatch(common.actions.toCheckNicknameAvailable(false));

    }
}

export function emptyStoreData(flag = false) {
    return (dispatch, getState) => {
        const newLeaderboardData = {
            leaderboard_type: null,
            data: null,
            isLoadMore: false,
            numLoaded: 0,
            isMessageShow: false,
            weekChangeLoader: flag
        }
        dispatch({
            type: ActionTypes.GET_LEADERBOARD_DATA,
            payload: newLeaderboardData
        });
    }
}

//call get leaderboard data
export function getLeaderboardData(qStr = '') {
    return (dispatch, getState) => {
        const { leaderboardData } = getState()[constants.NAME];

        dispatch({
            type: ActionTypes.GET_LEADERBOARD_DATA,
            payload: { isLoading: true }
        });

        let qParams = '?type=week&stats=score' + qStr;
        dispatch({
            type: ActionTypes.GET_LEADERBOARD_DATA,
            disableGlobalLoader: true,
            promise: APIEndpoints.leaderboardData(leaderboardData.numLoaded, leaderboardData.offset, qParams, leaderboardData.gameType),
            data: leaderboardData.data,
            leaderboardOffset: leaderboardData.offset,
            leaderboardHeading: leaderboardData.leaderboardHeading,
        });
    }
}

export function getWeekStats(index, week, season, userId = "") {
    return (dispatch, getState) => {
        const { leaderboardData, leaderboardWeeks } = getState()[constants.NAME];
        if (season === null)
            season = leaderboardWeeks[0].season;
            
        if (week === null) {
            week = leaderboardWeeks[0].week;
        }
        // console.log(index, week, userId, leaderboardWeeks);

        let qParams = '?userid=' + userId + "&week=" + week + "&season=" + season;

        dispatch({
            type: ActionTypes.GET_LEADERBOARD_WEEK_STATS,
            disableGlobalLoader: true,
            promise: APIEndpoints.weekStats(qParams),
            callback: (payload) => {
                if (payload && payload.content && payload.content.this_week_stats) {

                    const leaderCopy = HelperFunctions.copyObject(leaderboardData.data);
                    leaderCopy[index].this_week_stats = payload.content.this_week_stats;

                    dispatch({
                        type: ActionTypes.GET_LEADERBOARD_DATA,
                        payload: { data: leaderCopy, cdnPath: payload.content.base_url }
                    });

                }
            }
        });
    }
}

export function loadMore(week) {
    return (dispatch, getState) => {
        const { leaderboardData, leaderboardWeeks } = getState()[constants.NAME];
        let season = leaderboardWeeks[0].season;
        if (week === null) {
            week = leaderboardWeeks[0].week;
        }
        dispatch(getLeaderboardData('&week=' + week + '&season=' + season));
        dispatch(common.actions.userTracking("leaderboard_view_more"));
    }
}

export function getUserPopupInfo(accountId) {
    return (dispatch, getState) => {

        dispatch({
            type: ActionTypes.GET_USER_POPUP_INFO,
            payload: { data: null, isShow: true },
        });

        dispatch({
            type: ActionTypes.GET_USER_BENEFITS_POPUP_INFO,
            disableGlobalLoader: true,
            promise: APIEndpoints.userBenefits('?userid=' + accountId),
            callback: function (payload) {
                dispatch(getUserInventoryPopupInfo(accountId, payload))
            }
        });
    }
}

export function getUserInventoryPopupInfo(accountId, benefitsData) {
    return (dispatch, getState) => {
        dispatch({
            type: ActionTypes.GET_USER_INVENTORY_POPUP_INFO,
            disableGlobalLoader: true,
            promise: APIEndpoints.userInventoryItems('?userid=' + accountId),
            callback: function (payload) {
                let userPopupInfo = null;
                let base_url = null;
                let inventoryData = [];
                if (payload.content) {
                    //inventories = payload.content.category_info;
                    if (payload.content.category_info) {
                        for (let i = 0; i < payload.content.category_info.length; i++) {
                            for (let j = 0; j < payload.content.category_info[i].inventories.length; j++) {
                                inventoryData.push(payload.content.category_info[i].inventories[j])
                            }
                        }
                    }
                }

                if (benefitsData.content) {
                    userPopupInfo = {
                        gold_amount: benefitsData.content.gold_amount,
                        display_name: benefitsData.content.display_name,
                        user_xp_points: benefitsData.content.user_xp_points,
                        user_level: benefitsData.content.user_level,
                        upcoming_level: benefitsData.content.upcoming_level,
                        base_url: benefitsData.content.cdn_url,
                        inventories: inventoryData,
                    }
                }

                dispatch({
                    type: ActionTypes.GET_USER_POPUP_INFO,
                    payload: { data: userPopupInfo, isShow: true },
                });
            }
        });
    }
}

export function closeUserInfoPopup() {
    return (dispatch, getState) => {
        dispatch({
            type: ActionTypes.GET_USER_POPUP_INFO,
            payload: { data: null, isShow: false },
        });
    }
}

export function togglePrizePopups(currencyType) {
    return (dispatch, getState) => {
        const { leaderboardPrizesData } = getState()[menu.constants.NAME];
        let obj = null;
        if (leaderboardPrizesData && currencyType) {
            let prize = null;
            let totalPrize = null;
            let popupHeading = null;
            if (currencyType === Constants.freeBetText) {
                prize = leaderboardPrizesData.score_prizes.weekly_score_prizes;
                totalPrize = leaderboardPrizesData.score_prizes.ws_total_prize;
                popupHeading = HelperFunctions.getCurrency(leaderboardPrizesData.user_info ? leaderboardPrizesData.user_info.currency : '') + "" + HelperFunctions.formatNumber(totalPrize) + " per week in cash!";
            } else {
                prize = leaderboardPrizesData.high_score_prizes.weekly_high_score_prizes;
                totalPrize = leaderboardPrizesData.high_score_prizes.whs_total_prize;
                popupHeading = "Weekly High Score Gold Prizes";
            }
            obj = { user_info: leaderboardPrizesData.user_info, prizes: prize, total_prize: totalPrize, popupHeading: popupHeading, type: currencyType };
        }
        dispatch({
            type: ActionTypes.SHOW_PRIZE_POPUPS,
            payload: { leaderboardPrize: obj },
        });
    }
}

export function getLeaderboardWeeks() {
    return (dispatch, getState) => {

        dispatch({
            type: ActionTypes.GET_LEADERBOARD_DATA,
            payload: { isLoading: true }
        });

        dispatch({
            type: ActionTypes.GET_LEADERBOARD_WEEKS,
            disableGlobalLoader: true,
            promise: APIEndpoints.leaderboardWeeks(),
            callback: function (payload) {
                if (payload) {
                    let activeWeek = payload[0];
                    dispatch(getLeaderboardData('&week=' + activeWeek.week + '&season=' + activeWeek.season));
                    // console.log(activeWeek);
                } else {
                    dispatch({
                        type: ActionTypes.GET_LEADERBOARD_DATA,
                        payload: { isLoading: false, isMessageShow: true }
                    });
                }
            }
        });
    }
}

export function weekChange(week, season) {
    return (dispatch, getState) => {
        dispatch(emptyStoreData(true));
        dispatch(getLeaderboardData('&week=' + week + '&season=' + season));
        dispatch(common.actions.userTracking("leaderboard_change-week", { week: "Week " + week, season: season }));
    }
}