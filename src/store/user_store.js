import * as fb  from "firebase";
class User{
    constructor(id) {
        this.id = id;
    }
}
export default
{
    state:{
        user:null,
        auth_status:{
            status:false,
            message:'',
        }
    },
    mutations: {
        setUser(state,payload)
        {
            state.user = payload;
        },

        auth_status(state,{status,message})
        {
            state.auth_status.status  = status
            state.auth_status.message = message
        }
    },
    actions:{
        async registerUser({commit},{email,password})
        {
            try {
                commit('clearError');
                commit('setLoading',true);
                const user = await fb.auth().createUserWithEmailAndPassword(email, password);
                commit('setUser',new User(user.uid));
                commit('setLoading',false);
            }
            catch (error) {
                commit('setLoading',false);
                commit('setError',error.message);
                throw error
            }
        },
        async authUser({commit},{email,password})
        {
            try {
                commit('clearError');
                commit('setLoading',true);
                const user = await fb.auth().signInWithEmailAndPassword(email, password);
                commit('setUser',new User(user.uid));
                commit('setLoading',false);
            }
            catch (error) {
                commit('setLoading',false);
                commit('setError',error.message);
                throw error
            }
        },
        auth_status_action({commit},parameters)
        {
            commit('auth_status',parameters);
        }
    },
    getters:{
        user(state){
            return state.user
        },
        auth_status(state)
        {
            return state.auth_status;
        }
    },
}