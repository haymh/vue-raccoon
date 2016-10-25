<template>
<div class="wrap container-fluid">
  <div class="row">
    <div class="col-xs-6
                col-sm-6
                col-md-6
                col-lg-6
                ">
      <div class="map-container" style="background-color:red"><el-button @click.native="scrollTo">click</el-button></div>
    </div>
    <div class="col-xs-6
                col-sm-6
                col-md-6
                col-lg-6">
      <div id="list" class="list-container" style="background-color:blue">
        <div v-for="i in 40" class="text item">
          <el-card class="box-card">
              <div v-for="o in 4" class="text item">
                {{'列表内容 ' + i }}
              </div>
            </el-card>
        </div>
      </div>
    </div>
  </div>
</div>
</template>
<style>
.map-container,.list-container {
  height: calc(100vh - 65px);
  padding: 0;
  margin: 0;
}
.list-container {
  overflow: hidden;
  overflow-y: scroll;
}
.box-card {
  height: 100px;
}

</style>
<script>

export default {
  name: 'main',
  data() {
    return {
      position: 0,
    };
  },
  components: {
  },
  methods: {
    scrollTo() {
      /* eslint-disable no-undef */
      document.getElementById('list').scrollTop = 20 * 100;
    },
  },
};
</script>
