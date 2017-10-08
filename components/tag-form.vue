<template>

  <form v-on:submit.prevent="onSubmit" class="component-tag-form">

    <div class="field">
      <label for="component-tag-form_label" class="label">Label</label>
      <div class="control">
        <input type="text" v-model="tag.label" id="component-tag-form_label" class="input" required>
      </div>
    </div>

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
  import manager from '~/assets/js/model/tag/firebase/manager';

  export default {
    props: [
      'existingTag',
      'allTags',
    ],
    data () {
      return {
        tag: {
          label: '',
        },
      };
    },
    mounted () {
      // apply existing tag properties
      if (this.existingTag) {
        ['label'].forEach((key) => {
          if (this.existingTag[key]) {
            this.tag[key] = this.existingTag[key];
          }
        });
      }
    },
    methods: {
      onSubmit () {
        if (this.allTags.map(tag => tag.label).includes(this.tag.label)) {
          return;
        }

        if (this.existingTag) {
          manager.updateTag(this.existingTag.id, this.tag);
        } else {
          manager.addTag(this.tag);
        }
      },
      onCancel () {
        console.log('canceled');
      },
    },
  };
</script>
