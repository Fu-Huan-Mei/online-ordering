<template>
<!--有商品的购物车列表-->
<div class="cartDetail">
   <!--购物车-->
    <div class="content">
      <!--多选框-->
      <van-checkbox-group v-model="checked" @change="groupChange">
         <!--获取购物车中的商品列表-->
         <div v-for="(item,index) in store.state.cartList" :key="index">
            <!--购物车列表组件-->
            <ListItem :item="item" :handleChange="handleChange" :showCheckBox="true"></ListItem>
         </div>
      </van-checkbox-group>
    </div>

   <!--购物车价格的实现-->
   <van-submit-bar 
   v-if="store.state.isDelete"
     :price="allPrice" 
     button-text="结算"
     @submit="onSubmit" 
     class="submit-all" 
     button-color="#ffc400"
     >
     <!--全选按钮-->
      <van-checkbox 
      v-model="submitChecked"
      checked-color="#ffc400"
      @click="choseAll">全选
      </van-checkbox>
   </van-submit-bar>

   <!--点击购物车页面中的编辑按钮：下面'全选'、'删除'页面显示出来-->
   <div class="buy" v-else>
      <div class="left">
         <van-checkbox 
         v-model="submitChecked"
         checked-color="#ffc400"
         @click="choseAll">全选
         </van-checkbox>
      </div>
      <div class="delete" @click="handleDelete">删除</div>
   </div>
</div>
</template>
<script>
import { reactive,toRefs,onMounted,computed} from 'vue';
import { useStore } from 'vuex';
import ListItem from '../../../components/ListItem.vue';
import {  showFailToast } from 'vant';
import { useRouter } from 'vue-router';
export default {
   props:['changeShow'],
   components:{
      ListItem
   },
   setup(props) {
      //创建store实例
      const store = useStore();

      const data = reactive({
         //多选框
         checked:[],
         //全选按钮：默认选中
         submitChecked:true
      });

      const router = useRouter();

      //由 <van-stepper> 组件自动传递给 change 事件的回调函数的
      const handleChange = (value,detail) => {
         store.state.cartList.map(item => {
            if(item.id === detail.name){
               item.num = value;
            }
         });
      };

      //购物车选中功能:点击跳转购物车页面，全选状态
      const init = () => {
         data.checked = store.state.cartList.map(item => item.id);
      };

      onMounted(() => {
         init();
      });

      //生成订单
      const onSubmit = () => {
         //如果有商品就结算
         if(data.checked.length){
            //点击结算
            store.commit('pay',updateData());
            //跳转结算页面
            router.push({
               path:'/createOrder',
               query:{
                  list:data.checked
               }
            });
         }else{
            showFailToast('请选择要结算的商品！');
         }
      };

      //全选框
      const choseAll = () => {
         if(data.checked.length !== store.state.cartList.length){
            init();
         }else{
            data.checked = [];
         }
      };

      //多选框
      const groupChange = (result) => {
         //如果购物车页面的商品全选中
         //store.state.cartList = [{0:xxx },{1:xxx}]
         if(result.length === store.state.cartList.length){
            //全选按钮选中状态
            data.submitChecked = true;
         }else{
            //否则，全选按钮未选中
            data.submitChecked = false;
         }
         //将更新选择状态赋值给data.checked(为了让其他部分的代码能够使用更新的选择状态)
         data.checked = result;
      };

      //计算所有选中商品的总价
      const allPrice = computed(() => {
         let countList = updateData();
         //计算总价
         let sum = 0;
         countList.forEach(item => {
            //总价 = 商品数量 * 商品单价
            sum += item.num * item.price;
         });
         return sum*100;
      });


      const updateData = (type) => {
         //item 是通过 filter() 函数'自动传入'过滤函数中的，代表了'遍历到的''当前元素'（即购物车中的每个商品对象item）
         return store.state.cartList.filter(item => {
            // data.checked 数组来判断商品是否被选中：
            return type === 'delete' ? 
            //如果不包含 item 对象的 id 值，则说明该商品未被选中
            !data.checked.includes(item.id) :
            //如果包含 item 对象的 id 值，则说明该商品被选中
            data.checked.includes(item.id);;
         })
      }
    
      const handleDelete = ( ) => {
         //判断data的checked是否有值:删除部分
         if(data.checked.length){
            store.commit('delete',updateData('delete'));
            data.checked = [];
            //购物车没有数据时：显示空购物车页面：全部删除
            if(!store.state.cartList.length){
               props.changeShow();
               store.commit('edit','delete');
            }
         }else{
            showFailToast('请选择要删除的商品！');
         }
      };

      return {
         ...toRefs(data),
         store,
         handleChange,
         onSubmit,
         choseAll,
         groupChange,
         allPrice,
         handleDelete
      };
   },
}
</script>

<style lang="less" scoped>
.cartDetail {
   font-size: 14px;
   flex: 1;
   position: relative;
   overflow-y: auto;
   padding: 20px 20px 55px;
   .submit-all {
     position: fixed;
     bottom: 46px;
   }
 
   .buy {
     position: fixed;
     bottom: 48px;
     right: 0;
     display: flex;
     justify-content: space-between;
     width: 100%;
     background-color: #fff;
     border-radius: 10px;
     height: 50px;
     align-items: center;
     padding: 0 16px;
     box-sizing: border-box;
     .left {
       display: flex;
       align-items: center;
     }
     .delete {
       color: #fff;
       background-color: #ffc400;
       border-radius: 20px;
       font-size: 14px;
       font-weight: 600;
       width: 110px;
       height: 40px;
       text-align: center;
       line-height: 40px;
     }
   }
 
   .content {
     padding: 10px;
     background-color: #fff;
     border-radius: 10px;
   }
 }
 
</style>