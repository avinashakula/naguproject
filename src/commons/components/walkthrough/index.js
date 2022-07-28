import React, { Component } from 'react';

class WalkThrough extends Component {
    render() {
        const {wtText} = this.props;
        return (
            <div className="walkthrought-card">
                <div className="walkthrought-card-inner">
                    <div className="wt-tooltip-box">
                        <div className="wt-tooltip-box-outer">
                            <div className="wt-tooltip-text">
                                {wtText}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default WalkThrough;