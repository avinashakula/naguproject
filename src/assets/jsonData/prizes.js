const prizes = {
    "license": "Copyright 2020 Genius Tech Group. All rights reserved.",
    "statusCode": 200,
    "content": {
        "user_info": {
            "account_id": "111102",
            "initials": "",
            "override_ip_ban": false,
            "currency": "EUR",
            "country_code": "GB",
            "first_name": "test102",
            "balance": 39.55,
            "jurisdiction": "",
            "product_token": "wdsVm6jxG6pHSEDLlpWMaZxYg3SekJO1hmtKFLG4SUHdU6eumReNh1GocLP9FVNS",
            "ssoid": "wdsVm6jxG6pHSEDLlpWMaZxYg3SekJO1hmtKFLG4SUHdU6eumReNh1GocLP9FVNS",
            "user_type": "free",
            "is_suspended": false
        },
        "base_url": "https://pphtsdev2.geniusgames.com.au/assets/",
        "welcome_bonus": 100,
        // "active_day": 2,
        "loyality_bonus": 300,
        "loyality_text": "Because you have played Game Center for more than 10 days we have credited your account with 300 gold!",
        // "score_prizes": {
        //     "ws_total_prize": 10000,
        //     "weekly_score_prizes": [
        //         {
        //             "game_lb_type": "ppsz_score",
        //             "type_idx": "2020-W46_1",
        //             "currency_type": "freebet",
        //             "last_updated": "2020-10-27 10:45:08",
        //             "ordinal": 1,
        //             "position": "1st",
        //             "prize": "200",
        //             "item_info": {
        //                 "game_id": "ppsz",
        //                 "item_name": "freebet",
        //                 "item_display_name": "Free Bets",
        //                 "item_type": "Free Bet",
        //                 "item_image": "freebet.png",
        //                 "status": "n",
        //                 "sequence": 0,
        //                 "currency_required": 0,
        //                 "description": "Free Bets"
        //             }
        //         },
        //         {
        //             "game_lb_type": "ppsz_score",
        //             "type_idx": "2020-W46_2",
        //             "currency_type": "freebet",
        //             "last_updated": "2020-10-27 10:45:08",
        //             "ordinal": 2,
        //             "position": "2nd",
        //             "prize": "125",
        //             "item_info": {
        //                 "game_id": "ppsz",
        //                 "item_name": "freebet",
        //                 "item_display_name": "Free Bets",
        //                 "item_type": "Free Bet",
        //                 "item_image": "freebet.png",
        //                 "status": "n",
        //                 "sequence": 0,
        //                 "currency_required": 0,
        //                 "description": "Free Bets"
        //             }
        //         },
        //         {
        //             "game_lb_type": "ppsz_score",
        //             "type_idx": "2020-W46_3",
        //             "currency_type": "freebet",
        //             "last_updated": "2020-10-27 10:45:08",
        //             "ordinal": 3,
        //             "position": "3rd-5th",
        //             "prize": "75",
        //             "item_info": {
        //                 "game_id": "ppsz",
        //                 "item_name": "freebet",
        //                 "item_display_name": "Free Bets",
        //                 "item_type": "Free Bet",
        //                 "item_image": "freebet.png",
        //                 "status": "n",
        //                 "sequence": 0,
        //                 "currency_required": 0,
        //                 "description": "Free Bets"
        //             }
        //         },
        //         {
        //             "game_lb_type": "ppsz_score",
        //             "type_idx": "2020-W46_4",
        //             "currency_type": "freebet",
        //             "last_updated": "2020-10-27 10:45:08",
        //             "ordinal": 4,
        //             "position": "6th-10th",
        //             "prize": "50",
        //             "item_info": {
        //                 "game_id": "ppsz",
        //                 "item_name": "freebet",
        //                 "item_display_name": "Free Bets",
        //                 "item_type": "Free Bet",
        //                 "item_image": "freebet.png",
        //                 "status": "n",
        //                 "sequence": 0,
        //                 "currency_required": 0,
        //                 "description": "Free Bets"
        //             }
        //         },
        //         {
        //             "game_lb_type": "ppsz_score",
        //             "type_idx": "2020-W46_5",
        //             "currency_type": "freebet",
        //             "last_updated": "2020-10-27 10:45:08",
        //             "ordinal": 5,
        //             "position": "11th-20th",
        //             "prize": "20",
        //             "item_info": {
        //                 "game_id": "ppsz",
        //                 "item_name": "freebet",
        //                 "item_display_name": "Free Bets",
        //                 "item_type": "Free Bet",
        //                 "item_image": "freebet.png",
        //                 "status": "n",
        //                 "sequence": 0,
        //                 "currency_required": 0,
        //                 "description": "Free Bets"
        //             }
        //         },
        //         {
        //             "game_lb_type": "ppsz_score",
        //             "type_idx": "2020-W46_6",
        //             "currency_type": "freebet",
        //             "last_updated": "2020-10-27 10:45:08",
        //             "ordinal": 6,
        //             "position": "21st-75th",
        //             "prize": "10",
        //             "item_info": {
        //                 "game_id": "ppsz",
        //                 "item_name": "freebet",
        //                 "item_display_name": "Free Bets",
        //                 "item_type": "Free Bet",
        //                 "item_image": "freebet.png",
        //                 "status": "n",
        //                 "sequence": 0,
        //                 "currency_required": 0,
        //                 "description": "Free Bets"
        //             }
        //         },
        //         {
        //             "game_lb_type": "ppsz_score",
        //             "type_idx": "2020-W46_7",
        //             "currency_type": "freebet",
        //             "last_updated": "2020-10-27 10:45:08",
        //             "ordinal": 7,
        //             "position": "76th-150th",
        //             "prize": "4",
        //             "item_info": {
        //                 "game_id": "ppsz",
        //                 "item_name": "freebet",
        //                 "item_display_name": "Free Bets",
        //                 "item_type": "Free Bet",
        //                 "item_image": "freebet.png",
        //                 "status": "n",
        //                 "sequence": 0,
        //                 "currency_required": 0,
        //                 "description": "Free Bets"
        //             }
        //         },
        //         {
        //             "game_lb_type": "ppsz_score",
        //             "type_idx": "2020-W46_8",
        //             "currency_type": "freebet",
        //             "last_updated": "2020-10-27 10:45:08",
        //             "ordinal": 8,
        //             "position": "151st-450th",
        //             "prize": "2",
        //             "item_info": {
        //                 "game_id": "ppsz",
        //                 "item_name": "freebet",
        //                 "item_display_name": "Free Bets",
        //                 "item_type": "Free Bet",
        //                 "item_image": "freebet.png",
        //                 "status": "n",
        //                 "sequence": 0,
        //                 "currency_required": 0,
        //                 "description": "Free Bets"
        //             }
        //         },
        //         {
        //             "game_lb_type": "ppsz_score",
        //             "type_idx": "2020-W46_9",
        //             "currency_type": "freebet",
        //             "last_updated": "2020-10-27 10:45:08",
        //             "ordinal": 9,
        //             "position": "451st-8000th",
        //             "prize": "1",
        //             "item_info": {
        //                 "game_id": "ppsz",
        //                 "item_name": "freebet",
        //                 "item_display_name": "Free Bets",
        //                 "item_type": "Free Bet",
        //                 "item_image": "freebet.png",
        //                 "status": "n",
        //                 "sequence": 0,
        //                 "currency_required": 0,
        //                 "description": "Free Bets"
        //             }
        //         },
        //         {
        //             "game_lb_type": "ppsz_score",
        //             "type_idx": "2020-W46_10",
        //             "currency_type": "powerup",
        //             "last_updated": "2020-10-27 10:45:08",
        //             "ordinal": 10,
        //             "position": "8001st-20000th",
        //             "prize": "1",
        //             "item_info": {
        //                 "game_id": "ppsz",
        //                 "item_name": "powerup",
        //                 "item_display_name": "Power Up",
        //                 "item_type": "Power Up",
        //                 "item_image": "powerup.png",
        //                 "status": "n",
        //                 "sequence": 0,
        //                 "currency_required": 0,
        //                 "description": "Power Up"
        //             }
        //         }
        //     ]
        // },
        "reveal_rewards": {
            "start_date": "2020-11-11 12:00:00",
            "end_date": "2020-11-12 11:59:59"
        }
    }
}

export default prizes;