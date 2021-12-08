<template>
<div>
  <div class="container">

    <div class="MyInfos">
      <h2>Mes Infos</h2>
      <p><strong>Mon Pseudo :</strong> {{ user.username }}</p>
      <p><strong>Ma bio :</strong> {{ user.bio }}</p>
      <p><strong>Ma date d'inscription :</strong> {{ user.createdAt }}</p>
    </div>

    <div class="modifyAccount">
      <h2>Modifier mon compte</h2>
      <p> <strong>(Veulliez remplir tous les champs) </strong> </p>

          <div class="modifyAccount">
      <label for="email"><b>Changer mon mot de passe : </b></label>
      <input
        type="password"
        placeholder="Entrer votre nouveau mot de passe"
        name="password"
        v-model="password"
      />
      <label for="pseudo"><b>Changer mon pseudo : </b></label>
      <input
        type="text"
        placeholder="Entrer votre nouveau pseudo"
        name="pseudo"
        v-model="username"
      />
      <label for="bio"><b>Changer ma bio : </b></label>
      <input
        type="text"
        placeholder="Entrer votre bio"
        name="bio"
        v-model="bio"
      />
    </div>

      <br />
      <div>
        <button v-on:click="updateUser()">Envoyer</button>
      </div>

  </div>

  <div class="delete">
    <h2>Supprimer mon compte</h2>
      <button v-on:click="deleteUser()">Supprimer</button>
    </div>
  </div>


  <FooterItem/>
  </div>
</template>

<script>
import axios from "axios";
import FooterItem from "../components/Footer.vue"

export default {
    components:{
    FooterItem,
  },
  data() {
    return {
      user: "",
      password: "",
      username: "",
      bio: "",

    };
  },

  methods: {


    updateUser() {
      axios
        .put(
          "http://localhost:3000/api/user/modify",
          {
            password: this.password,
            username: this.username,
            bio: this.bio,
          },
          {
            headers: {
              Authorization: "Bearer " + localStorage.token,
            },
          }
        )
        .then(function () {
          console.log("ENVOYÉ");
          window.location.reload();
          alert("User updated");
        })
        .catch(function () {
          console.log("ECHEC");
        });
    },


    deleteUser() {
      axios
        .delete("http://localhost:3000/api/user/delete", {
          headers: { Authorization: "Bearer " + localStorage.token },
        })
        .then((response) => console.log(response),/*window.location.reload(),*/ alert("Account deleted"))
        .catch((err) => console.log(err));
    },
  },

  created() {
    axios
      .get("http://localhost:3000/api/user/profile", {
        headers: { Authorization: "Bearer " + localStorage.token },
      })
      .then((response) => (this.user = response.data));
  },
};
</script>

<style lang="scss">
.MyInfos{
  margin-top: 75px;
}
.delete{
  margin-top: 100px;
}
.modifyAccount{
  margin-top: 75px;
}

@media screen and (max-width: 500px) {
}
</style>
