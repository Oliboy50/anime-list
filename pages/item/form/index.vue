<template>

  <item-form
    :allTags="tags"
  />

</template>

<script>
  import itemForm from '~/components/item-form.vue';

  export default {
    components: {
      itemForm,
    },
    props: [
      'tags',
    ],
  };
</script>
