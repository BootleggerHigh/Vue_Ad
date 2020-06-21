<template>
    <v-container  class="fill-height"
                  fluid>
        <v-row
                align="center"
                justify="center">
                    <v-progress-linear
                            indeterminate
                            color="red"
                    ></v-progress-linear>
                    <br>
                    <v-progress-linear
                            indeterminate
                            color="orange"
                    ></v-progress-linear>
                    <br>
                    <v-progress-linear
                            indeterminate
                            color="yellow"
                    ></v-progress-linear>
                    <br>
                    <v-progress-linear
                            indeterminate
                            color="green"
                    ></v-progress-linear>
                    <br>
                    <v-progress-linear
                            indeterminate
                            color="cyan"
                    ></v-progress-linear>
                    <br>
                    <v-progress-linear
                            indeterminate
                            color="blue"
                    ></v-progress-linear>
                    <br>
                    <v-progress-linear
                            indeterminate
                            color="violet"
                    ></v-progress-linear>

            </v-row>
        <v-snackbar
                :multi-line="true"
                :top="true"
                :timeout="3000"
                color="primary"
                :value="true">
            Выход с аккаунта выполнен. Мы перенаправим вас на домашнюю страницу через 3 секунды :)
        </v-snackbar>
        </v-container>
</template>

<script>
    export default {
        name: "AuthLogout",

        async created() {
           await this.$store.dispatch('LogOut');
           await setTimeout(() => {
               if (this.$route.path !== '/') this.$router.push('/');
           }, 3000)

        },
    }
</script>

<style scoped>

</style>