<template>
	
    <div class="yuyue">
        <nav id="nav">
            <div class="header">
                <i @click="history" class="fa fa-angle-left" aria-hidden="true"></i>
                <span>会员卡</span>
            </div>
        </nav>
        
        
        <div class="Join_mains">
            <div class="integral">
                <img src="../../assets/img/my/图标_积分@2x.png" alt=""><span>积分</span><span>{{user.integration}}</span>
                <span v-if="user.phonenumber == ''"><router-link to="/Wallet">查看更多></router-link></span><span v-else><router-link to="/Wallet">积分服务></router-link></span>
            </div>
            <div class="vip" v-if="user.phonenumber == ''" :style="note2"><router-link to="/Opencard"><p class="register">注册开通电子会员卡</p></router-link></div>
            <div class="vip" v-else :style="note1">
                <div class="QR_code" @click="qrcodes"><img src="../../assets/img/my/扫码_会员码@2x.png" alt=""></div>
                <div class="vip_class">
                    <p><span>会员等级</span><span>{{vip_card.name}}</span></p>
                    <div><span></span><span></span><span></span></div>
                    <div><span>普通会员</span><span>钻石会员</span></div>
                </div>
                <p class="code" v-if="vip_card">NO：{{vip_card.cardno | filter}}</p>
            </div>
        </div>

        <div class="footer">
            <div class="foo">
                <div v-for="(item,index) in vips" :key="index" :style="{ 'background-image': 'url(' + item.img + ')','background-repeat':'no-repeat','background-size':'100% 100%' }">
                    <span @click="show_regulations(index)" v-if="index == 0">{{item.name}}</span>
                    <span @click="show_regulations(index)" v-if="index == 1">{{item.name}}</span>
                    <router-link v-if="index == 2 || index == 3" :to="item.url">{{item.name}}</router-link>
                    <a v-if="index == 4" :href='"tel:"+vip_card.telnumber'>{{item.name}}</a>
                </div>
            </div>
        </div>

        <van-popup class="QR" v-model="show"><div class="QR_codes"><p>会员码</p><div id="qrcode"></div></div></van-popup>
        <van-popup v-model="show1" position="right" id="cont_html"><div v-html="content" class="cont"></div></van-popup>
        
    </div>

</template>

<script>
	export default {
		name: "loginpassword-item",
        data(){
            return{
                note2: {
                    backgroundImage: "url(" + require("../../assets/img/my/会员卡_未开通@2x.png") + ")",
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "100% 100%",
                },
                note1: {
                    backgroundImage: "url(" + require("../../assets/img/my/会员卡_已开通@2x.png") + ")",
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "100% 100%",
                },
                vips:[
                    {name:'会员权益',img:require("../../assets/img/my/背景图_会员权益@2x.png"),url:''},
                    {name:'会员折扣',img:require("../../assets/img/my/背景图_会员折扣@2x.png"),url:''},
                    {name:'会员信息',img:require("../../assets/img/my/背景图_会员信息@2x.png"),url:'/Membership'},
                    {name:'积分商城',img:require("../../assets/img/my/背景图_积分商城@2x.png"),url:'/Integralshop'},
                    {name:'联系客服',img:require("../../assets/img/my/背景图_联系客服@2x.png"),tel:''}
                ],
                vip_card:'',vipcode:'',user:'',show:false,show1:false,content:''
            }
        },
        created(){
            this.user = this.$storage.getStore('user')
            if(this.$storage.getStore('user').phonenumber != ''){
                this.vip()
            }
        },
        methods: {
            history() {
                history.go(-1)
            },
            qrcodes(){
                this.show = !this.show
            },
            vip(){
                this.$axios.post(this.$httpUrl.getInfo,$.param({ access_type:'WXH5', wxh:wxhs, openId:openId }))
                .then(response => {
                    // console.log(response.data)
                    if (response.data.code == 200) {
                        this.vip_card = response.data.data[0]
                        this.$storage.setStore('vip',response.data.data[0])
                        var qrcode = new QRCode(document.getElementById("qrcode"), {
                            width: 180,
                            height: 180
                        })
                        function makeCode(e) {
                            qrcode.makeCode(e)
                        }
                        makeCode(response.data.data[0].cardno)
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
            show_regulations(index){
                // this.show1 = !this.show1
                // if(index == 0){
                //     this.content = this.vip_card.equity.replace(/;/g,'').replace(/&gt/g,'>').replace(/&lt/g,'<').replace(/&apos/g,"'").replace(/&quot/g,"\\")
                // }else{
                //     this.content = this.vip_card.discount
                // }
            }
        },
        filters:{
            filter(value){
                return value.substring(0,4) + ' ' + value.substring(4,8) + ' ' + value.substring(8,12) + ' ' + value.substring(12,)
            },
        }
	}
</script>

<style lang="less" scoped>
@import '../../assets/lies.css';
@import '../../assets/vux.1.css';
.yuyue{
    width: 100%; padding-top: 15vw; min-height: 100vh;
    background-color: gainsboro; box-shadow:0px 0px 16px rgba(0,0,0,0.1)
}
/*顶部*/
#nav{
    width: 100%; height: 15vw;
    position: fixed; top: 0; z-index: 1000;
    background-color: black; color: white;
}
#nav .header{
    width: 100%; height: 15vw;
    text-align: center;
    line-height: 15vw;
} 
.fa-angle-left{
    float: left; margin-left: 5vw;
    font-size: 10vw;
    line-height: 14vw; 
}
#nav .header span{
    margin-left: -8vw;
    font-size: 5vw; 
    line-height: 15vw;
}
#nav>img{
    margin-top: -5vw; width: 100%;
}




.Join_mains{
    width: 100%; height: 41vh; font-size: 4vw;
    .integral{
        width: 90%; height: 10vw; margin: 3vw 5% 1vw 5%; line-height: 10vw; font-family: PingFang-SC-Medium; font-weight: Medium;
        img{ width: 6vw; height: 6vw; position: relative; top: 2vw;}
        span,img{float: left}
        span:nth-child(2){ margin-left: 3vw;}
        span:nth-child(3){ margin-left: 5vw; color: rgba(234,22,22,1)}
        span:nth-child(4){ float: right; a{color: #2c3e50}}
    }
    .vip{
        width: 95%; height: 57vw; margin: 0 auto; padding-top: 6vw;
        .QR_code{
            width: 8vw; height: 8vw; float: right; margin-right: 8vw; margin-bottom: 11.5vw;
            img{ width: 100%; height: 100%;}
        }
        .register{
            text-align: center; margin-top: 38.5vw;
        }
        .code{
            text-align: center; font-size: 4.5vw; margin-top: 1vw;
        }
        a{
            color: black; font-weight: bold; text-decoration: underline;
        }
        .vip_class{
            width: 100%; height: 18vw; padding-left: 8vw; clear: both;
            p{
                display: inline-block; width: 100%; height: 5vw; font-size: 4vw; line-height: 5vw;
                span:nth-child(2){
                    font-family:PingFang-SC-Medium; color:#ff8b4b; margin-left: 3vw;
                }
            }
            div:nth-child(2){
                width: 90%; height: 0.7vw; padding:0; display: flex;
                span{ display: inline-block;}
                span:nth-child(1){
                    width: 30%; height: 100%; background-color: RGBA(255, 139, 75, 1);
                }            
                span:nth-child(2){
                    width: 2vw; height: 1.5vw; border-radius: 50%; background-color: RGBA(255, 139, 75, 1); position: relative; top: -0.4vw;
                }            
                span:nth-child(3){
                    width: 100%; height: 40%; background-color: RGBA(255, 139, 75, 1); position: relative; top: 0.2vw;
                }            
            }
            div:nth-child(3){
                width: 90%; height: 8vw; padding:0; font-size: 3.5vw; line-height: 8vw;
                span:nth-child(1){
                    float: left;
                }            
                span:nth-child(2){
                    float: right;
                }           
            }
        }
    }
}


.footer{
    width: 100%; height: 56vh; margin-top: -8vw; padding-top: 15vw; font-size: 4.5vw;
    background: url("../../assets/img/my/背景图_会员卡_圆弧@2x.png") no-repeat; background-size: 100% 100%;
    .foo{
        width: 92%; height: 90%; margin-left: 4%;
        // border: 1px solid red;
        div{
            width: 31%; height: 26vw; float: left; margin-left: 2%; margin-bottom: 2%; text-align: center; line-height: 25vw;
            a,span{
                color: white; font-weight: bold; text-decoration: underline;
            }
        }
        div:nth-child(4){
            width: 64%;
        }
    }
}


.QR{ border-radius: 3vw;}
.QR_codes{
    padding: 5vw; background-color: white; text-align: center; font-size: 4.5vw; border-radius: 3vw; font-weight: bold;
}

#cont_html{
    width: 90vw; min-height: 50vh; margin-right: 5vw;
    .cont{
        // width: 90vw; min-height: 50vh;
    }
}


</style>