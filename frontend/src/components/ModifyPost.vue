<template>
  <v-container class="post-box">
    <v-card class="mx-auto post-card" max-width="600">
      <v-card-title class="post-title-box">
        <div class="update-title mx-auto">
          <h1 class="font-weight-regular titre titre_new">
            Modifier
          </h1>
        </div>
      </v-card-title>
      <v-divider></v-divider>
      <v-card-text class="">
        <div v-if="showMessage" class=" d-flex justify-space-between">
          <div class="d-flex mx-auto">
            <div
              class="mx-auto mb-5 message"
            >
              <span class="msg">{{ post.message }}</span>
            </div>
          </div>
        </div>

        <div v-if="withMessage" class="text-box">
          <v-textarea
            label="Message"
            v-model="message"
            text="text"
            solo
            type="text"
            required
            name="input-7-4"
            class="mr-5 ml-3 text-area"
          ></v-textarea>
        </div>
        <div class="d-flex justify-center pt-3">
          <v-btn @click="toggleMessage" x-small>
            modifier
          </v-btn>
        </div>
      </v-card-text>
      <v-form v-model="isValid" enctype="multipart/form-data" class="validate ">
        
        <div v-if="showImage">
          <v-img
            v-if="post.imageUrl"
            :src="post.imageUrl"
            :max-height="350"
            :max-width="250"
            class="mx-auto mb-5"
          ></v-img>
        </div>
        
        <div v-if="withImage" class="pb-5 pt-5 d-flex justify-center">
          <label for="image" class="pr-3">Image</label>
          <input
            @change="uploadImage"
            type="file"
            aria-label="image input"
            accept="image/png, image/jpeg,image/bmp, image/gif"
            ref="file"
            name="image"
          />
        </div>
        <v-divider></v-divider>
        <v-card-text v-if="options" class="d-flex justify-center my-3">
          <div class="bloc-option">
            <v-btn
              v-if="post.imageUrl"
              @click="toggleImage"
              class="mx-2 mt-2 "
              x-small
              :elevation="2"
            >
              Télécharger une autre image
            </v-btn>
          </div>
        </v-card-text>
        <div class=" d-flex justify-center  ">
          <v-btn @click="onSubmit" :disabled="!isValid" class="mb-3"
            >Poster</v-btn
          >
        </div>

      </v-form>
      
    </v-card>
  </v-container>
</template>
<script>
export default {
  name: "modifypost",
  data() {
    return {
      options: true,
      isValid: true,
      withImage: false,
      withMessage: false,
      showImage: true,
      showMessage: true,
      message: "",
      file: "",
     
    };
  },
  computed: {
    post() {
      return this.$store.getters.post;
    },
   
  },
  beforeMount() {
    let id = this.$route.params.id;
    this.$store.dispatch("getPostById", id);
  },
  methods: {
    toggleMessage() {
      this.withMessage = true;
      this.showMessage = false;
    },
    
    toggleImage() {
      this.withImage = true;
      this.showImage = false;
    },
    uploadImage() {
      const file = this.$refs.file.files[0];
      this.file = file;
    },
    getBackToFeed() {
      this.$router.push("/posts");
    },
    onSubmit() {
      let id = this.$route.params.id;
      const formData = new FormData();
      if (this.message !== null) {
        formData.append("message", this.message);
      }
      
      formData.append("image", this.file);
          this.$store.dispatch("getPosts");
      this.$store.dispatch("updatePost", formData);
      this.$store.dispatch("getPostById", id);
      this.showImage = true;
      this.options = false;
      this.showMessage = true;
      this.withImage = false;
      this.withMessage = false;
      this.getBackToFeed();
    },
    newText() {
      this.textInput = true;
    },
  },
};
</script>
<style>
.return-btn {
  position: absolute;
  right: 0;
  top: 10px;
}

.message {
  width: 100rem;
  padding: 15px;
  
}
.msg{
 margin-left:14%;
}
</style>