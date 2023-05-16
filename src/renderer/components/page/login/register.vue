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
              注册新用户
            </div>
            <div class="sub">
                已注册？
              <span class="create" @click="goLoginForm">返回登录</span>
            </div>
            <a-form-model ref="ruleForm" labelAlign='left' :model="ruleForm" :rules="rules" v-bind="layout">
                <a-form-model-item has-feedback label="手机号" prop="phone">
                <a-input v-model="ruleForm.phone" autocomplete="off" allowClear placeholder="注册手机号"/>
              </a-form-model-item>
              <a-form-model-item has-feedback label="邮箱" prop="email">
                <a-input v-model="ruleForm.email" autocomplete="off" allowClear placeholder="注册邮箱"/>
              </a-form-model-item>
              <a-form-model-item has-feedback label="账号" prop="username">
                <a-input v-model="ruleForm.username" autocomplete="off" allowClear placeholder="注册账号"/>
              </a-form-model-item>
              <a-form-model-item has-feedback label="密码" prop="password">
                <a-input v-model="ruleForm.password" type="password" autocomplete="off" allowClear placeholder="注册密码"/>
              </a-form-model-item>
              <a-form-model-item>
                <a-button type="primary" @click="submitForm('ruleForm')" :style="{ width: '100%' ,marginTop:'20px'}">
                  {{ $t('login.register') }}
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
import check from '../../commonjs/check'
const { testMobile, testEmail } = check()
export default {
  data () {
    let checkMobile = (rule, value ,callback) => {
        if (!testMobile(value)) {
            callback(new Error('手机号格式不正确，请重新输入'));
        } else {
            callback();
        }
    }
    let checkEmail = (rule, value, callback) => {
        if (!testEmail(value)) {
            callback(new Error('邮箱格式不正确，请重新输入'));
        } else {
            callback();
        }
    }
    return {
      ruleForm: {
        username: '',
        password: '',
        phone: '',
        email: '',
      },
      rules: {
        phone: [{ trigger: 'change',required: true, validator: checkMobile }],
        email: [{ trigger: 'change',required: true, validator: checkEmail }],
        username: [{ trigger: 'change', required: true, message:'用户名不能为空' }],
        password: [{ trigger: 'change', required: true, message:'密码不能为空' }],
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
          this.registerApi()
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
    registerApi() {
      let obj={
        phone: this.ruleForm.phone,
        email: this.ruleForm.email,
        username: this.ruleForm.username,
        password: this.ruleForm.password,
        // client_id和client_secret需要和后端定义好，每一个client_id对应一个
        clientId: 'ffmepg_demo',
        clientSecret: 'DCAQDHZV',
      }
    //   let config = {
    //     headers: {
    //       'Content-Type': 'application/x-www-form-urlencoded',
    //     }
    //   }
      this.$request.post(this.$API.register, obj).then((res) => {
        if(res.status==200){
            switch (res.data.registerCode) {
                case '40001':
                    alert('注册成功!  点击确认，跳转到登录页面');
                    this.$router.push({path:'/login'})     
                    break;
                case '40002':
                    alert('该手机号已注册,请更换手机');  
                    break;
                case '40003':
                    alert('账号已注册');  
                    break;  
                case '40004':
                    alert('该客户端id并未授权');  
                    break;                 
                default:
                    break;
            }
        }
      })
    },

    // 跳转到注册页面
    goLoginForm(){
      this.$router.push({path:'/login'})
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
  margin-top: 20px;
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