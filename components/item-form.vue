<template>

  <form v-on:submit.prevent="onSubmit" class="component-item-form">

    <div class="field">
      <label for="component-item-form_title" class="label">Title</label>
      <div class="control">
        <input type="text" v-model="item.title" id="component-item-form_title" class="input" required>
      </div>
    </div>

    <div class="field">
      <label for="component-item-form_description" class="label">Description</label>
      <div class="control">
        <textarea v-model="item.description" id="component-item-form_description" class="textarea"></textarea>
      </div>
    </div>

    <div class="field">
      <label for="component-item-form_image" class="label">Image</label>
      <div class="control">
        <input type="text" v-model="item.image" id="component-item-form_image" class="input">
      </div>
    </div>

    <tags-selector v-if="itemTagsAreReadyToBeBound"
      v-model="item.tags"
      :all-tags="allTags"
      label-for-id="component-item-form_tags-select"
      class="field"
    />

    <div class="field is-grouped is-grouped-centered">
      <div class="control">
        <button type="submit" class="button is-primary">Submit</button>
      </div>
      <div class="control">
        <button type="button" v-on:click="onCancel" class="button is-link">Cancel</button>
      </div>
    </div>

  </form>

</template>

<script>
  import tagsSelector from '~/components/tags-selector.vue';
  import manager from '~/assets/js/model/item/firebase/manager';

  export default {
    components: {
      tagsSelector,
    },
    props: [
      'existingItem',
      'allTags',
    ],
    data () {
      return {
        item: {
          title: '',
          description: '',
          image: '',
          tags: [],
        },
        existingItemHasReplacedComponentItem: false,
      };
    },
    computed: {
      itemTagsAreReadyToBeBound () {
        return (this.existingItem) ? this.existingItemHasReplacedComponentItem : true;
      },
    },
    mounted () {
      // apply existing item properties
      if (this.existingItem) {
        ['title', 'description', 'image', 'tags'].forEach((key) => {
          if (this.existingItem[key]) {
            this.item[key] = this.existingItem[key];
          }
        });
        this.existingItemHasReplacedComponentItem = true;
      }
    },
    methods: {
      onSubmit () {
        if (this.existingItem) {
          manager.updateItem(this.existingItem.id, this.item);
        } else {
          manager.addItem(this.item);
        }
      },
      onCancel () {
        console.log('canceled');
      },
    },
  };
</script>
