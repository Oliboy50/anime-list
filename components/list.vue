<template>

  <div class="component-list columns">
    <div class="column is-half is-offset-one-quarter has-text-centered">
      <item v-for="item in items" :key="item.id"
            :item="item"
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
  .component-list {
    .component-item {
      margin-bottom: 20px;
    }
  }
</style>
