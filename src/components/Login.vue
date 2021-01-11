<template>
  <div>

    <h1> LOGIN</h1>
    <br>

    <form name="form" @submit.prevent="handleLogin">
      <div class="form-group">
        <label for="username">Username</label>
        <input
            v-model="user.username"
            v-validate="'required'"
            type="text"
            class="form-control"
            name="username"
        />
        <div
            v-if="errors.has('username')"
            class="alert alert-danger"
            role="alert"
        >Username is required!</div>
      </div>
      <div class="form-group">
        <label for="password">Password</label>
        <input
            v-model="user.password"
            v-validate="'required'"
            type="password"
            class="form-control"
            name="password"
        />
        <div
            v-if="errors.has('password')"
            class="alert alert-danger"
            role="alert"
        >Password is required!</div>
      </div>
      <div class="form-group">
        <button class="btn btn-primary btn-block" :disabled="loading">
          <span v-show="loading" class="spinner-border spinner-border-sm"></span>
          <span>Login</span>
        </button>
      </div>
      <div class="form-group">
        <div v-if="message" class="alert alert-danger" role="alert">{{message}}</div>
      </div>
    </form>
  </div>
</template>

<script>
import User from "@/model/user";

export default {
  name: "Login",
  data() {
    return {
      user: new User('', ''),
      loading: false,
      message: ''
    };
  },
  computed: {
    loggedIn() {
      return this.$store.state.auth.status.loggedIn;
    },
    created() {
      if (this.loggedIn) {
        // eslint-disable-next-line vue/no-side-effects-in-computed-properties
        this.$router.push('/catalog')
      }
      return 0;
    }
  },
  methods: {
    handleLogin() {
      this.loading = true;
      this.$validator.validateAll()
          .then(isValid => {
        if (!isValid) {
          this.loading = false;
          return;
        }

        if (this.user.username && this.user.password) {
          this.$store.dispatch('auth/login', this.user)
              .then(
              () => {
                this.$router.push('/catalog');
                location.reload();
              },
              error => {
                this.loading = false;
                this.message =
                    (error.response && error.response.data) ||
                    error.message ||
                    error.toString();

                if (error.response.status === 401) {
                  alert('Invalid credentials');
                  this.message = '';
                }
              }
          );
        }
      });
    }
  }
}
</script>

<style scoped>

</style>