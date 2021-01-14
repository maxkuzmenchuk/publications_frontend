<template>
      <div id="tabs-admin">
        <md-tabs md-sync-route md-alignment="fixed">
          <md-tab id="tab-users" md-label="Users" to="/admin/users" exact></md-tab>
          <md-tab id="tab-publications" md-label="Publications" to="/admin/publications"></md-tab>
          <md-tab id="tab-orders" md-label="Orders" to="/admin/orders"></md-tab>
        </md-tabs>

        <div class="md-tabs-container">
          <router-view />
        </div>
      </div>
</template>

<script>


export default {
  name: "AdminPage"
}
</script>

<style scoped>
#tabs-admin {
  width: 100%;
}
</style>