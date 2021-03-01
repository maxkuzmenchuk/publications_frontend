<template>
  <div id="registration-page">
    <form novalidate class="md-layout" @submit.prevent="handleRegister">
      <md-card class="md-layout-item ">
        <md-card-header>
          <div class="md-title">Registration</div>
        </md-card-header>

        <md-card-content>
          <div class="md-layout md-gutter">
            <div class="md-layout-item">
              <md-field>
                <label for="username">Username</label>
                <md-input name="username" id="username" autocomplete="username" v-model="user.username"
                          :disabled="sending"/>
                <span class="md-error" v-if="errors.has('username')">The first name is required</span>
              </md-field>
            </div>
          </div>

          <div class="md-layout md-gutter">
            <div class="md-layout-item">
              <md-field>
                <label for="password">Password</label>
                <md-input name="password" id="password" autocomplete="password" v-model="user.password"
                          :disabled="sending"/>
                <span class="md-error" v-if="errors.has('password')">Password is required</span>
              </md-field>
            </div>
          </div>
        </md-card-content>

        <md-progress-bar md-mode="indeterminate" v-if="sending"/>

        <md-card-actions>
          <md-button type="submit" class="md-dense md-raised md-primary" :disabled="sending">Submit</md-button>
        </md-card-actions>
      </md-card>
    </form>

    <div id="login-link">
      <span>Already have an account? Login <router-link to="/login">here</router-link></span>
    </div>
  </div>
</template>

<script>
import User from './model/user';

export default {
  name: 'Register',
  data() {
    return {
      user: new User('', '', ''),
      message: '',
      sending: false,
      showSnackbar: false
    };
  },
  computed: {
    loggedIn() {
      return this.$store.state.auth.status.loggedIn;
    }
  },
  mounted() {
    if (this.loggedIn) {
      this.$router.push('/catalog');
    }
  },
  methods: {
    handleRegister() {
      this.sending = true;
      this.message = '';
      this.$validator.validate().then(isValid => {
        if (isValid) {
          this.$store.dispatch('auth/register', this.user).then(
              data => {
                this.message = data.message;
                this.sending = false;
                this.$store.dispatch('auth/login', this.user)
                    .then(
                        () => {
                          this.sending = false;
                          this.showSnackbar = true;
                          this.$router.push('/catalog');
                          location.reload();
                        },
                        error => {
                          this.message =
                              (error.response && error.response.data) ||
                              error.message ||
                              error.toString();
                        });
              });
        }
      });
    }
  }
};
</script>

<style scoped>
#registration-page {
  margin-left: auto;
  margin-right: auto;
  width: 30em;
}
</style>