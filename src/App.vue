<template>
  <div id="app">
		<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/bulma/0.2.3/css/bulma.min.css">
		<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.6.3/css/font-awesome.min.css">
    <div class="header">
      <div class="inner">
        <router-link to="/" exact>
          <img class="logo" src="./assets/logo.png" alt="logo">
        </router-link>
        <router-link to="/hello">Hello</router-link>
        <router-link to="/view1">View1</router-link>
        <router-link to="/chat">Chat</router-link>
				<router-link to="/listing">Listing</router-link>
      </div>
    </div>
    <transition name="fade" mode="out-in">
			<div style="margin:80px">
				<router-view class="view"></router-view>
			</div>
    </transition>
  </div>
</template>
<style>
body {
	font-family: Roboto, Helvetica, sans-serif;
	font-size: 15px;
	background-color: #f2f3f5;
	margin: 0;
	padding-top: 55px;
	color: #34495e;
}

a {
	color: #34495e;
	text-decoration: none;
}

.header {
	background-color: #1f1f1f;
	position: fixed;
	z-index: 999;
	top: 0;
	left: 0;
	right: 0;
}

.header .inner {
	max-width: 800px;
	box-sizing: border-box;
	margin: 0px auto;
	padding: 15px 5px;
}

.header a {
	color: rgba(255,255,255,0.8);
	line-height: 24px;
	transition: color 0.15s ease;
	display: inline-block;
	vertical-align: middle;
	font-weight: 300;
	letter-spacing: 0.075em;
	margin-right: 1.8em;
}

.header a:hover {
	color: #fff;
}

.header a.router-link-active {
	color: #fff;
	font-weight: 400;
}

.header a:nth-child(6) {
	margin-right: 0;
}

.header .github {
	color: #fff;
	font-size: 0.9em;
	margin: 0;
	float: right;
}

.logo {
	width: 24px;
	margin-right: 10px;
	display: inline-block;
	vertical-align: middle;
}

.view {
	max-width: 800px;
	margin: 0 auto;
	position: relative;
}

.fade-enter-active,
.fade-leave-active {
	transition: all 0.2s ease;
}

.fade-enter,
.fade-leave-active {
	opacity: 0;
}

@media (max-width: 860px) {
	.header .inner {
		padding: 15px 30px;
	}
}

@media (max-width: 600px) {
	body {
		font-size: 14px;
	}

	.header .inner {
		padding: 15px;
	}

	.header a {
		margin-right: 1em;
	}

	.header .github {
		display: none;
	}
}
</style>
<script>
export default {
  name: 'App',
};
</script>
