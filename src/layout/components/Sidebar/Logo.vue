<template>
  <router-link key="collapse" class="sidebar-logo-link" to="/">
    <img src="@/assets/common/logoone.png" class="sidebar-logo">
  </router-link>

</template>

<script>
export default {
  name: 'SidebarLogo'
}
</script>

<style lang="scss" scoped>
.sidebar-logo{
  margin-top: 10px;
  margin-left: 15px;
  width: 88px;
}
</style>
