<template>
  <div>
    <div class="elevation">
      <div v-for="item of list" v-bind:key="item.id" class="md-elevation-24 viewport">

        <md-toolbar :md-elevation="1" style="height: max-content">
          <span class="md-title">{{ item.name }}
          <md-tooltip md-delay="300" md-direction="top">{{ item.name }}</md-tooltip>
            </span>
        </md-toolbar>

        <md-list class="md-double-line">
          <md-list-item>
            <md-card-media>
              <md-ripple>
                <img v-bind:src="'data:image/jpeg;base64,' + item.cover" alt="cover">
              </md-ripple>
            </md-card-media>
          </md-list-item>

          <md-card-expand>
              <md-card-expand-content>
                <md-card-content>
                  <p> {{ item.description }} </p>
                </md-card-content>
              </md-card-expand-content>
          </md-card-expand>

          <md-list-item>
            <span> {{ item.price }}$</span>
          </md-list-item>

        </md-list>

        <md-card-actions>
          <md-button class="md-icon-button">
            <md-icon>favorite</md-icon>
          </md-button>

          <md-button class="md-icon-button">
            <md-icon>add_shopping_cart</md-icon>
          </md-button>

          <md-button class="md-icon-button">
            <md-icon>share</md-icon>
          </md-button>
        </md-card-actions>
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

Vue.use(VueAxios, axios)

const BASE_URL = 'http://localhost:9090';
const instance = axios.create({
  baseURL: BASE_URL,
  timeout: 1000,
  headers: {
    "Authorization": 'Bearer ' + localStorage.getItem('token')
  }
});


export default {
  name: "Catalog",
  data: () => ({
    list: null
  }),
  mounted() {
    instance.get('/publication/all')
        .then((resp) => {
          this.list = resp.data;

          console.log(this.list);
        });
  }
}
</script>

<style lang="scss" scoped>

.elevation {
  padding: 16px;
  display: flex;
  flex-wrap: wrap;

}

.viewport {
  width: 300px;
  max-width: 100%;
  margin: 24px;
  display: inline-block;
  vertical-align: top;
  align-items: center;
  height: fit-content;
  justify-content: center;
  border: 1px solid rgba(#000, .12);
}

span {
  min-width: 60px;
  display: inline-block;
  text-align: center;
}

p {
  width: 100%;
  white-space: normal;
  word-wrap: break-word;
}
</style>