<template>
    <v-dialog v-model="dialog"
              persistent
              fullscreen hide-overlay
              transition="dialog-bottom-transition">
        <ViewFormCreateAndEditAdItem
                      :ad-current-data="close_form"
                      @form-close="formClose"
                      @ad-remove-old-image="OnRemoveOldImage"
                      @ad-source-new-image="OnUploadNewImageAndSource"
                      @ad-save="onSave"
                      :edit-mode-component=true>
        </ViewFormCreateAndEditAdItem>
    </v-dialog>
</template>

<script>
    import ViewFormCreateAndEditAdItem from "../View/ViewFormCreateAndEditAdItem";

    export default {
        name: "AdEditItem",
        components: {
            ViewFormCreateAndEditAdItem
        },

        props: {
            id: {
                required: true,
            }
        },

        data() {
            return {
                dialog: true,
                upload_new_image :[],
                source_new_image : [],
                close_form : {},
            };
        },

        methods: {
            async onSave() {
                this.close_form.images = this.upload_new_image;
                const success_push = {
                    status: true,
                    message: 'Вы успешно обновили запись  :3',
                }
                const success_update = {
                    status: true,
                    message: 'Записи обновляются,ждём :3',
                }
                await this.$store.dispatch('status_action', success_update);
                await this.$store.dispatch('updateAd', this.close_form);
                this.dialog = false;
                await this.$router.push(`/ad/${this.id}`);
                await this.$store.dispatch('status_action', success_push);

            },

            OnRemoveOldImage(imageRemove) {
                if(imageRemove.includes("data:image/"))
                {
                    this.source_new_image.forEach((image,i)=> {
                       if(image.includes(imageRemove))
                       {
                           this.upload_new_image.splice(i,1);
                       }
                    });
                }
                    this.close_form.src.forEach((image,i)=> {
                        if(image.includes(imageRemove))
                        {
                            this.close_form.src.splice(i,1);
                        }
                    });
                },

            OnUploadNewImageAndSource(imageSrc,image) {
                this.source_new_image.push(imageSrc);
                this.upload_new_image.push(image);
            },

            formClose() {
                    this.dialog = !this.dialog;
                    this.$router.push(`/ad/${this.id}`);
                },
        },

        computed: {
            loading() {
                return this.$store.getters.loading;
            },
            adData() {
                return this.$store.getters.ad_by_id(this.id);
            }
        },
        created() {
            this.close_form = Object.assign({}, this.adData);
        }
    }
</script>

<style scoped>

</style>