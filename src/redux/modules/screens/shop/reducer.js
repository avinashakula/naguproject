import * as ActionTypes from "./actionTypes";

const initialState = {
    storeData: null,
    inventoryData: null,
    errorMessage: null,
    seletedItem: null,
    whichTab: null,
    itemPurchaseData: {
        message: null,
        isAdded: null,
        isLoading: false
    },
    openUserInventory: null, //to open tab like inventory
    kitBagRewards: {
        isLoading: false,
        data: null
    },
    kitBagAnimation: null,
    bagTypeImg: null,
    selectedItem: null,
    selectedInventory: null
};
const reducer = (state = initialState, action) => {
    switch (action.type) {
        case ActionTypes.GET_STORE_ITEMS:
            return { ...state, storeData: action.payload };
        case ActionTypes.GET_INVENTORY_ITEMS:
            return { ...state, inventoryData: action.payload };
        case ActionTypes.OPEN_STORE_ITEM_POPUP:
            return { ...state, ...action.payload };
        case ActionTypes.ADD_INVENTORY:
            return { ...state, itemPurchaseData: { ...state.itemPurchaseData, ...action.payload } };
        case ActionTypes.GOTO_INVENTORY:
            return { ...state, ...action.payload };
        case ActionTypes.SHOW_KITBAG_ANIMATIONS:
            return { ...state, ...action.payload };
        case ActionTypes.TOGGLE_BOOST_POPUP:
            return { ...state, selectedItem: action.payload };
        case ActionTypes.TOGGLE_INVERNTORY_POPUP:
            return { ...state, selectedInventory: action.payload };
        case ActionTypes.GET_KIT_BAGS_REWARDS:
            return { ...state, kitBagRewards: { ...state.kitBagRewards, ...action.payload } };
        default:
            return { ...state }
    }
};
export default reducer;