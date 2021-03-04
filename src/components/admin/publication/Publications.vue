<template>
  <div id="publications-admin-page">
    <link href="https://fonts.googleapis.com/icon?family=Material+Icons"
          rel="stylesheet">
    <div id="admin-page">
      <admin-page/>
    </div>
    <div id="publications-admin-content" style="text-align: left">
      <md-table-toolbar>
        <h1 class="md-title" style="text-align: center"></h1>
        <md-button class="md-dense md-raised md-primary" to="/admin/publication/add">
          <md-icon>post_add</md-icon>
        </md-button>
      </md-table-toolbar>

      <div id="table">
        <md-table md-card>

          <md-table-row style="text-align: left">
            <md-table-head md-numeric>ID</md-table-head>
            <md-table-head>Name</md-table-head>
            <md-table-head>Price $</md-table-head>
            <md-table-head>Description</md-table-head>
            <md-table-head>Image</md-table-head>
            <md-table-head></md-table-head>
          </md-table-row>

          <md-table-row v-for="item of publications" v-bind:key="item.id">
            <md-table-cell md-label="ID" md-numeric>{{ item.id }}</md-table-cell>
            <md-table-cell md-label="Name">{{ item.name }}</md-table-cell>
            <md-table-cell md-label="Price $">{{ item.price }}</md-table-cell>

            <md-table-cell md-label="Description">
              <md-menu md-size="huge" md-align-trigger md-direction="bottom-end">
                <md-button class="md-raised" md-menu-trigger>
                  {{ item.name }} description
                </md-button>

                <md-menu-content>
                  <md-menu-item>
                    <p> {{ item.description }} </p>
                  </md-menu-item>
                </md-menu-content>
              </md-menu>
            </md-table-cell>

            <md-table-cell md-label="Image">
              <md-menu md-size="huge" md-align-trigger md-direction="bottom-end">
                <md-button class="md-raised" md-menu-trigger>
                  cover
                </md-button>

                <md-menu-content>
                  <md-menu-item>
                    <img v-bind:src="'data:image/jpeg;base64,' + item.cover" alt="cover"/>
                    <md-tooltip md-delay="300" md-direction="bottom">{{ item.imageName }}</md-tooltip>
                  </md-menu-item>
                </md-menu-content>
              </md-menu>
            </md-table-cell>

            <md-table-cell md-label="Description">
              <md-menu md-size="small" md-align-trigger>
                <md-button class="md-icon-button" md-menu-trigger>
                  <md-icon>expand_more</md-icon>
                </md-button>

                <md-menu-content>
                  <md-menu-item>
                    <md-button @click="toEditPublication(item.id)">
                      <span>Edit</span>
                      <md-icon>edit</md-icon>
                    </md-button>
                  </md-menu-item>

                  <md-menu-item>
                    <md-button class="md-accent" @click='deletePublication(item.id)'>
                      <span>Delete</span>
                      <md-icon>delete</md-icon>
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
  name: "Publications",
  components: {AdminPage},
  data: () => ({
    publications: undefined,
    showDescriptionDialog: false,
    showImageDialog: false,
    position: 'left'
  }),
  mounted() {
    instance.get('/publication/all',)
        .then((resp) => {
          this.publications = resp.data;
        });
  },
  methods: {
    deletePublication(id) {
      instance.post('/admin/publication/delete/' + id)
          .then(() => {
            location.reload();
          });
    },
    toEditPublication(id) {
      this.$router.push({path: `admin/publication/edit/${id}`});
    }
  }
}
</script>

<style scoped>
#publications-admin-page {
  text-align: center;
  width: 100%;
}

p {
  width: 100%;
  white-space: normal;
  word-wrap: break-word;
}

</style>