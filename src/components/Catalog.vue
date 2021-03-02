<template>
  <div>
    <p>CATALOG</p>

    {{ publication.id }}
    {{ publication.name }}
    {{ publication.price }}
    {{ publication.imageName }}
    {{ publication.description }}

  <div v-if="publication.cover != null">
    <img v-bind:src="'data:image/jpeg;base64,' + publication.cover" />
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
    publication: {
      id: null,
      name: null,
      price: null,
      imageName: null,
      description: true,
      cover: null
    }
  }),
  mounted() {
    instance.get('/publication/13')
        .then((resp) => {
          this.publication = resp.data;
        });
  }
}
</script>

<style scoped>

</style>