<template>
    <v-container>
        <v-layout align-center
                  justify-center
                  row>
            <v-flex  xs12
                     sm6
                     offest-sm3>
                <v-card class="elevation-10 mb-3">
                    <v-carousel cycle>
                        <v-carousel-item v-for="(image,i) of ad.src"
                                         :key="i"
                                         :src="image"
                                         width="auto"
                                         height="max"
                                         touch>
                        </v-carousel-item>
                    </v-carousel>
                    <v-card-text>
                        <h1 class="text--primary">{{ad.title}}</h1>
                        <p>{{ad.description}}</p>
                    </v-card-text>
                    <router-view></router-view>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn v-if="access_to_edit_ad" class="primary"
                               :to="`${this.$route.path}/edit`">Изменить
                        </v-btn>
                        <v-btn v-else class="success"
                               :to="`${this.$route.path}/buy`"> Купить
                        </v-btn>
                    </v-card-actions>
                </v-card>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
    export default {
        name: "AdItem",

        props: {
                id:{
                    required: true,
                }
            },

        computed: {
                ad() {
                    return this.$store.getters.ad_by_id(this.id);
                },
            access_to_edit_ad()
            {
                return this.$store.getters.access_to_edit_ad(this.id);
            }
        },
    }
</script>

<style scoped>

</style>