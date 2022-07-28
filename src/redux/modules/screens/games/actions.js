import Constants from "../../../../utils/Constants";
import common from "../../common";
import home from "../home";
import menu from "../menu";


export function callOnPageLoad() {
    return (dispatch, getState) => {
        // dispatch(common.actions.getUserPopups());
        dispatch(common.actions.logAccess({ 'path': '/all-games', 'code': Constants.LOGACCESS_CODE }));
        dispatch(common.actions.togglePlayTabAnim(false));
        // dispatch(common.actions.getUserPopups());
        dispatch(home.actions.getGames());
        dispatch(common.actions.userTracking("all-games"));
        dispatch(common.actions.toCheckNicknameAvailable(false));
        dispatch(menu.actions.faqApi(true));
    }
}