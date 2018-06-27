<template>
	
    <div class="yuyue">
        <nav id="nav">
            <div class="header">
                <i @click="history" class="fa fa-angle-left" aria-hidden="true"></i>
                <span>优惠券详情</span>
            </div>
        </nav>
        
        <div class="content_coupon">
            <div class="titles">
                <p class="tixian3" id="shopName">
                    <span>{{data.shopName}}</span>
                </p>
                <div class="title">
                    <img src="../../assets/img/my/yuandian@2x.png">
                    {{data.title}}
                </div>
            </div>
            <div class="titles">
                <p class="tixian3">
                    <span>使用条件</span>
                </p>
                <div class="title">
                    <img src="../../assets/img/my/yuandian@2x.png">
                    满{{data.conditionPrice}}减{{data.discountPrice}} &nbsp;&nbsp;适用于{{data.shopName}}
                </div>
            </div>
            <div class="titles">
                <p class="tixian3">
                    <span>有效时间</span>
                </p>
                <div class="title">
                    <img src="../../assets/img/my/yuandian@2x.png">
                    {{data.limitDateStart}} ~ {{data.limitDateEnd}}
                </div>
            </div>
            <div class="titles">
                <p class="tixian3">
                    <span>校验码</span>
                </p>
                <div class="title">
                    <p>
                    <img src="../../assets/img/my/yuandian@2x.png">校验码：<span class="kuang" v-if="data.qrcode">{{data.qrcode}}</span><span class="right" v-if="data.useStatus == 1">已使用</span><span class="right" v-if="data.useStatus == 0">未使用</span></p>
                    <div class="QR_code" id="qrcode">
                        
                    </div>
                </div>
            </div>
        </div>
    </div>

</template>

<script>
// import VueQriously from 'vue-qriously'
// import QRCode from 'qrcode'
	export default {
        data(){
            return{
                data:'',codes:'',bannerUrl: 'http://192.168.1.110:8090'
            }
        },
        created(){
            this.details()
            // this.useqrcode()
            
        },
         mounted () {
            
        },
        methods: {
            history() {
                history.go(-1)
            },
            details(){
                this.$axios.post(this.$httpUrl.couponDetail,$.param({access_type:'WXH5', wxh: this.$storage.getStore('wx'), openId:this.$storage.getStore('openIds'), couponId:this.$route.query.id}) )
                    .then(response => {
                        // console.log(response.data)
                        if (response.data.code == 200) {
                            this.data = response.data.data
                            var qrcode = new QRCode(document.getElementById("qrcode"), {
                                width: 180,
                                height: 180
                            });

                            function makeCode(e) {
                                qrcode.makeCode(e);
                            }

                            makeCode(response.data.data.qrcode);
                            // makeCode(132);
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
            }
        }
	}
</script>

<style lang="less" scoped>
@import '../../assets/lies.css';
@import '../../assets/vux.1.css';
.yuyue{
    width: 100%; padding-top: 15vw; padding-bottom: 10vw;
    background: url("../../assets/img/my/beijing@2x.png") no-repeat; background-size: 100% 100%;
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





.content_coupon{
    width: 95%; height: 95%; margin: 1.5vw auto; padding-top: 5vw; padding-bottom: 6vw;
    background: url("../../assets/img/my/youhuiquan@2x.png") no-repeat; background-size: 100% 100%;
}

#shopName{
    color: black;
}
.tixian3{
    display: inline-block; width: 100%; height: 8vw; color: #666666;
    /*border: 1px solid red;*/
}
.tixian3 img{
    width: 1.5vw; height: 5vw; margin-left: 3vw; line-height: 5vw; margin-top: -1vw;
}
.tixian3 span{
    font-size: 4.2vw; margin-left: 2vw; font-weight: 600; line-height: 10vw;
}

.titles{
    width: 90%; margin: 0 auto; color: #969696;
    .title{
        width: 90%; margin: 0 auto; font-size: 3.5vw; padding: 0 0 2vw 0; position: relative; top: -2vw;
        .kuang{
            padding: 1vw 2vw; color: black; font-size: 5vw;
        }
        .right{
            float: right; color: black; font-size: 4vw;
        }
    }
    .QR_code{
        width: 60%; height: 45vw; margin: 5vw auto;
        // border: 1px solid black; 
    }
    img{
        width: 1.5vw; height: 1.5vw; margin-right: 1vw;
    }
}

</style>