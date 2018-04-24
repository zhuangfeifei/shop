<template>
    <div class="home">
        <header-item :headers="header"></header-item>
        <div class="dizhi">
            <p>订单编号：{{data.orderNo}}</p>
            <p>订单金额：￥{{data.orderMoney}}</p>
        </div>
        <div class="jine">
            <div>
                <span>选择支付方式</span>
            </div>
            <div>
                <img src="../../assets/img/home/yuezhifu@2x.png" alt="">   
                <span class="zhifubao">余额支付</span>
                <div class="zhifubao1">
                    <input class="magic-radio" type="radio" name="radio" id="r2" value="支付宝支付" checked>
                    <label for="r2" class="mo"></label>
                </div>
            </div>
            <div>
                <img id="wei" src="../../assets/img/home/wechat@2x.png" alt="">
                <span class="weixin">微信支付</span>
                <div class="weixin1">
                    <input class="magic-radio" type="radio" name="radio" id="r1" value="微信支付">
                    <label for="r1" class="mo"></label>
                </div>
            </div>
        </div>

                <van-popup v-model="show" position="bottom" :overlay="true">
                    <h4>请输入支付密码</h4>
                    <!-- 密码输入框 -->
                    <van-password-input :value="value" info="密码为 6 位数字" @focus="showKeyboard = true" />
                    <!-- 数字键盘 -->
                    <van-number-keyboard :show="showKeyboard" @input="onInput" @delete="onDelete" @blur="showKeyboard = true" />
                </van-popup>
        
        <button @click="qwe" type="button" class="btn">确认支付</button>

    </div>
</template>
<script>
import Header from "./Header"
export default {
    data(){
        return{
            mai:[
                {
                    "titelImage": "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1509364900026&di=570bd8cd24b6fe594655bd19244c70f3&imgtype=0&src=http%3A%2F%2Fimg01.taopic.com%2F160519%2F240499-16051ZQA435.jpg",
                    "titelImage1": "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1509364900025&di=b6f3770cbb0473b81d3d6d47a7e7c214&imgtype=0&src=http%3A%2F%2Fpic.qiantucdn.com%2F58pic%2F22%2F72%2F55%2F57c7a801ccf2e_1024.jpg",
                },
                
            ],
            header:'提交订单',
            data:'',value: '',showKeyboard: true,show:false
        }
    },
    components: {
        "header-item": Header,
    },
    created(){
        document.body.scrollTop = 0
        document.documentElement.scrollTop = 0
        this.data = this.$route.query.order
        // console.log(this.$route.query.order)
        // console.log(wx)
    },
    methods:{
        history() {
            history.go(-1)
        },
        qwe(){
            if($('#r2').is(':checked')){
                this.value = ''
                this.show = true
            }else{
                this.wxPay()
            }
        },
        onInput(key) {
            this.value = (this.value + key).slice(0, 6)
            if(this.value.length == 6){
                this.yue()
            }
        },
        onDelete() {
            this.value = this.value.slice(0, this.value.length - 1)
        },
        yue(){
            // console.log(orderId)
            this.$axios.post(this.$httpUrl.pay,$.param({access_type:'WXH5', wxh: this.$storage.getStore('wx'), openId:this.$storage.getStore('openIds'),orderIds:this.data.orderId,payType:3,payPwd:this.value}) )
            .then(response => {
                this.show = false
                // console.log(response.data)
                if(response.data.code == 200){
                    this.$store.commit('orderIds',this.data.orderId)
                    this.$vux.toast.show({
                        text: response.data.message
                    })
                    setTimeout(() => {
                        this.$vux.toast.hide()
                        this.$router.push({name:'complete',query:{orderIds:this.data.orderId,Moneys:this.data.orderMoney}})
                    }, 1000)
                }else{
                    this.$vux.loading.show({
                        text: response.data.message
                    })
                    setTimeout(() => {
                        this.$vux.loading.hide()
                    }, 3000)
                }
            })
            .catch(error => {
                this.show = false
                // console.log(error)
                this.$vux.loading.show({
                    text: '服务器异常'
                })
                setTimeout(() => {
                    this.$vux.loading.hide()
                }, 3000)
            })
        },
        wxPay(){
            if (typeof WeixinJSBridge == "undefined"){
                if( document.addEventListener ){
                    document.addEventListener('WeixinJSBridgeReady', onBridgeReady, false);
                }else if (document.attachEvent){
                    document.attachEvent('WeixinJSBridgeReady', onBridgeReady); 
                    document.attachEvent('onWeixinJSBridgeReady', onBridgeReady);
                }
            }else{
                this.onBridgeReady();
            }
        },
        onBridgeReady() {
            this.$axios.post(this.$httpUrl.h5pay, $.param({
                access_type: 'WXH5', orderIds: this.data.orderId, payType: 2,
                wxh: this.$storage.getStore('wx'), openId: this.$storage.getStore('openIds')
            }))
            .then(response => {
                // console.log(response.data)
                if (response.data.code == 200) {
                    this.wxzhifu(response.data.data)
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
        wxzhifu(data){
            WeixinJSBridge.invoke(
                'getBrandWCPayRequest', {
                    "appId": data.appId,     //公众号名称，由商户传入     
                    "timeStamp": data.timestamp,         //时间戳，自1970年以来的秒数     
                    "nonceStr": data.nonce, //随机串     
                    "package": data.packageName,
                    "signType": data.signType,         //微信签名方式：     
                    "paySign": data.signature //微信签名 
                },
                (res) => {
                    if (res.err_msg == "get_brand_wcpay_request:ok") {// 使用以上方式判断前端返回,微信团队郑重提示：res.err_msg将在用户支付成功后返回    ok，但并不保证它绝对可靠。 
                        this.$router.replace({name:'complete',query:{orderIds:this.data.orderId,Moneys:this.data.orderMoney}})
                    } else {
                        if (res.err_msg != 'get_brand_wcpay_request:cancel') {
                            this.$vux.loading.show({
                                text: res.err_msg
                            })
                            setTimeout(() => {
                                this.$vux.loading.hide()
                            }, 3000)
                        }
                    }
                }
            );
        }
    }
}
</script>
<style scoped>
.home{
    padding-top: 15vw; font-size: 4vw;
}

.van-popup--bottom{
    height: 58vh; width: 100vw; text-align: center;
}
h4{
    margin: 5vw auto;
}


.dizhi{
    width: 100%; height: 30vw; padding: 5vw 3vw; border-bottom: 3vw solid #f2f2f2; border-top: 3vw solid #f2f2f2;
}


.jine{
    width: 100%; font-size: 4vw; padding: 3vw;
}
.jine>div{
    width: 100%; height: 15vw; border-bottom: 1px solid gainsboro; padding: 2vw 0vw; line-height: 11vw;
}
.jine img{
    width: 8vw; height: 8vw; float: left; margin-top: 1.5vw; margin-right: 2vw;
}
#wei{
    width: 8vw; height: 7vw;
}

.btn{
    background-color: red; color: white; outline: none!important;
    width: 90%; height: 13vw; margin: 8vw 5%; font-size: 4.5vw;
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


