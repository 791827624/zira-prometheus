<template>
    <div id="main-page" >
        <div class="header">
            <el-menu
                    :default-active="activeIndex2"
                    class="el-menu-demo"
                    mode="horizontal"
                    @select="handleSelect"
                    background-color="#545c64"
                    text-color="#fff"
                    active-text-color="#ffd04b"
                    >
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
                    <el-menu-item  href="#" @click="logout()" target="_self">登出</el-menu-item>

                </el-submenu>


            </el-menu>
        </div>
        <div class="circle" v-for="cItem in dataHtml" :key="cItem.id">
            <div class="page">
                <div class="title">
                    <el-input v-model.trim="cItem.value" placeholder="输入要查询的指标名称" ></el-input>
                    <div class="button-area">
                        <el-button type="primary" @click="getJson(cItem.id)">查询</el-button>
                        <el-select v-model="cItem.value" placeholder="- insert -">
                            <el-option
                                    value="">
                                - insert -
                            </el-option>
                            <el-option
                                    v-for="item in search(cItem.value)"
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
                                                :description="'实例名称 = '+item.metric.instance + ', 任务 = ' + item.metric.job+'，版本 = ' + item.metric.version"
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
</template>

<script>

    // import axios from 'axios';
    // import { message } from 'ant-design-vue';
    require('../public/images/login-bg.png')

    export default {
        name: 'App',
        data () {
            return {
                // msg:'',
                id: 1,
                kw:'',
                dataHtml: [{ id: 1, value: 'go_info', dataSource: [], spin: false }],
                options: [],
                option:[],
                value: '',
                activeIndex2: '5',
                dataSource: [],
                spin: false,
                showLogin: true,
                form: this.$form.createForm(this),
                validateText:'',
                token:"token",


            }
        },
        methods: {
            search(value){
                // console.log(this.options)
                return this.options.filter(item => item.includes(value))
            },
            handleSelect(key, keyPath) {
                console.log(key, keyPath);
            },
            getJson (id) {
                this.dataHtml.find( item => item.id === id).spin = true;
                this.getRequest('/api/v1/query',{
                    query:this.dataHtml.filter( item => item.id === id)[0].value
                }).then(resp => {
                    if(!resp) return this.dataHtml.find( item => item.id === id).spin = false
                    if(localStorage.getItem("token").length>10) {
                        console.log(resp.data)
                        const { result } = resp.data;
                        console.log(result)
                        this.dataHtml.find( item => item.id === id).dataSource = result;
                        this.dataHtml.find( item => item.id === id).spin = false;
                        setTimeout(()=>{
                            this.logout()
                        },1000000)
                    }
                })
        
            },
            remove (id) {
                this.dataHtml = this.dataHtml.filter( item => item.id !== id);
            },
            addGraph () {
                this.id++;
                this.dataHtml.push({ id: this.id, value: 'go_info', dataSource: [], spin: false });
            },

            logout(){
                localStorage.clear(0);
                this.$message.success("退出登录");
                this.$router.go(-1)
            },
            Get(){
                this.getRequest('/api/v1/label/__name__/values',{
                    _:123
                }).then(res => {
                    this.options=res.data
                    // console.log(res.data)
                })
                // axios({
                //     url:'/api/v1/label/__name__/values',
                //     method:'get',
                //     params:{
                //         _:'123'
                //     }
                // }).then( res =>{

                //     this.options=res.data.data
                    
                // }).catch( () => {
                //     message.error('请求异常!');
                // })
            }

        },
        mounted(){
                this.id++;
                this.id--;
                this.Get();
           
        },
        created() {
            if ( localStorage.getItem("token") == null || localStorage.getItem("token").length<10){
                this.$router.go(-1)
            }
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
    
</style>
