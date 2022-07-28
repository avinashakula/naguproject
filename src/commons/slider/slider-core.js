import React, {Component} from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import {isUndefined, isFunction, throttle} from 'lodash';
import Draggable from 'react-draggable'; // The default
import './slider.css';

export default class Slider extends Component {

    constructor(props) {
        super(props);
        this.state = {
            position: undefined,
            value: this.props.value,
            dragging: false
        };

        this.emojiArr = ["emoji-0.svg", "emoji-1.svg", "emoji-2.svg", "emoji-3.svg", "emoji-4.svg", "emoji-5.svg", "emoji-6.svg", "emoji-7.svg", "emoji-8.svg", "emoji-9.svg", "emoji-10.svg"]
    }

    static propTypes = {
        value: PropTypes.number,
        min: PropTypes.number,
        max: PropTypes.number,
        ticks: PropTypes.bool,
        triggerOnChangeWhileDragging: PropTypes.bool,
        onChange: PropTypes.func,
        onDragStart: PropTypes.func,
        onDragEnd: PropTypes.func,
        markerLabel: PropTypes.array
    };

    static defaultProps = {
        value: 0,
        min: 0,
        max: 10,
        ticks: false,
        triggerOnChangeWhileDragging: true
    };

    componentWillReceiveProps(nextProps, nextState) {
        var newValue

        // keep state up to date with passed in props
        if (this.state.value !== nextProps.value) {
            newValue = this.getBoundValue(nextProps, nextProps.value)
            this.setState({value: newValue})
            this.setHandlePosition(nextProps, newValue)
        }

        // if min or max changes, have to reposition the handle
        if (this.props.min !== nextProps.min || this.props.max !== nextProps.max) {
            newValue = this.getBoundValue(nextProps, newValue || this.state.value)
            this.setState({value: newValue})
            this.setHandlePosition(nextProps, newValue)
        }
    }

    shouldComponentUpdate(nextProps, nextState) {
        // Don't alter the component while dragging is occurring
        if (nextProps.value !== this.props.value) {
            return true;
        }
        return (!nextState.dragging)
    }

    componentDidMount() {
        this.updateTrackWidth()
        this.updateTrackWidth = throttle(this.updateTrackWidth, 100, {leading: false})
        window.addEventListener('resize', this.updateTrackWidth)
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.updateTrackWidth)
    }

    getBoundValue = (props, value) => {
        var newValue = value
        if (newValue < props.min) {
            newValue = props.min
        } else if (newValue > props.max) {
            newValue = props.max
        }
        return newValue
    }

    updateTrackWidth = () => {
        let self = this;
        setTimeout(function () {
            var track = ReactDOM.findDOMNode(self.track);
            if (!track) {
                return
            }
            var trackWidth = track.offsetWidth;
            self.setState({trackWidth}, self.setHandlePosition)
        }, 500)

    }

    componentDidUpdate() {
        // after a render, ensure that draggable is in correct position
        if (this.refs.drag) {
            this.refs.drag.setState({x: this.state.position})
        }
    }

    setHandlePosition = (props = this.props, value = this.state.value) => {
        var position = this.state.trackWidth / (props.max - props.min) * (value - props.min)
        this.setState({position})
    }

    updateValueFromPosition = (newPosition) => {
        var currentPosition = newPosition
        var value, position
        if (this.props.max === this.props.min) {
            value = this.props.min
            position = this.state.trackWidth / 2
        } else {
            // find the two closest ticks to the current position
            var currentPercent = currentPosition / this.state.trackWidth * 100
            var percentStep = 100 / (this.props.max - this.props.min)
            var closestSmallerValue = Math.floor(currentPercent / percentStep)
            var closestLargerValue = closestSmallerValue + 1
            var bestMatchPercent, bestMatchTick

            // determine which of the two values is closest
            if (currentPercent - (closestSmallerValue * percentStep) <= (closestLargerValue * percentStep) - currentPercent) {
                bestMatchTick = closestSmallerValue
                bestMatchPercent = bestMatchTick * percentStep
            } else {
                bestMatchTick = closestLargerValue
                bestMatchPercent = bestMatchTick * percentStep
            }

            // update the value and position
            value = this.props.min + bestMatchTick
            position = this.state.trackWidth * (bestMatchPercent / 100)
        }

        // Although set state is async, pushing its invocation as late as possible
        this.setState({value, position})

        return {
            value,
            position
        }
    }

    cumulativeOffset = (element) => {
        // determine the  offset of the element by crawling up the DOM, borrowed from Prototype.js
        var top = 0
        var left = 0
        do {
            top += element.offsetTop || 0
            left += element.offsetLeft || 0
            element = element.offsetParent
        } while (element)

        return {
            top: top,
            left: left
        }
    }

    triggerOnChange = (pos) => {
        const {value, position} = this.updateValueFromPosition(pos)
        if (isFunction(this.props.onChange)) {
            this.props.onChange(value, position)
        }
    }

    /* clickOnTrack = (event) => {
         var clickFromLeft = event.clientX - this.cumulativeOffset(event.target).left
         this.triggerOnChange(clickFromLeft)
     }*/
    clickOnTrack = (event) => {
        event.persist();
        var rect = event.target.getBoundingClientRect();
        var x = event.clientX - rect.left; //x position within the element.
        this.triggerOnChange(x);
        //this.refs.handle.setAttribute('data-content', '😋');
    };

    handleUp = (event, ui) => {
        event.stopPropagation();
        const pos = ui.x || 0
        const {position} = this.updateValueFromPosition(pos)
        // Do we have a drag end hook ?
        if (isFunction(this.props.onDragEnd)) {
            this.props.onDragEnd(position)
        }
        this.setState({dragging: false})
        this.triggerOnChange(position)
    }

    handleDown = (event, ui) => {
        // Do we have a drag start hook ?
        if (isFunction(this.props.onDragStart)) {
            this.props.onDragStart(this.state.position)
        }
        this.setState({dragging: true})
    }

    dragging = (event, ui) => {
        var pos = ui.x || 0
        // Do we want to trigger change handlers while dragging ?
        if (this.props.triggerOnChangeWhileDragging) {
            this.triggerOnChange(pos)
        }
        event.preventDefault()
    };

    renderTicks = () => {
        if (!this.props.ticks) return (<span/>)
        var elements = []
        var min = this.props.min
        var max = this.props.max
        var percentStep = 100 / (max - min)
        // Don't render ticks if it is too high. Will crash the browser and the ticks become useless
        if ((max - min) < 200) {
            for (var i = min + 1; i < max; i++) {
                var style = {
                    left: (percentStep * (i - min)) + '%'
                }
                elements.push(<span key={'tick' + i} className='slider__tick' style={style}/>)
            }
        }
        return (
            <div key='ticks' className='slider__ticks' onClick={this.clickOnTrack}>{elements}</div>
        )
    }

    renderMarkers = () => {
        if (!this.props.markerLabel) return (<span/>)
        var elements = []
        var {min, max, markerLabel: markers} = this.props
        var percentStep = 100 / (max - min)
        for (var i in markers) {
            var style = {
                left: (percentStep * (markers[i].value - min)) + '%'
            }
            if (markers[i].value <= max && markers[i].value >= min) {
                if (this.props.ticks && (max - min < 200)) {
                    // don't render a tick for this marker if ticks are already being rendered
                    elements.push(<div key={'marker' + i} className='slider__marker marker' style={style}><p className='marker__label'>{markers[i].label}</p></div>)
                } else {
                    elements.push(<div key={'marker' + i} className='slider__marker marker' style={style}><p className='marker__label'>{markers[i].label}</p><span key={'marker' + markers[i].value}
                                                                                                                                                                   className='slider__tick slider__tick--marker'/></div>)
                }
            }
        }
        return (
            <div key='markers' className='slider__markers' onClick={this.clickOnTrack}>{elements}</div>
        )
    }

    render() {

        var draggableProps, draggable;
        let emojiVal = this.props.value === 0 ? 0 : this.props.value;

        let emoji = this.emojiArr[emojiVal];
        if (!isUndefined(this.state.position)) {
            draggableProps = {
                axis: 'x',
                handle: '.slider__handle',
                bounds: {left: 0, right: this.state.trackWidth},
                start: {x: this.state.position, y: 0},
                onStop: this.handleUp,
                onStart: this.handleDown,
                onDrag: this.dragging,
                enableUserSelectHack: true
            };
            draggable = (
                <Draggable ref="drag" key='draggable' {...draggableProps}>
                    <span ref='handle' className='slider__handle'>
                         <img src={"assets/images/" + emoji} draggable={'false'}/>
                    </span>

                </Draggable>
            )
        }

        return (
            <div ref='slider' className='slider'>

                {draggable}
                <div ref={(ref) => this.track = ref} className='slider__track' onClick={this.clickOnTrack}>
                    {this.renderTicks()}
                    {this.renderMarkers()}
                </div>
            </div>
        )
    }
}
