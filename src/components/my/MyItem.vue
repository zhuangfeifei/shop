<template>
    <div class="my">

        <div class="header">           
            <span>我的</span>
            <router-link to="/Systemsettings">
                <span class="icon iconfont icon-iconfonticonfontjixieqimo"></span>
            </router-link>
        </div>

        <div class="haika" :class="{haikas:vips.type !== '普通卡' && data.userType == 1}">
            <div v-if="data.phonenumber == ''" class="weijiaru">
                <p>您还未加入方圆里嗨卡</p>
                <div @click="shouji">立即加入</div>
            </div>
            <router-link to="/Membership">
                <div v-if="data.phonenumber != ''" class="ka">
                    <div class="kalogo">
                        <section>
                            <img src="../../assets/img/my/logo@2x.png">
                        </section>
                    </div>
                    <div class="kaName">
                        <div><span>方圆里</span><br><span v-if="vips.type === '普通卡'" class="pName">VIP会员</span><span v-if="vips.type !== '普通卡' && data.userType == 1" class="pName">黑金会员</span></div>
                        <div class="codes">{{vipcode}}</div>
                    </div>
                </div>
            </router-link>
        </div>

        <div class="xinxi">
            <div class="portrait">
                <router-link to="/Personal">
                    <section :style="note2">
                        <img v-if="data.userType > 1" :src="data.avatar">
                        <img v-if="data.userType == 1" :src="imgUrl1 + data.avatar">
                    </section>
                </router-link>
            </div>
            <div class="wxName">
                <div><span>昵称</span><br><span class="pName">{{data.nickname}}</span></div>
            </div>
            <div class="qiandao" @click="Sign">签到</div>
        </div>

        <div class="zichan">
            <div>
                <span>余额</span><br><span class="num">0</span>
            </div>
            <div>
                <span>积分</span><br><span class="num">0</span>
            </div>
            <div>
                <router-link to="/Coupon">
                    <span>优惠券</span><br><span class="num">{{shopCouponsNum}}</span>
                </router-link>
            </div>
        </div>

        <!--服务-->
        <div class="fuwu">
            <div class="fuwu1">
                <img class="befor" src="../../assets/img/home/矩形8@2x.png" alt="">
                <span>我的订单</span> <span @click="dans(-1)">查看更多></span>
            </div>
            <div class="lie">
                <div class="biao" @click="dans(index)" v-for="(item,index) in dan" :key="index">
                    <img :src="item.img">
                    <p>{{item.zhuang}}</p>
                </div>
            </div>
            
        </div>

    </div>
</template>
<script>
import { Loading, XButton} from 'vux'
export default {
     name : 'my-item',
     data(){
		return {
			imgs:'',name:'',data:'',
            imgUrl:'',imgUrl1:'',show: false,valuePhone:'',valueMa:'',openId:'',wxhs:'',
            sendMsgDisabled : false,time: 60,shopCouponsNum:'',vips:'',vipcode:'',
            dan:[
                {'zhuang':'待付款','img':require("../../assets/img/my/daifukuan@2x.png")},
                {'zhuang':'待发货','img':require("../../assets/img/my/daishouhuo@2x.png")},
                {'zhuang':'待收货','img':require("../../assets/img/my/daipingjia@2x.png")},
                {'zhuang':'待评价','img':require("../../assets/img/my/tuihuo@2x.png")},
            ],
            note2: {
				backgroundImage: "url(" + require("../../assets/img/my/头像.png") + ")",
				backgroundRepeat: "no-repeat",
				backgroundSize: "100% 100%",
			},
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
        this.youhuijuan()

        this.vip()
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
            // this.show = true
            this.$router.push({path:'Join'})
        },
        Sign(){

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
        vip(){
            this.$axios.post(this.$httpUrl.getInfo,$.param({ access_type:'WXH5', wxh:wxhs, openId:openId }))
            .then(response => {
                // console.log(response.data)
                if (response.data.code == 200) {
                    this.vips = response.data.data
                    this.vipscode()
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
        vipscode(){
            this.$axios.post(this.$httpUrl.getOneCode,$.param({ access_type:'WXH5', wxh:wxhs, openId:openId, id:this.vips.id }))
            .then(response => {
                // console.log(response.data)
                if (response.data.code == 200) {
                    this.vipcode = response.data.data.code
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
        youhuijuan() {
            this.$axios.post(this.$httpUrl.coupon, $.param({ access_type: 'WXH5', wxh: this.$storage.getStore('wx'), openId: this.$storage.getStore('openIds') }))
                .then(response => {
                    // console.log(response.data)
                    if (response.data.code == 200) {
                        this.shopCouponsNum = response.data.data.length
                        
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
        dans(index){
            if(index == -1){
                this.$router.push({path:'Myorder',query:{nums:null}})
            }else{
                this.$router.push({path:'Myorder',query:{nums:index+1}})
            }
        }
    }
}
</script>
<style lang="less" scoped>
.my{
    width: 100%; padding-bottom: 25vw;
}

.header{
    width: 100%; height: 15vw; background-color: black; color: white; text-align: center;
    font-size: 5vw; line-height: 15vw;
}
.header>span:nth-child(1){
    position: relative; left: 5vw;
}
.header>a>span{
    float: right; position: relative; right: 3vw; font-size: 5vw;
}
.header>a{
    color: white;
}


.haika{
    width: 90%; height: 35vw; background: url("../../assets/img/my/card@2x.png") no-repeat; font-size: 4.5vw;
    background-size: 100% 100%; margin: 3vw auto; color: white; text-align: center; padding-top: 7vw;
}
.haikas{
    background: url("../../assets/img/my/vips.png") no-repeat; background-size: 100% 100%;
}
.weijiaru{
    width: 100%; height: 100%;
}
.weijiaru>div{
    width: 26vw; height: 9vw; border: 0.3vw solid white; margin: 4vw auto; border-radius: 5vw;
    line-height: 8vw; font-size: 4vw;
}


.ka{
    width: 100%; height: 25vw; padding-top: 2vw; text-align: left;
}
.kalogo{
    width: 20vw; height: 100%; float: left;
}
.kalogo img{
    .imgs;
}
.kalogo section{
    .imgs; position: relative; left: 3vw;
}
.kaName{
    float: left; padding-top: 1vw; margin-left: 3vw; font-size: 4vw;
    .codes{
        position: relative; left: 35vw; top: 5vw; font-size: 4.5vw;
    }
}

.imgs{
    width: 15vw; height: 15vw; border-radius: 50%;
}


.xinxi{
    width: 90%; height: 25vw; margin: 0 auto; padding: 6vw 0; font-size: 4.3vw;
    /*border: 1px solid red;*/
}
.portrait{
    width: 22vw; height: 20vw; float: left; padding-left: 4vw;
}
.portrait img,section{
    .imgs
}
.wxName{
    width: 40vw; height: 15vw; float: left; padding: 1.5vw 1vw;
    /*border: 1px solid red;*/
}
.pName{
    font-size: 4.3vw;
    position: relative; top: 1vw; display: -webkit-box; -webkit-box-orient: vertical; -webkit-line-clamp: 1; overflow: hidden;
}
.qiandao{
    width: 20vw; height: 8vw; float: right; margin-right: 4vw; color: white; text-align: center; line-height: 8vw;
    background: url("../../assets/img/my/qiandao@2x.png") no-repeat; background-size: 100% 100%;
    position: relative; top: 3.5vw;
}


.zichan{
    width: 100%; height: 20vw; display: flex; margin: 0 auto; font-size: 4.3vw; color: #757575;
    border-bottom: 3vw solid #f7f7f7;
}
.zichan>div{
    width: 33.33%; height: 80%; border-right: 0.3vw solid #dbdbdb; text-align: center;
}
.zichan>div:nth-child(3){
    border: 0;
}
.num{
    position: relative; top: 1vw;
}


/*服务*/
.fuwu{
    width: 100%; height: 35vw; background-color: white; padding: 0 4vw;
    /*border: 1px solid red;*/
}
.fuwu1{
    width: 100%; height: 13vw; position: relative;
    /*border-bottom: 0.3vw solid gainsboro;*/
    line-height: 13vw;
}
.fuwu1>span{
    margin-left: 7vw; font-size: 4.5vw; color: black;
}
.fuwu1>span:nth-child(3){
    margin-right: 2vw; font-size: 4vw; color: gray; float: right;
}
.befor{
    width: 1.5vw; height: 4.5vw; position: absolute; top: 4vw; left: 4vw;;
}
.lie{
    width: 100%; height: 27vw; font-size: 4vw; color: #757575;
    /*border: 1px solid red;*/
}
.biao{
    width: 25%; height: 100%; float: left; text-align: center; padding-top: 1vw;
}
.biao img{
    width: 15vw; height: 15vw; margin-bottom: 2vw;
}




.fuwu2{
    width: 100%; height: 15vw;
}
.fuwu2>div:nth-child(1){
    padding: 0; border: 0;
}
.fuwu2>div{
    width: 100%; height: 100%;
    /*border-bottom: 1px solid gainsboro;*/
    padding-top: 1vw; font-size: 4.7vw;
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

.haika a{
    color: white;
}








</style>

