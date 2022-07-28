import React, { Component } from 'react';
import images from '../../../assets/images';
import Constants from '../../../utils/Constants';

class Fantasy extends Component {


    tracking = () => {
        this.props.handleTracking("clicked-on-paddypower-fantasy")
    }

    render() {
        return (
            <div className="card-info banner-section animated slideInUpLess">
                <div className="card-outer">
                    <div className="wcard">
                        <div className="banner-card">
                            <a onClick={this.tracking} href={Constants.FANTASY_URL} target="_blank" className="banner-card-outer">
                                <figure className="banner-figure m-none"><img src={images.fantasyImg} alt="" /></figure>
                                <figure className="banner-figure d-none"><img src={images.fantasyMobImg} alt="" /></figure>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Fantasy;