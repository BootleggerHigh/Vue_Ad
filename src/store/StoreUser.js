import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
class User{
    /**
     *
     * @param id
     */
    constructor(id) {
        this.id = id;
    }
}
export default
{
    state:{
        user:null,
    },
    mutations: {
        setUser(state,payload)
        {
            state.user = payload;
        },
    },
    actions:{
        /**
         * Регистрация нового пользователя (firebase.auth().createUserWithEmailAndPassword);
         * @param commit
         * @param email
         * @param password
         * @returns {Promise<void>}
         */
        async registerUser({commit},{email,password})
        {
            try {
                commit('clearError');
                commit('setLoading',true);
                const user = await firebase.auth().createUserWithEmailAndPassword(email, password);
                commit('setUser',new User(user.user.uid));
                commit('setLoading',false);
            }
            catch (error) {
                commit('setLoading',false);
                commit('setError',error.message);
                throw error
            }
        },
        /**
         * Вход пользователя в аккаунт(Идентификация,Аутентификация,Авторизация(signInWithEmailAndPassword));
         * @param commit
         * @param email
         * @param password
         * @returns {Promise<void>}
         */
        async authUser({commit},{email,password})
        {
            try {
                commit('clearError');
                commit('setLoading',true);
                const user = await firebase.auth().signInWithEmailAndPassword(email, password);
                commit('setUser',new User(user.user.uid));
                commit('setLoading',false);
            }
            catch (error) {
                commit('setLoading',false);
                commit('setError',error.message);
                throw error
            }
        },
        /**
         *
         * @param commit
         * @param user
         */
        authLogin({commit},user)
        {
            commit('setUser',new User(user.uid));
        },
        /**
         *
         * @param commit
         * @returns {Promise<void>}
         * @constructor
         */
        async LogOut({commit})
        {
            try {
                commit('clearError');
                commit('setLoading',true);
                await firebase.auth().signOut();
                commit('setUser',null);
                commit('setLoading',false);
            }
            catch (error) {
                commit('setLoading',false);
                commit('setError',error.message);
                throw error
            }
        }
    },
    getters:{
        /**
         *
         * @param state
         * @returns {null}
         */
        user(state){
            return state.user
        },
        /**
         *
         * @param state
         * @returns {boolean}
         */
        isUserLoggedIn(state)
        {
            return state.user !== null;
        }
    },
}