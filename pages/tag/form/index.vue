<template>

  <tag-form
    :allTags="tags"
  />

</template>

<script>
  import tagForm from '~/components/tag-form.vue';

  export default {
    components: {
      tagForm,
    },
    props: [
      'tags',
    ],
  };
</script>
