<template>
    <div>
        <v-container fluid>
            <v-layout row>
                <v-flex xs12>
                    <v-carousel
                            cycle
                            hide-delimiter-background
                            show-arrows-on-hover>
                        <v-carousel-item v-for="ads in promoAds"
                                         :key="ads.id"
                                         touch
                                         :src="ads.src[0]"
                                         reverse-transition="fade-transition">
                            <div class="car-link">
                                <v-btn class="error"
                                       :to="`/ad/${ads.id}`">{{ads.title}}</v-btn>
                            </div>
                        </v-carousel-item>
                    </v-carousel>
                </v-flex>
            </v-layout>
        </v-container>
        <v-container grid-list-lg>
            <v-layout row
                      wrap>
                <v-flex xs12
                        sm6
                        md4
                        v-for="ad in ads"
                        :key="ad.id">
                    <v-card
                            class="mx-auto"
                            max-width="400">
                        <v-img
                                class="white--text align-end"
                                height="200px"
                                :src="ad.src[0]">
                            <v-card-title>{{ad.title}}</v-card-title>
                        </v-img>
                        <v-card-subtitle class="pb-0">{{ad.description}}</v-card-subtitle>
                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn  raised
                                    color="success"
                                    :to="`/ad/${ad.id}`">Просмотреть</v-btn>
                            <v-btn raised color="primary"
                                   v-if="ad.ownerId !== userID"
                                   :to="`/ad/${ad.id}/buy`">Купить
                            </v-btn>
                        </v-card-actions>
                    </v-card>
                </v-flex>
            </v-layout>
        </v-container>
    </div>
</template>

<script>
    export default {
        name: "AppHome",

        computed: {
            /**
             *
             * @returns [promoAds]
             */
            promoAds() {

                return this.$store.getters.promo_ads;
            },
            /**
             *
             * @returns [ads]
             */
            ads() {
                return this.$store.getters.ads;
            },
            /**
             *
             * @returns [userID]
             */
            userID()
            {
                return this.$store.getters.user.id;
            }
        }
    }
</script>

<style scoped>
    .car-link {
        position: absolute;
        bottom: 50px;
        left: 50%;
        background: rgba(0, 0, 0, .5);
        transform: translate(-50%, 0);
        padding: 5px 15px;
        border-top-right-radius: 5px;
        border-top-left-radius: 5px;
    }
</style>