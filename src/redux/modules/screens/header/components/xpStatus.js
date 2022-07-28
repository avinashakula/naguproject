import React, {Component} from 'react';
import images from '../../../../../assets/images';
import HelperFunctions from '../../../../../utils/HelperFunctions';

class XpStatus extends Component {
    render() {
        const {handlePopup, userBenefits} = this.props;
        return (

            <div className="modal level-modal skillzone-popup-visible" style={{display: 'block'}}>
                <div className="modal-contenier animated fadeIn fast">
                    <div className="modal-outer">
                        <div className="modal-head">
                            <h2 className="modal-head-title">Current Status</h2>
                            <span className="user-id">{userBenefits.display_name}</span>
                        </div>
                        <div className="modal-body">
                            <div className="popup-info level-info">
                                <div className="xp-content">
                                    <div className="xp-status">
                                        <div className="avtar-img">
                                            <figure><img src={images.avatarIcon} alt=""/></figure>
                                        </div>
                                        <div className="xp-details-wrap">
                                            <div className="xp-scores">
                                                <div className="current-xp">
                                                    <h2>Current XP </h2>
                                                    <span>{userBenefits.user_xp_points}</span>
                                                </div>
                                                <div className="xp-level">
                                                    <h2>XP required for next level</h2>
                                                    <span>{HelperFunctions.getRequiredXPForNextLevel(userBenefits.upcoming_level.xp_points, userBenefits.user_xp_points)}</span>
                                                </div>
                                            </div>
                                            <div className="xp-progress">
                                                <div className="player-rating">
                                                    <div className="plyr-rank trigger">
                                                        <a>
                                                            <figure>
                                                                <figcaption>{userBenefits.user_level.level_id}</figcaption>
                                                                <img src={images.badge} alt=""/>
                                                            </figure>
                                                        </a>
                                                    </div>
                                                    <div className="plyr-progress">
                                                        <div className="top-left-progress" style={{width: HelperFunctions.calculateLevelBarWidth(userBenefits) + "%"}}></div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <a onClick={handlePopup} className="close-btn animated bounceIn delay-04s"><i className="icon pp-cross"></i></a></div>
                    <div onClick={handlePopup} className="modal-overlay"></div>
                </div>
            </div>
        );
    }
}

export default XpStatus;