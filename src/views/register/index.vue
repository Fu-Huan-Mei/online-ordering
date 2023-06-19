<!--注册页面-->
<template>
    <div class="login">
      <Header title="注册" />
      <div class="img">口水吧</div>
      <van-form @submit="onSubmit">
        <van-field
          v-model="username"
          name="user"
          label="用户名"
          placeholder="用户名"
          autocomplete="current-password"
          :rules="[{ required: true, message: '请填写用户名' }]"
        />
        <van-field
          v-model="password"
          type="password"
          name="pass"
          label="密码"
          placeholder="密码"
          autocomplete="current-password"
          :rules="[{ required: true, message: '请填写密码' }]"
        />
        <div style="margin: 16px">
          <van-button
            round
            block
            type="info"
            native-type="submit"
            color="#ffc400"
          >
            注册
          </van-button>
          <van-button
            round
            block
            type="info"
            color="#ffc400"
            class="register"
            @click="toLogin"
          >
            去登录
          </van-button>
        </div>
      </van-form>
    </div>
  </template>
  <script>
  import Header from "../../components/Header.vue";
  import { useRouter } from "vue-router";
  import { reactive, toRefs } from "vue";
  import { showSuccessToast, showFailToast } from "vant";
  export default {
    components: {
      Header,
    },
    setup() {
      const router = useRouter();
      //用户提交注册信息
      const onSubmit = (value) => {
        //如果本地存储已经存在用户信息
        if (localStorage.userInfo) {
          //获取用户信息
          let userInfo = JSON.parse(localStorage.getItem("userInfo"));
          //如果用户信息已经存在
          if (userInfo["user"] === value["user"]) {
            showFailToast("该用户已经存在");
            return;
          }
        } else {
          //如果用户信息不存在，就去注册
          register(value);
        }
      };
      
      //用户注册
      const register = (value) => {
        localStorage.setItem("userInfo", JSON.stringify(value));
        showSuccessToast("注册成功");
        router.push("/login");
      };
      
      //用户登录
      const toLogin = () => {
        router.push("/login");
      };
      const data = reactive({
        username: "",
        password: "",
      });
      return {
        onSubmit,
        toLogin,
        ...toRefs(data),
      };
    },
  };
  </script>
  <style scoped lang="less">
  .login {
    .img {
      width: 200px;
      height: 200px;
      background-color: #ffc400;
      font-size: 60px;
      line-height: 200px;
      text-align: center;
      border-radius: 40px;
      margin: 20px auto;
    }
    .register {
      margin-top: 20px;
    }
  }
  </style>