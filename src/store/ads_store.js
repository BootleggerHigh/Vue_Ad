export default {
    state: {
        ads: [
            {
                title: 'First Ad',
                description: 'Hello descr',
                promo: false,
                src: 'https://cdn.vuetifyjs.com/images/carousel/sky.jpg',
                id: 1,
            },
            {
                title: 'SecondAd',
                description: 'Hello descr',
                promo: true,
                src: 'https://cdn.vuetifyjs.com/images/carousel/bird.jpg',
                id: 2,
            },
            {
                title: 'Third Ad',
                description: 'Hello descr',
                promo: true,
                src: 'https://cdn.vuetifyjs.com/images/carousel/planet.jpg',
                id: 3,
            },
        ]
    },
    mutations: {
        createdAd(state,payload)
        {
            state.ads.push(payload);
        }
    },
    actions: {
        createdAd({commit},payload)
        {
            payload.id = Math.random();
            commit('createdAd',payload);
        }
    },
    getters: {
        ads(state)
        {
            return state.ads;
        },
        promo_ads(state)
        {
            return state.ads.filter(ads => ads.promo);
        },
        my_ads(state)
        {
            return  state.ads;
        },
        ad_by_id(state)
        {
            return id=>{
                return state.ads.find(ad=>ad.id===id);
            }
        }
    },
};