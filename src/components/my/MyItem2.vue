<template>
    <div class="my">

        <div class="header">           
            <div class="header1">
                <div class="touxiang">
                    <div v-show="data.userType == 1"><img src="../../assets/img/1_我的/icon_queen_@2x.png"></div>
                    <router-link to="/Personal">
                    <div class="bian">
                        <div class="touxiang1" :style="note2">
                            <img v-if="data.userType > 1" :src="data.avatar">
                            <img v-if="data.userType == 1" :src="imgUrl1 + data.avatar">
                        </div>
                    </div>
                    </router-link>
                </div>
                <div class="xinming">
                    <span v-show="data.userType > 1">{{data.nickname}}</span>
                    <span v-show="data.userType == 1">{{data.name}}</span>
                    <p><span class="hei" v-show="data.userType == 1">黑金</span><span class="vip" v-show="data.userType == 1">VIP</span></p>
                </div>
                <div v-if="data.phonenumber == ''" @click="shouji" class="qiandao">
                    绑定手机号
                </div>
            </div>
        </div>
        <!--订单-->
        <div class="dindan">
            <div class="dindan1">
                <span>我的订单</span>
                <router-link to="/Myorder">
                    <span>查看更多订单&nbsp;&nbsp;></span>
                </router-link>
            </div>
            <div class="dindan2">
                <div @click="dans(index)" v-for="(item,index) in dan" :key="index">
                    <div class="liucheng"><img :src="item.img"></div>
                    <span>{{item.zhuang}}</span>
                </div>
            </div>
        </div>
        <!--资产-->
        <div class="zichan">
            <div class="zichan1">
                <span>我的资产</span>
            </div>
            <div class="zichan2">
                <div>
                    <router-link to="/Wallet">
                        <div class="liucheng qianbao"><img src="../../assets/img/my/我的钱包(1)@2x.png"></div>
                        <span>我的钱包</span>
                    </router-link>
                </div>
                <div>
                    <router-link to="/Wallet">
                        <div class="liucheng"><img src="../../assets/img/my/余额@2x.png"></div>
                        <span>余额</span>
                    </router-link>
                </div>
                <div @click="kaifa">
                    <div class="liucheng"><img src="../../assets/img/my/积分@2x.png"></div>
                    <span>积分</span>
                </div>
                <div>
                    <router-link to="/Coiling">
                        <div class="liucheng"><img src="../../assets/img/my/卡卷包图标@2x.png"></div>
                        <span>卡券包</span>
                    </router-link>
                </div>
            </div>
        </div>

        <!--服务-->
        <div class="fuwu">
             <div class="fuwu1">
                <span>我的服务</span>
            </div>
            <div class="gongnen">
                
            </div>
            <div class="fuwu2">
                <div>
                    <router-link to="/Systemsettings">
                        <div class="liucheng"><img src="../../assets/img/my/组22@2x.png"></div>
                        <span class="mc">我的设置</span><span class="fa fa-angle-right rs"></span>
                    </router-link>
                </div>
            </div>
        </div>

        <van-popup v-model="show" position="right" :overlay="false">
            <h3>绑定手机号</h3>
            <div>
                <label for="">手机号
                    <input id="phone" type="text" placeholder="请输入手机号">
                </label>
                <label for="">验证码
                    <input id="yma" type="text" placeholder="请输入验证码">
                    <van-button @click="yanzheng" id="huoqu" type="default">
                        <span v-if="sendMsgDisabled">{{time + '秒后获取'}}</span>
                        <span v-if="!sendMsgDisabled">获取验证码</span>
                    </van-button>
                </label>
            </div>
            <div class="anniu">
                <van-button @click="quxiao" class="qu" type="default">取消</van-button>
                <van-button @click="bangdings" class="qu" id="quer" type="primary">立即绑定</van-button>
            </div>
        </van-popup>
    </div>
</template>
<script>
import { Loading, XButton,Toast} from 'vux'
// import { Toast } from 'vant';
export default {
     name : 'my-item',
     data(){
		return {
			imgs:'',name:'',sendMsgDisabled : false,time: 60,
            note: {
				backgroundImage: "url(" + require("../../assets/img/首页_1/zuce.png") + ")",
				backgroundRepeat: "no-repeat",
				backgroundSize: "100% 100%",
			},
            note2: {
				backgroundImage: "url(" + require("../../assets/img/my/头像.png") + ")",
				backgroundRepeat: "no-repeat",
				backgroundSize: "100% 100%",
			}, 
            imgUrl:'',imgUrl1:'',data:'',show: false,openId:'',wxhs:'',
            dan:[
                {'zhuang':'待付款','img':require("../../assets/img/my/待付款.png")},
                {'zhuang':'待发货','img':require("../../assets/img/my/待发货.png")},
                {'zhuang':'待收货','img':require("../../assets/img/my/待收货.png")},
                {'zhuang':'待评价','img':require("../../assets/img/my/待评价.png")},
                {'zhuang':'退款/售后','img':require("../../assets/img/my/退款售后.png")},
            ]
		}
	},
    created(){
        document.body.scrollTop = 0
        document.documentElement.scrollTop = 0
        
        // this.imgUrl = this.$httpUrl.imgUrls
        this.imgUrl1 = this.$httpUrl.imgUrls2
        
        this.name = this.$storage.getStore('nicknames')
        this.imgs = this.$storage.getStore('headPics')

        

        this.huoquxx()
        // alert(openId,wxhs)
    },
    methods: {
        kaifa(){
            this.$vux.loading.show({
                text: '开发中',
            })
            setTimeout(() => {
                this.$vux.loading.hide()
            },1000)
        },
        shouji(){
            this.show = true
        },
        quxiao(){
            this.show = false
        },
        huoquxx(){
            // console.log(this.openId+'---------')
            this.$axios.post(this.$httpUrl.user,$.param({ access_type:'WXH5', wxh:wxhs, openId:openId}))
            .then(response => {
                // console.log(response.data)
                if (response.data.code == 200) {
                    this.data = response.data.data
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
        yanzheng(){
            var phones = $('#phone').val()
            // console.log(phones)
            this.$axios.post(this.$httpUrl.code,$.param({phone:phones,msgType:3}))
            .then(response => {
                // console.log(response.data)
                if (response.data.code == 200) {
                    this.sendMsgDisabled = true
                    let interval = window.setInterval(()=> {
                        if ((this.time--) <= 0) {
                            this.time = 60
                            this.sendMsgDisabled = false
                            window.clearInterval(interval)
                        }
                    }, 1000)
                    this.$vux.toast.show({
                        text: response.data.message
                    })
                    setTimeout(() => {
                        this.$vux.loading.hide()
                    }, 3000)
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
                this.$vux.loading.show({
                        text: '服务器异常'
                    })
                    setTimeout(() => {
                        this.$vux.loading.hide()
                    }, 3000)
            })
        },
        bangdings(){
            var phones = $('#phone').val()
            var yanzhenma = $('#yma').val()
            this.$axios.post(this.$httpUrl.phone,$.param({access_type:'WXH5', wxh:wxhs, openId:openId,
                phone:phones, vcode:yanzhenma
            }))
            .then(response => {
                // console.log(response.data)
                if (response.data.code == 200) {
                    this.$vux.toast.show({
                        text: response.data.message
                    })
                    setTimeout(() => {
                        this.$vux.loading.hide()
                    }, 3000)
                    this.show = false
                    this.huoquxx()
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
                this.$vux.loading.show({
                        text: '服务器异常'
                    })
                    setTimeout(() => {
                        this.$vux.loading.hide()
                    }, 3000)
            })
        },
        dans(index){
            if(index == 4){
                this.$router.push({path:'Myorder',query:{nums:null}})
            }else{
                this.$router.push({path:'Myorder',query:{nums:index+1}})
            }
        }
    }
}
</script>
<style scoped>
@import '../../assets/vux.1.css';
.my{
    width: 100%;
}
.header{
    width: 100%; height: 35vw; color: white;
    /*border: 1px solid red;*/
    padding-top: 5vw; 
    background: url('../../assets/img/my/img_top.png') no-repeat; background-size: 100% 100%;
}
.header1{   
    width: 100%;height: 30vw; 
    /*border: 1px solid red;*/
}
i{
    font-size: 8vw;
}
.touxiang{
    width: 30%; position: relative; text-align: center; line-height: 15vw;
    /*border: 1px solid black;*/
    float: left;
}
.touxiang>div:nth-child(1){
    width: 11vw; height: 9vw; position: absolute; top: 2.8vw; left: 7vw;
    /*border: 1px solid red;*/
    /*transform: rotate(-15deg)*/
}
.touxiang>div:nth-child(1)>img{
    width: 100%; height: 100%;position: relative; top: -4vw;
}
.bian{
    width: 19vw; height: 19vw; border: 1vw solid rgba(2500,250,250,0.5); border-radius: 50%;margin-left: 6vw; margin-top: 8vw;
}
.touxiang1{
    width: 100%; height: 100%; border: none;
    /*border: 1px solid red;*/
    border-radius: 50%;
}
.touxiang1 img{
    width: 100%; height: 100%; border-radius: 50%; border: none;
}
.xinming{
    width: 50vw; position: relative;
    /*border: 1px solid black;*/
    float: left; top: 11vw; 
    font-size: 4.5vw; color: #ffffff;
}
.xinming>span:nth-child(1){
    display: -webkit-box; -webkit-box-orient: vertical; -webkit-line-clamp: 1; overflow: hidden;
}
.hei{
    position: relative; top: 1vw
}
.vip{
    color: #fff100;position: relative; top: 1vw; left: 2vw;
}
.qiandao{
    width: 19vw;
    /*border: 1px solid black;*/ 
    float: right; text-align: center; color: white; font-size: 3.5vw; position: relative; top: 20vw;
}
 



/*资产*/
.zichan{
    width: 100%; height: 36vw; background-color: white;
    border-bottom: 3vw solid gainsboro; color: #666666; 
}
.zichan1{
    width: 100%; height: 13vw;
    border-bottom: 0.3vw solid gainsboro;
    line-height: 13vw;
}
.zichan1>span:nth-child(1){
    margin-left: 6vw; font-size: 4.5vw; color: #666666;
}
.zichan2{
    width: 100%; height: 25vw; display: flex; 
    justify-content: space-around;
}
.zichan2>div{
    width: 15%; height: 100%;
    /*border: 1px solid black; */
    text-align: center; padding-top: 3vw; font-size: 4vw;
}
.zichan2>div:nth-child(1){
    width: 20%;
}
.zichan2 .liucheng{
    width: 70%; height: 7vw;
    /*border: 1px solid black;*/
    margin: 0 auto; margin-bottom: 2vw;
}
.zichan2 .qianbao{
    width: 50%;
}
.zichan .liucheng>img{
    width: 70%; height: 100%;
}

/*服务*/
.fuwu{
    width: 100%; height: 53vw; background-color: white;
    /*border: 1px solid red;*/
}
.fuwu1{
    width: 100%; height: 13vw;
    border-bottom: 0.3vw solid gainsboro;
    line-height: 13vw;
}
.fuwu1>span:nth-child(1){
    margin-left: 6vw; font-size: 4.5vw; color: #666666;
}
.fuwu2{
    width: 100%; height: 15vw;
}
.fuwu2>div{
    width: 100%; height: 100%;
    border-bottom: 1px solid gainsboro;
    padding-top: 4vw; font-size: 4.7vw;
}
.fuwu2>div>{
     color: #333333;
}
.mc{
    margin-left: 5vw; line-height: 7vw;
}
.rs{
    font-size: 6vw; line-height: 7vw; color: gray; display: inline-block; width: 60%; height: 8vw; text-align: right; padding-right: 5vw;
}
.fuwu2 .liucheng{
    width: 8vw; height: 8vw;float: left;
    border-radius: 50%; margin-left: 5vw;
    font-size: 5vw;
    line-height: 8vw; margin-bottom: 2vw;
}
.fuwu .liucheng>img{
    width: 100%; height: 100%; margin-top: -1.5vw;
}

a{
    color: #666666;
}
a:hover{
    color: #666666; text-decoration: none;
}
a:focus{outline:none;}


/*订单*/
.dindan{
    width: 100%; height: 31vw; background-color: white;
    border-bottom: 3vw solid gainsboro;
}
.dindan1{
    width: 100%; height: 10vw;
    border-bottom: 0.3vw solid gainsboro;
    line-height: 10vw; float: left;
}
.dindan1>span:nth-child(1){
    margin-left: 6vw; font-weight: 600; font-size: 4.3vw;
}
.dindan1>a{
    float: right; margin-right: 10vw; font-size: 3vw;
}
.dindan2{
    width: 100%; height: 21vw; display: flex;
    justify-content: space-around; padding: 0 5vw;
}
.dindan2>div{
    width: 15%; height: 100%;
    /*border: 1px solid black; */
    text-align: center; padding-top: 3vw; font-size: 3.2vw;
}
.dindan2>div:nth-child(5){
    width: 18%;
}
.dindan2 .liucheng{
    width: 65%; height: 6vw;
    /*border: 1px solid black;*/
    margin: 0 auto; margin-bottom: 2vw;
}
.dindan .liucheng>img{
    width: 70%; height: 100%;
}








.van-popup--right{
    height: 100vh; width: 100vw; padding: 5vw; text-align: center;
}
h3{
    margin-bottom: 10vw;
}
.van-button--normal{
    height: 11vw; line-height: 9vw; border: 0.3vw solid gray; color: gray; font-size: 4vw; position: relative; top: 0.5vw; font-size: 4.3vw;
}
#huoqu{
    color: #3ebeda; float: right; line-height: 12vw; font-size: 4.3vw; position: relative; right: -10vw; border: none!important;
}
label{
    font-size: 4.3vw; line-height: 6vw; border-bottom: 0.3vw solid black; padding-bottom: 1vw; width: 90vw; margin-top: 1vw; padding-right: 10vw;
}
#phone{
    margin-left: 3vw; width: 59.5vw; height: 9vw; color: gray; border: none!important;
}
#yma{
    margin-left: 3vw; width: 30vw; height: 9vw; color: gray; margin-top: 2.5vw; border: none!important;
}
input:-moz-placeholder{
    font-weight: 500!important;
}
::-webkit-input-placeholder{
    font-weight: 500!important;
}
#quer{
    color: white; margin-left: 10vw; background-color: #3ebeda; height: 11vw; border: none!important; font-size: 4.3vw;
}
.anniu{
    margin-top: 15vw; text-align: center;
}
.qu{
    width: 30vw;
}
</style>

