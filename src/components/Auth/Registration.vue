<template>
    <v-container class="fill-height" fluid>
        <v-row
                align="center"
                justify="center"
        >
            <v-col
                    cols="12"
                    sm="8"
                    md="5"
            >
                <v-card class="elevation-12">
                    <v-toolbar
                            color="blue"
                            dark
                            flat
                    >
                        <v-toolbar-title>Регистрация</v-toolbar-title>
                    </v-toolbar>
                    <v-card-text>
                        <v-form v-model="valid" ref="form" lazy-validation>
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
                            ></v-text-field>
                            <v-text-field
                                    label="Повторите пароль"
                                    name="repeat_password"
                                    prepend-icon="mdi-lock"
                                    type="password"
                                    :rules="passwordRepeatRules"
                                    required
                                    placeholder="rLiU6jPT9?"
                            ></v-text-field>
                        </v-form>
                    </v-card-text>
                    <v-card-actions>
                        <v-spacer>
                            <p v-if="error">Во время регистрации произошла ошибка :(</p>
                            <p v-else-if="loading">Пытаемся зарегистрировать :3</p>
                        </v-spacer>
                        <v-btn  @click="onSubmit" :loading="loading"  :disabled="!valid ||loading" color="blue">
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
        name: "Registration",
        data() {
            return {
                email: '',
                password: '',
                valid: false,
                show_glass: false,
                success_auth:{
                    status:true,
                    message:'Вы успешно зарегистрировались  :3',
                },
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
            onSubmit() {
                if (this.$refs.form.validate()) {

                    const register_user = {
                        email: this.email,
                        password: this.password,
                    }
                    this.$store.dispatch('registerUser', register_user)
                        .then(()=> this.$store.dispatch('auth_status_action',this.success_auth) )
                            .then(()=> setTimeout(()=>this.$router.push('/'),1500))
                    .catch(()=>{})
                }
            }
        },
        computed: {
            loading() {
                return this.$store.getters.loading;
            },
            error() {
                return this.$store.getters.error;
            },
        }
    }
</script>

<style scoped>

</style>