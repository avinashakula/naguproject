import React from 'react';
import DateHelper from '../../../../utils/DateHelper';
import HelperFunctions from '../../../../utils/HelperFunctions';
// import HelperFunction from "../../../../../utils/HelperFunctions";

class TimeCounter extends React.Component {

    constructor(props) {
        super(props);
        // this.state = {
        //     timerValue: this.props.timerValue
        // }

        this.state = {
            timerValue: DateHelper.calculateMatchDateTimeDifferenceFromCurrent(DateHelper.getDateFromStringMoment(this.props.timerValue.date))
        }
    }
    componentDidMount() {
        if (!this.state.timerValue.isLive) {
            this.timer = setInterval(() => {
                let timerValueCopy = DateHelper.calculateMatchDateTimeDifferenceFromCurrent(DateHelper.getDateFromStringMoment(this.props.timerValue.date));
                if (timerValueCopy.isLive) {
                    if (this.timer) {
                        clearInterval(this.timer);
                    }
                    this.props.onComplete();
                } else {
                    this.setState({
                        timerValue: timerValueCopy
                    })
                }
            }, 1000)
        } else {
            this.props.onComplete();
        }
    }

    componentWillUnmount() {
        if (this.timer) {
            clearInterval(this.timer);
        }
    }

    render() {

        const timeToShow = HelperFunctions.returnTime(this.state.timerValue);
        const { timerText, isSimpleCounter } = this.props;
        return (
            <div className="countdown-box">
                {timerText && <span className="cunter-title">{timerText}</span>}
                {isSimpleCounter && <h3 className="counter-title">{isSimpleCounter}</h3>}
                <div className="countdown">
                    {
                        timeToShow.dayToShow !== '00' &&
                        <div className="col">
                            <strong>{(Number.isNaN(timeToShow.dayToShow)) ? "00" : timeToShow.dayToShow}</strong>
                            {/* <span>{isSimpleCounter ? "d" : "Days"}</span> */}
                            <span>d</span>
                        </div>
                    }
                    {
                        <div className="col">
                            <strong>{(Number.isNaN(timeToShow.hourToShow)) ? "00" : timeToShow.hourToShow}</strong>
                            {/* <span>{isSimpleCounter ? "h" : "Hrs"}</span> */}
                            <span>{"h"}</span>
                        </div>
                    }
                    {
                        <div className="col">
                            <strong>{(Number.isNaN(timeToShow.minuteToShow)) ? "00" : timeToShow.minuteToShow}</strong>
                            {/* <span>{isSimpleCounter ? "m" : "Mins"}</span> */}
                            <span>{"m"}</span>
                        </div>
                    }
                    {
                        <div className="col">
                            <strong>{(Number.isNaN(timeToShow.secondToShow)) ? "00" : timeToShow.secondToShow}</strong>
                            {/* <span>{isSimpleCounter ? "s" : "Secs"}</span> */}
                            <span>{"s"}</span>
                        </div>
                    }
                </div>
            </div>
        )

    }
}

export default TimeCounter;
