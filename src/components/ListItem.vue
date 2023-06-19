<!--商品列表组件-->
<template>
    <div class="content-item">
      <!--每一款商品：左侧，右侧是价格-->
      <div class="left">
        <!--:name="item.id"为了方便地获取复选框的选中状态-->
        <!--是否显示复选框(多选框)-->
        <van-checkbox :name="item.id" v-if="showCheckBox" checked-color="#ffc400"/>
        <img :src="item.pic">
        <div class="text">
          <div class="title">{{item.title}}</div>
          <!--空心圆加号和步进器只会显示其一-->
          <van-icon name="add-o" v-if="item.add" @click="handleAdd(item.id)"/>
           <!--步进器:初始值：默认值为item.num-->
           <van-stepper v-model="item.num" v-else :name="item.id" @change="handleChange" />
        </div>
      </div>
      <div class="price">￥{{item.price}}</div>
    </div>
</template>
<script>
export default{
  props:['item','handleAdd','handleChange','showCheckBox'],
}
</script>

<style lang="less" scoped>
.content-item {
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
  .price {
    font-size: 16px;
    font-weight: 600;
  }
  .left {
    display: flex;
    align-items: center;
    flex: 1;
    img {
      margin-left: 10px;
      width: 60px;
      height: 60px;
      margin-right: 10px;
      border-radius: 10px;
    }
    .text {
      display: flex;
      flex-flow: column;
      justify-content: space-between;
      height: 100%;
      position: relative;
      flex: 1;
      .title {
        font-size: 16px;
      }
      .van-icon {
        color: red;
        font-size: 20px;
        position: absolute;
        right: 4px;
        bottom: 4px;
      }
    }
  }
}
</style>