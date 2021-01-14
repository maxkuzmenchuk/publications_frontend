<template>
  <div id="add-user-form">
    <form novalidate class="md-layout" :v-model="form"  @submit.prevent="addUser()">
      <md-card class="md-layout-item md-size-100">
        <md-card-header>
          <div class="md-title">Add new user</div>
        </md-card-header>

        <md-card-content>
          <div class="md-layout md-gutter">
            <div class="md-layout-item md-small-size-100">
              <md-field>
                <label for="username">Username</label>
                <md-input name="username" id="username" autocomplete="given-name" v-model="form.username" />
              </md-field>
            </div>

            <div class="md-layout-item md-small-size-100">
              <md-field>
                <label for="password">Password</label>
                <md-input name="password" id="password" autocomplete="family-name" v-model="form.password" />
              </md-field>
            </div>
          </div>

          <div class="md-layout md-gutter">
            <div class="md-layout-item ">
              <md-field>
                <label for="role">Role</label>
                <md-select name="role" id="role" v-model="form.role" md-dense>
                  <md-option value="ROLE_ADMIN">ROLE_ADMIN</md-option>
                  <md-option value="ROLE_USER">ROLE_USER</md-option>
                </md-select>
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


// TODO: send role as enum

export default {
name: "AddUser",
  data: () => ({
    showSnackbar: false,
    position: 'left',
    form: {
      username: null,
      password: null,
      role: null,
    },
    sending: false,
  }),
  methods: {
    addUser() {
      instance.post('/admin/add', this.form)
          .then(() => {
            this.showSnackbar = true;
          });
    }
  }
}
</script>

<style scoped>
#add-user-form {
  width: 100%;
}
</style>