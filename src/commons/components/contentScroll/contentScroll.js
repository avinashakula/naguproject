import $ from 'jquery';
import PropTypes from "prop-types";
import React, {PureComponent} from 'react';
import ScrollBar from 'react-perfect-scrollbar';
import 'react-perfect-scrollbar/dist/css/styles.css';
import ReactResizeDetector from 'react-resize-detector';

class ContentScroll extends PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            isScrollEnabled: false,
        };
        this.scrollBarRef = null;
    }

    handleScrollBarRef = (ref) => {
        this.scrollBarRef = ref;

        // console.log(ref);

        if (this.props.onRef) {
            this.props.onRef(this);
        }
    };

    onResize = () => {
        // console.log("on resize");
        if (this.scrollBarRef) {
            this.scrollBarRef.updateScroll();

            // show-hide scroll top and bottom arrows based on if scroll bar is active
            this.setState({
                isScrollEnabled: ($('.ps--active-y').attr('class') === undefined) ? false : true,
            });
        }
    };

    render() {
        const {additionalClass} = this.props;
        const {isScrollEnabled} = this.state;

        return (
            <div className="scroll-content">
                <ScrollBar
                    component="div"
                    ref={this.handleScrollBarRef}

                >

                    <div className={`${additionalClass} ${additionalClass === 'scroll-bar1' ? "" : "scroll-bar"}`}>
                        {this.props.children}
                        <ReactResizeDetector refreshMode={'debounce'} refreshRate={100} handleWidth handleHeight onResize={this.onResize}/>
                    </div>

                </ScrollBar>
            </div>
        );
    }
}

ContentScroll.propTypes = {
    additionalClass: PropTypes.string,
    onRef: PropTypes.func,
};

ContentScroll.defaultProps = {
    additionalClass: "",
    onRef: null
}

export default ContentScroll;
