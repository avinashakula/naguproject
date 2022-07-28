import React from 'react';
import {Link} from "react-router-dom";
import images from '../../../../../assets/images';
import ProjectRoutes from '../../../../../config/routes/projectRoutes';
import HelperFunctions from '../../../../../utils/HelperFunctions';
import UserPopup from '../../userPopup'

export default class welcomeGiftKitBag extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            showUserPopup: false,
            displayNameAvail: false
        }
        this.flag = false;
        // console.log("check in con");
    }

    handleOpenInventory = () => {
        this.props.showKitBagAnimations(false);
    }

    handlePlayGame = (flag) => {
        this.props.showKitBagAnimations(false);
        this.props.handleABoutBoostsBtn(flag);

        if (!this.state.displayNameAvail) {
            this.setState({
                showUserPopup: true
            })
        }
    }

    render() {

        const { kitBagRewards, kitBagAnimation, bagTypeImg, currentEventData, userBenefits } = this.props;
        const { showUserPopup, displayNameAvail } = this.state;

        if (userBenefits && userBenefits.display_name && !userBenefits.is_username_censor && !this.flag) {
            this.flag = true;
            this.setState({
                displayNameAvail: true
            })
            // console.log("called");
        }

        return (
            <React.Fragment>
                {
                    kitBagAnimation && <div className="animate-kit">
                        <div className="kit-outer">
                            <div className="kit-box">
                                <div className="kit-item kit-base"><img className="base" src={images.bagBase} alt="base" /></div>
                                <div className="kit-item kit-Aura-rays"><img className="Aura-rays" src={images.auraRays} alt="base" /></div>
                                <div className="kit-item kit-star-glow"><img className="star-glow" src={images.starGlow} alt="base" /></div>
                                <div className="kit-item kit-bag"><img className="bag" src={bagTypeImg} alt="base" /></div>
                                <div className="kit-item kit-star-glow"><img className="stars" src={images.stars} alt="base" /></div>
                                <div className="kit-item kit-pink-glow"><img className="pink-glow" src={images.greenGlow} alt="base" /></div>
                            </div>
                        </div>


                        {kitBagRewards.data && <div className={`modal-wrap congrats-modal ${kitBagRewards.data && 'open'}`}>
                            <div className="modal">
                                <div className="modal-body">
                                    <div className="congrats-info">
                                        <div className="congrats-outer">
                                            <h3>A Collection of Bronze, Silver &amp; Gold Boosts have been added to your inventory!</h3>
                                            <div className="got-items">
                                                {
                                                    kitBagRewards.data.items.map((value, index) => {
                                                        return (
                                                            <div className="col" key={index}>
                                                                <figure><img src={kitBagRewards.data.base_url + "" + value.item_image} alt="" />
                                                                    <figcaption>{"X" + value.total_item_count}</figcaption>
                                                                </figure>
                                                            </div>
                                                        )
                                                    })
                                                }
                                            </div>
                                            <div className="congrats-footer">
                                                <div className="col">
                                                    {
                                                        currentEventData && currentEventData.is_play_disabled ? <Link onClick={this.handleOpenInventory} to={{
                                                            pathname: ProjectRoutes.items.url,
                                                            search: HelperFunctions.getQueryStringFromURL()
                                                        }} className="btn gary-btn">Inventory</Link> :
                                                            <div className="col">

                                                                {
                                                                    displayNameAvail ?
                                                                        <Link onClick={this.handlePlayGame.bind(this, true)}
                                                                            to={{
                                                                                pathname: ProjectRoutes.play.hts.url,
                                                                                search: HelperFunctions.getQueryStringFromURL(),
                                                                                state: { button_click: 'play now' }
                                                                            }} className="btn green-btn">Play Now & Learn More</Link>
                                                                        :
                                                                        <a onClick={this.handlePlayGame.bind(this, true)}
                                                                            className="btn green-btn">Play Now & Learn More</a>
                                                                }
                                                            </div>
                                                    }
                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>}
                        <div className="popup-overlays"></div>
                    </div>
                }

                {
                    showUserPopup && <UserPopup clickedFromPlay={true} whichTab={"play now"} />
                }
            </React.Fragment>

        )
    }
}
