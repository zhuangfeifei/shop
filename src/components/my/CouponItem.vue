<template>
	
    <div class="yuyue">
        <nav id="nav">
            <div class="header">
                <i @click="history" class="fa fa-angle-left" aria-hidden="true"></i>
                <span>优惠券</span>
            </div>
            <div class="you">
                <div :class="{bei:beis == keyWords}" @click="chan(keyWords)" v-for="(item,keyWords) in zhuangtai" :key="keyWords">{{item}}</div>
            </div>
        </nav>
        
        <div class="juan">
             <!--优惠券单元格 
            <van-coupon-cell title="优惠券"
            :coupons="coupons"
            :chosen-coupon="chosenCoupon"
            @click="showList = true"
            />-->

            <!-- 优惠券列表 -->
            <!--<van-popup v-model="showList" position="bottom">-->
            <van-coupon-list id="lie" disabled-list-title="不可用优惠券" :show-close-button="false"
                :coupons="coupons"
                :chosen-coupon="chosenCoupon"
                :disabled-coupons="disabledCoupons"
                @change="onChange"
            />
            <!--</van-popup>-->
        </div>
        
    </div>

</template>

<script>
	export default {
		name: "loginpassword-item",
        data(){
            return{
                Data:'',
                zhuangtai:['未使用','已使用','已过期'],beis:0,
                chosenCoupon: -1,
                coupons: [],
                disabledCoupons: [],
                showList:true,
                couponsarry:[],dis:[],diss:[],disss:[]
            }
        },
        created(){
            document.body.scrollTop = 0
            document.documentElement.scrollTop = 0
            this.youhuijuan()
            this.coupons = this.couponsarry  // 第一次加载优惠卷
            this.disabledCoupons = this.disss

            
        },
        mounted(){
            this.$nextTick( ()=> {
                setTimeout(()=>{
                    this.huoqu() 
                },100)
            })
        },
        methods: {
            history() {
                this.$router.push({path:'/Join'})
            },
            chan(keyWords){
                // console.log(keyWords)
                setTimeout(()=>{
                    this.huoqu()
                },100)
                this.beis = keyWords
                if (keyWords == 0) {
                    this.coupons = this.couponsarry
                    this.disabledCoupons = []
                    setTimeout(()=>{  // key值冲突
                        this.disabledCoupons = this.disss  
                    },100)
                }
                if (keyWords == 1) {
                    this.disabledCoupons = []
                    this.coupons = []
                    setTimeout(()=>{  // key值冲突
                        this.disabledCoupons = this.dis  
                    },100)
                }
                if (keyWords == 2) {
                    this.disabledCoupons = []
                    this.coupons = []
                    setTimeout(()=>{  // key值冲突
                        this.disabledCoupons = this.diss
                    },100)
                }
            },
            huoqu(){
                $(document).ready(()=>{
                    var a = document.querySelectorAll('.van-coupon-item--disabled')
                    // console.log(a.length)
                    for(var i = 0; i < a.length; i++){
                        ((s)=>{
                            a[s].onclick = (e)=>{
                                this.$router.push({path:'Detailscoupond',query:{id:this.disabledCoupons[s].id}})
                            }
                        })(i)
                    }
                })
            },
            onChange(index){
                this.$router.push({path:'Detailscoupond',query:{id:this.coupons[index].id}})
            },
            youhuijuan(){
                this.$axios.post(this.$httpUrl.coupon,$.param({access_type:'WXH5', wxh: this.$storage.getStore('wx'), openId:this.$storage.getStore('openIds')}) )
                .then(response => {
                    // console.log(response.data)
                    // var coupon = {
                    //     available: 1,
                    //     discount: 0,
                    //     denominations: 150, //优惠价格
                    //     origin_condition: 0, //条件
                    //     reason: '123',  //不可用原因
                    //     value: 150, //优惠价格
                    //     name: '优惠券名称',
                    //     start_at: 1489104000,
                    //     end_at: 1514592000
                    // }
                    if (response.data.code == 200) {
                        var shopCoupons = response.data.data
                        var a = []
                        for(var i = 0; i < shopCoupons.length; i ++){
                            var start = new Date(shopCoupons[i].limitDateStart.replace(/-/g, "/")).getTime()/1000
                            var end = new Date(shopCoupons[i].limitDateEnd.replace(/-/g, "/")).getTime()/1000
                            var coupons = {
                                id: shopCoupons[i].id,
                                name: shopCoupons[i].title,
                                origin_condition: shopCoupons[i].conditionPice*100,
                                denominations: shopCoupons[i].discount*100,
                                value: shopCoupons[i].discount*100,
                                start_at: start,
                                end_at: end,
                                reason: shopCoupons[i].useStatus == 1 ? shopCoupons[i].useStatusDesc : shopCoupons[i].couponStatusDesc
                            }
                            if(shopCoupons[i].couponStatus == 3 && shopCoupons[i].useStatus == 0 || shopCoupons[i].couponStatus == 0){  // 未开始
                                this.disss.push(coupons)
                            }
                            if(shopCoupons[i].couponStatus == 2 && shopCoupons[i].useStatus == 0){  // 未使用
                                this.couponsarry.push(coupons)
                            }
                            if(shopCoupons[i].useStatus == 1){                                      // 已使用
                                this.dis.push(coupons)
                            }
                            if(shopCoupons[i].couponStatus == 1 && shopCoupons[i].useStatus == 0){  // 过期
                                this.diss.push(coupons)
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
@import '../../assets/lie.css';
@import '../../assets/vux.1.css';
.yuyue{
    width: 100%; padding-top: 28vw;
}
/*顶部*/
#nav{
    width: 100%; height: 28vw;
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



.you{
    width: 80%; height: 10vw; border: 0.5vw solid black; margin: 0 auto; border-radius: 1vw;
    display: flex; border-right: 0; font-size: 4.3vw; color: black;
}
.you>div{
    width: 36%; text-align: center; line-height: 9vw; border-right: 0.5vw solid black;
}
.bei{
    background-color: black; color: white;
}





</style>