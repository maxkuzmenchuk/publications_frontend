<template>
  <div id="publications-admin-page" >
    <div id="admin-page">
      <admin-page/>
    </div>
    <div id="admin-publications-content">
      <h1> PUBLICATIONS </h1>
    </div>

  </div>
</template>

<script>
import AdminPage from "@/components/admin/AdminPage";

export default {
  name: "Publications",
  components: {AdminPage},
}
</script>

<style scoped>
#publications-admin-page {
  text-align: center;
  width: 100%;
}
</style>