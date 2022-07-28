import React from 'react';
import APIEndpoints from "../../../../../config/APIEndpoints";

const MyAccount = ({onClose}) => {
    return (
        <div className="mid-section my-account-wrap">
            <div className="container_fluid_mid">
                <div className="inner-section my-account-popup">
                    <div className="inner-mid-section">
                        <div className="inner-title">
                            <div className="popup-close"><a style={{opacity: 0}} href="javascript:void(0);" onClick={onClose}><img src="/assets/images/cross.svg"/></a></div>
                        </div>
                        <div className="content-mid-section">
                        </div>
                    </div>
                    <div className="modal iframe-modal" style={{display: 'block'}}>
                       <div className="modal-contenier">
                         <div className="modal-outer">
                            <iframe frameBorder="0" src={APIEndpoints.myAccount.url} target="_parent"
                                    height="100%" name="" width="100%" id="myId"
                                    style={{position: 'absolute', display: 'block', height: '100%', width: '100%', top: 0}}
                                    ></iframe>
                          </div>
                       </div>
                     </div>
                </div>
                {/*<div className="mid-overlay" onClick={onClose}></div>*/}
            </div>
        </div>
    );
};

export default MyAccount;
