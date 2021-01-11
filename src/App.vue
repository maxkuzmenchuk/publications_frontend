<template>
  <div class="page-container">
    <md-app md-waterfall md-mode="fixed">
      <md-app-toolbar class="md-large md-dense md-primary">
        <div class="md-toolbar-row">
          <div class="md-toolbar-section-start">
            <span class="md-title">Publication Store</span>
          </div>

          <div class="md-toolbar-section-end">
            <md-menu md-size="small" md-align-trigger>
              <md-button md-menu-trigger>icon</md-button>

              <md-menu-content>
                <md-menu-item v-if="user" @click="showDialog = true">profile</md-menu-item>
                <md-menu-item v-if="!user" @click="login()">login</md-menu-item>
                <md-menu-item v-if="user" @click="logout()">logout</md-menu-item>
              </md-menu-content>
            </md-menu>
          </div>
        </div>

        <div class="md-toolbar-row">
          <md-tabs class="md-primary">
            <md-tab id="tab-home" md-label="Catalog" to="/catalog"></md-tab>
            <md-tab v-if="showAdminBoard()" id="tab-pages" md-label="Admin Page" to="/admin"></md-tab>
<!--            <md-tab id="tab-posts" md-label="Posts"></md-tab>-->
<!--            <md-tab id="tab-favorites" md-label="Favorites"></md-tab>-->
          </md-tabs>

        </div>
      </md-app-toolbar>
    </md-app>

    <div class="md-tabs-container">
  <router-view />
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
  data() {
    return {
      showDialog: false,
      user: undefined
    }
  },
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

</style>
