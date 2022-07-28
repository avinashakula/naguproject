import React, { Component } from 'react';
import images from "../../../../../assets/images";
import ContentLoader from '../../../../../commons/components/contentLoader';
import MessageContainer from '../../../../../commons/components/contentMessage';
import WalkThrough from '../../../../../commons/components/walkthrough';
import Constants from '../../../../../utils/Constants';
import HelperFunctions from '../../../../../utils/HelperFunctions';

class Store extends Component {

    handlePopup = (boost) => {
        this.props.handleBoostPopup(boost);
    }

    render() {
        const { handleBoostPopup, storeData, userBenefits, activeWT } = this.props;
        let cnt = 0;
        // console.log(storeData, "store");
        return (
            <div className="tab-content" style={{ display: 'block' }}>
                <div className="store-widget animated slideInUpLess">
                    {
                        storeData ?
                            storeData && storeData.games ? storeData.games.map((game, index) => {
                                return (
                                    <div className="card-info rewards-card" key={index}>
                                        <div className="card-outer">
                                            <div className="title">
                                                <h2 className="card-title">{game.game.game_name + " Rewards"}</h2>
                                            </div>
                                            <div className="card-inner">
                                                {
                                                    game.items.length > 0 && game.items.map((item, itemIndex) => {
                                                        return item.item_locked && (
                                                            <div className="rewards-list" key={itemIndex}>
                                                                <h3 className="card-sm-title">{item.item_name + " - " + item.item_description}</h3>
                                                                <div className="rewards-info">
                                                                    <div className="rewards-block">

                                                                        {
                                                                            item.items.map((singleItem, singleItemIndex) => {
                                                                                cnt++;
                                                                                // console.log(singleItem, "singleItemIndex");
                                                                                // walkthrought-item ${(activeWT && activeWT.includes(Constants.sz_shop_wt) && cnt === 1) && "wt-show"}
                                                                                return singleItem.status === 'y' && (
                                                                                    <a key={singleItemIndex} onClick={this.handlePopup.bind(this, singleItem)} className={`rewards-col `}>
                                                                                        <div className="rewards-bx">

                                                                                            <div className="item-info">
                                                                                                <i className="pp pp-info info-icon"></i>
                                                                                                <div className="info-tooltip">
                                                                                                    <div className="tooltip-inner">
                                                                                                        <div className="tooltip-box"> <span className="tooltip-content">{singleItem.description}</span> </div>
                                                                                                    </div>
                                                                                                </div>
                                                                                            </div>

                                                                                            <div className="rewards-port">
                                                                                                <div className="rewards-port-outer">
                                                                                                    <figure className="rewards-figure"><img src={HelperFunctions.generateLocalImgPath(singleItem.item_image)} alt="" />
                                                                                                    </figure>
                                                                                                </div>
                                                                                            </div>
                                                                                            <div className="rewards-ft">
                                                                                                <div className={`rewards-btn`}> <span className="price-bx">
                                                                                                    <figure className="gold-badge"><img src={images.starBadge} alt="" /></figure>
                                                                                                    <span className="price">{singleItem.currency_required}</span></span></div>
                                                                                            </div>
                                                                                        </div>

                                                                                        {/* <WalkThrough wtText = {"Use your Gold in the Store to acquire Boosts that give your gameplay an edge to reach new high scores."} /> */}
                                                                                    </a>
                                                                                )
                                                                            })
                                                                        }
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        )
                                                    })
                                                }
                                            </div>
                                        </div>
                                    </div>
                                )
                            }) : <MessageContainer animclass={'animated slideInUpLess'} msg={"Coming Soon"} />

                            : <ContentLoader loaderType={"content-relative"} />

                    }
                </div>
            </div>
        );
    }
}

export default Store;