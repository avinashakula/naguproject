import React, { Component } from 'react';
import images from '../../../../../assets/images';
import TimeCounter from '../../../common/countDown/timeCounter';
import DateHelper from '../../../../../utils/DateHelper';

class WeeklyRewards extends Component {
    render() {
        let sampleTime = DateHelper.calculateMatchDateTimeDifferenceFromCurrent(DateHelper.getDateFromString("2020-09-24", "09:00:00"));
        return (
            <div className="reveal-block animated slideInUpLess">
                <div className="reveal-card">
                    <div className="reveal-left">
                        <div className="reveal-gift">
                            <figure className="gift-figure"><img src={images.wgIcon} alt="" /></figure>
                        </div>
                    </div>
                    <div className="reveal-counter-bar">
                        <div className="reveal-count-outer">
                            <h3 className="reveal-title">Weekly Prize Reveal Reward</h3>
                            <TimeCounter timerValue={sampleTime}/>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default WeeklyRewards;