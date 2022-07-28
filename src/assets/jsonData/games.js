const games = {
    "license": "Copyright 2022 Genius Tech Group. All rights reserved.",
    "statusCode": 200,
    "content": {
        "current_week_date": "Jun 01-07",
        "upcoming_week_date": "Jun 08-14",
        "third_week_date": "Jun 15-21",
        "fourth_week_date": "Jun 22-28",
        "categroies": [
            {
                "category_name": "Arcade Games",
                "category_url": "arcade-games",
                "sports": [
                    {
                        "sport_name": "Ice Hockey",
                        "sport_icon": "ice-hockey.png",
                        "games": [
                            {
                                "game_id": "hgo",
                                "game_name": "Hoops Galore Outdoor",
                                "game_url": "hoopsgalore-outdoor",
                                "status": "Y",
                                "game_description": "Hoops Galore",
                                "game_sequence": 2,
                                "game_logo": "hoops-logo.png",
                                "game_banner": "hoops-banner2.jpg"
                            },
                            {
                                "game_id": "hg",
                                "game_name": "Hoops Galore Indoor",
                                "game_url": "hoopsgalore",
                                "status": "Y",
                                "game_description": "Hoops Galore",
                                "game_sequence": 5,
                                "game_logo": "hoops-indoor-logo.png",
                                "game_banner": "hoops-banner.jpg",
                                "is_featured": true,
                                "release_time": "2020-11-09 00:01:00"
                            },
                            {
                                "game_id": "puckluck",
                                "game_name": "Puck Luck",
                                "game_url": "puckluck",
                                "status": "Y",
                                "game_description": "Puck Luck",
                                "game_sequence": 6,
                                "game_logo": "puck-luck-logo.png",
                                "game_banner": "puck-luck.jpg",
                                "is_featured": false,
                                "release_time": "2021-12-27 06:45:00"
                            }
                        ]
                    },
                    {
                        "sport_name": "Baseball",
                        "sport_icon": "baseball.png",
                        "games": [
                            {
                                "game_id": "bbbash",
                                "game_name": "Baseball Bash",
                                "game_url": "baseball-bash",
                                "status": "U",
                                "game_description": "Baseball Bash",
                                "game_sequence": 8,
                                "game_logo": "baseball-bash-logo.png",
                                "game_banner": "baseball-banner.jpg",
                                "is_featured": true,
                                "release_time": "2021-12-27 06:30:00"
                            }
                        ]
                    }
                ]
            },
            {
                "category_name": "Prediction Games",
                "category_url": "prediction-games",
                "sports": [
                    {
                        "sport_name": "Trivia",
                        "sport_icon": "trivia.png",
                        "games": [
                            {
                                "game_id": "trivia",
                                "game_name": "Trivia",
                                "game_url": "trivia",
                                "status": "Y",
                                "game_description": "Trivia",
                                "game_sequence": 2,
                                "game_logo": "trivia-logo.png",
                                "game_banner": "trivia-banner.jpg",
                                "is_featured": true
                            }
                        ]
                    },
                    {
                        "sport_name": "Basketball",
                        "sport_icon": "basketball.png",
                        "games": [
                            {
                                "game_id": "npp",
                                "game_name": "NBA Player Pick",
                                "game_url": "nba-pickem",
                                "status": "U",
                                "game_description": "NBA Player Pick",
                                "game_sequence": 5,
                                "game_logo": "nba-player-logo.png",
                                "game_banner": "nba-player.jpg",
                                "is_featured": false,
                                "release_time": "2022-07-27 00:00:00"
                            }
                        ]
                    }
                ]
            }
        ]
    }
}
export default games;