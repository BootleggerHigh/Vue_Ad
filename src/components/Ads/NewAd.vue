<template>
    <v-container>
        <v-layout row flat>
            <v-flex xs12 sm6 offset-sm2>
                <v-card class="elevation-12">
                    <v-toolbar
                            color="orange"
                            dark
                            flat
                    >
                        <v-toolbar-title class="mb-2 align-center">Создать новое объявление</v-toolbar-title>
                    </v-toolbar>
                <v-form
                        ref="form"
                        v-model="valid"
                        lazy-validation
                        class="mb-3"
                >
                    <v-text-field
                            v-model="title"
                            :counter="25"
                            :rules="titleRules"
                            label="Заголовок объявления"
                            name="title"
                            type="text"
                            placeholder="Продаю гараж"
                            required
                    ></v-text-field>

                    <v-textarea
                            v-model="description"
                            :counter="100"
                            :rules="descriptionRules"
                            label="Описание объявления"
                            name="description"
                            type="text"
                            required
                            placeholder="Гараж в хорошем состоянии,самый лучший в мире"
                            hint="Пожалуйста,опишите в вкратце про ваше объявление"
                    ></v-textarea>
                    <v-switch
                            class="mt-1"
                            v-model="promo"
                            :label="'Добавить в карусель'"
                            color="orange darken-4"
                    ></v-switch>

                    <v-checkbox
                            class="mt-1"
                            v-model="checkbox"
                            :rules="[v => !!v || 'Нужно поставить галочку :(']"
                            label="Я молодец"
                            required
                    > </v-checkbox>

                    <v-btn
                            :disabled="!valid"
                            color="success"
                            class="mr-2"
                            @click="submit"
                    >
                        Подтвердить
                    </v-btn>

                    <v-btn
                            color="error"
                            class="mr-2"
                            @click="reset"
                    >
                        Очистить форму
                    </v-btn>
                    <v-btn
                            color="blue-grey mr-2 "
                    >
                        Загрузить изображение
                        <v-icon right dark>mdi-cloud-upload</v-icon>
                    </v-btn>
                </v-form>
                </v-card>
                <v-layout row mt-2>
                    <v-flex xs12>
                        <img src=""
                             height="120px" alt="image">
                    </v-flex>
                </v-layout>

            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
    export default {
        name: "NewAd",
        data ()
        {
            return{
                title:'',
                description:'',
                valid : false,
                checkbox: false,
                promo:false,
                titleRules:[
                    v=> !!v || 'Заголовок обязателен',
                    v=> (v && v.trim().length >= 5) || 'Заголовок должен быть не менее 5-ти символов',
                    v=> (v && v.trim().length <= 25) || 'Заголовок должен быть не более 25-ти символов',
                ],
                descriptionRules:[
                    v=> !!v || 'Описание обязательно',
                    v=> (v && v.trim().length >= 10) || 'Описание должно быть не менее 10-ти символов',
                    v=> (v && v.trim().length <= 100) || 'Описание должно быть не более 100-та символов',
                ],
            }
        },
        methods:{
            submit()
            {
                if(this.$refs.form.validate())
                {
                    const ad = {
                        title:this.title.trim(),
                        description : this.description.trim(),
                        promo:this.promo,
                        src:require('../../static/images/GitHub.png'),
                    }
                    this.$store.dispatch('createdAd',ad);
                }
            },
            reset()
            {
                this.$refs.form.reset();
            }
        }
    }
</script>

<style scoped>

</style>