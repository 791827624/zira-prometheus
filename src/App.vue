<template>

  <div id="app">
      <div id="main-page" v-if="!showLogin">
        <div class="header">
          <el-menu
                  :default-active="activeIndex2"
                  class="el-menu-demo"
                  mode="horizontal"
                  @select="handleSelect"
                  background-color="#545c64"
                  text-color="#fff"
                  active-text-color="#ffd04b">
            <el-menu-item index="1" disabled>Web consoles</el-menu-item>
            <el-menu-item index="3"><a href="http://101.132.169.36:9090/alerts">告警</a></el-menu-item>
            <el-menu-item index="5">Web consoles</el-menu-item>
            <el-submenu index="2">
              <template slot="title">状态</template>
              <el-menu-item index="2-1"><a href="http://101.132.169.36:9090/status" target="_blank" >运行与构建时间</a></el-menu-item>
              <el-menu-item index="2-2"><a href="http://101.132.169.36:9090/flags" target="_blank">命令行标志</a></el-menu-item>
              <el-menu-item index="2-3"><a href="http://101.132.169.36:9090/config" target="_blank">设置</a></el-menu-item>
              <el-menu-item index="2-4"><a href="http://101.132.169.36:9090/rules" target="_blank">规则</a></el-menu-item>
              <el-menu-item index="2-5"><a href="http://101.132.169.36:9090/targets" target="_blank">抓取目标</a></el-menu-item>
              <el-menu-item index="2-6"><a href="http://101.132.169.36:9090/service-discovery" target="_blank">服务与发现</a></el-menu-item>
            </el-submenu>
            <el-menu-item index="4"><a href="https://prometheus.io/docs/prometheus/latest/getting_started/">帮助</a></el-menu-item>
            <el-submenu index="5">
              <template slot="title">操作</template>
            </el-submenu>
            <button  href="#" @click="logout()" target="_self">登出</button>

          </el-menu>
        </div>
        <div class="circle" v-for="cItem in dataHtml" :key="cItem.id">
          <div class="page">
            <div class="title">
              <el-input v-model.trim="cItem.value" placeholder="输入要查询的指标名称" ></el-input>
              <ul v-for="item in search(options)"
                  role="listbox"
                  :key="item"
                  :label="item"
                  style="top: 38px; left: 5px; display: block;">

              </ul>
              <div class="button-area">
                <el-button type="primary" @click="getJson(cItem.id)">查询</el-button>
                <el-select v-model="cItem.value" placeholder="- insert -">
                  <el-option
                          value="">
                    - insert -
                  </el-option>
                  <el-option
                          v-for="item in search(options)"
                          :key="item"
                          :label="item"
                          :value="item">
                  </el-option>

                </el-select>
              </div>
            </div>
            <div class="tab">
              <el-tabs type="border-card">
                <el-tab-pane label="Console">
                  <a-spin :spinning="cItem.spin" tip="获取json数据中...">
                    <a-list itemLayout="horizontal" :dataSource="cItem.dataSource" style="text-align: left;">
                      <a-list-item slot="renderItem" slot-scope="item">
                        <a-list-item-meta
                                :description="item.metric.instance + '' + item.metric.job + '' + item.metric.version"
                        >
                          <a slot="title" href="javascript:;">{{item.metric.__name__}}</a>
                        </a-list-item-meta>
                        <h3>{{item.value}}</h3>
                      </a-list-item>
                    </a-list>
                  </a-spin>
                </el-tab-pane>
              </el-tabs>
              <a href="javascript:;" @click="remove(cItem.id)">删除</a>
            </div>
          </div>
        </div>

        <div class="operation">
          <el-button type="primary" @click="addGraph">
            添加查询
          </el-button>
        </div>

      </div>

      <div id="login" v-if="showLogin" >
      <div class="login-center center-width">
        <div class="center-right">
          <h1>用户登录</h1>
          <span>USER &nbsp;&nbsp;LOGIN</span>
          <a-form layout="horizontal" :form="form">
            <a-form-item>
              <a-input v-decorator="[
                                              'user',
                                              { rules: [{ required: true, message: '请输入用户名' }] }
                                            ]"
                       placeholder="请输入用户名">
                <a-icon
                        slot="prefix"
                        type="user"
                        style="color: rgba(0,0,0,.25)"
                />
              </a-input>
            </a-form-item>
            <a-form-item>
              <a-input v-decorator="[
                                              'password',
                                              { rules: [{ required: true, message: '请输入密码' }] }
                                            ]"
                       placeholder="请输入密码">
                <a-icon
                        slot="prefix"
                        type="lock"
                        style="color: rgba(0,0,0,.25)"
                />
              </a-input>
            </a-form-item>
            <!--<a-form-item>
              <a-input v-decorator="[
                                              'pass',
                                              { rules: [{ required: true, message: '请输入验证码!' }] }
                                            ]"
                       placeholder="请输入验证码">
                <a-icon
                        slot="prefix"
                        type="safety-certificate"
                        style="color: rgba(0,0,0,.25)"
                />
              </a-input>
              <a-button class="verify" @click="sendCode" :disabled="disabled" :loading="loading_code">{{validateText}}</a-button>
            </a-form-item>-->
            <a-form-item>
              <a-button type="primary" htmlType="submit" class="login-form-button" @click="login">
                登录
              </a-button>
            </a-form-item>
          </a-form>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
import axios from 'axios';
import { message } from 'ant-design-vue';

export default {
  name: 'App',
  data () {
    return {
      id: 1,
      kw:'',
      dataHtml: [{ id: 1, value: '', dataSource: [], spin: false }],
      options: [],
      selection:[{id:1,value:''},{id:2,value:''}],
      value: '',
      activeIndex2: '5',
      dataSource: [],
      spin: false,
      showLogin: true,
      form: this.$form.createForm(this),
      token:'token'

    }
  },
   methods: {
      search(){
            return this.options.filter(item => item.includes(this.dataHtml[0].value.substring(0,5)))
      },
     handleSelect(key, keyPath) {
       console.log(key, keyPath);
     },
     getJson (id) {
       this.dataHtml.find( item => item.id === id).spin = true;
       axios({
         url: '/api/v1/query',
         method: 'get',
         params: {
           query: this.dataHtml.filter( item => item.id === id)[0].value
         }
       }).then( res => {
         const { result } = res.data.data;
         this.dataHtml.filter( item => item.id === id)[0].dataSource = result;
         this.dataHtml.filter( item => item.id === id)[0].spin = false;
       }).catch( () => {
         message.error('请求异常!');
         this.dataHtml.filter( item => item.id === id)[0].spin = false;
       })
     },
     remove (id) {
       this.dataHtml = this.dataHtml.filter( item => item.id !== id);
     },
     addGraph () {
       this.id++;
       this.dataHtml.push({ id: this.id, value: '', dataSource: [], spin: false });
     },
     login () {
       localStorage.setItem(this.token,Math.random()*10+Math.random()*100);
       if(localStorage.getItem("token") != null){
         this.showLogin = false;
         setTimeout( ()=> {
           this.logout();
         },300000)
       }else{
         this.showLogin=true;
       }
     },
     logout(){
        localStorage.clear(0);
        this.showLogin=true
     },
     Get(){
       axios({
         url:'/api/v1/label/__name__/values',
         method:'get',
          params:{
            _:'123'
          }
       }).then( res =>{
           this.options = res.data.data
           // this.options=[...this.options,...this.selection.data]
           // console.log(this.options)
       }).catch( () => {
         message.error('请求异常!');
       })
     },
     check(){
        setTimeout(function () {
          this.logout();
        },4000)
     }

   },
  mounted(){
    document.querySelector('#login').style.height = document.documentElement.clientHeight + 'px';
    if(localStorage.getItem("token") != null){
      this.showLogin = false;
    }else{
      this.showLogin=true;
    }

  },
  created() {
    this.Get();
    }

}
</script>

<style lang="less">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
  .page{
    padding: 30px;
    padding-bottom: 0;
    .title{
      text-align: left;
      button{
        margin:  15px 15px 15px 0;
      }
    }
  }
  .tab{
    text-align: right;
    a{
      display: inline-block;
      margin-top: 10px;
    }
  }
  .operation{
    text-align: left;
    padding-left: 30px;
  }
#login{
  background: url("public/images/login-bg.png") no-repeat;
  background-size: cover;
  min-width: 1200px;
  /deep/ .ant-btn{
    span{
      font-size: 16px;
    }
  }
  .center-width{
    width: 1200px;
    margin: 0 auto;
  }
  .login-center{
    padding-top: 250px;
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    .center-right{
      width: 400px;
      height: 400px;
      text-align: left;
      h1{
        font-size: 24px;
        color: #4452D5;
        font-weight: normal;
      }
      span{
        font-size: 14px;
        color: #B5B5B5;
      }
      .ant-input{
        width: 300px;
        height: 40px;
      }
      span{
        color:#B5B5B5;
      }
      /deep/ .login-form-button{
        width: 300px;
        height: 40px;
        margin-top: 5px;
        span{
          font-size: 17px !important;
          color: white;
        }
      }
      /deep/ .ant-form-item{
        margin-top: 25px;
        input{
          padding-left: 40px;
        }
      }
      /deep/ .ant-form-item:first-child{
        margin-top: 25px;
      }
      /deep/ .ant-form-item:nth-child(2){
        margin-bottom: 25px;
      }
      /deep/.ant-form-item:nth-child(3){
        margin-top: 0;
        input{
          width: 170px;
        }
      }
      .register{
        margin-top: 0px;
        span{
          color: #1C93FF;
          cursor: pointer;
          margin-left: 5px;
          &:hover{
            text-decoration: underline;
          }
        }
      }
      .has-success{
        line-height: 0px;
      }
      /deep/ .ant-input-affix-wrapper{
        width: 300px;
        height: 40px;
      }
      /deep/ .ant-form-item{
        &:nth-child(2){
          margin-bottom: 25px;
          .ant-input-affix-wrapper{
            width: 150px;
            height: 40px;
          }
        }
        &:nth-child(4){
          margin-top: 0;
        }
      }
      .verify{
        height: 40px;
        margin-left: 10px;
      }
      /deep/ .ant-btn{
        span{
          font-size: 14px;
        }
      }
    }
    /deep/ .ant-input-prefix{
      font-size: 16px !important;
      left: 10px;
    }
  }
}
</style>
