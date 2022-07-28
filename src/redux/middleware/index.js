import challenges from "../../assets/jsonData/challenges";
import games from "../../assets/jsonData/games";
import kitbag from "../../assets/jsonData/kitbag";
import pollVote from "../../assets/jsonData/pollVote";
import prizes from "../../assets/jsonData/prizes";
import weekStats from "../../assets/jsonData/weekStats";
import DateHelper from "../../utils/DateHelper";
import HelperFunctions from "../../utils/HelperFunctions";
/*
* This is a middle ware it gets in action when an action will
* call a web service so basically this is a mid state somewhere action creator and reducer
* */
import common from "../modules/common";
import Challenges from "../modules/screens/challenges";
import facts from "../modules/screens/facts";
import factsTwo from "../modules/screens/factsTwo";
import skillzone from "../modules/screens/home";
import home from "../modules/screens/home";
import Leaderboard from "../modules/screens/leaderboard";
import menu from "../modules/screens/menu";
import shop from "../modules/screens/shop";

export default function fetchMiddleware() {
    return next => action => {
        const { promise, ...rest } = action;
        if (!promise) {
            return next(action);
        }

        if (!action.disableGlobalLoader)
            next({ ...rest, type: common.actionTypes.REQUEST });

        let body = null;
        if (promise.method === 'GET') {
            body = { method: promise.method, headers: promise.headers }
        } else {
            body = { method: promise.method, headers: promise.headers, body: promise.data };
        }

        const promiseNew = fetch(promise.url, body);
        promiseNew.then(response => response.json())
            .then(response => {
                //if status code in resposde is 401 redirect user to identity sso
                if (response.statusCode === 403 || response.statusCode === 401) {
                    next({
                        type: common.actionTypes.REQUEST_FAILURE,
                        payload: { err: { code: response.statusCode, message: response.message } }
                    })

                    if (response.statusCode === 401) {
                        if (response.message.includes("suspended")) {
                            next(home.actions.setUserIsSuspended("sus"));
                        } else if (response.message.includes("blocked")) {
                            next(home.actions.setUserIsSuspended("blocked"));
                        }
                        next(common.actions.storeUserInfo({ isUserSuspended: true }));

                    }

                    if (response.statusCode === 403) {
                        //HelperFunctions.redirectToLoginSSO()
                        // if user token is invalid we are removing the router and rendering a simple page liked to Identity SSO
                        var ssoCode = HelperFunctions.getParameterByName('code');
                        if (ssoCode) {
                            next(common.actions.showGlobalLoader());
                        } else {
                            next(home.actions.setUserIsLoggedOut())
                        }

                    }
                }
                else { //store user info from every API call
                    if (response && response.content && response.content.user_info) {
                        // console.log("user info")
                        next(common.actions.storeUserInfo(response.content.user_info));
                    }
                }

                if (!action.disableGlobalLoader)
                    next({ ...rest, type: common.actionTypes.REQUEST_COMPLETE });

                const payload = parseResponse(action.type, response, rest);
                next({ ...rest, payload, type: action.type });
                if (action.callback)
                    action.callback(payload);
            })
            .catch(error => {
                if (action.errorCallback) {
                    action.errorCallback(error);
                }
                next({ type: common.actionTypes.REQUEST_FAILURE, payload: { err: error } })
            });

        return promiseNew;
    };

    function parseResponse(actionType, response, rest) {
        switch (actionType) {
            case skillzone.actionTypes.GET_HUB_CARDS:
                if (response.statusCode === 200) {
                    return response.content;
                }
                return null;
            case skillzone.actionTypes.GET_HOW_TO:
                if (response.statusCode === 200) {
                    return {
                        howToContent: response.content
                    };
                }
                return {
                    howToContent: null
                }
            case skillzone.actionTypes.COOKIE_BANNER_SEEN:
                if (response.statusCode !== 200) {
                    return { isCookieBannerSeen: null };
                }
                return { isCookieBannerSeen: true };
            case skillzone.actionTypes.SETTINGS:
                if (response.statusCode !== 200) {
                    return { settingData: null };
                }
                return parseSetting(response);
            case menu.actionTypes.GROUP_DETAIL:
                if (response.statusCode !== 200) {
                    return { data: null, loader: false };
                }
                return parseGroupDetails(response, menu.actionTypes.GROUP_DETAIL);
            case menu.actionTypes.GROUP_DETAIL_HTS:
                if (response.statusCode !== 200) {
                    return { data: null, loader: false };
                }
                return parseGroupDetails(response, menu.actionTypes.GROUP_DETAIL_HTS);
            case menu.actionTypes.GROUP_DETAIL_TRIVIA:
                if (response.statusCode !== 200) {
                    return { data: null, loader: false };
                }
                return parseGroupDetails(response, menu.actionTypes.GROUP_DETAIL_TRIVIA);
            case menu.actionTypes.GROUP_DETAIL_MGI:
                if (response.statusCode !== 200) {
                    return { data: null, loader: false };
                }
                return parseGroupDetails(response, menu.actionTypes.GROUP_DETAIL_MGI);
            case menu.actionTypes.GROUP_DETAIL_HG:
                if (response.statusCode !== 200) {
                    return { data: null, loader: false };
                }
                return parseGroupDetails(response, menu.actionTypes.GROUP_DETAIL_HG);
            case menu.actionTypes.GROUP_DETAIL_HEADERS:
                // console.log(response, "res")
                if (response.statusCode !== 200) {
                    return { data: null, loader: false };
                }
                return parseGroupDetails(response, menu.actionTypes.GROUP_DETAIL_HEADERS);
            case common.actionTypes.GET_USER_POPUPS:
                if (response.statusCode === 200) {
                    return parseUserPopups(response);
                }
                return {
                    userPopups: {}
                }
            case menu.actionTypes.FAQ:
                if (response.statusCode !== 200) {
                    return { data: null, loader: false };
                } else if (response.content) {

                    return {
                        data: response.content,
                        loader: false
                    }
                }
                return { data: null, loader: false };
            case home.actionTypes.GET_USERS_LEVEL_DATA:
                // console.log(response, "response")
                if(response.statusCode === 403) {
                    return response.statusCode;
                }
                // response.content.flash_sale =  [
                //     {
                //         "item_display_name": "Fireball",
                //         "item_type": "Gold",
                //         "item_image": "fireballgold.png",
                //         "currency_required": 178,
                //         "flash_sale_start_time": "2021-10-23 13:58:00",
                //         "flash_sale_end_time": "2021-10-23 14:58:30",
                //         "flash_sale_description": "50% discount on a Gold Fireball in Hit The Spot.",
                //         "flash_sale_limit": 1
                //     }
                // ];

                // console.log(response, "response");
                return parseData(response);
            case home.actionTypes.GET_GAMES_DATA:
                return parseGames(response);
            case menu.actionTypes.NAV_PAGE_LIST:
                if (response.statusCode !== 200) {
                    return null;
                }

                return parseNavPageList(response);
            case menu.actionTypes.PAGE_CONTENT:
                if (response.statusCode !== 200) {
                    return { data: null, loader: false };
                }
                return parsePageContent(response);
            case Leaderboard.actionTypes.GET_LEADERBOARD_DATA:
                return parseLeaderboard(response, rest);
            case Challenges.actionTypes.GET_CHALLENGES:
                return parseChallenges(response);
            case menu.actionTypes.GET_LEADERBOARD_PRIZES_DATA:

                // response = prizes;
                if (response.statusCode === 200) {

                    if (response.content.last_week_lb_prizes) {
                        if (response.content.last_week_lb_prizes.mini_game_prizes) {
                            let highScorePrizesArr = response.content.last_week_lb_prizes.mini_game_prizes;
                            let gameText = "";
                            let totalGold = 0;
                            highScorePrizesArr.map((game, index) => {

                                if (gameText != "") {
                                    if (index !== (highScorePrizesArr.length - 1)) {
                                        gameText = gameText + ", ";
                                    } else {
                                        gameText = gameText + " and ";
                                    }
                                }

                                let userRank = "";
                                if (game.rank === 1) {
                                    userRank = "";
                                } else {
                                    userRank = HelperFunctions.ordinal_suffix_of(game.rank) + " ";
                                }
                                gameText += "the " + userRank + "highest score in " + game.game.game_name;
                                totalGold += game.amount;
                            });

                            let finalText = "Last week you finished with " + gameText + ". We added " + totalGold + " gold to your Game Center total. Well done!";
                            // console.log(finalText);
                            response.content.last_week_lb_prizes.gold_winner_prizes_text = finalText;
                        }
                    }

                    if (response.content.score_prizes) {
                        let weeklyPrizes = response.content.score_prizes.weekly_score_prizes;
                        let lastRange = weeklyPrizes[weeklyPrizes.length - 1].position;
                        let lastRangeArr = lastRange.split("-");

                        let lastPos = lastRangeArr[0].replace(/\D/g, '');
                        var totalGoldPrize = null;
                        if (lastRangeArr.length > 1) {
                            let first = lastRangeArr[0].replace(/\D/g, '');
                            let second = lastRangeArr[1].replace(/\D/g, '');
                            lastPos = (second - first) + 1;
                            totalGoldPrize = parseInt(lastPos) * parseInt(weeklyPrizes[weeklyPrizes.length - 1].prize);
                            totalGoldPrize = HelperFunctions.numChangeToShort(totalGoldPrize);
                            // console.log(lastPos, totalGoldPrize, "lastpos");

                        }

                        // console.log(lastRangeArr, "lastRangeArr");
                        // let lastPos = lastRangeArr[0].replace(/\D/g,'');
                        // if (lastRangeArr.length > 1) {
                        //     lastPos = lastRangeArr[1].replace(/\D/g,'');
                        // }
                        // console.log(lastPos, "lastRangeArr");

                        response.content.score_prizes.weekly_total_winners = totalGoldPrize;
                        // response.content.score_prizes.weekly_total_winners = lastPos;
                    }



                    return { leaderboardPrizesData: response.content }
                }
                return { leaderboardPrizesData: null };
            case shop.actionTypes.GET_INVENTORY_ITEMS:
                return parseInventoryData(response);
            case shop.actionTypes.GET_STORE_ITEMS:
                return parseStoreData(response);
            case shop.actionTypes.GET_KIT_BAGS:
                return parseKitbags(response);
            case shop.actionTypes.ADD_INVENTORY:
                return {
                    message: response.message,
                    isAdded: response.statusCode === 200 ? true : false,
                    isLoading: false
                }
            case home.actionTypes.WEEK_STATS:
                return parseStats(response);
            case home.actionTypes.FUN_FACTS:
            case facts.actionTypes.FUN_FACTS:
            case factsTwo.actionTypes.FUN_FACTS:
                return parseFunfacts(response);
            case common.actionTypes.SUBMIT_USER_DISPLAY_NAME:
                if (response.statusCode === 200) {
                    return {
                        isAdded: true,
                        isSubmitting: false,
                        errorMsg: response.message
                    }
                }
                return {
                    isAdded: false,
                    isSubmitting: false,
                    errorMsg: response.message ? response.message : 'Something went wrong!'
                }
            case common.actionTypes.GET_USER_NOTIFICATION:
                return parseUserNotifications(response);
            case common.actionTypes.CLAIM_TIER_PRIZES:
                if (response.statusCode === 200) {
                    return {
                        isAdded: true,
                        isSubmitting: false,
                        errorMsg: response.message
                    }
                }
                return {
                    isAdded: false,
                    isSubmitting: false,
                    errorMsg: response.message ? response.message : 'Something went wrong!'
                }
            case common.actionTypes.CURRENT_GROUP_INFO:
                if (response.statusCode === 200) {
                    return { currentGroupInfo: response.content }
                }
                return { currentGroupInfo: null };
            case common.actionTypes.CLAIM_WELCOME_BONUS:
                if (response.statusCode === 200) {
                    return {
                        isAdded: true,
                        isSubmitting: false,
                        errorMsg: response.message
                    }
                }
                return {
                    isAdded: false,
                    isSubmitting: false,
                    errorMsg: response.message ? response.message : 'Something went wrong!'
                }
            case Leaderboard.actionTypes.GET_LEADERBOARD_WEEKS:
                if (response.statusCode === 200) {
                    return response.content.weeks

                }
                return null;
            case home.actionTypes.CLAIM_DAILY_REVEAL:
                if (response.statusCode === 200) {
                    return {
                        isAdded: true,
                        data: response.content,
                        isLoading: false
                    }
                }
                return {
                    isAdded: false,
                    data: null,
                    message: response.message,
                    isLoading: false
                }
            case home.actionTypes.POLL_VOTE:
                // response = pollVote;
                if (response.statusCode === 200) {
                    const isSubmittingVote = false;
                    response.content.isSubmittingVote = isSubmittingVote;
                    // response.content.start_date_time = "2020-10-30 10:22:00";
                    // response.content.end_date_time = "2020-10-30 10:23:00";
                    if (response.content.question_info) {
                        let resultedOption = null;
                        if (response.content.question_info[0].option_info) {
                            response.content.question_info[0].option_info.map((option, index) => {
                                if (option.is_result) {
                                    resultedOption = option;
                                }
                            })
                            response.content.result_option = resultedOption;
                        }

                    }

                    return { pollVoteData: response.content };
                }
                return { pollVoteData: 404 };
            default:
                return response;
        }
    }

    function parseSetting(response) {
        const settings = response.content.settings;
        let setting = {};
        for (let i = 0; i < settings.length; i++) {
            if (settings[i].hts_key === 'Exit Button') {
                setting.exitButton = settings[i].hts_value;
                break;
            }
        }
        return { settingData: setting };
    }

    function parseUserPopups(response) {
        const userPopups = {

        };
        for (let i = 0; i < response.content.user_popups.length; i++) {
            userPopups[response.content.user_popups[i].popup] = response.content.user_popups[i].value;
        }

        if (userPopups.two_day_retention_gift && userPopups.two_day_retention_gift === 'complete') {
            userPopups.two_day_retention_gift = null;
        }

        return { userPopups }
    }

    function parseData(response) {
        if (response.content) {
            let data = response.content;
            if (data.upcoming_level) {
                data.required_xp_next_level = data.upcoming_level.xp_points - data.user_level.xp_points;
                data.current_xp = data.user_xp_points - data.user_level.xp_points;
            }
            return data;
        }
        return null;
    }

    function parseGames(response) {
        // response = games;
        if (response.content) {
            let gameArr = [];
            let gamesImg = [];
            let featuredGame = [];
            let featuredGamesImg = [];
            let upcomingGame = [];
            let upcomingGamesImg = [];
            let featureOrderCnt = [];
            let totalFeatured = [];

            // active and next week changes
            let currentActiveGames = [];
            let otherGames = [];
            let nextWeekSechudled = [];
            let nextWeekNonActive = [];

            let thirdWeekSechudled = [];
            let thirdWeekNonActive = [];

            let fourthWeekSechudled = [];
            let fourthWeekNonActive = [];

            // "is_current_week": true,
            // "is_upcoming_week": true,
            // "second_week_date": "2021-09-29 00:01:00",
            // "third_week_date": "2021-10-06 00:01:00",
            // "is_third_week": true

            response.content && response.content.categroies.map((category, categoryIndex) => {
                category.sports.map((sport, sportIndex) => {
                    let playUpcomingGames = [];
                    sport.games.map((game, gameIndex) => {
                        let game_banner_path = HelperFunctions.generateLocalImgPath(game.game_banner);
                        let game_logo_path = HelperFunctions.generateLocalImgPath(game.game_logo);
                        game.game_banner_path = game_banner_path;
                        game.game_logo_path = game_logo_path;

                        if (game.match_finished) {
                            game.btn_class = "yellow-btn";
                            game.game_card_text = "Open";
                        } else {
                            if (game.is_match_live) {
                                game.btn_class = "yellow-btn";
                                if (game.is_tipped) {
                                    game.game_card_text = "View Square";
                                } else {
                                    game.game_card_text = "Open";
                                }
                            } else if (game.is_tipped) {
                                game.btn_class = "yellow-btn";
                                game.game_card_text = "Edit Square";
                            }
                        }

                        if (game.game_id === "hurlingsq" || game.game_id === "gaelicsq") {
                            game.is_season_completed = true;
                        }


                        //if ((game.status === 'U' && !game.is_featured) || game.status === 'Y') {
                        if ((game.status === 'U') || game.status === 'Y') {

                            if (game.status === 'U') {
                                otherGames.push(game);
                            }
                            if (game.game_score === 0)
                                game.game_score = "0";

                            if (game.game_id === "mg") {
                                if (game.game_score === "0") {
                                    game.game_score = "E";
                                } else if (game.game_score > 0) {
                                    game.game_score = "+" + game.game_score;
                                }
                            }

                            //store each image for preload
                            gamesImg.push(game.game_logo_path);
                            gamesImg.push(game.game_banner_path);

                            playUpcomingGames.push(game);

                            if (game.is_featured && game.status === 'Y') {
                                totalFeatured.push(game.game_sequence);
                                if (game.game_score) {
                                    featureOrderCnt.push(game.game_sequence);
                                }
                                featuredGame.push(game);
                                featuredGamesImg.push(game.game_logo_path);
                                featuredGamesImg.push(game.game_banner_path);
                            }
                        }
                        if (game.status === 'U' && game.is_featured) {
                            upcomingGame.push(game);
                            upcomingGamesImg.push(game.game_logo_path);
                            upcomingGamesImg.push(game.game_banner_path);
                        }


                        /// Games to show in games list
                        if (game.status === 'Y') {
                            let gameCopy = HelperFunctions.copyObject(game);
                            currentActiveGames.push(gameCopy);
                        }


                        // current week games 
                        // if (game.is_current_week) {
                        //     let gameCopy = HelperFunctions.copyObject(game);
                        //     if (gameCopy.first_poll_section)
                        //         gameCopy.activeTriviaTopic = gameCopy.first_poll_section;

                        //     currentActiveGames.push(gameCopy);
                        // } else {
                        //     let gameCopy = HelperFunctions.filterNonActiveGamesAccordingToWeek(game);
                        //     otherGames.push(gameCopy);
                        // }


                        //second week games
                        // if (game.is_upcoming_week || (game.is_current_week && game.is_upcoming_week)) {
                        //     let gameCopy = HelperFunctions.copyObject(game);
                        //     if (gameCopy.second_poll_section)
                        //         gameCopy.activeTriviaTopic = gameCopy.second_poll_section;

                        //     if (gameCopy.second_week_date)
                        //         gameCopy.dateToShow = gameCopy.second_week_date;
                        //     nextWeekSechudled.push(gameCopy)
                        // } else {
                        //     let gameCopy = HelperFunctions.filterNonActiveGamesAccordingToWeek(game);
                        //     nextWeekNonActive.push(gameCopy)
                        // }

                        // third week games
                        // if (game.is_third_week || (game.is_current_week && game.is_third_week)) {
                        //     let gameCopy = HelperFunctions.copyObject(game);

                        //     if (gameCopy.third_poll_section)
                        //         gameCopy.activeTriviaTopic = gameCopy.third_poll_section;

                        //     if (gameCopy.third_week_date)
                        //         gameCopy.dateToShow = gameCopy.third_week_date;
                        //     thirdWeekSechudled.push(gameCopy)
                        // } else {
                        //     let gameCopy = HelperFunctions.filterNonActiveGamesAccordingToWeek(game);
                        //     thirdWeekNonActive.push(gameCopy)
                        // }

                        //fourth week games
                        // if (game.is_fourth_week || (game.is_current_week && game.is_fourth_week)) {
                        //     let gameCopy = HelperFunctions.copyObject(game);

                        //     if (gameCopy.fourth_poll_section)
                        //         gameCopy.activeTriviaTopic = gameCopy.fourth_poll_section;

                        //     if (gameCopy.fourth_week_date)
                        //         gameCopy.dateToShow = gameCopy.fourth_week_date;
                        //     fourthWeekSechudled.push(gameCopy)
                        // } else {
                        //     let gameCopy = HelperFunctions.filterNonActiveGamesAccordingToWeek(game);
                        //     fourthWeekNonActive.push(gameCopy)
                        // }

                    })

                    // console.log(playUpcomingGames, "playUpcomingGames");
                    if (playUpcomingGames.length > 0) {
                        sport.play_upcoming_games = playUpcomingGames;
                    }

                    // console.log(sport);
                    gameArr.push(sport);
                })
            });

            // console.log(currentActiveGames, otherGames, "featuredGame");

            if (featureOrderCnt.length !== totalFeatured.length) {
                if (featureOrderCnt[0] === totalFeatured[0]) {
                    featuredGame.reverse();
                }
            }

            // console.log(featuredGame, "featuredGame");

            if (featureOrderCnt.length === 0) {
                if (featuredGame && featuredGame[0].game_sequence > 1) {
                    featuredGame.reverse();
                }
            }

            //four games changes
            let fourGamesData = [];


            let currentWeekDate = response.content.current_week_date ? "Current Week: <span>" + response.content.current_week_date + "</span>" : null;
            let secondWeekDate = response.content.upcoming_week_date ? "Next Week: <span>" + response.content.upcoming_week_date + "</span>" : null;
            let thirdWeekDate = response.content.third_week_date ? "Next Week: <span>" + response.content.third_week_date + "</span>" : null;
            let fourthWeekDate = response.content.fourth_week_date ? "Next Week: <span>" + response.content.fourth_week_date + "</span>" : null;
            // // current week games data
            currentActiveGames.sort((a, b) => {
                return a.first_week_sort - b.first_week_sort;
            });
            fourGamesData.push({
                weekDate: currentWeekDate,
                isCurrentWeek: true,
                gameInfo: [
                    {
                        heading: "Active Games",
                        games: currentActiveGames
                    },
                    {
                        heading: "Coming Soon",
                        games: otherGames
                    }
                ]
            });
            // next week games data
            // if (nextWeekSechudled.length > 0) {
            //     nextWeekSechudled.sort((a, b) => {
            //         return a.second_week_sort - b.second_week_sort;
            //     });
            //     fourGamesData.push({
            //         weekDate: secondWeekDate,
            //         isCurrentWeek: false,
            //         gameInfo: [
            //             {
            //                 heading: "Scheduled Games",
            //                 games: nextWeekSechudled
            //             },
            //             {
            //                 heading: "Non-active Games",
            //                 games: nextWeekNonActive
            //             }
            //         ]
            //     });
            // }


            // third week games data
            // if (thirdWeekSechudled.length > 0) {
            //     thirdWeekSechudled.sort((a, b) => {
            //         return a.third_week_sort - b.third_week_sort;
            //     });
            //     fourGamesData.push({
            //         weekDate: thirdWeekDate,
            //         isCurrentWeek: false,
            //         gameInfo: [
            //             {
            //                 heading: "Scheduled Games",
            //                 games: thirdWeekSechudled
            //             },
            //             {
            //                 heading: "Non-active Games",
            //                 games: thirdWeekNonActive
            //             }
            //         ]
            //     });
            // }


            // fourth week games data
            // if (fourthWeekSechudled.length > 0) {
            //     fourthWeekSechudled.sort((a, b) => {
            //         return a.fourth_week_sort - b.fourth_week_sort;
            //     });
            //     fourGamesData.push({
            //         weekDate: fourthWeekDate,
            //         isCurrentWeek: false,
            //         gameInfo: [
            //             {
            //                 heading: "Scheduled Games",
            //                 games: fourthWeekSechudled
            //             },
            //             {
            //                 heading: "Non-active Games",
            //                 games: fourthWeekNonActive
            //             }
            //         ]
            //     });
            // }
            // console.log(gameArr, "gameArr");


            return {
                featuredGame: featuredGame,
                featuredGamesImg: featuredGamesImg,
                activeGames: gameArr,
                gamesImg: gamesImg,
                upcomingGame,
                upcomingGamesImg,
                fourGamesData

            }
        }
        return null;
    }

    function parseNavPageList(response) {
        const data = [];
        const pages = response.content;
        if (pages && pages.length > 0) {
            for (let i = 0; i < pages.length; i++) {
                // if window.isNA meaning if game is running in native app then remove Exit Button from menu.
                if ((window.isNativeApp === undefined) && pages[i].page_url === 'exit-game')
                    continue;
                if (pages[i].status === 'Y') {
                    data.push({
                        page_id: pages[i].page_id,
                        page_name: pages[i].page_name,
                        page_url: pages[i].page_url,
                    });
                }
            }
        }
        return data;
    }

    function parsePageContent(response) {
        let data = null;
        const pages = response.content;
        if (pages && pages.length > 0) {
            data = {
                page_heading: pages[0].page_heading,
                page_des: pages[0].page_des,
            };
        }
        return { data, loader: false };
    }

    function parseLeaderboard(response, rest) {
        if (response.statusCode === 200) {
            let loadMoreFlag = true;
            const dataCopy = HelperFunctions.copyObject(rest);
            if (response.content.leaderboard) {
                loadMoreFlag = response.content.leaderboard.length < rest.leaderboardOffset ? false : true;

                if (dataCopy.data) {
                    for (let i = 0; i < response.content.leaderboard.length; i++) {
                        dataCopy.data.push(response.content.leaderboard[i]);
                    }
                    //  response.content.leaderboard = dataCopy.data;
                } else {
                    if (response.content.user_rank) {
                        response.content.leaderboard.unshift(response.content.user_rank);
                    }
                    dataCopy.data = response.content.leaderboard;
                }

            } else {
                loadMoreFlag = false;
            }

            return {
                leaderboard_type: response.content.leaderboard_type,
                data: dataCopy.data,
                isLoading: false,
                isLoadMore: loadMoreFlag,
                numLoaded: dataCopy.data === null ? 0 : dataCopy.data.length,
                isMessageShow: dataCopy.data === null ? true : false,
                leaderboardDate: response.content.last_leaderboard_date,
                userInfo: response.content.user_info,
                weekChangeLoader: false
            };
        }

        if (response.statusCode === 404) {
            return {
                isMessageShow: true,
                isLoading: false,
                isLoadMore: false,
                weekChangeLoader: false
            }
        }
    }

    function parseChallenges(response) {
        // response = challenges;
        let challengesData = null;
        if (response.statusCode === 200 && response.content) {
            let hhActiveData = [];
            let hhUpcomingData = [];
            let hhClosedData = [];
            response.content.happy_hour && response.content.happy_hour.map((happy, index) => {
                if (happy.status === "active") {
                    // when collective points are achieved and user played a complete game during the event
                    if (happy.hh_points >= happy.target_points) {
                        happy.is_win = true;
                    }
                    hhActiveData.push(happy);
                } else if (happy.status === "upcoming") {
                    hhUpcomingData.push(happy)
                }
                else if (happy.status === "closed" && happy.is_played) {
                    hhClosedData.push(happy)
                }
            })

            let happyHourObj = null;
            if (hhActiveData.length > 0 || hhUpcomingData.length > 0) {
                happyHourObj = {
                    "active": hhActiveData.length > 0 ? hhActiveData : null,
                    "upcoming": hhUpcomingData.length > 0 ? hhUpcomingData : null,
                    "closed": hhClosedData.length > 0 ? hhClosedData : null
                }
            }

            challengesData = {
                tier_info: response.content.tier_info,
                monthly: response.content.monthly,
                game_scores: response.content.game_scores,
                user_info: response.content.user_info,
                leaderboard_type: response.content.leaderboard_type,
                /*happyHour: {
                    "group_id": "hts20190927",
                    "status": "upcoming",
                    "start_date_time": "2019-11-01 10:04:00",
                    "end_date_time": "2019-11-01 10:04:30",
                    "game_id": 1,
                    "item_half": true,
                    "big_target": true,
                    "double_xp": false
                },*/
                happyHour: happyHourObj,
                stats_type: response.content.stats_type,
                happy_hour_message: "",
                base_url: response.content.base_url
            };

            if (challengesData.happyHour) {
                let message = "";
                const { item_half, big_target, double_xp } = challengesData.happyHour;

                if (item_half) {
                    message += "ALL BOOSTS HALF PRIZE"
                }
                if (big_target) {
                    if (item_half && double_xp) {
                        message += ", BIGGER TARGETS TO HIT"
                    }
                    else if (item_half) {
                        message += " AND BIGGER TARGETS TO HIT"
                    }
                    else if (double_xp) {
                        message += "BIGGER TARGETS TO HIT"
                    }
                    else {
                        message += "BIGGER TARGETS TO HIT"
                    }
                }
                if (double_xp) {

                    if (item_half && double_xp && big_target) {
                        message += " AND DOUBLE XP GIVEN FOR EVERY KICK"
                    }
                    else if (item_half || big_target) {
                        message += " AND DOUBLE XP GIVEN FOR EVERY KICK"
                    }
                    else {
                        message += "DOUBLE XP GIVEN FOR EVERY KICK"
                    }
                }
                message += "!"
                challengesData.happy_hour_message = message;
            }
        }
        return { challengesData };
    }

    function parseInventoryData(response) {
        if (response.statusCode === 200 || response.statusCode === 404) {
            if (response.statusCode === 404) {
                return 404
            }

            return response.content;
        }
    }

    function parseGroupDetailsTrivia(response, gameType) {
        const content = response.content;

        return { data: content, loader: false, user_info: content.user_info };
    }

    function parseGroupDetails(response, gameType) {
        const content = response.content;
        let groups = content.seasons;
        if (groups === null)
            groups = [];

        if (content.seasons) {
            let graphData = {
                months: [],
                total_score: [],
                month_wise: []
            };
            content.seasons.length > 0 && content.seasons.map((seasonData, seasonIndex) => {

                seasonData.months.length > 0 && seasonData.months.map((month, monthIndex) => {
                    graphData.months.push(month.month);
                    if (gameType == menu.actionTypes.GROUP_DETAIL_HTS) {
                        graphData.total_score.push(month.total_score);
                    } else if (gameType == menu.actionTypes.GROUP_DETAIL_MGI) {
                        graphData.total_score.push(month.total_par_score);
                        month.total_score = month.total_par_score
                    } else {
                        graphData.total_score.push(month.total_score);
                    }

                    let scoreArr = [];
                    let scoreDateArr = [];
                    month.groups.map((scoreData, scoreIndex) => {
                        if (gameType == menu.actionTypes.GROUP_DETAIL_HTS) {
                            scoreArr.push(scoreData.total_score);
                        } else if (gameType == menu.actionTypes.GROUP_DETAIL_MGI) {
                            scoreArr.push(scoreData.total_par_score);
                            scoreData.total_score = scoreData.total_par_score
                        } else {
                            scoreArr.push(scoreData.total_score);
                        }
                        const dateObj = DateHelper.getFullDateWithDay(scoreData.group_date);
                        scoreDateArr.push(dateObj.date);
                    });
                    scoreArr = scoreArr.reverse();
                    scoreDateArr = scoreDateArr.reverse();
                    let scores = {
                        "month": month.month,
                        "score": scoreArr,
                        "group_date": scoreDateArr
                    };
                    graphData.month_wise.push(scores);
                });

                const monthsReverse = graphData.months.reverse();
                const totalScoreReverse = graphData.total_score.reverse();
                //const monthWiseReverse = graphData.month_wise.reverse();
                graphData.months = monthsReverse;
                graphData.total_score = totalScoreReverse;
                //graphData.month_wise = monthWiseReverse;
                content.seasons[seasonIndex].graphData = graphData;
                graphData = {
                    months: [],
                    total_score: [],
                    month_wise: []
                };
            });
        }

        let winPrice = 0;
        /*for (let i = 0; i < groups.length; i++) {
            winPrice += groups[i].hasOwnProperty('win_prize') ? groups[i].win_prize : 0;
        }*/

        if (content.prize_details) {
            winPrice = content.prize_details.total_prize;
        }
        return { data: content, loader: false, winPrice, user_info: content.user_info };
    }

    function parseStoreData(response) {
        if (response.statusCode === 200 || response.statusCode === 404) {
            if (response.statusCode === 404) {
                return 404
            }
            return response.content;
        }
    }

    function parseKitbags(response) {
        if (response.statusCode === 200) {
            return response.content;
        }

        return null;
    }

    function parseStats(response) {
        // response = weekStats;
        if (response.statusCode === 200) {
            return {
                basePath: response.content.base_url,
                lastWeek: response.content.last_week_rank ? response.content.last_week_rank : null,
                lastWeekGames: response.content.last_week_stats ? response.content.last_week_stats : null,
                lastWeekDateHeading: response.content.last_week_displayname ? response.content.last_week_displayname : null,
                currentWeek: response.content.this_week_rank ? response.content.this_week_rank : ' ',
                currentWeekGames: response.content.this_week_stats ? response.content.this_week_stats : null,
                currentWeekDateHeading: response.content.this_week_displayname ? response.content.this_week_displayname : null,
                onlineUsers: response.content.online_user ? response.content.online_user : null,
                lastWeekTotalUser: response.content.last_week_total_user ? response.content.last_week_total_user : null,
                epicScores: response.content.epic_score ? response.content.epic_score : null,
                // epicScores: [
                //     {
                //         "game": {
                //             "game_id": "hts",
                //             "game_name": "Hit The Spot",
                //             "game_url": "hitthespot",
                //             "status": "Y",
                //             "game_description": "Hit The Spot",
                //             "game_sequence": 1,
                //             "game_logo": "hts-logo.png",
                //             "mini_game_logo": "title-hts-logo.png",
                //             "game_card": "hts-card.png",
                //             "game_banner": "hts-banner.jpg",
                //             "category_name": "Arcade Games",
                //             "category_url": "arcade-games",
                //             "category_sequence": 1,
                //             "sport_name": "Football",
                //             "sport_icon": "football.png",
                //             "sport_sequence": 1,
                //             "is_featured": true,
                //             "cross_xell": 1
                //         },
                //         // "this_week": {
                //         //     "rank": 1,
                //         //     "display": false,
                //         //     "prize": 100,
                //         //     "currency_type": "gold",
                //         //     "score": 19,
                //         //     "user_name": "GTG167",
                //         //     "played_time": 99032
                //         // },
                //         "last_week": {
                //             "rank": 1,
                //             "display": false,
                //             "prize": 100,
                //             "currency_type": "gold",
                //             "score": 22,
                //             "user_name": "GTG90",
                //             "played_time": 84017
                //         }
                //     },
                //     {
                //         "game": {
                //             "game_id": "trivia",
                //             "game_name": "Trivia",
                //             "game_url": "trivia",
                //             "status": "Y",
                //             "game_description": "Trivia",
                //             "game_sequence": 1,
                //             "game_logo": "trivia-logo.png",
                //             "mini_game_logo": "title-trivia-logo.png",
                //             "game_card": "trivia-card.png",
                //             "game_banner": "trivia-banner.jpg",
                //             "category_name": "Prediction Games",
                //             "category_url": "prediction-games",
                //             "category_sequence": 2,
                //             "sport_name": "Trivia",
                //             "sport_icon": "trivia.png",
                //             "sport_sequence": 1,
                //             "cross_xell": 5
                //         },
                //         // "this_week": {
                //         //     "rank": 1,
                //         //     "display": false,
                //         //     "prize": 100,
                //         //     "currency_type": "gold",
                //         //     "score": 6390,
                //         //     "user_name": "GTG19",
                //         //     "played_time": 99424
                //         // },
                //         "last_week": {
                //             "rank": 1,
                //             "display": false,
                //             "prize": 100,
                //             "currency_type": "gold",
                //             "score": 7110,
                //             "user_name": "Anthony12345",
                //             "played_time": 98352
                //         }
                //     },
                //     {
                //         "game": {
                //             "game_id": "mg",
                //             "game_name": "Mini Golf",
                //             "game_url": "minigolf",
                //             "status": "Y",
                //             "game_description": "Mini Golf",
                //             "game_sequence": 3,
                //             "game_logo": "minigolf-logo.png",
                //             "mini_game_logo": "title-minigolf-logo.png",
                //             "game_card": "mg-card.png",
                //             "game_banner": "mini-featured-card.jpg",
                //             "category_name": "Arcade Games",
                //             "category_url": "arcade-games",
                //             "category_sequence": 1,
                //             "sport_name": "Golf",
                //             "sport_icon": "golf.png",
                //             "sport_sequence": 3,
                //             "is_featured": true,
                //             "cross_xell": 2
                //         },
                //         // "this_week": {
                //         //     "rank": 1,
                //         //     "display": false,
                //         //     "prize": 100,
                //         //     "currency_type": "gold",
                //         //     "score": -4,
                //         //     "user_name": "GTG90",
                //         //     "played_time": 110016
                //         // },
                //         "last_week": {
                //             "rank": 1,
                //             "display": false,
                //             "prize": 100,
                //             "currency_type": "gold",
                //             "score": -4,
                //             "user_name": "GTG81",
                //             "played_time": 56044
                //         }
                //     },
                //     {
                //         "game": {
                //             "game_id": "hgo",
                //             "game_name": "Hoops Galore",
                //             "game_url": "hoopsgalore-outdoor",
                //             "status": "Y",
                //             "game_description": "Hoops Galore",
                //             "game_sequence": 5,
                //             "game_logo": "hoops-logo.png",
                //             "mini_game_logo": "title-hgo-logo.png",
                //             "game_card": "hg-outdoor-card.png",
                //             "game_banner": "hoops-banner2.jpg",
                //             "category_name": "Arcade Games",
                //             "category_url": "arcade-games",
                //             "category_sequence": 1,
                //             "sport_name": "Basketball",
                //             "sport_icon": "basketball.png",
                //             "sport_sequence": 2,
                //             "cross_xell": 4
                //         },
                //         // "this_week": {
                //         //     "rank": 1,
                //         //     "display": false,
                //         //     "prize": 100,
                //         //     "currency_type": "gold",
                //         //     "score": 28,
                //         //     "user_name": "GTG102",
                //         //     "played_time": 105032
                //         // },
                //         "last_week": {
                //             "rank": 1,
                //             "display": false,
                //             "prize": 100,
                //             "currency_type": "gold",
                //             "score": 27,
                //             "user_name": "GTG107",
                //             "played_time": 126018
                //         }
                //     }
                // ],
            }
        }
        return 404;
    }

    function parseFunfacts(response) {
        if (response.statusCode === 200) {
            const matchArr = [];
            response.content.map((match, index) => {
                if (match.funfacts) {
                    // console.log(match, "matc");
                    // event_id, match_id, sports, league ,arket, result, team

                    match.funfacts.map((value, fIndex) => {
                        if (value.target_bet && value.target_bet.price) {
                            value.target_bet.fractionOdds = value.target_bet.fraction_price;
                            value.target_bet.betSlipURL = HelperFunctions.generateBetSlipURL(value.target_bet);
                            value.target_bet.trackingData = {
                                event_id: match.event_id,
                                sport: match.sport,
                                league: match.league_url,
                                match_id: match.match_id,
                                match_between: match.home.full_name + " vs " + match.away.full_name,
                                result: value.target_bet.result,
                                market_id: value.target_bet.market_id,
                                market: value.target_bet.market,
                                outcome_id: value.target_bet.outcomeid,
                                price: value.target_bet.price
                            }
                        }
                    })
                    matchArr.push(match);
                }
            })
            if (matchArr.length > 0) {
                return matchArr;
            }
            return 404;
        }
        return 404;
    }

    function parseUserNotifications(response) {
        let notifications = null;
        if (response.statusCode === 200) {
            notifications = {};
            let data = response.content.notifications;
            if (data && data.length > 0) {
                for (let i = 0; i < data.length; i++) {
                    if (data[i].type == "store") {
                        notifications[data[i].type] = { id: data[i].game_type_idx, store_count: data[i].store_count };
                    } else {
                        notifications[data[i].type] = { id: data[i].game_type_idx };
                    }
                }
            }
        }
        return { userNotification: notifications };
    }
}