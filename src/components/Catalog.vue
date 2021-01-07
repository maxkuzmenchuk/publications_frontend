<template>
  <div>
    <p>CATALOG</p>

    <div>
      <h1 class="md-title">Users</h1>
      <br>
      <ul>


        <li v-for="user of list" v-bind:key="user.id">
          {{ user.id }} -
          {{ user.username }} -
          {{ user.password }} -
          {{ user.role }} -
        </li>
      </ul>
    </div>
    <div>
      <button @click="logout()"> logout</button>
    </div>
  </div>
</template>

<script>
import Vue from 'vue';
import axios from 'axios';
import 'vue-material/dist/vue-material.min.css'
import 'vue-material/dist/theme/default.css'

import VueAxios from 'vue-axios';

Vue.use(VueAxios, axios)

const BASE_URL = 'http://localhost:9090';
const instance = axios.create({
  baseURL: BASE_URL,
  timeout: 1000,
  headers: {
    "Authorization": localStorage.getItem('token')
  }
});

export default {
  name: "Catalog",
  data() {
    return {list: undefined}
  },
  mounted() {
    instance.get('/admin/show-all',)
        .then((resp) => {
          this.list = resp.data;
        })
  },
  methods: {
    logout() {
      this.$store.dispatch('auth/logout', this.user)
          .then(
              () => {
                this.$router.push('/login');
              },
              error => {
                this.loading = false;
                this.message =
                    (error.response && error.response.data) ||
                    error.message ||
                    error.toString();
              }
          );
    }
  }
}
</script>

<style scoped>

</style>