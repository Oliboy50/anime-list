<template>

  <div class="component-tags-selector">
    <div class="field">
      <label :for="labelForId" class="label">Tags</label>
      <div v-if="!selectableTagTypes.length" class="notification">
        No more available tags
      </div>
      <div v-else="" class="field has-addons">
        <div class="control has-icons-left">
          <span class="select">
            <select v-model="selectedTagType" :id="labelForId" class="is-uppercase">
              <option v-for="tagType in selectableTagTypes" :value="tagType">
                {{ tagType }}
              </option>
            </select>
          </span>
          <div class="icon is-small is-left">
            <i class="fa fa-folder"></i>
          </div>
        </div>
        <div class="control has-icons-left is-expanded">
          <span class="select is-fullwidth">
            <select v-model="selectedTag">
              <option v-for="tag in selectableTags" :key="tag.id" :value="tag.id">
                {{ tag.label }}
              </option>
            </select>
          </span>
          <div class="icon is-small is-left">
            <i class="fa fa-tag"></i>
          </div>
        </div>
      </div>
    </div>

    <div v-for="tagType in uniqueSelectedTagsTypes" class="message is-small">
      <div class="message-header">
        <p class="is-uppercase">{{ tagType }}</p>
      </div>
      <div class="message-body">
        <div class="field is-grouped is-grouped-multiline">
          <div v-for="tag in getSelectedTagsByType(tagType)" :key="tag.id" class="control">
            <div class="tags has-addons">
              <span class="tag is-info">{{ tag.label }}</span>
              <a v-on:click="onRemoveTag(tag)" class="tag is-delete"></a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
  export default {
    props: [
      'value',
      'allTags',
      'labelForId',
    ],
    data () {
      return {
        selectedTagType: null,
      };
    },
    computed: {
      selectableTagTypes () {
        if (!this.allTags) {
          return [];
        }

        const uniqueSelectableTagTypes = [...new Set(
          this.allTags
            .map(tag => tag.type)
            .sort((a, b) => (a < b) ? -1 : ((a > b) ? 1 : 0))
        )];

        const uniqueSelectableTagTypesWithAtLeastOneSelectableTag = uniqueSelectableTagTypes.filter(type => {
          return this.allTags
            .filter(tag => tag.type === type)
            .filter(tag => !this.value.map(t => t.id).includes(tag.id))
            .length > 0
          ;
        });

        // If there is only 1 selectable tag type, automatically select it
        if (uniqueSelectableTagTypesWithAtLeastOneSelectableTag.length === 1) {
          this.selectedTagType = uniqueSelectableTagTypesWithAtLeastOneSelectableTag[0];
        }

        return uniqueSelectableTagTypesWithAtLeastOneSelectableTag;
      },
      selectableTags () {
        if (!this.allTags || !this.selectedTagType) {
          return [];
        }

        return this.allTags
          .filter(tag => tag.type === this.selectedTagType)
          .filter(tag => !this.value.map(t => t.id).includes(tag.id))
          .sort(this.sortTagsByLabel)
        ;
      },
      selectedTag: {
        get () {
          return null;
        },
        set (tagId) {
          const selectedTag = this.selectableTags.find(tag => tag.id === tagId);
          if (!selectedTag || this.value.find(tag => tag.id === tagId)) {
            return;
          }

          // If this is the last tag of its type, automatically select the next not empty tag type
          const selectableTagsOfThisType = this.allTags
            .filter(tag => tag.type === this.selectedTagType)
            .filter(tag => !this.value.map(t => t.id).includes(tag.id))
          ;
          if (selectableTagsOfThisType.length === 1) {
            const otherSelectableTypes = this.selectableTagTypes.filter(type => type !== this.selectedTagType);
            if (otherSelectableTypes) {
              this.selectedTagType = otherSelectableTypes[0];
            }
          }

          // Push selected tag
          this.value.push(selectedTag);
        },
      },
      uniqueSelectedTagsTypes () {
        return [...new Set(
          this.value
            .map(tag => tag.type)
            .sort((a, b) => (a < b) ? -1 : ((a > b) ? 1 : 0))
        )];
      },
    },
    mounted () {
      // By default, we select the first type which has at least one tag
      this.selectedTagType = this.selectableTagTypes ? this.selectableTagTypes[0] : null;
    },
    methods: {
      onRemoveTag (tag) {
        this.$emit('input', this.value.filter(t => t.id !== tag.id));
      },
      getSelectedTagsByType (type) {
        return this.value
          .filter(tag => tag.type === type)
          .sort(this.sortTagsByLabel)
        ;
      },
      sortTagsByLabel (a, b) {
        return (a.label < b.label) ? -1 : ((a.label > b.label) ? 1 : 0);
      },
    },
  };
</script>

<style lang="scss">
  .component-tags-selector {
    .message {
      margin-bottom: .75rem;
    }
  }
</style>
