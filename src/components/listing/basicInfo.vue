<template>
  <div id="basicInfo">
    <div class="basicInfoWrapper">
      <div id="price">$800,000</div>
      <div id="info">
        <div class="valueLabel">
          <div class="value">3</div>
          <div class="label">Beds</div>
        </div>
        <div class="valueLabel">
          <div class="value">2</div>
          <div class="label">Baths</div>
        </div>
        <div class="valueLabel">
          <div class="value">1,244</div>
          <div class="label">Sq.Ft.</div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.basicInfoWrapper {
  display: inline-block;
  font-family: serif;
  padding: 5px;
  margin: 10px;
}
#price {
  font-size: 30px;
  color: white;
}
.value {
  display: inline-block;
}
.label {
  display: inline-block;
}
.valueLabel {
  display: inline-block;
  border-right: solid white;
  border-right-width: 1px;
  color: white;
  padding-left: 3px;
  padding-right: 3px;
}
</style>

<script>
export default {
  name: 'BasicInfo',
  el: '#basicInfo',
};
</script>
