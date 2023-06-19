<!--这页代码多看课，多理理逻辑-->
<template>
    <!--如果storeData遍历得到的是第一项元素：渲染出点菜页面-->
    <div class="food-list" v-if="index === 0">
        <!--标签页-->
        <!--main-active-index：左侧选中项的索引-->
        <!--items：分类显示所需的数据，默认值[]-->
        <van-tree-select
         v-model:main-active-index="activeIndex"
         height="88vw"
         :items="items"
         @click-nav="navClick">
            <template #content>
                <div v-for="(item,index) in subItem" class="item-bg">
                    <!--商品列表项-->
                    <list-item :item="item" :handleAdd="handleAdd" :handleChange="handleChange"></list-item>
                </div>
            </template>
        </van-tree-select>
    </div>
    <!--否则就遍历出'评价'和'商品'标签页-->
    <div v-else>
        {{ foodData.content }}
    </div>
</template>
<script>
import { reactive,toRefs} from 'vue';
import ListItem from '../../../components/ListItem.vue';
export default {
    components:{
        ListItem
    },
    props:["index","foodData"],
    setup(props) {
       let data = reactive({
        //左侧选中项的索引：初始值为0(当前选中的导航项的索引)
        activeIndex:0,
        //分类显示所需的数据：items: [{text: '热销套餐'}, { text:'超级折扣'}],
        items:[],
        subItem:[]
       });
       //初始化数据
       const initData = () => {
        let newArray = [];
        //props.foodData = { content:'点菜',items:Array(2)}
        props.foodData?.items?.forEach((item,index) => {
            newArray.push({
                //item = [ {text:'热销套餐',children:Array(2)},{text:'超级折扣',children:Array(2)} ]
                text:item.text
            });
            if(data.activeIndex === index ){
                //把右侧商品信息赋值给data.subItem
                data.subItem = item.children;
            };
        });
        //newArray = { 0:{text:'热销套餐'},1:{text:'超级折扣'} } 
        data.items = newArray;
       };
       initData();
       //i表示当前点击的索引:是navClick自动传过来的（点击左侧导航时触发改事件处理函数）:i取0或1
       const navClick = (i) => {
        data.activeIndex = i;
        initData();
       };
    
       //subItem数组当前选中的菜单项的子菜单项（children数组项）
       const handleAdd = (id) => {
        data.subItem.forEach((item,index) => {
            if(item.id === id){
                item.add = false;
                //步进器刚出现：就让初始值为1
                item.num += 1;
            }
        })
       };
   
       //步进器增加:页面数量改变->代码数量也改变
       //value表示购物车中的数量
       //detail表示对象:{ name:0 }
       const handleChange = (value,detail) => {
        data.subItem.forEach( item => {
            if(item.id === detail.name){
                item.num = value;
            }
        });
       };

       return {
        ...toRefs(data),
        navClick,
        handleAdd,
        handleChange
       }
    },
}
</script>
<style lang="less" scoped>
.food-list {
    margin-top: 20px;
    .item-bg {
      padding: 10px;
    }
    }
    :deep( .van-tree-select__item--active) {
      color: #ffc400;
    }
    :deep( .van-sidebar-item--select)::before {
      background-color: #ffc400;
    }
</style>
