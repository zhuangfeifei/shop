import Vue from 'vue'
import Router from 'vue-router'


// 首页
import Home from '@/Home/Home'
// 餐厅简介
import Restaurant from '@/Home/Restaurant'
// 餐厅分类
import Classification from '@/Home/Classification'
// 商品详情
import Details from '@/Home/Details'
// 提交订单
import Placeorder from '@/Home/Placeorder'
// 立刻购买
import Buy from '@/Home/Buy'
// 立刻购买
import Buy1 from '@/Home/Buy1'
// 位置
import Position from '@/Home/Position'
// 购物车
import Shoppingcart from '@/Home/Shoppingcart'
// 确认支付
import Payment from '@/Home/Payment'
// 确认支付
import Payment1 from '@/Home/Payment1'
// 支付完成
import Complete from '@/Home/Complete'
// 立即评价
import Evaluate from '@/Home/Evaluate'
// 订单详情
import Orderdetails from '@/Home/Orderdetails'
// 我的订单
import Myorder from '@/Home/Myorder'
// 年
import Nian from '@/components/home/Nian'
import Notice from '@/components/home/Notice'

// 我的
import My from '@/my/My'
// 个人信息
import Personal from '../my/Personal'
// 我的地址
import Address from '../my/Address'
// 新增地址
import Newaddress from '../my/Newaddress'
// 地图
import Maps from '../my/Maps'   
// 系统设置
import Systemsettings from '../my/Systemsettings'
// 设置支付密码
import Paymentpassword from '../my/Paymentpassword'
// 我的钱包
import Wallet from '../my/Wallet'
// 地图
import Mapsadderss from '@/Home/Mapsadderss' 
// 优惠卷
import Coupon from '@/my/Coupon' 
// 会员卡
import Membership from '@/my/Membership'
// 卡卷包
import Coiling from '@/my/Coiling'
// 加入
import Join from '@/my/Join'
// 开卡
import Opencard from '@/my/Opencard'
// 优惠卷详情
import Detailscoupond from '@/my/Detailscoupond'

import layer from '@/components/home/layer'
import shop from '@/components/home/shop'
import game from '@/components/home/game'
import Integralshop from '@/components/my/Integralshop'


Vue.use(Router)

export default new Router({
    routes: [
        {
          path: '/',
          name: 'home',
          component: Home
        },
        { //餐厅简介
            name: "restaurant",
            path: '/restaurant',
            component: Restaurant ,
        },
        { //餐厅分类
            name: "classification",
            path: '/classification',
            component: Classification ,
        },
        { //商品详情
            name: "details",
            path: '/details',
            component: Details ,
        },
        { //提交订单
            name: "placeorder",
            path: '/placeorder',
            component: Placeorder ,
        },
        { //立刻购买
            name: "buy",
            path: '/buy',
            component: Buy ,
        },
        { //立刻购买
            name: "buy1",
            path: '/buy1',
            component: Buy1 ,
        },
        { //位置
            name: "position",
            path: '/position',
            component: Position ,
        },
        { //购物车
            name: "shoppingcart",
            path: '/shoppingcart',
            component: Shoppingcart ,
        },
        { //确认支付
            name: "payment",
            path: '/payment',
            component: Payment ,
        },
        { //确认支付
            name: "payment1",
            path: '/payment1',
            component: Payment1 ,
        },
        { //支付完成
            name: "complete",
            path: '/complete',
            component: Complete ,
        },
        { //立即评价
            name: "evaluate",
            path: '/evaluate',
            component: Evaluate ,
        },
        { //订单详情
            name: "orderdetails",
            path: '/orderdetails',
            component: Orderdetails ,
        },
        { //我的订单
            name: "myorder",
            path: '/myorder',
            component: Myorder ,
        },
        { //我的
            name: "my",
            path: '/my',
            component: My ,
        },
        { //个人信息
            name: "personal",
            path: '/personal',
            component: Personal 
        },
        { //我的地址
            name: "address",
            path: '/address',
            component: Address 
        },
        { //新增地址
            name: "newaddress",
            path: '/newaddress',
            component: Newaddress 
        },
        { //地图
            name: "maps",
            path: '/maps',
            component: Maps 
        },
        { //系统设置
            name: "systemsettings",
            path: '/systemsettings',
            component: Systemsettings 
        },
        { //设置支付密码
            name: "paymentpassword",
            path: '/paymentpassword',
            component: Paymentpassword 
        },
        { //我的钱包
            name: "wallet",
            path: '/wallet',
            component: Wallet 
        },
        { //地图
            name: "mapsadderss",
            path: '/mapsadderss',
            component: Mapsadderss 
        },
        { //年
            name: "nian",
            path: '/nian',
            component: Nian 
        },
        { //优惠卷
            name: "coupon",
            path: '/coupon',
            component: Coupon 
        },
        { //会员卡
            name: "membership",
            path: '/membership',
            component: Membership 
        },
        { //卡卷包
            name: "coiling",
            path: '/coiling',
            component: Coiling 
        },
        { //加入
            name: "join",
            path: '/join',
            component: Join 
        },
        { //开卡
            name: "opencard",
            path: '/opencard',
            component: Opencard 
        },
        { //优惠卷详情
            name: "detailscoupond",
            path: '/detailscoupond',
            component: Detailscoupond 
        },
        { //
            name: "layer",
            path: '/layer',
            component: layer 
        },
        { //
            name: "shop",
            path: '/shop',
            component: shop 
        },
        { //
            name: "game",
            path: '/game',
            component: game 
        },
        { //
            name: "Integralshop",
            path: '/Integralshop',
            component: Integralshop 
        },
        { //
            name: "Notice",
            path: '/Notice',
            component: Notice 
        },
    ]
})
