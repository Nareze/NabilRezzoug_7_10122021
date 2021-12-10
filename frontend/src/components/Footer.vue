<template>
<footer class="bg-light text-center text-white">
  <div class="p-4 pb-0">
    <section class="mb-4">
      <a
        class="btn btn-primary btn-floating m-1 facebook"
        href="https://fr-fr.facebook.com/"
        role="button"
        ><i class="fab fa-facebook-f"></i
      ></a>
      <a
        class="btn btn-primary btn-floating m-1 twitter"
        href="https://twitter.com/?lang=fr"
        role="button"
        ><i class="fab fa-twitter"></i
      ></a>
      <a
        class="btn btn-primary btn-floating m-1 instagram"
        href="https://www.instagram.com/?hl=fr"
        role="button"
        ><i class="fab fa-instagram"></i
      ></a>
      <a
        class="btn btn-primary btn-floating m-1 linkedin"
        href="https://fr.linkedin.com/"
        role="button"
        ><i class="fab fa-linkedin-in"></i
      ></a>
      <a
        class="btn btn-primary btn-floating m-1 github"
        href="https://github.com/"
        role="button"
        ><i class="fab fa-github"></i
      ></a>
    </section>
  </div>

  <div class="text-center p-3" style="background-color: rgba(0, 0, 0, 0.2);">
    © 2021 Copyright :
    <a class="text-white" href="#">Groupomania.com</a>
  </div>
</footer>
</template>



<script>
export default {
  name: "FooterItem",
}
</script>


<style lang="scss" scoped>
section{
    height: 50px;
}
a:hover{
  filter: brightness(150%);
}
.facebook{
  background-color: #3b5998;
}
.twitter{
background-color: #55acee;
}
.instagram{
  background-color: #ac2bac;
}
.linkedin{
background-color: #0082ca;
}
.github{
  background-color: #333333;
}

</style>

