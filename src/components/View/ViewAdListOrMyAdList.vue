<template>
    <v-container>
        <v-layout align-center
                  justify-center
                  row>
            <v-flex xs12
                    sm6
                    offest-sm3>
                <h1 class="text--secondary mb-3" v-if="fullAds">Все объявления</h1>
                <h1 class="text--secondary mb-3" v-else>Мои объявления</h1>
                        ({{adList.length}})
                    <template v-if="adList.length">
                <v-card class="elevation-10 mb-3"
                        v-for="currentAd of adList"
                        :key="currentAd.id">
                    <v-carousel cycle>
                        <v-carousel-item v-for="(image,i) in currentAd.src"
                                         :key="i"
                                         :src="image"
                                         touch>
                        </v-carousel-item>
                    </v-carousel>
                    <v-flex>
                        <v-card-text>
                            <h2 class="text--primary">{{currentAd.title}}</h2>
                            <p>{{currentAd.description}}</p>
                        </v-card-text>
                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn class="info mr-1"
                                   :to="`/ad/${currentAd.id}`">Открыть</v-btn>
                        </v-card-actions>
                    </v-flex>
                </v-card>
                    </template>
            </v-flex>
        </v-layout>
    </v-container>
</template>


<script>
    //  Общий компонент для  других компонентов : AdList,AdMyAdList
    export default {
        name: "ViewAdListOrMyAdList",

        props: {
            adList:
                {
                    type: Array,
                    required: true,
                },
            fullAds: {
                type: Boolean,
                default() {
                    return false
                }
            },
        },
    }
</script>

<style scoped>

</style>