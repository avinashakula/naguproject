import HelperFunctions from "../utils/HelperFunctions";

export default class APIEndpoints {

    static isProduction = window.isROP === 2; // if true live else dev
    static isStaging = window.isROP === 1;
    static isNxt = window.isNxt;

    static TokenValue = {};
    static timeStamp = Date.now ? Date.now() : 12345;

    /**
     * following method is used to remove double slashes from url if present
     * @param url
     * @returns {*}
     */
    static removeDoubleSlashes(url) {
        url = url.replace(new RegExp('//', 'g'), '/');
        if (url.charAt(url.length - 1) === '/') {
            url = url.slice(0, -1);
        }
        return url;
    }

    /**
     * return base url for api server for PRODUCTION or dev
     * @returns {string}
     */
    static get baseURL() {
        if (APIEndpoints.isStaging) {
            return 'https://sinc-std-api-stg.geniusgames.com.au/';
        } else {
            return APIEndpoints.isProduction ? 'https://sinc-std-api.geniusgames.com.au/' : 'https://sinc-std-api-dev.geniusgames.com.au/';
        }
    }

    static get iSGBaseURL() {
        return APIEndpoints.isProduction ? 'https://api.isportgenius.com.au/' : 'https://apitest.isportgenius.com.au/';
    }

    static get baseURLSZ() {
        return APIEndpoints.baseURL + 'sz/sincsz/';
    }

    static get baseURLMG() {
        return APIEndpoints.baseURL + 'sz/mg/';
    }

    static get baseURLTrivia() {
        return APIEndpoints.baseURL + 'sz/trivia/';
    }

    static get baseURLHTS() {
        return APIEndpoints.baseURL + 'sz/hts/';
    }

    static get baseURLOldHTS() {
        return APIEndpoints.baseURL + 'ggs/pphts/';
    }

    static get baseURLOldMG() {
        return APIEndpoints.baseURL + 'ppmg/';
    }

    static get baseURLHG() {
        return APIEndpoints.baseURL + 'sz/hg/';
    }

    static get baseURLHGO() {
        return APIEndpoints.baseURL + 'sz/hgo/';
    }

    static get baseURLHeaders() {
        return APIEndpoints.baseURL + 'sz/headers/';
    }

    static get baseURLGaelic() {
        return APIEndpoints.baseURL + 'sz/gaelic/';
    }

    static get baseURLPuckLuck() {
        return APIEndpoints.baseURL + 'sz/puckluck/';
    }

    static get baseURLBaseballBash() {
        return APIEndpoints.baseURL + 'sz/bbbash/';
    }

    /**
     * return headers to pass while calling an API works for both PRODUCTION and STAGING
     * @returns {string}
     */
    static getHeaders(whatIsContent, isBaseHeader = false, isAuth = false) {
        // const token = HelperFunctions.getQueryStringValue("user_token");
        // const token = HelperFunctions.readCookie('user_token');
        let ssoid = HelperFunctions.readCookie('ssoid');
        let productToken = HelperFunctions.readCookie('productToken');
        if (ssoid === undefined) ssoid = '';
        if (productToken === undefined) productToken = '';
        let header = {
            // 'ssoid': ssoid,
            'Authorization': 'Bearer ' + productToken,
        };
        if (whatIsContent === 1) {
            header['Content-Type'] = 'application/json';
        }
        else if (whatIsContent === 2) {
            header['Content-Type'] = 'application/x-www-form-urlencoded';
        }


        //isBaseHeader == true pass basic header
        if (isBaseHeader) {
            header['Authorization'] = 'Basic NmNkZDQ4MTctOTg5NS01NzFlLTgyZDItYzJmM2U3ZGI1M2M5Onk1QTBWbGV5ZWV5VDVaTFBkVmF3QVhkQ0pKYjIxa3ZD';
        }

        // if (isAuth) {
        //     header['Authorization'] = 'Bearer ' + HelperFunctions.readCookie("productToken");
        // }

        return header;
    }

    /**
     * return identity sso url
     */
    // static identitySSO(redirectURL) {
    //     return {
    //         url: APIEndpoints.isProduction ? 'https://identitysso.paddypower.com/view/login?product=pphitthespot&url=' + redirectURL : 'https://identitysso.nxt.com.paddypower/view/login?product=pphitthespot&url=' + redirectURL,
    //     }
    // }

    static get identitySSO() {

        let clientId = 'https://rsn-stg.us.auth0.com/authorize?scope=openid%20offline_access&response_type=code&client_id=A8z2hAPoL5JgXU6w8flDyeXlk7MFhFgb&redirect_uri=';
        if (APIEndpoints.isStaging) {
            clientId = 'https://rsn-prd.us.auth0.com/authorize?scope=openid offline_access&response_type=code&client_id=tWiLIZRfrlWwn75hR82N84snlRRsN8fF&redirect_uri=';
        } else {
            clientId = APIEndpoints.isProduction ? 'https://rsn-prd.us.auth0.com/authorize?scope=openid offline_access&response_type=code&client_id=tWiLIZRfrlWwn75hR82N84snlRRsN8fF&redirect_uri=' : 'https://rsn-stg.us.auth0.com/authorize?scope=openid%20offline_access&response_type=code&client_id=A8z2hAPoL5JgXU6w8flDyeXlk7MFhFgb&redirect_uri=';
        }

        // var basePath = 'https://rsn-stg.us.auth0.com/authorize?scope=openid%20offline_access&response_type=code&client_id=' + clientId + '&redirect_uri=';
        // return {
        //     url: APIEndpoints.isProduction ? basePath + 'https://sincbally-sz.geniusgames.com.au' : basePath + 'https://sincbally-szdev.geniusgames.com.au',
        // }

        return {
            url: clientId + window.location.origin + HelperFunctions.getQueryStringFromURL(),
        }

        // var basePath = 'https://rsn-stg.us.auth0.com/authorize?scope=openid%20offline_access&response_type=code&client_id=A8z2hAPoL5JgXU6w8flDyeXlk7MFhFgb&redirect_uri=';
        // return {
        //     url: basePath + window.location.origin,
        // }
    }

    // static registerIdentitySSO(redirectURL) {
    //     return {
    //         url: APIEndpoints.isProduction ? 'https://register.paddypower.com/account/registration?promotionCode=YSKA36&returnURL=https://hitthespot.paddypower.com' + redirectURL + '/' : 'https://register.nxt.com.paddypower/account/registration?promotionCode=YSKA36&returnURL=https://hitthespot.nxt.com.paddypower' + redirectURL + '/',
    //     }
    // }

    static get registerIdentitySSO() {
        return {
            url: APIEndpoints.isProduction ? 'https://register.paddypower.com/account/registration?promotionCode=YSKA36&returnURL=https://hitthespot.paddypower.com' + process.env.RELATIVE_PATH + '/' + HelperFunctions.getQueryStringFromURL() : 'https://register.nxt.com.paddypower/account/registration?promotionCode=YSKA36&returnURL=https://hitthespot.nxt.com.paddypower' + process.env.RELATIVE_PATH + '/' + HelperFunctions.getQueryStringFromURL(),
        }
    }

    /**
     * return my account url for user
     */
    static get myAccount() {
        return {
            url: APIEndpoints.isProduction ? 'https://myaccount.paddypower.com/account/navigation?prod=2&showHeader=1&iframe=true' : 'https://myaccount.nxt.com.paddypower/account/navigation?prod=2&showHeader=1&iframe=true',
        }
    }

    static logAccess(data) {
        return {
            url: `${APIEndpoints.baseURLSZ}log/access`,
            method: 'POST',
            headers: APIEndpoints.getHeaders(2), // for content type url encoded
            data: HelperFunctions.toURLEncoded(data),
        };
    }

    static setting() {
        return {
            url: `${APIEndpoints.baseURLSZ}setting?pt=${APIEndpoints.timeStamp}`,
            method: 'GET',
            headers: APIEndpoints.getHeaders(null, false),
        }
    }

    static getHubCards() {
        return {
            url: `${APIEndpoints.baseURL}gamehub`,
            method: 'GET',
            headers: APIEndpoints.getHeaders(1),
        }
    }

    static getHowTo() {
        return {
            url: `${APIEndpoints.baseURL}howto`,
            method: 'GET',
            headers: APIEndpoints.getHeaders(1),
        }
    }

    static faq() {
        return {
            url: `${APIEndpoints.baseURLSZ}faq?pt=${APIEndpoints.timeStamp}`,
            method: 'GET',
            headers: APIEndpoints.getHeaders(null, false),
        }
    }

    static pageContents(page_url = null) {
        if (page_url === null) page_url = '';
        let url = `page-contents/${page_url}?pt=${APIEndpoints.timeStamp}`;
        let finalUrl = APIEndpoints.baseURLHTS + APIEndpoints.removeDoubleSlashes(url);
        if (page_url == "terms-and-condition") {
            finalUrl = APIEndpoints.baseURLSZ + APIEndpoints.removeDoubleSlashes(url);
        }
        return {
            url: finalUrl,
            method: 'GET',
            headers: APIEndpoints.getHeaders(null, false),
        }
    }

    /**
     * API to get all seen user popups
     * @returns {{url: string, method: string, headers: string}}
     */
    static getUserPopups() {
        return {
            url: APIEndpoints.baseURLSZ + `user-popup?pt=${HelperFunctions.generateRandomNumber()}`,
            method: 'GET',
            headers: APIEndpoints.getHeaders(2)
        };
    }

    /**
     * set user popup API
     * @param data
     * @returns {{url: string, method: string, headers: string, data}}
     */
    static setUserPopups(data) {
        return {
            url: APIEndpoints.baseURLSZ + "user-popup/submit",
            method: 'POST',
            headers: APIEndpoints.getHeaders(2),
            data: HelperFunctions.toURLEncoded(data),
        };
    }

    static get htsURL() {
        return APIEndpoints.isNxt ? {
            url: APIEndpoints.isProduction ? 'https://hitthespot.paddypower.com/hitthespot/' : 'https://hitthespot.nxt.com.paddypower/hitthespot/',
        } : {
            url: APIEndpoints.isProduction ? 'https://hitthespot.paddypower.com/hitthespot/' : 'https://pphtsdev2.geniusgames.com.au/hitthespot/',
        }
    }

    static get triviaURL() {
        return APIEndpoints.isNxt ? {
            url: APIEndpoints.isProduction ? 'https://hitthespot.paddypower.com/trivia/play' : 'https://hitthespot.nxt.com.paddypower/trivia/play',
        } : {
            url: APIEndpoints.isProduction ? 'https://hitthespot.paddypower.com/trivia/play' : 'https://pphtsdev2.geniusgames.com.au/trivia/play',
        }
    }

    static get hgURL() {
        return APIEndpoints.isNxt ? {
            url: APIEndpoints.isProduction ? 'https://hitthespot.paddypower.com/hoopsgalore/' : 'https://hitthespot.nxt.com.paddypower/hoopsgalore/',
        } : {
            url: APIEndpoints.isProduction ? 'https://hitthespot.paddypower.com/hoopsgalore/' : 'https://pphtsdev2.geniusgames.com.au/hoopsgalore/',
        }
    }

    static get miniGolfURL() {
        return APIEndpoints.isNxt ? {
            url: APIEndpoints.isProduction ? 'https://hitthespot.paddypower.com/minigolf/' : 'https://hitthespot.nxt.com.paddypower/minigolf/',
        } : {
            url: APIEndpoints.isProduction ? 'https://hitthespot.paddypower.com/minigolf/' : 'https://pphtsdev2.geniusgames.com.au/minigolf/',
        }
    }

    static get hgOutdoorURL() {
        return APIEndpoints.isNxt ? {
            url: APIEndpoints.isProduction ? 'https://hitthespot.paddypower.com/hoopsgalore-outdoor/' : 'https://hitthespot.nxt.com.paddypower/hoopsgalore-outdoor/',
        } : {
            url: APIEndpoints.isProduction ? 'https://hitthespot.paddypower.com/hoopsgalore-outdoor/' : 'https://pphtsdev2.geniusgames.com.au/hoopsgalore-outdoor/',
        }
    }

    /**
     * API to get current group info
     * TrackerID - pphts, juggling, dribbling
     AppID - mobile, desktop
     Action - 20190820150412_leaderboard_score
     Properties - season,2019|gamegroup,August|week,34|group,hts20190820
     UserID - anon or loggin current userId
     UserIP - Ip

     */
    static tracking(qString) {
        return {
            url: APIEndpoints.baseURLSZ + "tracking",
            method: 'POST',
            headers: APIEndpoints.getHeaders(2, false),
            data: "" + JSON.stringify(qString)
        };
    }

    /**
     * return end point for the user benefits like gold
     */
    static userBenefits(queryString = "") {
        return {
            url: APIEndpoints.baseURLSZ + "user-benefits" + queryString,
            method: 'GET',
            headers: APIEndpoints.getHeaders(),
        };
    }

    static get referAFriend() {
        return {
            url: APIEndpoints.isProduction ? 'https://promos.paddypower.com/promotion?promoCode=CACQFWBSPORTS' : 'https://promos.paddypower.com/promotion?promoCode=CACQFWBSPORTS',
        }
    }

    /*
   *
   * type = week or month
       stats = score or highscore or perkick or goal
   */
    static leaderboardData(min, max, queryString, game) {
        let path = 'leaderboard/' + min + '/' + max + queryString;
        return {
            url: APIEndpoints.baseURLSZ + path,
            method: 'GET',
            headers: APIEndpoints.getHeaders(),
        }
    }

    static getChallenges() {
        return {
            url: APIEndpoints.baseURLSZ + `challenges?pt=${APIEndpoints.timeStamp}`,
            method: 'GET',
            headers: APIEndpoints.getHeaders(),
        }
    }

    /**
     * return end point for the user notification like completed level notification
     */
    static getUserNotifications() {
        return {
            url: APIEndpoints.baseURLSZ + "user-notification/list",
            method: 'GET',
            headers: APIEndpoints.getHeaders(),
        };
    }

    /**
     * return end point for the kit bags
     */
    static getKitBags() {
        return {
            url: APIEndpoints.baseURLSZ + "kitbags/all",
            method: 'GET',
            headers: APIEndpoints.getHeaders(),
        };
    }

    static leaderboardPrizesData() {
        return {
            url: APIEndpoints.baseURLSZ + "leaderboard-prizes",
            method: 'GET',
            headers: APIEndpoints.getHeaders(2)
        }
    }

    /**
     * return end point for the store items list
     */
    static userStoreItems() {
        return {
            url: APIEndpoints.baseURLSZ + `store/item-list?pt=${APIEndpoints.timeStamp}`,
            method: 'GET',
            headers: APIEndpoints.getHeaders(),
        };
    }

    /**
     * return end point for user score history
     */
    static userScoreHistory(group_id = null, gameType = null) {
        if (group_id === null) group_id = '';

        let path = APIEndpoints.baseURLHTS;

        if (gameType == 'hts') {
            path = APIEndpoints.baseURLHTS;
        } else if (gameType == 'mgi') {
            path = APIEndpoints.baseURLMG;
        } else if (gameType == 'trivia') {
            path = APIEndpoints.baseURLTrivia;
        } else if (gameType == 'hg') {
            path = APIEndpoints.baseURLHG;
        } else if (gameType == 'hgo') {
            path = APIEndpoints.baseURLHGO;
        } else if (gameType == 'headers') {
            path = APIEndpoints.baseURLHeaders;
        } else if (gameType == 'gaelic') {
            path = APIEndpoints.baseURLGaelic;
        } else if (gameType == 'puckluck') {
            path = APIEndpoints.baseURLPuckLuck;
        } else if (gameType == 'bbbash') {
            path = APIEndpoints.baseURLBaseballBash;
        }



        //let url = `user-scores/trivia20200923`;
        let url = `user-scores/${group_id}`;
        return {
            url: path + APIEndpoints.removeDoubleSlashes(url),
            method: 'GET',
            headers: APIEndpoints.getHeaders(),
        };
    }

    /**
     * return group details for user
     */
    static groups(gameType = null) {

        let path = APIEndpoints.baseURLHTS;
        let queryStr = "";
        if (gameType == 'hts') {
            path = APIEndpoints.baseURLHTS;
            queryStr = "?season=all";
        } else if (gameType == 'mgi') {
            path = APIEndpoints.baseURLMG;
            queryStr = "?season=all";
        } else if (gameType == 'trivia') {
            path = APIEndpoints.baseURLTrivia;
            queryStr = "?isUserScore=true&season=all";
        } else if (gameType == 'hg') {
            path = APIEndpoints.baseURLHG;
            queryStr = "?season=all";
        } else if (gameType == 'hgo') {
            path = APIEndpoints.baseURLHGO;
            queryStr = "?season=all";
        } else if (gameType == 'headers') {
            path = APIEndpoints.baseURLHeaders;
            queryStr = "?season=all";
        } else if (gameType == 'gaelic') {
            path = APIEndpoints.baseURLGaelic;
            queryStr = "?season=all";
        } else if (gameType == 'puckluck') {
            path = APIEndpoints.baseURLPuckLuck;
            queryStr = "?season=all";
        } else if (gameType == 'bbbash') {
            path = APIEndpoints.baseURLBaseballBash;
            queryStr = "?season=all";
        }

        let url = `${path}groups${queryStr}`

        // if (gameType == "trivia") {
        //     url = url + "?isUserScore=true"
        // }

        return {
            url: url,
            method: 'GET',
            headers: APIEndpoints.getHeaders(),
        }
    }

    /**
     * return end point for the store items list
     */
    static ppGames() {
        return {
            url: APIEndpoints.baseURLSZ + `games?pt=${APIEndpoints.timeStamp}`,
            method: 'GET',
            headers: APIEndpoints.getHeaders(),
        };
    }

    static postUserNotification(data) {
        return {
            url: APIEndpoints.baseURLSZ + "notification-status/update",
            method: 'POST',
            headers: APIEndpoints.getHeaders(2),
            data: HelperFunctions.toURLEncoded(data)
        };
    }

    /**
     * return end point for the store items list
     */
    static userInventoryItems() {
        return {
            url: APIEndpoints.baseURLSZ + `inventory/item-list`,
            method: 'GET',
            headers: APIEndpoints.getHeaders(),
        };
    }

    /**
     * API to get current group info
     */
    static getCurrentGroup() {
        return {
            url: APIEndpoints.baseURLSZ + `current-group`,
            method: 'GET',
            headers: APIEndpoints.getHeaders(2, false)
        };
    }

    static purchaseInventory(data, game) {
        let baseURL = APIEndpoints.baseURLSZ;
        switch (game) {
            case "hg":
                baseURL = APIEndpoints.baseURLHG;
                break;
            case "hgo":
                baseURL = APIEndpoints.baseURLHGO;
                break;
            case "puckluck":
                baseURL = APIEndpoints.baseURLPuckLuck;
                break;
            case "bbbash":
                baseURL = APIEndpoints.baseURLBaseballBash;
                break;
            // case "mg":
            //     baseURL = APIEndpoints.baseURLMG;
            //     break;
        }

        return {
            url: baseURL + `transaction/add`,
            method: 'POST',
            headers: APIEndpoints.getHeaders(2),
            data: "" + JSON.stringify(data)
        }
    }

    /**
     * return endpoint for post data like*
     game_type_idx:01_gold
     status:N
     */
    static kitbagRewards(data) {
        return {
            url: APIEndpoints.baseURLSZ + "kitbag-transaction/add",
            method: 'POST',
            headers: APIEndpoints.getHeaders(2),
            data: "" + JSON.stringify(data)
        };
    }

    /**
     * return endpoint for enter display name of user*
     displayname:Test07
     */
    static userDisplayName(data) {
        return {
            url: APIEndpoints.baseURLSZ + "user-displayname/add",
            method: 'POST',
            headers: APIEndpoints.getHeaders(2),
            data: HelperFunctions.toURLEncoded(data)
        };
    }

    static get accountSummary() {
        return {
            // url: "https://myaccount.paddypower.com/summary/accountsummary"
            url: ""
        }
    }

    /**
     * API to get current group info
     */
    static weekStats(queryString = "") {
        return {
            url: APIEndpoints.baseURLSZ + `week-stats` + queryString,
            method: 'GET',
            headers: APIEndpoints.getHeaders(2, false)
        };
    }

    /**
     * API to get current group info
     */
    static funfacts() {
        return {
            url: APIEndpoints.iSGBaseURL + `featured-matches/soccer/all?type=featured-game&offset=0&limit=5`,
            method: 'GET',
            headers: APIEndpoints.getHeaders(2, true)
        };
    }

    /**
     * API to get leaderboard groups
     */
    static leaderboardWeeks() {
        return {
            url: APIEndpoints.baseURLSZ + `leaderboard-week/list`,
            method: 'GET',
            headers: APIEndpoints.getHeaders(2, true)
        };
    }

    static pollVote(qStr) {
        // ?season=2020&week=43
        return {
            url: APIEndpoints.baseURLSZ + `poll-vote-list` + qStr,
            method: 'GET',
            headers: APIEndpoints.getHeaders(2)
        };
    }

    static submitPollVote(data) {
        return {
            url: APIEndpoints.baseURLSZ + "submit-poll-vote",
            method: 'POST',
            headers: APIEndpoints.getHeaders(2),
            data: "" + JSON.stringify(data)
        };
    }

    static getSSOLoginToken(data) {
        // console.log("sso", data);
        return {
            url: APIEndpoints.baseURL + "auth/sso-login",
            method: 'POST',
            headers: APIEndpoints.getHeaders(2),
            data: HelperFunctions.toURLEncoded(data),
        };
    }

    static checkSSOLoginToken(data) {
        // console.log("sso", data);
        return {
            url: APIEndpoints.baseURL + "auth/sso-checktoken",
            method: 'POST',
            headers: APIEndpoints.getHeaders(2, false, true),
            data: HelperFunctions.toURLEncoded(data),
        };
    }

}

