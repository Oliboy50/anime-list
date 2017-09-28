<template>

  <form v-on:submit.prevent="onSubmit" class="component-item-form">

    <div class="field">
      <label for="component-item-form_title" class="label">Title</label>
      <div class="control">
        <input type="text" v-model="item.title" id="component-item-form_title" class="input">
      </div>
    </div>

    <div class="field">
      <label for="component-item-form_imageUrl" class="label">Image URL</label>
      <div class="control">
        <input type="text" v-model="item.imageUrl" id="component-item-form_imageUrl" class="input">
      </div>
    </div>

    <div class="field is-grouped">
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
  import manager from '~/assets/js/model/item/firebase/manager';

  export default {
    props: [
      'existingItem',
    ],
    data () {
      return {
        item: {
          title: '',
          imageUrl: '',
        },
      };
    },
    mounted () {
      // apply existing item properties
      if (this.existingItem) {
        this.item.title = this.existingItem.title;
        this.item.imageUrl = this.existingItem.imageUrl;
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
