<template>
  <div id="app">

    <router-view></router-view>

  </div>

</template>

<script>
  // eslint-disable-next-line no-unused-vars
   import axios from 'axios';
   import router from "./router/router";
  // eslint-disable-next-line no-unused-vars
   import { message } from 'ant-design-vue';
    export default {
      name: 'App',
      method:{
      }
      ,
      mounted(){
            if (localStorage.getItem("token").value == undefined || localStorage.getItem("token").value == null){
              router.push("/login")

            }else{
              router.push("/main-page")

            }
            // this.login()
      }

    }
</script>

