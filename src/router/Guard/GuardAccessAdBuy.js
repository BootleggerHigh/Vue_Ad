import store from "../../store";

/**
 * Пользователь,который создавал данное объявление не пройдет  по ad:id/buy;
 * @param to
 * @param from
 * @param next
 */
export default function (to,from,next) {
    if(!store.getters.access_to_edit_ad(to.params.id))
    {
        next()
    }
    else{
        next('/?permission_buy_denied=true');
    }
}