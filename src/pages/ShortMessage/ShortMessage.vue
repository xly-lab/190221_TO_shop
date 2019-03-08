<template>
  <div :class="{on: '/shortmessage'===$route.path}">
    <section class="login_message">
      <input type="tel" maxlength="11" placeholder="手机号" v-model="phone">
      <button :disabled="!rightPhone" class="get_verification" :class="{right_phone:rightPhone}"
              @click.prevent="getCode">{{computeTime>0 ? `以发送${computeTime}s`:'获取验证码'}}</button>
    </section>
    <section class="login_verification">
      <input type="tel" maxlength="8" placeholder="验证码" v-model="code">
    </section>
    <section class="login_hint">
      温馨提示：未注册硅谷外卖帐号的手机号，登录时将自动注册，且代表已同意
      <a href="javascript:;">《用户服务协议》</a>
    </section>
  </div>

</template>

<script>
  export default {
    data(){
      return{
        phone:'',//手机号
        computeTime:0,//计时的时间
        code:''//短信验证码
      }
    },
    methods:{
      getCode(){
                //如果没有计时
                if(!this.computeTime){
                  //启动倒计时
                  this.computeTime=30
                  setInterval(()=>{
                    this.computeTime--
                    if(this.computeTime<=0){
                      clearInterval()
            }
          },1000)
          //发送ajax请求（想指定手机号发送验证码）
        }
      }
    },
    computed:{
      rightPhone(){
        return /^1\d{10}$/.test(this.phone)
      }
    }
  }

</script>

<style lang="stylus" rel="stylesheet/stylus">


</style>
