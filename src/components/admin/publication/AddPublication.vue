<template>
  <div id="add-publication-form">
    <form novalidate type="multipart/form-data" class="md-layout" @submit.prevent="savePublication()">
      <md-card class="md-layout-item">
        <md-card-header>
          <div class="md-title">Add new publication</div>
        </md-card-header>

        <md-card-content>
          <div class="md-layout md-gutter">
            <div class="md-layout-item">
              <md-field>
                <label for="name">Name</label>
                <md-input name="name" id="name" v-model="name"/>
              </md-field>
            </div>
          </div>

          <div class="md-layout md-gutter">
            <div class="md-layout-item">
              <md-field>
                <label for="description">Description</label>
                <md-textarea name="description" id="description" v-model="description" md-autogrow></md-textarea>
              </md-field>
            </div>
          </div>

          <div class="md-layout md-gutter">
            <div class="md-layout-item">
              <md-field>
                <label for="price">Price</label>
                <md-input name="price" id="price" v-model="price" type="number"/>
              </md-field>

              <md-field>
                <label for="image">Select cover</label>
                <md-file ref="image" id="image" type="file" @change="handleFileUpload($event)" accept="image/*"/>
              </md-field>
            </div>
          </div>
        </md-card-content>

        <md-card-actions>
          <md-button class=" md-dense md-raised" :md-ripple="false" to="/admin/users">Admin Page</md-button>
          <md-button type="submit" class="md-dense md-raised md-primary">Save</md-button>
        </md-card-actions>
      </md-card>
    </form>

    <div id="edit-user-snackbar">
      <md-snackbar :md-position="position" :md-duration="1500" :md-active.sync="showSnackbar" md-persistent>
        <span>User added successfully</span>
      </md-snackbar>
    </div>

  </div>
</template>

<script>
import axios from "axios";

const BASE_URL = 'http://localhost:9090';
const instance = axios.create({
  baseURL: BASE_URL,
  timeout: 1000,
  headers: {
    "Authorization": 'Bearer ' + localStorage.getItem('token')
  }
});

export default {
  name: "AddPublication",
  data: () => ({
    showSnackbar: false,
    position: 'left',
    // publication: {
    name: null,
    price: null,
    description: null,
    image: null,
    sending: false,
  }),
  methods: {
    savePublication() {
      let publication = new FormData();

      publication.append("name", this.name);
      publication.append("description", this.description);
      publication.append("price", this.price);
      publication.append('image', this.image, this.image.name);

      instance.post('/admin/publication/save', publication, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'charset': 'utf-8',
        }
      })
          .then(() => {
            this.showSnackbar = true;
            setTimeout(function () {
              location.href = '/admin/publications'
            }, 1500);
          });
    },
    handleFileUpload(event) {
      this.image = event.target.files[0];
    }
  }
}
</script>

<style lang="scss" scoped>
#add-publication-form {
  margin-left: auto;
  margin-right: auto;
  width: 50em;
}
</style>