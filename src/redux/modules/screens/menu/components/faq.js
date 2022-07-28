import $ from 'jquery';
import React, { PureComponent } from 'react';
import ContentLoader from "../../../../../commons/components/contentLoader";
import ContentScroll from "../../../../../commons/components/contentScroll/contentScroll";
import HelperFunctions from "../../../../../utils/HelperFunctions";

class FAQ extends PureComponent {

    openAccordion(index) {
        // console.log(index);
        let clickedFaq = $('.faq_title'+index);
        $('.faq_title').next().slideUp();
        $('.faq_title').find(".faq-icon").removeClass("pp-arrow-down").addClass("pp-arrow-up");
        console.log(clickedFaq.next().is(':visible'), "clicked");
        if(clickedFaq.next().is(':visible')) {
            clickedFaq.next().slideUp();
            clickedFaq.find(".faq-icon" + index).removeClass("pp-arrow-down").addClass("pp-arrow-up");
        } else {
            clickedFaq.next().slideDown();
            clickedFaq.find(".faq-icon" + index).addClass("pp-arrow-down").removeClass("pp-arrow-up");
        }
        // const faqTitle = document.getElementsByClassName('faq_title' + index);
        // if (false == $(faqTitle[0]).next().is(':visible')) {
        //     console.log("check")
        //     $('.faq-content').slideUp();
        // }

        // const $currIcon = $(faqTitle[0]).find(".faq-icon" + index);

        // $(".faq-icon").not($currIcon).addClass('pp-arrow-up').removeClass('pp-arrow-down');

        // $currIcon.toggleClass('pp-arrow-down  pp-arrow-up');

        // console.log(faqTitle[0], 'faqTitle[0]');
        // $(faqTitle[0]).next().slideToggle();

        // console.log("open accrodian", this.scrollBarRef);

        if (this.scrollBarRef) {
            setTimeout(this.scrollBarRef.onResize, 800);
        }
    }

    componentDidMount() {
        if (this.props.indexToDefault) {
            let scrollTo = this.props.indexToDefault[0];
            scrollTo = scrollTo * 41;
            $('.scrollbar-container').scrollTop(scrollTo);
        }
    }

    handleScrollBarRef = (ref) => {
        this.scrollBarRef = ref;
    };

    render() {
        const { closePopup, fromLeaderboard, indexToDefault, isPopup, userInfo } = this.props;
        
        const faqData = this.props.faqData ? this.props.faqData.data : null;
        const loading = this.props.faqData ? this.props.faqData.loading : null;
        // console.log(userInfo);
        let self = this;

        const defaultToSet = indexToDefault ? indexToDefault : [0];

        return (
            <div className={`modal-contenier${isPopup ? ' animated fadeIn fast' : ''}`}>
                <div className="modal-outer">
                    <div className={`modal-head slide-modal-head${isPopup ? '' : ' animated slideInUpLess'}`}>
                        <h2 className="modal-head-title">
                            <a onClick={closePopup} className="icon pp-arrow-left2 modal-close"></a>
                            <span className="head-title-label">Faq</span>
                        </h2>
                    </div>
                    <div className={`modal-body${isPopup ? '' : ' animated slideInUpLess'}`}>
                        <div className="popup-info faq-modal-info">
                            <div className="block scroll-modal-content">
                                <div className="prizes-faq-info">
                                    <ContentScroll
                                        onRef={this.handleScrollBarRef}
                                    >
                                    <div className="faq-prizes-list">
                                        <ul className="add-accordin">
                                            {faqData && userInfo ? faqData && faqData.map(function (faq, index) {

                                                let ques = faq.question;
                                                ques = ques.replace(/£/g, HelperFunctions.getCurrency(userInfo.currency));
                                                let ans = faq.answer;
                                                ans = ans.replace(/£/g, HelperFunctions.getCurrency(userInfo.currency));

                                                return (
                                                    <li className="open" key={index}>
                                                        <a className={"faq-title faq_title faq_title" + index} onClick={self.openAccordion.bind(self, index)}>
                                                            <span>{ques}</span> <i
                                                                className={defaultToSet.includes(index) ? "icon pp-arrow-down faq-icon faq-icon" + index : "icon pp-arrow-up faq-icon faq-icon" + index}></i>
                                                        </a>
                                                        <div className="faq-content accordin-content" style={{ display: (defaultToSet.includes(index)) ? "block" : "none" }}>
                                                            <div className="faq_content" dangerouslySetInnerHTML={{ __html: ans }}>
                                                                {/* <div className="wcard">
                                                                    
                                                                    </div> */}
                                                            </div>
                                                        </div>
                                                    </li>
                                                )
                                            }) :
                                                <ContentLoader loaderType={'content-relative'} />
                                            }
                                        </ul>

                                        <div>
                                        </div>
                                    </div>

                                    </ContentScroll>
                                </div>
                            </div>
                        </div>
                    </div>
                    <a onClick={closePopup} className="close-btn animated bounceIn delay-04s"><i className="icon pp-cross"></i></a>
                </div>

                <div onClick={closePopup} className="modal-overlay"></div>

            </div>

        );
    }
}

export default FAQ;