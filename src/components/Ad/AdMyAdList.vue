<template>
    <ViewAdListOrMyAdList :ad-list="my_ads">
    </ViewAdListOrMyAdList>
</template>

<script>
    import ViewAdListOrMyAdList from "../View/ViewAdListOrMyAdList";
    export default {
        name: "AdMyAdList",
        components: {ViewAdListOrMyAdList},

        computed:{
            my_ads()
            {
                return this.$store.getters.my_ads;
            }
        }
    }
</script>

<style scoped>

</style>