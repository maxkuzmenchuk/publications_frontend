<template>
  <div id="users-admin-page">
    <link href="https://fonts.googleapis.com/icon?family=Material+Icons"
          rel="stylesheet">
    <div id="admin-page">
      <admin-page/>
    </div>
    <div id="admin-users-content" style="text-align: center">
      <div id="table">
        <md-table md-card>
          <md-table-toolbar>
            <h1 class="md-title">Users</h1>
            <md-button class="md-dense md-raised md-primary" to="/admin/add-user">
              <md-icon>person_add</md-icon>
            </md-button>
          </md-table-toolbar>

          <md-table-row style="align-content: center">
            <md-table-head md-numeric>ID</md-table-head>
            <md-table-head>Name</md-table-head>
            <md-table-head>Password</md-table-head>
            <md-table-head>Role</md-table-head>
            <md-table-head></md-table-head>
          </md-table-row>

          <md-table-row v-for="user of list" v-bind:key="user.id">
            <md-table-cell md-label="ID" md-numeric>{{ user.id }}</md-table-cell>
            <md-table-cell md-label="Username">{{ user.username }}</md-table-cell>
            <md-table-cell md-label="Password">{{ user.password }}</md-table-cell>
            <md-table-cell md-label="Role">{{ user.role }}</md-table-cell>
            <md-table-cell md-label="">
              <md-menu md-size="small" md-align-trigger>
                <md-button class="md-icon-button" md-menu-trigger>
                  <md-icon>expand_more</md-icon>
                </md-button>

                <md-menu-content>
                  <md-menu-item>
                    <md-button @click="toEditUser(user.id)">
                      <span>Edit</span>
                      <md-icon>edit</md-icon>
                    </md-button>
                  </md-menu-item>

                  <md-menu-item>
                    <md-button class="md-accent" @click='deleteUser(user.id)'>
                      <span>Delete</span>
                      <md-icon>person_remove</md-icon>
                    </md-button>
                  </md-menu-item>
                </md-menu-content>
              </md-menu>
            </md-table-cell>
          </md-table-row>
        </md-table>
      </div>
    </div>
  </div>
</template>


<script>
import Vue from 'vue';
import axios from 'axios';
import 'vue-material/dist/vue-material.min.css'
import 'vue-material/dist/theme/default.css'


import VueAxios from 'vue-axios';
import Vuetify from 'vuetify'

import AdminPage from "@/components/admin/AdminPage";
import VueRouter from 'vue-router';

Vue.use(VueRouter, VueAxios, Vuetify, axios)

const BASE_URL = 'http://localhost:9090';
const instance = axios.create({
  baseURL: BASE_URL,
  timeout: 1000,
  headers: {
    "Authorization": 'Bearer ' + localStorage.getItem('token')
  }
});

export default {
  name: "UsersList",
  components: {AdminPage},

  data: () => ({
    list: undefined,
    showListSnackBarDelete: false,
    position: 'left'
  }),
  mounted() {
    instance.get('/admin/show-all',)
        .then((resp) => {
          this.list = resp.data;
        });
  },
  methods: {
    deleteUser(id) {
      instance.post('/admin/delete/' + id)
          .then(() => {
            location.reload();
          });
    },
    toEditUser(id) {
      this.$router.push({ path: `edit-user/${id}`});
    }
  }
}
</script>

<style scoped>
#users-admin-page {
  width: 100%;
}
</style>