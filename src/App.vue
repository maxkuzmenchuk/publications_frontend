<template>
  <div class="page-container">
    <link href="https://fonts.googleapis.com/icon?family=Material+Icons"
          rel="stylesheet">
    <md-app md-waterfall md-mode="fixed">
      <md-app-toolbar class="md-small md-dense md-primary">
        <div class="md-toolbar-row">
          <div class="md-toolbar-section-start">
            <md-button to='/catalog'><md-icon class="md-icon">bookmark_border</md-icon></md-button>
            <div>
              <md-button to="/catalog">
                <span>Catalog</span>
              </md-button>
              <md-button v-if="showAdminBoard()" id="tab-pages" to="/admin/users">Admin Page</md-button>

            </div>
          </div>

          <div class="md-toolbar-section-end">
            <md-menu md-size="small" md-align-trigger>
              <md-button md-menu-trigger><md-icon>portrait</md-icon></md-button>

              <md-menu-content>
                <md-menu-item v-if="user" @click="showDialog = true">profile</md-menu-item>
                <md-menu-item v-if="!user" @click="login()">login</md-menu-item>
                <md-menu-item v-if="user" @click="logout()">logout</md-menu-item>
              </md-menu-content>
            </md-menu>
          </div>
        </div>
      </md-app-toolbar>
    </md-app>

    <div class="md-tabs-container">
  <router-view class="router-position" />
  </div>

    <div v-if="user">
      <md-dialog :md-active.sync="showDialog">
        <md-dialog-title>Profile</md-dialog-title>

        <p>
          <strong>Username:</strong>
          {{ user.username}}
        </p>
        <p>
          <strong>Id:</strong>
          {{ user.id }}
        </p>
        <strong>Authorities:</strong>
        {{ user.role[0].authority }}

        <md-dialog-actions>
          <md-button class="md-primary" @click="showDialog = false">Close</md-button>
          <md-button class="md-primary" @click="showDialog = false">Save</md-button>
        </md-dialog-actions>
      </md-dialog>
    </div>

  </div>
</template>

<script>
import Vue from 'vue'
import  VueMaterial from 'vue-material'

Vue.use(VueMaterial);
export default {
  name: 'App',
  data: () => ({
      showDialog: false,
      user: undefined
  }),
  components: {},
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, PATCH, PUT, DELETE, OPTIONS",
    "Access-Control-Allow-Headers": "Origin, Content-Type, X-Auth-Token"
  },
  computed: {
    currentUser() {
      return this.user;
    }
  },
  mounted() {
    console.log(this.$store.state.auth.user);
      this.parseJwt(this.$store.state.auth.user);
  },
  methods: {
    showAdminBoard() {
      console.log(this.user);
      if (this.currentUser && this.currentUser.role[0]) {
        return this.user.role[0].authority.includes('ROLE_ADMIN');
      }

      return false;
    },
    logout() {
      this.$store.dispatch('auth/logout', this.user)
          .then(
              () => {
                location.reload();
                this.$router.push('/catalog').catch(()=>{});
              },
              error => {
                this.loading = false;
                this.message =
                    (error.response && error.response.data) ||
                    error.message ||
                    error.toString();
              }
          );
    },
  login() {
    this.$router.push("login");
  },
    parseJwt(token) {
        var base64Url = token.split('.')[1];
        var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        var jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
          return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));

        return this.user = JSON.parse(jsonPayload);
      }
    }
};
</script>

<style>
.router-position {
  text-align: center;
}
</style>
