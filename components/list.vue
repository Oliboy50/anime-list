<template>

  <div class="component-list columns">
    <div class="column is-half is-offset-one-quarter has-text-centered">
      <item v-for="item in items" :key="item.id"
            :id="item.id"
            :title="item.title"
      />
    </div>
  </div>

</template>

<script>
  import item from '~/components/item.vue';

  export default {
    components: {
      item,
    },
    props: [
      'items',
    ],
  };
</script>

<style lang="scss">
  .component-item {
    margin-bottom: 20px;
  }
</style>
