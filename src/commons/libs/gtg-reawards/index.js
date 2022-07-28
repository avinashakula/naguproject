import React, {Component} from 'react'
import coin from './Coin/index'
import confetti from './Confetti/index'
import emoji from './Emoji/index'
import './index.css';

export default class Reward extends Component {

    constructor(props) {
        super(props);
        this.state = {
            top: 0,
            left: 0,
            styleC: {}
        }
    }

    componentDidMount() {
        this.props.onRef(this);
    }

    rewardMe = (left, top, styleC) => {

        this.setState({top, left, styleC});

        const {config} = this.props
        const props = [this.container, config]
        switch (config.type) {
            case 'confetti': {
                confetti(...props)
                break
            }
            case 'emoji': {
                emoji(...props)
                break
            }
            case 'coin': {
                coin(...props)
                break
            }
            default: {
                break
            }
        }
    }

    render() {
        const {top, left, styleC} = this.state;
        const {children} = this.props
        return (
            <span className={'sp'} style={{top, left, ...styleC}}>
                    <div ref={(ref) => {
                        this.container = ref
                    }}/>
                {children}
                </span>
        )
    }
}