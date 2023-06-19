//管理index.vue组件中加入购物车的数据newList
import {createStore} from 'vuex';
// 创建一个新的 store 实例
export default createStore({ 
    state:{
        //存储购物车中的商品列表（引用数据类型）
        cartList:[],
        //存储购物车的数量（基本数据类型的值是存储在变量）
        cartListSum:0,
        //点击编辑时确定header组件：底部组件的展示
        isDelete:true,
        //默认展示'编辑'状态
        edit:true,
        //订单列表
        orderList:[],
        //用户信息
        userAddress:[
            {
                id: 1001,
                name: 'Ghost',
                tel: '15088907321',
                province: '山东省',
                city: '烟台市',
                county: '福山区',
                addressDetail: '山东省烟台市福山区',
                isDefault: true,
                areaCode: '110101',
              },
              {
                id: 1002,
                name: 'Jay',
                tel: '15088907320',
                province: '台湾省',
                city: '新北市',
                county: '新北区',
                addressDetail: '新北市',
                isDefault: false,
                areaCode: '110101',
              }
        ],
        //最终结算订单：新旧订单一起结算
        orderListEnd:[]
    },
    mutations:{
    addcart(state,value){
        //0: Proxy(Object) {pic: '/img/1.39e46862.jpg', title: '鸡蛋瘦肉炒米线', num: 4, price: 15, id: 0,...} 
        //计算商品数量sum
        let sum = 0
        //遍历数组（每一项商品元素）
        value.forEach(item => {
            //获取商品数量，累加求和
            sum += item.num
        })
        //更新购物车商品总数量
        state.cartListSum = sum;
        //更新购物车商品列表(属性值)
        state.cartList = value;
    },
    changeDelete(state){
        state.isDelete = !state.isDelete
    },
    //删除
    delete(state,value){
        state.cartList = value;
    },
    //编辑
    edit(state,value){
        if(value){
            //编辑
            state.edit = true;
        }else{
            //完成
            state.edit = !state.edit;
        }
    },
    //支付
    pay(state,value){
        state.orderList = value
    },
    //将多次的orderList数组进行合并
    orderListEd(state){
        state.orderListEnd = state.orderListEnd.concat(state.orderList)
    },
    //新增地址
    addAddress(state,value){
        state.userAddress.map(item => {
            //如果是默认地址
            if(value.isDefault){
                item.isDefault = false
            }
        })
        state.userAddress.push(value)
    },
    //编辑地址
    editAddress(state,value){
        //遍历当前用户的所有地址信息
        state.userAddress= state.userAddress.map(item => {
            // //如果传入的新地址信息中设置了 isDefault 为 true，则将'当前地址'信息的 isDefault 设置为 false，即将它变为非默认地址
            if(value.isDefault){
                item.isDefault = false
            }
            //如果当前地址信息的 id 与传入的新地址信息的 id 相同:则将当前地址信息替换为传入的新地址信息，即更新这个地址信息
            if(item.id === value.id){
                return value
            }else{
                return item
            }
            //优化后的代码逻辑
            // return item.id === value.id ? value : item;
        })
    },
    //删除地址
    deleteAddress(state,value){
        //遍历当前用户的所有地址信息
        state.userAddress = state.userAddress.filter(item => {
            //将所有 id 不等于 value.id 的地址信息保留下来,即删除 value 对应的地址信息
            return !(item.id === value.id)
        })
        //如果要删除的地址信息是默认地址:则将 state.userAddress 数组中的第一个地址信息的 isDefault 设置为 true，即将它变成默认地址
        if(value.isDefault){
            state.userAddress[0].isDefault = true
        }
    }
    },
    actions:{}
})
 