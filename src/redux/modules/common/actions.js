import $ from 'jquery';
// import Cookies from 'universal-cookie';
import APIEndpoints from "../../../config/APIEndpoints";
import ProjectRoutes from "../../../config/routes/projectRoutes";
import Constants from '../../../utils/Constants';
import DateHelper from "../../../utils/DateHelper";
import { getJSONP, getCountryNameByIpAddress } from "../../../utils/Gtm";
import HelperFunctions from "../../../utils/HelperFunctions";
import skillzone from "../screens/home";
import home from "../screens/home";
import leaderboard from '../screens/leaderboard';
import menu from "../screens/menu";
import * as ActionTypes from './actionTypes';
import * as constants from "./constants";

export function callOnPageLoad() {
    return (dispatch, getState) => {
        dispatch(menu.actions.faqApi(false));



        // dispatch(menu.actions.getLeaderboardPrizes())
        // dispatch(getUserPopups());
        // dispatch(settingsApi());
        dispatch(getCurrentGroupInfo());
        //init browser cookies from url
        // dispatch(skillzone.actions.handleCookies())

        // HelperFunctions.removeURLParameter('code');
    }
}

/**
 * this action creator is called when network status changed (connected or disconnected)
 * @param networkStatus
 * @returns {Function}
 */

export function setNetworkStatus(networkStatus) {
    return (dispatch) => {
        let status;
        if (networkStatus) {
            status = true;
        } else {
            status = false;
        }
        dispatch({ type: ActionTypes.SET_NETWORK_STATUS, payload: { networkStatus: status } })
    };
}

/**
 * call this action creator if you want to show a global progress in app
 * @returns {{type: string}}
 */
export function request() {
    return { type: ActionTypes.REQUEST };
}

/**
 * do nothing action creator
 * @returns {{type: string}}
 */
export function doNothing() {
    return { type: ActionTypes.DO_NOTHING };
}

/**
 * call this action creator if you want to hide a global progress in app
 * @returns {{type: string}}
 */
export function requestComplete(isWithTimeOut) {
    if (isWithTimeOut !== undefined) {
        const timeOut = setTimeout(() => {
            clearTimeout(timeOut);
            return { type: ActionTypes.REQUEST_COMPLETE };
        }, 200);
    }
    return { type: ActionTypes.REQUEST_COMPLETE };
}

/*
* action creator used for maintaing back functionality for different - different pages
* */
export function goBack() {
    return (dispatch, getState) => {

    };
}

/**
 * action creator that closes the app no matter on which screen you are
 * @returns {Function}
 */
export function exitApp() {
    return (dispatch) => {

    }
}

/**
 * action creator that called automatically whenever the device orientation is changed based on orientation height and width of the device is stored in the store and directly height and width is used in view
 * No need to calculate the height and width of the device in any view
 * @param currentOrientation
 * @returns {{type: string, payload: {currentOrientation: {orientation: *, height: *, width: *}}}}
 */
export function setCurrentOrientation() {
    return (dispatch, getState) => {
        const { currentOrientation } = getState()[constants.NAME];
        const orientation = window.innerHeight > window.innerWidth ? "PORTRAIT" : "LANDSCAPE";

        if (currentOrientation.orientation !== orientation) {
            // dispatch(request());
        }

        // if (orientation === 'LANDSCAPE') {
        //     if (window.outerHeight === window.innerHeight && $(".main-section").hasClass("inner-height")) {
        //         $(".main-section").removeClass("inner-height")
        //     } else if (!$(".main-section").hasClass("inner-height")) {
        //         $(".main-section").addClass("inner-height")
        //     }
        // }

        const action = {
            type: ActionTypes.SET_CURRENT_ORIENTATION,
            payload: {
                currentOrientation: {
                    orientation: orientation,
                    height: window.innerHeight,
                    width: window.innerWidth,
                }
            }
        };
        dispatch(action);
        if (currentOrientation.orientation !== orientation) {
            setTimeout(() => {
                // dispatch(requestComplete());
            }, 400);
        }
    };
}

export function storeUserInfo(userInfo = null) {
    if (userInfo && userInfo.product_token) {
        HelperFunctions.createCookie('productToken', userInfo.product_token);
    }
    return { type: ActionTypes.USER_INFO, payload: { userInfo } }
}

export function getUserPopups() {
    return (dispatch) => {
        dispatch({
            type: ActionTypes.GET_USER_POPUPS,
            disableGlobalLoader: true,
            promise: APIEndpoints.getUserPopups(),
            callback: (payload) => {
                if (payload && payload.userPopups) {

                    // console.log(payload.userPopups, "payload.userPopups");
                    dispatch(menu.actions.getLeaderboardPrizes())

                    var wtArr = [];
                    // walkthrough conditions
                    if (!payload.userPopups.sz_gold_wt && !payload.userPopups.sz_xp_wt) {
                        // dispatch(whichWalkthroughWillShow([Constants.sz_gold_wt]));
                        wtArr.push(Constants.sz_xp_wt);
                    } else {
                        if (!payload.userPopups.sz_xp_wt) {
                            // dispatch(whichWalkthroughWillShow([Constants.sz_xp_wt]));
                            wtArr.push(Constants.sz_xp_wt);
                        }

                        if (!payload.userPopups.sz_gold_wt) {
                            // dispatch(whichWalkthroughWillShow([Constants.sz_xp_wt]));
                            wtArr.push(Constants.sz_gold_wt);
                        }
                    }
                    // else 

                    // else {
                    if (!payload.userPopups.sz_game_card_wt) {
                        // dispatch(whichWalkthroughWillShow(Constants.sz_game_card_wt));
                        wtArr.push(Constants.sz_game_card_wt);
                    }
                    if (!payload.userPopups.sz_leaderboard_wt) {
                        // dispatch(whichWalkthroughWillShow(Constants.sz_leaderboard_wt));
                        wtArr.push(Constants.sz_leaderboard_wt);
                    }
                    if (!payload.userPopups.sz_shop_wt) {
                        // dispatch(whichWalkthroughWillShow(Constants.sz_shop_wt));
                        wtArr.push(Constants.sz_shop_wt);
                    }
                    if (!payload.userPopups.sz_challenges_wt) {
                        // dispatch(whichWalkthroughWillShow(Constants.sz_shop_wt));
                        wtArr.push(Constants.sz_challenges_wt);
                    }

                    dispatch(whichWalkthroughWillShow(wtArr));
                    // }




                    if (payload.userPopups.iswelcome) {
                        dispatch(toggleWelcomeScreens(false));
                    }

                    if (!payload.userPopups.iswelcome) {
                        // dispatch(togglePlayTabAnim(true));
                        dispatch(toggleWelcomeScreens(true));
                    }

                    if (!payload.userPopups.doubleRewardsWeek && HelperFunctions.doubleRewardTimeToShow()) {
                        dispatch(toggleDoubleRewardsPopup(true));
                    }
                    // if (!payload.userPopups.one_game_played || !payload.userPopups.one_game_played_week) {
                    //     dispatch(toggleOneGamePlayedPopup(true));
                    // }
                }
                dispatch(skillzone.actions.disableLoader());
                getJSONP('https://api.ipify.org?format=jsonp&callback=?', function (data) {
                    // console.log(data, "ip data");
                    const ipAddress = data.ip;
                    dispatch(storeUserIP(ipAddress))
                });

                // getJSONP('https://ip.nf/me.json', function (data) {
                //     console.log(data, "ip data");
                //     // const ipAddress = data.ip;
                //     // dispatch(storeUserIP(ipAddress))
                // });

                // $.get("", function (response) {
                //     console.log(response.city, response.country);
                // }, "jsonp");
            }
        });
    };
}

export function setUserPopups(key, value) {
    var dataToPass = { popup: key, value };

    return (dispatch, getState) => {


        const { userPopups } = getState()[constants.NAME];

        dispatch({
            type: ActionTypes.SET_USER_POPUPS,
            disableGlobalLoader: true,
            promise: APIEndpoints.setUserPopups(dataToPass),
            callback: () => {
                HelperFunctions.toCheckPopupVisible();

                if (key !== Constants.sz_game_card_wt && key !== Constants.sz_xp_wt && key !== Constants.sz_gold_wt) {
                    dispatch(getUserPopups());
                }
                // if (key === Constants.sz_shop_wt && !userPopups.iswelcome) {
                // if (key === Constants.sz_gold_wt && !userPopups.iswelcome) {
                //     dispatch(claimWelcomeBonus());
                // }
            }
        });
    };
}

export function handleCookies() {
    // const urlParams = HelperFunctions.getUrlVars(); //new URLSearchParams(window.location.search);
    // const keys = Object.keys(urlParams);
    // let stickyCookeValue = '';

    // for (let i = 0; i < keys.length; i++) {
    //     let key = keys[i];
    //     const value = HelperFunctions.getQueryStringValue(key);
    //     if ((HelperFunctions.isAlphaNumeric(key) || HelperFunctions.isAlphaNumericUnderscore(key)) && HelperFunctions.isAlphaNumericUnderscore(value)) {
    //         const cookies = new Cookies();
    //         let expires = new Date();
    //         expires.setDate(expires.getDate() + 45);
    //         expires = key.startsWith('utm_') ? null : expires;
    //         cookies.set(key, value, { domain: '.' + document.domain, path: '/', expires });
    //     }

    //     //PI, pi, UI, spi
    //     if (key === 'rfr') {
    //         const cookies = new Cookies();
    //         if (cookies.get('PI') === undefined) {
    //             let expires = new Date();
    //             expires.setDate(expires.getDate() + 45);

    //             const cookiesPI = new Cookies();
    //             cookiesPI.set('PI', value, { domain: '.' + document.domain, path: '/', expires });

    //             const cookiespi = new Cookies();
    //             cookiespi.set('pi', 'partner' + value, { domain: '.' + document.domain, path: '/', expires });
    //         }
    //     }
    //     if (key === 'sid') {
    //         const cookies = new Cookies();
    //         if (cookies.get('UI') === undefined) {
    //             let expires = new Date();
    //             expires.setDate(expires.getDate() + 45);

    //             const cookiesUI = new Cookies();
    //             cookiesUI.set('UI', value, { domain: '.' + document.domain, path: '/', expires });

    //             const cookiesspi = new Cookies();
    //             cookiesspi.set('spi', value, { domain: '.' + document.domain, path: '/', expires });
    //         }
    //     }

    //     //sticky and tracking tag
    //     if (['clkID', 'rfr', 'ttp', 'promotionCode'].indexOf(key) > -1) {
    //         stickyCookeValue += stickyCookeValue === '' ? key + '=' + value : '&' + key + '=' + value;
    //     }
    // }

    // if (stickyCookeValue !== '') {
    //     HelperFunctions.createDomainCookie('StickyTags', stickyCookeValue);
    //     HelperFunctions.createDomainCookie('TrackingTags', stickyCookeValue);
    // }

    // return doNothing();
}

/**
 *
 * @param ip
 * @returns {Function}
 */
export function storeUserIP(ip) {

    return (dispatch) => {
        dispatch({
            type: ActionTypes.USER_IP_ADDRESS,
            payload: { userIp: ip }
        })
    }
}

/**
 * this is used for user tacking which takes following params
 * @param actionVal => major action ex: for play url => "play"
 * @param game => game can be 0 => HTS, 1 => headers, 2 => dribbling
 * @param propObj => extra data in JSON format
 * @returns {Function}
 */
export function userTracking(actionVal, propObj) {
    return (dispatch, getState) => {
        // console.log(getState()[constants.NAME]);
        const { currentGroupInfo, userInfo, userIp } = getState()[constants.NAME];
        // console.log(userInfo, "userInfo")
        let trackerID = 'scsz';
        let appID = HelperFunctions.detectDevice();
        let action = actionVal + "_" + DateHelper.getCurrentTimeStamp();

        let obj = {

        };

        if (currentGroupInfo) {
            obj = {
                curr_season: currentGroupInfo.season,
                curr_gamegroup: currentGroupInfo.game_group_name,
                curr_week: currentGroupInfo.week,
                curr_group: currentGroupInfo.group_id
            };
        }

        if (propObj) {
            obj = Object.assign(obj, propObj);
        }
        let userID = userInfo ? userInfo.account_id : "anon";
        //let qString = "?trackerid=" + trackerID + "&app=" + appID + "&action=" + action + "&properties=" + JSON.stringify(obj) + "&userid=" + userID + "&userip=" + userIp;

        let qString = {
            trackerid: trackerID,
            app: appID,
            action: action,
            properties: obj,
            userid: userID,
            userip: userIp
        }

        // console.log(qString, "tracker obj");
        dispatch({
            type: ActionTypes.TRACK_USER_ACTIVITY,
            disableGlobalLoader: true,
            promise: APIEndpoints.tracking(qString)
        })

    }
}

export function handleHowToPopup(isShow, current_page_url, indexToShow = null) {
    return (dispatch, getState) => {
        const { activeIndexArr } = getState()[constants.NAME].howTo;
        // console.log(activeIndexArr, indexToShow, "active");
        $("body").toggleClass("show-modal")

        let arr = [0]
        switch (current_page_url) {
            case ProjectRoutes.home.url:
                arr = [0, 5, 6];
                break;
            case ProjectRoutes.games.url:
                arr = [10, 11];
                break;
            case ProjectRoutes.shop.url:
                arr = [6, 8];
                break;
            case ProjectRoutes.challenges.url:
                arr = [9];
                break;
            case ProjectRoutes.leaderboard.url:
                arr = [1, 4];
                break;
            case ProjectRoutes.menu.url:
                arr = [0];
                break;
        }

        if (indexToShow !== null) {
            // if (activeIndexArr.includes(indexToShow)) {
            //     arr = [];
            // }
            // else {
            arr = [indexToShow];
            // }
        }

        // console.log(arr, "prize");

        dispatch({
            type: ActionTypes.SHOW_HOW_TO_DATA,
            payload: { isShow: isShow, activeIndexArr: arr }
        });
    };
}

export function logAccess(data) {
    return (dispatch, getState) => {
        dispatch({
            type: ActionTypes.LOG_ACCESS,
            disableGlobalLoader: true,
            promise: APIEndpoints.logAccess(data),
            callback: function (payload) {
                if (payload.content) {
                    // if (payload.content.iswelcome) {
                    // dispatch(getChallengesData());
                    // }
                }
            },
        });
    }
}

export function getUserNotifications() {
    return (dispatch, getState) => {
        dispatch({
            type: ActionTypes.GET_USER_NOTIFICATION,
            disableGlobalLoader: true,
            promise: APIEndpoints.getUserNotifications(),
            callback: function (payload) {
                if (payload.userNotification) {
                    let notifications = payload.userNotification;

                    // console.log(notifications, "notifications");
                    //dispatch action to show popup of Traning
                    // if (notifications.training) {
                    //     dispatch(toggleTrainingUnlockingPopup(true));
                    // }

                    //dispatch action to show popup of Items
                    // if (notifications.items) {
                    //     dispatch(toggleItemsUnlockingPopup(true));
                    // }

                    //dispatch action to show popup of Fact Card
                    // if (notifications.factcard) {
                    //     dispatch(toggleFactCardUnlockingPopup(true));
                    // }

                    //dispatch action to show popup of Challenges
                    // if (notifications.challenges) {
                    //     dispatch(toggleChallengesUnlockingPopup(true));
                    // }


                }
            }
        })
    }
}

//to send opened tab data of notification
export function postUserNotificationData(data) {
    return (dispatch, getState) => {
        dispatch({
            type: ActionTypes.POST_USER_NOTIFICATION,
            disableGlobalLoader: true,
            promise: APIEndpoints.postUserNotification(data),

        })
    }
}

//to close training unlocking popup information
export function toggleTrainingUnlockingPopup(flag) {
    return (dispatch, getState) => {
        const { userNotification } = getState()[constants.NAME];

        dispatch({
            type: ActionTypes.TOGGLE_TRAINING_UNLOCKING_POPUP,
            payload: { unlockingPopupFlag: flag }
        });

        HelperFunctions.toCheckPopupVisible();
        if (userNotification && flag === false) {
            dispatch(postUserNotificationData({ game_type_idx: userNotification.training.id, status: 'N' }));
        }
    }
}

//to close items unlocking popup information
export function toggleItemsUnlockingPopup(flag) {
    return (dispatch, getState) => {
        const { userNotification } = getState()[constants.NAME];

        dispatch({
            type: ActionTypes.TOGGLE_ITEMS_UNLOCKING_POPUP,
            payload: { unlockingItemsPopupFlag: flag }
        });

        HelperFunctions.toCheckPopupVisible();
        if (userNotification && flag === false) {
            // $("body").removeClass("show-modal");
            dispatch(postUserNotificationData({ game_type_idx: userNotification.items.id, status: 'N' }));
        }
    }
}

//to close fact card unlocking popup information
export function toggleFactCardUnlockingPopup(flag) {

    // console.log("check");
    return (dispatch, getState) => {
        const { userNotification } = getState()[constants.NAME];

        dispatch({
            type: ActionTypes.TOGGLE_FACT_CARD_UNLOCKING_POPUP,
            payload: { unlockingFactCardPopupFlag: flag }
        });

        HelperFunctions.toCheckPopupVisible();
        if (userNotification && flag === false) {
            // $("body").removeClass("show-modal");
            dispatch(postUserNotificationData({ game_type_idx: userNotification.factcard.id, status: 'N' }));
        }
    }
}

//to close challenges unlocking popup information
export function toggleChallengesUnlockingPopup(flag) {
    return (dispatch, getState) => {
        const { userNotification } = getState()[constants.NAME];
        dispatch({
            type: ActionTypes.TOGGLE_CHALLENGES_UNLOCKING_POPUP,
            payload: { unlockingChallengesPopupFlag: flag }
        });

        if (flag) {
            dispatch(toggleChallengesTabAnim(true));
        } else {
            setTimeout(function () {
                dispatch(toggleChallengesTabAnim(false));
            }, 10000)
        }

        HelperFunctions.toCheckPopupVisible();

        if (userNotification && flag === false) {
            // $("body").removeClass("show-modal");
            dispatch(postUserNotificationData({ game_type_idx: userNotification.challenges.id, status: 'N' }));
        }
    }
}

/**
 *
 * @returns {Function}
 */
export function getCurrentGroupInfo() {
    return (dispatch) => {
        dispatch({
            type: ActionTypes.CURRENT_GROUP_INFO,
            disableGlobalLoader: true,
            promise: APIEndpoints.getCurrentGroup(),
            callback: function (payload) {
                // console.log(payload, "payload");
                getJSONP('https://api.ipify.org?format=jsonp&callback=?', function (data) {
                    const ipAddress = data.ip;
                    dispatch(storeUserIP(ipAddress))
                });
                if (payload.currentGroupInfo) {
                    dispatch(home.actions.getPollVoteData(false));
                }
            }
        });
    };
}

export function settingsApi() {
    return {
        type: ActionTypes.SETTINGS,
        disableGlobalLoader: true,
        promise: APIEndpoints.setting(),
    };
}

export function submitUserDisplayName(data, router, clickedFromPlay, tabClicked) {
    return (dispatch, getState) => {

        const { clickedGame } = getState()[constants.NAME];
        console.log(clickedGame, "clickedGame");

        dispatch({
            type: ActionTypes.SUBMIT_USER_DISPLAY_NAME,
            payload: { isSubmitting: true, isAdded: null, errorMsg: null }
        });

        dispatch({
            type: ActionTypes.SUBMIT_USER_DISPLAY_NAME,
            disableGlobalLoader: true,
            promise: APIEndpoints.userDisplayName({ displayname: data }),
            callback: function (payload) {
                if (payload.isAdded) {
                    setTimeout(function () {
                        $("body").removeClass("show-modal");
                        dispatch(home.actions.getUserBenefits())
                        dispatch(home.actions.getWeekStats())
                        if (router.location.pathname === ProjectRoutes.leaderboard.url) {
                            dispatch(leaderboard.actions.emptyStoreData());
                            dispatch(leaderboard.actions.getLeaderboardData())
                        }

                        if (clickedGame) {
                            if (clickedGame === "lb") {
                                dispatch(leaderboard.actions.getLeaderboardWeeks());
                            } else {
                                setTimeout(function () {
                                    window.location.href = HelperFunctions.getRedirectGameURL(clickedGame);
                                }, 500)
                            }

                        }
                        // if (clickedFromPlay) {
                        //     router.push({
                        //         pathname: ProjectRoutes.play.hts.url,
                        //         search: HelperFunctions.getQueryStringFromURL(),
                        //         state: {button_click: tabClicked}
                        //     });
                        // }
                        //dispatch(getUserBenefits());
                    }, 1000)
                }
            },
        });
    }
}

export function emptySubmitNameData() {
    return (dispatch, getState) => {
        dispatch({
            type: ActionTypes.SUBMIT_USER_DISPLAY_NAME,
            payload: { isSubmitting: false, isAdded: null, errorMsg: null }
        });
    }
}

export function toggleTierPopup(flag) {
    return (dispatch, getState) => {

        // console.log(flag);

        dispatch({
            type: ActionTypes.CLAIM_TIER_PRIZES,
            payload: { isSubmitting: null, isAdded: null, errorMsg: null }
        });

        dispatch({
            type: ActionTypes.TOGGLE_TIER_POPUP,
            payload: { tierPopup: flag }
        });

        HelperFunctions.toCheckPopupVisible();
    }
}

export function claimTierPrize() {
    return (dispatch, getState) => {

        let data = {
            "txn_type": "IN",
            "txn_purpose": "tier"
        };

        dispatch({
            type: ActionTypes.CLAIM_TIER_PRIZES,
            payload: { isSubmitting: true, isAdded: null, errorMsg: null }
        });

        dispatch({
            type: ActionTypes.CLAIM_TIER_PRIZES,
            disableGlobalLoader: true,
            promise: APIEndpoints.purchaseInventory(data),
            callback: function (payload) {
                if (payload) {
                    setTimeout(function () {
                        dispatch(toggleTierPopup(null));
                        dispatch(home.actions.getUserBenefits());
                        HelperFunctions.toCheckPopupVisible();
                    }, 1000)
                }
            },
        });


    }
}

export function claimWelcomeBonus() {

    return (dispatch, getState) => {

        const { leaderboardPrizesData } = getState()[menu.constants.NAME];

        // let bonusGold = leaderboardPrizesData.welcome_bonus;
        // if(leaderboardPrizesData.loyality_bonus) {
        //     bonusGold += leaderboardPrizesData.loyality_bonus;
        // }

        // console.log(leaderboardPrizesData, "in claim")
        let dataToPass = {
            txn_type: "IN",
            txn_purpose: "welcomebonus",
            items: [
                {
                    item: "gold",
                    txn_amount: 100
                }
            ]
        };



        dispatch({
            type: ActionTypes.CLAIM_WELCOME_BONUS,
            payload: { isSubmitting: true, isAdded: null, errorMsg: null }
        });

        dispatch({
            type: ActionTypes.CLAIM_WELCOME_BONUS,
            disableGlobalLoader: true,
            promise: APIEndpoints.purchaseInventory(dataToPass),
            callback: function (payload) {
                // console.log(payload, "payload");
                if (payload.isAdded) {
                    dispatch(userTracking("claimed_welcome_bonus"));
                    setTimeout(function () {
                        dispatch(togglePlayTabAnim(false));
                    }, 10000)

                    // setTimeout(function () {
                    // HelperFunctions.toCheckPopupVisible();
                    // dispatch(toggleWelcomeScreens(null));
                    dispatch(setUserPopups('iswelcome', true));
                    dispatch({
                        type: ActionTypes.CLAIM_WELCOME_BONUS,
                        payload: { isSubmitting: false, isAdded: null, errorMsg: null }
                    });
                    dispatch(home.actions.getUserBenefits());
                    // }, 10)

                    // setTimeout(function () {
                    //     // HelperFunctions.toCheckPopupVisible();
                    //     window.location.reload();
                    // }, 2800)
                } else {
                    dispatch({
                        type: ActionTypes.CLAIM_WELCOME_BONUS,
                        payload: { isSubmitting: null, isAdded: null, errorMsg: null }
                    });
                }
            }
        })
    }
}

export function toggleLoyaltyPopup(flag, data) {

    /*flag = true;
    data = {
        backpay_days: "12",
        backpay_gold: "100",
        survey_gold: "100",
        welcome_gold: "100"
    };*/
    if (data) {
        let objLength = Object.keys(data).length;
        let gold = 0;
        if (data.backpay_gold) {
            gold += parseInt(data.backpay_gold);
        }

        if (data.survey_gold) {
            gold += parseInt(data.survey_gold);
        }

        if (data.welcome_gold) {
            gold += parseInt(data.welcome_gold);
        }
        data.popupHeading = "THANKS FOR YOUR LOYALTY";
        if (objLength === 1 && data.welcome_gold) {
            data.popupHeading = "WELCOME TO THE NEW HIT THE SPOT";
            data.innerHeading = "As a special welcome to the new hit the spot we are crediting your account with " + gold + " Gold!";
        } else {
            if (objLength === 2 && data.welcome_gold && data.survey_gold) {
                data.popupHeading = "THANKS FOR YOUR FEEDBACK";
                data.innerHeading = "Because you have given us feedback via our Hit The Spot survey in the past, we have credited your account with " + gold + " Gold!";
            } else {
                if (data.backpay_days) {
                    if (parseInt(data.backpay_days) === 1) {
                        data.innerHeading = "Because you have played Hit The Spot previously we have credited your account with " + gold + " gold!";
                    } else if (parseInt(data.backpay_days) > 1 && parseInt(data.backpay_days) <= 10) {
                        data.innerHeading = "Because you have played Hit The Spot more than once we have credited your account with " + gold + " gold!";
                    } else {
                        data.innerHeading = "Because you have played Hit The Spot for more than " + data.backpay_days + " days we have credited your account with " + gold + " gold!";
                    }
                }
            }
        }
    }

    return (dispatch, getState) => {
        dispatch({
            type: ActionTypes.TOGGLE_LOYALTY_POPUP,
            payload: { flag: flag, data: data }
        });
    }
}

export function toggleWelcomeScreens(data) {
    return (dispatch, getState) => {
        const { leaderboardPrizesData } = getState()[menu.constants.NAME];

        HelperFunctions.toCheckPopupVisible();
        dispatch({
            type: ActionTypes.TOGGLE_WELCOME_SCREENS,
            payload: { welcomeScreenData: data }
        });
    }
}

export function togglePrizeCongratulationsPopup(flag) {
    return (dispatch, getState) => {
        const { leaderboardPrizesData } = getState()[menu.constants.NAME];
        if (!flag) {
            const lbPrizeKey = leaderboardPrizesData && leaderboardPrizesData.last_week_lb_prizes && leaderboardPrizesData.last_week_lb_prizes.key;
            dispatch(setUserPopups(lbPrizeKey, true));
        }

        dispatch({
            type: ActionTypes.TOGGLE_PRIZE_CONGRATULATIONS,
            payload: { congratulationsPrizePopup: flag }
        });
        HelperFunctions.toCheckPopupVisible();
    }
}

export function togglePlayTabAnim(flag) {
    return (dispatch, getState) => {
        dispatch({
            type: ActionTypes.TOGGLE_PLAY_TAB_ANIMATION,
            payload: { playTabAnim: flag }
        });
    }
}

export function toggleChallengesTabAnim(flag) {
    return (dispatch, getState) => {
        dispatch({
            type: ActionTypes.TOGGLE_CHALLENGES_TAB_ANIMATION,
            payload: { challengesTabAnim: flag }
        });
    }
}

export function toggleOneGamePlayedPopup(flag) {
    return (dispatch, getState) => {
        HelperFunctions.toCheckPopupVisible();
        const { leaderboardPrizesData } = getState()[menu.constants.NAME];
        // console.log(leaderboardPrizesData, "leaderboardPrizesData");

        if (!flag) {
            const oneTimeKey = leaderboardPrizesData && leaderboardPrizesData.user_played_game && leaderboardPrizesData.user_played_game.played_game_key;
            dispatch(setUserPopups(oneTimeKey, true));
            dispatch(userTracking(oneTimeKey + "_popup_seen"));
        }
        dispatch({
            type: ActionTypes.TOGGLE_PLAYED_ONE_GAME,
            payload: { oneGamePlayedPopup: flag }
        });
    }
}

export function toggleDoubleRewardsPopup(flag) {
    return (dispatch, getState) => {
        if (!flag) {
            dispatch(setUserPopups("doubleRewardsWeek", true));
        }

        dispatch({
            type: ActionTypes.TOGGLE_DOUBLE_REWARDS_POPUP,
            payload: { doubleRewardsPopup: flag }
        });
        HelperFunctions.toCheckPopupVisible();
    }
}

export function toCheckWhichGameClicked(game) {
    return (dispatch, getState) => {
        dispatch({
            type: ActionTypes.TO_CHECK_WHICH_GAME_CLICKED,
            payload: { clickedGame: game }
        });
    }
}

export function toCheckNicknameAvailable(flag) {
    return (dispatch, getState) => {
        const { userBenefits } = getState()[home.constants.NAME];
        if (flag === undefined)
            flag = (userBenefits && (userBenefits.display_name === undefined || userBenefits.is_username_censor));

        HelperFunctions.toCheckPopupVisible();
        dispatch({
            type: ActionTypes.TO_CHECK_NICKNAME_AVAILABLE,
            payload: { isNickNameAvailable: flag }
        });
    }
}


export function toCheckIfRouteChanged() {
    return (dispatch, getState) => {
        dispatch({
            type: ActionTypes.TO_CHECK_ROUTE_CHANGED,
            payload: { isRouteChanged: true }
        });
    }
}

export function whichWalkthroughWillShow(wt) {
    return (dispatch, getState) => {
        // console.log(wt, "wt");
        const { userPopups } = getState()[constants.NAME];
        // console.log("gold wt");
        if (wt && wt.length > 0 && wt[0] === "sz_gold_wt" && userPopups.iswelcome === undefined) {

            dispatch(claimWelcomeBonus());
        }

        dispatch({
            type: ActionTypes.WHICH_WALKTHROUGH_WILL_SHOW,
            payload: { activeWT: wt }
        });
    }
}

// sso implementaion
export function showGlobalLoader() {
    return { type: ActionTypes.SHOW_GLOBAL_LOADER, payload: true }
}

export function hideGlobalLoader() {
    return { type: ActionTypes.SHOW_GLOBAL_LOADER, payload: false }
}

export function getSSOToken() {
    return (dispatch) => {
        var code = HelperFunctions.getParameterByName('code');
        var refreshToken = HelperFunctions.readCookie("refreshToken");
        var data;
        if (code) {
            data = { authcode: code, granttype: "authorization_code" }
        } else if (refreshToken) {
            data = { authcode: refreshToken, granttype: "refresh_token" }
        }
        if (data) {
            dispatch({
                type: ActionTypes.USER_SSO_TOKEN,
                disableGlobalLoader: true,
                promise: APIEndpoints.getSSOLoginToken(data),
                callback: function (payload) {
                    HelperFunctions.removeURLParameter('code');
                    if (payload.statusCode === 200) {
                        // document.cookie = "productToken="+payload.content.access_token;
                        // document.cookie = "refreshToken="+payload.content.refresh_token;
                        HelperFunctions.createCookie("productToken", payload.content.access_token);
                        HelperFunctions.createCookie("refreshToken", payload.content.refresh_token);
                        setTimeout(function () {
                            if (HelperFunctions.getQueryStringValue('action') === "nba-pickem") {
                                window.location.href = "/games/nba-pickem/my-picks" + HelperFunctions.getQueryStringValue();
                            } else {
                                window.location.reload();
                            }
                        }, 500);
                        // dispatch(home.actions.callOnPageLoad());
                    } else {
                        dispatch(home.actions.setUserIsLoggedOut());
                    }
                    // window.history.replaceState({}, document.title, "/");
                    dispatch(hideGlobalLoader());
                }
            })
        }

    }
}

export function checkSSOToken() {
    return (dispatch) => {
        var productToken = HelperFunctions.readCookie("productToken");
        var refreshToken = HelperFunctions.readCookie("refreshToken");
        if (productToken && refreshToken) {
            dispatch({
                type: ActionTypes.USER_SSO_TOKEN,
                disableGlobalLoader: true,
                promise: APIEndpoints.checkSSOLoginToken({ granttype: "refresh_token", authcode: refreshToken }),
                callback: function (payload) {
                    console.log(payload);
                    if (payload.statusCode !== 200) {
                        if (payload.message.includes("expired")) {
                            dispatch(getSSOToken());
                        } else {
                            HelperFunctions.eraseCookie("productToken");
                            HelperFunctions.eraseCookie("refreshToken");
                            window.location.reload();
                        }
                    } else {
                        // console.log("check");
                        HelperFunctions.removeURLParameter('code');
                    }
                }
            })
        } else {
            dispatch(getSSOToken());
        }

    }
}
