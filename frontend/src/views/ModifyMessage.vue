<template>
    <div class="container" >
          <form class="sendMessage">
      <h3>Modifier votre message</h3>
      <hr>
          <label for="Titre"><b>Nouveau titre</b></label>
          <input type="text" name="newtitre" v-model="newtitre" />
          
          <label for="Contenu"><b>Nouveau message</b></label>
          <textarea type="text" name="newcontenu"  v-model="newcontenu" />
          
          <br>
          <label for="Image"><b>Nouvelle Image</b></label>
          <input
            type="file"
            name="image"
            @change="handleFileUpload($event)"
          />
          <button v-on:click="update()">Envoyer</button>
  </form>
    </div>
</template>




<script>

import axios from "axios"

export default {
    name: "updateMessage",
    data() {
        return {
          dato:{},
            newtitre:"",
            newcontenu:"",
            file:"",
            messages:"",
        }
    },
    methods:{
        handleFileUpload(event) {
      this.file = event.target.files[0];
    },
    update(){
        let formData = new FormData();

      formData.append("image", this.file);
      formData.append("newtitre", this.newtitre);
      formData.append("newcontenu", this.newcontenu);

    axios
        .put(`http://localhost:3000/api/message/${this.$route.params.messageId}`, formData, {
          headers: {
            Authorization: "Bearer " + localStorage.token,
            "Content-Type": "multipart/form-data",
          },
        })
          .then((response) => {
          alert("Message modifié")
          console.log(response),
          this.$router.push("/messageList");
          })
        .catch((err) => {console.log(err), alert("Vous ne pouvez pas modifier les messages d'autres utilisateurs !"), this.$router.push("/messageList")});
    }
    },

}
</script>



