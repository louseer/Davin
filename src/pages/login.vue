<template>
  <div class="bg">
    <div class="img_box"></div>
    
    <!-- <div class="login_box"  :style="{
      transform: scale+' translateY(-50%)'
    }" > -->
    <div class="login_box"  >
    <div>
      <div class="logo"></div>
      <h6>DaVinci AugmentedAnalytics Platform</h6>
   
      <el-form ref="form" :model="form" class="login_form" :rules="rules">
        <el-form-item prop="username" class="userNameInput">
          <el-input
            type="username"
            placeholder="请输入用户名"
            v-model="form.username"
           
          ></el-input>
        </el-form-item>
        <el-form-item prop="password" class="passwordInput">
          <el-input
            type="password"
            placeholder="请输入密码"
          
            v-model="form.password"
         
          ></el-input> 
        </el-form-item>
        <el-form-item class="login-btn-item">
          <el-button class="login-btn" >Login</el-button>
        </el-form-item>
      </el-form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // screenWidth: "",
      //   screenHeight: "",
        form: {
          username: '',
          password: '',
        },
           rules: {
        username: [
            {validator: this.validateUsername}
          ],
          password: [
            {validator: this.validatePassword}
          ]
          
        }
    };
  },
  methods: {
    //  resize: function () {
    //     let contW = 1920;
    //     let contH = 1080;
    //     let cliWidth = document.documentElement.clientWidth || document.body.clientWidth;
    //     let cliHeight = document.documentElement.clientHeight || document.body.clientHeight;
    //     let w = cliWidth / contW;
    //     let h = cliHeight / contH;
    //     this.$store.commit( 'transform/SET_W', w )
    //     this.$store.commit( 'transform/SET_H', h )
    //   },
     isSpecificSymbol: function (str) {
        var pattern = new RegExp("[`~!@#$^&*()=|{}':;',\\[\\].<>/?~！@#￥……&*（）——|{}【】‘；：”“'。，、？%+_]");
        return pattern.test(str);
      },
       validateUsername: function (rule, value, callback) {
        if (value === '') {
          callback(new Error('用户名不能为空'));
        } else if (this.isSpecificSymbol(value)) {
          callback(new Error('用户名不能包含特殊符号'));
        } else {
          callback();
        }
      },
       validatePassword: function (rule, value, callback) {
        if (value === '') {
          callback(new Error('密码不能为空'));
        } else if (value.length < 6) {
          callback(new Error('密码不能少于6位'));
        } else {
          callback();
        }
      },
  },
  computed: {
     
      // scale () {
      //   let transform = this.$store.state.transform;
      //   if ( transform.w === -1 || transform.h === -1 ) {
      //     return 'none';
      //   }
      //   return `scale(${transform.w},${transform.h})`
      // }
    
  },
    //  watch: {
    //   screenWidth: function () {
    //     this.resize();
    //   },
    //   screenHeight: function () {
    //     this.resize();
    //   },
    //   isRemeberPwd ( val ) {
    //     sessionStorage.setItem( 'isRemeberPwd', val )
    //   }
    // },
  // mounted () {
  //   this.$nextTick( () => {
  //       this.resize();
  //     } )
  //     window.onresize = function () {
  //       this.screenWidth = document.documentElement.clientWidth || document.body.clientWidth;
  //       this.screenHeight = document.documentElement.clientHeight || document.body.clientHeight;
  //     }.bind(this);
  // },

};
</script>

<style lang="less" scoped>
.bg {
  width: 100%;
  height: 100%;
  background: linear-gradient(to bottom right, #082b76, 30%, #0b1a2c;);
  position: relative;
  overflow: hidden;
  .img_box {
    background: url(../assets/images/login_img.png) no-repeat left center; 
    width: 62.656%;
    height: 100%;
    position: absolute;
    left: 0;
    top: 0;
    background-size: contain;
  }
  .login_box {
    width: 4.82rem;
    height: 4.64rem;
    background: rgba(0, 0, 0, 0.1);
    position: absolute;
    right: 10%;
    top: 50%;
    border-radius: 4px;
    transform: translateY(-50%);
    
    box-sizing: border-box;
    padding-top: 0.5rem;
    .logo {
      background: url(../assets/images/logo_dvaap.png) no-repeat;
      width: 1.69rem;
      height: 0.84rem;
      margin: 0 auto;
    }
    h6 {
      margin-top: 0.3rem;
      font: 20px/1 arial;
      color: #092b72;
      text-align: center;
    }
    .login_form{
      margin: 0 auto;
      margin-top: 0.5rem;
      width: 3.35rem;
      .login-btn{
        width: 100%;
        border-radius: 4px;
        background:#1d489b;
        color: #ffffff;
        text-align: center;
        font-weight: bold;
        font-family: Arial, Helvetica, sans-serif;
        font-size: 0.2rem;
        border: 0; 
      }
    }
  }
}
/deep/ .el-input {
  .el-input__inner {
    border-color: #566175;
    height: 0.46rem;
    background: #0b1a31;
  }
}
</style>