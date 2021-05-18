import axios from "./axios";

export default {
  getPosts() {
    return axios().get("posts");
  },

  getPostById(id) {
    return axios().get("posts/" + id);
  },
  createPost(data) {
    return axios().post("posts/add", data);
  },
  updatePost(id, data) {
    return axios.put("posts/" + id, data);
  },

  deletePost(id) {
    return axios().delete("posts/" + id);
  },

  commentPost(id, data) {
    return axios().post("posts/" + id + "/comments", data);
  },

  deleteComment(id) {
    return axios().delete("posts/comments/" + id);
  },
};