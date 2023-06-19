<template>
     <!--设置网页结构-->
    <div class="cart">
        <Header title="购物车" :edit="true"></Header>
        <CartDetail v-if="isShow" :changeShow="changeShow"></CartDetail>
        <Empty v-else></Empty>
        <Footer></Footer>
    </div>
</template>
<script>
import Header from '../../components/Header.vue'
import Footer from '../../components/Footer.vue'
import Empty from '../../components/Empty.vue'
import CartDetail from './components/CartDetail.vue'
import {ref,onMounted} from 'vue'
import {useStore} from 'vuex'
export default {
    components:{
        Footer,
        Empty,
        Header,
        CartDetail
    },
    setup(){
        //初始化：默认显示有购物车页面
        const isShow = ref(true);
        const store = useStore();

        const init = () => {
            //如果购物车数量为0：则显示空的购物车页面
            if(store.state.cartListSum === 0){
                isShow.value = false;
            }
        };
        
       //是否展示空购物车页面
       const changeShow = () => {
        //展示空购物车页面
        isShow.value = false;
       };

        onMounted(() => {
            init();
        });
        return {
            isShow,
            changeShow
        }
    }
}
</script>
<style lang="less" scoped>
.cart{
    display: flex;
    flex-flow: column;
    height: 100%;
    .content{
        flex: 1;
        /*纵向滚动条*/
        overflow-y: auto;
    }
}
</style>