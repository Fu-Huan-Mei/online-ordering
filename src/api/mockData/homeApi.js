export default {
    //首页数据
    getStoreData:() => {
        return {
            code:200,
            homeData:{
                big_sort: [
                    {
                      name: "美食",
                      icon:"icon-meishi"
                    },
                    {
                      name:"甜点饮品",
                      icon:"icon-tiandian",
                    },
                    {
                      name:"超市便利",
                      icon:"icon-chaoshigouwu"
                    },
                    {
                      name: "生鲜果蔬",
                      icon: "icon-shengxian-ganju"
                    },
                    {
                      name: "买药",
                      icon: "icon-zhichiyiyuanyaodian"
                    },
                  ],
                small_sort: [
                    {
                      name:"午餐",
                      icon:"icon-wucan"
                    },
                    {
                      name:"买酒",
                      icon: "icon-jiu"
                    },
                    {
                      name:"新鲜水果",
                      icon:"icon-xinxianguoshu_xinxianshuiguopingguo"
                    },
                    {
                      name:"汉堡披萨",
                      icon:"icon-hanbaopisa"
                    },
                    {
                      name:"休闲饮品",
                      icon: "icon-xiuxianyinpin"
                    },
                    {
                      name:"夜宵",
                      icon: "icon-yexiao"
                    },
                    {
                      name: "吐司",
                      icon: "icon-tusi"
                    },
                    {
                      name: "跑腿",
                      icon: "icon-paotuiAPP"
                    },
                    {
                      name:"美人佳丽",
                      icon:"icon-kouhong"
                    },
                    {
                      name:"全部分类",
                      icon:"icon-fenlei"
                    },
                ],
                content_nav_list: [
                    {
                      tab:"天天神券",
                      data: [
                        {
                          pic:require ("../../assets/home-imgs/1.jpg"),
                          title:"鸡蛋瘦肉炒米线",
                          sales:"888",
                          price:"15",
                          label: ["门店上新","很美味"]
                        },
                        {
                          pic:require ("../../assets/home-imgs/2.jpg"),
                          title:"红烧牛肉热米线",
                          sales: "888",
                          price:"15",
                          label:["门店上新","很美味"]
                        },
                        {
                          pic:require ("../../assets/home-imgs/3.jpg"),
                          title: "杂酱干拌米线",
                          sales: "888",
                          price:"15",
                          label: ["门店上新", "很美味"]
                        },
                        {
                          pic:require ("../../assets/home-imgs/4.jpg"),
                          title:"卤牛肉凉米线",
                          sales:"888",
                          price:"15",
                          label: ["门店上新","很美味"]
                        },
                      ],
                    },
                    {
                      tab:"减配送费",
                      data: [
                        {
                          
                          pic:require ("../../assets/home-imgs/5.jpg"),
                          title: "水腌菜大烧凉米线",
                          sales: "888",
                          price: "15",
                          label: ["门店上新", "很划算"]
                        },
                      ],
                    },
                    {
                      tab:"点评高分",
                      data: [
                        {
                          
                          pic:require ("../../assets/home-imgs/6.jpg"),
                          title:"红烧牛肉凉米线",
                          sales: "1888",
                          price: "15",
                          label: ["点评高分", "很好吃"]
                        },
                        {
                          pic:require ("../../assets/home-imgs/7.jpg"),
                          title: "杂酱+卤牛肉双冒凉米线",
                          sales: "1888",
                          price: "15",
                          label: ["点评高分", "很好吃"],
                        },
                      ],
                    },
                    {
                      tab: "会员满减",
                      data: [
                        {
                          pic:require ("../../assets/home-imgs/8.jpg"),
                          title: "腌草莓",
                          sales: "888",
                          price: "15",
                          label: ["会员满减", "很实惠"]
                        },
                        {
                          pic:require ("../../assets/home-imgs/9.jpg"),
                          title:"酸木瓜",
                          sales:"888",
                          price:"15",
                          label: ["会员满减", "很实惠"]
                        }
                      ],
                    },
                ]
            }
        }
    }
}