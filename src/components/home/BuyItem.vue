<template>
    <div class="home">
		<header-item :headers="header"></header-item>
        <div @click="dizhi" class="dizhi">
            <p><img src="../../assets/img/home/address@2x.png" alt=""><span id="xming">收货人：{{dizhiName}}</span><span>{{dizhiPhone}}</span></p>
            <p>收货地址：{{dizhiAderss}}</p>
        </div>
        <div class="jine" v-for="(items,indexs) in data" :key="indexs">
            <div>
                <img :src="imgUrl + items.shoplogo" alt="">
                <span>{{items.shopname}}</span>
            </div>
            <div id="caiming" v-for="(item,index) in items.goods" :key="index">
                <div>
                    <img :src="imgUrl + item.picture" alt="">
                </div>
                <div>
                    <p><span id="ming">{{item.goodsname}}</span><span>￥{{item.nowprice}}</span></p>
                    <p><span class="zhekou" v-show="item.isDiscount == 1 && zhekou[indexs] < 10">{{zhekou[indexs]}}折</span><span>市场价：￥{{item.marketprice}}</span></p>
                    <p><span></span><span>X{{item.amount}}</span></p>
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
                <span>商品合计</span><span>￥{{items.totalcounts}}</span>
            </div>
            <div class="je">
                <van-coupon-cell title="优惠券"
                :coupons="items.coupons"
                :chosen-coupon="items.chosenCoupon"
                @click="shopCoupon(indexs)"
                />
            </div>
            <div class="je jes">
                <span>折扣优惠</span><span>￥{{items.zhekouMoneys.toFixed(2)}}</span>
            </div>
            <div class="je jes">
                <span>实际支付金额</span><span>￥{{(items.totalcount - couponMoney[indexs]).toFixed(2)}}</span>
            </div>

            <van-popup v-model="items.showList" @click="onChange(indexs)" position="bottom">
                <van-coupon-list 
                    :coupons="items.coupons"
                    :chosen-coupon="items.chosenCoupon"
                    :disabled-coupons="items.disabledCoupons"
                    @change="onChange"
                />
            </van-popup>

        </div>
        <!--xiaoshu((heji).toFixed(2),couponHeji)*100-->
        <van-submit-bar id="tijiao" :price="xiaoshu((heji).toFixed(2),couponHeji)*100" buttonText="提交订单" @submit="onSubmit" />


        
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
            data:'',imgUrl:'',heji:0,zheNum:'',zhekou:'',dizhiName:'',dizhiAderss:'',dizhiPhone:'',
            id:[],adderss:'',shopidArry:[],
            couponMoney:[],youhuijuanId:[],a:0,
            couponListIndex:0,couponHeji:0
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
        
        this.imgUrl = this.$httpUrl.imgUrls
        
        this.data = this.$storage.getStore('goods')
        // console.log(this.$storage.getStore('goods'))

        // 初始化优惠卷合计金额
        var zhe = []
        for (var s = 0; s < this.data.length; s++) {
            this.couponMoney[s] = 0   
            zhe.push(this.data[s].discount)  
        }
        this.zhekou = zhe
        // 计算优惠卷金额
        this.hejis()
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
                            this.$router.push({path:'Address',query:{xuanzeAddress1:1}})
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
        history() {
            history.go(-1)
        },
        xiaoshu(a,b){
            var c = a*100 - b*100
            return c/100
        },
        dizhi(){
            this.$router.push({path:'Address',query:{xuanzeAddress1:1}})
        },
        hejis(){
            var heji = 0,couponHeji = 0
            for(var s =0;s < this.data.length; s++){
                var goods = this.data[s].goods
                heji += this.data[s].totalcount
                couponHeji += this.couponMoney[s]
            }
            this.heji = heji
            this.couponHeji = couponHeji
        },
        onSubmit(){
            // this.$vux.loading.show({
            //     text: '正在下单'
            // })
            var aderss = this.dizhiAderss
            var name = this.dizhiName
            var phone = this.dizhiPhone
            var liuyan = $('#liuyan').val()
            var orders = new Array
            for(var i = 0;i < this.data.length;i ++){
                var shops = this.data[i]
                var goods = new Array
                var danMoney = this.xiaoshu(this.data[i].totalcount,this.couponMoney[i])
                // console.log(this.data[i].totalcount,this.couponMoney[i],danMoney)
                for(var s = 0;s < shops.goods.length;s ++){
                    goods.push({
                        goodsId:shops.goods[s].goodsid, goodsName:shops.goods[s].goodsname, goodsNum:shops.goods[s].amount,
                        nowPrice:shops.goods[s].nowprice, oldPrice:shops.goods[s].marketprice,thumbPic:shops.goods[s].picture
                    })
                    this.id.push(shops.goods[s].id)
                }
                if(this.youhuijuanId[i] == null){
                    this.youhuijuanId[i] = ''
                }
                orders.push({
                    shopId:shops.shopid, address:aderss, discount:this.zhekou[i], orderMoney:danMoney,
                    recieveMan:name, recievePhone:phone, remark:liuyan,couponid:this.youhuijuanId[i],
                    orderGoods:goods
                })
            } 
            // console.log(orders)
            this.chuanjian(orders)
        },
        shopCoupon(indexs){
            // console.log(indexs)
            this.data[indexs].showList = true
            this.couponListIndex = indexs
        },
        onChange(index) {
            // console.log(index,this.couponListIndex)
            this.data[this.couponListIndex].showList = false;
            this.data[this.couponListIndex].chosenCoupon = index;
            if(index == -1){
                this.couponHeji -= this.couponMoney[this.couponListIndex]   // 合计减去优惠卷金额
                this.couponMoney[this.couponListIndex] = 0                  // 商家减去优惠卷金额
                this.youhuijuanId[this.couponListIndex] = ''
            }else{
                // 把选中的每个商家的优惠卷金额放入数组
                this.couponMoney[this.couponListIndex] = this.data[this.couponListIndex].coupons[index].value/100
                // 计算优惠卷金额
                this.hejis()
                // 保存选中的优惠卷id
                this.youhuijuanId[this.couponListIndex] = this.data[this.couponListIndex].coupons[index].couponId
            }
        },
        chuanjian(orders){
            var id = this.id.join()
            this.$axios.post(this.$httpUrl.cart +'?access_type=WXH5&wxh='+this.$storage.getStore('wx')+'&openId='+this.$storage.getStore('openIds')+'&ids='+this.id,
                { orders },{ headers:{'Content-Type':"application/json"} }
            )
            .then(response => {
                // console.log(response.data)
                if (response.data.code == 200) {
                    var shangPing = response.data.data
                    this.$vux.loading.hide()
                    this.$router.push({path:'Payment',query:{shangPing:response.data.data}})
                    // var a = []
                    // for(var i =0; i <shangPing.length; i ++){
                    //     a.push(shangPing[i].data)
                    // }
                    // console.log(a)
                    // var b = JSON.stringify(a)
                    // window.location.href = this.$httpUrl.build + "/puman/wx/phone/cartpay?wxh="+this.$storage.getStore('wx')+"&openId="+this.$storage.getStore('openIds')+"&params="+escape(b)
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
        xiaoshu(a,b){
            var c = a*100 - b*100
            return c/100
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
#xming{
     font-size: 4vw;
}
.dizhi img{
    width: 5vw; height: 6vw;
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
.jine>div:nth-child(1),.je{
    width: 100%; height: 15vw; border-bottom: 1px solid gainsboro; padding: 2vw 0vw; line-height: 11vw;
}
.jine img{
    width: 10vw; height: 8vw; float: left; margin-top: 1.5vw; margin-right: 2vw;
}
input{
    width: 45vw; height: 8vw; float: right; line-height: 8vw; color: gray;
    border: 0; background: none; outline: none; margin-top: 1.3vw;
}
.jes>span:nth-child(2){
    float: right; color: red; font-weight: 600;
}
#caiming{
    width: 100%; height: 30vw; position: relative; border-bottom: 1px solid gainsboro; padding: 2vw 0vw; line-height: 11vw;
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
.zhekou{
    color: red;
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
    margin: 0; line-height: 8vw; color: gray; font-size: 3.5vw
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


