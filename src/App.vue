<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
    import router from "./router/router";
    export default {
      name: 'App',
      mounted(){
            if (localStorage.getItem("token")){
                router.push("/main-page")
            }else{
                router.push("/login")
            }
      }

    }
</script>

