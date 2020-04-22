<template>
    <el-form :rules="rule"
             ref="loginFormRef"
             class="login-container"
             :model="loginForm"
             label-position="left"
             label-width="0px"
    >
      <h3 class="login-title">监控系统登录</h3>
      <el-form-item prop="username">
        <el-input v-model="loginForm.username" placeholder="账号" prefix-icon="el-icon-user"></el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input v-model="loginForm.password" placeholder="账号" prefix-icon="el-icon-lock" type="password"></el-input>
      </el-form-item>
      <el-form-item>
        <el-checkbox class="login-remember" v-model="checked">记住密码</el-checkbox>
      </el-form-item>
      <el-form-item class="btn">
        <el-button type="primary"  @click="login">登录</el-button>
        <el-button type="info"  @click="resetLogin">重置</el-button>
      </el-form-item>
    </el-form>
</template>

<script>
  export default {
    name: 'login',
    data() {
      return {
        rule:{
          username:[
            {required:true,message:'输入用户名',trigger:'blur'},
            {min:8,max:30,message: '用户名长度在8-30之间',trigger:'blur'}
            ],
          password:[
            {required:true,message:'输入密码',trigger:'blur'},
            {min:8,max:20,message: '密码长度在8-20之间',trigger: 'blur'}
            ]
        },
        loginForm:{
          username:"",
          password:""
        },
        checked:true,
        loading:false,
      }
    },
    methods:{
      resetLogin:function () {
          this.$refs.loginFormRef.resetFields();
          console.log('已重置')
      },
      login:function () {
        this.$refs.loginFormRef.validate(async valid => {
          if(!valid) return;
          this.postRequest('/user/valid',{
            mail: this.loginForm.username,
            password: this.loginForm.password
          }).then(resp => {
            console.log(resp)
            localStorage.setItem('token',resp.id)
            if(resp && resp.status == 200) {
              console.log('success')
              this.$router.push('/main-page')
            }
          })
        })
      },
      submitClick: function () {
        let _this=this;
        this.loading = true;
        this.postRequest('/login',{
          mail: this.loginForm.username,
          password: this.loginForm.password
        }).then(res =>{
          _this.loading = false;
          if (res && res.status == 200) {
            const data = res.data;
            _this.$store.commit('login',data.obj);
            const path = _this.$route.query.redirect;
            _this.$router
              .replace({path:path == '/' || path==undefined ? '/header':path});
          }
        })

      }
      }


  }
</script>

<style scoped>
  .login-container{
    border-radius: 15px;
    background-clip: padding-box;
    background: white;
    margin: 180px auto;
    width: 350px;
    padding: 35px 35px 20px 35px;
    border: 1px solid #2c3e50;
    box-shadow: 0 0 10px #2c3e50;
  }
  .login-title {
    margin: 0px auto 40px auto;
    text-align: center;
    color: #505458;
  }
  .login-remember {
    margin: 1px 0px 4px 0px;
    text-align: center;
  }
  .btn{
    width:100%;
    display: flex;
    justify-content: space-between;
  }
  .btn button {
    width: 120px;
  }
</style>
