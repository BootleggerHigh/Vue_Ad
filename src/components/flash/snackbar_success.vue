<template>
    <v-snackbar
            :multi-line="true"
            :top="true"
            :timeout="6000"
            color="success"
            :value="true"
            @input="onResetAuth"
    >
        {{onMessage}}
        <v-btn
                dark
                text
                @click="onResetAuth"
        >
            Закрыть
        </v-btn>
    </v-snackbar>
</template>

<script>
    export default {
        name: "snackbar_success",
        data()
        {
            return{
                reset_status_auth:
                    {
                        status:false,
                        message:'',
                    }
            }
        },
        methods:{
            onResetAuth()
            {
                setTimeout(()=> this.$store.dispatch('auth_status_action',this.reset_status_auth));

            }
        },
        computed:
            {
                onMessage()
                {
                    return this.$store.getters.auth_status.message;
                }
            }
    }
</script>

<style scoped>

</style>