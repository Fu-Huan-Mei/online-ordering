import Mock from 'mockjs';
import homeApi from './mockData/homeApi.js';
import storeApi from './mockData/storeApi.js';
//拦截路径和要拦截获取的数据:HomeData
Mock.mock('/home/getHomeData',homeApi.getHomeData);
//拦截路径和要拦截获取的数据:StoreData
//在这个 URL 地址中，站点的根目录是 http://localhost:8080/，其中 / 表示根目录
Mock.mock('/store/getStoreData',storeApi.getStoreData);
// Mock.mock('/home/getStoreData',storeApi.getStoreData);