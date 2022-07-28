import PropTypes from "prop-types";
import React, { Component } from 'react';
import images from "../../../assets/images";
import HelperFunctions from "../../../utils/HelperFunctions";

class PPHeadCard extends Component {

    render() {
        return (
            <React.Fragment>
                {
                    this.props.isHome ?
                        <div className="card-info play-card animated slideInDownLess">
                            <div className="card-outer">
                                {/* {
                            <h2 className={`${this.props.isHome ? "title-label" : "card-title"}`}>{this.props.isHome ? <span>{this.props.title}</span> : this.props.title}</h2>
                        } */}

                                {
                                    this.props.isHome ? <div className="game-heading">
                                        <h3 className="title-label">FREE <br />TO PLAY</h3>
                                    </div> : <h2 className="card-title">{this.props.title}</h2>
                                }

                                <div className="card-inner">
                                    <div className="play-logo">
                                        <figure className="animated flipInX slow"><img src={images.ppSkillLogo} alt="" /></figure>
                                    </div>
                                </div>
                            </div>
                        </div> : <div className="page-title-bar">
                            <div className="page-title-inner">
                                <div className="container">
                                    <h2 className="page-head-label">{this.props.title}</h2>
                                </div>
                            </div>
                        </div>
                }
            </React.Fragment>
        );
    }

}

PPHeadCard.propTypes = {
    title: PropTypes.string
};

PPHeadCard.defaultProps = {
    title: ""
}

export default PPHeadCard;