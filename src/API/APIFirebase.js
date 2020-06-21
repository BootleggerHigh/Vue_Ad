/**
 * Необходимое,для данной  работы с FireBase;
 */
import firebase from 'firebase/app';
import 'firebase/storage'
import 'firebase/database'


export class Ad{
    /**
     *
     * Как для идентичности объектов,для удобной работы с state;
     *
     * @param title
     * @param description
     * @param user_id
     * @param promo
     * @param id
     * @param imageSrc
     */
    constructor(title,description,user_id,promo,id=null,imageSrc=null) {
        this.title = title;
        this.description = description;
        this.ownerId = user_id;
        this.promo = promo;
        this.id = id;
        this.src = imageSrc;
    }
}

export default
{
    state:{
        ads:[]
    },
    mutations:{
        loadAds(state,data_value)
        {
            state.ads = data_value;
        },
        pushNewAds(state,data_value)
        {
            state.ads.push(data_value);
        },
        updateAd(state,data_value)
        {
            let ad = state.ads.find(a => {
                return a.id === data_value.id;
            });
            for(const property in ad)
            {
                    ad[property] = data_value[property];
            }
        },
    },
    actions:{
        /**
         * value_database_ads получает все данные с DB ( once('value') );
         * ads - извлекает полученные данные ( val() );
         * @param commit
         * @returns undefined
         */
        async fetchAds({commit})
        {
            try {
                commit('setLoading',true);
                commit('clearError');
                const value_database_ads = await firebase.database().ref('ads').once('value');
                const ads = await value_database_ads.val();
                const data_ads=[];
                Object.keys(ads).forEach(key =>{
                    data_ads.push(
                    new Ad( ads[key].title,
                        ads[key].description,
                        ads[key].ownerId,
                        ads[key].promo,
                        ads[key].id,
                        ads[key].src),
                        );
                });
               await commit('loadAds',data_ads);
               commit('setLoading',false);
            }
            catch (error) {
                commit('setLoading',false);
                commit('setError',error.message);
                throw error
            }
        }
    },
    getters: {
        /**
         *
         * @param state
         * @returns {[]}
         */
        ads(state)
        {
            return state.ads;
        },
        /**
         *
         * @param state
         * @returns {*[]}
         */
        promo_ads(state)
        {
            return state.ads.filter(ads => ads.promo);
        },
        /**
         *
         * @param state
         * @returns {function(*): *}
         */
        ad_by_id(state)
        {
            return id=>{
                return state.ads.find(ad =>ad.id===id);
            }
        },
        /**
         *
         * @param state
         * @param getters
         * @returns {*[]}
         */
        my_ads(state,getters)
        {
            return state.ads.filter(ad=>{
               return ad.ownerId === getters.user.id;
            });
        },
        /**
         *
         * @param state
         * @param getters
         * @returns {function(*=): boolean}
         */
        access_to_edit_ad(state,getters)
        {
            return id =>{
                return getters.ad_by_id(id).ownerId === getters.user.id
                };
            }
        }
    }