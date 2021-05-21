<template>
  <div fluid class="container">
             
          <div class="form">
           
            <form class="card text-center">
              <div class="signupform">
                <div>
            <h1 class="display-6">S'inscrire</h1>
          </div>
              <div>
              <label for="username"></label>
              <input 
                v-model="pseudo" type="text" placeholder="nom d'utilisateur" class="signup">
              </div>

              <div>
              <label for="inputEmail"></label>
              <input v-model="email" type="email" placeholder="email" class="signup" autocomplete="off">
              </div>

              <div>
              <label for="password"></label>
              <input v-model="password" type="password" placeholder="mot de passe" class="signup">
              </div>

              <div class="danger-alert message" v-html="errorMessage" />
          <div class="danger-alert message" v-html="message"></div>

          <div class="col-12">
             <button  v-on:click.prevent="signup" class="btn btn-primary btn-color" type="submit">S'inscrire</button>
         </div>
              </div>
            </form>
          </div>

  </div>
</template>

<script>
import Auth from "../Axios/Auth";
export default {
  name: "Register",
  data() {
    return {
      pseudo: "",
      email: "",
      password: "",
      errorMessage: null,
      message: null,
    };
  },
  methods: {
    async signup() {
      try {
        const response = await Auth.signup({
          pseudo: this.pseudo,
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
        }, 1500);
      } catch (error) {
        this.errorMessage = error.response.data.error;
        setTimeout(() => {
          this.errorMessage = "";
        }, 1500);
      }
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.signup{
  background-color: rgb(255, 248, 248);
 border: 0.5px rgba(0, 0, 0, 0.164) solid;
  border-radius: 10px;
  margin-bottom: 10px;
  padding: 10px;
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
  width: 10%;
}
.form{
  margin: auto;
}
.signupform{
  padding: 20px;
}
</style>