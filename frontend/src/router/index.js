import Vue from 'vue';
import VueRouter from 'vue-router';
import Register from '../components/Register.vue';
import Home from '../views/Accueil.vue';
import Login from '../components/Login.vue';
import Wall from '../views/Wall.vue';
import Profil from '../components/Profil.vue';
import ModifyPost from '../components/ModifyPost.vue';


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
  },
  {
    path: '/posts',
    name: 'wall',
    component: Wall,
  },
 
  {
    path: '/posts/:id',
    name: 'modifypost',
    component: ModifyPost,
    
  },
 
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;