<template>
    <ViewAdListOrMyAdList :ad-list="all_ads"
                            :full-ads="true">
    </ViewAdListOrMyAdList>
</template>

<script>
    import ViewAdListOrMyAdList from "../View/ViewAdListOrMyAdList";
    export default {
        components: {ViewAdListOrMyAdList},
        name: "AdList",

        computed: {
            /**
             *
             * @returns [all_ads]
             */
            all_ads() {
                return this.$store.getters.ads;
            },
        },
    };
</script>

<style scoped>

</style>