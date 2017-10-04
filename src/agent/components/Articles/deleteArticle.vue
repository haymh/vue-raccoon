<template>
      <v-dialog v-model="dialog" v-if="!user.isTemp" lazy absolute>
        <v-btn icon slot="activator">
          <v-icon>delete</v-icon>
        </v-btn>
        <v-card>
          <v-card-title>
            <div class="headline">确定要删除文章么？</div>
          </v-card-title>
            <h4>文章删除后无法撤回。</h4>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn class="green--text darken-1" flat="flat" @click.native="dialog = false">Disagree</v-btn>
            <v-btn class="green--text darken-1" flat="flat" @click.native="deleteArticle">Agree</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
</template>
<script>
import { mapGetters } from 'vuex';
import API from '../../../api';

export default {
  name: 'deleteArticle',
  props: {
    articleInfo: Object,
  },
  data() {
    return {
      dialog: false,
    };
  },
  computed: {
    ...mapGetters([
      'user',
    ]),
  },
  methods: {
    deleteArticle() {
      console.log('articleInfo for delete', this.articleInfo);
      API.deleteArticle({ articleId: this.articleInfo._id })
        .then((response) => {
          console.log('delete article racoon', response);
          const reqData = { fileName: this.articleInfo.storageName };
          this.$http.post('https://us-central1-article-parser.cloudfunctions.net/deleteArticle', reqData).then((res) => {
            console.log('article parsed: ', res);
            this.dialog = false;
            this.$store.dispatch('deleteArticleInfo', this.articleInfo);
          });
        });
    },
  },
};
</script>
