// import axios from 'axios';
// //baseurl会根据当前环境进行配置
// const baseurl = '';
// class HttpRequest {
//     constructor(baseurl){
//         this.baseurl = baseurl;
//     }

//     getInsideConfig(){
//         const config = {
//             baseurl:this.baseurl,
//             header:{}
//         };
//         return config;
//     }

//     interceptors(instance){
//         // 添加请求拦截器
//         instance.interceptors.request.use(function (config) {
//             // 在发送请求之前做些什么
//             return config;
//         }, 
//         function (error) {
//             // 对请求错误做些什么
//             return Promise.reject(error);
//         });

//         // 添加响应拦截器
//         instance.interceptors.response.use(function (response) {
//         // 2xx 范围内的状态码都会触发该函数
//         const { data,code } = response.data;
//         if(code == 200){
//             return data;
//         }else{

//         }
//         // 对响应数据做点什么
//             // return response;
//         }, 
//         function (error) {
//             // 超出 2xx 范围的状态码都会触发该函数。
//             // 对响应错误做点什么
//             return Promise.reject(error);
//         });
//     }

//     //请求
//     request(options){
//         const instance = axios.create();
//         options = {...this.getInsideConfig(),...options};
//         this.interceptors(instance);
//         return instance;
//     }
// }
// export default new HttpRequest(baseurl,)