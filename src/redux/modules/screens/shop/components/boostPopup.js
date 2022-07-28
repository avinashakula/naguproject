import React, {Component} from 'react';
import images from '../../../../../assets/images';
import ContentLoader from '../../../../../commons/components/contentLoader';
import HelperFunctions from '../../../../../utils/HelperFunctions';

class BoostPopup extends Component {

    closePopup = () => {
        this.props.handleBoostPopup(null);
    }

    purchaseItem = (data) => {
        // if(this.props.userBenefits && this.props.userBenefits.gold_amount >= this.props.item.currency_required) {
        //     this.props.addInventory(data)
        // }

        this.props.addInventory(data)
    }

    render() {
        const {item, userBenefits, itemPurchaseData} = this.props;
        return (
            <div className="modal items-modal" style={{display: "block"}}>
                <div className="modal-contenier animated fadeIn fast skillzone-popup-visible">
                    <div className="modal-outer">
                        <div className="modal-head">
                            <h2 className="modal-head-title">{item.item_type + " " + item.item_display_name}</h2>
                        </div>
                        <div className="modal-body">
                            <div className="popup-info items-info">
                                <div className="boost-box">
                                    <div className="rewards-bx">
                                        <div className="boost-item">
                                            <div className="rewards-port">
                                                <div className="rewards-port-outer">
                                                    <figure className="rewards-figure"><img src={HelperFunctions.generateLocalImgPath(item.item_image)} alt=""/></figure>
                                                </div>
                                            </div>
                                            <div className="item-title">
                                                <h3 className="item-title-label">{item.description}</h3>
                                            </div>
                                        </div>
                                        <div className="rewards-ft">
                                            {
                                                itemPurchaseData.isLoading ? <ContentLoader loaderType={"section-loader"}/> :
                                                    itemPurchaseData.isAdded
                                                        ?
                                                        <div className="get-item-msg"><i className="icon pp-check"></i>
                                                            <p>Item has been added to your inventory!</p>
                                                        </div>
                                                        :

                                                        <div className="get-points-card">
                                                            <a onClick={this.purchaseItem.bind(this, item)}
                                                               className={`get-points ${userBenefits && userBenefits.gold_amount < item.currency_required && "disable-rewards"}`}>
                                                                <div className="get-total-col ">
                                                                    <figure className="gold-badge"><img src={images.starBadge} alt=""/></figure>
                                                                    <span className="gold-point">{item.currency_required}</span></div>
                                                                <div className="get-label"><span>Get</span></div>
                                                            </a>
                                                        </div>
                                            }
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <a onClick={this.closePopup} className="close-btn animated bounceIn delay-04s"><i className="icon pp-cross"></i></a></div>
                    <div onClick={this.closePopup} className="modal-overlay"></div>
                </div>
            </div>
        );
    }
}

export default BoostPopup;