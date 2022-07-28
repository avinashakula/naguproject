import React, { Component } from 'react';
import HelperFunctions from '../../../../../utils/HelperFunctions';

class LbPrizes extends Component {
    render() {
        const {leaderboardPrizesData} = this.props;
        return leaderboardPrizesData.score_prizes ? (
            <div className="position-prize-table">
                <h2 className="position-title">{`${HelperFunctions.getCurrency(leaderboardPrizesData.user_info ? leaderboardPrizesData.user_info.currency : '')}${HelperFunctions.formatNumber(leaderboardPrizesData.score_prizes.ws_total_prize)} per week in Cash!`}</h2>
                <div className="table-outer">
                    <table width="100%" border="0" cellSpacing="0" cellPadding="0">
                        <thead>
                            <tr>
                                <th>Position</th>
                                <th>Prize</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                leaderboardPrizesData.score_prizes.weekly_score_prizes.map((value, index) => {
                                    return (
                                        <tr key={index}>
                                            <td>{value.position}</td>
                                            <td>
                                                {
                                                    // value.currency_type !== "powerup"
                                                    value.currency_type !== "gold" ?
                                                        HelperFunctions.getCurrency(leaderboardPrizesData.user_info ? leaderboardPrizesData.user_info.currency : '') + value.prize
                                                        : parseInt(value.prize) + " Gold"
                                                }
                                            </td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                        <tfoot>
                            <tr>
                                <td>&nbsp;</td>
                                <td>{HelperFunctions.getCurrency(leaderboardPrizesData.user_info ? leaderboardPrizesData.user_info.currency : '') + HelperFunctions.formatNumber(leaderboardPrizesData.score_prizes.ws_total_prize)}</td>
                            </tr>
                        </tfoot>
                    </table>
                </div>
            </div>
        ) : null;
    }
}

export default LbPrizes;