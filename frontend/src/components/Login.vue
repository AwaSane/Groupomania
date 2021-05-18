<template>
  <div class="container ">
    

          <div class="form">
            <form class="card text-center">
              <div>
            <h1 class="display-6">Se connecter</h1>
          </div>
              <div class="loginform">

              <div>
              <label for="email"></label>
              <input
                v-model="email" type="email" placeholder="email" class="login">
              </div>

              <div>
              <label for="password"></label>
              <input v-model="password" type="password" placeholder="mot de passe" class="login">
              </div>

              <div class="danger-alert message" v-html="errorMessage" />
          <div class="danger-alert message" v-html="message" />
<router-link class="notlog" to="/signup">
              Vous n'etes pas encore inscrit?</router-link>
            <div class="col-12">
              

            <button class="btn btn-primary btn-color" v-on:click.prevent="login">Envoyer</button>
            </div>
              
              </div>
            </form>
</div>
          
  </div>
</template>

<script>
import Auth from "../Axios/Auth.js";
export default {
  name: "Login",
  data() {
    return {
      email: "",
      password: "",
      errorMessage: null,
      message: null,
    };
  },
  methods: {
    async login() {
      try {
        const response = await Auth.login({
          email: this.email,
          password: this.password,
        });
        this.message = response.data.message;
  
        this.$store.dispatch("setToken", response.data.token);
        this.$store.dispatch("setUser", response.data.user);
        this.$store.dispatch("getUserById", response.data.user.id);
        let router = this.$router;
        setTimeout(function() {
          router.push("/posts");
        }, 1000);
      } catch (error) {
        this.errorMessage = error.response.data.error;
        setTimeout(() => {
          this.email= "";
        this.password= "";
          this.errorMessage = "";
        }, 1000);
      }
    },
  },
};
</script>

<style>
.login{
  margin-bottom: 10px;
  background-color: rgb(255, 248, 248);
 border: 0.5px rgba(0, 0, 0, 0.164) solid;
 border-radius: 10px;
 padding: 8px;
}

.btn-color{
  background-color: rosybrown;
  border: rosybrown;
}

.container {
  display: flex;
  justify-content: center;
  align-items: center;
}

.imgAuth{
  width: 50%;
}
.form{
  margin: auto;
  width: 100%;
}
.loginform{
  padding: 20px;
}

</style>