<template>
    <v-container class="fill-height"
                 fluid>
        <v-row
                align="center"
                justify="center">
            <v-col
                    cols="12"
                    sm="8"
                    md="5">
                <v-card class="elevation-12">
                    <v-toolbar
                            color="blue"
                            dark
                            flat>
                        <v-toolbar-title>Регистрация</v-toolbar-title>
                    </v-toolbar>
                    <v-card-text v-on:keyup.enter="onSubmit">
                        <v-form v-model="valid"
                                ref="form"
                                lazy-validation>
                            <v-text-field
                                    label="Почта"
                                    name="Email"
                                    prepend-icon="mdi-account"
                                    type="email"
                                    v-model="email"
                                    :rules="emailRules"
                                    required
                                    placeholder="example@example.com"
                            ></v-text-field>
                            <v-text-field
                                    label="Пароль"
                                    name="password"
                                    prepend-icon="mdi-lock"
                                    :type="show_glass ? 'text' : 'password'"
                                    v-model="password"
                                    :counter="25"
                                    :rules="passwordRules"
                                    required
                                    placeholder="rLiU6jPT9?"
                                    :append-icon="show_glass ? 'mdi-eye' : 'mdi-eye-off'"
                                    @click:append="show_glass = !show_glass"
                                    autocomplete="on"
                            ></v-text-field>
                            <v-text-field
                                    label="Повторите пароль"
                                    name="repeat_password"
                                    prepend-icon="mdi-lock"
                                    type="password"
                                    :rules="passwordRepeatRules"
                                    required
                                    placeholder="rLiU6jPT9?"
                                    autocomplete="on"
                            ></v-text-field>
                        </v-form>
                    </v-card-text>
                    <v-card-actions>
                        <v-spacer>
                            <p v-if="error"
                               key="error-message">Во время регистрации произошла ошибка :(</p>
                            <p v-else-if="loading"
                               key="loading-message">Пытаемся зарегистрировать :3</p>
                            <p v-else-if="user_auth"
                               key="success-registration">Успех :3</p>
                            <p v-else
                               key="text-support-enter">Мы поддерживаем Enter по форме :3</p>
                        </v-spacer>
                        <v-btn  @click="onSubmit"
                                :loading="loading"
                                :disabled="!valid ||loading"
                                color="blue">
                            Зарегистрироваться
                            </v-btn>
                    </v-card-actions>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
    export default {
        name: "AuthRegistration",

        data() {
            return {
                email: '',
                password: '',
                valid: false,
                show_glass: false,
                emailRules: [
                    v => !!v || 'Почта обязательна',
                    v => /.+@.+\..+/.test(v) || 'Почта не настоящая',
                ],

                passwordRules: [
                    v => !!v || 'Пароль обязателен',
                    v => (v && v.length >= 6) || "Пароль должен быть не менее 6-ти символов",
                    v => (v && v.length <= 25) || "Пароль должен быть не более 25-ти символов",
                ],

                passwordRepeatRules: [
                    v => !!v || 'Повтор пароля обязателен',
                    v => (v === this.password) || "Пароли не совпадают",
                ],
            }
        },

        methods: {
            /**
             *
             * @returns {Promise<void>}
             */
            async onSubmit() {
                if (this.$refs.form.validate()) {

                    const register_user = {
                        email: this.email,
                        password: this.password,
                    };
                    const success_register = {
                        status:true,
                        message:'Вы успешно зарегистрировались  :3',
                    };
                    try {
                        await this.$store.dispatch('registerUser', register_user)
                        await this.$store.dispatch('status_action', success_register)
                        await setTimeout(() => {
                            if (this.$route.path !== '/') this.$router.push('/');
                        }, 1500)
                    }
                    catch (e) {
                        await this.$store.dispatch('setError',e.message);
                    }
                }
            }
        },

        computed: {
            /**
             *
             * @returns {loading}
             */
            loading() {
                return this.$store.getters.loading;
            },
            /**
             *
             * @returns {errors}
             */
            error() {
                return this.$store.getters.error;
            },
            /**
             *
             * @returns Boolean user_auth
             */
            user_auth()
            {
                return this.$store.getters.isUserLoggedIn;
            }
        }
    }
</script>

<style scoped>

</style>