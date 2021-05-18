<template>
  <v-app>
    <!-- header -->
    <Nav :user="user"></Nav>
    <v-main>
    
        <router-view></router-view>
        <!-- Display view pages here based on route -->
     
    </v-main>
  </v-app>
</template>

<script>
import Nav from "./components/Nav.vue";
import '../public/style.css';
export default {
  name: "app",
  components: {
    Nav,
  },
  data: () => {
    return {      
    };
  },
   computed:{
     user() {
       return this.$store.getters.user
     }
   },
   mounted() {
     this.$store.dispatch("getUsers");
     this.$store.dispatch("getUserById", this.user.id);
   }
  
};
</script>
<style>
</style>
