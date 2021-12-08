<template>
  <div>
    <div class="container">
      <form class="sendMessage">
        <h3>Envoyer un message</h3>
        <hr />
        <label for="Titre"><b>Titre:</b></label>
        <input type="text" name="titre" v-model="titre" />

        <label for="Contenu"><b>Message: </b></label>
        <textarea type="text" name="contenu" v-model="contenu" />

        <br />
        <label for="Image"><b>Image: </b></label>
        <input type="file" name="image" @change="handleFileUpload($event)" />
        <button v-on:click="submitMessage()">Envoyer</button>
      </form>

      <div class="messagesList">
        <h3>Mur des messages</h3>
        <hr class="wall">

        <div v-for="message of messages" :key="message" class="boxListMessage">
          <!--  Récupération des messages  -->

<div class="test">
        <div v-for="user of users" :key="user">
          <!--  Récupération des utilisateurs  -->

          <div v-if="message.UserId === user.id">
            <span class="pseudo"
              ><strong>Pseudo : {{ user.username }}</strong></span
            >
          </div>
        </div>

        <div>
          <p class="messageTitre">
            <strong>{{ message.titre }}</strong>
          </p>
          <p class="messageContenu">{{ message.contenu }}</p>
          <p class="messageDate">{{ message.createdAt }}</p>
        </div>
      </div>

        <hr class="changeMessage" />

        <div v-if="message.image" class="picdiv">
          <img class="images" v-bind:src="message.image" alt="" />
        </div>

        <div class="lowerPartMessage">
          <a v-on:click="modifyMessage(message.id)" class="updateIcon">
            <i class="fas fa-edit"></i>
          </a>

          <a href="#" v-on:click="deleteMessage(message.id)">
            <i class="fas fa-trash-alt"></i>
          </a>

        </div>







<div class="reply">
        <h3>Répondre</h3>
          <form @submit.prevent="submitPost(message.id)">
            <textarea v-model="content" name="content" cols="10" rows="5" class="replyTextarea"></textarea>
            <button class="submitReply">Envoyer</button>
          </form>

<hr>

          <div v-for="post in posts" v-bind:key="post">
            <div v-if="post.idMessages === message.id">
              <div v-for="user of users" :key="user">
                <div v-if="post.UserId === user.id">
                  <p><strong>{{user.username}}</strong></p>
                  <p>{{post.content}}</p>
                  <p>{{post.createdAt}}</p>
                </div>
              </div>
            </div>
          </div>
        </div>




        </div>
      </div>
    </div>
    <FooterItem />
  </div>
</template>

<script>
import axios from "axios";
import FooterItem from "../components/Footer.vue";

export default {
  name: "MessageList",
  components: {
    FooterItem,
  },
  data() {
    return {
      file: "",
      titre: "",
      contenu: "",
      content:"",
      messages: "",
      users: "",
      posts: "",
      errors: [],
    };
  },

  methods: {
    handleFileUpload(event) {
      this.file = event.target.files[0];
    },

    submitMessage() {
      let formData = new FormData();

      formData.append("image", this.file);
      formData.append("titre", this.titre);
      formData.append("contenu", this.contenu);

      axios
        .post("http://localhost:3000/api/message/create", formData, {
          headers: {
            Authorization: "Bearer " + localStorage.token,
            "Content-Type": "multipart/form-data",
          },
        })
        .then(function () {
          console.log("ENVOYÉ");
        })
        .catch(function () {
          console.log("ECHEC");
        });
    },

    submitPost(idPost){

      axios.post(`http://localhost:3000/api/post/${idPost}`, {
        content: this.content,
      },
      {
        headers: {
          Authorization: "Bearer " + localStorage.token,
          "Content-Type": "application/json"
        }, 
      }
      )
      .then(() => {
        alert("Réponse envoyé")
        window.location.reload()
      })
      .catch((error) => {
        console.log(error)
      })
    },

    deleteMessage(messageId) {
      axios
        .delete(`http://localhost:3000/api/message/${messageId}`, {
          headers: { Authorization: "Bearer " + localStorage.token },
        })
        .then((response) => {
          alert("Message supprimé !")
          console.log(response), this.$router.push("/messageList");
        })
        .catch((err) => {
          console.log(err),
            alert(
              "Vous ne pouvez pas supprimer les messages d'autres utilisateurs !"
            ),
            this.$router.push("/messageList");
        });
    },

    modifyMessage(messageId) {
      this.$router.push(`/ModifyMessage/${messageId}`); // On passe l'argument dans l'url en utilisant l'interpolation
    },
  },

  mounted() {
    axios
      .get("http://localhost:3000/api/message/users", {
        headers: { Authorization: "Bearer " + localStorage.token },
      })
      .then((response) => (this.messages = response.data));

    axios
      .get("http://localhost:3000/api/user/profiles", {
        headers: { Authorization: "Bearer " + localStorage.token },
      })
      .then((response) => (this.users = response.data));

      axios.get(`http://localhost:3000/api/post/`, {

      }).then((response) => {
        this.posts = response.data;
      }).catch((error) => {
        console.log(error)
      })
  },
};
</script>

<style lang="scss">
.container {
  text-align: center;
}

li {
  list-style-type: none;
}

/* POST MESSAGE */ ////////////////////////////

.submitReply{
  margin-bottom:50px;
  width: 200px;
}

.test{
  margin-bottom: 75px;
}

.reply{
  margin-top: 50px;
  padding-bottom: 100px;
}


.messagesList {
  margin-top: 100px;
}

a {
  cursor: pointer;
}

h3 {
  margin-top: 25px;
  margin-bottom: 40px;
  color: grey;
}
h2 {
  margin-top: 25px;
  margin-bottom: 40px;
  color: grey;
  border-top: 3px solid #f1f1f1;
  border-bottom: 3px solid #f1f1f1;
  padding: 5px;
}

hr {
  border: 3px solid #d4d4d4;
}

.sendMessage {
  margin-top: 50px;
  margin-right: 10%;
  margin-left: 10%;
  border: 3px solid #d4d4d4;
  border-radius: 10px;
}

label {
  margin: 15px;
}

textarea {
  width: 100%;
  padding: 10px;
  display: inline-block;
  border: none;
  background: #f1f1f1;
}

.replyTextarea{
  background: white;
}

input[type="text"],
input[type="password"] {
  width: 100%;
  padding: 7px;
  display: inline-block;
  border: none;
  background: #f1f1f1;
  border-radius: 3px;
}

input[type="text"]:focus,
input[type="password"]:focus {
  outline: none;
}

button {
  background-color: #182b4a;
  color: white;
  margin-top: 20px;
  padding: 15px;
  border: none;
  cursor: pointer;
  width: 100%;
  opacity: 0.9;
  border-radius: 7px;
}

button:hover {
  opacity: 0.8;
  background-color: #e62600;
  transition: 300ms;
}

/* LISTE MESSAGES */ //////////////////////////////////

.wall{
  margin-bottom: 55px;
}
.boxListMessage:nth-child(odd) {
  background: #eef1f5;
}

.boxListMessage:nth-child(even) {
  background: aliceblue;
}

.picdiv {
  margin: 25px;
}

.fa-trash-alt {
  position: absolute;
  right: 25px;
  bottom: 10px;
}

.updateIcon {
  position: absolute;
  left: 25px;
  bottom: 10px;
}

.boxListMessage {
  position: relative;
  text-align: center;
  box-shadow: 0px 1px 4px grey;
  background-color: #edf1f5;
  border-radius: 5px;
  padding: 20px;
  margin-bottom: 40px;
}

.images {
  width: 200px;
}

.container {
  margin-bottom: 100px;
}

a {
  text-decoration: none;
}

.messageDate {
  position: absolute;
  left: 10px;
  bottom: 50px;
}


.pseudo {
  position: absolute;
  left: 10px;
  top: 10px;
}

.messageTitre {
  position: relative;
  bottom: 10px;
}

@media screen and (max-width: 500px) {
  .images {
    width: 100px;
  }
  .sendMessage {
    border: none;
  }
  .messageTitre {
  position: relative;
  bottom: -12px;
}

}






</style>
