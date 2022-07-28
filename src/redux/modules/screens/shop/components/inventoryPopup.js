import React, { Component } from 'react';
import HelperFunctions from '../../../../../utils/HelperFunctions';
import images from '../../../../../assets/images';
import ContentLoader from '../../../../../commons/components/contentLoader';

class InventoryPopup extends Component {

    closePopup = () => {
        this.props.handleInventoryPopup(null);
    }

    handleOpenKitbags = () => {
        if (this.props.item && this.props.item.reference_id) {
            this.props.getKitbagsRewards(this.props.item.reference_id, this.props.item.item_type);
        }
    }

    render() {
        const { item, data } = this.props;
        // console.log(data, "data")
        return (
            <div className="modal items-modal inventory-item skillzone-popup-visible" style={{ display: "block" }}>
                <div className="modal-contenier animated fadeIn fast">
                    <div className="modal-outer">
                        <div className="modal-head">
                            <h2 className="modal-head-title">{item.item_display_name}</h2>
                        </div>
                        <div className="modal-body">
                            <div className="popup-info items-info">
                                <div className="boost-box">
                                    <div className="rewards-bx">
                                        <div className="boost-item">
                                            <div className="rewards-port">
                                                <div className="rewards-port-outer">
                                                    <figure className="rewards-figure"><img src={HelperFunctions.generateLocalImgPath(item.item_icon)} alt="" /></figure>
                                                </div>
                                            </div>
                                            <div className="item-title">
                                                <h3 className="item-title-label">{item.item_description}</h3>
                                            </div>
                                        </div>
                                        <div className="rewards-ft">
                                            {/* <div className="get-points-card">
                                                <a className={`get-points`}>
                                                    <div className="get-label"><span>Open</span></div>
                                                </a>

                                            </div> */}

                                            {
                                                data && data.isLoading ? <ContentLoader loaderType={"section-loader"} /> : <div className="get-points-card">
                                                    <div className="ft-btn-bar">
                                                        <a onClick={this.handleOpenKitbags} className="btn primary-btn">Open</a>
                                                    </div>
                                                </div>
                                            }


                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <a onClick={this.closePopup} className="close-btn animated bounceIn delay-04s"><i className="icon pp-cross"></i></a> </div>
                    <div onClick={this.closePopup} className="modal-overlay"></div>
                </div>
            </div>
        );
    }
}

export default InventoryPopup;