<template>
    <v-app>
        <v-navigation-drawer
                v-model="drawer"
                app
                disable-resize-watcher>
            <v-list shaped>
                <v-subheader>
                    <router-link to="/"
                                 style="text-decoration: none;">Market Ads
                        <v-btn icon color="yellow accent-4" @click="changeTheme">
                            <v-icon>mdi-file-eye</v-icon>
                        </v-btn>
                    </router-link>

                </v-subheader>
                <v-list-item-group color="primary">
                    <v-list-item
                            v-for="(link_list,i) in links"
                            :key="i"
                            :to="link_list.url">
                        <v-list-item-icon left>
                            <v-icon :color="link_list.color">{{link_list.icon}}</v-icon>
                        </v-list-item-icon>
                        <v-list-item-content>
                            <v-list-item-title>
                            <v-tooltip bottom>
                                <template v-slot:activator="{ on, attrs }">
                                    <span v-bind="attrs"
                                          v-on="on">{{link_list.title}}</span>
                                </template>
                                <span>{{link_list.hint}}</span>
                            </v-tooltip>
                            </v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>
                </v-list-item-group>
            </v-list>
        </v-navigation-drawer>
        <v-app-bar
                app
                clipped-left>
            <v-app-bar-nav-icon @click="drawer = !drawer"
                                class="hidden-md-and-up"></v-app-bar-nav-icon>
            <v-toolbar-title>
                <v-icon left
                        color="red">mdi-store</v-icon>
                <router-link to="/"
                             tag="span"
                             class="pointer">
                    <v-tooltip bottom>
                    <template v-slot:activator="{ on, attrs }">
                        <span v-bind="attrs"
                              v-on="on">Market Ads</span>
                        <v-btn icon color="yellow accent-4" @click="changeTheme">
                            <v-icon>mdi-file-eye</v-icon>
                        </v-btn>
                    </template>
                    <span>От меня можно попасть домой</span>
                </v-tooltip>
                </router-link>
            </v-toolbar-title>
            <v-spacer></v-spacer>
            <v-toolbar-items class="hidden-sm-and-down">
                <v-btn v-for="(link_list,i) in links"
                       :key="i"
                       :to="link_list.url">
                    <v-icon left :color="link_list.color">{{link_list.icon}}</v-icon>
                    <v-tooltip bottom>
                        <template v-slot:activator="{ on, attrs }">
                            <span v-bind="attrs"
                                  v-on="on">{{link_list.title}}</span>
                        </template>
                        <span>{{link_list.hint}}</span>
                    </v-tooltip>
                </v-btn>
            </v-toolbar-items>
        </v-app-bar>
        <v-content>
            <TheFlashStatusError v-if="error"/>
            <TheFlashStatusSuccess v-if="status"/>
            <router-view></router-view>
        </v-content>
        <v-footer
                color="dark lighten-1"
                padless>
            <v-row
                    justify="center"
                    no-gutters>
                <v-col
                        class=" lighten-2 py-1 text-center white--text"
                        cols="14">
                    <a :href="footer_link_info.user_profile"
                       :target="footer_link_info.target">
                        <v-avatar>
                            <img :src="images_git_hub"
                                    alt="GitHub">
                        </v-avatar>
                    </a>
                </v-col>
            </v-row>
        </v-footer>
    </v-app>
</template>

<script>
    import TheFlashStatusError from "./components/FlashStatus/TheFlashStatusError";
    import TheFlashStatusSuccess from "./components/FlashStatus/TheFlashStatusSuccess";

    export default {
        name:'App',

        data: () => ({
            drawer: false,
            footer_link_info: {'user_profile': "https://github.com/BootleggerHigh", target: "_blank"},
            images_git_hub: require('./static/images/GitHub.png'),
        }),

        created() {
            this.$vuetify.theme.dark = true;
            if(this.$route.query['permission_denied'])
            {
                this.$store.dispatch('setError','Авторизуйся,хитрец');
            }
            else if(this.$route.query['double_auth_denied'])
            {
                this.$store.dispatch('setError','Зачем? Ты и так уже в аккаунте');
            }
            else if(this.$route.query['permission_edit_denied'])
            {
                this.$store.dispatch('setError','Никак не получиться изменить не свое объявление');
            }
            else if(this.$route.query['permission_buy_denied'])
            {
                this.$store.dispatch('setError','Смысл покупать собственное?');
            }
        },

        components: {
             TheFlashStatusError,
             TheFlashStatusSuccess,
        },
        methods :{
            changeTheme()
            {
                this.$vuetify.theme.dark = !this.$vuetify.theme.dark;
            }
        },

        computed: {
            error() {
                return this.$store.getters.error
            },

            status() {
                return this.$store.getters.status.status;
            },

            isUserLoggedIn() {
                return this.$store.getters.isUserLoggedIn;
            },

            links() {
                if (this.isUserLoggedIn) {
                    return [
                        {
                            title: 'Мои заказы',
                            hint:'Здесь содержатся все ваши заказы',
                            icon: 'mdi-basket',
                            color: 'yellow',
                            url: '/orders',
                        },
                        {
                            title: 'Создать объявление',
                            hint : 'Здесь можно создать новое  объявление',
                            icon: 'mdi-cart-plus',
                            color: 'orange',
                            url: '/new',
                        },
                        {
                            title: 'Все объявления',
                            hint : 'Здесь содержатся все объявления',
                            icon: 'mdi-cart-arrow-right',
                            color: 'purple',
                            url: '/list',
                        },
                        {
                            title: 'Мои объявления',
                            hint : 'Здесь содержатся все ваши объявления',
                            icon: 'mdi-clipboard-arrow-right',
                            color: 'light-green accent-3',
                            url: '/myAds',
                        },
                        {
                            title: 'Выйти',
                            hint : "От сюда можно выйти с аккаунта. Не покидайте нас на всегда :'( ",
                            icon: 'mdi-account-arrow-right',
                            color: 'red',
                            url:'/logout',
                        },
                    ]
                }
                else {
                    return [
                        {
                            title: 'Авторизация',
                            hint : "Заходите в аккаунт,получите больше вкусняшек :3",
                            icon: 'mdi-account-arrow-left',
                            color: 'green',
                            url: '/login',
                        },
                        {
                            title: 'Регистрация',
                            hint : "Мы тебя ждали :3",
                            icon: 'mdi-account-convert',
                            color: 'blue',
                            url: '/registration',
                        },
                    ]
                }
            }
        },
    }
</script>

<style scoped>
    .pointer {
        cursor: pointer;
    }
</style>