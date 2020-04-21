<template>
  <div id="app">
    <router-view></router-view>
  </div>

</template>

<script>
   // import router from "./router/router";
    export default {
      name: 'App',
      method:{
      },
      mounted(){
        if ( !localStorage.getItem("token") || localStorage.getItem("token").length<10){
          this.$router.push('/login')
        }
      }

    }
</script>

