<template>
    <v-container>
        <v-layout row>
            <v-flex xs12
                    sm6
                    offset-sm3>
                <h1 class="text--secondary mb-3">Заказы</h1>
                <v-list two-line
                        subheader>
                    <v-list-item-group
                            multiple>
                        <v-list-item v-for="order in orders"
                                     :key="order.id">
                            <v-list-item-action>
                                <v-checkbox color="success"
                                            :input-value="order.done"
                                            @change="markDone(order)">
                                </v-checkbox>
                            </v-list-item-action>
                            <v-list-item-content>
                                <v-list-item-title>Имя : {{order.name}}</v-list-item-title>
                                <v-list-item-subtitle>Телефон : {{order.phone}}</v-list-item-subtitle>
                                <v-list-item-subtitle>Почта : {{order.email}}</v-list-item-subtitle>
                            </v-list-item-content>
                            <v-list-item-action>
                                <template>
                                    <v-row justify="center">
                                        <v-dialog v-model="dialog"
                                                  fullscreen
                                                  hide-overlay
                                                  transition="dialog-bottom-transition"
                                                  :retain-focus="false">
                                            <template v-slot:activator="{ on, attrs }">
                                                <v-btn
                                                        color="primary"
                                                        dark
                                                        v-bind="attrs"
                                                        v-on="on">
                                                    Детали
                                                </v-btn>
                                            </template>
                                            <v-card>
                                                <v-toolbar dark color="primary">
                                                    <v-btn icon dark
                                                           @click="dialog = false">
                                                        <v-icon>mdi-close</v-icon>
                                                    </v-btn>
                                                    <v-toolbar-title>Заказ {{order.id}}</v-toolbar-title>
                                                    <v-spacer></v-spacer>
                                                </v-toolbar>
                                                <v-list three-line subheader>
                                                    <v-subheader>Подробности</v-subheader>
                                                    <v-list-item>
                                                        <v-list-item-content>
                                                            <v-list-item-title>Имя</v-list-item-title>
                                                            <v-list-item-subtitle>{{order.name}}</v-list-item-subtitle>
                                                        </v-list-item-content>
                                                    </v-list-item>
                                                    <v-list-item>
                                                        <v-list-item-content>
                                                            <v-list-item-title>Номер телефона(кликабельно)
                                                            </v-list-item-title>
                                                            <v-list-item-subtitle>
                                                                <a :href="`tel:${order.phone}`">{{order.phone}}</a>
                                                            </v-list-item-subtitle>
                                                        </v-list-item-content>
                                                    </v-list-item>
                                                    <v-list-item>
                                                        <v-list-item-content>
                                                            <v-list-item-title>Почта(кликабельно)</v-list-item-title>
                                                                <v-list-item-subtitle>
                                                                    <a :href="`mailto:${order.email}`">{{order.email}}</a>
                                                            </v-list-item-subtitle>
                                                        </v-list-item-content>
                                                    </v-list-item>
                                                    <v-list-item>
                                                        <v-list-item-content>
                                                            <v-list-item-title>Примечание от заказчика
                                                            </v-list-item-title>
                                                            <v-list-item-subtitle>{{order.description}}
                                                            </v-list-item-subtitle>
                                                        </v-list-item-content>
                                                    </v-list-item>
                                                      <v-list-item>
                                                        <v-list-item-content>
                                                                <v-btn :to="`/ad/${order.adID}`"
                                                                       class="error">Открыть объявление</v-btn>
                                                        </v-list-item-content>
                                                    </v-list-item>
                                                </v-list>
                                                <v-divider></v-divider>
                                            </v-card>
                                        </v-dialog>
                                    </v-row>
                                </template>
                            </v-list-item-action>
                        </v-list-item>
                    </v-list-item-group>
                </v-list>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
    export default {
        name: "UserOrders",

        data()
        {
            return {
                dialog: false,
            }
        },

        methods: {
            markDone(order) {
                this.$store.dispatch('markOrderDone',order.id)
                .then(() => {
                    order.done = true;
                });
            },
        },

        computed:{
            loading()
            {
                return this.$store.getters.loading;
            },

            orders()
            {
                return this.$store.getters.orders;
            }
        },

        created() {
            this.$store.dispatch('fetchOrders');
        }
    }
</script>

<style scoped>

</style>