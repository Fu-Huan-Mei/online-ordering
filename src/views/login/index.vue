<!--登陆页面-->
<template>
    <div class="login">
      <Header title="登录" />
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
            登录
          </van-button>
          <van-button
            round
            block
            type="info"
            color="#ffc400"
            class="register"
            @click="toRegister"
          >
            去注册
          </van-button>
        </div>
      </van-form>
    </div>
  </template>
  <script>
  import Header from "../../components/Header.vue";
  import { useRouter } from "vue-router";
  import { reactive, toRefs } from "vue";
  import { showSuccessToast,showFailToast } from "vant";
  export default {
    components: {
      Header,
    },
    setup() {
      const router = useRouter();

      //用户提交表单时触发的事件处理函数
      const onSubmit = (value) => {
        //首先判断本地存储中是否存在键名为 userInfo 的键值对
        if (!localStorage.userInfo) {
          //如果不存在则提示用户“账号未注册”并返回
          showFailToast("账号未注册");
          return;
        } else {
          //如果存在 userInfo 键名，则将其对应的值（即之前注册时存储的用户信息对象）解析为 JavaScript 对象，并将其存储在变量 userInfo 中
          let userInfo = JSON.parse(localStorage.userInfo);
          //检查' userInfo 对象'中的 user 和 pass 属性是否与'用户提交'的表单数据 value 中的相应属性值匹配
          if (userInfo["user"] === value["user"]) {

            //如果两者都匹配
            if (userInfo["pass"] === value["pass"]) {
              //登录成功
              showSuccessToast("登录成功");
              //则将一个名为 isLogin 的键名和对应的值 login 存储在本地存储中，并提示用户“登录成功”
              localStorage.setItem("isLogin", "login");
              router.push("/home");
            } else {
              showFailToast("密码错误");
            }

          } else {
            showFailToast("账号不存在");
          }
        }
      };

      //注册
      const toRegister = () => {
        router.push("/register");
      };

      const data = reactive({
        username: "",
        password: "",
      });
      return {
        onSubmit,
        toRegister,
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