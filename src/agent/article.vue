<template>
  <div>
    <div id="url-input">
      <input class="input" placeholder="输入文章 URL" type="url" v-model="url">
      <button class="button is-success" v-on:click="parse">Reader Mode</button>
    </div>
    <div class="box content" id="content">
      <div v-if="inProgress">Converting Article to Reader Mode...</div>
      <div v-if="!inProgress">
        <h3>{{ title }}</h3>
        <div v-html="content"></div>
      </div>
    </div>
  </div>
</template>

<style>

#url-input {
  width: 600px;
  margin: 5px 0px 5px 5px;
}


#content {
    width: 600px;
}
</style>

<script>
export default {
  name: 'article',
  data() {
    return {
      url: '',
      title: 'title placeholder',
      content: 'content placeholder',
      inProgress: false,
    };
  },
  methods: {
    parse() {
      this.reqData = {};
      this.reqData.url = this.url;
      console.log(this.url);
      this.inProgress = true;

      this.$http.post('https://us-central1-article-parser.cloudfunctions.net/articleParse', this.reqData).then((response) => {
        console.log(response);
        this.inProgress = false;

        this.title = response.body.title;
        this.content = response.body.content;
      }, (response) => {
        console.log(response);
      });
      console.log('returned');
    },
  },
};
</script>
