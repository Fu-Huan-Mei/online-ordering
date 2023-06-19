const { VantResolver } = require('unplugin-vue-components/resolvers');
const ComponentsPlugin = require('unplugin-vue-components/webpack');
module.exports = {
    //Eslint不检测
    lintOnSave:false,
    //配置rem适配的2个插件
    css:{
        loaderOptions: {
            postcss: {
                plugins: [
                    //rootValue:37.5  1rem=37.5px;
                    require('postcss-pxtorem')({rootValue:37.5,propList:['*']}),
                ]
            }
        }
    },
    //配置vant-ui：按需引入
    configureWebpack: {
        plugins: [
          ComponentsPlugin({
            resolvers: [VantResolver()],
          }),
        ],
    }
}