<template>

  <item-form
      :existing-item="existingItem"
  />

</template>

<script>
  import itemForm from '~/components/item-form.vue';
  import manager from '~/assets/js/model/item/firebase/manager';

  export default {
    components: {
      itemForm,
    },
    async asyncData ({ route }) {
      return {
        existingItem: await manager.getItem(route.params.id),
      };
    },
  };
</script>
