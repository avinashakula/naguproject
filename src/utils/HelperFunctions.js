import $ from 'jquery';
import APIEndpoints from "../config/APIEndpoints";
import Constants from "./Constants";
import DateHelper from './DateHelper';

function toFixedToOnePlace(number) {
    if (number && (number % 1 > 0)) {
        return number.toFixed(2);
    }
    return '' + number;
}

// get the top route name in any navigator
function getRouteNameInNavigator(navigator, index) {
    return navigator.routes[index !== undefined ? index : navigator.index].routeName;
}

function hexToRgb(hex) {
    // Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")
    var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
    hex = hex.replace(shorthandRegex, function (m, r, g, b) {
        return r + r + g + g + b + b;
    });

    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : null;
}

function copyObject(object) {
    return JSON.parse(JSON.stringify(object));
}

function getQueryStringValue(key) {
    return decodeURIComponent(window.location.search.replace(new RegExp("^(?:.*[&\\?]" + encodeURIComponent(key).replace(/[\.\+\*]/g, "\\$&") + "(?:\\=([^&]*))?)?.*$", "i"), "$1"));
}

function appendZero(number) {
    return number < 10 ? '0' + number : '' + number
}

function formatNumber(num) {
    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
}

function postMessageToGame(message) {
    message.from = 'react_js';
    window.postMessage(message, "*");
}

function isAlphaNumeric(value) {
    var letterNumber = /^[a-z0-9]+$/i;
    if (value.match(letterNumber))
        return true;
    else
        return false;
}

function isAlphaNumericUnderscore(value) {
    var letterNumber = /^[a-z0-9_]+$/i;
    if (value.match(letterNumber))
        return true;
    else
        return false;
}

function createCookie(name, value, days) {
    var expires;
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toGMTString();
    } else {
        expires = "";
    }
    document.cookie = name + "=" + value + expires + "; path=/; secure";
}

function createDomainCookie(name, value, days) {
    var expires;
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toGMTString();
    } else {
        expires = "";
    }
    document.cookie = name + "=" + value + expires + "; domain=" + '.' + document.domain + "; path=/; secure";
}

function readCookie(name) {
    var nameEQ = encodeURIComponent(name) + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) === ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) === 0) return decodeURIComponent(c.substring(nameEQ.length, c.length));
    }
    return null;
}

function eraseCookie(name) {
    createCookie(name, "", -1);
}

function getCurrency(currencyValue) {

    // switch (currencyValue) {
    //     case 'GBP':
    //         return "£";
    //         break;
    //     case 'USD':
    //         return "$";
    //         break;
    //     case 'EUR':
    //         return "€";
    //         break;
    //     default:
    //         return "£";
    //         break;
    // }
    return "$";
}

function getCurrencyImage(currencyValue) {
    // switch (currencyValue) {
    //     case 'GBP':
    //         return "assets/images/pound.png";
    //         break;
    //     case 'USD':
    //         return "assets/images/dollar.png";
    //         break;
    //     case 'EUR':
    //         return "assets/images/euro.png";
    //         break;
    //     default:
    //         return "assets/images/euro.png";
    //         break;
    // }
    return "assets/images/dollar.png";
}

function redirectToLoginSSO(redirectURl) {
    window.location.href = APIEndpoints.identitySSO.url;
}

function redirectToQuickPlayLink(game) {
    window.location.href = window.location.origin + "/quickplay/" + game + "?actionType=quickplay";
}

function numberFormatter(number) {
    return number.toLocaleString('en');
}

function getUrlVars() {
    var vars = {};
    var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function (m, key, value) {
        vars[key] = value;
    });
    return vars;
}

function generateRangeForRange(input, inputLow, inputHigh, outputLow, outputHigh) {
    return ((input - inputLow) / (inputHigh - inputLow)) * (outputHigh - outputLow) + outputLow;
}

function getQueryStringFromURL() {
    return window.location.search;
}

function getRedirectGameURL(game) {
    return window.URLGamePlayingOn + "/games/" + game + "/" + HelperFunctions.getQueryStringFromURL();
}

function toURLEncoded(data) {
    const dataToPass = Object.keys(data).map((key) => {
        return encodeURIComponent(key) + '=' + encodeURIComponent(data[key]);
    }).join('&');
    return dataToPass;
}

function convertMS(milliseconds) {
    var day, hour, minute, seconds;
    seconds = Math.floor(milliseconds / 1000);
    minute = Math.floor(seconds / 60);
    seconds = seconds % 60;
    hour = Math.floor(minute / 60);
    minute = minute % 60;
    day = Math.floor(hour / 24);
    hour = hour % 24;
    return {
        day: appendZero(day),
        hour: appendZero(hour),
        minute: appendZero(minute),
        second: appendZero(seconds)
    };
}

function msToTime(s) {
    if (s) {

        var ms = s % 1000;

        s = (s - ms) / 1000;
        var secs = s % 60;
        s = (s - secs) / 60;
        var mins = s % 60;
        var hrs = (s - mins) / 60;

        if (ms.toString().length === 2) {
            ms = "0" + ms;
        }

        if (ms.toString().length === 1) {
            ms = "00" + ms;
        }

        hrs = appendZero(hrs);
        mins = appendZero(mins);
        secs = appendZero(secs);

        return {
            hour: hrs,
            min: mins,
            sec: secs,
            milisec: ms,
        }
        // if (hrs === "00" || hrs === "0") {
        //     return mins + ':' + secs + '.' + ms;
        // } else {
        //     return hrs + ':' + mins + ':' + secs + '.' + ms;
        // }
    }

    return null;
}

function prettyDate(date) {
    var months = ['January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'];

    return months[date.getUTCMonth()] + ' ' + date.getUTCDate();
}

function convertDateTimeToMS(dateTime) {
    var date = new Date(dateTime); // some mock date
    var currDate = new Date(); // some mock date
    var milliseconds = date.getTime();
    var currDateMilliseconds = currDate.getTime();
    var diff = milliseconds - currDateMilliseconds;

    var monthName = prettyDate(date);
    // console.log(monthName);
    //var date = date.getDate();
    /* var hours = date.getHours();
    var minutes = date.getMinutes(); */

    return { milliSeconds: diff, monthDate: monthName }
}

function returnTime(object) {
    var remainingMilliSeconds = object.milliSeconds;
    var timeObbj = convertMS(remainingMilliSeconds);
    var remainingHours = timeObbj.hour;
    var remainingDay = timeObbj.day;
    var remainingMinutes = timeObbj.minute;
    var remainingSeconds = timeObbj.second;
    var dayToShow = parseInt(remainingDay) > 0 ? (remainingDay) : '00';
    var hourToShow = parseInt(remainingHours) > 0 ? (remainingHours) : '00';
    var minuteToShow = parseInt(remainingMinutes) ? (remainingMinutes) : '00';
    var secondToShow = remainingSeconds;

    var timerValues = {
        isComplete: object.isComplete,
        dayToShow: dayToShow,
        hourToShow: hourToShow,
        minuteToShow: minuteToShow,
        secondToShow: secondToShow,
    };
    return timerValues;
}

function friendsWithBeneURL() {
    return 'https://promos.paddypower.com/promotion?promoCode=CACQFWBSPORTS';
}

function detectDevice() {
    return window.gameOrientation && window.gameOrientation.device;
}

function calculateLevelBarWidth(userXPData) {
    let xpRequired = userXPData.upcoming_level.xp_points - userXPData.user_level.xp_points;
    let totalXP = userXPData.user_xp_points - userXPData.user_level.xp_points;
    const per = (totalXP / xpRequired) * 100;
    return per === 0 ? 0 : generateRangeForRange(per, 0, 100, 4, 100);
}

function calculateLevelBarWidthNew(userXPData) {
    const per = (userXPData.current_xp / userXPData.required_xp_next_level) * 100;
    return per;
    // return per === 0 ? 0 : generateRangeForRange(per, 0, 100, 4, 100);
}

function addPlusSign(val) {

    if (val > 0) {
        return "+" + val;
    } else {
        return val;
    }
    return null;
}

function getRequiredXPForNextLevel(nextLevelXP, currentXP) {
    return (nextLevelXP - currentXP)
}

function lockedTab(data, tab) {
    let flag = null;
    if (data !== null && data.user_level.level_id) {
        let currentLevel = data.user_level.level_id;
        let definedLevel = tab === "store" ? Constants.itemsTabLevel : Constants.trainingTabLevel;
        if (currentLevel) {
            if (currentLevel < definedLevel) {
                flag = true;
            } else {
                flag = false;
            }
        }
    }
    return flag
}

function generateLocalImgPath(image) {
    return process.env.PUBLIC_URL + "/assets/images/" + image + process.env.REACT_APP_VERSION
}

function ordinal_suffix_of(i) {
    var j = i % 10,
        k = i % 100;
    if (j == 1 && k != 11) {
        return i + "st";
    }
    if (j == 2 && k != 12) {
        return i + "nd";
    }
    if (j == 3 && k != 13) {
        return i + "rd";
    }
    return i + "th";
}

function validateSpecialChar(text) {
    //Regex for Valid Characters i.e. Alphabets, Numbers and Space.
    var regex = /^[A-Za-z0-9]*$/;
    //Validate TextBox value against the Regex.
    var isValid = regex.test(text);
    return isValid;
}

function getHappyHourBarPer(value, maxValue) {
    return ((value / maxValue) * 100) + "%";
}

function toCheckPopupVisible() {
    // console.log("check popup")
    $("body").removeClass("show-modal");
    if ($('body').css('overflow') === "hidden") {
        $('body').css('overflow', 'visible');
    }
    setTimeout(function () {
        $(".skillzone-popup-visible").each(function (index) {
            $("body").addClass("show-modal");
        });
    }, 100)

}

function checkIsPopupShowing() {
    var cnt = 0;
    $(".skillzone-popup-visible").each(function (index) {
        cnt++;
    });

    return cnt;
}

function strBasedOnOneMore(num = '', oneStr, moreStr) {
    if (num === 0 || num === -1 || num === 1) {
        return '' + num + ' ' + oneStr;
    }
    else {
        return ' ' + num + ' ' + moreStr;
    }
}

function MGScoreFormat(score) {
    if (score === 0) {
        score = "E";
    } else if (score > 0) {
        score = "+" + score;
    }

    return score;
}

function formatCurrency(number) {
    if (number) {
        return number.toFixed(2);
    }
    return '' + number;
}
function sorter(a, b) {
    return a.tip_per - b.tip_per;
}

function sortByTip(arr) {
    arr.sort(sorter);
}

function odds_conversion_decimal_to_fraction_odds(decimal_val) {
    var fraction_odds = {
        '1.01': '1/100',
        // '1.02': '1/50',
        // '1.0303': '1/33',
        // '1.04': '1/25',
        // '1.1': '1/10',
        // '1.125': '1/8',
        // '1.143': '1/7',
        // '1.167': '1/6',
        // '1.2': '1/5',
        // '1.222': '2/9',
        // '1.25': '1/4',
        // '1.286': '2/7',
        // '1.3': '3/10',
        // '1.333': '1/3',
        // '1.364': '4/11',
        // '1.4': '2/5',
        // '1.444': '4/9',
        // '1.5': '1/2',
        // '1.533': '8/15',
        // '1.571': '4/7',
        // '1.615': '8/13',
        // '1.667': '4/6',
        // '1.727': '8/11',
        // '1.8': '4/5',
        // '1.833': '5/6',
        // '1.909': '10/11',
        // '2.0': '1/1',
        // '2.1': '11/10',
        // '2.2': '6/5',
        // '2.25': '5/4',
        // '2.3': '13/10',
        // '2.375': '11/8',
        // '2.5': '6/4',
        // '2.625': '13/8',
        // '2.75': '7/4',
        // '3.0': '2/1',
        // '3.2': '11/5',
        // '3.25': '9/4',
        // '3.4': '12/5',
        // '3.5': '5/2',
        // '3.75': '11/4',
        // '4.0': '3/1',
        // '4.333': '10/3',
        // '4.5': '7/2',
        // '5.0': '4/1',
        // '5.5': '9/2',
        // '6.0': '5/1',
        // '6.5': '11/2',
        // '7.0': '6/1',
        // '7.5': '13/2',
        // '8.0': '7/1',
        // '8.5': '15/2',
        // '9.0': '8/1',
        // '9.5': '17/2',
        // '10.0': '9/1',
        // '11.0': '10/1',
        // '12.0': '11/1',
        // '13.0': '12/1',
        // '15.0': '14/1',
        // '17.0': '16/1',
        // '21.0': '20/1',
        // '26.0': '25/1',
        // '34.0': '33/1',
        // '41.0': '40/1',
        // '51.0': '50/1',
        // '67.0': '66/1',
        // '101.0': '100/1'
    };

    if (fraction_odds[decimal_val]) {
        return fraction_odds[decimal_val];
    }
    return null;

}


/* Start New Code */
//this function is for calculating the greater common divisior of two values	
function calculate_gcd(a, b) {
    let gcd
    if (!b) {
        return a;
    }
    return gcd = calculate_gcd(b, a % b);
};

//this function is using for having the value till two digit 
function round_two_digit(value) {
    return (Math.round(value * 100) / 100).toFixed(2);
};

function generateBetSlipURL(value) {
    if (value.market_id && value.outcomeid) {
        const rfrVal = HelperFunctions.readCookie("rfr");
        return "https://servedby.flashtalking.com/click/1/137150;5040669;673068;211;0/?gdpr=${GDPR}&gdpr_consent=${GDPR_CONSENT_78}&us_privacy=${US_PRIVACY}&url=https://www.paddypower.com/?action=addLegs&leg=" + value.market_id + "|" + value.outcomeid + "|SIMPLE_SELECTION|&rfr=" + rfrVal;
    }
    return null;
}

function convertDecimalToFraction(odd) {

    let convertedOdds = HelperFunctions.odds_conversion_decimal_to_fraction_odds(odd);
    // console.log(convertedOdds);
    if (convertedOdds) {
        return convertedOdds;
    }

    var wholeNumber, multiplier;
    for (var i = 1; i <= 1000; i++) {
        var nodd = odd * i;
        if (nodd.toFixed(2) % 1 === 0) {
            wholeNumber = nodd;
            multiplier = i;
            break;
        }
    }

    return (wholeNumber - multiplier) + "/" + multiplier;


    console.log(wholeNumber, multiplier);
}

function doubleRewardTimeToShow() {
    var currentDate = DateHelper.convertToDateTime(DateHelper.getCurrentDateAndTime());
    if (currentDate >= "2020-12-16 00:00:01" && currentDate < "2020-12-23 00:00:00") {
        return true;
    }
}

function filterNonActiveGamesAccordingToWeek(game) {
    let gameCopy = HelperFunctions.copyObject(game);
    if (gameCopy.second_week_date) {
        gameCopy.dateToShow = gameCopy.second_week_date;
    } else if (gameCopy.third_week_date) {
        gameCopy.dateToShow = gameCopy.third_week_date;
    } else if (gameCopy.fourth_week_date) {
        gameCopy.dateToShow = gameCopy.fourth_week_date;
    } else if (gameCopy.upcoming_date) {
        gameCopy.dateToShow = gameCopy.upcoming_date;
    }
    return gameCopy;
}

function numChangeToShort(num) {
    if (num > 999 && num < 1000000) {
        return (num / 1000).toFixed(1) + 'K'; // convert to K for number from > 1000 < 1 million
    } else if (num > 1000000) {
        return (num / 1000000).toFixed(1) + 'M'; // convert to M for number from > 1 million
    } else if (num < 900) {
        return num; // if value < 1000, nothing to do
    }
}

function toggleWTBodyClass(flag) {
    flag ? $("body").addClass("show-walkthrought") : $("body").removeClass("show-walkthrought");
}

function toggleBodyGrayedOutClass(flag) {
    flag ? $("body").addClass("wt-overlay") : $("body").removeClass("wt-overlay");
}

function generateRandomNumber() {
    return Math.floor(Math.random() * 90000) + 10000;
}


function getParameterByName(name, url = window.location.href) {
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

function removeURLParameter(parameter, url = window.location.href) {
    //prefer to use l.search if you have a location/link object
    var urlparts = url.split('?');
    // console.log(urlparts);
    if (urlparts.length >= 2) {

        var prefix = encodeURIComponent(parameter) + '=';
        var pars = urlparts[1].split(/[&;]/g);
        // console.log(pars, "urlparts");
        //reverse iteration as may be destructive
        for (var i = pars.length; i-- > 0;) {
            //idiom for string.startsWith
            if (pars[i].lastIndexOf(prefix, 0) !== -1) {
                // console.log(pars, "pars");
                pars.splice(i, 1);
                // console.log(pars, "pars");
            }
        }

        if (pars.length > 0)
            url = urlparts[0] + '?' + pars.join('&');
        else
            url = urlparts[0];
        window.history.replaceState({}, document.title, url);
    }
}

const HelperFunctions = {
    getRouteNameInNavigator,
    hexToRgb,
    getCurrencyImage,
    numberFormatter,
    formatNumber,
    copyObject,
    toFixedToOnePlace,
    getQueryStringValue,
    appendZero,
    postMessageToGame,
    isAlphaNumeric,
    isAlphaNumericUnderscore,
    createCookie,
    createDomainCookie,
    readCookie,
    eraseCookie,
    getCurrency,
    redirectToLoginSSO,
    getUrlVars,
    generateRangeForRange,
    getQueryStringFromURL,
    toURLEncoded,
    returnTime,
    convertMS,
    addPlusSign,
    convertDateTimeToMS,
    prettyDate,
    friendsWithBeneURL,
    detectDevice,
    calculateLevelBarWidth,
    getRequiredXPForNextLevel,
    lockedTab,
    generateLocalImgPath,
    ordinal_suffix_of,
    validateSpecialChar,
    getHappyHourBarPer,
    toCheckPopupVisible,
    calculateLevelBarWidthNew,
    strBasedOnOneMore,
    MGScoreFormat,
    msToTime,
    getRedirectGameURL,
    formatCurrency,
    sortByTip,
    sorter,
    checkIsPopupShowing,
    odds_conversion_decimal_to_fraction_odds,
    round_two_digit,
    calculate_gcd,
    generateBetSlipURL,
    convertDecimalToFraction,
    doubleRewardTimeToShow,
    filterNonActiveGamesAccordingToWeek,
    numChangeToShort,
    toggleWTBodyClass,
    generateRandomNumber,
    toggleBodyGrayedOutClass,
    getParameterByName,
    redirectToQuickPlayLink,
    removeURLParameter
};

export default HelperFunctions;