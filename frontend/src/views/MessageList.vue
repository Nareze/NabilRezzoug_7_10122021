<template>
<div>
  <div class="container">

  <form class="sendMessage">
   
      <h3>Envoyer un message</h3>
      <hr>

          <label for="Titre"><b>Titre:</b></label>
          <input type="text" name="titre" v-model="titre" />

          <label for="Contenu"><b>Message: </b></label>
          <textarea type="text" name="contenu" v-model="contenu" />
          
          <br>
          <label for="Image"><b>Image: </b></label>
          <input
            type="file"
            name="image"
            @change="handleFileUpload($event)"
          />
          <button v-on:click="submitFile()">Envoyer</button>
  </form>



    <div class="messagesList">
      <h3> Mur des messages</h3>
      <hr>



       <div v-for="message of messages" :key="message" class="boxListMessage">   <!--  Récupération des messages  -->

          <div v-for="user of users" :key="user">      <!--  Récupération des utilisateurs  -->


            <div v-if="message.UserId === user.id">
              
            <span class="pseudo"><strong>Pseudo : {{user.username}}</strong></span>
            </div>

          </div>

          <div>
            <p class="messageTitre"> <strong>{{ message.titre }}</strong></p>
            <p class="messageContenu">{{ message.contenu }}</p>
            <p class="messageDate">{{ message.createdAt }}</p>
          </div>

          <hr class="changeMessage">

          <div v-if="message.image" class="picdiv">
            <img class="images" v-bind:src="message.image" alt="" />
          </div>

        <button class="modifyButton" v-on:click="modifyMessage(message.id)" >Modifier
        </button>

        <a href=""></a>


          <a href="#" v-on:click="deleteMessage(message.id)">
            <i class="fas fa-trash-alt"></i>
          </a>

      </div>

    </div>
  </div>
  <FooterItem/>
</div>
</template>

<script>
import axios from "axios";
import FooterItem from "../components/Footer.vue"

export default {
  name: "MessageList",
  components:{
    FooterItem
  },
  data() {
    return {
      file: "",
      titre: "",
      contenu: "",
      messages: "",
      users:"",
      errors: [],
    };
  },

  methods: {
    handleFileUpload(event) {
      this.file = event.target.files[0];
    },

    submitFile() {
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
          window.location.reload();
        })
        .catch(function () {
          console.log("ECHEC");
        });
    },

    deleteMessage(messageId) {
      axios
        .delete(`http://localhost:3000/api/message/${messageId}`, {
          headers: { Authorization: "Bearer " + localStorage.token },
        })
        .then((response) => console.log(response))
        .catch((err) => console.log(err));
    },


      modifyMessage(messageId) {
      this.$router.push(`/ModifyMessage/${messageId}`)    // On passe l'argument dans l'url en utilisant l'interpolation
    },
  },


  mounted() {
    axios.get(`http://localhost:3000/api/message/users`).then((response) => {
      this.messages = response.data;
      console.log(JSON.stringify(response));
    });
    axios.get(`http://localhost:3000/api/user/profiles`).then((response) => {
      this.users = response.data;
      console.log(response.data);
    });
  },




};
</script>

<style lang="scss">


.container{
  text-align: center;
}

li{
  list-style-type: none;
}


/* POST MESSAGE */ ////////////////////////////


.messagesList{
  margin-top: 100px;
}


h3{  
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


.sendMessage{
  margin-top: 50px;
  margin-right: 20%;
  margin-left: 20%;
  border: 3px solid #d4d4d4;
  border-radius: 7px;
}


  label {
  margin: 15px;
  }



textarea{
  width: 100%;
  padding: 10px;
  display: inline-block;
  border: none;
  background: #f1f1f1;
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

.boxPostMessage {
  border: 3px solid #f1f1f1;
  border-radius: 5px;
  overflow: hidden;
  margin-right: 25%;
  margin-left: 25%;
}

.boxListMessage {
  position: relative;
  text-align: center;
  margin: 25px;
  box-shadow: 0px 1px 4px grey;
  background-color: #edf1f5;
  border-radius: 5px;
  padding: 20px;
}

.images {
  width: 200px;
}

.container{
  margin-bottom: 100px;
}

a{
  text-decoration: none;
}

.modifyButton{
  width: 100px;
  position: absolute;
  bottom: 0px;
  left: 0px;
  padding: 2px;
  margin: 0;
  border-radius: 3px;
}

.messageDate{
  position: absolute;
  left: 10px;
  bottom: 50px;
}

.changeMessage{
  margin-bottom: 35px;
}

.pseudo{
  position: absolute;
  left: 10px;
  top: 10px;
}

.messageTitre{
  position: relative;
  bottom: 10px;
}



@media screen and (max-width: 500px) {
  .images{
    width: 100px;
  }
  .sendMessage{
    border: none;
  }
}
</style>
