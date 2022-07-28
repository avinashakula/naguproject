import React from 'react';
import OwlCarousel from 'react-owl-carousel2';
import images from "../../../../../assets/images";

export default class KitBag extends React.Component {

    constructor(props) {
        super(props);
        this.options = {
            touchDrag: true,
            mouseDrag: true,
            dots: false,
            autoHeight: false,
            autoWidth: true,
            margin: 0,
            nav: true,
            responsive: {
                0: {
                    items: 1
                },
                640: {
                    items: 2
                },
                767: {
                    items: 2
                },
                1200: {
                    items: 3
                },
                1600: {
                    items: 4
                },
            },
            navText: [
                '<span aria-label="' + 'prev' + '"><i class="icon pp-arrow-left"></i></span>',
                '<span aria-label="' + 'next' + '"><i class="icon pp-arrow-right"></i></span>'
            ],
        };

        this.events = {
            onChanged: (event) => {
                // let self = this;
                // // setTimeout(function () {
                // let element = document.getElementsByClassName("owl-next");
                // if (element[0] && !self.isClickedOnClaimNow) {
                //     console.log(event.item.count, event.item.index);
                //     if (event.item.count === (event.item.index + 1)) {
                //         // console.log("in side", element[0].innerHTML);
                //         element[0].classList.remove("disabled");
                //         element[0].innerHTML = "Claim Now";
                //         // console.log("in side", element[0].innerHTML);
                //         element[0].addEventListener("click", self.claimRewards);
                //     } else {
                //         element[0].innerHTML = "Next";
                //         element[0].removeEventListener("click", self.claimRewards);
                //     }
                // }
                // }, 100)
            },
            onInitialized: (event) => {

            }
        };
    }

    gotoInventory = () => {
        this.props.showKitBagAnimations(false, null);
    }

    render() {
        const { data, kitBagAnimation, bagTypeImg } = this.props;
        // if (data && data.items) {
        //     this.options.items = data.items.length;
        // }

        return kitBagAnimation && (
            <div className="animate-kit">
                <div className="kit-outer">
                    <div className="kit-box">
                        <div className="kit-item kit-base"><img className="base" src={images.bagBase} alt="base" /></div>
                        <div className="kit-item kit-Aura-rays"><img className="Aura-rays" src={images.auraRays} alt="base" /></div>
                        <div className="kit-item kit-star-glow"><img className="star-glow" src={images.starGlow} alt="base" /></div>
                        <div className="kit-item kit-bag"><img className={`bag ${data && data.items && data.items.length > 0 && "animate-pause"}`} src={bagTypeImg} alt="base" /></div>
                        <div className="kit-item kit-star-glow"><img className="stars" src={images.stars} alt="base" /></div>
                        <div className="kit-item kit-pink-glow"><img className="pink-glow" src={images.greenGlow} alt="base" /></div>
                    </div>
                </div>

                {
                    data && <div className="modal congrats-modal animated fadeIn faster" style={{ display: 'block' }}>
                        <div className="modal-contenier animated bounceIn">
                            <div className="modal-outer">
                                <div className="modal-body">
                                    <div className="popup-info congrats-info">
                                        <div className="boost-box">
                                            <div className="rewards-bx">
                                                <div className="boost-item">
                                                    <div className="choice-item-title"><span>You have won boosts</span></div>
                                                    <div className="choice-item-bar">

                                                        <OwlCarousel className={"choice-item-outer boosts-carousel"} ref="car" options={this.options} events={this.events}>

                                                            {
                                                                data.items.map((items, index) => {
                                                                    return (
                                                                        items.txn_items.map((singleItem, itemIndex) => {
                                                                            // console.log(singleItem, "singleItem");
                                                                            return (
                                                                                <div className="col" key={itemIndex}>
                                                                                    <div className="choice-item">
                                                                                        <div className="choice-item-figure">
                                                                                            <figure><img src={data.base_url + "images/" + singleItem.item_image} alt="" />
                                                                                                <figcaption className="figure-label">{"X" + singleItem.qty}</figcaption>
                                                                                            </figure>
                                                                                        </div>
                                                                                        <div className="choice-item-detail">
                                                                                            <div className="choice-item-logo">
                                                                                                <figure><img src={data.base_url + "images/" + singleItem.mini_game_logo} alt="" /></figure>
                                                                                            </div>
                                                                                        </div>
                                                                                        <div className="item-info">
                                                                                            <i className="icon pp-info info-icon"></i>
                                                                                            <div className="info-tooltip">
                                                                                                <div className="tooltip-inner">
                                                                                                    <div className="tooltip-box">
                                                                                                        <span className="tooltip-content">{singleItem.description}</span>
                                                                                                    </div>
                                                                                                </div>
                                                                                            </div>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                            )
                                                                        })
                                                                    )
                                                                })
                                                            }
                                                        </OwlCarousel>

                                                    </div>
                                                    <div className="inventory-btn"><a onClick={this.gotoInventory} className="btn primary-btn">Inventory</a></div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                }
                <div className="popup-overlays"></div>
            </div>
        )
    }
}
