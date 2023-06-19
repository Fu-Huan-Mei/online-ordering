export default {
    //商品数据
    getStoreData:() => {
        return {
        code:200,
        storeData: [
          {
          name: "点菜",
          data: {
            content:"点菜",
            items: [
              {
                text: "热销套餐",
                children: [
                  {
                  pic:require("../../assets/home-imgs/1.jpg"),
                  title:"鸡蛋瘦肉炒米线",
                  num: 0,
                  price: 15.0,
                  id: 0,
                  add: true,
                },
                {
                  pic:require("../../assets/home-imgs/2.jpg"),
                  title: "红烧牛肉热米线",
                  num: 0,
                  price: 15.0,
                  id: 1,
                  add: true,
                },
                ]
              },
              {
                text:"超级折扣",
                children: [{
                  pic:require("../../assets/home-imgs/3.jpg"),
                  title:"杂酱干拌米线",
                  num: 0,
                  price: 15.0,
                  id: 2,
                  add: true,
                },
                {
                  pic: require("../../assets/home-imgs/4.jpg"),
                  title:"卤牛肉凉米线",
                  num: 0,
                  price: 15.0,
                  id: 3,
                  add: true,
                },
                ],
              },
            ],
          },
        },
        {
          name:"评价",
          data: {
          content:"评价",
          },
        },
        {
          name: "商家",
          data: {
          content: "商家",
          },
        },
      ]
    }
}
}