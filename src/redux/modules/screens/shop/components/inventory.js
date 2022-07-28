import React, { Component } from 'react';
import ContentLoader from '../../../../../commons/components/contentLoader';
import MessageContainer from '../../../../../commons/components/contentMessage';

class Inventory extends Component {

    // handleOpenKitbags = () => {
    //     if (this.props.selectedItem && this.props.selectedItem.ids) {
    //         let refIds = this.props.selectedItem.ids.slice(0, this.state.value);
    //        this.props.getKitbagsRewards(refIds, "gold");
    //     }
    // }

    handleInventory = (item) => {
        this.props.handleInventoryPopup(item);
    }

    render() {
        const { inventoryData } = this.props;
        return (
            <div className="tab-content" style={{ display: 'block' }}>
                {/*  */}
                {
                    inventoryData ? (inventoryData === 404 ? <MessageContainer animclass={'animated slideInUpLess'} msg={"Items/Boosts that you acquire from the Store will show here"} /> : <div className="inventory-widget animated slideInUpLess">

                        {/* Kitbag data rewards */}
                        {
                            inventoryData.kitbagData && <div className="card-info rewards-card">
                                <div className="card-outer">
                                    <div className="title">
                                        <h2 className="card-title">Game Center Rewards</h2>
                                    </div>
                                    <div className="card-inner">
                                        <div className="rewards-info">
                                            <div className="rewards-block">
                                                {
                                                    inventoryData.kitbagData.map((kitbag, kitbagIndex) => {
                                                        //console.log(kitbag, "kitbag")
                                                        return (
                                                            kitbag.kitbags.map((kit, kitIndex) => {
                                                                return (
                                                                    <a onClick={this.handleInventory.bind(this, kit)} className="rewards-col" key={kitIndex}>
                                                                        <div className="rewards-bx">
                                                                            {/* <div className="reward-point"><span>X1</span></div> */}
                                                                            <div className="rewards-port">
                                                                                <div className="rewards-port-outer">
                                                                                    <figure className="rewards-figure">
                                                                                        <img src={inventoryData.base_url + "images/" + kit.item_icon} alt="" />
                                                                                    </figure>
                                                                                </div>
                                                                            </div>
                                                                            <div className="item-title">
                                                                                <h3 className="item-title-label">{kit.item_description}</h3>
                                                                            </div>
                                                                        </div>
                                                                    </a>
                                                                )
                                                            })
                                                        )
                                                    })
                                                }
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        }

                        {
                            inventoryData.games && inventoryData.games.map((game, gameIndex) => {
                                return (
                                    <div className="card-info rewards-card" key={gameIndex}>
                                        <div className="card-outer">
                                            <div className="title">
                                                <h2 className="card-title">{game.game.game_name + " Rewards"}</h2>
                                            </div>
                                            <div className="card-inner">

                                                {
                                                    game.category_info && game.category_info.map((category, catIndex) => {
                                                        return (
                                                            <div className="rewards-list" key={catIndex}>
                                                                <h3 className="card-sm-title">{category.item_title + " - " + category.item_description}</h3>
                                                                <div className="rewards-info">
                                                                    <div className="rewards-block">

                                                                        {
                                                                            category.inventories && category.inventories.map((inventory, inventoryIndex) => {
                                                                                return (
                                                                                    <div className="rewards-col" key={inventoryIndex}>
                                                                                        <div className="rewards-bx">
                                                                                            {/* <div className="reward-point"><span>{"X" + inventory.qty}</span></div> */}
                                                                                            <div className="rewards-port">
                                                                                                <div className="rewards-port-outer">
                                                                                                    <figure className="rewards-figure">
                                                                                                        <img src={game.base_url + "images/" + inventory.image} alt="" />
                                                                                                        <div className="reward-point count-noti"><span>{inventory.qty}</span></div>
                                                                                                    </figure>
                                                                                                </div>
                                                                                            </div>
                                                                                            <div className="item-title">
                                                                                                <h3 className="item-title-label">{inventory.description}</h3>
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
                                                    })
                                                }
                                            </div>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>)
                        : <ContentLoader loaderType={"content-relative"} />
                }
            </div>
        );
    }
}

export default Inventory;