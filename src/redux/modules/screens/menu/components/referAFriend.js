import React, {Component} from 'react';
import FriendWithBenefits from '../../../../../commons/components/banners/friendWithBenefits';

class ReferAFriend extends Component {
    render() {
        const {closePopup, handleTracking} = this.props;
        return (
            <div className="modal-widget-wrap my-refer-friend-wrap" style={{display: "block"}}>
                <div className="modal refer-friend-modal slide-modal">
                    <div className="modal-contenier">
                        <div className="modal-outer">
                            <div className="modal-head slide-modal-head animated slideInUpLess">
                                <h2 className="modal-head-title"><a onClick={closePopup} className="icon pp-arrow-left2 modal-close"></a><span className="head-title-label">Refer a Friend</span></h2>
                            </div>
                            <div className="modal-body animated slideInUpLess">
                                <div className="popup-info refer-friend-modal-info">
                                    <div className="block scroll-modal-content">
                                        <div className="refer-friend">
                                            {/* <FriendWithBenefits handleTracking={handleTracking}/> */}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default ReferAFriend;