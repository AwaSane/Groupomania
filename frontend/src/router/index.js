import Vue from 'vue';
import VueRouter from 'vue-router';
import Register from '../components/Register.vue';
import Home from '../views/Accueil.vue';
import Login from '../components/Login.vue';
import Wall from '../views/Wall.vue';
import Profil from '../components/Profil.vue';
import ModifyPost from '../components/ModifyPost.vue';
import store from '../store/store';


Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/signup',
    name: 'Register',
    component: Register,
  },
  {
    path: '/login',
    name: 'login',
    component: Login,
    
  },
  {
    path: '/profil/:id',
    name: 'profil',
    component: Profil,
    beforeEnter: (to, from, next) => {
      if(store.state.connected == false) {
        next(false);
      } else {
        next();
      }
    }
  },
  {
    path: '/posts',
    name: 'wall',
    component: Wall,
    beforeEnter: (to, from, next) => {
      if(store.state.connected == false) {
        next(false);
      } else {
        next();
      }
    }
  },
 
  {
    path: '/posts/:id',
    name: 'modifypost',
    component: ModifyPost,
    beforeEnter: (to, from, next) => {
      if(store.state.connected == false) {
        next(false);
      } else {
        next();
      }
    }
    
  },
 
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});


export default router;