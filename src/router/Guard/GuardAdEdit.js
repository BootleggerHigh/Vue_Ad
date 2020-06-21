import store from "../../store";

/**
 * Пользователь,который не создавал данное объявление не пройдет  по ad:id/edit;
 * @param to
 * @param from
 * @param next
 */
export default function (to,from,next) {
    if(store.getters.access_to_edit_ad(to.params.id))
    {
        next()
    }
    else{
        next('/?permission_edit_denied=true');
    }
}