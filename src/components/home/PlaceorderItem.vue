<template>
    <div class="home">
        <header-item :headers="header"></header-item>
        <div class="jine">
            <div>
                <span>订单金额（元）</span><input id="jiner" v-model="shiji" type="number" placeholder="请询问服务员后输入">
                <!--pattern="[0-9]*"  pattern="\d*"  数字键盘-->
            </div>
            <div>
                <span>不参与优惠金额（元）</span><input id="youhui" v-model="buyouhui" type="number" placeholder="请询问服务员后输入">
            </div>
            <div class="zhekou" v-show="zhe != ''">
                <span>折扣</span><span>{{zhe}}折</span>
            </div>
            <div class="je">
                <!--<span>优惠卷</span><span>不使用优惠卷</span>-->
                <van-coupon-cell title="优惠券"
                :coupons="coupons"
                :chosen-coupon="chosenCoupon"
                @click="showList = true"
                />
            </div>
            <div class="jiner">
                <span>折扣优惠</span>
                <span v-if="shiji == ''">￥0</span>
                <span v-if="shiji != '' && zhe == ''">￥0</span>
                <span v-if="shiji != '' && zhe != '' && buyouhui == ''">￥{{(shiji*zhe/10-shiji).toFixed(2)}}</span>
                <span v-if="shiji != '' && zhe != '' && buyouhui != ''">￥{{((shiji-buyouhui)*zhe/10+parseInt(buyouhui)-shiji).toFixed(2)}}</span>
            </div>
            <div class="jiner">
                <span>实付金额</span>
                <span class="shijis" v-if="shiji == ''">¥0</span>
                <span class="shijis" v-if="shiji != '' && zhe == ''">￥{{(shiji - couponMoney).toFixed(2)}}</span>
                <span class="shijis" v-if="shiji != '' && zhe != '' && buyouhui == ''">￥{{(shiji*zhe/10 - couponMoney).toFixed(2)}}</span>
                <span class="shijis" v-if="shiji != '' && zhe != '' && buyouhui != ''">￥{{((shiji-buyouhui)*zhe/10+parseInt(buyouhui) - couponMoney).toFixed(2)}}</span>
            </div>
            <div>
                <span>备注</span><input type="text" id="beizhu" placeholder="如包房号、服务员号等">
            </div>
        </div>

        <button @click="dindan" type="button" class="btn">和店员已确认，立即买单</button>

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
// import { Toast } from 'vux'
import { Toast } from 'vant';
import { Dialog } from 'vant';
export default {
    data(){
        return{
            header:'提交订单',shiji:'',buyouhui:'',zhe:'',shijis:'',show:false,value: '',showKeyboard: true,
            orderId:'',shopCoupons:'',couponMoney:0,data:'',youhuijuanId:'',
            chosenCoupon: -1,
            coupons: [],disabledCoupons:[],
            showList:false,
        }
    },
    components: {
        "header-item": Header,
    },
    created(){
        document.body.scrollTop = 0
        document.documentElement.scrollTop = 0
        
        // console.log(this.$route.query.shopids)
        this.zhekou()
        this.youhuijuan()
    },
    methods:{
        history() {
            history.go(-1)
        },
        xiaoshu(a,b){
            var c = a*100 - b*100
            return c/100
        },
        onChange(index) {
            this.showList = false;
            this.chosenCoupon = index;
            if(index == -1){
                this.couponMoney = 0
                this.youhuijuanId = ''
            }else{
                this.couponMoney = this.data[index].discount
                this.youhuijuanId = this.data[index].id
            }
        },
        zhekou(){
            this.$axios.post(this.$httpUrl.getDiscount,$.param({access_type:'WXH5', wxh: this.$storage.getStore('wx'), openId:this.$storage.getStore('openIds'),shopid:this.$route.query.shopids}) )
            .then(response => {
                // console.log(response.data)
                if (response.data.code == 200) {
                    this.zhe = response.data.data
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
        youhuijuan(manjian){
            this.$axios.post(this.$httpUrl.coupon,$.param({access_type:'WXH5', wxh: this.$storage.getStore('wx'), openId:this.$storage.getStore('openIds'),shopids:this.$route.query.shopids}) )
            .then(response => {
                // console.log(response.data)
                if (response.data.code == 200) {
                    this.data = response.data.data
                    var shopCoupons = response.data.data
                    var couponsarry = [],disabledCoupons = []
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
                        if(manjian){
                            if(this.shiji != '' && this.zhe == ''){
                                if(this.shiji >= shopCoupons[i].conditionPice){
                                    couponsarry.push(coupons)
                                }else{
                                    disabledCoupons.push(coupons)
                                }
                            }
                            if(this.shiji != '' && this.zhe != '' && this.buyouhui == ''){
                                if(this.shiji*this.zhe/10 >= shopCoupons[i].conditionPice){
                                    couponsarry.push(coupons)
                                }else{
                                    disabledCoupons.push(coupons)
                                }
                            }
                            if(this.shiji != '' && this.zhe != '' && this.buyouhui != ''){
                                if((this.shiji-this.buyouhui)*this.zhe/10+parseInt(this.buyouhui) >= shopCoupons[i].conditionPice){
                                    couponsarry.push(coupons)
                                }else{
                                    disabledCoupons.push(coupons)
                                }
                            }
                        }else{
                            couponsarry.push(coupons)
                        }
                    }
                    this.coupons = couponsarry
                    this.disabledCoupons = disabledCoupons
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
        dindan(){
            var re = /^[0-9]+.?[0-9]*$/;
            if (!re.test(this.shiji)) {
                Dialog.alert({
                    title: '温馨提示',
                    message: '请输入正确的金额！'
                }).then(() => {
                    
                });
                this.shiji = ''
            　　return false
        　　}
            this.$vux.loading.show({
                text: '正在下单'
            })
            var money = $('.shijis').text().substring(1,)
            var beizhu = $('#beizhu').val()
            if(this.youhuijuanId != ''){
                this.$axios.post(this.$httpUrl.buy, $.param({ access_type:'WXH5', wxh: this.$storage.getStore('wx'), openId:this.$storage.getStore('openIds'), orderMoney:money,couponid:this.youhuijuanId, shopId:this.$route.query.shopids, remark:beizhu }))
                .then(response => {
                    // console.log(response.data)
                    if (response.data.code == 200) {
                        var orderId = response.data.data.orderId
                        // var orderNo = response.data.data.orderNo
                        var orderMoney = response.data.data.orderMoney
                        this.$store.commit('orderIds',orderId)
                        this.$vux.loading.hide()
                        this.$router.push({path:'Payment1',query:{order:response.data.data}})
                        // window.location.href = this.$httpUrl.build + '/puman/wx/phone/wxpay?orderId='+orderId+'&wxh='+this.$storage.getStore('wx')+'&openId='+this.$storage.getStore('openIds')+'&orderNo='+orderNo+'&orderMoney='+orderMoney
                    } else {
                        this.$vux.loading.hide()
                        Toast.fail(response.data.message);
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
            }else{
                this.$axios.post(this.$httpUrl.buy, $.param({ access_type:'WXH5', wxh: this.$storage.getStore('wx'), openId:this.$storage.getStore('openIds'), orderMoney:money, shopId:this.$route.query.shopids, remark:beizhu }))
                .then(response => {
                    // console.log(response.data)
                    if (response.data.code == 200) {
                        var orderId = response.data.data.orderId
                        // var orderNo = response.data.data.orderNo
                        // var orderMoney = response.data.data.orderMoney
                        this.$store.commit('orderIds',orderId)
                        this.$vux.loading.hide()
                        this.$router.push({path:'Payment1',query:{order:response.data.data}})
                        // window.location.href = this.$httpUrl.build + '/puman/wx/phone/wxpay?orderId='+orderId+'&wxh='+this.$storage.getStore('wx')+'&openId='+this.$storage.getStore('openIds')+'&orderNo='+orderNo+'&orderMoney='+orderMoney
                    } else {
                        this.$vux.loading.hide()
                        Toast.fail(response.data.message);
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
            }
        },
    
    },
    watch:{
        buyouhui(curVal,oldVal){
            // console.log(curVal,oldVal)
　　　　　　if(curVal > parseInt(this.shiji)){
                this.buyouhui = ''
                Dialog.alert({
                    title: '温馨提示',
                    message: '不参与优惠应小于订单金额！'
                }).then(() => {
                    
                });
            }
　　　　},
        shiji(cursor,oldVal){
            this.chosenCoupon = -1
            this.couponMoney = 0
            this.youhuijuanId = ''
            this.youhuijuan(true)
            if(cursor.length == 0){
                this.youhuijuan()
            }
        }
    }
}
</script>
<style scoped>
@import '../../assets/vux.1.css';

.van-hairline--bottom::after, .van-hairline--left::after, .van-hairline--right::after, .van-hairline--surround::after, .van-hairline--top-bottom::after, .van-hairline--top::after, .van-hairline::after{
    border:0;
}


.home{
    padding-top: 15vw; font-size: 4vw;
}


/*.van-popup--bottom{
    height: 56vh; width: 100vw; text-align: center;
}
h4{
    margin: 5vw auto;
}*/


.jine{
    width: 100%; font-size: 4vw; padding: 3vw;
}
.jine>div{
    width: 100%; height: 15vw; border-bottom: 1px solid gainsboro; padding: 2vw 0vw; line-height: 11vw;
}
/*.jine>div:nth-child(6){
    margin-top: 10vw;
}*/
.jine img{
    width: 8vw; height: 8vw; float: left; margin-top: 1.5vw; margin-right: 2vw;
}
input{
    width: 50vw; height: 10vw; float: right; text-align: right; padding-right: 5vw;
    border: 0; background: none; outline: none;
}
.jine>.zhekou>span:nth-child(2),.jine>.jiner>span:nth-child(2){
    float: right; color: red; font-weight: 600; margin-right: 5vw;
}
#wei{
    width: 8vw; height: 7vw;
}


.btn{
    background-color: red; color: white; outline: none!important;
    width: 90%; height: 13vw; margin: 25vw 5%; font-size: 4.5vw;
}

a:focus{
    outline: none;
}




.zhifubao,.weixin{
    float: left;
}
.zhifubao1,.weixin1{
    float: right; width: 10vw; height: 100%; margin-right: 5vw; padding-top: 1vw;
}



@keyframes hover-color {
  from {
    border-color: #c0c0c0; }
  to {
    border-color: #3e97eb; } }

.magic-radio{
  position: absolute;
  display: none; }

.magic-radio[disabled]{
  cursor: not-allowed; }

.magic-radio + label{
  position: relative;
  display: block; line-height: 9vw;
  padding-left: 12vw;
  cursor: pointer;
  vertical-align: middle; }
  .magic-radio + label:hover:before{
    animation-duration: 0.4s;
    animation-fill-mode: both;
    animation-name: hover-color; }
  .magic-radio + label:before{
    position: absolute;
    top: 2vw;
    left: 5vw;
    display: inline-block;
    width: 5vw;
    height: 5vw;
    content: '';
    border: 0.3vw solid #c0c0c0; }
  .magic-radio + label:after{
    position: absolute;
    display: none;
    content: ''; }

.magic-radio:checked + label:before{
  animation-name: none; }

.magic-radio:checked + label:after{
  display: block; }

.magic-radio + label:before {
  border-radius: 50%; }

.magic-radio + label:after {
  top: 3vw;
  left: 6vw;
  width: 3vw;
  height: 3vw;
  border-radius: 50%;
  background: #3e97eb; }

.magic-radio:checked + label:before {
  border: 0.3vw solid #3e97eb; }

.magic-radio:checked[disabled] + label:before {
  border: 0.3vw solid #c9e2f9; }

.magic-radio:checked[disabled] + label:after {
  background: #c9e2f9;}
</style>


