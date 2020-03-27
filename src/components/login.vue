<template>
    <div id="login" v-if="showLogin">
        <div class="login-center center-width">
            <div class="center-right">
                <h1>用户登录</h1>
                <span>USER &nbsp;&nbsp;LOGIN</span>
<!--                {{logsub.mail}}-->
<!--                {{logsub.password}}-->
<!--                {{logsub}}-->
                <a-form layout="horizontal"  >
                    <a-form-item>

                        <a-input v-model="logsub[0].mail" v-decorator="[
                                                'name',
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
                        <a-input v-model="logsub[0].password" type="password" v-decorator="[
                                                'password',
                                                { rules: [{ required: true, message: '请输入密码'}] }
                                              ]"
                                 placeholder="请输入密码"
                                 autocomplete="on">
                            <a-icon
                                    slot="prefix"
                                    type="lock"
                                    style="color: rgba(0,0,0,.25)"
                            />
                        </a-input>
                    </a-form-item>
                    <!--              <a-form-item>-->
                    <!--                <a-input v-decorator="[-->
                    <!--                                                'pass',-->
                    <!--                                                { rules: [{ required: true, message: '请输入验证码!' }] }-->
                    <!--                                              ]"-->
                    <!--                         placeholder="请输入验证码">-->
                    <!--                  <a-icon-->
                    <!--                          slot="prefix"-->
                    <!--                          type="safety-certificate"-->
                    <!--                          style="color: rgba(0,0,0,.25)"-->
                    <!--                  />-->
                    <!--                </a-input>-->
                    <!--                <a-button class="verify" @click="sendCode" :disabled="disabled" :loading="loading_code">{{validateText}}</a-button>-->
                    <!--              </a-form-item>-->
                    <a-form-item>
                        <a-button type="primary" htmlType="submit" class="login-form-button" @click="login">
                            登录
                        </a-button>
                    </a-form-item>
                </a-form>
            </div>
        </div>
    </div>
</template>
<script>
    import axios from 'axios';
    import { message } from 'ant-design-vue';
    require('../public/images/login-bg.png')
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
                token:'token',
                validateText:'',
                logsub:[{mail:'',password:''}],
                // mail:'',
                // password:''
            }
        },
        methods: {
            // search(){
            //     return this.options.filter(item => item.includes(this.dataHtml[0].value.substring(0,5)))
            // },
            // handleSelect(key, keyPath) {
            //     console.log(key, keyPath);
            // },
            // getJson (id) {
            //     this.dataHtml.find( item => item.id === id).spin = true;
            //     axios({
            //         url: '/api/v1/query',
            //         method: 'get',
            //         params: {
            //             query: this.dataHtml.filter( item => item.id === id)[0].value
            //         }
            //     }).then( res => {
            //         const { result } = res.data.data;
            //         this.dataHtml.filter( item => item.id === id)[0].dataSource = result;
            //         this.dataHtml.filter( item => item.id === id)[0].spin = false;
            //     }).catch( () => {
            //         message.error('请求异常!');
            //         this.dataHtml.filter( item => item.id === id)[0].spin = false;
            //     })
            // },
            // remove (id) {
            //     this.dataHtml = this.dataHtml.filter( item => item.id !== id);
            // },
            // addGraph () {
            //     this.id++;
            //     this.dataHtml.push({ id: this.id, value: '', dataSource: [], spin: false });
            // },
            login () {

                axios({
                    method:'post',
                    url:'/user/valid',
                    data: this.logsub[0]

                }).then( res =>{
                    localStorage.setItem(this.token,res.data.id)
                    if(localStorage.getItem("token") != null && res.data.id!=null){
                        this.showLogin=false;
                        location.reload();
                        setTimeout(()=>{
                            this.logout()
                        },1000000)
                    }else{
                        this.showLogin=true;
                        alert("输入正确的用户名或密码");
                        this.logsub=[{mail:'',password:''}];
                        // location.reload()
                    }
                }).catch( () => {
                    message.error('请求异常!');
                })



                // localStorage.setItem(this.token,Math.random()*10+Math.random()*100);
                // if(localStorage.getItem("token") != null){
                //     this.showLogin = false;
                //     location.reload();
                //     setTimeout(() => {
                //         this.logout();
                //     },1000000)
                // }else{
                //     this.showLogin=true;
                //     // console.log(localStorage.getItem("token") === null)
                //
                // }
            },
            logout(){
                localStorage.clear(0);
                this.showLogin=true;
                location.reload();
                message.error('请求异常!');

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
            }

        },
        mounted(){
            document.querySelector('#login').style.height = document.documentElement.clientHeight + 'px';
            if(localStorage.getItem("token") != undefined && localStorage.getItem("token") != null){
                this.showLogin = false;
            }else{

                this.showLogin = true;
            }
        },
        created() {
            console.log("123123");
            this.Get();
        }

    }
</script>

<style lang="less">
    require('../public/images/login-bg.png')

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
        background: url("../public/images/login-bg.png") no-repeat;
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
