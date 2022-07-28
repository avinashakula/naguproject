import React, {Component} from 'react';
import images from '../../../../../assets/images';

class congratulations extends Component {
    render() {
        return (
            <div class="modal bonus-congrats-modal" style={{display: "block"}}>
                <div class="modal-container">
                    <div class="bouns-kit">
                        <div class="bouns-kit-outer">
                            <div class="bouns-kit-box">
                                <div class="bouns-kit-item bouns-kit-Aura-rays"><img class="bouns-Aura-rays" src={images.auraRays} alt="base"/></div>
                                <div class="bouns-kit-item bouns-kit-star-glow"><img class="bouns-star-glow" src={images.starGlow} alt="base"/></div>
                                <div class="bouns-kit-item bouns-kit-star-glow"><img class="bouns-stars" src={images.stars} alt="base"/></div>
                            </div>
                        </div>
                        <div class="bonus-selected">
                            <div class="bonus-info cl">
                                <h2 class="modal-head-title">congratulations</h2>

                                <div class="bonus-item">
                                    <div class="item-inner">
                                        <div class="item-title"><span>Day 1</span></div>
                                        <div class="item-icon">
                                            <figure><img src={images.bonusCoin} alt=""/></figure>
                                        </div>
                                        <div class="item-btn-block"><span class="item-btn"><span>25</span></span> <a href="" class="collect-btn"><span>COLLECTED</span></a></div>
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

export default congratulations;