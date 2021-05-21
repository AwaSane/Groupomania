<template>
  <div class="post-container">
    <div class="walltitle"> <h1>Fil d'actualité</h1></div>
    <div class="postform">
      <div>
        
     <v-card class="mx-auto card" max-width="900">
      
      <v-form
        v-model="sent"
        @submit.prevent="onSubmit"
        enctype="multipart/form-data"
        class="validate"
      >
        <v-col
        cols="12">
          <v-textarea
            label=" Ecrivez quelque chose..."
            v-model="message"
            :rules="[rules.required]"
            auto-grow
          ></v-textarea>
        </v-col>
        <v-card-text
          v-if="options"
        >
          <div>
            <div class="filebtn">
              <v-btn type="Fichier à télécharger"
               @click="addFile" small>
                Fichier
              </v-btn>
            </div>
          </div>
        </v-card-text>
        <div class="formfile">
          <div v-if="image">
            <div class="upload">
              <label for="formFile" class="form-label"></label>
              <input
              class="form-control"
              type="file"
              id=formFile
                @change="upload"
                
                accept="image/png, image/jpeg,
                image/bmp, image/gif"
                ref="file"
              />
            </div>
          </div>
        </div>
        <div class="formfile">
          <v-btn type="poster" @click="onSubmit" :disabled="!sent">Poster</v-btn>
        </div>
      </v-form>
      <div>
        <div class="danger-alert" v-html="errorMessage" />
        <div class="danger-alert" v-html="messageRetour" />
      </div>
    </v-card>
  </div>
    </div>
   
        <v-card width="800" class="post"
          v-if="$store.state.posts.length !== 0"
        >
          <v-card-text class="posts-component">
            <posts
              v-for="post of posts"
              :key="post.id"
              :post="post"
              :id="post.id"
              @deletePost="deletePost(post.id)"
              @refresh="refresh()"
              @onSubmitComment="onSubmitComment(post.id)"
              @deleteComment="deleteComment(comment.id)"
            >
            </posts>
          </v-card-text>
        </v-card>
  </div>
</template>

<script>
import Posts from "@/components/Posts.vue";

export default {
  name: "Wall",
  components: {
    Posts,
  },
  computed: {
    posts() {
      return this.$store.getters.posts
    },
     messageRetour() {
      return this.$store.getters.message;
    },
  },
  data() {
    return { 
      sent: true,
      options: true,
      image: false,
      rules: {
        required: (value) => !!value || "champ recquis",
      },
      message: "",
      file: "",
      errorMessage: null,
    };
  },
  beforeMount() {
    this.$store.dispatch("getPosts");
  },
  methods: {
   
    addFile() {
      (this.image = true), (this.options = false);
    },
    upload() {
      const file = this.$refs.file.files[0];
      this.file = file;
    },
    onSubmit() {
      const formData = new FormData();
      formData.append("message", this.message);
      if (this.file !== null) {
        formData.append("image", this.file);
        window.location.reload();
      }
      this.$store.dispatch("createPost", formData);
      this.$router.push("/posts");
      
    },

    deletePost(id) {
      this.$store.dispatch("deletePost", id);
    },
    deleteComment(id) {
      this.$store.dispatch("deleteComment", id);
    },
  },
};
</script>

<style>
.post-container{
  margin-top: 50px;
}
.postform{
  margin-bottom: 40px;
}

.post{
  margin: auto;
}
.posts-component{
  background-color: #f1ecec;
}

.walltitle{
  text-align: center;
}
.form-control{
height: calc(1.5em + .50rem + 0px);
    padding: .0rem .0rem;
}
.filebtn{
  text-align: center;
}
.formfile{
  
  display: flex;
  justify-content: center;
}

.card{
  padding-bottom: 25px;
}
.upload{
  padding-bottom: 25px;
}
</style>