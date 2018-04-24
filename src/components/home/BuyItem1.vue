<template>
    <div class="home">
		<header-item :headers="header"></header-item>
        <div @click="dizhi" class="dizhi">
            <p><img src="../../assets/img/home/address@2x.png" alt=""><span id="xming">收货人：{{dizhiName}}</span><span>{{dizhiPhone}}</span></p>
            <p>收货地址：{{dizhiAderss}}</p>
        </div>
        <div class="jine">
            <div>
                <img :src="imgUrl + this.$store.state.coverPic" alt="">
                <span>{{this.$store.state.shopname}}</span>
            </div>
            <div id="caiming">
                <div>
                    <img :src="imgUrl + this.$route.query.img" alt="">
                </div>
                <div>
                    <p><span id="ming">{{data.orderGoods[0].goodsName}}</span><span>￥{{data.orderGoods[0].nowPrice}}</span></p>
                    <p><span class="zhekou" v-show="this.$route.query.isDiscount == 1 && this.zhe < 10">{{this.zhe}}折</span><span>市场价：￥{{data.orderGoods[0].oldPrice}}</span></p>
                    <p><span></span><span>X{{data.orderGoods[0].goodsNum}}</span></p>
                </div>
                <div id="xian"></div>
            </div>
            <div class="je">
                <span>配送方式</span><span>无需发货</span>
            </div>
            <div class="je">
                <span>买家留言</span><span><input id="liuyan" type="text" placeholder="给卖家留言"></span>
            </div>
            <div class="je">
                <span>商品合计</span><span>￥{{data.orderMoney}}</span>
            </div>
            <div class="je">
                <!--<span>优惠卷</span><span>不使用优惠卷</span>-->
                <van-coupon-cell title="优惠券"
                :coupons="coupons"
                :chosen-coupon="chosenCoupon"
                @click="showList = true"
                />
            </div>
            <div class="je jes">
                <span>折扣优惠</span>
                <span v-if="this.$route.query.isDiscount == 1 && this.zhe < 10">￥{{(shijijinerZhe - data.orderMoney).toFixed(2)}}</span>
                <span v-if="this.$route.query.isDiscount == 0 || this.zhe == 10">￥0.00</span>
            </div>
            <div class="je jes">
                <span>实际支付金额</span><span v-if="this.$route.query.isDiscount == 0 || this.zhe == 10">￥{{(data.orderMoney-couponMoney).toFixed(2)}}</span>
                <span v-if="this.$route.query.isDiscount == 1 && zhe < 10">￥{{(shijijinerZhe-couponMoney).toFixed(2)}}</span>
            </div>
        </div>
        
        <van-submit-bar v-show="this.$route.query.isDiscount == 0 || this.zhe == 10" id="tijiao" :price="xiaoshu((data.orderMoney).toFixed(2),couponMoney)*100" buttonText="提交订单" @submit="onSubmit" />
        <van-submit-bar v-show="this.$route.query.isDiscount == 1 && this.zhe < 10" id="tijiao" :price="xiaoshu((shijijinerZhe).toFixed(2),couponMoney)*100" buttonText="提交订单" @submit="onSubmit" />

        <van-popup v-model="showList" position="bottom">
            <van-coupon-list 
                :coupons="coupons"
                :chosen-coupon="chosenCoupon"
                :disabled-coupons="disabledCoupons"
                @change="onChange"
            />
            </van-popup>
            
    </div>
</template>
<script>
import Header from "./Header"
import { Loading,Toast } from 'vux'
import { Dialog } from 'vant';
export default {
    data(){
        return{
            header:'提交订单',
            data:'',imgUrl:'',shijijinerZhe:0,zhe:'',dizhiName:'',dizhiAderss:'',dizhiPhone:'',asd:'',
            chosenCoupon: -1,youhuijuans:'',couponMoney:0,youhuijuanId:'',
            coupons: [],disabledCoupons:[],
            showList:false,
            // fanhuijianting:true
        }
    },
    components: {
        "header-item": Header,
    },
    created(){
        this.$vux.loading.show({
            text: '正在加载'
        })
        document.body.scrollTop = 0
        document.documentElement.scrollTop = 0

        this.youhuijuan()
    
        this.imgUrl = this.$httpUrl.imgUrls
        this.data = this.$storage.getStore('goods1')
        // console.log(this.data)
        // console.log(this.$route.query.isDiscount,this.$store.state.shopid)
        this.$axios.post(this.$httpUrl.getDiscount,$.param({access_type:'WXH5', wxh: this.$storage.getStore('wx'), openId:this.$storage.getStore('openIds'),shopid:this.$storage.getStore('goods1').shopId}) )
            .then(response => {
                // console.log(response.data)
                if (response.data.code == 200) {
                    if(response.data.data == ''){
                        this.zhe = 10
                    }else{
                        this.zhe = response.data.data
                    }
                    // console.log(this.zhe)
                    if(this.zhe < 10 && this.$route.query.isDiscount == 1){
                        this.shijijinerZhe = this.data.orderMoney*zhe/10
                    }
                    // else{
                    //     this.shijijiner = this.data.orderMoney
                    // }
                } else {
                    this.$vux.loading.show({
                        text: response.data.message
                    })
                    setTimeout(() => {
                        this.$vux.loading.hide()
                    }, 3000)
                }
            })
            .catch(error => {
                // console.log(error)
                this.$vux.loading.show({
                    text: '服务器异常'
                })
                setTimeout(() => {
                    this.$vux.loading.hide()
                }, 3000)
            })
    },
     mounted(){
        // alert(this.$storage.getStore('dizhis'))
        this.$axios.post(this.$httpUrl.listadress, $.param({ access_type:'WXH5', wxh: this.$storage.getStore('wx'), openId:this.$storage.getStore('openIds'), limit: '100', current: '1' }))
            .then(response => {
                this.$vux.loading.hide()
                // console.log(response.data)
                if (response.data.code == 200) {
                    var datas = response.data.data
                    if(datas.length > 0){
                        for (var i = 0; i < datas.length; i++) {
                            if (datas[i].isdefault == 1) {
                                this.adderss = datas[i].address
                                this.dizhiName = datas[i].address.split('++++')[1]
                                this.dizhiPhone = datas[i].address.split('++++')[2]
                                this.dizhiAderss = datas[i].address.split('++++')[0]
                                // console.log(this.adderss)
                            }
                        }
                    }else{
                        Dialog.confirm({
                            title: '温馨提示',
                            message: '您还没有设置收货地址，请前往设置！'
                        }).then(() => {
                            this.$router.push({path:'Address',query:{xuanzeAddress:1}})
                        }).catch(() => {
                        // on cancel
                        });
                    }
                    
                } else {
                    this.$vux.loading.show({
                        text: response.data.message
                    })
                    setTimeout(() => {
                        this.$vux.loading.hide()
                    }, 3000)
                }
            })
            .catch(error => {
                // console.log(error)
                this.$vux.loading.show({
                    text: '服务器异常'
                })
                setTimeout(() => {
                    this.$vux.loading.hide()
                }, 3000)
            })
    },
    methods:{
        xiaoshu(a,b){
            var c = a*100 - b*100
            return c/100
        },
        history() {
            history.go(-1)
        },
        dizhi(){
            this.$router.push({path:'Address',query:{xuanzeAddress:1}})
        },
        onChange(index) {
            this.showList = false;
            this.chosenCoupon = index;
            if(index == -1){
                this.couponMoney = 0
                this.youhuijuanId = ''
            }else{
                this.couponMoney = this.youhuijuans[index].discount
                this.youhuijuanId = this.youhuijuans[index].id
            }
        },
        youhuijuan(){
            this.$axios.post(this.$httpUrl.coupon,$.param({access_type:'WXH5', wxh: this.$storage.getStore('wx'), openId:this.$storage.getStore('openIds'),shopids:this.$storage.getStore('goods1').shopId}) )
            .then(response => {
                // console.log(response.data)
                if (response.data.code == 200) {
                    this.youhuijuans = response.data.data
                    var shopCoupons = response.data.data
                    for(var i = 0; i < shopCoupons.length; i ++){
                        var start = new Date(shopCoupons[i].limitDateStart.replace(/-/g, "/")).getTime()/1000
                        var end = new Date(shopCoupons[i].limitDateEnd.replace(/-/g, "/")).getTime()/1000
                        var coupons = {
                            name:shopCoupons[i].title,
                            origin_condition:shopCoupons[i].conditionPice*100,
                            denominations:shopCoupons[i].discount*100,
                            value:shopCoupons[i].discount*100,
                            start_at:start,
                            end_at:end,
                        }
                        if(shopCoupons[i].couponStatus == 2 && shopCoupons[i].useStatus == 0){
                            if(this.data.orderMoney >= shopCoupons[i].conditionPice || this.shijijiner >= shopCoupons[i].conditionPice){
                                this.coupons.push(coupons)
                            }
                        }else{
                            this.disabledCoupons.push(coupons)
                        }
                    }
                } else {
                    this.$vux.loading.show({
                        text: response.data.message
                    })
                    setTimeout(() => {
                        this.$vux.loading.hide()
                    }, 3000)
                }
            })
            .catch(error => {
                // console.log(error)
                this.$vux.loading.show({
                    text: '服务器异常'
                })
                setTimeout(() => {
                    this.$vux.loading.hide()
                }, 3000)
            })
        },
        onSubmit(){
            this.$vux.loading.show({
                text: '正在下单'
            })
            var dizhi = this.dizhiAderss
            var name = this.dizhiName
            var phone = this.dizhiPhone
            var liuyan = $('#liuyan').val()
            var order = this.$storage.getStore('goods1')
            if(this.shijijinerZhe != 0){
                order.orderMoney = this.shijijinerZhe
            }
            // console.log(this.shijijinerZhe,this.couponMoney)
            if(this.youhuijuanId != ''){
                order.couponid = this.youhuijuanId
                order.orderMoney -= this.couponMoney
            }
            order.discount = this.zhe
            order.address = dizhi
            order.recieveMan = name
            order.recievePhone = phone
            order.remark = liuyan
            // console.log(order)
            this.xiadan(order)
        },
        xiadan(order){
            this.$axios.post(this.$httpUrl.create +'?access_type=WXH5&wxh='+this.$storage.getStore('wx')+'&openId='+this.$storage.getStore('openIds'),
                { order },{ headers:{'Content-Type':"application/json"} }
            )
            .then(response => {
                // console.log(response.data)
                if (response.data.code == 200) {
                    this.$vux.loading.hide()
                    var shangPing = new Array
                    var data = {'data':response.data.data}
                    shangPing.push(data)
                    this.$store.commit('shangPings',response.data.data)
                    this.$store.commit('orderIds',response.data.data.orderId)
                    // var a = response.data.data
                    this.$router.push({path:'Payment1',query:{order:response.data.data}})
                    // window.location.href = this.$httpUrl.build + '/puman/wx/phone/wxpay?orderId='+a.orderId+'&wxh='+this.$storage.getStore('wx')+'&openId='+this.$storage.getStore('openIds')+'&orderNo='+a.orderNo+'&orderMoney='+a.orderMoney
                } else {
                    this.$vux.loading.show({
                        text: response.data.message
                    })
                    setTimeout(() => {
                        this.$vux.loading.hide()
                    }, 3000)
                }
            })
            .catch(error => {
                // console.log(error)
                this.$vux.loading.show({
                    text: '服务器异常'
                })
                setTimeout(() => {
                    this.$vux.loading.hide()
                }, 3000)
            })
        },
        
    }
}
</script>
<style scoped>
@import '../../assets/vux.1.css';
.home{  
    padding-top: 15vw; font-size: 4vw; padding-bottom: 13vw;
}
.van-hairline--bottom::after, .van-hairline--left::after, .van-hairline--right::after, .van-hairline--surround::after, .van-hairline--top-bottom::after, .van-hairline--top::after, .van-hairline::after{
    border:0;
}


.dizhi{
    width: 100%; height: 35vw; padding: 3vw 5vw; border-bottom: 3vw solid #f2f2f2; border-top: 3vw solid #f2f2f2;
}
.dizhi img{
    width: 5vw; height: 6vw;
}
#xming{
    font-size: 4vw;
}
.dizhi>p>span:nth-child(3){
    float: right;
}
.dizhi>p>span:nth-child(2){
    margin-left: 2vw;
}
.dizhi>p:nth-child(2){
    padding-left: 7vw;
}

.home>div:nth-child(3){
    border-top: 0;
}
.jine{
    width: 100%; font-size: 4vw; padding: 0 5vw 5vw 5vw; border-top: 3vw solid #f2f2f2;
}
.jine>div{
    width: 100%; height: 15vw; border-bottom: 1px solid gainsboro; padding: 2vw 0vw; line-height: 11vw;
}
.jine img{
    width: 10vw; height: 8vw; float: left; margin-top: 1.5vw; margin-right: 2vw;
}
input{
    width: 45vw; height: 10vw; float: right;
    border: 0; background: none; outline: none;
}
.jes>span:nth-child(2){
    float: right; color: red; font-weight: 600;
}
#caiming{
    width: 100%; height: 30vw; position: relative;
}
#caiming>div{
    float: left;height: 100%; width: 25vw;
}
#caiming>div:nth-child(2){
    float: left; width: 65vw; padding-left: 5vw;
}
#caiming>div:nth-child(2)>p{
    clear: both;
}
#caiming>div:nth-child(2)>p>span:nth-child(2){
    float: right;
}
#ming{
    font-size: 4vw;
}
#caiming img{
    width: 100%; height: 23vw;
}
.je>span:nth-child(2){
    float: right;
}
p{
    margin: 0; line-height: 8vw; color: gray; font-size: 3.5vw;
}
p:nth-child(1){
    color: black;
}
#xian{
    background-color: gray; width: 5vw!important; height: 0.3vw!important; 
    position: absolute; top: 14vw; right: 2vw;
}


#tijiao{
    border-top: 0.3vw solid gainsboro;
}


#liuyan{
    width: 25vw; text-align: center;
}



</style>


