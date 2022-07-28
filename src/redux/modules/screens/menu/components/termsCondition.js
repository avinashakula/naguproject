import React, {Component} from 'react';
import ContentLoader from "../../../../../commons/components/contentLoader";
import HelperFunctions from "../../../../../utils/HelperFunctions";

class TermsCondition extends Component {
    render() {
        const {closePopup, pageContent, userInfo} = this.props;

        let htmlToShow = pageContent.data ? pageContent.data.page_des ? pageContent.data.page_des : '' : '';
        htmlToShow = htmlToShow.replace(/£/g, HelperFunctions.getCurrency(userInfo ? userInfo.currency : ''));

        return (
            <div className="modal-widget-wrap terms-modal-wrap" style={{display: 'block'}}>
                <div className="modal terms-modal slide-modal">
                    <div className="modal-contenier">
                        <div className="modal-outer">
                            <div className="modal-head slide-modal-head animated slideInUpLess">
                                <h2 className="modal-head-title">
                                    <a onClick={closePopup} className="icon pp-arrow-left2 modal-close"></a><span className="head-title-label">Terms &amp; Conditions</span></h2>
                            </div>
                            <div className="modal-body animated slideInUpLess">
                                <div className="popup-info terms-modal-info">
                                    <div className="block scroll-modal-content">
                                        <div className="terms-info">

                                            {pageContent.loading ?
                                                (
                                                    <ContentLoader loaderType={'content-loader green-loader'}/>
                                                )
                                                :
                                                (
                                                    <div dangerouslySetInnerHTML={{__html: htmlToShow}}></div>
                                                )}

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default TermsCondition;