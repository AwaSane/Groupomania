<template>
  <nav>
    <v-app-bar light class="nav" >

        <router-link to="/posts" v-if="isConnected === true">
          <v-img class="logo"
            alt="Logo"
            to="/"
            :src="require('../assets/icon-left-font-monochrome-black.svg')"
            width="200"/>
        </router-link>

        <router-link to="/" v-if="isConnected === false">
          <v-img
          class="logo"
            alt="Logo"
            to="/"
            :src="require('../assets/icon-left-font-monochrome-black.svg')"
            width="200"/>
        </router-link>
      <v-spacer></v-spacer>
      
      <v-btn
        v-if="isConnected === false"
        to="/login"
        >Connexion</v-btn
      >
      

<div class="text-center " v-if="isConnected ===true">
    <v-menu offset-y >
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          color="pink darken-4"
          dark
          v-bind="attrs"
          v-on="on"
        >
          Menu
        </v-btn>
      </template>
      <v-list>
        <v-list-item class="wrap"> 
       
        <v-btn
      elevation="1"
        v-if="isConnected ===true"
        aria-label="profil"
        :to="`/profil/${user.id}`"
        >
        Profil
       </v-btn>
      

         <v-btn
         elevation="2"
      v-if="$store.state.connected"
      @click="logOut"
      to="/"
      ><i class="fas fa-power-off"></i></v-btn
    >
    
        </v-list-item>
      </v-list>
    </v-menu>
  </div>

    
    </v-app-bar>
  </nav>
</template>
<script>
export default {
  name: "Nav",
  props: {
    user: {
      type: Object,
    },
  },
  data() {
    return {};
  },
  computed: {
    isConnected() {
      return this.$store.getters.isConnected
    },
    connected() {
      if (this.$store.state.connected) {
        return "";
      } else {
        return "";
      }
    },
   
  },
  methods: {    
    getProfile(id) {
      this.$router.push(`/profil/${id}`);
    },
    logOut: function() {
      this.$store.dispatch("logOut");
    },
  },
};
</script>
<style>
.v-btn {
  margin-left: 5px;  
} 
.nav{

  padding-left: 9px;
  padding-right: 10px;
}

</style>