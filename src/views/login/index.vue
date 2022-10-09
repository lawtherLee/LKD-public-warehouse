<template>
  <div class="login-container">
    <el-form ref="loginForm" :model="loginForm" :rules="rules" class="login-form" label-position="left">
      <div class="title-container">
        <h3 class="title">
          <img alt="" src="@/assets/common/logo.png">
        </h3>
      </div>
      <el-form-item prop="loginName">
        <span class="svg-container el-icon-mobile-phone" />
        <el-input v-model="loginForm.loginName" />
      </el-form-item>
      <el-form-item prop="password">
        <span class="svg-container el-icon-lock" />
        <el-input ref="pwd" v-model="loginForm.password" :type="passwordType" />
        <span class="svg-container" @click="showpwd">
          <svg-icon :icon-class="passwordType == 'password'?'eye':'eye-open'" />
        </span>
      </el-form-item>
      <el-form-item prop="code">
        <span class="svg-container"><svg-icon icon-class="yanzhengma" /></span>
        <el-input v-model="loginForm.code" placeholder="请输入验证码" />
        <span class="svg-container show-pwd" @click="random">
          <img :src="photoSrc" alt="">
        </span>
      </el-form-item>
      <el-button :loading="loading" class="loginBtn" @click="login">登录</el-button>

    </el-form>
  </div>
</template>
<script>
import { VerificationCodeAPI } from '@/api'

export default {
  name: 'Login',
  data() {
    return {
      passwordType: 'password',
      loginForm: {
        loginName: 'admin',
        password: 'admin',
        code: '', // 验证码
        clientToken: '', // 随机数
        loginType: 0
      },
      photoSrc: '',
      rules: {
        loginName: [
          { required: true, message: '输入账号', trigger: 'blur' },
          { min: 4, max: 10, message: '账号格式错误 ', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '输入密码', trigger: 'blur' },
          { min: 4, max: 16, message: '密码格式错误 ', trigger: 'blur' }
        ],
        code: [
          { required: true, message: '输入验证码', trigger: 'blur' },
          { max: 4, message: '验证码格式错误 ', trigger: 'blur' }
        ]
      },

      loading: false
    }
  },
  created() {
    this.getVerificationCodeAPI()
  },
  methods: {
    showpwd() {
      this.passwordType === 'password' ? this.passwordType = '' : this.passwordType = 'password'
      this.$nextTick(() => {
        this.$refs.pwd.focus()
      })
    },
    // 验证码
    async getVerificationCodeAPI() {
      this.loginForm.clientToken = Math.random().toString()
      const data = await VerificationCodeAPI(this.loginForm.clientToken)
      const blob = new Blob([data.data], { type: 'application/vnd.ms-excel' })
      this.photoSrc = window.URL.createObjectURL(blob)
    },
    // 随机验证码
    random() {
      this.getVerificationCodeAPI()
    },
    // 登录按钮
    async login() {
      try {
        await this.$refs.loginForm.validate()
        this.loading = true
        await this.$store.dispatch('user/login', this.loginForm)
        this.$router.push('/')
      } catch (error) {
        console.log(error)
      } finally {
        this.loading = false
      }
    }
  }
}
</script>

<style lang="scss">
/* 修复input 背景不协调 和光标变色 */
/* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */

$bg: #283443;
$light_gray: #999;
$cursor: #999;

@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
  .login-container .el-input input {
    color: $cursor;
  }
}

/* reset element-ui css */
.login-container {
  background-image: url('~@/assets/common/background.png'); // 设置背景图片
  background-position: center; // 将图片位置设置为充满整个屏幕
  .el-input {
    display: inline-block;
    height: 47px;
    width: 85%;

    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      color: $light_gray;
      height: 47px;
      caret-color: $cursor;

      &:-webkit-autofill {
        box-shadow: 0 0 0px 1000px $bg inset !important;
        -webkit-text-fill-color: $cursor !important;
      }
    }
  }

  .el-form-item {
    border: 1px solid #ccc;
    // background: rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    color: #454545;
    background: rgba(255, 255, 255, 0.7); // 输入登录表单的背景色
  }

  .el-form-item__error {
    color: #f56c6c
  }

  .el-form-item__content {
    font-size: 17px;
    padding-right: 5px;
  }

  .loginBtn {
    background: #6377ec;
    height: 52px;
    line-height: 26px;
    font-size: 14px;
    width: 100%;
    border: none;
    color: #fff;
    margin-top: 7px;
  }

}
</style>

<style lang="scss" scoped>
$bg: #2d3a4b;
$dark_gray: #889aa4;
$light_gray: #68b0fe;
.login-container {
  min-height: 100%;
  width: 100%;
  background-color: $bg;

  .login-form {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 518px;
    max-width: 100%;
    height: 388px;
    padding: 25px 35px 0;
    transform: translate(-50%, -50%);
    background-color: #fff;
    border-radius: 3%;
  }

  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
  }

  .title-container {
    position: relative;

    .title {
      font-size: 26px;
      color: $light_gray;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;

      img {
        position: absolute;
        width: 96px;
        height: 96px;
        top: -117px;
        left: 50%;
        margin-left: -48px;
      }
    }
  }

  .show-pwd {
    position: absolute;
    right: 114px;
    top: -7.25px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }
}
</style>
