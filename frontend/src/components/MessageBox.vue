<template>
  <div>

  </div>

</template>


<script>

import axios from "axios"

export default ({
    name:"MessageBox",



  data() {
    return {
      titre: "",
      contenu: "",
      image: "",
      msg: ""
    };
  },


  mounted() {
    axios
      .get("http://localhost:3000/api/message/users")
      .then(response => {
        this.msg = response.data;
      })
      .catch(error => console.log(error));

  },


})
</script>
