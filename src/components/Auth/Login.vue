<template>
    <v-container  class="fill-height" fluid>
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
                            color="green"
                            dark
                            flat
                    >
                        <v-toolbar-title>Авторизация</v-toolbar-title>
                    </v-toolbar>
                    <v-card-text>
                        <v-form v-model="valid" ref="form" lazy-validation>
                            <v-text-field
                                    label="Email"
                                    name="Почта"
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
                                    placeholder="bz@#jSujOp"
                                    :append-icon="show_glass ? 'mdi-eye' : 'mdi-eye-off'"
                                    @click:append="show_glass = !show_glass"
                            ></v-text-field>
                        </v-form>
                    </v-card-text>
                    <v-card-actions>
                        <v-spacer>
                            <p v-if="error">Во время авторизации произошла ошибка :(</p>
                            <p v-else-if="loading">Пытаемся авторизовать :3</p>
                        </v-spacer>
                        <v-btn color="green"
                        @click="onSubmit" :disabled="!valid||loading" :loading="loading"> Войти</v-btn>
                    </v-card-actions>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
    export default {
        name: "Login",
        data() {
            return {
                email:'',
                password:'',
                valid:false,
                show_glass:false,
                success_auth:{
                    status:true,
                    message:'Вы успешно авторизовались  :3',
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
            }
        },
        methods:{
            onSubmit(){
                if(this.$refs.form.validate())
                {
                    const auth_user = {
                        email:this.email,
                        password : this.password,
                    }
                    this.$store.dispatch('authUser', auth_user)
                        .then(()=> this.$store.dispatch('auth_status_action',this.success_auth) )
                        .then(()=> setTimeout(()=>this.$router.push('/'),1500))
                        .catch(()=>{})
                }
            },
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