<template>
    <div class="storeDetails">
        <Header title="店鋪"></Header>
        <div class="content">
            <div class="img"></div>
            <div class="foodSort">
                <div class="sort"></div>
                <div class="name">
                    {{ title }} 
                    <img :src="img" class="store-img">
                </div>
                <!--标签页（'点菜'、'商家'、'评价'）-->
                <van-tabs color="#ffc400">
                  <van-tab v-for="(item,index) in storeData" :title="item.name" :key="index">
                    <div>{{item.num}}</div>
                    <FoodList :index="index" :foodData="item.data"></FoodList>
                  </van-tab>
                </van-tabs>
            </div>
        </div>
        <van-action-bar>
          <van-action-bar-icon icon="chat-o" text="客服" />
          <van-action-bar-icon icon="cart-o" text="购物车" :badge="store.state.cartListSum" @click="goCart"/>
          <van-action-bar-button type="warning" text="加入购物车" @click="handleAddCart"/>
          <van-action-bar-button type="danger" text="立即购买" @click="goBuy"/>
        </van-action-bar>
    </div>
</template>
<script>
import { reactive,toRefs,onMounted} from 'vue';
import Header from '../../components/Header.vue';
import FoodList from './components/FoodList.vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import { showFailToast } from 'vant';
import axios from 'axios';
export default {
    components:{
        Header,
        FoodList
    },
    setup(){
      //使用状态管理器的内置方法
        let store = useStore();
        //获取router
        let router = useRouter();
        //声明渲染数据
        let data = reactive({
            title:"口水吧小吃",
            img:require ("../../assets/home-imgs/1.jpg"),
            storeData:[]
        });

        const getStoreData = () => {
          // "/getStoreData "是一个相对的 URL 地址，它表示该接口的具体名称
          axios.get('/store/getStoreData').then((res) => {
            const { code,storeData } = res.data;
            if(code == 200){
              data.storeData = storeData;
            }
          })
        };

        onMounted(()=> {
          getStoreData();
        });
        //加入购物车
        const handleAddCart = (type) => {
          //购物车中的数量返回后不会归零
          const newList = store.state.cartList || [];
          //首先遍历商品数据
          data.storeData.forEach (item => {
            //如果商品中又items属性就继续遍历
            item.data.items?.forEach(item => {
              //拿到items中的chidren的每一个数组项：每个商品的详细信息
              item.children.forEach(item => {
                //将num属性大于零的对象（商品信息）添加到新数组中
                if(item.num > 0){
                  newList.push(item);               
                } 
              });
            });
          });
          // 如果没有购买商品，就做出提示
          if(newList.length === 0){
            showFailToast('请选择商品');
            return;
          }
          //将完成交互后的数组提交给状态管理器
          store.commit('addcart', newList);
          //如果立即购买，直接调用goCart()
          type === 'buy' ? goCart() : "";
        };
        //点击'购物车'跳转该页面
        const goCart = () => {
          router.push("/cart")
        }
        //立即购买
        const goBuy = () => {
          //加入购物车
          handleAddCart('buy')
        }
        return {
            ...toRefs(data),
            store,
            handleAddCart,
            goCart,
            goBuy
        }
    },
}
</script>
<style lang="less" scoped>
.storeDetails {
    height: 100%;
    display: flex;
    flex-flow: column;
    .content {
      flex: 1;
      overflow-y: auto;
    
      .img {
        background-image: url("../../assets/home-imgs/14.jpg") ;
        background-repeat:no-repeat;
        background-position: center ;
        width: 100%;
        height: 150px;
      }
      .foodSort {
        height: 500px;
        background-color: #fff;
        margin-top: -30px;
        border-radius: 20px 20px 0 0;

        .sort {
          margin-top: 10px;
        }
        .name {
          display: flex;
          padding: 20px;
          justify-content: space-between;
          .store-img {
            width: 80px;
            height: 80px;
            border-radius: 10px;
            margin-top: -30px;
          }
        }
      }
    }
  }
</style>
