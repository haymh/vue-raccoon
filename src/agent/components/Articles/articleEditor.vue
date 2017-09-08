<template>
  <div>
    <v-flex>
      <v-text-field
        name="input-1-3"
        label="Title"
        v-model="articleTitle"
        @input.native="onTitleChange($event.target.value)"
      ></v-text-field>
    </v-flex>
    <quill-editor v-model="articleContent"
      ref="myQuillEditor"
      :options="editorOption"
      @change="onEditorChange($event)">
    </quill-editor>
  </div>
</template>
<style>
  .ql-container .ql-editor {
    min-height: 20em;
    padding-bottom: 1em;
  }
</style>
<script>
import { quillEditor } from 'vue-quill-editor';

export default {
  name: 'articleEditor',
  components: {
    quillEditor,
  },
  props: ['content', 'title'],
  data() {
    return {
      name: 'base-example',
      articleContent: this.content,
      articleTitle: this.title,
      editorOption: {
        placeholder: '输入任何内容或在上方输入URL生成文章',
      },
    };
  },
  watch: {
    content: {
      handler(val) {
        this.articleContent = val;
      },
    },
    title: {
      handler(val) {
        this.articleTitle = val;
      },
    },
  },
  methods: {
    onTitleChange(change) {
      this.$emit('titleChange', change);
    },
    onEditorChange(change) {
      this.$emit('contentChange', change.html);
    },
  },
};
</script>
