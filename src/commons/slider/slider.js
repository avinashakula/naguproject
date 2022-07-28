import React, {Component} from 'react';
import PropTypes from 'prop-types';
import './slider.css';
import Popover from './popover-follow'
import Slider from './slider-core'
import {isUndefined,isFunction} from 'lodash';

export default class Slid extends Component {

    constructor(props) {
        super(props);
        this.state = {
            rtPosition: undefined,
            handleWidth: undefined
        };
    }

    static propTypes = {
        value: PropTypes.number,
        min: PropTypes.number,
        max: PropTypes.number,
        ticks: PropTypes.bool,
        onChange: PropTypes.func,
        onDragStart: PropTypes.func,
        onDragEnd: PropTypes.func,
        triggerOnChangeWhileDragging: PropTypes.bool,
        markerLabel: PropTypes.array,
        displayFollowerPopover: PropTypes.bool
    };

    componentDidUpdate() {
        if (isUndefined(this.state.handleWidth) && this.refs.slider.refs.handle) {
            this.setState({handleWidth: this.refs.slider.refs.handle.offsetWidth}) // eslint-disable-line
        }
    }

    handleSliderChange = (value, rtPosition) =>{
        if (isFunction(this.props.onChange)) {
            // Send the value and position of the slider in case the container needs it.
            this.props.onChange(value, rtPosition)
        }
        this.setState({rtPosition})
    }

    render() {
        var trackWidth = this.refs.slider && this.refs.slider.state.trackWidth
        var handleWidth = this.state.handleWidth
        var dragging = this.refs.slider && this.refs.slider.state.dragging
        var follower = (this.props.displayFollowerPopover && !isUndefined(this.state.rtPosition))
            ? (<Popover trackWidth={trackWidth} handleWidth={handleWidth} value={this.props.value} position={this.state.rtPosition}/>)
            : (<span/>);


        return (
            <div className={`slider-container-component ${dragging?'dragging':''}`}>
                <Slider
                    ref='slider'
                    min={this.props.min}
                    max={this.props.max}
                    value={this.props.value}
                    onChange={this.handleSliderChange}
                    onDragStart={this.props.onDragStart}
                    onDragEnd={this.props.onDragEnd}
                    triggerOnChangeWhileDragging={this.props.triggerOnChangeWhileDragging}
                    ticks={this.props.ticks}
                    markerLabel={this.props.markerLabel}
                />
                {follower}
            </div>
        )
    }
}

