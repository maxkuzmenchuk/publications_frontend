<template>
  <div class="container">
    <header class="jumbotron">
      <h3>
        Profile
      </h3>
    </header>
    <p>
      <strong>Username:</strong>
      {{ user.username}}
    </p>
    <p>
      <strong>Id:</strong>
      {{ user.id }}
    </p>
    <strong>Authorities:</strong>
    {{ user.role.authority }}
    <ul>
      <li v-for="(role,index) in user.role" :key="index">{{ role.authority }}</li>
    </ul>
    <br>
    <button @click="catalog()">catalog</button>
  </div>
</template>

<script>
export default {
  name: 'Profile',
  data() {
    return {user: undefined}
  },
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    }
  },
  mounted() {
    if (!this.currentUser) {
      this.$router.push('/login');
    }
    this.parseJwt(this.currentUser);
  },
  methods: {
    parseJwt(token) {
      var base64Url = token.split('.')[1];
      var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      var jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      }).join(''));

      return this.user = JSON.parse(jsonPayload);
    },
    catalog() {
      this.$router.push('/catalog');
    }
  }
};
</script>

<style scoped>

</style>