import React, { Component } from 'react';
import {connect} from "react-redux";
import images from '../../../../../assets/images';

class DailyBonus extends Component {
    render() {
        return (
            <div class="modal bonus-modal wow fadeIn" style={{display:'block'}}>
                <div class="modal-container">
                    <div class="modal-outer">
                        <div class="modal-head">
                            <h2 class="modal-head-title">Daily Bonus Rewards</h2>
                        </div>
                        <div class="modal-body">
                            <div class="modal-content modal-scroll">
                                <div class="bonus-info">
                                    <ul class="bonus-item-list">
                                        <li class="collected-item">
                                            <div class="bonus-item">
                                                <div class="item-inner">
                                                    <div class="item-title"><span>Day 1</span></div>
                                                    <div class="item-icon">
                                                        <figure><img src={images.bonusCoin} alt="" /></figure>
                                                    </div>
                                                    <div class="item-btn-block"> <span class="item-btn"><span>125</span></span> <a href="" class="collect-btn"><span>COLLECTED</span></a> </div>
                                                </div>
                                            </div>
                                        </li>
                                        <li class="collect-item">
                                            <div class="bonus-item">
                                                <div class="item-inner">
                                                    <div class="item-title"><span>Day 1</span></div>
                                                    <div class="item-icon">
                                                        <figure><img src={images.bonusCoin} alt="" /></figure>
                                                    </div>
                                                    <div class="item-btn-block"> <span class="item-btn"><span>125</span></span> <a href="" class="collect-btn"><span>COLLECT</span></a> </div>
                                                </div>
                                            </div>
                                        </li>
                                        <li>
                                            <div class="bonus-item">
                                                <div class="item-inner">
                                                    <div class="item-title"><span>Day 1</span></div>
                                                    <div class="item-icon">
                                                        <figure><img src={images.bonusCoin} alt="" /></figure>
                                                    </div>
                                                    <div class="item-btn-block"> <span class="item-btn"><span>125</span></span> <a href="" class="collect-btn"><span>COLLECT</span></a> </div>
                                                </div>
                                            </div>
                                        </li>
                                        <li>
                                            <div class="bonus-item">
                                                <div class="item-inner">
                                                    <div class="item-title"><span>Day 1</span></div>
                                                    <div class="item-icon">
                                                        <figure><img src={images.bonusCoin} alt="" /></figure>
                                                    </div>
                                                    <div class="item-btn-block"> <span class="item-btn"><span>125</span></span> <a href="" class="collect-btn"><span>COLLECT</span></a> </div>
                                                </div>
                                            </div>
                                        </li>
                                        <li>
                                            <div class="bonus-item">
                                                <div class="item-inner">
                                                    <div class="item-title"><span>Day 1</span></div>
                                                    <div class="item-icon">
                                                        <figure><img src={images.bonusCoin} alt="" /></figure>
                                                    </div>
                                                    <div class="item-btn-block"> <span class="item-btn"><span>125 + </span>
                                                        <figure class="btn-icon"><img src={images.bonusBag} alt="" /></figure>
                                                    </span> <a href="" class="collect-btn"><span>COLLECT</span></a> </div>
                                                </div>
                                            </div>
                                        </li>
                                        <li>
                                            <div class="bonus-item">
                                                <div class="item-inner">
                                                    <div class="item-title"><span>Day 1</span></div>
                                                    <div class="item-icon">
                                                        <figure><img src={images.bonusCoin} alt="" /></figure>
                                                    </div>
                                                    <div class="item-btn-block"> <span class="item-btn"><span>125</span></span> <a href="" class="collect-btn"><span>COLLECT</span></a> </div>
                                                </div>
                                            </div>
                                        </li>
                                        <li>
                                            <div class="bonus-item">
                                                <div class="item-inner">
                                                    <div class="item-title"><span>Day 1</span></div>
                                                    <div class="item-icon">
                                                        <figure><img src={images.bonusCoin} alt="" /></figure>
                                                    </div>
                                                    <div class="item-btn-block"> <span class="item-btn"><span>125</span></span> <a href="" class="collect-btn"><span>COLLECT</span></a> </div>
                                                </div>
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        //unlockingItemsPopupFlag: state[constants.NAME].unlockingItemsPopupFlag,
    }
};

const mapDispatchToProps = dispatch => {
    return {
       // toggleItemsUnlockingPopup: (flag) => dispatch(actions.toggleItemsUnlockingPopup(flag)),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(DailyBonus);