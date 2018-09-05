<template>
    <div class="my">

        <nav>
            <h4>会员中心</h4>
            <div class="xinxi">
                <div class="portrait">
                    <router-link to="/Personal">
                        <section :style="note2">
                            <img :src="data.avatar">
                        </section>
                    </router-link>
                </div>
                <div class="wxName">
                    <div class="pName">{{data.nickname}}</div>
                    <router-link v-if="data.phonenumber == ''" to="/Opencard"> <div class="vip"><span>成为会员</span><img src="../../assets/img/my/按钮_成为会员@2x.png" alt=""></div></router-link>
                    <router-link v-else to="/Join"> <div class="vip"><span>{{vip_name}}</span></div></router-link>
                    <div v-if="data.phonenumber != ''"><span>当前余额：{{balance || 0}}</span></div>
                </div>
                <div class="qiandao" @click="Sign">签到</div>
            </div>
            <p v-if="data.phonenumber == ''">请至会员卡开通会员，享受更多优惠</p>
            <p v-else><span>·消费优惠</span><span>·身份象征</span><span>·更专业的服务</span></p>
        </nav>
        
        <router-link to="/Myorder"><div class="Order"><img src="../../assets/img/my/我的订单@2x.png" alt=""></div></router-link>

        <div class="My_main">
            <a href="http://www.homeamc.cn/h5/car/auth"><div class="pay"><img src="../../assets/img/my/图标_停车缴费@2x.png" alt=""><span>停车缴费</span><br><span>parking payment</span></div></a> 
            <router-link to="/Coupon"><div class="coupon"><div><img src="../../assets/img/my/图标_优惠券@2x.png" alt=""></div><div><span>优惠券</span><br><span>coupon</span></div></div></router-link>
            <router-link to="/Join"><div class="card"><img src="../../assets/img/my/图标_会员卡@21x.png" alt=""><span>会员卡</span><br><span>membership card</span></div></router-link>
            <router-link to="/Systemsettings"><div class="settings"><img src="../../assets/img/my/图标_设置@2x.png" alt=""><span>设置</span><br><span>settings</span></div></router-link>
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
            imgUrl:'',imgUrl1:'',show: false,valuePhone:'',valueMa:'',openId:'',wxhs:'',balance:'',
            sendMsgDisabled : false,time: 60,shopCouponsNum:'',vips:'',vipcode:'',
            dan:[
                {'zhuang':'待付款','img':require("../../assets/img/my/图标_待付款@2x.png")},
                {'zhuang':'待发货','img':require("../../assets/img/my/图标_待发货@2x.png")},
                {'zhuang':'待收货','img':require("../../assets/img/my/图标_待收货@2x.png")},
                {'zhuang':'待评价','img':require("../../assets/img/my/图标_待评价@2x.png")},
            ],
            personal:[
                {'zhuang':'积分商城','img':require("../../assets/img/my/图标_积分商城@2x.png")},
                {'zhuang':'会员卡','img':require("../../assets/img/my/图标_会员卡@2x.png"),url:'Membership'},
                {'zhuang':'智能停车','img':require("../../assets/img/my/图标_智能停车@2x.png")},
                {'zhuang':'会员活动','img':require("../../assets/img/my/图标_会员活动@2x.png")},
            ],
            note2: {
				backgroundImage: "url(" + require("../../assets/img/my/头像.png") + ")",
				backgroundRepeat: "no-repeat",
				backgroundSize: "100% 100%",
			},vip_name:''
		}
	},
    created(){
        document.body.scrollTop = 0
        document.documentElement.scrollTop = 0

            this.huoquxx()

            this.$axios.post(this.$httpUrl.getInfo, $.param({ access_type: 'WXH5', wxh: this.$storage.getStore('wx'), openId: this.$storage.getStore('openIds') }))
            .then(response => {
                // console.log(response.data)
                if (response.data.code == 200) {
                    this.$storage.setStore('vip', response.data.data[0])
                    this.vip_name = response.data.data[0].name
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

        this.$axios.post(this.$httpUrl.getBalance,$.param({ access_type:'WXH5', wxh: this.$storage.getStore('wx'), openId: this.$storage.getStore('openIds')}))
            .then(response => {
                // console.log(response.data)
                if (response.data.code == 200) {
                    this.balance = response.data.data.balance
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
    methods: {
        huoquxx(){
            // console.log(this.openId+'---------')
            this.$axios.post(this.$httpUrl.user,$.param({ access_type:'WXH5', wxh: this.$storage.getStore('wx'), openId: this.$storage.getStore('openIds')}))
            .then(response => {
                // console.log(response.data)
                if (response.data.code == 200) {
                    this.data = response.data.data.user
                    this.$storage.setStore('user',response.data.data.user)
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
        Sign(){
            this.$axios.post(this.$httpUrl.addIntegration,$.param({access_type:'WXH5', wxh: this.$storage.getStore('wx'), openId: this.$storage.getStore('openIds'), type:2 }))
                .then(response => {
                    // console.log(response.data)
                    if (response.data.code == 200) {
                        this.$toast.success('签到成功');
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
        }
    }
}
</script>
<style lang="less" scoped>
.my{
    width: 100%; padding-bottom: 25vw; font-size: 4vw; min-height: 100vh;
}

.font{font-family: PingFang-SC-Bold; font-weight: Bold;}

nav{
    width: 100%; height: 46vh; color: white;
    background: url("../../assets/img/my/背景_会员中心@2x.png") no-repeat; background-size: 100% 100%;
    h4{
        margin: 0; font-size: 5vw; text-align: center; line-height: 15vw;
    }
    p{ 
        text-align: center; margin-top: 5vw; font-family: PingFang-SC-Regular; font-weight: Regular;
        span{ margin-left: 5vw; letter-spacing: 0.5vw;}
        span:nth-child(1){margin-left: 0vw;}
    }
}


.xinxi{
    width: 100%; height: 25vw; margin: 0 auto; padding: 3.5vw 0; font-size: 4.3vw;
    // border: 1px solid red;
}
.portrait{
    width: 22vw; height: 20vw; float: left; padding-left: 5vw;
}
.portrait img,section{
    width: 20vw; height: 20vw; border-radius: 50%;
}
.wxName{
    width: 50vw; height: 18vw; float: left; padding-left: 5vw;
    img{ width: 6vw; height: 6vw; position: relative; left: 3vw;}
    div{
        width: 100%;
    }
}
.pName{
    display: -webkit-box; -webkit-box-orient: vertical; -webkit-line-clamp: 1; overflow: hidden; font-size: 5vw;
}
.vip{
    color: rgba(255,139,75,1);
}
.qiandao{
    width: 16vw; height: 7vw; float: right; margin-right: 5vw; color: white; text-align: center; line-height: 7vw;
    background: url("../../assets/img/my/qiandao@2x.png") no-repeat; background-size: 100% 100%;
    position: relative; top: 4.5vw; font-size: 3.8vw;
}


.Order{
    width: 100%; height: 25vh; margin-top: -10vh;
    img{
        width: 90%; height: 100%; margin-left: 5%;
    }
}


.My_main{
    width: 90%; height: 40vh; margin-top: 5vw; margin-left: 5%; color: white; text-align: center; font-size: 3.8vw;
    a{ color: white;}
    .pay{
        width: 30%; height: 100%; float: left;
        background: url("../../assets/img/my/背景图_停车缴费@2x.png") no-repeat; background-size: 100% 100%; 
        img{ width: 70%; height: 35%; margin: 50% 15% 5% 15%;}
    }
    .coupon{
        width: 67%; height: 46%; float: left; margin-left: 3%;
        background: url("../../assets/img/my/背景图_优惠券@2x.png") no-repeat; background-size: 100% 100%; 
        div{ float: left; width: 50%; height: 100%; text-align: right;
            img{ width: 60%; height: 70%; margin-top: 3.5vw;}
        }
        div:nth-child(2){ text-align: left; padding-top: 7vw;}
        
    }
    .img{width: 53%; height: 40%; margin: 2vw 26% 0 26%;}
    .card{
        width: 32%; height: 50%; float: left; margin-left: 3%; margin-top: 3%; line-height: 5vw;
        background: url("../../assets/img/my/背景图_会员卡@2x.png") no-repeat; background-size: 100% 100%; 
        img{.img;}
    }
    .settings{
        width: 31%; height: 50%; float: left; margin-left: 3%; margin-top: 3%;
        background: url("../../assets/img/my/背景图_设置@2x.png") no-repeat; background-size: 100% 100%; 
        img{.img;}
    }
}

</style>

