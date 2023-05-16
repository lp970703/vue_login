<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="login">
    <div class="login_con">
      <a-row
        type="flex"
        :gutter="16"
        justify="center"
        align="middle"
        class="row-content"
      >
        <a-col :span="8" :offset="2">
          <img src="./loginSvg.svg" alt="">
        </a-col>
        <a-col :span="12">
          <div class="layout_con">
            <div class="header_con">
              欢迎使用
            </div>
            <div class="sub">
                新用户？
              <span class="create" @click="goRegisterForm">注册账号</span>
            </div>
            <a-form-model ref="ruleForm" labelAlign='left' :model="ruleForm" :rules="rules" v-bind="layout">
              <a-form-model-item has-feedback label="账号" prop="username">
                <a-input v-model="ruleForm.username" autocomplete="off" allowClear placeholder="请输入账号"/>
              </a-form-model-item>
              <a-form-model-item has-feedback label="密码" prop="password">
                <a-input v-model="ruleForm.password" type="password" autocomplete="off" allowClear placeholder="请输入密码"/>
              </a-form-model-item>
              <a-form-model-item>
                <a-button type="primary" @click="submitForm('ruleForm')" :style="{ width: '100%' ,marginTop:'20px'}">
                  {{ $t('login.login') }}
                </a-button>
              </a-form-model-item>
            </a-form-model>
          </div>
        </a-col>
      </a-row>
    </div>
  </div>
</template>

<script>

export default {
  data () {
    return {
      ruleForm: {
        username: '',
        password: '',
      },
      rules: {
        username: [{ trigger: 'change',required: true,message:'请输入账号' }],
        password: [{ trigger: 'change',required: true,message:'请输入密码' }],
      },
      layout: {
        labelCol: { span: 5 },
        wrapperCol: { span: 20 },
      },
      token:'',
      obj:null,
    }
  },
  components:{
    
  },
  computed: {
    
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          // 验证码；
          // this.handlerclick();
          this.loginApi()
        } else {
          return false;
        }
      });
    },

    keydown(e){
      if(e.keyCode==13){
        this.submitForm('ruleForm')
      }
    },

    // 定义回调函数
    loginApi() {
      let obj={
        username: this.ruleForm.username,
        password: this.ruleForm.password,
        grant_type: 'password',
        // client_id和client_secret需要和后端定义好，每一个client_id对应一个
        client_id: 'ffmepg_demo',
        client_secret: 'DCAQDHZV',
      }
      let config = {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        }
      }
      this.$request.post(this.$API.login, obj, config).then((res) => {
        // 判断token是否存在
        if(res.access_token){
          localStorage.setItem('token',res.access_token)
          localStorage.setItem('loginInfo',JSON.stringify(res))
          this.$router.push({path:'/HelloWorld'})
        }
      })
    },

    // 跳转到注册页面
    goRegisterForm(){
      this.$router.push({path:'/register'})
    },

    // 定义验证码js加载错误处理函数
    loadErrorCallback(){
        var appid = '195445351';
        // 生成容灾票据或自行做其它处理
        var ticket = 'terror_1001_' + appid + '_' + Math.floor(new Date().getTime() / 1000);
        this.callback({
          ret: 0,
          randstr: '@'+ Math.random().toString(36).substr(2),
          ticket: ticket,
          errorCode: 1001,
          errorMessage: 'jsload_error'
        });
     }

  },
  mounted () {
    if(localStorage.getItem('token')){
       this.$router.push({path:'/HelloWorld'})
    }

    window.addEventListener('keydown',this.keydown)
  },
  destroyed(){
    window.removeEventListener('keydown',this.keydown,false)
  }
}
</script>

<style lang="scss" scoped>
.login{
  width: 100%;
  height: 100%;
  background-image: linear-gradient(#e8eeff,#fff);
}

.login_con{
  height: 100%;
  margin: 0 64px;
}

.row-content {
  height: 100%;
}

.layout_con {
  background-color: #fff;
  border-radius: 1em;
  width: 540px;
  height: 640px;
  border: 1px solid #fff;
  margin: 0 auto;
}

.ant-form{
  margin-left: 55px;
  margin-top: 50px;
}

.header_con{
  margin-left: 55px;
  font-family: Noto Sans SC;
  font-style: normal;
  font-weight: 700;
  font-size: 32px;
  height: 100px;
  line-height: 100px;
  color: #000;
}

.sub{
  margin-left: 55px;
  font-family: Noto Sans SC;
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  height: 0px;
  line-height: 32px;
  display: flex;
  align-items: center;
  color: rgba(0, 0, 0, 0.6);
}

.create {
  color: #3761e2;
  cursor: pointer;
}
</style>