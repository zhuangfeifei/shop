<template>
	
    <div class="yuyue">
        <nav id="nav">
            <div class="header">
                <i @click="history" class="fa fa-angle-left" aria-hidden="true"></i>
                <span>卡券包</span>
            </div>
        </nav>
        
        <div class="juan">
             <van-cell title="会员卡" icon="card" />
             <div class="ka" @click="huiyuan">
                 <div class="yuan">FYL</div>
                <div>
                    <p>方圆里</p>
                    <p>方圆里嗨卡</p>
                </div>
             </div>
            <van-cell id="you" title="优惠券" icon="coupon" value="查看全部" is-link to="/Coupon" />
            <van-coupon-list id="lie" :show-close-button="false"
                :coupons="coupons"
                :chosen-coupon="chosenCoupon"
                :disabled-coupons="disabledCoupons"
            />
        </div>
        
    </div>

</template>

<script>
	export default {
		name: "loginpassword-item",
        data(){
            return{
                chosenCoupon: -1,
                coupons: [],disabledCoupons: [],
                showList:true
            }
        },
        created(){
            document.body.scrollTop = 0
            document.documentElement.scrollTop = 0
            this.youhuijuan()
        },
        methods: {
            history() {
                history.go(-1)
            },
            huiyuan(){
                this.$router.push({name:'membership'})
            },
            onChange(index) {
                this.showList = false;
                this.chosenCoupon = index;
            },
            onExchange(code) {
                this.coupons.push(coupon);
            },
            youhuijuan(){
                this.$axios.post(this.$httpUrl.coupon,$.param({access_type:'WXH5', wxh: this.$storage.getStore('wx'), openId:this.$storage.getStore('openIds')}) )
                .then(response => {
                    // console.log(response.data)
                    if (response.data.code == 200) {
                        var shopCoupons = response.data.data
                        for(var i = 0; i < shopCoupons.length; i ++){
                            if(i > 2) return
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
                                this.coupons.push(coupons)
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
        }
	}
</script>

<style scoped>
@import '../../assets/lies.css';
@import '../../assets/vux.1.css';
.yuyue{
    width: 100%; padding-top: 15vw; height: 100vh;
}
/*顶部*/
#nav{
    width: 100%; height: 15vw;
    position: fixed; top: 0; z-index: 1000;
    background-color: white;
    border-bottom: 1px solid gainsboro;
}
#nav .header{
    width: 100%; height: 15vw;
    text-align: center;
    line-height: 15vw;
} 
.fa-angle-left{
    float: left; margin-left: 5vw;
    font-size: 10vw;
    line-height: 14vw; color: black
}
#nav .header span{
    margin-left: -8vw;
    font-size: 5vw; 
    line-height: 15vw;
}
#nav>img{
    margin-top: -5vw; width: 100%;
}



.juan{
    width: 90%; margin: 0 auto;
}
.ka{
    width: 100%; height: 30vw; color: #ffffff; margin-top: 3vw;
    background: url('../../assets/img/my/zise@2x.png') no-repeat; background-size: 100% 100%;
}
.yuan{
    width: 18vw; height: 18vw; border: 0.5vw solid #ffffff; border-radius: 50%;
    margin-top: 6vw; margin-left: 7vw; text-align: center; line-height: 18vw; font-size: 4.5vw; font-family: Broadway Regular;
}

#you{
    margin-top: 5vw;
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


</style>