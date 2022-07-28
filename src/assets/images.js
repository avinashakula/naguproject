import APIEndpoints from "../config/APIEndpoints";

const images = function () {
    //const PUBLIC_URL = APIEndpoints.isProduction ? "https://cdn.geniusgames.com.au/arcade-games/home/images" : "https://cdn.geniusgames.com.au/arcade-games/home/dev/images";
    const PUBLIC_URL = process.env.PUBLIC_URL;
    return {
        redCard: PUBLIC_URL + '/assets/images/red-card.png' + process.env.REACT_APP_VERSION,
        ppLogo: PUBLIC_URL + '/assets/images/logo-white.svg' + process.env.REACT_APP_VERSION,
        mainLogo: PUBLIC_URL + '/assets/images/logo.svg' + process.env.REACT_APP_VERSION,
        closeBtn: PUBLIC_URL + '/assets/images/Close-btn.svg' + process.env.REACT_APP_VERSION,
        starYellow: PUBLIC_URL + '/assets/images/star-yellow.svg' + process.env.REACT_APP_VERSION,
        // ppSkillLogo: PUBLIC_URL + '/assets/images/pp-skill-logo.png' + process.env.REACT_APP_VERSION,
        ppSkillLogo: PUBLIC_URL + '/assets/images/sbgarcade-logo.svg' + process.env.REACT_APP_VERSION,
        gtgLogo: PUBLIC_URL + '/assets/images/gtg_network_logo.svg' + process.env.REACT_APP_VERSION,
       
        coinIcon: PUBLIC_URL + '/assets/images/coin.png' + process.env.REACT_APP_VERSION,

        trophy: PUBLIC_URL + '/assets/images/trophy.png' + process.env.REACT_APP_VERSION,
        trophyTwo: PUBLIC_URL + '/assets/images/trophy2.png' + process.env.REACT_APP_VERSION,

        badge: PUBLIC_URL + '/assets/images/badge.png' + process.env.REACT_APP_VERSION,
        starBadge: PUBLIC_URL + '/assets/images/star-badge.png' + process.env.REACT_APP_VERSION,
        fireBall: PUBLIC_URL + '/assets/images/fireballgold.png' + process.env.REACT_APP_VERSION,

        specialOffer: PUBLIC_URL + '/assets/images/special-offer.png' + process.env.REACT_APP_VERSION,
        riskFreeBanner: PUBLIC_URL + '/assets/images/risk-free-banner.jpg' + process.env.REACT_APP_VERSION,

        manchesterCity: PUBLIC_URL + '/assets/images/icons/manchester-city.png' + process.env.REACT_APP_VERSION,
        arsenal: PUBLIC_URL + '/assets/images/icons/arsenal.png' + process.env.REACT_APP_VERSION,

        htsLogo: PUBLIC_URL + '/assets/images/hts-logo.png' + process.env.REACT_APP_VERSION,
        htsBanner: PUBLIC_URL + '/assets/images/hts-banner.jpg' + process.env.REACT_APP_VERSION,

        dribblingBanner: PUBLIC_URL + '/assets/images/dribbling-banner.jpg' + process.env.REACT_APP_VERSION,
        dribblingLogo: PUBLIC_URL + '/assets/images/dribbling-logo.png' + process.env.REACT_APP_VERSION,

        headersBanner: PUBLIC_URL + '/assets/images/headers-banner.jpg' + process.env.REACT_APP_VERSION,
        headersLogo: PUBLIC_URL + '/assets/images/headers-logo.png' + process.env.REACT_APP_VERSION,

        hoopsBanner: PUBLIC_URL + '/assets/images/hoops-banner.jpg' + process.env.REACT_APP_VERSION,
        hoopsLogo: PUBLIC_URL + '/assets/images/hoops-logo.png' + process.env.REACT_APP_VERSION,
        hoopsIndoorLogo: PUBLIC_URL + '/assets/images/hoops-indoor-logo.png' + process.env.REACT_APP_VERSION,
        hoopsOutdoorBanner: PUBLIC_URL + '/assets/images/hoops-banner2.jpg' + process.env.REACT_APP_VERSION,

        miniFeaturedCard: PUBLIC_URL + '/assets/images/mini-featured-card.jpg' + process.env.REACT_APP_VERSION,
        minigolfLogo: PUBLIC_URL + '/assets/images/minigolf-logo.png' + process.env.REACT_APP_VERSION,
        puttoffLogo: PUBLIC_URL + '/assets/images/puttoff-logo.png' + process.env.REACT_APP_VERSION,

        goldCoin: PUBLIC_URL + '/assets/images/gold-coin.png' + process.env.REACT_APP_VERSION,
        silverCoin: PUBLIC_URL + '/assets/images/silver-coin.png' + process.env.REACT_APP_VERSION,
        bronzeCoin: PUBLIC_URL + '/assets/images/bronze-coin.png' + process.env.REACT_APP_VERSION,
        bangIcon: PUBLIC_URL + '/assets/images/bang-icon.png' + process.env.REACT_APP_VERSION,

        htsCard: PUBLIC_URL + '/assets/images/hts-card.jpg' + process.env.REACT_APP_VERSION,
        htsCardComing: PUBLIC_URL + '/assets/images/hts-card-2.jpg' + process.env.REACT_APP_VERSION,

        triviaCard: PUBLIC_URL + '/assets/images/trivia-card.jpg' + process.env.REACT_APP_VERSION,
        triviaCardComing: PUBLIC_URL + '/assets/images/trivia-card-2.jpg' + process.env.REACT_APP_VERSION,
        triviaBanner: PUBLIC_URL + '/assets/images/trivia-banner.jpg' + process.env.REACT_APP_VERSION,
        triviaLogo: PUBLIC_URL + '/assets/images/trivia-logo.png' + process.env.REACT_APP_VERSION,

        puckLuckBanner: PUBLIC_URL + '/assets/images/puck-luck.jpg' + process.env.REACT_APP_VERSION,
        puckLuckLogo: PUBLIC_URL + '/assets/images/puck-luck-logo.png' + process.env.REACT_APP_VERSION,

        baseballBashBanner: PUBLIC_URL + '/assets/images/baseball-banner.jpg' + process.env.REACT_APP_VERSION,
        baseballBashLogo: PUBLIC_URL + '/assets/images/baseball-bash-logo.png' + process.env.REACT_APP_VERSION,

        hgCard: PUBLIC_URL + '/assets/images/hoops-galore-card.jpg' + process.env.REACT_APP_VERSION,
        hgCardComing: PUBLIC_URL + '/assets/images/hoops-galore-card-2.jpg' + process.env.REACT_APP_VERSION,

        miniGolfCard: PUBLIC_URL + '/assets/images/mini-golf-card.jpg' + process.env.REACT_APP_VERSION,
        miniGolfCardComing: PUBLIC_URL + '/assets/images/mini-golf-card-2.jpg' + process.env.REACT_APP_VERSION,

        eighteenPlus: PUBLIC_URL + '/assets/images/18+.svg' + process.env.REACT_APP_VERSION,
        eighteenPlusNew: PUBLIC_URL + '/assets/images/18+.png' + process.env.REACT_APP_VERSION,
        gameCare: PUBLIC_URL + '/assets/images/Gamcare.svg' + process.env.REACT_APP_VERSION,
        gameCare_UK: PUBLIC_URL + '/assets/images/Game-Care-UK-logo.png' + process.env.REACT_APP_VERSION,
        gameCare_IRELAND: PUBLIC_URL + '/assets/images/Game-Care-Ireland-logo.png' + process.env.REACT_APP_VERSION,
        checkLogo: PUBLIC_URL + '/assets/images/BGC-Logo.png' + process.env.REACT_APP_VERSION,
        BeGambleAware: PUBLIC_URL + '/assets/images/BeGambleAware-logo.png' + process.env.REACT_APP_VERSION,
        gameStopNew: PUBLIC_URL + '/assets/images/Gamstop-logo.png' + process.env.REACT_APP_VERSION,
        saferGambling: PUBLIC_URL + '/assets/images/Safer-Gambling-logo.png' + process.env.REACT_APP_VERSION,

        gameTherapy: PUBLIC_URL + '/assets/images/Gaming-Therapy.svg' + process.env.REACT_APP_VERSION,
        gameTherapyNew: PUBLIC_URL + '/assets/images/Gambling-Therapy-logo.png' + process.env.REACT_APP_VERSION,
        funBg: PUBLIC_URL + '/assets/images/when_the_fun_bg.svg' + process.env.REACT_APP_VERSION,

        mga: PUBLIC_URL + '/assets/images/mga.svg' + process.env.REACT_APP_VERSION,
        mgaNew: PUBLIC_URL + '/assets/images/mga-logo.png' + process.env.REACT_APP_VERSION,

        gameblingCommision: PUBLIC_URL + '/assets/images/gambling-commission.svg' + process.env.REACT_APP_VERSION,
        gameStop: PUBLIC_URL + '/assets/images/gamstop.svg' + process.env.REACT_APP_VERSION,
        gamblingCommission: PUBLIC_URL + '/assets/images/gambling-commission.svg' + process.env.REACT_APP_VERSION,
        gamblingCommissionNew: PUBLIC_URL + '/assets/images/Gambling-Commission-logo.png' + process.env.REACT_APP_VERSION,

        wgCardComing: PUBLIC_URL + '/assets/images/welcome-cards.jpg' + process.env.REACT_APP_VERSION,
        wgCard: PUBLIC_URL + '/assets/images/welcome-cards-2.jpg' + process.env.REACT_APP_VERSION,

        wgGlow: '/assets/images/yellow-glow.png' + process.env.REACT_APP_VERSION,
        wgIcon: '/assets/images/gift.png' + process.env.REACT_APP_VERSION,
        wgStars: '/assets/images/yellow-star.png' + process.env.REACT_APP_VERSION,

        bannerMob: PUBLIC_URL + '/assets/images/friends-benefits.jpg' + process.env.REACT_APP_VERSION,
        bannerDesk: PUBLIC_URL + '/assets/images/friends-benefits-dt.jpg' + process.env.REACT_APP_VERSION,
        riskFreePlayer: PUBLIC_URL + '/assets/images/risk-free-player.png' + process.env.REACT_APP_VERSION,
        riskFreeBanner: PUBLIC_URL + '/assets/images/risk-free-banner.jpg' + process.env.REACT_APP_VERSION,
        iconEighteen: PUBLIC_URL + '/assets/images/icon-18.svg' + process.env.REACT_APP_VERSION,
        avatarIcon: PUBLIC_URL + '/assets/images/Avatar.png' + process.env.REACT_APP_VERSION,
        
        goalMiss: PUBLIC_URL + '/assets/images/icon-miss.png' + process.env.REACT_APP_VERSION,
        goalHit: PUBLIC_URL + '/assets/images/ic_target_goal.png' + process.env.REACT_APP_VERSION,
        targetHit: PUBLIC_URL + '/assets/images/icon-target.png' + process.env.REACT_APP_VERSION,
        gaelicTargetHit: PUBLIC_URL + '/assets/images/gaelic-icon-target.png' + process.env.REACT_APP_VERSION,
        gaelicGoalAbove: PUBLIC_URL + '/assets/images/gaelic_target_above_goal.png' + process.env.REACT_APP_VERSION,
        gaelicGoal: PUBLIC_URL + '/assets/images/gaelic_target_goal.png' + process.env.REACT_APP_VERSION,
        trophyHit: PUBLIC_URL + '/assets/images/icon-trophy.png' + process.env.REACT_APP_VERSION,
        topBinHit: PUBLIC_URL + '/assets/images/icon-bin.png' + process.env.REACT_APP_VERSION,

        //trivia boost icon
        blastIcon: PUBLIC_URL + '/assets/images/ic_blast.png' + process.env.REACT_APP_VERSION,
        doubleIcon: PUBLIC_URL + '/assets/images/ic_double.png' + process.env.REACT_APP_VERSION,
        extraTimeIcon: PUBLIC_URL + '/assets/images/ic_extra_time.png' + process.env.REACT_APP_VERSION,
        doubleChanceIcon: PUBLIC_URL + '/assets/images/ic_mulligan.png' + process.env.REACT_APP_VERSION,

        homeHTSLogo: PUBLIC_URL + '/assets/images/title-hts-logo.png' + process.env.REACT_APP_VERSION,
        homeMGLogo: PUBLIC_URL + '/assets/images/title-minigolf-logo.png' + process.env.REACT_APP_VERSION,
        homeHGLogo: PUBLIC_URL + '/assets/images/item-hoops.png' + process.env.REACT_APP_VERSION,
        homeTriviaLogo: PUBLIC_URL + '/assets/images/title-trivia-logo.png' + process.env.REACT_APP_VERSION,
        fantasyImg: PUBLIC_URL + '/assets/images/fantasy.jpg' + process.env.REACT_APP_VERSION,
        fantasyMobImg: PUBLIC_URL + '/assets/images/fantasy-mob.jpg' + process.env.REACT_APP_VERSION,
        goldKitBag: PUBLIC_URL + '/assets/images/giftboxgold.png' + process.env.REACT_APP_VERSION,
        silverKitBag: PUBLIC_URL + '/assets/images/giftboxsilver.png' + process.env.REACT_APP_VERSION,
        bronzeKitBag: PUBLIC_URL + '/assets/images/giftboxbronze.png' + process.env.REACT_APP_VERSION,
        bagBase: process.env.PUBLIC_URL + '/assets/images/base.png' + process.env.REACT_APP_VERSION,
        auraRays: process.env.PUBLIC_URL + '/assets/images/Aura_rays.png' + process.env.REACT_APP_VERSION,
        starGlow: process.env.PUBLIC_URL + '/assets/images/star_glow.png'+ process.env.REACT_APP_VERSION,
        stars: process.env.PUBLIC_URL + '/assets/images/stars.png'+ process.env.REACT_APP_VERSION,
        greenGlow: process.env.PUBLIC_URL + '/assets/images/green_glow.png'+ process.env.REACT_APP_VERSION,

        shiled: process.env.PUBLIC_URL + '/assets/images/shiled.png'+ process.env.REACT_APP_VERSION,

        welcomeItemOne: '/assets/images/wel-item-1.png'+ process.env.REACT_APP_VERSION,
        welcomeItemTwo: '/assets/images/wel-item-2.png'+ process.env.REACT_APP_VERSION,
        welcomeItemThree: '/assets/images/wel-item-3.png'+ process.env.REACT_APP_VERSION,
        welcomeItemFour: '/assets/images/wel-item-4.png'+ process.env.REACT_APP_VERSION,
        welcomeItemFive: '/assets/images/wel-item-5.png'+ process.env.REACT_APP_VERSION,
        welcomeItemSix: '/assets/images/wel-item-6.png'+ process.env.REACT_APP_VERSION,
        welcomeItemSeven: '/assets/images/wel-item-7.png'+ process.env.REACT_APP_VERSION,
        welcomeItemEight: '/assets/images/wel-item-8.png'+ process.env.REACT_APP_VERSION,
        welcomeItemNine: '/assets/images/wel-item-9.png'+ process.env.REACT_APP_VERSION,
        welcomeItemTen: '/assets/images/wel-item-10.png'+ process.env.REACT_APP_VERSION,
        itemLeader: '/assets/images/item-leader.png'+ process.env.REACT_APP_VERSION,
        itemLeaderNoti: '/assets/images/item-leader-noti.png'+ process.env.REACT_APP_VERSION,
        itemWinner: '/assets/images/item-winner.png'+ process.env.REACT_APP_VERSION,
        itemMG: '/assets/images/item-mini-golf.png'+ process.env.REACT_APP_VERSION,
        itemTrivia: '/assets/images/item-trivia.png'+ process.env.REACT_APP_VERSION,
        storeItemOne: '/assets/images/unlock-item-1.png'+ process.env.REACT_APP_VERSION,
        storeItemTwo: '/assets/images/unlock-item-2.png'+ process.env.REACT_APP_VERSION,
        storeItemThree: '/assets/images/unlock-item-3.png'+ process.env.REACT_APP_VERSION,
        storeItemFour: '/assets/images/unlock-item-4.png'+ process.env.REACT_APP_VERSION,

        freeBetIcon: '/assets/images/free_bet.jpg'+ process.env.REACT_APP_VERSION,
        
        //daily reveal
        welcomeGiftDisable : '/assets/images/diseble-prize.png'+ process.env.REACT_APP_VERSION,
        welcomeGiftAuraRaysFour : '/assets/images/Aura_rays4.png'+ process.env.REACT_APP_VERSION,
        welcomeGiftAuraRaysFive : '/assets/images/Aura_rays5.png'+ process.env.REACT_APP_VERSION,
        starGlowTwo : '/assets/images/star_glow2.png'+ process.env.REACT_APP_VERSION,
        openGift : '/assets/images/open-gift.png'+ process.env.REACT_APP_VERSION,
        goldsIcons : '/assets/images/golds_new.png'+ process.env.REACT_APP_VERSION,
        giftIconTwo : '/assets/images/gift2.png'+ process.env.REACT_APP_VERSION,


        //walkthrough images
        wtMobOne : '/assets/images/wt/wt-mobile-1.svg'+ process.env.REACT_APP_VERSION,
        wtDeskOne : '/assets/images/wt/wt-desktop-1.svg'+ process.env.REACT_APP_VERSION,

        wtMobTwo : '/assets/images/wt/wt-mobile-2.svg'+ process.env.REACT_APP_VERSION,
        wtDeskTwo : '/assets/images/wt/wt-desktop-2.svg'+ process.env.REACT_APP_VERSION,

        wtMobThree : '/assets/images/wt/wt-mobile-3.svg'+ process.env.REACT_APP_VERSION,
        wtDeskThree : '/assets/images/wt/wt-desktop-3.svg'+ process.env.REACT_APP_VERSION,

        wtMobFour : '/assets/images/wt/wt-mobile-4.svg'+ process.env.REACT_APP_VERSION,
        wtDeskFour : '/assets/images/wt/wt-desktop-4.svg'+ process.env.REACT_APP_VERSION,

        wtMobFive : '/assets/images/wt/wt-mobile-5.svg'+ process.env.REACT_APP_VERSION,
        wtDeskFive : '/assets/images/wt/wt-desktop-5.svg'+ process.env.REACT_APP_VERSION,

        wtMobSix : '/assets/images/wt/wt-mobile-6.svg'+ process.env.REACT_APP_VERSION,
        wtDeskSix : '/assets/images/wt/wt-desktop-6.svg'+ process.env.REACT_APP_VERSION,

        wtMobSeven : '/assets/images/wt/wt-mobile-7.svg'+ process.env.REACT_APP_VERSION,
        wtDeskSeven : '/assets/images/wt/wt-desktop-7.svg'+ process.env.REACT_APP_VERSION,

        wtMobEight : '/assets/images/wt/wt-mobile-8.svg'+ process.env.REACT_APP_VERSION,
        wtDeskEight : '/assets/images/wt/wt-desktop-8.svg'+ process.env.REACT_APP_VERSION,

        wtMobNine : '/assets/images/wt/wt-mobile-9.svg'+ process.env.REACT_APP_VERSION,
        wtDeskNine : '/assets/images/wt/wt-desktop-9.svg'+ process.env.REACT_APP_VERSION,

        wtMobTen : '/assets/images/wt/wt-mobile-10.svg'+ process.env.REACT_APP_VERSION,
        wtDeskTen : '/assets/images/wt/wt-desktop-10.svg'+ process.env.REACT_APP_VERSION,

        //History Images for Puck Luck and Baseball Bash
        plGoalPost: PUBLIC_URL + '/assets/images/puckluck/goal_post.png' + process.env.REACT_APP_VERSION,
        plGlowingGoalPost: PUBLIC_URL + '/assets/images/puckluck/glowing-score.png' + process.env.REACT_APP_VERSION,
        plCross: PUBLIC_URL + '/assets/images/puckluck/cross.svg' + process.env.REACT_APP_VERSION,
        plTarget1: PUBLIC_URL + '/assets/images/puckluck/target-1.png' + process.env.REACT_APP_VERSION,
        plTarget2: PUBLIC_URL + '/assets/images/puckluck/target-2.png' + process.env.REACT_APP_VERSION,
        plTarget3: PUBLIC_URL + '/assets/images/puckluck/target-3.png' + process.env.REACT_APP_VERSION,
        plTarget4: PUBLIC_URL + '/assets/images/puckluck/target-4.png' + process.env.REACT_APP_VERSION,
        plTarget5: PUBLIC_URL + '/assets/images/puckluck/target-5.png' + process.env.REACT_APP_VERSION,

        bbSingle: PUBLIC_URL + '/assets/images/baseball-bash/single.png' + process.env.REACT_APP_VERSION,
        bbDouble: PUBLIC_URL + '/assets/images/baseball-bash/double.png' + process.env.REACT_APP_VERSION,
        bbTriples: PUBLIC_URL + '/assets/images/baseball-bash/triples.png' + process.env.REACT_APP_VERSION,
        bbHomeRun: PUBLIC_URL + '/assets/images/baseball-bash/home-run.png' + process.env.REACT_APP_VERSION,
        bbFouls: PUBLIC_URL + '/assets/images/baseball-bash/fouls.png' + process.env.REACT_APP_VERSION,
        bbStrikeOuts: PUBLIC_URL + '/assets/images/baseball-bash/strikeouts.png' + process.env.REACT_APP_VERSION,
        bbFlyOut: PUBLIC_URL + '/assets/images/baseball-bash/flyout.png' + process.env.REACT_APP_VERSION,

    };
}();

export default images;
