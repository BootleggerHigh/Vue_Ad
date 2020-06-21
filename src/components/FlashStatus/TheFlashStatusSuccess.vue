<template>
    <v-snackbar
            :multi-line="true"
            :top="true"
            :timeout="6000"
            color="success"
            :value="true"
            @input="onResetAuth">
        {{onMessage}}
        <v-btn
                dark
                text
                @click="onResetAuth">
            Закрыть
        </v-btn>
    </v-snackbar>
</template>

<script>
    export default {
        name: "TheFlashStatusSuccess",

        data() {
            return {
                reset_status_auth: {
                        status:false,
                        message:'',
                    }
            }
        },

        methods: {
            onResetAuth() {
                setTimeout(()=> this.$store.dispatch('status_action',this.reset_status_auth));
            }
        },

        computed: {
                onMessage() {
                    return this.$store.getters.status.message;
                }
            }
    }
</script>

<style scoped>

</style>