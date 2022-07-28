class Dimensions {
    get isAndroid() {
        return true;
    }

    get isIos() {
        return true;
    }

    getDimensions() {
        const {innerWidth, innerHeight} = window
        return {
            width: innerWidth,
            height : innerHeight
        };
    }

    isPhone() {
        return true
    }

    isTablet() {
        return true
    }

    isIPhoneX() {

    }
}

const dimensions = new Dimensions();
export default dimensions;