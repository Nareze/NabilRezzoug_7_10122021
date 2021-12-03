<template>
<div>
  <div class="container">
    <form v-on:submit.prevent="submitForm">
      <h3>Bienvenue !</h3>
      <hr>

      <label for="email"><b>Adresse Mail</b></label>
      <input
        type="text"
        placeholder="Entrer l'Email"
        name="email"
        required
        v-model="form.email"
      />

      <label for="psw"><b>Mot de passe</b></label>
      <input
        type="password"
        placeholder="Enter le mot de passe"
        name="password"
        required
        v-model="form.password"
      />

      <div class="submitForm">
        <button type="submit">Connexion</button>
      </div>
    </form>
  </div>
   <FooterItem></FooterItem>
   </div>
</template>

<script>
import axios from "axios";
import FooterItem from "../components/Footer.vue"

export default {
  name: "Login",
  components:{
    FooterItem
  },

  data() {
    return {
      form: {
        email: "",
        password: "",
      },
    };
  },

  methods: {
    submitForm() {
      axios
        .post("http://localhost:3000/api/user/login", this.form)
        .then((response) => {
          localStorage.setItem("token", response.data.token);
          this.$router.push("/messageList");
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>

<style lang="scss">


@media screen and (max-width: 300px) {
}
</style>
