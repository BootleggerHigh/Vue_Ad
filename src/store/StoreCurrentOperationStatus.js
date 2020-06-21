/**
 * Показывает текущий статус во время какой-либо операции (loading),а также какие-либо ошибки на какие-либо действия
 * (error) по всему сайту, пользователю;
 *
 */
export default

{
    state:{
        loading:false,
        error:null,
    },
    mutations:{
        setLoading(state,payload)
        {
            state.loading = payload;
        },
        setError(state,payload)
        {
            state.error = payload;
        },
        clearError(state)
        {
            state.error = null
        },
    },
    actions:{
        setLoading({commit},payload)
        {
            commit('setLoading',payload);
        },
        setError({commit},payload)
        {
            commit('setError',payload);
        },
        clearError({commit},payload)
        {
            commit('clearError',payload);
        }
    },
    getters:{
        loading(state)
        {
            return state.loading;
        },
        error(state)
        {
            return state.error;
        }
    }
}