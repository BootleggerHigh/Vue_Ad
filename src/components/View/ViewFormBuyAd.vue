<template>
    <v-row justify="center">
        <v-dialog v-model="dialog"
                  persistent max-width="600px">
            <v-card>
                <v-card-title>
                    <span class="headline">Заказ</span>
                </v-card-title>
                            <v-form
                                    v-model="valid"
                                    ref="form"
                                    lazy-validation>
                            <v-col cols="12">
                                <v-text-field
                                        type="text"
                                        v-model="name"
                                        label="Представьтесь"
                                        placeholder="Вася Пупкин"
                                        :rules="nameRules"
                                        :counter="20"
                                        required>
                                </v-text-field>
                            </v-col>
                            <v-col cols="12">
                                <v-text-field
                                        type="email"
                                        v-model="email"
                                        label="Ваша почта"
                                        :rules="emailRules"
                                        placeholder="(example@example.com)">
                                </v-text-field>
                            </v-col>
                            <v-col cols="12">
                                <vue-tel-input
                                              v-model="phone"
                                               placeholder="Ваш номер телефона (для связи)"
                                              @input="ValidationPhone"
                                               required>
                                </vue-tel-input>
                            </v-col>
                            <v-col cols="12">
                                <v-textarea
                                        type="text"
                                        v-model="description"
                                        :rules="descriptionRules"
                                        :counter="100"
                                        label="Примечание к покупке"
                                        hint="Здесь можно написать вопросы по объявлению,какие-либо детали."
                                        persistent-hint
                                        placeholder="(необязательно)"
                                ></v-textarea>
                            </v-col>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="orange"
                           @click="closeDialog">Закрыть</v-btn>
                    <v-btn :disabled="!valid ||loading"
                           color="success"
                           @click="OnSend"
                           :loading="loading">Отправить</v-btn>
                </v-card-actions>
                            </v-form>
                    </v-card>
        </v-dialog>
    </v-row>
</template>

<script>

    export default {
        name: "ViewFormBuyAd",
        data()
        {
            return {
                dialog : true,
                name : '',
                description :'',
                phone:'',
                email:'',
                valid:true,
                valid_phone : '',
                nameRules: [
                    v => !!v || 'Нужно представиться',
                    v => (v && v.trim().length >= 2) || 'Минимум 2 символа',
                    v => (v && v.trim().length <= 20) || 'Максимум 20 символов',
                ],
                descriptionRules : [
                    v => v.trim().length <= 100 || 'Максимум 100 символов',
                ],
                emailRules: [
                    v => /.+@.+\..+/.test(v) || 'Почта не настоящая',
                ],
            }
        },
        methods:{
            async OnSend() {
                if(this.$refs.form.validate() && this.valid_phone)
                {
                    await this.$store.dispatch('status_action',{status:true,
                                                                            message:'Отправляем ваш запрос'})
                    await  this.$store.dispatch('createOrder',{
                        name:this.name,
                        phone:this.phone,
                        adID:this.$router.history.current.params.id,
                        email:this.email,
                        description:this.description,
                        ownerId: this.AdInfo.ownerId,
                    });
                    await this.$store.dispatch('status_action',{status:true,
                        message:'Запрос отправлен'})
                    setTimeout(()=> {
                        this.dialog = !this.dialog;
                        this.$router.push(`/ad/${this.AdInfo.id}`);
                    },2000);
                }
                else {
                    await this.$store.dispatch('setError','Проверьте обязательные поля : Имя и номер телефона ');
                }
            },
            ValidationPhone(text,obj)
            {
                this.valid_phone=obj.isValid;
            },

            closeDialog()
            {
                this.dialog = false;
                this.$router.push(`/ad/${this.AdInfo.id}`);
            }
        },
        computed:{
            loading(){
                return this.$store.getters.loading;
            },
            AdInfo()
            {
                return this.$store.getters.ad_by_id(this.$router.history.current.params.id);
            }
        },
    }
</script>

<style scoped>
</style>