import React, {Component} from 'react';
import Slider from './slider'

export default class Index extends Component {

    constructor(props) {
        super(props);
        this.state = {
            sliderValues: {
                value: 1,
                min: 1,
                max: 10,
                markers: [{value: 1, label: "1"}, {value: 2, label: "2"}, {value: 3, label: "3"}, {value: 4, label: "4"}, {value: 5, label: "5"}, {value: 6, label: "6"}, {value: 7, label: "7"}, {
                    value: 8,
                    label: "8"
                }, {value: 9, label: "9"}, {value: 10, label: "10"}]
            }
        };
    }

    updateSliderValue = (value, position) => {
        const fakeSt = JSON.parse(JSON.stringify(this.state.sliderValues));
        fakeSt.value = value;
        this.setState({sliderValues: fakeSt});
        // fakeStore.value = value
    };

    render() {
        const {sliderValues} = this.state;
        return (
            <Slider
                displayFollowerPopover={false}
                min={sliderValues.min}
                max={sliderValues.max}
                value={sliderValues.value}
                onChange={this.updateSliderValue}
                ticks={true}
                triggerOnChangeWhileDragging={true}
                markerLabel={sliderValues.markers}/>
        )
    }
}
