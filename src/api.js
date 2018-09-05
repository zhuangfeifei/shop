import axios from 'axios'
import store from './vuex/store'

let localhostDev = false
let host = localhostDev ? '/Shop' : 'http://www.homeamc.cn'

const api = axios.create();
api.defaults.timeout = 5000;
api.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'
// 请求拦截
api.interceptors.request.use(function (config) {
    // console.log(config)
    // 在发送请求之前做些什么
    // store.commit('SET_LOADING',true)

    return config

  }, function (error) {
    
    alert('网络错误,请稍后再试')

    store.commit('SET_LOADING',false)

    return Promise.reject(error)
})

// 添加响应拦截器
api.interceptors.response.use(function (response) {
    // console.log(response)
    // setTimeout(()=>{
      store.commit('SET_LOADING',false)
    // },500)

    if(response.data.message === "无效token") {
      // router.replace({path: 'login'})
    }

    return response;

  }, function (error) {
    
      store.commit('SET_LOADING',false)
    
    if(errore.response) {

      if(error.response.status== 401) {
          // 如果返回401 即没有权限，跳到登录页重新登录
        // store.commit('CHANGE_TOKEN',0);

        alert('请重新登录');

        router.replace({
          path: 'login',
          query: {redirect: router.currentRoute.fullPath}
        })

      }
    }

    return Promise.reject(error)
})
let httpUrl = {
    
    api:api,

    'dev': host,
    'build': 'http://www.homeamc.cn',
    'build1': 'http://192.168.1.224:8080',

    'games': localhostDev ? '../../../static/games/index.html' : 'http://www.homeamc.cn/shopping/static/wx/static/games/index.html',

    'imgUrls': host + '/shopping/kaptcha/',                                 // 图片路径 
    'imgUrls1': host + '/shopping/kaptcha/comment/',  
    
    'imgUrls2': 'http://www.homeamc.cn/puman/kaptcha/',  

    // 登录模块
    'login': host + '/shopping/api/sys/login',                              // 登录

    'logout': host + '/shopping/api/logout',                                // 退出登录

    'paypwd': host + '/shopping/api/set/paypwd',                            // 设置余额密码

    // 首页
    'carousel': host + '/shopping/api/basic/carousel',                      // 轮播图

    'adsense': host + '/shopping/api/basic/adsense',                        // 广告位

    'calssfiy': host + '/shopping/api/basic/calssfiy',                      // 首页分类

    // 用户评论
    'thumb': host + '/shopping/api/comment/thumb',                          // 点赞

    'insertRely': host + '/shopping/api/comment/insertRely',                // 回复或者评价

    'getByShopid': host + '/shopping/api/comment/getByShopid',              // 获取相关商户的评价

    'getCommentContens': host + '/shopping/api/comment/getCommentContens',  // 获取评论详情

    // 购物车
    'getList': host + '/shopping/api/shoppingcart/getList',                 // 获取购物车列表

    'insertGoods': host + '/shopping/api/shoppingcart/insertGoods',         // 添加到购物车

    'updateAmount': host + '/shopping/api/shoppingcart/updateAmount',       // 更新购物车商品的数量

    'shoppingcartDeleteGoods': host + '/shopping/api/shoppingcart/deleteGoods',         // 删除购物车商品

    // 收藏夹
    'favoriteGoods': host + '/shopping/api/favorite/insertGoods',           // 添加到收藏夹

    'favoritegetList': host + '/shopping/api/favorite/getList',             // 收藏夹列表

    'deleteGoods': host + '/shopping/api/favorite/deleteGoods',             // 删除收藏夹商品

    // 商品
    'list': host + '/shopping/api/goods/list',                              // 分页查询商品列表

    'detail': host + '/shopping/api/goods/detail',                          // 查询商品详情

    // 商户信息
    'shopList': host + '/shopping/api/shop/list',                           // 根据分类查询商户列表

    'shopDetail': host + '/shopping/api/shop/detail',                       // 查询商户详情

    // 订单信息
    'cart': host + '/shopping/api/order/cart',                              // 生成购物车商品订单

    'create': host + '/shopping/api/order/create',                          // 生成商品订单

    'buy': host + '/shopping/api/order/buy',                                // 生成买单订单

    'orderDetail': host + '/shopping/api/order/detail',                     // 查询订单详情

    'orderList': host + '/shopping/api/order/list',                         // 分页查询用户订单列表

    'pay': host + '/shopping/api/order/pay',                                // 支付

    'h5pay': host + '/shopping/api/order/h5pay',                            // 微信支付

    'coupon': host + '/shopping/api/order/coupon',                          // 优惠券列表
    
    'couponDetail': host + '/shopping/api/order/coupon/detail',             // 优惠券详情列表

    // 用户基础信息
    'listadress': host + '/shopping/api/customer/listadress',               // 获取用户地址列表

    'addadress': host + '/shopping/api/customer/addadress',                 // 添加用户地址列表

    'updateadress': host + '/shopping/api/customer/updateadress',           // 更新用户地址

    'deladress': host + '/shopping/api/customer/deladress',                 // 删除用户地址

    'defaultById': host + '/shopping/api/customer/defaultById',             // 是否是默认地址

    // 会员/api/card/list
    'cardList': host + '/shopping/api/card/list',                           // 获取会员卡列表

    'getDiscount': host + '/shopping/api/card/getDiscount',                 // 获取会员折扣

    'getInfo': host + '/shopping/api/card/getInfo',                         // 获取会员卡信息

    'getOneCode': host + '/shopping/api/card/getOneCode',                   // 获取会员码

    'addCustomerCard': host + '/shopping/api/card/addCustomerCard',         // 绑定会员卡

    'addIntegration': host + '/shopping/api/card/addIntegration',           // 积分
    'getIllege': host + '/shopping/api/card/getIllege',           // 积分
    'getIntegralHis': host + '/shopping/api/card/getIntegralHis',           // 积分

    'allNotice': host + '/shopping/notice/allNotice',                       // 获取所有的已读及未读通知

    'allIsNotRead': host + '/shopping/notice/allIsNotRead',                 // 获取所有的未读通知

    'changReadStatus': host + '/shopping/notice/changReadStatus',           // 改变阅读状态

    'getBalance': host + '/shopping/api/comment/getBalance',                // 获取余额

    // 我的
    'user': host + '/shopping/api/comment/user',                            // 获取用户信息

    'editUserInfo': host + '/shopping/api/customer/editUserInfo',           // 更新用户信息

    'phone': host + '/shopping/api/bind/phone',                             // 绑定手机号

    'code': 'http://www.homeamc.cn/puman/api/system/code',                  // 发送验证码
}

export { httpUrl }