import store from "../../store";
/**
 * Не авторизированный пользователь не пройдет по /list, /new, /orders;
 * @param to
 * @param from
 * @param next
 */
export default function (to,from,next) {
    if (store.getters.user) {
        next();
    }
    else {
        next('/?permission_denied=true');
    }
}