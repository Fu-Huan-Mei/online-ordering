<!--地址编辑页面-->
<template>
    <Header :title="address"></Header>
    <van-address-edit
        :area-list="areaList"
        show-delete
        show-set-default
        show-search-result
        :address-info="addressInfo"
        :area-columns-placeholder="['请选择', '请选择', '请选择']"
        @save="onSave"
        @delete="onDelete"
    />

</template>
<script>
import Header from '../../components/Header.vue';
import { reactive,toRefs,onMounted,computed} from 'vue';
import {useRoute,useRouter} from 'vue-router';
import {useStore} from 'vuex';
import { showSuccessToast} from 'vant';
export default {
    components:{
        Header
    },
    setup(){
        const route = useRoute();
        const router = useRouter();
        const store = useStore();
        const data = reactive({
            areaList:{
                province_list: {
                110000:"山东省",
                120000:"台湾省"
                },
            city_list: {
                110100:"烟台市",
                110200:"青岛市",
                120100:"新北市",
                120200:"桃园市"
                },
            county_list: {
                110101:"福山区",
                110102:"城阳区",
                120101:"牯岭街",
                120102:"桃园区",
                }
            },
            //地址信息初始值
            addressInfo:{}
        });
      
        //保存地址
        const onSave = (content) => {
            //新增
            if(route.query.type === 'add'){
                store.commit('addAddress',content)
            }else{
                //编辑
                store.commit('editAddress',content)
            }
            showSuccessToast('保存成功');
            //保存成功后返回地址管理页面
            setTimeout(() => {
                router.back();
            },1000);  
        };

        //删除地址
        //content参数要删除的地址信息的对象
        const onDelete = (content) => {
            store.commit('deleteAddress',content)
        };

        //初始化地址信息
        const init = () => {
            //检查该元素的 id 属性是否等于路由参数中的 id
            store.state.userAddress.forEach((item) => {
                //如果相等则将该元素存储到 data.addressInfo 属性中
                console.log('route.query.id=',route.query.id, typeof route.query.id)
                if(item.id === Number(route.query.id)){
                    //地址信息初始值为用户地址
                    data.addressInfo = item;
                }
            })
        };

        //页面头信息
        const address = computed(() => {
            return route.query.type === "add" ? "地址新增" : "地址编辑";
        });

        onMounted(() => {
            init();
        });
        return {
            ...toRefs(data),
            onSave,
            onDelete,
            address
        }
    }
}
</script>
<style lang="less" scoped>
::v-deep(.van-button--danger ){
    background-color: #ffc400;
    border-color: #ffc400;
  }
  ::v-deep(.van-switch--on ){
    background-color: #ffc400;
  }
</style>