<template>

  <item-form
    :existing-item="existingItem"
    :allTags="tags"
  />

</template>

<script>
  import itemForm from '~/components/item-form.vue';
  import manager from '~/assets/js/model/item/firebase/manager';

  export default {
    components: {
      itemForm,
    },
    props: [
      'tags',
    ],
    async asyncData ({ route }) {
      return {
        existingItem: await manager.getItem(route.params.id),
      };
    },
  };
</script>
