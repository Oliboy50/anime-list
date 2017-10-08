<template>

  <tag-form
    :existing-tag="existingTag"
    :allTags="tags"
  />

</template>

<script>
  import tagForm from '~/components/tag-form.vue';
  import manager from '~/assets/js/model/tag/firebase/manager';

  export default {
    components: {
      tagForm,
    },
    props: [
      'tags',
    ],
    async asyncData ({ route }) {
      return {
        existingTag: await manager.getTag(route.params.id),
      };
    },
  };
</script>
