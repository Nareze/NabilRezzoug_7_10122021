import { createRouter, createWebHashHistory } from 'vue-router'
import MessageList from '../views/MessageList.vue'
import SignUp from '../views/Signup.vue'
import Login from '../views/Login.vue'
import Account from '../views/MyProfile.vue'

const routes = [
  {
    path: '/signup',
    name: 'signUp',
    component: SignUp
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/messageList',
    name: 'MessageList',
    component: MessageList
  },
  {
    path: '/myprofile',
    name: 'MyProfile',
    component: Account
  },


]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
