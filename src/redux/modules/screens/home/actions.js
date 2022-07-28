import Cookies from 'universal-cookie';
import APIEndpoints from "../../../../config/APIEndpoints";
import HelperFunctions from "../../../../utils/HelperFunctions";
import common from "../../common";
import * as constants from "./constants";
import * as ActionTypes from "./actionTypes";
import menu from "../menu";
import Constants from '../../../../utils/Constants';
import $ from 'jquery';

export function callOnPageLoad() {
    return (dispatch, getState) => {
        dispatch(logAccess({ 'path': '/home', 'code': Constants.LOGACCESS_CODE }));
        dispatch(getGames());
        dispatch(getWeekStats());
        // dispatch(getFunFacts());
        dispatch(common.actions.userTracking("home"));
        dispatch(common.actions.callOnPageLoad());
        dispatch(getPollVoteData(false));


        dispatch(common.actions.toCheckNicknameAvailable(false));
        // console.log("call on page load")
    }
}

//log access
export function logAccess(data) {
    return (dispatch, getState) => {

        dispatch({
            type: ActionTypes.LOG_ACCESS,
            disableGlobalLoader: true,
            promise: APIEndpoints.logAccess(data),
            callback: function (payload) {

                //store userinfo
                if (payload.content) {
                    dispatch(common.actions.storeUserInfo(payload.content.user_info))
                }
            },
            errorCallback: function (error) {

            }
        });
    }
}

//setting api
export function settingsApi() {
    return {
        type: ActionTypes.SETTINGS,
        disableGlobalLoader: true,
        promise: APIEndpoints.setting(),
    };
}

export function setUserIsSuspended(type) {
    return { type: ActionTypes.USER_IS_SUSPENDED, payload: { isUserSuspended: type } }
}

export function setUserIsLoggedOut() {
    return { type: ActionTypes.USER_IS_LOGGED_OUT, payload: { isUserLoggedOut: true } }
}

export function endCurrentFlashSale() {
    return (dispatch, getState) => {
        const { userBenefits } = getState()[constants.NAME];
        // console.log(userBenefits);
        const copyData = HelperFunctions.copyObject(userBenefits);
        copyData.flash_sale = null;
        dispatch({
            type: ActionTypes.GET_USERS_LEVEL_DATA,
            payload: copyData
        });
    }
}

export function getUserBenefits(callback = null) {
    return (dispatch, getState) => {
        dispatch({
            type: ActionTypes.GET_USERS_LEVEL_DATA,
            disableGlobalLoader: true,
            promise: APIEndpoints.userBenefits(),
            callback: function (payload) {
                // console.log(payload, "payload");

                if (payload === 403) {
                    dispatch(common.actions.checkSSOToken());
                }
                if (payload.pre_tier_info) {
                    let remainingPoints = null;
                    let tierLie = null, tierSwitchLie = null, trophyIcon = null, badgeIcon = null, prizeTierLie;
                    if (payload.pre_month.points >= payload.pre_tier_info.bronze.points && payload.pre_month.points < payload.pre_tier_info.silver.points) {
                        tierLie = "bronze";
                        tierSwitchLie = "Bronze";
                        trophyIcon = "bronze-trophy.png";
                        badgeIcon = "bronze.png";
                        prizeTierLie = payload.pre_tier_info.bronze.prize_amount;
                    } else if (payload.pre_month.points >= payload.pre_tier_info.silver.points && payload.pre_month.points < payload.pre_tier_info.gold.points) {
                        tierLie = "silver";
                        tierSwitchLie = "Silver";
                        trophyIcon = "silver-trophy.png";
                        badgeIcon = "silver.png";
                        prizeTierLie = payload.pre_tier_info.silver.prize_amount;
                    }
                    else if (payload.pre_month.points >= payload.pre_tier_info.gold.points) {
                        tierLie = "gold";
                        tierSwitchLie = "Gold";
                        trophyIcon = "gold-trophy.png";
                        badgeIcon = "gold.png";
                        prizeTierLie = payload.pre_tier_info.gold.prize_amount;
                    }
                    // else {
                    //     tierSwitchLie = "Gold";
                    //     trophyIcon = "gold-trophy.png";
                    //     badgeIcon ="gold.png";
                    //     prizeTierLie = payload.tier_info.gold.prize_amount;
                    // }

                    // console.log(tierSwitchLie, prizeTierLie, tierLie)

                    if (payload.tier_transaction && tierLie) {
                        if (tierSwitchLie) {
                            var tierSwitchObj = {
                                tier: tierSwitchLie,
                                prize: prizeTierLie,
                                trophyIcon: trophyIcon,
                                badgeIcon: badgeIcon,
                                month: payload.pre_month.month,
                            };
                            dispatch(common.actions.toggleTierPopup(tierSwitchObj));
                        }

                    }
                }
                //store userinfo
                // if (payload.content) {
                //     dispatch(common.actions.storeUserInfo(payload.content.user_info))
                // }
            }
        });

        // HelperFunctions.toCheckPopupVisible();
    }
}

// get games
export function getGames() {
    return (dispatch, getState) => {

        dispatch(showLoader());

        dispatch({
            type: ActionTypes.GET_GAMES_DATA,
            disableGlobalLoader: true,
            promise: APIEndpoints.ppGames(),
            callback: function (payload) {

            }
        });
    }
}

export function disableLoader() {
    return {
        type: ActionTypes.GAMES_DATA_LOADER,
        payload: false
    }
}

export function showLoader() {
    // console.log("loader visible");
    return {
        type: ActionTypes.GAMES_DATA_LOADER,
        payload: true
    }
}

export function handleCookies() {
    const urlParams = HelperFunctions.getUrlVars(); //new URLSearchParams(window.location.search);
    const keys = Object.keys(urlParams);
    let stickyCookeValue = '';

    for (let i = 0; i < keys.length; i++) {
        let key = keys[i];
        const value = HelperFunctions.getQueryStringValue(key);
        if ((HelperFunctions.isAlphaNumeric(key) || HelperFunctions.isAlphaNumericUnderscore(key)) && HelperFunctions.isAlphaNumericUnderscore(value)) {
            const cookies = new Cookies();
            let expires = new Date();
            expires.setDate(expires.getDate() + 45);
            expires = key.startsWith('utm_') ? null : expires;
            cookies.set(key, value, { domain: '.' + document.domain, path: '/', expires });
        }

        //PI, pi, UI, spi
        if (key === 'rfr') {
            const cookies = new Cookies();
            if (cookies.get('PI') === undefined) {
                let expires = new Date();
                expires.setDate(expires.getDate() + 45);

                const cookiesPI = new Cookies();
                cookiesPI.set('PI', value, { domain: '.' + document.domain, path: '/', expires });

                const cookiespi = new Cookies();
                cookiespi.set('pi', 'partner' + value, { domain: '.' + document.domain, path: '/', expires });
            }
        }
        if (key === 'sid') {
            const cookies = new Cookies();
            if (cookies.get('UI') === undefined) {
                let expires = new Date();
                expires.setDate(expires.getDate() + 45);

                const cookiesUI = new Cookies();
                cookiesUI.set('UI', value, { domain: '.' + document.domain, path: '/', expires });

                const cookiesspi = new Cookies();
                cookiesspi.set('spi', value, { domain: '.' + document.domain, path: '/', expires });
            }
        }

        //sticky and tracking tag
        if (['clkID', 'rfr', 'ttp', 'promotionCode'].indexOf(key) > -1) {
            stickyCookeValue += stickyCookeValue === '' ? key + '=' + value : '&' + key + '=' + value;
        }
    }

    if (stickyCookeValue !== '') {
        HelperFunctions.createDomainCookie('StickyTags', stickyCookeValue);
        HelperFunctions.createDomainCookie('TrackingTags', stickyCookeValue);
    }

    return common.actions.doNothing();
}

// get games
export function getWeekStats() {
    return (dispatch, getState) => {
        dispatch({
            type: ActionTypes.WEEK_STATS,
            disableGlobalLoader: true,
            promise: APIEndpoints.weekStats(),
            callback: function (payload) {
                // console.log(payload, "payload");
            }
        });
    }
}

// get funfacts
export function getFunFacts() {
    return (dispatch, getState) => {
        dispatch({
            type: ActionTypes.FUN_FACTS,
            disableGlobalLoader: true,
            promise: APIEndpoints.funfacts(),
            callback: function (payload) {
                // console.log(payload, "payload");
            }
        });
    }
}

export function claimDailyRewards() {
    return (dispatch, getState) => {

        const { userPopups } = getState()[common.constants.NAME];
        const { dailyRewardFirstPopup } = getState()[constants.NAME];

        // console.log(dailyRewardFirstPopup, "userPopups");
        // console.log(userPopups, "userPopups");
        // userPopups.daily_rewards_first_popup = true;

        if (!userPopups.daily_rewards_first_popup && !dailyRewardFirstPopup) {
            dispatch(toggleDailyRewardFirstPopup());
        } else {
            dispatch(claimReward());
        }
    }
}

export function toggleDailyRewardFirstPopup() {
    return (dispatch, getState) => {
        // console.log("here");
        const { dailyRewardFirstPopup } = getState()[constants.NAME];
        const { userPopups } = getState()[common.constants.NAME];
        if (dailyRewardFirstPopup) {
            dispatch(common.actions.setUserPopups('daily_rewards_first_popup', true));
            dispatch(toggleDailyRewardClaimedPopup());
        }

        dispatch({
            type: ActionTypes.TOGGLE_DAILY_REWARD_FIRST_POPUP,
            payload: { dailyRewardFirstPopup: !dailyRewardFirstPopup }
        });

        HelperFunctions.toCheckPopupVisible();
    }
}

export function toggleDailyRewardClaimedPopup() {
    return (dispatch, getState) => {
        const { dailyRewardClaimedPopup } = getState()[constants.NAME];
        if (dailyRewardClaimedPopup) {
            dispatch(getUserBenefits());
        }
        dispatch({
            type: ActionTypes.TOGGLE_DAILY_REWARD_CLAIMED_POPUP,
            payload: { dailyRewardClaimedPopup: !dailyRewardClaimedPopup }
        });

        HelperFunctions.toCheckPopupVisible();
    }
}

export function claimReward() {

    let dataToPass = {
        txn_type: "IN",
        txn_purpose: "reveal"
    };

    return (dispatch, getState) => {

        const { userPopups } = getState()[common.constants.NAME];

        dispatch({
            type: ActionTypes.CLAIM_DAILY_REVEAL,
            payload: { isLoading: true }
        });

        dispatch({
            type: ActionTypes.CLAIM_DAILY_REVEAL,
            disableGlobalLoader: true,
            promise: APIEndpoints.purchaseInventory(dataToPass, null),
            callback: function (payload) {
                if (payload.isAdded) {
                    dispatch(common.actions.userTracking("claim_reveal_reward"));
                    dispatch(menu.actions.getLeaderboardPrizes());
                    dispatch(toggleDailyRewardBeforeCountDownPopup(false));

                    if (userPopups.daily_rewards_first_popup) {
                        dispatch(toggleDailyRewardClaimedPopup());
                    } else {
                        dispatch(toggleDailyRewardFirstPopup());
                    }

                    // dispatch(getUserBenefits());
                }
            }
        })
    }
}

export function getPollVoteData(flag) {
    return (dispatch, getState) => {
        const { currentGroupInfo } = getState()[common.constants.NAME];
        if (currentGroupInfo) {
            const qstr = "?season=" + currentGroupInfo.season + "&week=" + currentGroupInfo.week;

            if (flag) {
                dispatch({
                    type: ActionTypes.POLL_VOTE,
                    payload: { pollVoteData: null }
                });
            }

            dispatch({
                type: ActionTypes.POLL_VOTE,
                disableGlobalLoader: true,
                promise: APIEndpoints.pollVote(qstr),
            });
        }

    }
}

export function submitPollVote(data) {
    return (dispatch, getState) => {

        const { pollVoteData } = getState()[constants.NAME];
        const copy = HelperFunctions.copyObject(pollVoteData);
        copy.isSubmittingVote = true;

        dispatch({
            type: ActionTypes.POLL_VOTE,
            payload: { pollVoteData: copy }
        });

        dispatch({
            type: ActionTypes.SUBMIT_POLL_VOTE,
            disableGlobalLoader: true,
            promise: APIEndpoints.submitPollVote(data),
            callback: function (payload) {
                if (payload.statusCode === 200) {
                    dispatch(getPollVoteData(false));
                } else {
                    dispatch(getPollVoteData(false));
                }
            }
        })
    }
}

export function toggleDailyRewardBeforeCountDownPopup(flag) {
    return (dispatch, getState) => {

        dispatch({
            type: ActionTypes.TOGGLE_DAILY_REWARD_BEFORE_COUNTER_POPUP,
            payload: { dailyRewardBeforeCounterPopup: flag }
        });

        HelperFunctions.toCheckPopupVisible();
    }
}