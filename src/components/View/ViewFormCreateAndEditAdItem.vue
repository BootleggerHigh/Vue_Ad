<template>
    <v-container>
        <v-layout row
                  flat>
            <v-flex xs12
                    sm6
                    offset-sm2>
                <v-card class="elevation-12">
                    <v-toolbar
                            color="orange"
                            dark
                            flat>
                        <v-toolbar-title class="mb-2 align-center"
                                         v-if="editModeComponent">Редактирование объявление </v-toolbar-title>
                        <v-toolbar-title class="mb-2 align-center"
                                         v-else> Форма для нового объявление</v-toolbar-title>
                    </v-toolbar>
                    <template>
                        <v-row justify="center">
                            <v-dialog v-model="checkbox"
                                      persistent
                                      max-width="290"
                                      v-if="dialog">
                                <v-card>
                                    <v-card-title class="headline error">Чутка требований</v-card-title>
                                    <v-card-text>
                                        Данный сайт чисто для портфолио,чтобы показать работодателю,что автор, хоть
                                        что-то умеет.
                                        <br>
                                        <br>
                                        Пожалуйста,не публикуйте всякие шишки,мишки,харкотину,наркотики(нелегальные),все
                                        в даркнет или на другие борды.
                                        <br>
                                        <br>
                                        Обнял :3
                                        <br>
                                        P. S. S. BootleggerHigh.
                                    </v-card-text>
                                    <v-card-actions>
                                        <v-spacer></v-spacer>
                                        <v-btn color="green darken-1"
                                               text @click="dialog = !dialog">
                                            Я - молодец
                                        </v-btn>
                                    </v-card-actions>
                                </v-card>
                            </v-dialog>
                        </v-row>
                    </template>
                    <v-form
                            v-model="valid"
                            ref="form"
                            lazy-validation
                            class="mb-3">
                        <v-text-field
                                v-on:keydown.enter.prevent=""
                                v-model="adCurrentData.title"
                                :counter="25"
                                :rules="titleRules"
                                label="Заголовок объявления"
                                name="title"
                                type="text"
                                placeholder="Продаю гараж"
                                required
                                class="mt-2"
                        ></v-text-field>
                        <v-textarea
                                v-model="adCurrentData.description"
                                :counter="100"
                                :rules="descriptionRules"
                                label="Описание объявления"
                                name="description"
                                type="text"
                                required
                                placeholder="Гараж в хорошем состоянии,самый лучший в мире"
                                hint="Пожалуйста,опишите в вкратце про ваше объявление"
                                class="mt-2"
                        ></v-textarea>
                        <v-switch
                                class="mt-1"
                                v-model="adCurrentData.promo"
                                :label="'Добавить в карусель'"
                                color="orange darken-4"
                        ></v-switch>
                        <v-checkbox
                                class="mt-1"
                                v-model="checkbox"
                                :rules="[v => !!v || 'Нужно поставить галочку :(']"
                                label="Я молодец"
                                required
                        ></v-checkbox>

                        <v-btn v-if="editModeComponent"
                               :disabled="!valid ||loading"
                               color="success"
                               class="mt-2 mr-2"
                               @click="onSaveEmit"
                               :loading="loading">
                            Изменить
                        </v-btn>
                        <v-btn v-if="editModeComponent"
                               color="primary"
                               class="mt-2 mr-2"
                               @click="onCloseForm"
                               :loading="loading">
                            Закрыть форму
                        </v-btn>
                        <v-btn v-else
                               :disabled="!valid ||loading"
                               color="success"
                               class="mt-2 mr-2"
                               @click="onUploadEmit"
                               :loading="loading">
                            Подтвердить
                        </v-btn>
                        <v-btn
                                :disabled="loading"
                                color="error"
                                class="mt-2 mr-2"
                                @click="reset"
                                :loading="loading">
                            Очистить форму
                        </v-btn>
                        <template>
                            <v-file-input
                                    class="mt-3"
                                    color="deep-purple accent-4"
                                    counter="10"
                                    @change="onFileUpload"
                                    label="Загрузить файл"
                                    multiple
                                    placeholder="К загрузке готов"
                                    prepend-icon="mdi-camera"
                                    outlined
                                    accept="image/png, image/jpeg, image/bmp"
                                    :rules="ImageRules"
                                    required
                                    clear-icon="Ок"
                                    :loading="loading"
                                    :show-size="1000">
                                <template v-slot:selection="{ index, text }">
                                    <v-chip
                                            v-if="index < 2"
                                            color="deep-purple accent-4"
                                            dark
                                            label
                                            small>
                                        {{ text }}
                                    </v-chip>
                                    <span
                                            v-else-if="index === 2"
                                            class="overline grey--text text--darken-3 mx-2">
                                        +{{ adCurrentData.src.length - 2 }} Файл(-ов)
                                    </span>
                                </template>
                            </v-file-input>
                        </template>
                        <v-carousel v-if="adCurrentData.src.length">
                            <v-carousel-item v-for="(image,i) of adCurrentData.src"
                                             :key="i"
                                             :src="image"
                                             touch
                                             reverse-transition="fade-transition">
                                <v-btn v-if="editModeComponent"
                                       outlined
                                       color="red"
                                       @click=" new OnRemoveImage(image)">
                                    <v-icon medium>mdi-close</v-icon>
                                </v-btn>
                                <v-btn v-else
                                       outlined
                                       color="red"
                                       @click="removeImage(image)">
                                    <v-icon medium>mdi-close</v-icon>
                                </v-btn>
                            </v-carousel-item>
                        </v-carousel>
                    </v-form>
                </v-card>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
    export default {
        //  Общий компонент для  других компонентов : AdEditItem,AdCreateItem
        name: "ViewFormCreateAndEditAdItem",

        props: {
            adCurrentData: {
                type: Object,
                default() {
                    return {
                        title: '',
                        description: '',
                        src: [],
                        promo: false,
                        image: []
                    }
                },
            },
            editModeComponent: {
                type: Boolean,
                default() {
                    return false
                },
            }
        },
        data() {
            return {
                valid: true,
                checkbox: false,
                dialog: true,

                titleRules: [
                    v => !!v || 'Заголовок обязателен',
                    v => (v && v.trim().length >= 5) || 'Заголовок должен быть не менее 5-ти символов',
                    v => (v && v.trim().length <= 25) || 'Заголовок должен быть не более 25-ти символов',
                ],

                descriptionRules: [
                    v => !!v || 'Описание обязательно',
                    v => (v && v.trim().length >= 10) || 'Описание должно быть не менее 10-ти символов',
                    v => (v && v.trim().length <= 100) || 'Описание должно быть не более 100-та символов',
                ],

                ImageRules: [
                     () => (this.adCurrentData.src.length >= 2) || 'Минимум 2 фотографии :(',
                     () => (this.adCurrentData.src.length <= 10) || 'Максимум 10-ть фотографий :(',
                ],
            }
        },

        methods: {
            reset() {
                this.$refs.form.reset();
            },

            onUploadEmit() {
                if (this.$refs.form.validate()) {
                    this.$emit('ad-upload', this.adCurrentData);
                }
            },

            onSaveEmit() {
                if (this.$refs.form.validate()) {
                    this.$emit('ad-save');
                }
            },

            onFileUpload(event) {
                event.forEach(image => {
                    const file = new FileReader();
                    file.onload = () => {
                        if (!this.adCurrentData.src.includes(file.result)) {
                            this.adCurrentData.src.push(file.result);
                        }
                            this.OnPushNewImageAndSource(file.result, image);
                            if (!this.editModeComponent) {
                                if (!this.adCurrentData.image.includes(image)) {
                                    this.adCurrentData.image.push(image);
                                }
                            }
                    }
                    file.readAsDataURL(image);
                });
            },

            removeImage(imageRemove) {
                this.adCurrentData.src.forEach((image, i) => {
                    if (image.includes(imageRemove)) {
                        this.adCurrentData.src.splice(i, 1);
                        this.adCurrentData.image.splice(i, 1);
                    }
                });
            },

            OnRemoveImage(image) {
                this.$emit('ad-remove-old-image', image);
            },

            onCloseForm() {
                this.$emit('form-close');
            },

            OnPushNewImageAndSource(imageSrc, file) {
                this.$emit('ad-source-new-image', imageSrc, file);
            }
        },

        computed: {
            loading() {
                return this.$store.getters.loading;
            }
        }
    }
</script>

<style scoped>

</style>