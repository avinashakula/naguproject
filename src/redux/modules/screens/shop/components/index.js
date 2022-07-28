import React from 'react';
import ContentLoader from '../../../../../commons/components/contentLoader';
import PPHeadCard from "../../../../../commons/components/ppHeadCard";
import Reward from '../../../../../commons/libs/gtg-reawards';
import Constants from '../../../../../utils/Constants';
import HelperFunctions from '../../../../../utils/HelperFunctions';
import StartUpPopups from '../../../common/startupScreens';
import BoostPopup from './boostPopup';
import Inventory from './inventory';
import InventoryPopup from './inventoryPopup';
import KitBag from './kitbag';
import Store from './store';

export default class Shop extends React.Component {

    constructor(props) {
        super(props);
        const locationProps = this.props.location;
        let defaultTab = locationProps.state && locationProps.state.defaultShow ? locationProps.state.defaultShow : "store";

        this.state = {
            activeTab: defaultTab
        }
    }

    handleBoostPopup = (item) => {
        this.props.toggleBoostPopup(item);
    }

    handleInventoryPopup = (item) => {
        this.props.toggleInventoryPopup(item);
    }

    handleTabs = (tab) => {
        this.setState({
            activeTab: tab
        })

        this.props.callItemAPI(tab);
    }

    rewardRef2 = (ref) => {
        this.reward2 = ref;
        if (ref) {
            const time = setTimeout(() => {
                clearTimeout(time)
                if (this.reward2) {
                    this.reward2.rewardMe(window.innerWidth / 2, window.innerHeight * 0.8)
                }
            }, 1000);
        }
    }

    render() {
        const { activeTab } = this.state;
        const { inventoryData, claimWC, activeWT, storeData, getKitbagsRewards, userBenefits, userNotification, selectedInventory, toggleInventoryPopup, selectedItem, addInventory, itemPurchaseData, kitBagRewards, kitBagAnimation, bagTypeImg } = this.props;
        // if (activeWT && (activeWT.includes(Constants.sz_shop_wt))) {
        //     HelperFunctions.toggleWTBodyClass(true);
        // } else {
        //     HelperFunctions.toggleWTBodyClass(false);
        // }


        return (
            <React.Fragment>
                <div className="mid-wrapper">
                    <PPHeadCard title={'STORE'} />
                    <div className="container">
                        <div className="block shop-widget">

                            <div className="shop-widget-wrap content-tabs animated fadeIn delay-04s">
                                <div className="tabs-wrap">
                                    <div className="tabs-outer">
                                        <ul className="tabs-nav">
                                            <li onClick={this.handleTabs.bind(this, "store")}><a className={` ${activeTab === "store" && "active"}`}><span className="tab-label"><span>Store</span></span></a></li>
                                            <li onClick={this.handleTabs.bind(this, "inventory")}><a className={` ${activeTab === "inventory" && "active"}`}><span className="tab-label"><span>My Inventory{userNotification && userNotification.store && userNotification.store.store_count && <label className="noti-label animated bounceIn delay-1s">{userNotification.store.store_count}</label>}</span></span></a></li>
                                        </ul>
                                    </div>
                                </div>

                                <div className="tabs-content-wrap">
                                    {activeTab === "store" && <Store
                                        storeData={storeData}
                                        activeWT={activeWT}
                                        userBenefits={userBenefits}
                                        handleBoostPopup={this.handleBoostPopup} />}

                                    {activeTab === "inventory" && <Inventory
                                        inventoryData={inventoryData}
                                        handleInventoryPopup={this.handleInventoryPopup}
                                    />}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* {
                        claimWC.isSubmitting && <ContentLoader loaderType={"transparent_loader"}/>
                    }

                    {
                        claimWC.isAdded && <div className="msg-card">
                            <div className="msg-card-outer">
                                <p>A welcome Gold bonus has been automatically added to your total!</p>
                            </div>
                        </div>
                    } */}
                </div>
                {
                    selectedItem && <BoostPopup
                        item={selectedItem}
                        addInventory={addInventory}
                        userBenefits={userBenefits}
                        itemPurchaseData={itemPurchaseData}
                        handleBoostPopup={this.handleBoostPopup}
                    />
                }

                {
                    selectedInventory && <InventoryPopup
                        item={selectedInventory}
                        data={kitBagRewards}
                        getKitbagsRewards={getKitbagsRewards}
                        handleInventoryPopup={this.handleInventoryPopup}
                    />
                }

                {<KitBag
                    data={kitBagRewards.data}
                    kitBagAnimation={kitBagAnimation}
                    bagTypeImg={bagTypeImg}
                    showKitBagAnimations={this.props.showKitBagAnimations}
                />}

                <StartUpPopups />

                {/* {
                    claimWC.isAdded && <Reward onRef={this.rewardRef2} config={Constants.rewardsConfig.welcome} />
                } */}
            </React.Fragment>
        )
    }
}
