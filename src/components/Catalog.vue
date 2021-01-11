<template>
  <div>
    <p>CATALOG</p>
  </div>
</template>

<script>
import Vue from 'vue';
import axios from 'axios';
import 'vue-material/dist/vue-material.min.css'
import 'vue-material/dist/theme/default.css'

import VueAxios from 'vue-axios';

Vue.use(VueAxios, axios)

export default {
  name: "Catalog",
  // computed() {
    // location.reload();
  // }
}
</script>

<style scoped>

</style>