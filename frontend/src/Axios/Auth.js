import axios from "./axios";

export default {
  signup(data) {
    return axios().post("users/signup", data);
  },
  login(data) {
    return axios().post("users/login", data);
  },

  updateProfil(id, data) {
    return axios.put("users/profil/" + id, data);
  },
  getUsers() {
    return axios().get("users/profils");
  },
  getUserById(id) {
    return axios().get("users/profil/" + id);
  },
  deleteProfil(id) {
    return axios().delete("users/profil/" + id);
  },
};