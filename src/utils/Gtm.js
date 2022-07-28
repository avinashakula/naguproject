import axios from "axios";
import HelperFunctions from "./HelperFunctions";

function pageLoad(accountId = '123456') {
    getJSONP('https://jsonip.com/?callback=?', function (data) {
        const ipAddress = data.ip;
        if (ipAddress !== '') {
            getCountryNameByIpAddress(ipAddress)
                .then(res => {
                    let data = res.data;
                    if (data) {
//formatted address
                        const address = data.country;
                        pageLoadGTM(accountId, address)
                    }
                }).catch(function (error) {
                pageLoadGTM(accountId, 'undefined');
            });
        } else {
            if (!ipAddress && ipAddress === '') {
                const location = window.navigator && window.navigator.geolocation;
                if (location) {
                    location.getCurrentPosition((position) => {
                        getCountryName(position.coords.latitude, position.coords.longitude)
                            .then(res => {
                                let data = res.data;
                                if (data.results[0]) {
//formatted address
                                    const address = data.results[0].formatted_address;
                                    pageLoadGTM(accountId, address)
                                }
                            }).catch(function (error) {
                            pageLoadGTM(accountId, 'undefined');
                        });
                    })
                }
            }
        }
    })
}

function pageLoadGTM(accountId, country = null) {

    let reg_status = 'unregistered';
    if (HelperFunctions.readCookie("bfsd")) {
        if (HelperFunctions.readCookie("bfsd").indexOf('st=reg') > -1) {
            reg_status = "returning registered";
        } else if (HelperFunctions.readCookie("bfsd").indexOf('st=p') > -1) {
            reg_status = "new prospect";
        } else if (HelperFunctions.readCookie("bfsd").indexOf('st=rp') > -1) {
            reg_status = "returning prospect";
        }
    }

    let product = 'desktop';
    if (window.gameOrientation && window.gameOrientation.isNativeApp) {
        product = "app";
    }
    else if (window.gameOrientation && (window.gameOrientation.device === 'android' || window.gameOrientation.device === 'ios')) {
        product = "mobile web"
    }

    const dataObj = {
        'event': 'ga_pageLoad',
        'ga_target_property': 'UA-63107437-17',
        'acc_id': accountId,
        'vertical': 'hit the spot',
        'product': product,
        'locale': 'en-us',
        'reg_status': reg_status,
        'login_status': HelperFunctions.readCookie("loggedIn") ? "logged in" : "logged out",
        'jurisdiction': 'international',
        'orientation': window.gameOrientation ? window.gameOrientation.orientation : '',
        'app_id': 'undefined',
        'bucket_id': 'undefined',
        'test_group': 'undefined',
        'test_name': 'undefined',
        'rfr': HelperFunctions.readCookie("rfr"),
        'pid': HelperFunctions.readCookie("pid"),
        'ttp': HelperFunctions.readCookie("ttp"),
        'bid': HelperFunctions.readCookie("bid"),
        'promo_code': HelperFunctions.readCookie("promo_code"),
        'clkid': HelperFunctions.readCookie("clkid"),
        'sid': HelperFunctions.readCookie("sid"),
        'StickyTags': HelperFunctions.readCookie("StickyTags"),
        'TrackingTags': HelperFunctions.readCookie("TrackingTags"),
        'brand': 'pp'
    };

    if (country) {
        dataObj.country = country;
    }

    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push(dataObj);
}

function getCountryName(lat, lang) {
    return axios.get('https://maps.googleapis.com/maps/api/geocode/json?latlng=' + lat + ',' + lang, {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        }
    })
}


function getJSONP(url, success) {

    var ud = '_' + +new Date,
        script = document.createElement('script'),
        head = document.getElementsByTagName('head')[0]
            || document.documentElement;

    window[ud] = function (data) {
        head.removeChild(script);
        success && success(data);
    };

    script.src = url.replace('callback=?', 'callback=' + ud);
    head.appendChild(script);
}

function getCountryNameByIpAddress(address) {
    return axios.get('https://extreme-ip-lookup.com/json/' + address, {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        }
    })
}

function accountButton() {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
        'event': 'ga_event',
        'category': 'hit the spot',
        'action': 'show',
        'label': 'account',
        'cd3': 'header'
    });
}

function joinLoginButton(url) {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
        'event': 'ga_event',
        'category': 'hit the spot',
        'action': 'navigated to',
        'label': 'join/login',
        'cd3': 'header',
        'cd34': url
    });
}

function closeButton() {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
        'event': 'ga_event',
        'category': 'hit the spot',
        'action': 'hide',
        'label': 'account',
        'cd3': 'account overlay'
    });
}

// function betsButton() {
// window.dataLayer = window.dataLayer || [];
// window.dataLayer.push({
// 'event': 'ga_event',
// 'category': 'hit the spot',
// 'action': 'show',
// 'label': 'my bets',
// 'cd3': 'header'
// });
// }

function hitTheSpotLogo() {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
        'event': 'ga_event',
        'category': 'hit the spot',
        'action': 'navigated to',
        'label': 'hit the spot',
        'cd3': 'header',
        'cd34': window.location.href
    });
}

// function closeBetButton(){
// window.dataLayer = window.dataLayer || [];
// window.dataLayer.push({
// 'event': 'ga_event',
// 'category': 'hit the spot',
// 'action': 'hide',
// 'label': 'my bets',
// 'cd3': 'my bets overlay'
// });
// }

function menuButton() {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
        'event': 'ga_event',
        'category': 'hit the spot',
        'action': 'opened',
        'label': 'menu',
        'cd3': 'header'
    });
}

function menuItemsButton(params) {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
        'event': 'ga_event',
        'category': 'hit the spot',
        'action': 'opened',
        'label': params,	//faq, responsible gaming, prizes, my history, etc.
        'cd3': 'menu'
    });
}

function exitGameButton() {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
        'event': 'ga_event',
        'category': 'hit the spot',
        'action': 'clicked',
        'label': 'exit game',
        'cd3': 'menu'
    });
}

function closeMenuItemButton(params) {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
        'event': 'ga_event',
        'category': 'hit the spot',
        'action': 'closed',
        'label': params,	//faq, responsible gaming, prizes, my history, etc.
        'cd3': 'menu - ' + params	//menu - faq, menu - prizes, menu - my history, etc.
    });
}

function playNowButton() {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
        'event': 'ga_event',
        'category': 'hit the spot',
        'action': 'clicked',
        'label': 'play now',
        'cd3': 'home page'
    });
}

function howToButton() {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
        'event': 'ga_event',
        'category': 'hit the spot',
        'action': 'clicked',
        'label': 'how to',
        'cd3': 'home page'
    });
}

function practiceButton() {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
        'event': 'ga_event',
        'category': 'hit the spot',
        'action': 'clicked',
        'label': 'practise',
        'cd3': 'home page'
    });
}

function goToHomeButtonFromPractice() {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
        'event': 'ga_event',
        'category': 'hit the spot',
        'action': 'clicked',
        'label': 'home',
        'cd3': 'practice'
    });
}

function pauseGameButton() {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
        'event': 'ga_event',
        'category': 'hit the spot',
        'action': 'clicked',
        'label': 'pause',
        'cd3': 'game'
    });
}

function pauseGameButtonEvent(params) {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
        'event': 'ga_event',
        'category': 'hit the spot',
        'action': 'clicked',
        'label': params,	//'home', 'resume'
        'cd3': 'game pause'
    });
}

function closeButtonFromPause() {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
        'event': 'ga_event',
        'category': 'hit the spot',
        'action': 'closed',
        'label': 'closed',
        'cd3': 'game pause'
    });
}

function fullScreenButton(params, label) {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
        'event': 'ga_event',
        'category': 'hit the spot',
        'action': 'fullscreen',
        'label': label, //'on' | 'off',
        'cd3': params	//'practice', 'game'
    });
}

function needMorePracticeButton(params) {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
        'event': 'ga_event',
        'category': 'hit the spot',
        'action': 'clicked',
        'label': params,	//'yes', 'no im ready'
        'cd3': 'need more practice'
    });
}

function closePracticeSessionButton() {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
        'event': 'ga_event',
        'category': 'hit the spot',
        'action': 'closed',
        'label': 'need more practice',
        'cd3': 'need more practice'
    });
}

function gameCompleteButton() {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
        'event': 'ga_event',
        'category': 'hit the spot',
        'action': 'closed',
        'label': 'game complete',
        'cd3': 'game complete'
    });
}

function gameCompleteEventButton(params) {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
        'event': 'ga_event',
        'category': 'hit the spot',
        'action': 'clicked',
        'label': params,	//'daily summary', 'play again'
        'cd3': 'game complete'
    });
}

function playFromPracticeButton() {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
        'event': 'ga_event',
        'category': 'hit the spot',
        'action': 'clicked',
        'label': 'play',
        'cd3': 'how to'
    });
}

function dailySummaryClick(params) {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
        'event': 'ga_event',
        'category': 'hit the spot',
        'action': 'clicked',
        'label': params,	//'menu', 'play again'
        'cd3': 'daily summary'
    });
}

function shareFromMenu(params) {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
        'event': 'ga_event',
        'category': 'hit the spot',
        'action': 'clicked',
        'label': params,	//'whatsapp', 'twitter', 'facebook', 'copy link', etc.
        'cd3': 'menu - share'
    });
}

function shareFromResult(params) {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
        'event': 'ga_event',
        'category': 'hit the spot',
        'action': 'clicked',
        'label': params,	//'whatsapp', 'twitter', 'facebook', 'copy link', etc.
        'cd3': 'game complete'
    });
}

function congratulationsOverlay() {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
        'event': 'ga_event',
        'category': 'hit the spot',
        'action': 'clicked',
        'label': 'x',
        'cd3': 'congratulations'
    });
}

function shareFromCongratulations(params) {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
        'event': 'ga_event',
        'category': 'hit the spot',
        'action': 'clicked',
        'label': params,	//'whatsapp', 'twitter', 'facebook', 'copy link', etc.
        'cd3': 'congratulations'
    });
}

function congratulationsContinue() {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
        'event': 'ga_event',
        'category': 'hit the spot',
        'action': 'clicked',
        'label': 'continue',
        'cd3': 'congratulations'
    });
}

function congratulationsShow() {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
        'event': 'ga_event',
        'category': 'hit the spot',
        'action': 'saw',
        'label': 'congratulations',
        'cd3': 'congratulations'
    });
}

function gtmCallFromPlayCanvas(keyName, label, dispatchCallback = () => {
}) {
    switch (keyName) {
        case 'playNow':
            playNowButton();
            break;
        case 'practice':
            practiceButton();
            break;
        case 'howTo':
            howToButton();
            break;
        case 'practiceToHome':
            goToHomeButtonFromPractice();
            break;
        case 'pauseGame':
            pauseGameButton();
            break;
        case 'pauseToHome':
            pauseGameButtonEvent('home');
            break;
        case 'pauseToResume':
            pauseGameButtonEvent('resume');
            break;
        case 'pauseToClose':
            closeButtonFromPause();
            break;
        case 'practiceFullScreenToggle':
            fullScreenButton('practice', label);
            break;
        case 'gameFullScreenToggle':
            fullScreenButton('game', label);
            break;
        case 'gameOverClose':
            gameCompleteButton();
            break;
        case 'gameOverToMenu':
            gameCompleteEventButton('daily summary');
            break;
        case 'gameOverToPlayAgain':
            gameCompleteEventButton('play again');
            break;
        case 'howToToPlay':
            playFromPracticeButton();
            break;
        case 'practiceToClose':
            closePracticeSessionButton();
            break;
        case 'practiceToSplash':
            needMorePracticeButton('no im ready');
            break;
        case 'practiceToPractice':
            needMorePracticeButton('yes');
            break;
        case 'gameComplete':
            shareFromResult(label);
            break;
        case 'congratulations':
            shareFromCongratulations(label);
            break;
        case 'congratulationsOutClick':
            congratulationsOverlay();
            break;
        case 'congratulationsContinueClick':
            congratulationsContinue();
            break;
        case 'congratulationsSaw':
            congratulationsShow();
            break;
        case 'bannerClick':
            dispatchCallback("banner-click", 0, null); //this will call the tracking API on callback
            break;
        default:
            return null
    }

}

export {
    playFromPracticeButton,
    gameCompleteEventButton,
    gameCompleteButton,
    closePracticeSessionButton,
    needMorePracticeButton,
    fullScreenButton,
    closeButtonFromPause,
    pauseGameButtonEvent,
    pauseGameButton,
    goToHomeButtonFromPractice,
    practiceButton,
    howToButton,
    playNowButton,
    closeMenuItemButton,
    exitGameButton,
    menuItemsButton,
    menuButton,
    hitTheSpotLogo,
    closeButton,
    accountButton,
    gtmCallFromPlayCanvas,
    joinLoginButton,
    pageLoad,
    dailySummaryClick,
    shareFromMenu,
    getJSONP
};