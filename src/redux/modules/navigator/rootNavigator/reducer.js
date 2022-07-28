import * as ActionTypes from './actionTypes';

const navReducer = (state, action) => {
    switch (action.type) {
        case ActionTypes.CHANGE_SCREEN:
            return {};
        default:
            return {...state}
    }
}
export default navReducer;