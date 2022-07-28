import React, { Component } from 'react';
import GameDetailCard from './gameDetailCard';

class GameCard extends Component {



    render() {
        const { activeGame, isActive, tracking } = this.props;
        let heading = null;
        // console.log(activeGame);
        if (activeGame) {
            heading = isActive ? activeGame.sport_name : activeGame.sport_name === "Basketball" ? "Hoops Galore Indoor" : activeGame.sport_name;
        }

         //console.log(activeGame, "activeGame")
        return (
            // activeGame.play_upcoming_games && activeGame.play_upcoming_games.length === 1 && "no-more-game"
            <div className={`card-info game-list-info animated slideInUpLess ${""}`}>
                <div className="title">
                {
                    activeGame.play_upcoming_games &&
                    <h2 className="card-title sport-title"><span>{heading}</span></h2>
                }
                </div>
                <div className="card-outer">
                    <ul className="game-listing">
                        {
                            isActive && activeGame.play_upcoming_games && activeGame.play_upcoming_games.map((game, gameIndex) => {
                                return (
                                    <GameDetailCard
                                        game={game}
                                        tracking={tracking}
                                        key={gameIndex} />
                                )
                            })
                        }
                    </ul>
                </div>
            </div>
        );
    }
}

export default GameCard;