import images from "../../../../assets/images";
import APIEndpoints from "../../../../config/APIEndpoints";
import Constants from "../../../../utils/Constants";
import HelperFunctions from "../../../../utils/HelperFunctions";
import common from "../../common";
import Home from "../home";
import * as ActionTypes from "./actionTypes";

export function callOnPageLoad(current_game_url = '') {
    HelperFunctions.postMessageToGame({ current_game_url: current_game_url });
    return (dispatch, getState) => {
        // dispatch(common.actions.getUserBenefits());
        dispatch(common.actions.getUserPopups());
        dispatch(common.actions.logAccess({ 'path': current_game_url, 'code': Constants.LOGACCESS_CODE }));
        dispatch(common.actions.getUserNotifications());
        //tracking
        dispatch(common.actions.userTracking("store"));
        dispatch(common.actions.toCheckNicknameAvailable(false));
    }
}

/* get store items list */
export function getStoreItems() {
    return (dispatch, getState) => {

        //tracking
        dispatch(common.actions.userTracking("store_store"));
        // first empty user info from store
        // dispatch({
        //     type: ActionTypes.GET_STORE_ITEMS,
        //     payload: null
        // });

        dispatch({
            type: ActionTypes.GET_STORE_ITEMS,
            disableGlobalLoader: true,
            promise: APIEndpoints.userStoreItems(),
        });
    }
}

/* get inventory list */
export function getInventoryItems(kitbagData) {
    return (dispatch, getState) => {
        //tracking
        dispatch(common.actions.userTracking("store_inventory"));
        // first empty user info from store
        // dispatch({
        //     type: ActionTypes.GET_INVENTORY_ITEMS,
        //     payload: null
        // });

        dispatch({
            type: ActionTypes.GET_INVENTORY_ITEMS,
            disableGlobalLoader: true,
            promise: APIEndpoints.userInventoryItems(),
            callback: function (payload) {
                let data = null;
                if (!payload.games && kitbagData === null) {
                    data = 404;
                } else {
                    if (payload === 404) {
                        payload = {};
                    }
                    const obj = HelperFunctions.copyObject(payload);
                    obj.kitbagData = kitbagData.level_kits;
                    obj.base_url = kitbagData.base_url;
                    data = obj;
                }

                // console.log('data');

                dispatch({
                    type: ActionTypes.GET_INVENTORY_ITEMS,
                    payload: data
                });
            }
        });
    }
}

export function getUserKitbags() {

    return (dispatch, getState) => {
        dispatch({
            type: ActionTypes.GET_INVENTORY_ITEMS,
            payload: null
        });

        dispatch({
            type: ActionTypes.GET_KIT_BAGS,
            disableGlobalLoader: true,
            promise: APIEndpoints.getKitBags(),
            callback: function (payload) {
                dispatch(getInventoryItems(payload));
                setTimeout(function () {
                    dispatch(common.actions.getUserNotifications());
                }, 500)
            },
        });
    }
}

export function addInventory(data) {

    let dataToPass = {
        txn_type: "IN",
        txn_purpose: "purchase",
        items: [
            {
                item: data.item_name,
                txn_amount: data.currency_required,
                txn_qty: 1,
                status: "Y"
            }
        ]
    };

    return (dispatch, getState) => {

        dispatch({
            type: ActionTypes.ADD_INVENTORY,
            payload: { isLoading: true }
        });



        dispatch({
            type: ActionTypes.ADD_INVENTORY,
            disableGlobalLoader: true,
            promise: APIEndpoints.purchaseInventory(dataToPass, data.item_game),
            callback: function (payload) {
                if (payload.isAdded) {
                    dispatch(Home.actions.getUserBenefits());
                    let trackingAction = data.isFromFlashSale ? "flash_sale_purchase" : "store_purchase";
                    dispatch(common.actions.userTracking(trackingAction, { boost: data.item_name }));
                    setTimeout(function () {
                        dispatch(toggleBoostPopup(null));
                        dispatch(toggleStoreItemPopup());
                        dispatch(common.actions.getUserNotifications());
                    }, data.isFromFlashSale ? 3000 : 500) // if purchased from flash sale message will show longer then 500 ms

                }
            }
        })
    }
}

export function gotoInventory() {
    return (dispatch, getState) => {
        dispatch({
            type: ActionTypes.GOTO_INVENTORY,
            payload: { openUserInventory: true }
        })
    }
}

export function toggleStoreItemPopup() {
    return (dispatch, getState) => {
        dispatch({
            type: ActionTypes.OPEN_STORE_ITEM_POPUP,
            payload: { itemPurchaseData: { message: null, isAdded: null, isLoading: false } }
        })
    }
}

export function getKitbagsRewards(data, bagType) {
    let dataToPass = {
        txn_type: "IN",
        txn_purpose: "level",
        txn_origin: "inventory",
        references: [
            {
                "reference_id": data
            }
        ]
    };

    return (dispatch, getState) => {
        dispatch({
            type: ActionTypes.GET_KIT_BAGS_REWARDS,
            payload: { isLoading: true, data: null }
        })



        // dispatch(showKitBagAnimations(true, bagType));

        // const payload = {
        //     "license": "Copyright 2022 Genius Tech Group. All rights reserved.",
        //     "statusCode": 200,
        //     "content": {
        //         "user_info": {
        //             "account_id": "111081",
        //             "initials": "",
        //             "override_ip_ban": false,
        //             "currency": "USD",
        //             "country_code": "US",
        //             "first_name": "test81",
        //             "balance": 18.35,
        //             "jurisdiction": "",
        //             "product_token": "Iz2Tu9idAr3himfaPw1wIrG23KlUK2vgeA8aLV02BdZyVs0tuOZ3t46AfIktjX91",
        //             "ssoid": "",
        //             "user_type": "free",
        //             "user_name": "",
        //             "is_suspended": false,
        //             "is_blocked": false
        //         },
        //         "base_url": "https://sincbally-szdev.geniusgames.com.au/assets/",
        //         "txn_items": [
        //             {
        //                 "reference_id": "kitbag_025lvl_20220118042147258",
        //                 "txn_items": [
        //                     {
        //                         "item_name": "hg_goldenballgold",
        //                         "item_display_name": "Golden Ball",
        //                         "item_type": "Gold",
        //                         "item_image": "goldenballgold.png",
        //                         "description": "X4 Next Shot",
        //                         "mini_game_logo": "title-hg-logo.png"
        //                     },
        //                     {
        //                         "item_name": "hg_goldenballgold",
        //                         "item_display_name": "Golden Ball",
        //                         "item_type": "Gold",
        //                         "item_image": "goldenballgold.png",
        //                         "description": "X4 Next Shot",
        //                         "mini_game_logo": "title-hg-logo.png"
        //                     },
        //                     {
        //                         "item_name": "hgo_goldenballgold",
        //                         "item_display_name": "Golden Ball",
        //                         "item_type": "Gold",
        //                         "item_image": "goldenballgold.png",
        //                         "description": "X4 Next Shot",
        //                         "mini_game_logo": "title-hgo-logo.png"
        //                     },
        //                     {
        //                         "item_name": "hgo_windbreakergold",
        //                         "item_display_name": "Wind Breaker",
        //                         "item_type": "Gold",
        //                         "item_image": "windbreakergold.png",
        //                         "description": "No Wind Next 3 Shots",
        //                         "mini_game_logo": "title-hgo-logo.png"
        //                     },
        //                     {
        //                         "item_name": "puckluck_firepuckgold",
        //                         "item_display_name": "Fire Puck",
        //                         "item_type": "Gold",
        //                         "item_image": "firepuckgold.png",
        //                         "description": "x4 Next Shot",
        //                         "mini_game_logo": "title-puck-luck-logo.png"
        //                     },
        //                     {
        //                         "item_name": "hgo_goldenballgold",
        //                         "item_display_name": "Golden Ball",
        //                         "item_type": "Gold",
        //                         "item_image": "goldenballgold.png",
        //                         "description": "X4 Next Shot",
        //                         "mini_game_logo": "title-hgo-logo.png"
        //                     }
        //                 ]
        //             }
        //         ]
        //     }
        // };

        // if (payload.statusCode === 200) {
        //     var newTemp = [];
        //     var newRefineArr = [];
        //     var newRefineArr2 = [];

        //     if (payload.content.txn_items && payload.content.txn_items[0]) {
        //         payload.content.txn_items[0].txn_items.map((item, index) => {
        //             item.qty = 1;
        //             newTemp[item.item_name] = newTemp[item.item_name] || [];
        //             newTemp[item.item_name].push(item);
        //         });

        //         // console.log(newTemp, newTemp.length, "newTemp");

        //         for (var key in newTemp) {
        //             console.log(newTemp[key], "newTemp[key]");
        //             var tempItem = newTemp[key][0];
        //             tempItem.qty  = newTemp[key].length;
        //             newRefineArr.push(tempItem);
        //         }

        //         // for (var i = 0; i < newTemp.length; i++) {
        //         //     console.log(newTemp[i], "newTemp[i]");
        //         //     newRefineArr.push(newTemp[i]);
        //         // }

        //         // newTemp.map((item, key) => {
        //         //     console.log(item);
        //         // })

        //         // payload.content.txn_items[0].txn_items.map((item, index) => {
        //         //     if (item.item_name === newTemp[item.item_name][0].item_name) {
        //         //         console.log(newTemp[item.item_name])
        //         //         item.qty = newTemp[item.item_name].length;
        //         //         newRefineArr.push(item);
        //         //     }
        //         // });

        //         // console.log(newRefineArr, "newRefineArr");

        //         // let tempName = "";
        //         // newRefineArr.map((itm, id) => {
        //         //     if (itm.item_name !== tempName) {
        //         //         newRefineArr2.push(itm);
        //         //     }
        //         //     tempName = itm.item_name
        //         // });

        //         payload.content.txn_items[0].txn_items = newRefineArr;
        //     }

        //     // console.log(payload, "payload");

        //     dispatch(common.actions.userTracking("store_inventory-kitbag-open", { kitbagId: data }));
        //     if (payload.content.txn_items) {
        //         dispatch(toggleInventoryPopup(null));
        //         dispatch(showKitBagAnimations(true, bagType));
        //         setTimeout(function () {
        //             dispatch(toggleKitBagsItems({ base_url: payload.content.base_url, items: payload.content.txn_items }))
        //         }, 4500)
        //     }
        // }

        // setTimeout(() => {
        //     if (payload.statusCode === 200) {
        //         if (payload.content.txn_items) {
        //             dispatch(toggleInventoryPopup(null));
        //             dispatch(showKitBagAnimations(true, bagType));
        //             setTimeout(function () {
        //                 dispatch(toggleKitBagsItems({ base_url: payload.content.base_url, items: payload.content.txn_items }))
        //             }, 4500)
        //         }
        //     }
        // }, 0);

        dispatch({
            type: ActionTypes.GET_KIT_BAGS_REWARDS,
            disableGlobalLoader: true,
            promise: APIEndpoints.kitbagRewards(dataToPass),
            callback: function (payload) {
                if (payload.statusCode === 200) {
                    var newTemp = [];
                    var newRefineArr = [];
                    var newRefineArr2 = [];

                    if (payload.content.txn_items && payload.content.txn_items[0]) {
                        payload.content.txn_items[0].txn_items.map((item, index) => {
                            item.qty = 1;
                            newTemp[item.item_name] = newTemp[item.item_name] || [];
                            newTemp[item.item_name].push(item);
                        });

                        for (var key in newTemp) {
                            var tempItem = newTemp[key][0];
                            tempItem.qty = newTemp[key].length;
                            newRefineArr.push(tempItem);
                        }

                        payload.content.txn_items[0].txn_items = newRefineArr;
                    }

                    dispatch(common.actions.userTracking("store_inventory-kitbag-open", { kitbagId: data }));
                    if (payload.content.txn_items) {
                        dispatch(toggleInventoryPopup(null));
                        dispatch(showKitBagAnimations(true, bagType));
                        setTimeout(function () {
                            dispatch(toggleKitBagsItems({ base_url: payload.content.base_url, items: payload.content.txn_items }))
                        }, 4500)
                    }
                }
            }
        })
    }
}

export function toggleKitBagsItems(data) {
    return (dispatch, getState) => {
        dispatch({
            type: ActionTypes.GET_KIT_BAGS_REWARDS,
            payload: { isLoading: false, data: data }
        })
    }
}

export function showKitBagAnimations(flag, bagType) {

    return (dispatch, getState) => {
        let bagImg = images.bronzeBag;
        switch (bagType) {
            case "Gold":
                bagImg = images.goldKitBag;
                break;
            case "Bronze":
                bagImg = images.bronzeKitBag;
                break;
            case "Silver":
                bagImg = images.silverKitBag;
                break;
        }

        dispatch({
            type: ActionTypes.SHOW_KITBAG_ANIMATIONS,
            payload: { kitBagAnimation: flag, bagTypeImg: bagImg }
        })

        if (!flag) {
            dispatch({
                type: ActionTypes.GET_KIT_BAGS_REWARDS,
                payload: { isLoading: false, data: null }
            });

            dispatch(getUserKitbags());
        }
    }
}

export function toggleBoostPopup(flag) {
    return (dispatch, getState) => {
        dispatch({
            type: ActionTypes.TOGGLE_BOOST_POPUP,
            payload: flag
        })

        HelperFunctions.toCheckPopupVisible();
    }
}

export function toggleInventoryPopup(data) {
    return (dispatch, getState) => {
        dispatch({
            type: ActionTypes.TOGGLE_INVERNTORY_POPUP,
            payload: data
        })

        HelperFunctions.toCheckPopupVisible();
    }
}
