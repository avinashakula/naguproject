import * as ActionTypes from './actionTypes';

const initialState = {
    challengesData: null,
    happyHourCounter: undefined,
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case ActionTypes.GET_CHALLENGES:
            return {...state, ...action.payload};
        case ActionTypes.HAPPY_HOUR_COUNTER:
            return {...state, ...action.payload};
        default:
            return {...state}
    }
};
export default reducer;