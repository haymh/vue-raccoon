<template>
  <div id="detailInfo">
    <div class="detailInfoWrapper">
      <div class="title">
        南北双通透 精装三居室 好位置 仅有契税
      </div>
      <div class="location">
        <img class="locationIcon" src="./locationIcon.png"></img>
        <div class="locationText">830 azusa #65 Azusa, CA 91702</div>
      </div>
      <div class="amenities">
        <div class="leftColumn">
          <div class="leftUnorderedList">
            <li>$/Sq. Ft.: <b>$69</b></li>
            <li>Days Online: <b>1</b></li>
            <li>HOA: <b>None</b></li>
          </div>
        </div>
        <div class="rightColumn">
          <div class="rightUnorderedList">
            <li>Year Built: <b>2004</b></li>
            <li>Lot Size: <b>-</b></li>
            <li>Status: <b>Active</b></li>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.title {
  padding-top: 5px;
  padding-bottom: 5px;
  font-size: 20px;
  font-weight: bold;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.location {
  padding-top: 5px;
  padding-bottom: 5px;
  padding-left: 10px;
}
.locationIcon {
  display: inline-block;
  height: 15px;
}
.locationText {
  display: inline-block;
}
.leftUnorderedList {
  list-style-type: none;
}
.rightUnorderedList {
  list-style-type: none;
}
li {
  line-height: 30px;
  border-top-width: 1px;
  border-bottom: solid #e6e6e6;
  border-bottom-width: 1px;
}
.amenities {
  border-top: solid #e6e6e6;
  border-top-width: 1px;
}
.leftColumn {
  display: inline-block;
  width: 49%;
}
.rightColumn {
  display: inline-block;
  width: 49%;
}
.detailInfoWrapper {
  font-family: serif;
  color: #727272;
  margin: 5px;
}
</style>

<script>
export default {
  name: 'DetailInfo',
  el: '#detailInfo',
};
</script>
