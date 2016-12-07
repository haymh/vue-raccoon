<template>
  <section class="hero is-primary is-fullheight header-image">
      <div class="hero-body">
        <div class="container has-text-centered">
          <h1 class="title is-2">
            Opps Something Went Wrong
          </h1>
          <h2 class="subtitle is-4">
            {{msg}}
          </h2>
        </div>
      </div>
    </section>
</template>

<script>
export default {
  name: 'ErrorPage',
  data() {
    return {
      msg: this.$route.params.msg,
    };
  },
};
</script>
