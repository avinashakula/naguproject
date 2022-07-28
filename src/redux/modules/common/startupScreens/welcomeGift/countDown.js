import React, {Component} from 'react';

class CountDown extends Component {
    render() {
        const {timer} = this.props;
        return (
            <div className="countdown-box">
                <div className="count-down-info">
                    <h2>AVAILABLE IN</h2>
                </div>
                <div className="countdown">
                    <div className="col"><strong>{timer.hourToShow}</strong> <span>HRS</span></div>
                    <div className="col"><strong>{timer.minuteToShow}</strong> <span>Mins</span></div>
                    <div className="col"><strong>{timer.secondToShow}</strong> <span>Secs</span></div>
                </div>
            </div>
        );
    }
}

export default CountDown;