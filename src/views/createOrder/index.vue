<template>
    <!--生成订单-->
    <div class="create-order">
        <Header title="生成订单"></Header>
        <!--编辑联系人-->
        <van-contact-card type="edit" :tel="tel" :name="name" @click="onEdit" />
        <div class="content">
            <!--订单中的商品-->
            <div v-for="(item,index) in store.state.orderList" :key="index">
                <van-card
                    :num="item.num"
                    :price="item.price"
                    :title="item.title"
                    :thumb="item.pic"
                />
            </div>
        </div>
        <div class="pay-wrap">
            <div class="price">
                <span>商品金额</span>
                <span>￥{{ totalPrice }}</span>
            </div>
            <van-button type="primary" class="pay-btn" block color="#ffc400" @click="handleCreateOrder">生成订单</van-button>
        </div>
    </div>
</template>

<script>
import Header from '../../components/Header.vue';
import { reactive,toRefs,onMounted} from 'vue';
import { useStore } from 'vuex';
import { showDialog } from 'vant';
import {useRouter,useRoute} from 'vue-router';
export default{
    components:{
        Header
    },
    setup(){
        const data = reactive({
            tel:'123',
            name:'Amy',
            totalPrice:0
        });
        const router = useRouter();
        const route = useRoute();
        const store = useStore();
        //跳转到地址页面
        const onEdit = () => {
            router.push('/address');
        };

        //计算金额
        const initPrice = () => {
            //初始化金额为 0 
            let price = 0;
            //订单列表是否存在商品项
            if(store.state.orderList.length){
                //如果存在,说明需要计算总金额 price
                store.state.orderList.forEach(item =>{
                    //使用 forEach 循环计算每份商品的价格，累加到 price 变量中
                    price += item.num * item.price;
                })
            };
            //将计算总金额赋值给'组件中'用来显示总金额的变量
            data.totalPrice = price;
        };

        //初始化用户地址
        const initUser = () => {
            store.state.userAddress.forEach(item => {
              if(item. isDefault){
                data.name = item.name;
                data.tel = item.tel;
              }
            })
        };

        //生成订单
        const handleCreateOrder = () => {
            showDialog({
                title: '提示',
                message:"生成订单成功",
            }).then(() => {
                //和购物车联系起来：结算多少商品，购物车就要减少多少商品
                let newList = store.state.cartList.filter(item => {
                    //将已结算商品从购物车列表过滤掉，得到新的有未结算商品的购物车列表 newList
                    return !route.query.list.includes(item.id+"");
                });
                //删除购物车中已结算的商品,完成购物车列表的更新
                store.commit('delete',newList);
                //
                store.commit('orderListEd');
                //显示已生成的订单内容
                router.push("/order");
            });
        };

        onMounted(() => {
            initPrice () ;
            initUser() ;
        });

        return {
            ...toRefs(data),
            onEdit,
            store,
            handleCreateOrder
        };
    }
}
</script>
<style lang="less" scoped>
.create-order {
    display: flex;
    flex-flow: column;
    height: 100%;
    .content {
      flex: 1;
      overflow-y: auto;
    }
    .pay-wrap {
      padding: 10px 0;
      width: 100%;
      background: #fff;
      border-top: 1px solid #e9e9e9;
      > div {
        display: flex;
        justify-content: space-between;
        padding: 0 5%;
        margin: 10px 0;
        font-size: 14px;
        span:nth-child(2) {
          color: red;
          font-size: 18px;
        }
      }
      .pay-btn {
        width: 90%;
        margin: 0 auto;
      }
    }
  }
  
</style>