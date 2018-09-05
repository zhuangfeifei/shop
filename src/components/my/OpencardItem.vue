<template>
	
    <div class="yuyue">
        <nav id="nav">
            <div class="header">
                <i @click="history" class="fa fa-angle-left" aria-hidden="true"></i>
                <span>会员卡</span>
            </div>
        </nav>
        

        <div class="logo">
            <img src="../../assets/img/my/fyl.png" alt="">
        </div>
        
        <div class="shouji">
            <label for="">手机号
                <input id="phone" type="text" placeholder="请输入手机号">
            </label>
            <label for="">验证码
                <input id="yma" type="text" placeholder="请输入验证码">
                <button @click="yanzheng" id="huoqu" type="default">
                    <span v-if="sendMsgDisabled">{{time + '秒后获取'}}</span>
                    <span v-if="!sendMsgDisabled">获取验证码</span>
                </button>
            </label>
        </div>
        <div class="shouquan">
            <van-checkbox class="mr" v-model="checked">同意将您的个人信息授权给扑满商城使用</van-checkbox>
            
        </div>
        <button id="Grant" class="btn" :disabled="!checked" @click="bangdings">授权开通</button>
    </div>

</template>

<script>
	export default {
		name: "loginpassword-item",
        data(){
            return{
                sendMsgDisabled:false,time:60,checked:false,vips:'',imgUrl:''
            }
        },
        created(){
            this.imgUrl = this.$httpUrl.imgUrls
            this.vips = this.$storage.getStore('user')
        },
        methods: {
            history() {
                history.go(-1)
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
                            text: '开卡成功'
                        })
                        setTimeout(() => {
                            this.$vux.loading.hide()
                            this.$router.push({path:'Join'})
                        }, 2000)
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
        }
	}
</script>

<style lang="less" scoped>
@import '../../assets/lies.css';
@import '../../assets/vux.1.css';
.yuyue{
    width: 100%; padding-top: 15vw; height: 100vh; overflow: hidden; 
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



.logo{
    width: 37vw; height: 13vw; margin: 10vw auto;
    img{
        width: 100%; height: 100%;
    }
}



.juan{
    width: 90%; margin: 0 auto;
}
.ka{
    width: 100%; height: 30vw; color: #ffffff; margin-top: 3vw;
    background: url('../../assets/img/my/card@2x.png') no-repeat; background-size: 100% 100%;
}
.yuan{
    width: 18vw; height: 18vw; border: 0.5vw solid #ffffff; border-radius: 50%;
    margin-top: 6vw; margin-left: 7vw; text-align: center; line-height: 18vw; font-size: 4.5vw; font-family: Broadway Regular;
}
.ka>div{
    float: left;
}
.ka>div:nth-child(2){
    position: relative; top: 9vw; left: 5vw; font-size: 4.7vw; font-weight: 550;
}
.ka>div:nth-child(2)>p:nth-child(1){
    margin: 0; font-size: 4.4vw; font-weight: 500;
}
.kahao{
    clear: both; position: relative; top: 10vw; left: 7vw; font-size: 4.5vw; font-weight: 600;
}



.shouji{
    width: 100%; margin-top: 10vw;
}
#huoqu{
    color: #ff8b4b; float: right; line-height: 13vw; font-size: 4.3vw; position: relative; right: -10vw; border: none!important;
    background: none;
}
label{
    font-size: 4.3vw; line-height: 6vw; padding-bottom: 1vw; width: 90vw; margin: 1vw 5vw 0 5vw; padding-right: 10vw;
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

.shouquan{
    width: 90vw; height: 10vw; margin: 5vw auto; color: gray; font-size: 3.5vw;
}

.btn{
    width: 90%; height: 12vw; background-color: #ff8b4b; outline: none!important;
    position: relative; top: 20vw; left: 5%; color: white; font-size: 4.5vw; border-radius: 1vw;
}
</style>