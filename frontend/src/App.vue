<template>
<div>
  <div id="nav">
    <div class="logo"><router-link to="/login"><img :src="logo" /></router-link></div>

    <router-link to="/login">Connexion</router-link> |

    <router-link to="/messagelist" >Messages</router-link> |

    <router-link to="/signup">Inscription</router-link> |

    <router-link to="/myprofile">Mon compte</router-link> |

    <router-link to="/users">Utilisateurs</router-link> 


    <a href="#" v-on:click="logout()" class="logout">
      <span class="text"> Déconnexion </span><i class="fas fa-sign-out-alt"></i
    ></a>
  </div>
  <router-view />
</div>
</template>

<script>
export default {
  name: "header",

  data() {
    return {
      logo: require("./assets/icon-left-font.png"),
    };
  },

  methods: {
    logout() {
      localStorage.clear(), window.location.reload();
    },
  },
};
</script>

<style lang="scss">


#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

*{
  margin: 0px;
  padding: 0px;
}

.logout {
  position: absolute;
  right: 55px;
}

.logo {
  position: absolute;
  top: 0px;
  left: 5px;
  img {
    height: 40px;
    margin-top: 20px;
  }
}

#nav {
  text-align: center;
  padding: 30px;
  a {
    font-weight: bold;
    color: #182b4a;
    text-decoration: none;

    &.router-link-exact-active {
      color: #e62600;
    }
    &:hover {
      color: #e62600;
      transition: 250ms;
    }
  }
}

@media screen and (max-width: 900px) {
  .logo {
    position: inherit;
    margin-bottom: 25px;
  }
  .logout {
    position: inherit;
    text-align: center;
    padding-left: 25px;
    .text {
      display: none;
    }
  }
}
</style>
