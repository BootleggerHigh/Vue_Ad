<template>
    <ViewAdListOrMyAdList :ad-list="my_ads">
    </ViewAdListOrMyAdList>
</template>

<script>
    import ViewAdListOrMyAdList from "../View/ViewAdListOrMyAdList";
    export default {
        components: {ViewAdListOrMyAdList},

        name: "AdMyAdList",


        computed:{
            /**
             *
             * @returns [my_ads]
             */
            my_ads()
            {
                return this.$store.getters.my_ads;
            }
        }
    }
</script>

<style scoped>

</style>