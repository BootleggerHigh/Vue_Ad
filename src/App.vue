<template>
        <v-app>
                <v-navigation-drawer
                        v-model="drawer"
                        app
                        disable-resize-watcher
                >
                    <v-list shaped>
                        <v-subheader>Market Place</v-subheader>
                        <v-list-item-group color="primary">
                            <v-list-item
                                    v-for="(link_list,i) in links"
                            :key="i"
                            :to="link_list.url">
                                <v-list-item-icon left>
                                            <v-icon :color="link_list.color">{{link_list.icon}}</v-icon>
                                </v-list-item-icon>
                                <v-list-item-content>
                                    <v-list-item-title v-text="link_list.title"></v-list-item-title>
                                </v-list-item-content>
                            </v-list-item>
                        </v-list-item-group>
                    </v-list>
                </v-navigation-drawer>
                <v-app-bar
                        app
                        clipped-left
                >
                    <v-app-bar-nav-icon @click="drawer = !drawer" class="hidden-md-and-up"></v-app-bar-nav-icon>
                    <v-toolbar-title> <v-icon left color="red">mdi-store</v-icon>Market Place</v-toolbar-title>
                    <v-spacer></v-spacer>
                    <v-toolbar-items class="hidden-sm-and-down">
                        <v-btn   v-for="(link_list,i) in links"
                                 :key="i"
                                 :to="link_list.url">
                            <v-icon left :color="link_list.color">{{link_list.icon}}</v-icon>
                            {{link_list.title}}
                        </v-btn>
                    </v-toolbar-items>
                </v-app-bar>
                <v-content>
                    <v-container
                            class="fill-height"
                            fluid
                    >
                        <v-row
                                align="center"
                                justify="center"
                        >
                        </v-row>
                    </v-container>
                </v-content>

                <v-footer
                        color="dark lighten-1"
                        padless
                >
                    <v-row
                            justify="center"
                            no-gutters
                    >
                        <v-col
                                class=" lighten-2 py-1 text-center white--text"
                                cols="14"

                        >
                            <a :href="footer_link_info.user_profile" :target="footer_link_info.target">
                            <v-avatar>
                                <img
                                        :src="images_git_hub"
                                        alt="GitHub"
                                >
                            </v-avatar>
                        </a>
                        </v-col>
                    </v-row>
                </v-footer>
        </v-app>
</template>
<script>
    export default {
        data: () => ({
            drawer: false,
            footer_link_info: {'user_profile': "https://github.com/BootleggerHigh", target: "_blank"},
            images_git_hub: require('./static/images/GitHub.png'),
            links:[
                {
                  title:'Авторизация',
                  icon:'mdi-account-arrow-left',
                    color:'green',
                    url:'/login',
                },
                {
                    title:'Регистрация',
                    icon:'mdi-account-convert',
                    color:'blue',
                    url:'/registration',
                },
                {
                    title:'Мои заказы',
                    icon:'mdi-basket',
                    color:'yellow',
                    url:'/orders',
                },
                {
                    title:'Новые товары',
                    icon:'mdi-cart-plus',
                    color:'orange',
                    url:'/new',
                },
                {
                    title:'Мои товары',
                    icon:'mdi-cart-arrow-right',
                    color:'purple',
                    url:'/list',
                },
            ]
        }),

        created() {
            this.$vuetify.theme.dark = true
        },
    }
</script>