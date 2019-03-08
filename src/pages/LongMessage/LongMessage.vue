<template>
  <div :class="{on: '/longmessage'===$route.path}">
    <section class="login_message" >
      <input type="text" v-model="name" maxlength="11" placeholder="手机/邮箱/用户名">
    </section>
    <section class="login_verification">
      <input type="tel" maxlength="8" placeholder="密码" v-if="showPwd" v-model="pwd">
      <input type="password" v-else v-model="pwd" maxlength="8" placeholder="密码">
      <div class="switch_button":class="showPwd ? 'on' : 'off'" @click="showPwd=!showPwd">
        <div class="switch_circle":class="{right:showPwd}"></div>
        <span class="switch_text">{{showPwd ? 'abc':'...'}}</span>
      </div>
    </section>
    <section class="login_message">
      <input type="text" maxlength="11" placeholder="验证码" v-model="captcha">
      <img class="get_verification" src="./images/captcha.svg" alt="captcha">
    </section>
  </div>
</template>

<script>
  export default {
    data(){
      return{
        showPwd:false,
        pwd:'',
        name:'',//用户名
        captcha:''
      }
    }
  }

</script>

<style lang="stylus" rel="stylesheet/stylus">


</style>
