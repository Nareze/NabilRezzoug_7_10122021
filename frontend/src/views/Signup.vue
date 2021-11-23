<template>
  <form v-on:submit.prevent="submitForm">
    <div class="container">
      <h1>S'enregistrer</h1>
      <p>Merci de remplir tous les champs pour s'inscrire</p>
      <hr />

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

      <div>
        <button type="submit" class="signupbtn">Je m'inscris</button>
      </div>
    </div>
  </form>
</template>

<script>
import axios from "axios";

export default {
  name: "SignUp",

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
          console.log(response);
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>

<style scoped>
form {
  text-align: center;
  margin-top: 50px;
  border: 3px solid #f1f1f1 !important;
}

body {
  font-family: Arial, Helvetica, sans-serif;
}
* {
  box-sizing: border-box;
}

input[type="text"],
input[type="password"] {
  width: 100%;
  padding: 15px;
  margin: 5px 0 22px 0;
  display: inline-block;
  border: none;
  background: #f1f1f1;
}

input[type="text"]:focus,
input[type="password"]:focus {
  outline: none;
}

hr {
  border: 1px solid #f1f1f1;
  margin-bottom: 25px;
}

button {
  background-color: #182b4a !important;
  color: white;
  padding: 14px 20px;
  margin: 8px 0;
  border: none;
  cursor: pointer;
  width: 100%;
  opacity: 0.9;
}

button:hover {
  opacity: 0.8;
  background-color: #e62600 !important;
  transition: 300ms;
}

.container {
  padding: 0pc 15px 15px 15px;
}

@media screen and (max-width: 300px) {
  .signupbtn {
    width: 100%;
  }
}
</style>
