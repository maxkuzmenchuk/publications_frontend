<template>
  <div id="edit-user-form">
    <form novalidate class="md-layout" :v-model="user" v-bind:id="user.id" @submit.prevent="saveUser()">
      <md-card class="md-layout-item">
        <md-card-header>
          <div class="md-title">Edit profile</div>
        </md-card-header>

        <md-card-content>
          <div class="md-layout md-gutter">
            <div class="md-layout-item">
              <md-field>
                <label for="username">Username</label>
                <md-input name="username" id="username" autocomplete="given-name" v-model="user.username"/>
              </md-field>
            </div>
          </div>

          <div class="md-layout md-gutter">
            <div class="md-layout-item">
              <md-field>
                <label for="password">Password</label>
                <md-input name="password" id="password" autocomplete="family-name" v-model="user.password"/>
              </md-field>
            </div>
          </div>

          <div class="md-layout md-gutter">
            <div class="md-layout-item">
              <md-field>
                <label for="authority">Authority</label>
                <md-select name="authority" id="authority" v-model="user.authorities[0].authority" md-dense>
                  <md-option value="ROLE_ADMIN">admin</md-option>
                  <md-option value="ROLE_USER">user</md-option>
                </md-select>
              </md-field>
            </div>
          </div>

          <div class="md-layout md-gutter">
            <div class="md-layout-item md-size-10">
              <md-checkbox name="enabled" id="enabled" type="checkbox" v-model="user.enabled" :checked="user.enabled">
                Enabled
              </md-checkbox>
            </div>
          </div>


        <md-card-actions>
          <div class="md-layout-item md-fab-bottom-right md-size-1500">
            <md-button class=" md-dense md-raised" :md-ripple="false" to="/admin/users">Admin Page</md-button>
            <md-button class="md-dense md-raised md-accent" @click="deleteUser(user.id)">Delete user</md-button>
            <md-button type="submit" class="md-dense md-raised md-primary">Save</md-button>
          </div>
        </md-card-actions>
        </md-card-content>
      </md-card>
    </form>

    <div id="edit-user-snackbar">
      <md-snackbar :md-position="position" :md-duration="1500" :md-active.sync="showSnackbarUpdate" md-persistent>
        <span>User {{ user.username }} updated</span>
      </md-snackbar>

      <md-snackbar :md-position="position" :md-duration="1500" :md-active.sync="showSnackbarDelete" md-persistent>
        <span>User {{ user.username }} deleted</span>
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
  name: "edit",
  data: () => ({
    showSnackbarUpdate: false,
    showSnackbarDelete: false,
    position: 'left',
    user: {
      id: null,
      username: null,
      password: null,
      enabled: true,
      authorities: {
        authority: null
      },
    },
    sending: false,
  }),
  mounted() {
    instance.get('/admin/users/edit/' + this.$route.params.id)
        .then((resp) => {
          this.user = resp.data;
        });
  },
  methods: {
    saveUser() {
      instance.post('/admin/users/save', this.user)
          .then(() => {
            this.showSnackbarUpdate = true;

            setTimeout(function () {
              location.href = '/admin/users'
            }, 1500);
          });
    },
    deleteUser(id) {
      if (confirm("Are you sure?")) {
        instance.post('/admin/users/delete/' + id)
            .then(() => {
              this.$router.push("/admin/users");
            });
      }
    }
  }
}
</script>

<style scoped>
#edit-user-form {
  margin-left: auto;
  margin-right: auto;
  width: 50em;
}

</style>