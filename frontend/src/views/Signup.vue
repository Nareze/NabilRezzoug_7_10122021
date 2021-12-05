<template>
<div>
  <div class="container">
    <form v-on:submit.prevent="submitForm">
      <h2>Merci de remplir tous les champs pour s'inscrire</h2>

      <label for="email"><b>Adresse Mail</b></label>
      <input
        type="text"
        placeholder="Entrer l'Email"
        name="email"
        required
        v-model="form.email"
      />

      <label for="password"><b>Mot de passe</b></label>
      <input
        type="password"
        placeholder="Entrer le mot de passe"
        name="password"
        required
        v-model="form.password"
      />

      <label for="username"><b>Nom d'utilisateur</b></label>
      <input
        type="text"
        placeholder="Entrer le nom d'utilisateur"
        name="username"
        required
        v-model="form.username"
      />

      <label for="bio"><b>Description</b></label>
      <input
        type="text"
        placeholder="Présentez vous en quelque mots"
        name="bio"
        required
        v-model="form.bio"
      />

      <div class="submitForm">
        <button type="submit" class="signupbtn">Je m'inscris</button>
      </div>
    </form>
  </div>

  <FooterItem/>
  </div>
</template>

<script>
import axios from "axios";
import FooterItem from "../components/Footer.vue"
// import {useStore} from "vuex"

export default {
  name: "SignUp",
    components:{
    FooterItem
  },

  data() {
    
    return {
      form: {
        email: "",
        username: "",
        password: "",
        bio: "",
      },
    };
  },

  methods: {
    submitForm() {
      axios
        .post("http://localhost:3000/api/user/signup", this.form)
        .then((response) => {
          localStorage.setItem("token", response.data.token);
          console.log(response);
          this.$router.push("/messageList");
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },

  //   methods: {
      
  //   submitForm() {
  //     const store = useStore();
  //     try {
  //     axios
  //       .post("http://localhost:3000/api/user/signup", this.form)
  //       .then((response) => {
  //         localStorage.setItem("token", response.data.token);
  //         // this.$router.push("/messageList");
  //         store.dispatch('setAuth', true)
  //       })
  //       .catch((error) => {
  //         console.log(error);
  //       });

         
  //     } catch (e) {
  //       store.dispatch('setAuth', false)
  //     }
  //   },
  // },




};
</script>

<style lang="scss">

.submitForm{
  margin-top: 35px;
}



@media screen and (max-width: 300px) {
}



</style>
