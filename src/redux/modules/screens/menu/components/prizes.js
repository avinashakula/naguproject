import React, { Component } from 'react';
import ContentLoader from "../../../../../commons/components/contentLoader";
import HelperFunctions from "../../../../../utils/HelperFunctions";
import LbPrizes from './lbPrizes';

class Prizes extends Component {

    render() {
        const { closePopup, leaderboardPrizesData } = this.props;
        //console.log(leaderboardPrizesData);
        return (
            <div className="modal-widget-wrap terms-modal-wrap" style={{ display: "block" }}>

                {/* Prizes MODAL START */}
                <div className="modal prizes-modal slide-modal">
                    <div className="modal-contenier">
                        <div className="modal-outer">
                            <div className="modal-head slide-modal-head  animated slideInUpLess">
                                <h2 className="modal-head-title"><a onClick={closePopup} className="icon pp-arrow-left2 modal-close"></a><span className="head-title-label">Prizes</span></h2>
                            </div>
                            <div className="modal-body  animated slideInUpLess">
                                <div className="popup-info prizes-modal-info">
                                    <div className="block scroll-modal-content">
                                        {leaderboardPrizesData && leaderboardPrizesData.score_prizes && leaderboardPrizesData.score_prizes.weekly_score_prizes ?
                                            <LbPrizes leaderboardPrizesData={leaderboardPrizesData} />
                                            : <ContentLoader loaderType={'content-relative'} />
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
                {/* Prizes MODAL END */}

            </div>
        );
    }
}

export default Prizes;