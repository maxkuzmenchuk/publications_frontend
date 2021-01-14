<template>
  <div id="edit-user-form">
    <form novalidate class="md-layout" :v-model="user"  @submit.prevent="saveUser(user.id)">
      <md-card class="md-layout-item md-size-100">
        <md-card-header>
          <div class="md-title">Edit profile</div>
        </md-card-header>

        <md-card-content>
          <div class="md-layout md-gutter">
            <div class="md-layout-item md-small-size-100">
              <md-field>
                <label for="username">Username</label>
                <md-input name="username" id="username" autocomplete="given-name" v-model="user.username"/>
              </md-field>
            </div>

            <div class="md-layout-item md-small-size-100">
              <md-field>
                <label for="password">Password</label>
                <md-input name="password" id="password" autocomplete="family-name" v-model="user.password"/>
              </md-field>
            </div>
          </div>

          <div class="md-layout md-gutter">
            <div class="md-layout-item ">
              <md-field>
                <label for="role">Role</label>
                <md-select name="role" id="role" v-model="user.role" md-dense>
                  <md-option value="ROLE_ADMIN">admin</md-option>
                  <md-option value="ROLE_USER">user</md-option>
                </md-select>
              </md-field>
            </div>
          </div>
        </md-card-content>

        <md-card-actions>
          <md-button class=" md-dense md-raised" :md-ripple="false" to="/admin/users">Admin Page</md-button>
          <md-button class="md-dense md-raised md-accent" @click="deleteUser(user.id)">Delete user</md-button>
          <md-button type="submit" class="md-dense md-raised md-primary">Save</md-button>
        </md-card-actions>
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

<!-- TODO: fix update user role -->


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
      id: String,
      username: String,
      password: String,
      role: String,
    },
    sending: false,
  }),
  mounted() {
    instance.get('/admin/show-user/' + this.$route.params.id)
        .then((resp) => {
          this.user = resp.data;
        });
  },
  methods: {
    saveUser(id) {
      this.user.role = JSON.parse(this.user.role);
      instance.post('/admin/update/' + id, this.user)
          .then(() => {
            this.showSnackbarUpdate = true;
          });
    },
    deleteUser(id) {
      if (confirm("Are you sure?")) {
        instance.post('/admin/delete/' + id)
            .then(() => {
              this.showSnackbarDelete = true;
            })
      }
    }
  }
}
</script>

<style scoped>
#edit-user-form {
  width: 100%;
}
</style>