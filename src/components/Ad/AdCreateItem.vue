<template>
  <ViewFormCreateAndEditAdItem
          @ad-upload="OnUpload">
  </ViewFormCreateAndEditAdItem>
</template>

<script>
    import ViewFormCreateAndEditAdItem from "../View/ViewFormCreateAndEditAdItem";
    export default {
      name: "AdCreateItem",
      components: {
        ViewFormCreateAndEditAdItem
      },


      methods: {
        async OnUpload(ad_object) {
              const success_push = {
                  status: true,
                  message: 'Вы успешно добавили запись  :3',
              };
              const start_push = {
                  status: true,
                  message: 'Начинаем загрузку на облачный сервер.',
              };
              await this.$store.dispatch('status_action', start_push);
              await this.$store.dispatch('createdAd', ad_object);

              await setTimeout(() => {
                  if (this.$route.path !== '/') this.$router.push('/');
              }, 1500);
              await this.$store.dispatch('status_action', success_push);
          }
        },

      computed: {
        loading() {
          return this.$store.getters.loading;
        },
      },
    }
</script>

<style scoped>

</style>