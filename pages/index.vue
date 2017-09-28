<template>

  <section class="section">
    <div class="container is-fluid">
      <list
        :items="$store.state.list.items"
      />
    </div>
  </section>

</template>

<script>
  import list from '~/components/list.vue';
  import { mapActions } from 'vuex';
  import { INITIALIZE_LIST, WATCH_LIST } from '~/assets/js/const/store/action-types';

  export default {
    components: {
      list,
    },
    mounted () {
      this.watch({ listId: 'Oliboy50List' });
    },
    methods: {
      ...mapActions({
        watch: WATCH_LIST,
      }),
    },
    async fetch ({ store }) {
      await store.dispatch(INITIALIZE_LIST, { listId: 'Oliboy50List' });
    },
  };
</script>
