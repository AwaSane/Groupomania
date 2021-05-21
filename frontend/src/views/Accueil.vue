<template>
    <div class="set d-flex">
      <div class="intro">
      <p class="title">Bienvenue sur le nouveau réseau social d’entreprise </p>
      <p class="txt">Ce réseau social est un outil de communication qui relie 
          tous les membres de votre entreprise, même les personnes 
          travaillant à distance. Utilisez des fonctionnalités familières 
          telles que la publication et la discussion pour favoriser la communication et 
           la collaboration au sein de votre entreprise.</p>
           </div>
               <img class="image" src="../assets/work.jpg" alt="illustration de personnes travaillant">
  </div>
</template>

<script>
export default {
  name: "Home",
  methods: {
    logOut: function() {
      this.$store.dispatch("logOut");
    },
  },
};
</script>
<style>
.intro{
    display: block;
    width: 40%;
    font-size: 15px;
    margin-top: 13%;  
}
.title{
    font-weight: 400;
    font-size: 40px;
    width: 94%;
    text-align: justify;
}
.image{
    width: 55%;
    height:55%;
    margin-top: 4%; 
    margin-left: 10%;
}
.set{
    
    margin: 2%;
}
.txt{
    color: #3f3f3f;
    font-size: 16px;
    text-align: justify;
}

</style>