import * as ActionTypes from './actionTypes';
import ProjectRoutes from '../../../config/routes/projectRoutes';
import HelperFunctions from '../../../utils/HelperFunctions';
/*
* @isRequesting => if true show global progress else hide it (used in root navigator)
* @isRequestingForWhom => it will be used to show progress on buttons (like no global progress but progress on individual pages) store a string here and 
compare the string in local pages on which you want to show the progress
* @error => @isError ==> if true error occurred while requesting else false
*           @error   ==> complete error object received from server (error message, error code etc.)
* @totalRequestCount => loader will be visible until totalRequestCount === 0
* @networkStatus => what is the network status connected or disconnected,
* @currentOrientation => represents the current orientation of the device and height and width to that particular orientation
*
* */

const initialState = {
    isRequesting: false,
    isRequestingForWhom: '',
    totalRequestCount: 0,
    currentOrientation: {
        orientation: 'LANDSCAPE',
        height: window.innerHeight,
        width: window.innerWidth,
    },
    error: {
        isError: false,
        error: null
    },
    networkStatus: null,
    userInfo: null,
    userPopups: { // object to maintain which popups user has seen

    },
    userIp: null,
    howTo: {  // data to handle faq popup on all pages
        isShow: false,
        data: null,
        activeIndexArr: [0, 1]
    },
    navigation: [
        {
            page: "Home",
            page_url: ProjectRoutes.home.url,
            page_icon: 'icon pp-dots-circle',
            page_path_obj: {
                pathname: ProjectRoutes.home.url,
                search: HelperFunctions.getQueryStringFromURL(),
                state: { isNavClicked: true }
            }
        },
        {
            page: "Play",
            page_url: ProjectRoutes.games.url,
            page_icon: 'icon pp-game',
            page_path_obj: {
                pathname: ProjectRoutes.games.url,
                search: HelperFunctions.getQueryStringFromURL(),
                state: { isNavClicked: true }
            },
        },
        {
            page: "Store",
            page_url: ProjectRoutes.shop.url,
            page_icon: 'icon pp-item',
            page_path_obj: {
                pathname: ProjectRoutes.shop.url,
                search: HelperFunctions.getQueryStringFromURL(),
                state: { isNavClicked: true, defaultShow: "store" } //inventory
            },
        },
        {
            page: "Challenges",
            page_url: ProjectRoutes.challenges.url,
            page_icon: 'icon pp-challenges',
            page_path_obj: {
                pathname: ProjectRoutes.challenges.url,
                search: HelperFunctions.getQueryStringFromURL(),
                state: { isNavClicked: true }
            },
        },
        {
            page: "Leaderboard",
            page_url: ProjectRoutes.leaderboard.url,
            page_icon: 'icon pp-leader',
            page_path_obj: {
                pathname: ProjectRoutes.leaderboard.url,
                search: HelperFunctions.getQueryStringFromURL(),
                state: { isNavClicked: true }
            },
        },
        {
            page: "Menu",
            page_url: ProjectRoutes.menu.url,
            page_icon: 'icon pp-menu',
            page_path_obj: {
                pathname: ProjectRoutes.menu.url,
                search: HelperFunctions.getQueryStringFromURL(),
                state: { isNavClicked: true }
            },
        }
    ],
    displayNameData: {
        isAdded: null,
        isSubmitting: null,
        errorMsg: null
    },
    unlockingItemsPopupFlag: false,
    unlockingFactCardPopupFlag: false,
    unlockingChallengesPopupFlag: false,
    userNotification: null,
    tierPopup: null,
    claimData: {
        isAdded: null,
        isSubmitting: null,
        errorMsg: null
    },
    currentGroupInfo: null,
    welcomeScreenData: null,
    claimWC: {
        isAdded: null,
        isSubmitting: null,
        errorMsg: null
    },
    congratulationsPrizePopup: null,
    doubleRewardsPopup: null,
    playTabAnim: false,
    challengesTabAnim: false,
    oneGamePlayedPopup: false,
    clickedGame: null,
    isNickNameAvailable: null,
    isRouteChanged: false,
    activeWT: null,
    globalLoader: false,
}
const commonReducer = (state = initialState, action) => {
    switch (action.type) {
        case ActionTypes.REQUEST:
            return {
                ...state, isRequesting: true,
                isRequestingForWhom: action.payload ? action.payload.isRequestingForWhom : '',
                totalRequestCount: state.totalRequestCount + 1,
            };
        case ActionTypes.REQUEST_COMPLETE:
            return {
                ...state, isRequesting: false,
                isRequestingForWhom: '',
                totalRequestCount: state.totalRequestCount > 0 ? state.totalRequestCount - 1 : 0,
            };
        case ActionTypes.SET_CURRENT_ORIENTATION:
            return {
                ...state, currentOrientation: action.payload.currentOrientation,
            };
        case ActionTypes.SET_NETWORK_STATUS:
            return {
                ...state, networkStatus: action.payload.networkStatus,
            };
        case ActionTypes.REQUEST_FAILURE:
            return {
                ...state,
                isRequesting: false,
                isRequestingForWhom: '',
                error: {
                    isError: true,
                    error: action.payload.err
                },
            };
        case ActionTypes.USER_INFO:
            return { ...state, ...action.payload };
        case ActionTypes.GET_USER_POPUPS:
            return { ...state, ...action.payload };
        case ActionTypes.USER_IP_ADDRESS:
            return { ...state, ...action.payload };
        case ActionTypes.SHOW_HOW_TO_DATA:
            return { ...state, howTo: { ...state.howTo, ...action.payload } };
        case ActionTypes.SUBMIT_USER_DISPLAY_NAME:
            return { ...state, displayNameData: { ...state.displayNameData, ...action.payload } };
        case ActionTypes.TOGGLE_ITEMS_UNLOCKING_POPUP:
            return { ...state, ...action.payload };
        case ActionTypes.TOGGLE_FACT_CARD_UNLOCKING_POPUP:
            return { ...state, ...action.payload };
        case ActionTypes.TOGGLE_CHALLENGES_UNLOCKING_POPUP:
            return { ...state, ...action.payload };
        case ActionTypes.TOGGLE_TIER_POPUP:
            return { ...state, ...action.payload };
        case ActionTypes.GET_USER_NOTIFICATION:
            return { ...state, ...action.payload };
        case ActionTypes.CLAIM_TIER_PRIZES:
            return { ...state, claimData: { ...state.claimData, ...action.payload } };
        case ActionTypes.CURRENT_GROUP_INFO:
            return { ...state, ...action.payload };
        case ActionTypes.TOGGLE_WELCOME_SCREENS:
            return { ...state, ...action.payload };
        case ActionTypes.TOGGLE_LOYALTY_POPUP:
            return { ...state, loyaltyData: { ...state.loyaltyData, ...action.payload } }
        case ActionTypes.TOGGLE_WELCOME_SCREENS:
            return { ...state, ...action.payload };
        case ActionTypes.CLAIM_WELCOME_BONUS:
            return { ...state, claimWC: { ...state.claimWC, ...action.payload } };
        case ActionTypes.TOGGLE_PRIZE_CONGRATULATIONS:
            return { ...state, ...action.payload };
        case ActionTypes.TOGGLE_PLAY_TAB_ANIMATION:
            return { ...state, ...action.payload };
        case ActionTypes.TOGGLE_CHALLENGES_TAB_ANIMATION:
            return { ...state, ...action.payload };
        case ActionTypes.TOGGLE_PLAYED_ONE_GAME:
            return { ...state, ...action.payload };
        case ActionTypes.TOGGLE_DOUBLE_REWARDS_POPUP:
            return { ...state, ...action.payload };
        case ActionTypes.TO_CHECK_WHICH_GAME_CLICKED:
            return { ...state, ...action.payload };
        case ActionTypes.TO_CHECK_NICKNAME_AVAILABLE:
            return { ...state, ...action.payload };
        case ActionTypes.TO_CHECK_ROUTE_CHANGED:
            return { ...state, ...action.payload };
        case ActionTypes.WHICH_WALKTHROUGH_WILL_SHOW:
            return { ...state, ...action.payload };
        case ActionTypes.SHOW_GLOBAL_LOADER:
            return { ...state, globalLoader: action.payload }
        default:
            return { ...state }
    }
};
export default commonReducer;