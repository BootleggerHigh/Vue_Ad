<template>
    <v-snackbar
            :multi-line="true"
            :top="true"
            :timeout="6000"
            color="error"
            @input="closeError"
            :value="true">
        {{ error_message }}
        <v-btn
                dark
                text
                @click.native="closeError">
            Закрыть
        </v-btn>
    </v-snackbar>
</template>

<script>
    export default {
        name: "TheFlashStatusError",

        methods: {
            closeError() {
                this.$store.dispatch('clearError');
            },
        },

        computed: {
                error_message() {
                    return this.$store.getters.error;
                }
            }
    }
</script>

<style scoped>

</style>