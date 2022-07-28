import * as ActionTypes from "./actionTypes";

const initialState = {
    userBenefits: null,
    games: null,
    isUserSuspended: null,
    gamesDataLoading: true,
    stats: null,
    funfacts: null,
    dailyRewardFirstPopup: false,
    dailyRewardClaimedPopup: false,
    claimReward: {
        message: null,
        isAdded: null,
        isLoading: false
    },
    pollVoteData: null,
    dailyRewardBeforeCounterPopup: false,
    isUserLoggedOut: false
};
const reducer = (state = initialState, action) => {
    switch (action.type) {
        case ActionTypes.GET_USERS_LEVEL_DATA:
            return { ...state, userBenefits: action.payload };
        case ActionTypes.GET_GAMES_DATA:
            return { ...state, games: action.payload }
        case ActionTypes.GAMES_DATA_LOADER:
            return { ...state, gamesDataLoading: action.payload }
        case ActionTypes.USER_IS_SUSPENDED:
            return { ...state, ...action.payload }
        case ActionTypes.WEEK_STATS:
            return { ...state, stats: action.payload }
        case ActionTypes.FUN_FACTS:
            return { ...state, funfacts: action.payload }
        case ActionTypes.TOGGLE_DAILY_REWARD_FIRST_POPUP:
            return { ...state, ...action.payload }
        case ActionTypes.TOGGLE_DAILY_REWARD_CLAIMED_POPUP:
            return { ...state, ...action.payload }
        case ActionTypes.CLAIM_DAILY_REVEAL:
            return { ...state, claimReward: { ...state.claimReward, ...action.payload } };
        case ActionTypes.POLL_VOTE:
            return { ...state, ...action.payload }
        case ActionTypes.TOGGLE_DAILY_REWARD_BEFORE_COUNTER_POPUP:
            return { ...state, ...action.payload }
        case ActionTypes.USER_IS_LOGGED_OUT:
            return { ...state, ...action.payload }
        default:
            return { ...state }
    }
};
export default reducer;