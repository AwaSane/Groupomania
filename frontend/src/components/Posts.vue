<template>
  <div   v-if="isConnected ===false" >
    
    <v-card class="mx-auto mb-6">
      <div>
        <div class="d-flex justify-space-between">
          <v-card-title class="post-title">
           
            <div class="nom-date mt-3">
              <span class="ml-3">{{ post.User.pseudo }}</span>
            </div>
          </v-card-title>
          <div class="options">
            <v-tooltip v-if="$store.state.user.id == post.User.id" bottom>
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  class="mx-2"
                  primary
                  x-small
                  v-bind="attrs"
                  v-on="on"
                  aria-label="modifier le post"
                  @click="getOnePost(post.id)"
                >
                  Modifier
                </v-btn>
              </template>
              <span>Modifier</span>
            </v-tooltip>
            
            <v-tooltip
              v-if="
                $store.state.user.id === post.User.id ||
                  $store.state.user.admin === true
              "
            >
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  class="mx-2"
                  primary
                  x-small
                  v-bind="attrs"
                  v-on="on"
                  aria-label="supprimer le post"
                  @click="deletePost(post.id)"
                >
                 Supprimer
                </v-btn>
              </template>
              <span>Supprimer</span>
            </v-tooltip>
          </div>
        </div>
        <div class="pl-3 pr-2-3">
          <v-card-text class="text-left">
            <p class="body-1">
              {{ post.message }}
            </p>
          </v-card-text>
        </div>
        <div>
          <v-img
            v-if="post.link"
            :src="post.link"
            alt="image"
            :max-height="450"
            :max-width="550"
            class="mx-auto"
          >
          </v-img>
          <v-img
            v-if="post.imageUrl"
            :src="post.imageUrl"
            alt="image"
            :max-height="705"
            :max-width="505"
            class="mx-auto"
          >
          </v-img>
        </div>
        <v-divider></v-divider>
        <div class="d-flex flex-column align-end pr-3">
          <div>{{ post.Comments.length }} commentaire(s)</div>
        </div>
        <v-divider></v-divider>
        <v-card-actions class="pt-5  pr-4 d-flex justify-space-between">
          <div class=" d-flex justify-md-space-between">
            <v-btn @click="show = !show" text>
              Voir les commentaires
            </v-btn>
          </div>
        </v-card-actions>
        <div>
          <div v-show="show">
            <v-divider></v-divider>
            <div class="comments-box d-flex flex-column justify-center">
              <v-card-text class="comment-input">
                <v-form
                  v-model="isValid"
                  @submit.prevent="onSubmitComment(post.id)"
                  enctype="multipart/form-data"
                  class="validate comment-form"
                >
                  <v-text-field
                    name="input-1-3"
                    label="commentez"
                    v-model="data.commentMessage"
                  >
                  </v-text-field>
                  <v-btn
                  type="submit"
                    @click="onSubmitComment(post.id)"
                    :disabled="!isValid"
                    >Poster</v-btn
                  >
                </v-form>
                <div>
                  <div class="danger-alert" v-html="errorMessage" />
                  <div class="danger-alert" v-html="messageRetour" />
                </div>
              </v-card-text>
              <v-list
                v-for="comment in post.Comments"
                :key="comment.id"
                :comment="comment"
              >
                <v-list-item>
                  <v-list-item-content>
                    <v-list-item-title 
                      v-html="comment.User.pseudo"
                    ></v-list-item-title>
                    <v-list-item-subtitle
                      v-html="comment.message"
                    ></v-list-item-subtitle>
                  </v-list-item-content>

                  <v-tooltip bottom>
                    <template
                      v-if="
                        $store.state.user.id === comment.UserId ||
                          $store.state.user.admin === true
                      "
                      v-slot:activator="{ on, attrs }"
                    >
                      <v-btn 
                      type="submit"
                      small v-bind="attrs" v-on="on">
                        <i class="fas fa-trash"
                         @click="deleteComment(comment.id)">                    
                        </i>
                      </v-btn>
                    </template>
                    <span>Supprimer</span>
                  </v-tooltip>
                </v-list-item>
                <v-divider></v-divider>
              </v-list>
            </div>
          </div>
        </div>
      </div>
    </v-card>
  </div>
</template>

<script>

export default {
  name: "Posts",
  props: {
    post: {
      type: Object,
    },
    
  },
  data: function() {
    return {
      show: false,
      user: false,
      update: false,
      isValid: true,
      rules: {
        required: (value) => !!value || "Champs recquis",
      },
      messageRetour: null,
      errorMessage: null,
      data: {
        commentMessage: "",
        commentPseudo: this.$store.state.user.pseudo,
      },
    };
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
refresh() {
  window.location.reload();
},
    
    
    getProfile(id) {
      this.$router.push(`/profil/${id}`);
    },
    deletePost() {
      this.$emit("deletePost", this.post.id),this.refresh();
    },
    getOnePost(id) {
      this.$router.push(`posts/${id}`);
    },
    onSubmitComment(id) {
      this.$store.dispatch("getPosts");
      this.$store.dispatch("commentPost", {
        id: id,
        data: this.data,
      });
      this.data.commentMessage = "";
      this.$store.dispatch("getPosts");
      this.$store.dispatch("getPostById", this.post.id);
    },
    deleteComment(id) {
      this.$store.dispatch("deleteComment", id), this.refresh();
    },
  },
};
</script>
<style>
.options{
  margin-top: 30px;
}

</style>