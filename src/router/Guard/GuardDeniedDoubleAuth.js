import store from "../../store";

/**
 * Авторизированный пользователь не пройдет по /login, /registration;
 * @param to
 * @param from
 * @param next
 */
export default function (to, from, next) {
    if (store.getters.user) {
        next('/?double_auth_denied=true');
    }
    else
    {
        next();
    }
}