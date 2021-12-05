<template>

<div>
    <div class="modifyAccount">
      <label for=""><b>{{description}}</b></label>
      <input
        type=""
        placeholder=""
        name=""
      />
    </div>
</div>
    
</template>


<script>
export default {
    name:"Inputs",
    props:{
        label:String,
        type:String,
        placeholder:String,
        name:String,
        description:String
    },
    data() {

        
    },
}
</script>