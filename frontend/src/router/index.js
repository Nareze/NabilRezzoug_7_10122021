import { createRouter, createWebHashHistory } from 'vue-router'
import MessageList from '../views/MessageList.vue'
import SignUp from '../views/Signup.vue'
import Login from '../views/Login.vue'
import Account from '../views/MyProfile.vue'
import ListOfUsers from '../views/Users.vue'
import ModifyMessage from '../views/ModifyMessage.vue'

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
  {
    path: '/users',
    name: 'Users',
    component: ListOfUsers
  },
  {
    path: "/ModifyMessage/:messageId",    // l'id du message est passé dans l'url
    component: ModifyMessage,
    props:true
  }


]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
