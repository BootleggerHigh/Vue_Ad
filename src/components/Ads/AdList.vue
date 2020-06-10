<template>
    <v-container>
        <v-layout align-center justify-center row>
            <v-flex xs12 sm6 offest-sm3>
                <h1 class="text--secondary mb-3">Мои объявления</h1>
                <v-card class="elevation-10 mb-3"
                v-for="my_ad in my_ads"
                :key="my_ad.id">
                    <v-layout row>
                        <v-flex xs4>
                            <v-img :src="my_ad.src" height="160px">
                            </v-img>
                        </v-flex>
                        <v-flex xs8>
                            <v-card-text>
                                <h2 class="text--primary">{{my_ad.title}}</h2>
                                <p>{{my_ad.description}}</p>
                            </v-card-text>
                            <v-card-actions>
                                <v-spacer></v-spacer>
                                <v-btn class="info mr-1" :to="`/ad/${my_ad.id}`">Открыть</v-btn>
                            </v-card-actions>
                        </v-flex>
                    </v-layout>
                </v-card>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
    export default {
        name: "AdList",
        computed:{
            my_ads(){
                return this.$store.getters.my_ads;
            }
        },
    };
</script>

<style scoped>

</style>