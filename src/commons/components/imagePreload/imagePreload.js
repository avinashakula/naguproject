import React, { Component } from 'react';

class ImagePreload extends Component {
    constructor(props) {
        super(props);
        this.imageLoadCount = 0;
    }

    loadImageRef = (num, ref) => {
        if (ref) {
            ref.onload = () => {
                this.imageLoadCount++;
                // console.log(this.imageLoadCount, this.props.images.length, "this.imageLoadCount")
                // console.log("image loaded successfully ", num, this.imageLoadCount);
                if (this.imageLoadCount >= this.props.images.length) {
                    this.props.disableLoader();
                    // console.log("all images loaded now")
                }
            };
        }
    };

    render() {
        const { images } = this.props;
        return (
            <div style={{ opacity: 0, position: 'absolute', top: -2000, left: -2000 }}>
                {
                    images.map((image, index) => {
                        // console.log(image, "image");
                        return (
                            <img key={index} ref={this.loadImageRef.bind(this, index)} src={image} alt="" />
                        )
                    })
                }
            </div>
        );
    }
}

export default ImagePreload;