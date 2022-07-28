import { TweenMax } from "gsap";
import React, { Component } from 'react';
import images from "../../../../../assets/images";
import WalkThrough from "../../../../../commons/components/walkthrough";
import HelperFunctions from "../../../../../utils/HelperFunctions";

class CurrencyUp extends Component {

    constructor(props) {
        super(props);
        this.state = {
            startNumber: props.gold,
            rotateCoin: false
        };
    }

    componentDidUpdate(prevProps) {
        if (this.props.gold !== prevProps.gold) {
            this.numberIncreament(prevProps.gold, this.props.gold);
        }
    }

    numberIncreament(from, to) {
        var value = { val: from };
        this.setState({ rotateCoin: true });
        TweenMax.to(value, 2, {
            val: to, roundProps: "val", onUpdate: () => {
                this.setState({
                    startNumber: value.val
                });
            },
            onComplete: () => {
                this.setState({ rotateCoin: false });
            }
        });
    }

    render() {
        const { gold } = this.props;
        const { rotateCoin } = this.state;
        return (
            <React.Fragment>

                <figure className={`gold-badge${rotateCoin ? ' rotateInCoin' : ''}`}><img draggable={false} src={images.starBadge} alt="" /></figure>
                <div className="gold-top">
                    <span className="gold-point">{HelperFunctions.numberFormatter(this.state.startNumber)}</span>
                    <span className="gold-label">Gold</span>
                </div>

                <WalkThrough wtText = {"Gold is the virtual currency used in the Game Center. You can earn Gold by levelling up, finishing in a prize position on the weekly Master Leaderboard or by completing Challenges. Gold can be used to buy Boosts in the Store which can give your gameplay an edge! As a welcome gift we have given you 100 gold."} />
            </React.Fragment>
        );
    }
}

export default CurrencyUp;