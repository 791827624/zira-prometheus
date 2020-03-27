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
            if (localStorage.getItem("token") == undefined){
                // this.$router.push("/main-page")
              this.$router.push("/login")

            }else{
                // this.$router.push("/login")
              this.$router.push("/main-page")

            }
            // this.login()
      }

    }
</script>

