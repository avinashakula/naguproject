import React, {Component} from 'react';
import images from '../../../../../assets/images';
import Reward from "../../../../../commons/libs/gtg-reawards";
import Constants from "../../../../../utils/Constants";

class WgInfo extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
        }
    }

    handleWelcomeGift = () => {
        if (!this.state.isLoading) {
            this.props.openWelcomeGift();
        }
        this.setState({isLoading: true});
    }

    rewardRef2 = (ref) => {
        this.reward2 = ref
        if (ref) {
            const time = setTimeout(() => {
                clearTimeout(time)
                if (this.reward2) {
                    this.reward2.rewardMe(window.innerWidth / 2, window.innerHeight * 0.6)
                }
            }, 1000);
        }
    }

    render() {
        const {wgInfoPopupFlag, currentEventData} = this.props;
        const {isLoading} = this.state;
        return (
            <div className="modal center-modal wel-gift-modal" style={{display: wgInfoPopupFlag ? 'block' : 'none'}}>
                <div className="modal-container">
                    <div className="modal-outer">
                        <div className="inner-title">
                            <h1>Welcome Gift</h1>
                        </div>
                        <div className="modal-body">
                            <div className="gift-wrap">
                                <div className="gift-item">
                                    <figure className="gift-figure"><img src={images.bonusBag} alt=""/></figure>
                                </div>
                                <div className="gift-info">
                                    <p>As you level up through Hit The Spot you will get the chance to open Kit Bags. Kit Bags give you items that you can use to improve your score in the game.</p>
                                </div>
                                <div className="button-bar picks-button-bar">
                                    <div className="button-bar-outer">
                                        <div className="col">
                                            <a onClick={this.handleWelcomeGift} className="btn green-btn">
                                                {isLoading ? (
                                                    <div className="spinner-holder">
                                                        <div className="small-loader"></div>
                                                    </div>
                                                ) : "Open My Welcome Gift"}
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <Reward onRef={this.rewardRef2} config={Constants.rewardsConfig.confettiSmall}/>
            </div>
        );
    }
}

export default WgInfo;