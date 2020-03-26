<template>
  <div id="app">

    <router-view></router-view>

  </div>

</template>

<script>
  // eslint-disable-next-line no-unused-vars
   import axios from 'axios';
  // eslint-disable-next-line no-unused-vars
   import { message } from 'ant-design-vue';
    export default {
      name: 'App',
      method:{

    }
      ,
      mounted(){
            if (localStorage.getItem("token") != undefined && localStorage.getItem("token") != null){
                this.$router.push("/main-page")
            }else{
                this.$router.push("/login")
            }
            // this.login()
      }

    }
</script>

