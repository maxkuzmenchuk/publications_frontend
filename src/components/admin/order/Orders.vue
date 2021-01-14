<template>
  <div id="orders-admin-page">
    <div id="admin-page">
      <admin-page />
    </div>
    <div id="admin-orders-content">
      <h1> ORDERS </h1>
    </div>
  </div>
</template>

<script>
import AdminPage from "@/components/admin/AdminPage";

export default {
  name: "Orders",
  components: { AdminPage }
}
</script>

<style scoped>
#orders-admin-page {
  text-align: center;
  width: 100%;
}
</style>