<!--我的页面下的：'账号管理'页面的编写-->
<template>
   <Header></Header>
   <div>
    <van-field v-model="name" label="昵称" placeholder="请输入昵称" />
    <van-field v-model="sign" label="个性签名" placeholder="个性签名" disabled=""/>
    <van-field v-model="pass" label="密码" placeholder="请输入密码" />
   </div>
   <van-button type="primary" color="#ffc400" round block class="save-btn" @click="save">保存</van-button>
   <van-button type="primary" color="#ffc400" round block class="save-btn" @click="logOut">退出登录</van-button>
</template>
<script>
import Header from '../../components/Header.vue';
import { reactive,toRefs } from 'vue';
import { showSuccessToast, showFailToast } from "vant";
import router from '../../router';
export default{
    components:{
        Header
    },
    setup(){
        const data = reactive({
            name:'',
            sign:'杀不死我的会让我变得更强大',
            pass:''
        });

        //保存用户信息
        const save = () => {
            if(data.name && data.pass){
                let userInfo = JSON.parse(localStorage.userInfo);
                let newUserInfo = {
                    //如果data.name存在且不为undefined或null，则将newUserInfo对象的user属性设置为data.name，否则将其设置为userInfo.name
                    user:data.name || userInfo.name,
                    //如果data.pass存在且不为undefined或null，则将newUserInfo对象的pass属性设置为data.pass，否则将其设置为userInfo.pass
                    pass:data.pass || userInfo.pass,
                };
                //将 newUserInfo 对象转换为一个JSON字符串，并将其存储在 localStorage 中，键名为 userInfo
                //localStorage 只允许存储字符串类型的数据，而不能直接存储JS对象
                localStorage.setItem('userInfo',JSON.stringify(newUserInfo));
                showSuccessToast('修改成功！');
                router.push('/my');
            }else{
                showFailToast('请输入内容！');
            }
        };

        //退出登录
        const logOut = () => {
            //从本地存储中删除键名为 'isLogin' 的键/值对（在登录页面存储的信息）
            localStorage.removeItem('isLogin');
            showSuccessToast('退出成功！');
            router.push('/login');
        };
        return {
            ...toRefs(data),
            save,
            logOut
        }
    }
}
</script>
<style lang="less" scoped>
.save-btn {
  width: 80%;
  margin: 20px auto;
}
</style>