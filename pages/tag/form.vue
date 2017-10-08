<template>

  <section class="section">
    <div class="container is-fluid">

      <nuxt-child :key="$route.params.id"
        :tags="tags"
      />

    </div>
  </section>

</template>

<script>
  import manager from '~/assets/js/model/tag/firebase/manager';

  export default {
    async asyncData () {
      return {
        tags: await manager.getTags(),
      };
    },
  };
</script>
