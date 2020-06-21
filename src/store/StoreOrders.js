import firebase from 'firebase/app';
import 'firebase/database'

class Order {
    /**
     *
     * @param name
     * @param phone
     * @param adID
     * @param email
     * @param description
     * @param done
     * @param id
     */
    constructor(name,
                phone,
                adID,
                email=null,
                description,
                done=false,
                id=null)
    {
        this.name = name;
        this.phone = phone;
        this.adID = adID;
        this.email = email;
        this.description = description;
        this.done = done;
        this.id = id;
    }
}

export default{
    state: {
        orders:[],
    },
    mutations: {
        loadOrders(state,payload)
        {
            state.orders = payload;
        }
    },
    actions: {
        /**
         *  Добавляем новую запись ордера;
         * @param commit
         * @param getters
         * @param payload
         * @returns {Promise<void>}
         */
        async createOrder({commit,getters},payload)
        {
            const order = new Order(
                payload.name,
                payload.phone,
                payload.adID,
                payload.email,
                payload.description,
                getters.user.id,
                payload.done,
            );
            try {
                commit('setLoading',true);
                commit('clearError');
                await firebase.database().ref(`/users/${getters.user.id}/orders`)
                    .push(order);

                commit('setLoading',false);
            }
            catch (error) {
                commit('setLoading',false);
                commit('setError',error.message);
                throw error
            }
        },
        /**
         * Получаем все ордера для определенного пользователя;
         * @param commit
         * @param getters
         * @returns {Promise<void>}
         */
        async fetchOrders({commit,getters})
        {
            try {
                commit('setLoading',true);
                commit('clearError');
                const fbOrders = await  firebase.database().ref(`/users/${getters.user.id}/orders`)
                    .once('value');
                const orders = fbOrders.val();
                const fullResultOrders = [];

                Object.keys(orders).forEach(key => {
                   const current_orders = orders[key];
                    fullResultOrders.push(new Order(
                        current_orders.name,
                        current_orders.phone,
                        current_orders.adID,
                        current_orders.email,
                        current_orders.description,
                        current_orders.done,
                        key,
                    ));
                });
                commit('loadOrders',fullResultOrders);
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
         * @param getters
         * @param payload
         * @returns {Promise<void>}
         */
        async markOrderDone({commit,getters},payload)
        {
            try {
                commit('setLoading',true);
                commit('clearError');
                await  firebase.database().ref(`/users/${getters.user.id}/orders`)
                    .child(payload).update({
                        done:true,
                    });
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
         * @returns {*[]}
         */
        doneOrders(state)
        {
            return state.orders.filter(orders => orders.done)
        },
        /**
         *
         * @param state
         * @returns {*[]}
         */
        unDoneOrders(state)
        {
            return state.orders.filter(orders => !orders.done)
        },
        /**
         *
         * @param state
         * @param getters
         * @returns {*}
         */
        orders(state,getters)
        {
            return getters.unDoneOrders.concat(getters.doneOrders);
        }
    },
}