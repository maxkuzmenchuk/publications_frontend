<template>
  <div id="add-user-form">
    <form novalidate class="md-layout" :v-model="form"  @submit.prevent="addUser()">
      <md-card class="md-layout-item">
        <md-card-header>
          <div class="md-title">Add new user</div>
        </md-card-header>

        <md-card-content>
          <div class="md-layout md-gutter">
            <div class="md-layout-item">
              <md-field>
                <label for="username">Username</label>
                <md-input name="username" id="username" v-model="form.username" />
              </md-field>
            </div>
          </div>

            <div class="md-layout md-gutter">
              <div class="md-layout-item">
              <md-field>
                <label for="password">Password</label>
                <md-input name="password" id="password" v-model="form.password" />
              </md-field>
            </div>
          </div>

            <div class="md-layout md-gutter">
              <div class="md-layout-item">
              <md-field>
                <label for="authority">Authority</label>
                <md-select name="authority" id="authority" v-model="form.authorities.authority" md-dense>
                  <md-option value="ROLE_ADMIN">admin</md-option>
                  <md-option value="ROLE_USER">user</md-option>
                </md-select>
              </md-field>
            </div>
          </div>

            <div class="md-layout md-gutter">
              <div class="md-layout-item">
                  <md-checkbox name="enabled" id="enabled" type="checkbox" v-model="form.enabled" :checked="form.enabled">
                    Enabled
                  </md-checkbox>
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
name: "AddUser",
  data: () => ({
    showSnackbar: false,
    position: 'left',
    form: {
      username: null,
      password: null,
      enabled: true,
      authorities: {
        authority: null
      }
    },
    sending: false,
  }),
  methods: {
    addUser() {
      instance.post('/admin/users/save', this.form)
          .then(() => {
            this.showSnackbar = true;
            setTimeout(function () { location.href = '/admin/users'}, 1500);
          });
    },

  }
}
</script>

<style scoped>
#add-user-form {
  margin-left: auto;
  margin-right: auto;
  width: 50em;
}
</style>