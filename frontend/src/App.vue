<template>

  <div id="nav">

    <div class="logo">
    <img src="./assets/icon-left-font.png" alt="">
    </div>

    <router-link to="/login">Connexion</router-link> |
    <router-link to="/messages">Messages</router-link> |
    <router-link to="/signup">S'inscrire</router-link>
  </div>
  <router-view/>
</template>


<script>

</script>


<style lang="scss">


#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

.logo{
  position: absolute;
  top: 0px;
  left: 5px;
  img{
    height: 50px;
    margin-top: 20px;
  }
}


#nav {
  text-align: center;
  padding: 30px;
  a {
    font-weight: bold;
    color: #182B4A;
    text-decoration: none;

    &.router-link-exact-active {
      color:#E62600;
    }
    &:hover{
      color:#E62600;
      transition: 250ms;
    }
  }
}

@media screen and (max-width: 770px) {
  .logo{
    position: inherit;
    margin-bottom: 25px;
  }
}
</style>
