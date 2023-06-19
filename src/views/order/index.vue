<template>
    <div class="order">
        <!--头部-->
        <Header title="订单"></Header>
        <!---->
        <div class="content">
            <!--标签页-->
            <van-tabs color="#ffc400">
                <!--标题-->
                <van-tab v-for="(item,index) in navData" :title="item" :key="index">
                    <!--商品卡片/列表-->
                    <div v-for="(i,index) in store.state.orderListEnd" 
                        :key="index" 
                        v-if="item === '全部' && store.state.orderListEnd.length">
                        <van-card
                        :num="i.num"
                        :price="i.price"
                        :title="i.title"
                        :thumb="i.pic"
                    />
                    </div>
                    <div v-else>
                        <Empty></Empty>
                    </div>
                </van-tab>
            </van-tabs>
        </div>
         <!--底部-->
        <Footer></Footer>
    </div>
</template>
<script>
import Header from '../../components/Header.vue'
import Footer from '../../components/Footer.vue'
import Empty from '../../components/Empty.vue'
import { reactive,toRefs } from 'vue'
import { useStore } from 'vuex'
export default {
    components:{
        Footer,
        Header
    },
    setup(){
        const data = reactive({
            navData:['全部','交易完成','待付款','代发货','已发货']
        });
        const store = useStore();
        return {
            ...toRefs(data),
            store 
        }
    }
}
</script>
<style lang="less" scoped>
.order{
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