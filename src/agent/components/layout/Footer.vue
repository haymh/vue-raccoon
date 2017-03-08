<template>
  <footer class="footer">
    <div class="container">
      <div class="content has-text-centered">
        <p class="social">
          <a :href="'https://github.com/'">
            <span class="icon">
              <i class="fa fa-github"></i>
            </span>
          </a>
          <a href="https://twitter.com/_fundon">
            <span class="icon">
              <i class="fa fa-twitter"></i>
            </span>
          </a>
        </p>
        <p><span class="icon"><i class="fa fa-code"></i></span> with <span class="icon"><i class="fa fa-heart"></i></span> by <a href="https://github.com/fundon">fundon</a>.</p>
        <p>Code licensed under.</p>
      </div>
    </div>
  </footer>
</template>
<script>
export default {
  name: 'AppFooter',
};
</script>
<style>
.footer {
  height: auto;
  margin-bottom: 10px;
}
</style>
