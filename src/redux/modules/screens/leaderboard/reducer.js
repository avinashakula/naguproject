import * as ActionTypes from "./actionTypes";

const initialState = {
    leaderboardData: {
        leaderboard_type: null,
        data: null,
        isLoadMore: true,
        offset: 10,
        numLoaded: 0,
        isLoading: false,
        isMessageShow: false,
        leaderboardDate: null,
        userInfo: null,
        gameType: "pphts",
        leaderboardHeading: null,
        cdnPath: '',
        weekChangeLoader: false
    },
    userPopupInfo: {
        data: null,
        isShow: false
    },
    leaderboardPrize: null,
    leaderboardWeeks: null
};
const reducer = (state = initialState, action) => {
    switch (action.type) {
        case ActionTypes.GET_LEADERBOARD_DATA:
            return { ...state, leaderboardData: { ...state.leaderboardData, ...action.payload } };
        case ActionTypes.GET_USER_POPUP_INFO:
            return { ...state, userPopupInfo: { ...state.userPopupInfo, ...action.payload } };
        case ActionTypes.SHOW_PRIZE_POPUPS:
            return { ...state, ...action.payload }
        case ActionTypes.GET_LEADERBOARD_WEEKS:
            // console.log(action.payload);
            return { ...state, leaderboardWeeks : action.payload }
        default:
            return { ...state }
    }
}
    ;
export default reducer;