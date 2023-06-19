<template>
    <div class="header">
        <van-icon name="arrow-left" class="icon" @click="toBack"/>
        <div>{{ title }}</div>
        <!--点击编辑：下面的'全选、删除'功能要显示出来-->
        <div class="edit" v-if="edit" @click="handleEdit">
          {{ store.state.edit ? '编辑': '完成' }}
        </div>
    </div>
</template>
<script>
import { useRouter } from 'vue-router';
import { showFailToast } from 'vant';
import {useStore} from 'vuex';
export default {
    props:['title','edit'],
    setup(){
      const router = useRouter();
      const store = useStore();
      //点击头部左侧<箭头，返回首页
      const toBack = () => {
        router.back()
      }
    

    //点击编辑按钮：确认商品列表是否被选中
    const handleEdit = () => {
      if(store.state.cartList.length){
        //商品列表有商品：
        store.commit('changeDelete');
        //点击编辑->切换为完成2字
        store.commit('edit');
      }else{
        showFailToast('请添加商品到购物车！')
      }
    };

    return {
      toBack,
      handleEdit,
      store
    };
    }
}
</script>
<style lang="less" scoped>
.header {
    background-color: #fff;
    height: 40px;
    font-size: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-bottom: 1px solid #d7d7d7;
    .edit {
      font-size: 16px;
      position: absolute;
      right: 15px;
      font-weight: normal;
    }
    .icon {
      position: absolute;
      left: 10px;
    }
  }
</style>