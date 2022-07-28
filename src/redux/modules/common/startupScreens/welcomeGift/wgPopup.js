import React, {Component} from 'react';
import images from '../../../../../assets/images';
import CountDown from './countDown';

class WgPopup extends Component {

    togglePopup = () => {
        this.props.toggleWGpopup();
    }

    render() {
        const {welcomeGiftTimer, wgPopupFlag} = this.props;
        return (
            <div className="modal center-modal gift-modal" style={{display: wgPopupFlag ? 'block' : 'none'}}>
                <div className="modal-container">

                    <div className="modal-outer">
                        <div className="inner-title">
                            <h2 className="title-label">Welcome Gift</h2>
                        </div>
                        <div className="modal-body">
                            <div className="gift-modal-wrap">
                                <div className="gift">
                                    <div className="gift-outer">
                                        <figure className="gift-effects">
                                            <img className="back-effects" src={images.wgGlow} alt=""/>
                                            <img className="front-effects" src={images.wgStars} alt=""/>
                                        </figure>
                                        <figure className="gift-pick"><img src={images.wgIcon} alt=""/></figure>
                                    </div>
                                </div>
                                <div className="gift-content">
                                    <div className="gift-detail">
                                        <p>Come back soon to discover what your Welcome Gift is! We hope you enjoy Hit The Spot and the wider Game Center.</p>
                                    </div>

                                    <div className="gift-counter">
                                        {welcomeGiftTimer && <CountDown timer={welcomeGiftTimer.timeToShow}/>}
                                        <div className="gift-button" style={{display: 'none'}}>
                                            <a className="btn green-btn">Get Gift</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div onClick={this.togglePopup} className="popup-close btn-close animated bounceIn fast delay-1s">
                                <a><img src={images.closeButton}/></a>
                            </div>
                        </div>
                    </div>
                    <div onClick={this.togglePopup} className="popup-overlays"></div>
                </div>

            </div>
        );
    }
}

export default WgPopup;