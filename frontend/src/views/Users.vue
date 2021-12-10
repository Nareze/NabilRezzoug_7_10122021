<template>
  <div>
    <div class="container">
      <h2>Liste des utilisateurs</h2>

      <div>
        <ul v-for="user of users" :key="user">
          <li>
            <strong>{{ user.username }}</strong>
          </li>
          <li>{{ user.bio }}</li>
          <li>{{ user.createdAt }}</li>
          <hr />
        </ul>
      </div>
    </div>

    <FooterItem></FooterItem>
  </div>
</template>

<script>
import axios from "axios";
import FooterItem from "../components/Footer.vue";

export default {
  name: "ListOfUsers",
  components: {
    FooterItem,
  },

  data() {
    return {
      users: "",
    };
  },

  created() {
    axios
      .get(`http://localhost:3000/api/user/profiles`, {
        headers: { Authorization: "Bearer " + localStorage.token },
      })
      .then((response) => {
        this.users = response.data;
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  },
};
</script>

<style lang="scss">
@media screen and (max-width: 300px) {
}
</style>
