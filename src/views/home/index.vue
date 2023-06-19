<template>
    <!--设置网页结构-->
    <div class="home">
        <div class="content">
            <!--头部-->
            <div class="header">
                <div class="text">口水吧</div>
                <div class="location">
                    <van-icon name="location-o" />
                    <span>保山</span>
                    <van-icon name="arrow" />
                </div>
            </div>
            <!--主要内容区-->
            <div class="main">
                <div class="main-bg">
                    <!--搜索区-->
                    <div class="search">
                        <input type="text">
                        <div class="search-text">搜索</div>
                    </div>
                    <!--分类区-->
                    <div class="sort">
                        <div class="big-sort">
                          <div v-for="(item,index) in big_sort" :key="index">
                          <svg class="icon" aria-hidden="true">
                            <use v-bind:xlink:href="`#${item.icon}`"></use>
                          </svg>
                          {{ item.name }}
                          </div>      
                        </div>
                        <div class="small-sort">
                          <div v-for="(item,index) in small_sort" :key="index">
                            <svg class="icon" aria-hidden="true">
                              <use v-bind:xlink:href="`#${item.icon}`"></use>
                            </svg>
                            {{ item.name }}
                            </div>
                        </div>
                    </div>
                </div>
                <!--Tab标签页:vant-ui组件库-->
                <van-tabs v-model:active="active" class="vant-tabs">
                  <van-tab v-for="(item,index) in content_nav_list" v-bind:title="item.tab" :key="index">
                    <!--引入NavList子组件-->
                    <nav-list :navList="item.data"></nav-list>
                  </van-tab>
                </van-tabs>
            </div>
        </div>
        <Footer></Footer>
    </div>
</template>
<script>
import Footer from '../../components/Footer.vue';
import { reactive,toRefs,ref,onMounted} from 'vue';
import NavList from './components/NavList.vue';
import axios from 'axios';
export default {
    components:{
        Footer,
        NavList
    },
    setup(){
      // 创建一个 Image 对象
      let data = reactive({
        big_sort:[],
        small_sort:[],
        content_nav_list:[]
        });
      const active = ref(0) ;

      //获取首页数据
      const getHomeData = () => {
        //请求地址为 /home/getHomeData
        axios.get('/home/getHomeData').then((res) => {
          const {code,homeData} = res.data;
          //如果code为200，说明请求成功
          if(code === 200){
            data.big_sort = homeData.big_sort
            data.small_sort = homeData.small_sort
            data.content_nav_list = homeData.content_nav_list;
          }
        })
      };

      //使用 onMounted() 函数可以确保在组件挂载后才执行某些操作，从而避免在组件挂载之前访问未初始化的属性或方法而导致的错误
      onMounted(() => {
        getHomeData();
      });
      return {
            ...toRefs(data),
            active
      };
    }
}
</script>
<style lang="less" scoped>
.home{
    display: flex;
    flex-flow: column;
    height: 100%;
    font-size: 12px;
    .content{
        flex: 1;
        /*纵向滚动条*/
        overflow-y: auto;
        .header{
            background-image: linear-gradient(#ffc400,#fff);
            display:flex;
            justify-content: space-between;
            align-items: center;
            padding:20px 20px 40px 20px;
            .text{
                font-size: 20px;
                font-weight: 600;
            }
            .location{
                font-size: 14px;
                span{
                    margin:0 5px;
                }
            }
        }
        .main{
            margin-top: -30px;
            .main-bg{
                background-image: linear-gradient(#fff,#f5f5f5);
                padding:10px 20px 0px;
                border-radius: 30px 30px 0 0;/*顺时针：左上、右上、左下、右下*/
                .search{
                    position: relative;
                    input{
                        width:100%;
                        height:30px;
                        border:1px solid #ffc400;
                        border-radius: 20px;
                    }
                    .search-text{
                        position: absolute;
                        right:-6px;
                        top:1px;
                        background-color: #ffc400;
                        border-radius: 16px;
                        width:50px;
                        height:32px;
                        line-height: 32px;
                        font-size: 14px;
                        text-align: center;
                    }
                }
                .sort{
                  padding:20px 0;
                  .big-sort{
                    display: flex;
                    div{
                      flex:1;
                      display: flex;
                      flex-flow: column ;
                      justify-content: center;
                      align-items: center;
                     .icon{
                       width:50px;
                       height:50px;
                       margin-bottom:5px;
                     }
                    }
                  }
                  .small-sort{
                    display: flex;
                    flex-wrap: wrap;
                    margin-top:20px;
                    div{
                      display: flex;
                      flex-flow: column;
                      justify-content: center;
                      align-items: center;
                      width:20%;
                      .icon{
                        width:30px;
                        height:30px;
                        margin:10px;
                      }
                    }
                  }
                }
            }
            .vant-tabs{
              padding:0 20px 10px;
            }
        }
    }
}
:deep(.van-tabs__wrap) {
  border-radius: 10px;
}
</style>