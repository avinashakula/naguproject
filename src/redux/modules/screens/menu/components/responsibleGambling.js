import React, {Component} from 'react';
import images from '../../../../../assets/images';

class ResponsibleGambling extends Component {
    render() {
        const {closePopup} = this.props;
        return (
            <div className="modal-widget-wrap gambling-modal-wrap" style={{display: 'block'}}>
                {/* Responsible Gambling MODAL START */}
                <div className="modal gambling-modal slide-modal">
                    <div className="modal-contenier">
                        <div className="modal-outer">
                            <div className="modal-head slide-modal-head animated slideInUpLess">
                                <h2 className="modal-head-title">
                                    <a onClick={closePopup} className="icon pp-arrow-left2 modal-close"></a>
                                    <span className="head-title-label">Safer Gambling</span></h2>
                            </div>
                            <div className="modal-body animated slideInUpLess">
                                <div className="popup-info gambling-modal-info">
                                    <div className="block scroll-modal-content">
                                        <div className="gambling-info">
                                            <div className="gambiling-block">
                                                <div className="gambiling-icon">
                                                    <a className="gambiling-figure">
                                                        <img src={images.iconEighteen} alt=""/>
                                                    </a>
                                                </div>
                                                <div className="gambiling-title">
                                                    <a className="gambiling-label">Gambling can be addictive, use our online tools for a safer way to play</a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* Responsible Gambling MODAL END */}
            </div>
        );
    }
}

export default ResponsibleGambling;