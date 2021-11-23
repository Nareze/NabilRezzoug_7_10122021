<template>

<form action="/action_page.php" method="post">
    <h1>Connexion</h1>
    <p>Bienvenue</p>
    <hr>

  <div class="container">
    <label for="uname"><b>Nom d'utilisateur</b></label>
    <input type="text" placeholder="Entrer le nom d'utilisateur" name="uname" required>

    <label for="psw"><b>Mot de passe</b></label>
    <input type="password" placeholder="Enter le mot de passe" name="psw" required>
        
    <button type="submit">Connexion</button>
  </div>
</form>
    
</template>


<script>

export default {
    name: "Login",
}
</script>


<style scoped>

body {font-family: Arial, Helvetica, sans-serif;}
form {border: 3px solid #f1f1f1; text-align: center;margin-top: 50px;}

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


button {
  background-color: #182B4A !important;
  color: white;
  padding: 14px 20px;
  margin: 8px 0;
  border: none;
  cursor: pointer;
  width: 100%;
  margin-top: 25px;
}

hr {
  border: 1px solid #f1f1f1;
  margin-bottom: 25px;
}

button:hover {
  opacity: 0.8;
  background-color: #E62600 !important;
  transition: 300ms;
}

.container {
  padding: 16px;
}

span.psw {
  float: right;
  padding-top: 16px;
}


@media screen and (max-width: 300px) {
  span.psw {
     display: block;
     float: none;
  }
}

</style>
