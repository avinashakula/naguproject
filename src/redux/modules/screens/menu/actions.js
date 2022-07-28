import APIEndpoints from "../../../../config/APIEndpoints";
import HelperFunctions from "../../../../utils/HelperFunctions";
import { accountButton, pageLoad } from "../../../../utils/Gtm";
import * as ActionTypes from "./actionTypes";
import common from "../../common";
import * as constants from "./constants";
import Constants from "../../../../utils/Constants";

let flagToMaintainOneTimePageLoad = false;

export function callOnPageLoad() {
    return (dispatch, getState) => {
        //dispatch(pageContentAPI());
        dispatch(common.actions.logAccess({ 'path': '/menu', 'code': Constants.LOGACCESS_CODE }));
        dispatch(pageContentAPI("terms-and-condition"));
        dispatch(faqApi())
        dispatch(getLeaderboardPrizes())
        dispatch(common.actions.userTracking("menu"));
        // dispatch(common.actions.getUserPopups());
        dispatch(common.actions.toCheckNicknameAvailable(false));
    }
}

export function faqApi(disableMainLoader = true) {
    return (dispatch) => {
        // dispatch({
        //     type: ActionTypes.FAQ,
        //     payload: { data: null, loading: true },
        // });

        dispatch({
            type: ActionTypes.FAQ,
            disableGlobalLoader: disableMainLoader,
            promise: APIEndpoints.faq(),
        });
    };
}

export function pageContentAPI(page_url = null) {
    return (dispatch) => {
        if (page_url) {
            // dispatch(common.actions.userTracking("menu_" + page_url, 0, null));
            dispatch({
                type: ActionTypes.PAGE_CONTENT,
                payload: { data: null, loading: true },
            });
        }

        dispatch({
            type: page_url ? ActionTypes.PAGE_CONTENT : ActionTypes.NAV_PAGE_LIST,
            disableGlobalLoader: true,
            promise: APIEndpoints.pageContents(page_url ? page_url : 'all'),
            callback: function (payload) {
                if (payload) {
                    if (page_url == null) {
                        dispatch(faqApi())
                        dispatch(getLeaderboardPrizes())
                    }
                }
            }
        });
    };
}

export function gameDataApi(group_id = null, gameType = null) {
    return (dispatch, getState) => {
        dispatch({
            type: ActionTypes.GAME_DATA,
            disableGlobalLoader: true,
            promise: APIEndpoints.userScoreHistory(group_id, gameType),
            callback: function (payload) {
                const { myHistory } = getState()[constants.NAME];
                const myHistoryCopy = HelperFunctions.copyObject(myHistory);
                const data = myHistoryCopy.data;

                data.cdn_url = payload.content.cdn_url;
                const groups = data.seasons;

                for (let i = 0; i < groups.length; i++) {
                    for (let j = 0; j < groups[i].months.length; j++) {
                        for (let k = 0; k < groups[i].months[j].groups.length; k++) {
                            if (groups[i].months[j].groups[k].group_id === group_id) {
                                if (payload.content && payload.content.group_details) {
                                    const gamesArray = payload.content.group_details[0].games.reverse();

                                    let gameNumber = gamesArray.length;
                                    for (let i = 0; i < gamesArray.length; i++) {
                                        gamesArray[i].game_number = gameNumber;
                                        gameNumber--;
                                    }

                                    // console.log(gamesArray);

                                    groups[i].months[j].groups[k].games = gamesArray;
                                } else {
                                    groups[i].months[j].groups[k].games = null;
                                }

                                // console.log(myHistoryCopy.data, "myHistoryCopy.data");

                                if (gameType == 'hts' || gameType === "gaelic") {
                                    dispatch({
                                        type: ActionTypes.GROUP_DETAIL_HTS,
                                        payload: { data: myHistoryCopy.data, loading: false },
                                    });
                                } else if (gameType == 'mgi') {
                                    dispatch({
                                        type: ActionTypes.GROUP_DETAIL_MGI,
                                        payload: { data: myHistoryCopy.data, loading: false },
                                    });
                                } else if (gameType == 'trivia') {
                                    dispatch({
                                        type: ActionTypes.GROUP_DETAIL_TRIVIA,
                                        payload: { data: myHistoryCopy.data, loading: false },
                                    });
                                } else if (gameType == 'hg' || gameType == 'hgo') {
                                    dispatch({
                                        type: ActionTypes.GROUP_DETAIL_HG,
                                        payload: { data: myHistoryCopy.data, loading: false },
                                    });
                                } else if (gameType == 'headers') {
                                    dispatch({
                                        type: ActionTypes.GROUP_DETAIL_HEADERS,
                                        payload: { data: myHistoryCopy.data, loading: false },
                                    });
                                } else if (gameType == 'puckluck') {
                                    dispatch({
                                        type: ActionTypes.GROUP_DETAIL_HEADERS,
                                        payload: { data: myHistoryCopy.data, loading: false },
                                    });
                                } else if (gameType == 'bbbash') {
                                    dispatch({
                                        type: ActionTypes.GROUP_DETAIL_HEADERS,
                                        payload: { data: myHistoryCopy.data, loading: false },
                                    });
                                } else {
                                    dispatch({
                                        type: ActionTypes.GROUP_DETAIL,
                                        payload: { data: myHistoryCopy.data, loading: false },
                                    });
                                }

                                break;
                            }
                        }
                    }
                }
            }
        });
    };
}

export function groupsApi(gameType = null) {
    return (dispatch) => {
        // console.log(gameType, "gameType")
        dispatch(common.actions.userTracking("menu_my-history", {game: gameType}));
        if (gameType == 'hts' || gameType === "gaelic") {
            dispatch({
                type: ActionTypes.GROUP_DETAIL_HTS,
                payload: { data: null, loader: true },
            });
            dispatch({
                type: ActionTypes.GROUP_DETAIL_HTS,
                disableGlobalLoader: true,
                promise: APIEndpoints.groups(gameType),
            });
        } else if (gameType == 'mgi') {
            dispatch({
                type: ActionTypes.GROUP_DETAIL_MGI,
                payload: { data: null, loader: true },
            });
            dispatch({
                type: ActionTypes.GROUP_DETAIL_MGI,
                disableGlobalLoader: true,
                promise: APIEndpoints.groups(gameType),
            });
        } else if (gameType == 'trivia') {
            dispatch({
                type: ActionTypes.GROUP_DETAIL_TRIVIA,
                payload: { data: null, loader: true },
            });
            dispatch({
                type: ActionTypes.GROUP_DETAIL_TRIVIA,
                disableGlobalLoader: true,
                promise: APIEndpoints.groups(gameType),
            });
        } else if (gameType == 'hg' || gameType == 'hgo') {
            // console.log(gameType, "gameType");
            dispatch({
                type: ActionTypes.GROUP_DETAIL_HG,
                payload: { data: null, loader: true },
            });
            dispatch({
                type: ActionTypes.GROUP_DETAIL_HG,
                disableGlobalLoader: true,
                promise: APIEndpoints.groups(gameType),
            });
        } else if (gameType == 'headers') {
            dispatch({
                type: ActionTypes.GROUP_DETAIL_HEADERS,
                payload: { data: null, loader: true },
            });
            dispatch({
                type: ActionTypes.GROUP_DETAIL_HEADERS,
                disableGlobalLoader: true,
                promise: APIEndpoints.groups(gameType),
            });
        }  else if (gameType == 'puckluck') {
            dispatch({
                type: ActionTypes.GROUP_DETAIL_HEADERS,
                payload: { data: null, loader: true },
            });
            dispatch({
                type: ActionTypes.GROUP_DETAIL_HEADERS,
                disableGlobalLoader: true,
                promise: APIEndpoints.groups(gameType),
            });
        }  else if (gameType == 'bbbash') {
            dispatch({
                type: ActionTypes.GROUP_DETAIL_HEADERS,
                payload: { data: null, loader: true },
            });
            dispatch({
                type: ActionTypes.GROUP_DETAIL_HEADERS,
                disableGlobalLoader: true,
                promise: APIEndpoints.groups(gameType),
            });
        }  else{
            dispatch({
                type: ActionTypes.GROUP_DETAIL,
                payload: { data: null, loader: true },
            });
            dispatch({
                type: ActionTypes.GROUP_DETAIL,
                disableGlobalLoader: true,
                promise: APIEndpoints.groups(gameType),
            });
        }
    };
}

export function selectItemInNav(selectedIndexInNav = null, menuItem = null) {
    return (dispatch, getState) => { }

}

export function toggleNav() {
    return (dispatch, getState) => {
        const { isNavOpen } = getState()[constants.NAME];

        //blockGameTouch(!isNavOpen);
        //GTM function call
        if (!isNavOpen) {
            // menuButton();
        }

        dispatch({
            type: ActionTypes.TOGGLE_NAV,
            payload: { isNavOpen: !isNavOpen },
        });
    }
}

export function toggleIframe() {
    return (dispatch, getState) => {
        const { isShowIframe } = getState()[constants.NAME];
        if (!isShowIframe) {
            // dispatch(common.actions.userTracking("menu_my-account", 0, null));
            accountButton();
        }
        dispatch({
            type: ActionTypes.IS_SHOW_IFRAME,
            payload: { isShowIframe: !isShowIframe },
        });
    }
}

export function getLeaderboardPrizes() {
    return (dispatch, getState) => {

        const { userPopups } = getState()[common.constants.NAME];
        // console.log(userPopups, "userPopups");

        // dispatch({
        //     type: ActionTypes.GET_LEADERBOARD_PRIZES_DATA,
        //     payload: { leaderboardPrizesData: null },
        // });

        dispatch({
            type: ActionTypes.GET_LEADERBOARD_PRIZES_DATA,
            disableGlobalLoader: true,
            promise: APIEndpoints.leaderboardPrizesData(),
            callback: (payload) => {
                // console.log(payload, "payload");
                if(payload.leaderboardPrizesData && payload.leaderboardPrizesData.last_week_lb_prizes) {
                    dispatch(common.actions.togglePrizeCongratulationsPopup(true));
                }

                const userPlayedInfo = payload.leaderboardPrizesData && payload.leaderboardPrizesData.user_played_game;

                if(userPlayedInfo && !userPopups[userPlayedInfo.played_game_key]) {
                    dispatch(common.actions.toggleOneGamePlayedPopup(true));
                }
                
                if (!flagToMaintainOneTimePageLoad) {
                    // dispatch(common.actions.toggleWelcomeScreens(payload));
                    pageLoad(payload.leaderboardPrizesData.user_info.account_id);
                    flagToMaintainOneTimePageLoad = true;
                }
            },
            errorCallback: function (error) {
                if (!flagToMaintainOneTimePageLoad) {
                    pageLoad();
                    flagToMaintainOneTimePageLoad = true;
                }
            }
        })
    }
}