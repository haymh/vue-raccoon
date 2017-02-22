<template>
  <div class="app-sidebar">
    <aside class="menu">
      <p class="menu-label">
        General
      </p>
      <ul class="menu-list">
        <li><a class="is-active">Dashboard</a></li>
        <li><a>Customers</a></li>
        <li><a>Share</a></li>
        <li><router-link to="/view1">View1</router-link></li>
        <li><router-link to="/chat">{{ $t('nav.chat') }}</router-link></li>
      </ul>
      <p class="menu-label">
        Articles
      </p>
      <ul class="menu-list">
        <li>
          <a>Real Estate</a>
          <ul>
            <li><a>Members</a></li>
            <li><a>Plugins</a></li>
            <li><a>Add a member</a></li>
          </ul>
        </li>
        <li>
          <a>American Life</a>
          <ul>
            <li><a>Members</a></li>
            <li><a>Plugins</a></li>
            <li><a>Add a member</a></li>
          </ul>
        </li>
        <li><a>Invitations</a></li>
        <li><a>Cloud Storage Environment Settings</a></li>
        <li><a>Authentication</a></li>
      </ul>
    </aside>
  </div>
</template>
<style>
.app-sidebar {
  position: fixed;
  top: 50px;
  left: 0;
  bottom: 0;
  padding: 20px 0 50px;
  width: 180px;
  min-width: 45px;
  max-height: 100vh;
  height: calc(100% - 50px);
  z-index: 1024 - 1;
  background: #FFF;
  box-shadow: 0 2px 3px rgba(17, 17, 17, 0.1), 0 0 0 1px rgba(17, 17, 17, 0.1);
  overflow-y: auto;
  overflow-x: hidden;
}
.menu {
  margin: 10px;
}
</style>
<script>
export default {
  name: 'SideBar',
};
</script>
