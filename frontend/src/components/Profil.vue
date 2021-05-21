<template>
  
      <v-card 
        v-if="$store.state.connected"
        class="mx-auto my-12"
        max-width="800"
        >
        <div class="delete-account">

          
              <v-tooltip v-if="!$store.state.user.admin === true" bottom>
                <template v-slot:activator="{ on, attrs }">
                  <v-btn
                    @click="deleteProfil(user.id)"
                    class="mx-2"
                    fab
                    x-small
                    v-bind="attrs"
                    v-on="on"
                  >
                    <v-icon small class=" rounded-circle ">
                      $vuetify.icons.delete
                    </v-icon>
                  </v-btn>
                </template>
                <span>Supprimer le compte</span>
              </v-tooltip>
            </div>
        
            <v-btn to="/posts">
          <i class="fas fa-arrow-left"></i>
            </v-btn>
            <v-card-title>
              <h1>Modifier le profil</h1>
            </v-card-title>
            <v-card-text>
            <div
              v-if="username"
            >
            <h6>Nom d'utilisateur:</h6>
            <div class="setmodification">
              <p> {{ user.pseudo }} </p>
              <v-btn @click="modify" x-small>
                Modifier
              </v-btn>
              </div>
            </div>
            <v-text-field
              v-if="updateUsername"
              label="Entrez votre nouveau nom d'utilisateur!"
              v-model="newPseudo"
              :rules="usernameRules"
              required
              counter="45"
            ></v-text-field>
            </v-card-text>

          <v-divider class="mx-4"></v-divider>

          <v-card-text v-if="showBio">
              <h6>Bio:</h6>
              <div class="setmodification">
                <p v-if="!user.bio"> A propos de moi...</p>
                <p>{{ user.bio }}</p>
            <v-btn @click="bio" x-small>
              Modifier
            </v-btn>
            </div>
          </v-card-text>

          <v-text-field
            label="Entrer votre nouvelle bio!"
            v-if="updateBio"
            v-model="newBio"
          >
          </v-text-field>
          <div>
            <v-card-text v-if="options" class="msg">
              <div class="danger-alert" v-html="errorMessage" />
              <div class="danger-alert" v-html="messageRetour" />


              <div class="d-flex justify-center">
                <v-btn @click="onSubmit(user.id)" :disabled="!isValid"
                  >Envoyer</v-btn
                >
              </div>
            </v-card-text>
          </div>
        </v-card>
        <v-card v-else>
      <v-card-title class="post-title-box">
        <div class=" d-flex flex-column update-title pl-3 pb-5 ">
          <span class="title font-weight-light post-title pb-5 "
            >Votre compte a été supprimé</span
          >
        </div>
      </v-card-title>
    </v-card>
</template>

<script>

export default {
  name: "Profil",
  data() {
    return {
      updateBio: false,
      updateUsername: false,
      username: true,
      showBio: true,
      isValid: true,
      options: false,
      newPseudo: "",
      newBio: "",
      usernameRules: [
        (v) => v.length <= 45 || "Max 45 caractères",
        (v) => !!v || "Le pseudo est obligatoire",
      ],
      file: "",
      messageRetour: null,
      errorMessage: null,
    };
  },
  computed: {
    user() {
      return this.$store.getters.user;
    },
    connected() {
      if (this.$store.state.connected) {
        return
      } else {
        return "";
      }
    },
  },
  beforeMount() {
    this.$store.dispatch("getUserById");
  },
  methods: {

    getBackHome() {
      this.$router.push("/");
    },
    modify() {
      this.updateUsername = true;
      this.username = false;
      this.options = true;
    },
    
    bio() {
      this.updateBio = true;
      this.showBio = false;
      this.options = true;
    },
    uploadImage() {
      const file = this.$refs.file.files[0];
      this.file = file;
      console.log(this.file);
    },
    onSubmit() {
      const formData = new FormData();
      formData.append("pseudo", this.newPseudo);
      formData.append("bio", this.newBio);
      if (this.file !== null) {
        formData.append("image", this.file);
      }
      this.$store.dispatch("getUsers");
      this.$store.dispatch("getUserById", this.user.id);
      this.$store.dispatch("updateProfil", formData);
      this.$store.dispatch("getUserById", this.user.id);
      this.updateBio = false;
      this.updateUsername = false;
      this.options = false;
      this.showBio = true;
      this.username = true;
    },
    deleteProfil(id) {
      this.$store.dispatch("deleteProfil", id);
       this.$store.dispatch("getUserById", this.user.id);
      this.$store.dispatch("logOut");
      setTimeout(() => {
        this.getBackHome();
      }, 2000);
    },

  },
};
</script>

<style>
.v-avatar {
  margin-top: -30px;
  margin-right: 1em;
}
.profil-card {
  display: flex;
  justify-content: space-around;
  margin-top: 2em;
  margin-bottom: 4em;
}
.profil-top {
  display: flex;
  justify-content: space-between;
  padding-top: 1em;
}
.profil-middle {
  width: 100%;
  margin: auto !important;
}
.profil-title {
  padding: 0;
}

.signup-container{
  padding: 20px;
}
.setmodification{
  display: flex;
  justify-content: space-between;
}
.msg{
  display: block;
}
</style>