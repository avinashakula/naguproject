/*
* This is a common place where application state resides known as store
* combineReducer() fuction is used to merge more than one reducer into a single unit
* applyMiddleware() function is used to apply middleware for mid task i.e. Web service calling
* createStore() method return store created with the help of reducers and middlewares
* */

import {applyMiddleware, combineReducers, compose, createStore} from 'redux';
import thunk from 'redux-thunk';
import fetchMiddleware from "../middleware";
import common from "../modules/common";
import rootNavigator from "../modules/navigator/rootNavigator";
import challenges from "../modules/screens/challenges";
import facts from '../modules/screens/facts';
import factsTwo from '../modules/screens/factsTwo';
import games from "../modules/screens/games";
import home from "../modules/screens/home";
import leaderboard from "../modules/screens/leaderboard";
import menu from "../modules/screens/menu";
import shop from "../modules/screens/shop";

const reducers = combineReducers({
    [common.constants.NAME]: common.reducer,
    [rootNavigator.constants.NAME]: rootNavigator.reducer,
    [home.constants.NAME]: home.reducer,
    [shop.constants.NAME]: shop.reducer,
    [challenges.constants.NAME]: challenges.reducer,
    [games.constants.NAME]: games.reducer,
    [leaderboard.constants.NAME]: leaderboard.reducer,
    [menu.constants.NAME]: menu.reducer,
    [facts.constants.NAME]: facts.reducer,
    [factsTwo.constants.NAME]: factsTwo.reducer,
});

/**
 * This root reducer will be used if we want a specific action to change all reducers state at once
 * @param state
 * @param action
 * @returns {any}
 */
const rootReducer = (state, action) => {
    return reducers(state, action)
}

let store = createStore(rootReducer, compose(applyMiddleware(thunk, fetchMiddleware,)));

export default store;