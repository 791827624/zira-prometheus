(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-1aef4d76"],{1954:function(t,e,n){"use strict";n.r(e);var o=function(){var t=this,e=t.$createElement,n=t._self._c||e;return t.showLogin?n("div",{attrs:{id:"login"}},[n("div",{staticClass:"login-center center-width"},[n("div",{staticClass:"center-right"},[n("h1",[t._v("用户登录")]),n("span",[t._v("USER LOGIN")]),n("a-form",{attrs:{layout:"horizontal"}},[n("a-form-item",[n("a-input",{directives:[{name:"decorator",rawName:"v-decorator",value:["name",{rules:[{required:!0,message:"请输入用户名"}]}],expression:"[\n                                                'name',\n                                                { rules: [{ required: true, message: '请输入用户名' }] }\n                                              ]"}],attrs:{placeholder:"请输入用户名"},model:{value:t.logsub[0].mail,callback:function(e){t.$set(t.logsub[0],"mail",e)},expression:"logsub[0].mail"}},[n("a-icon",{staticStyle:{color:"rgba(0,0,0,.25)"},attrs:{slot:"prefix",type:"user"},slot:"prefix"})],1)],1),n("a-form-item",[n("a-input",{directives:[{name:"decorator",rawName:"v-decorator",value:["password",{rules:[{required:!0,message:"请输入密码"}]}],expression:"[\n                                                'password',\n                                                { rules: [{ required: true, message: '请输入密码'}] }\n                                              ]"}],attrs:{type:"password",placeholder:"请输入密码",autocomplete:"on"},model:{value:t.logsub[0].password,callback:function(e){t.$set(t.logsub[0],"password",e)},expression:"logsub[0].password"}},[n("a-icon",{staticStyle:{color:"rgba(0,0,0,.25)"},attrs:{slot:"prefix",type:"lock"},slot:"prefix"})],1)],1),n("a-form-item",[n("a-button",{staticClass:"login-form-button",attrs:{type:"primary",htmlType:"submit"},on:{click:t.login}},[t._v(" 登录 ")])],1)],1)],1)])]):t._e()},i=[],a=(n("3b18"),n("f64c")),s=n("bc3a"),r=n.n(s);n("5404");var c={name:"App",data:function(){return{id:1,kw:"",dataHtml:[{id:1,value:"",dataSource:[],spin:!1}],options:[],selection:[{id:1,value:""},{id:2,value:""}],value:"",activeIndex2:"5",dataSource:[],spin:!1,showLogin:!0,form:this.$form.createForm(this),token:"token",validateText:"",logsub:[{mail:"",password:""}]}},methods:{login:function(){var t=this;r()({method:"post",url:"/user/valid",data:this.logsub[0]}).then((function(e){localStorage.setItem(t.token,e.data.id),null!=localStorage.getItem("token")&&null!=e.data.id?(t.showLogin=!1,location.reload(),setTimeout((function(){t.logout()}),1e6)):(t.showLogin=!0,alert("输入正确的用户名或密码"),t.logsub=[{mail:"",password:""}])})).catch((function(){a["a"].error("请求异常!")}))},logout:function(){localStorage.clear(0),this.showLogin=!0,location.reload(),a["a"].error("请求异常!")},Get:function(){var t=this;r()({url:"/api/v1/label/__name__/values",method:"get",params:{_:"123"}}).then((function(e){t.options=e.data.data})).catch((function(){a["a"].error("请求异常!")}))}},mounted:function(){document.querySelector("#login").style.height=document.documentElement.clientHeight+"px"},created:function(){console.log("hey，你看到我了"),null!=localStorage.getItem("token").value&&void 0!==localStorage.getItem("token").value||(this.showLogin=!0),this.Get()}},l=c,u=(n("1c86"),n("2877")),d=Object(u["a"])(l,o,i,!1,null,null,null);e["default"]=d.exports},"1c86":function(t,e,n){"use strict";var o=n("df8a"),i=n.n(o);i.a},"3b18":function(t,e,n){"use strict";n("b2a3"),n("a1bc")},5404:function(t,e,n){t.exports=n.p+"img/login-bg.99511394.png"},a1bc:function(t,e,n){},df8a:function(t,e,n){},f64c:function(t,e,n){"use strict";var o=n("8e8e"),i=n.n(o),a=n("6042"),s=n.n(a),r=n("2b0e"),c=n("4d91"),l=n("daa3"),u=n("b488");function d(){var t=[].slice.call(arguments,0);return 1===t.length?t[0]:function(){for(var e=0;e<t.length;e++)t[e]&&t[e].apply&&t[e].apply(this,arguments)}}var f=n("94eb");function p(){}var m={mixins:[u["a"]],props:{duration:c["a"].number.def(1.5),closable:c["a"].bool,prefixCls:c["a"].string,update:c["a"].bool,closeIcon:c["a"].any},watch:{duration:function(){this.restartCloseTimer()}},mounted:function(){this.startCloseTimer()},updated:function(){this.update&&this.restartCloseTimer()},beforeDestroy:function(){this.clearCloseTimer(),this.willDestroy=!0},methods:{close:function(t){t&&t.stopPropagation(),this.clearCloseTimer(),this.__emit("close")},startCloseTimer:function(){var t=this;this.clearCloseTimer(),!this.willDestroy&&this.duration&&(this.closeTimer=setTimeout((function(){t.close()}),1e3*this.duration))},clearCloseTimer:function(){this.closeTimer&&(clearTimeout(this.closeTimer),this.closeTimer=null)},restartCloseTimer:function(){this.clearCloseTimer(),this.startCloseTimer()}},render:function(){var t,e=arguments[0],n=this.prefixCls,o=this.closable,i=this.clearCloseTimer,a=this.startCloseTimer,r=this.$slots,c=this.close,u=n+"-notice",d=(t={},s()(t,""+u,1),s()(t,u+"-closable",o),t),f=Object(l["p"])(this),m=Object(l["g"])(this,"closeIcon");return e("div",{class:d,style:f||{right:"50%"},on:{mouseenter:i,mouseleave:a,click:Object(l["j"])(this).click||p}},[e("div",{class:u+"-content"},[r["default"]]),o?e("a",{attrs:{tabIndex:"0"},on:{click:c},class:u+"-close"},[m||e("span",{class:u+"-close-x"})]):null])}},h=n("db14");function v(){}var g=0,y=Date.now();function b(){return"rcNotification_"+y+"_"+g++}var C={mixins:[u["a"]],props:{prefixCls:c["a"].string.def("rc-notification"),transitionName:c["a"].string,animation:c["a"].oneOfType([c["a"].string,c["a"].object]).def("fade"),maxCount:c["a"].number,closeIcon:c["a"].any},data:function(){return{notices:[]}},methods:{getTransitionName:function(){var t=this.$props,e=t.transitionName;return!e&&t.animation&&(e=t.prefixCls+"-"+t.animation),e},add:function(t){var e=t.key=t.key||b(),n=this.$props.maxCount;this.setState((function(o){var i=o.notices,a=i.map((function(t){return t.key})).indexOf(e),s=i.concat();return-1!==a?s.splice(a,1,t):(n&&i.length>=n&&(t.updateKey=s[0].updateKey||s[0].key,s.shift()),s.push(t)),{notices:s}}))},remove:function(t){this.setState((function(e){return{notices:e.notices.filter((function(e){return e.key!==t}))}}))}},render:function(t){var e=this,n=this.prefixCls,o=this.notices,i=this.remove,a=this.getTransitionName,r=Object(f["a"])(a()),c=o.map((function(a,s){var r=Boolean(s===o.length-1&&a.updateKey),c=a.updateKey?a.updateKey:a.key,u=a.content,f=a.duration,p=a.closable,h=a.onClose,g=a.style,y=a["class"],b=d(i.bind(e,a.key),h),C={props:{prefixCls:n,duration:f,closable:p,update:r,closeIcon:Object(l["g"])(e,"closeIcon")},on:{close:b,click:a.onClick||v},style:g,class:y,key:c};return t(m,C,["function"===typeof u?u(t):u])})),u=s()({},n,1),p=Object(l["p"])(this);return t("div",{class:u,style:p||{top:"65px",left:"50%"}},[t("transition-group",r,[c])])},newInstance:function(t,e){var n=t||{},o=n.getContainer,a=n.style,s=n["class"],c=i()(n,["getContainer","style","class"]),l=document.createElement("div");if(o){var u=o();u.appendChild(l)}else document.body.appendChild(l);var d=h["a"].Vue||r["default"];new d({el:l,mounted:function(){var t=this;this.$nextTick((function(){e({notice:function(e){t.$refs.notification.add(e)},removeNotice:function(e){t.$refs.notification.remove(e)},component:t,destroy:function(){t.$destroy(),t.$el.parentNode.removeChild(t.$el)}})}))},render:function(){var t=arguments[0],e={props:c,ref:"notification",style:a,class:s};return t(C,e)}})}},w=C,x=w,k=n("0c63"),T=3,_=void 0,I=void 0,N=1,S="ant-message",$="move-up",O=function(){return document.body},j=void 0;function L(t){I?t(I):x.newInstance({prefixCls:S,transitionName:$,style:{top:_},getContainer:O,maxCount:j},(function(e){I?t(I):(I=e,t(e))}))}function q(t){var e=void 0!==t.duration?t.duration:T,n={info:"info-circle",success:"check-circle",error:"close-circle",warning:"exclamation-circle",loading:"loading"}[t.type],o=N++,i=new Promise((function(i){var a=function(){return"function"===typeof t.onClose&&t.onClose(),i(!0)};L((function(i){i.notice({key:o,duration:e,style:{},content:function(e){return e("div",{class:S+"-custom-content"+(t.type?" "+S+"-"+t.type:"")},[t.icon?"function"===typeof t.icon?t.icon(e):t.icon:n?e(k["a"],{attrs:{type:n,theme:"loading"===n?"outlined":"filled"}}):"",e("span",["function"===typeof t.content?t.content(e):t.content])])},onClose:a})}))})),a=function(){I&&I.removeNotice(o)};return a.then=function(t,e){return i.then(t,e)},a.promise=i,a}var E={open:q,config:function(t){void 0!==t.top&&(_=t.top,I=null),void 0!==t.duration&&(T=t.duration),void 0!==t.prefixCls&&(S=t.prefixCls),void 0!==t.getContainer&&(O=t.getContainer),void 0!==t.transitionName&&($=t.transitionName,I=null),void 0!==t.maxCount&&(j=t.maxCount,I=null)},destroy:function(){I&&(I.destroy(),I=null)}};["success","info","warning","error","loading"].forEach((function(t){E[t]=function(e,n,o){return"function"===typeof n&&(o=n,n=void 0),E.open({content:e,duration:n,type:t,onClose:o})}})),E.warn=E.warning;e["a"]=E}}]);
//# sourceMappingURL=chunk-1aef4d76.9aab242e.js.map