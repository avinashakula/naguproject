import React, { Component } from 'react';
import images from '../../../../../assets/images';
import ContentLoader from '../../../../../commons/components/contentLoader';
import Reward from "../../../../../commons/libs/gtg-reawards";
import Constants from '../../../../../utils/Constants';
import DateHelper from '../../../../../utils/DateHelper';
import TimeCounter from '../../../common/countDown/timeCounter';

class FlashSale extends Component {

    constructor(props) {
        super(props);

        let state = {};
        // only update progress if the data has changed
        let self = this;
        if (this.props.flashSale) {
            // console.log("did update")
            let timeDiff = DateHelper.calculateMatchDateTimeDifferenceFromCurrent(DateHelper.getDateFromStringMoment(this.props.flashSale[0].flash_sale_start_time))
            // console.log(timeDiff)
            if (timeDiff.isLive !== true) {
                state = {
                    timeDiff: DateHelper.calculateMatchDateTimeDifferenceFromCurrent(DateHelper.getDateFromStringMoment(this.props.flashSale[0].flash_sale_start_time)),
                    btnFlag: true,
                    timerText: "Starts In",
                    switchEndStart: true,
                };
            } else {
                timeDiff = DateHelper.calculateMatchDateTimeDifferenceFromCurrent(DateHelper.getDateFromStringMoment(this.props.flashSale[0].flash_sale_end_time))
                if (timeDiff.isLive !== true) {
                    let flag = true;
                    // console.log(this.props, "this.props")
                    if (this.props.userBenefits && this.props.userBenefits.gold_amount >= this.props.flashSale[0].currency_required) {
                        flag = false;
                    }

                    // console.log(flag, "flag");
                    state = {
                        timeDiff: DateHelper.calculateMatchDateTimeDifferenceFromCurrent(DateHelper.getDateFromStringMoment(this.props.flashSale[0].flash_sale_end_time)),
                        timerText: "Ends In",
                        btnFlag: flag,
                        switchEndStart: false,
                    };
                } else {
                    state = {
                        timeDiff: DateHelper.calculateMatchDateTimeDifferenceFromCurrent(DateHelper.getCurrentDateAndTime()),
                        timerText: "Sale Ended",
                        btnFlag: true,
                        switchEndStart: false,
                    };
                }
            }
        }

        this.state = state;
    }

    purchaseItem = (data) => {
        if (!this.state.btnFlag) {
            if (this.props.userBenefits && this.props.userBenefits.gold_amount >= this.props.flashSale[0].currency_required) {
                data.isFromFlashSale = true;
                this.props.addInventory(data)
            }

            // this.props.addInventory(data)
        }
    }

    componentDidMount() {

    }

    readyToPurchase = () => {
        this.setState({
            timerText: "Ends In",
            btnFlag: false,
            switchEndStart: false,
            timeDiff: DateHelper.calculateMatchDateTimeDifferenceFromCurrent(DateHelper.getDateFromStringMoment(this.props.flashSale[0].flash_sale_end_time))
        });

        if (this.reward1ref) {
            this.time = setTimeout(() => {
                if (this.time)
                    clearTimeout(this.time);
                if (this.reward1ref) {
                    this.reward1ref.rewardMe('50%', '100%')
                }
            }, 1000);
        }
    };

    componentWillUnmount() {
        if (this.time)
            clearTimeout(this.time);
    }

    endOfPurchase = () => {
        this.setState({
            //timerText: "Ends In",
            btnFlag: true,
            //switchEndStart: false,
            //timeDiff: DateHelper.calculateMatchDateTimeDifferenceFromCurrent(DateHelper.getDateFromString(this.props.flashSale[0].flash_sale_end_time))
        });
        this.props.endCurrentFlashSale(); // remove flash_sale from user_benefits
        this.props.getUserBenefits();
    };

    rewardRef1 = (ref) => {
        this.reward1ref = ref;

    };

    render() {
        const { flashSale, cdnBasePath, itemPurchaseData, userBenefits } = this.props;
        const { timerText, btnFlag, timeDiff, switchEndStart } = this.state;
        // const isUserOnLevelTwo = userBenefits && userBenefits.user_level.level_id >= Constants.itemsTabLevel;
        const isUserOnLevelTwo = true;

        return flashSale ? (
            <React.Fragment>
                <div className="title animated slideInUpLess">
                    <h2 className="card-title">Flash Sale</h2>
                </div>
                <div className="card-outer animated slideInUpLess">
                    <div className="wcard">
                        <div className="flash-sale-card">
                            <div className="sale-counter-wrap">
                                <div className="sale-counter-title">
                                    <h3>{flashSale[0].flash_sale_description}</h3>
                                </div>

                                {
                                    switchEndStart && timeDiff && <div className="sale-counter">
                                        <TimeCounter onComplete={this.readyToPurchase} timerValue={timeDiff} timerText={timerText} />
                                    </div>
                                }
                                {
                                    !switchEndStart && timeDiff && <div className="sale-counter">
                                        <TimeCounter onComplete={this.endOfPurchase} timerValue={timeDiff} timerText={timerText} />
                                    </div>
                                }

                            </div>
                            <div className="get-item-wrap">
                                <div className="c-card-outer">
                                    <div className="c-card-mid">
                                        <div className="boost-block-outer">

                                            <div className="boost-block">
                                                <figure className="get-item"><img src={cdnBasePath + "images/" + flashSale[0].item_image} alt="" /></figure>
                                            </div>

                                            {
                                                isUserOnLevelTwo ? (
                                                    itemPurchaseData.isLoading ? <ContentLoader loaderType={"mini-loader"} /> :
                                                        itemPurchaseData.isAdded
                                                            ?
                                                            <div className="get-item-msg animated slideInUpLess"><i className="icon pp-check"></i>
                                                                <p>Item has been added to your inventory!</p>
                                                            </div>
                                                            :
                                                            <React.Fragment>
                                                                <div className="get-points-card">
                                                                    <a onClick={this.purchaseItem.bind(this, flashSale[0])}
                                                                        className={`get-points animated slideInUpLess ${(btnFlag || flashSale[0].is_purchase) && "disable-rewards"}`}>
                                                                        <div className="get-total-col">
                                                                            <figure className="gold-badge"><img src={images.starBadge} alt="" /></figure>
                                                                            <span className="gold-point">{flashSale[0].currency_required}</span></div>
                                                                        <div className="get-label"><span>Get</span></div>
                                                                    </a>

                                                                    {!flashSale[0].is_purchase && <p className="max-person animated slideInUpLess">{`Max ${flashSale[0].flash_sale_limit} per person`}</p>}
                                                                    {flashSale[0].is_purchase && <p className="max-person animated slideInUpLess">{`You have already purchased this item.`}</p>}
                                                                </div>
                                                            </React.Fragment>
                                                ) : <div className="get-item-msg">
                                                    &nbsp;
                                                    <p>Flash Sale will be unlocked at Level {Constants.itemsTabLevel}!</p>
                                                </div>
                                            }


                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <Reward onRef={this.rewardRef1} config={Constants.rewardsConfig.confetti} />
                </div>
            </React.Fragment>
        ) : null;
    }
}

export default FlashSale;