<template>
    <!--地址管理页面-->
    <Header title="地址管理"></Header>
    <van-address-list
        :list="list"
        default-tag-text="默认"
        @add="onAdd"
        @edit="onEdit"
    />
</template>

<script>
import Header from '../../components/Header.vue';
import { reactive,toRefs,onMounted } from 'vue';
import {useStore} from 'vuex';
import {useRouter} from 'vue-router'
export default {
    components:{
        Header
    },
    setup(){
        const store = useStore();
        const router = useRouter();
        const data = reactive({
            list:[]
        });

        //地址初始化
        const init  = () => {
            //store状态下的index.js中的地址
            data.list = store.state.userAddress.map(item => {
                return {
                    id:item.id,
                    name:item.name,
                    tel:item.tel,
                    address:`${item.province}${item.city}${item.county}${item.addressDetail}`,
                    isDefault:item.isDefault
                }
            })
        };

        //新增地址
        const onAdd = () => {
            router.push({
                path:'/addressedit',
                query:{
                    //为了区分编辑还是新增
                    type:"add"
                }
            });
        };

        //编辑地址
        const onEdit = (item) => {
            router.push({
                path:'/addressedit',
                query:{
                    //使用id做对比
                    id:item.id,
                    //为了区分编辑还是新增
                    type:"edit"
                }
            });
        };

        onMounted(() => {
            init();
        });

        return {
            ...toRefs(data),
            onAdd,
            onEdit,
            store 
        };
    }
}
</script>
<style lang="less" scoped>
::v-deep(.van-button--danger) {
    background-color: #ffc400;
    border-color: #ffc400; 
}
::v-deep(.van-switch--on ){
    background-color: #ffc400; 
} 
::v-deep(.van-radio__icon ){
    display: none;
}
</style>
