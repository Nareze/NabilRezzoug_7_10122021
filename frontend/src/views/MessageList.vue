<template>
  <div class="center">
    <div class="message">
      <div>
        <div>
          <h2>Envoyer un message</h2>
          <hr />
            <label for="Titre"><b>Titre</b></label>
            <input type="text" name="titre" v-model="titre"   />

            <label for="Contenu"><b>Contenu</b></label>
            <input type="text" name="contenu" v-model="contenu"   />
          <label
            >File


            <input type="file" @change="handleFileUpload($event)" />
          </label>
          <br />
          <button v-on:click="submitFile()">Submit</button>
        </div>
      </div>
    </div>

    <div>
      <ul v-if="messages && messages.length">
        <li v-for="message of messages" :key="message" class="box">
          <p>
            <strong> <span>Titre :</span> {{ message.titre }}</strong>
          </p>
          <hr />
          <p><span>Contenu :</span> {{ message.contenu }}</p>
          <img class="images" v-bind:src="message.image" alt="" />
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "MessageList",

  data() {
    return {
      file: "",
      titre:"",
      contenu:"",
      messages: [],
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
      formData.append("titre", this.titre)
      formData.append("contenu", this.contenu)

      axios
        .post("http://localhost:3000/api/message/create", formData,  {
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
  },

  created() {
    axios.get(`http://localhost:3000/api/message/users`).then((response) => {
      this.messages = response.data;
      console.log(response.data);
    });
  },
};
</script>

<style lang="css" scoped>
ul {
  padding: 0;
}

li {
  list-style-type: none;
}

hr {
  width: 400px;
  background-color: red;
  opacity: 0.5;
  height: 2px;
  border: none;
}

.box {
  border: 1px solid black;
  text-align: center;
  margin: 25px;
  box-shadow: 4px 4px 10px grey;
  background-color: aliceblue;
  border-radius: 25px;
}

.message {
  border: 2px solid rgba(238, 72, 37, 0.7);
  text-align: center;
  padding: 25px;
  margin-right: 25%;
  margin-left: 25%;
  margin-top: 25px;
  margin-bottom: 50px;
  border-radius: 25px;
}

.send {
  margin-left: 20px;
}

.images {
  width: 200px;
}

.button {
  background-color: inherit;
  border: 1px solid rgba(238, 72, 37, 0.7);
  border-radius: 5px;
  padding: 5px;
}
.button:hover {
  background-color: rgba(238, 72, 37, 0.7);
  transition: 300ms;
}
</style>
