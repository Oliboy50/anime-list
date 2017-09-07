<template>

  <div class="columns">
    <div class="column is-half is-offset-one-quarter has-text-centered">
      <list-item v-for="item in items"
                 :title="item.title"
                 :image-url="item.imageUrl"
      />
    </div>
  </div>

</template>

<script>
  import listItem from '~/components/list-item.vue'
//  import axios from 'axios'

  export default {
    components: {
      listItem,
    },
    data () {
      return {
        items: [
          {id: 1, title: 'toto', imageUrl: 'http://bulma.io/images/placeholders/640x320.png'},
          {id: 2, title: 'titi', imageUrl: 'http://bulma.io/images/placeholders/640x320.png'},
        ],
      }
    },
  }
</script>
