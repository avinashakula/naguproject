const Constants = function () {
    return {
        itemsTabLevel: 2,
        factCardLevel: 3,
        challengesHappyHourLevel: 4,
        trainingTabLevel: 2,
        rewardsConfig: {
            confetti: {
                type: 'confetti',
                fakingRequest: false,
                angle: 90,
                decay: 0.91,
                spread: 50,
                startVelocity: 40,
                elementCount: 60,
                elementSize: 12,
                lifetime: 100,
                zIndex: 9999999,
                springAnimation: true
            },
            welcome: {
                type: 'coin',
                fakingRequest: false,
                angle: 90,
                decay: 0.91,
                spread: 50,
                startVelocity: 60,
                elementCount: 20,
                elementSize: 20,
                lifetime: 100,
                zIndex: 10,
                springAnimation: true
            },
        },
        freeBetText: "cash",
        REFER_A_FRIEND_URL:"https://promos.paddypower.com/promotion?promoCode=CACQFWBSPORTS",
        EIGHTEEN_PLUS_URL: "https://helpcenter.paddypower.com/app/answers/detail/p/6/a_id/70/",
        GAME_CARE_URL: "https://www.gamcare.org.uk/?wrapperExtUrl=true",
        GAME_CARE_URL_UK: "https://www.gamcare.org.uk/get-support/talk-to-us-now/",
        GAME_CARE_URL_IRELAND: "https://www.gamcare.org.uk/",
        GAMBLING_THERAPY_URL: "https://www.gamblingtherapy.org/",
        WHEN_THE_FUN_URL: "http://www.whenthefunstops.co.uk/",
        AUTHORISATION_MGA_URL: "https://www.authorisation.mga.org.mt/verification.aspx?lang=en&company=4f2ce9bc-6584-440c-8643-9314defffd0e",
        // SECURE_GAMBLING_COMMISION_URL: "https://secure.gamblingcommission.gov.uk/PublicRegister/Search/Detail/39439",
        SECURE_GAMBLING_COMMISION_URL: "https://www.gamblingcommission.gov.uk/home.aspx",
        GAM_STOP_URL: "https://www.gamstop.co.uk/",
        MGA_URL: "https://www.mga.org.mt/",
        GAMBLING_URL_SECOND:"https://secure.gamblingcommission.gov.uk/gccustomweb/PublicRegister/PRSearch.aspx?ExternalAccountId=39439",
        RESPONSIBLE_GAMING:"https://responsiblegaming.paddypower.com",
        GAME_CARE_URL_SECOND:"http://www.gamcare.org.uk/",
        GAMBLING_THERAPY_REFER_URL:"https://www.gamblingtherapy.org/?ReferrerID=103",
        PP_COOKIE_POLICY_URL:"https://www.paddypower.com/aboutUs/Cookie.Policy/",
        RISK_FREE_URL:"https://promos.paddypower.com/promotion?promoCode=CACQRF10YSKA00P",
        FANTASY_URL:"https://fantasy.paddypower.com",
        PP_URL:"https://www.paddypower.com",
        GAMBLING_NEW_URL:"https://registers.gamblingcommission.gov.uk/39439",
        SAFER_GAMBLING_URL:"https://www.safergamblingstandard.org.uk/accredited-businesses",
        BLUE_LOGO_WITH_CHECK_URL:"https://playerprotection.paddypower.com",
        BEGAMBLE_URL:"https://www.begambleaware.org/",
        LOGACCESS_CODE: "bally",

        //walkthrough code
        sz_gold_wt : "sz_gold_wt",
        sz_xp_wt : "sz_xp_wt",
        sz_game_card_wt : "sz_game_card_wt",
        sz_leaderboard_wt : "sz_leaderboard_wt",
        sz_shop_wt : "sz_shop_wt",
        sz_challenges_wt : "sz_challenges_wt",
    };
}();

export default Constants;