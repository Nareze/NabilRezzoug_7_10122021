<template>
    <form action="/action_page.php" style="border:1px solid #ccc">
  <div class="container">
    <h1>S'enregistrer</h1>
    <p>Merci de remplir les champs pour s'inscrire</p>
    <hr>

    <label for="email"><b>Adresse Mail</b></label>
    <input type="text" placeholder="Entrer l'Email" name="email" required>

    <label for="psw"><b>Mot de passe</b></label>
    <input type="password" placeholder="Entrer le mot de passe" name="psw" required>

    <label for="uname"><b>Nom d'utilisateur</b></label>
    <input type="text" placeholder="Entrer le nom d'utilisateur" name="uname" required>

    <label for="bio"><b>Description</b></label>
    <input type="text" placeholder="Présentez vous en quelque mots" name="bio" required>

    <div class="clearfix">
      <button type="submit" class="signupbtn">Je m'inscris</button>
    </div>
  </div>
</form>
</template>

<script>
export default {
    name: "SignUp",
}
</script>

<style scoped>

form{
  text-align: center;
  margin-top: 50px;
  border: 3px solid #f1f1f1 !important;
}

body {font-family: Arial, Helvetica, sans-serif;}
* {box-sizing: border-box}


input[type=text], input[type=password] {
  width: 100%;
  padding: 15px;
  margin: 5px 0 22px 0;
  display: inline-block;
  border: none;
  background: #f1f1f1;
}

input[type=text]:focus, input[type=password]:focus {
  outline: none;
}

hr {
  border: 1px solid #f1f1f1;
  margin-bottom: 25px;
}

button {
  background-color: #182B4A !important;
  color: white;
  padding: 14px 20px;
  margin: 8px 0;
  border: none;
  cursor: pointer;
  width: 100%;
  opacity: 0.9;
}

button:hover {
  opacity:0.8;
  background-color: #E62600 !important;
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