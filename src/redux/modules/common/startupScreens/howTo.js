import React from 'react';
import {connect} from "react-redux";
import images from "../../../../assets/images";
import ContentLoader from "../../../../commons/components/contentLoader";
import ContentScroll from "../../../../commons/components/contentScroll/contentScroll";
import HelperFunctions from "../../../../utils/HelperFunctions";
import * as actions from "../actions";
import * as constants from "../constants";

class HowTo extends React.Component {

    constructor(props) {
        super(props);
        this.contentScrollRef = null;

        this.lastIndex = 0;
    }

    handleRef = (ref) => {
        if (ref) {
            this.contentScrollRef = ref;
        }
    }

    handleDivRef = (ref) => {
        if (ref && this.contentScrollRef && this.contentScrollRef.scrollBarRef) {
            this.contentScrollRef.scrollBarRef._container.scrollTop = this.lastIndex * 47;
        }
    }
    handleInnerAccordianIndex = (index) => {
        if (this.contentScrollRef && this.contentScrollRef.scrollBarRef) {
            this.contentScrollRef.scrollBarRef._container.scrollTop = this.lastIndex * 47 + index * 47;
        }
    }

    handleAccrodion = (index, event) => {
        this.lastIndex = index;
        this.props.handleHowToPopup(true, null, index);
    };

    handleClosePopup = () => {
        this.props.handleHowToPopup(false);
    }

    render() {
        const {howTo} = this.props;
        //console.log(howTo);
        return howTo.isShow && (
            <React.Fragment>
                <div className={'modal-wrapper how-to-modal open animated fadeIn fast'}>
                    <div className="modal">
                        <div className="head">
                            <h2>FAQ</h2>
                            <a className="btn-close trigger animated bounceIn fast delay-1s" onClick={this.handleClosePopup}>
                                <figure><img src={images.closeButton} alt=""/></figure>
                            </a>
                        </div>

                        <ContentScroll additionalClass={"content"} onRef={this.handleRef}>
                            {
                                howTo.data.howto ? howTo.data.howto.map((value, index) => {
                                    let htmlToShow = null;
                                    if (value.faqid !== 1000) {
                                        htmlToShow = value.answer.replace(/£/g, HelperFunctions.getCurrency(howTo.data.user_info ? howTo.data.user_info.currency : ''));
                                    }

                                    return (
                                        <div className="set" key={index}>
                                            <a onClick={this.handleAccrodion.bind(this, index)}
                                               className={`${howTo.activeIndexArr.includes(index) ? "active" : ""}`}> {value.question}
                                                <i className="fa fa-plus"></i>
                                                <i className="fa fa-minus"></i>
                                            </a>
                                            {
                                                value.faqid === 1000 ? <GetHTSFAQ data={value} activeIndexArr={howTo.activeIndexArr}
                                                                                  handleInnerAccordianIndex={this.handleInnerAccordianIndex} user_info={howTo.data.user_info}/> : htmlToShow &&
                                                    howTo.activeIndexArr.includes(index) && <div ref={this.handleDivRef} className={`contents animated fadeIn fast`}
                                                                                                 style={{display: "block"}}
                                                                                                 dangerouslySetInnerHTML={{__html: htmlToShow}}>
                                                    </div>
                                            }

                                        </div>
                                    )
                                }) : <ContentLoader loaderType={"content-loader"}/>
                            }
                        </ContentScroll>
                    </div>
                    <div className="popup-overlay" onClick={this.handleClosePopup} style={{pointerEvents: 'auto'}}></div>
                </div>

            </React.Fragment>
        )
    }
}

class GetHTSFAQ extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            selectedIndex: null
        }
    }

    handleInnerAccordian = (index) => {
        this.setState((prevState, props) => ({
            selectedIndex: prevState.selectedIndex === index ? null : index
        }));
        this.props.handleInnerAccordianIndex(index);
    };

    render() {
        const {data, activeIndexArr, user_info} = this.props;
        return (

            data.answer.map((value, index) => {
                const htmlToShow = value.answer.replace(/pounds/g, HelperFunctions.getCurrencyName(user_info ? user_info.currency : ''));
                return (
                    <div className="set sub-sets" key={index} style={{display: activeIndexArr.includes(0) ? "block" : "none"}}>
                        <a className={`${this.state.selectedIndex === index ? "active" : ""}`} onClick={this.handleInnerAccordian.bind(this, index)}>
                            {value.question}
                            <i className="fa fa-plus"></i>
                            <i className="fa fa-minus"></i>
                        </a>
                        <div className={`contents animated ${this.state.selectedIndex === index ? "fadeIn" : "fadeOut"} fast`}
                             dangerouslySetInnerHTML={{__html: htmlToShow}}
                             style={{display: this.state.selectedIndex === index ? "block" : "none"}}>
                        </div>
                    </div>
                )
            })

        )
    }
}

const mapStateToProps = state => {
    return {
        howTo: state[constants.NAME].howTo,
    }
};

const mapDispatchToProps = dispatch => {
    return {
        handleHowToPopup: (isShow, current_page_url, indexToShow) => dispatch(actions.handleHowToPopup(isShow, current_page_url, indexToShow)),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(HowTo);