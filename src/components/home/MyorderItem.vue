<template>
    <div class="home">
		<header-item :headers="header"></header-item>
        <!--<div class="daohang">
            <span @click="dao(index)" :class="{'active':index == i}" v-for="(item,index) in nav" :key="index">{{item}}</span>
        </div>-->
        <van-tabs :active="active"  @click="qiehuan">
            <van-tab id="qwe" v-for="(a,num) in 5" :title="nav[num]" :key="num">
                <div class="jine" v-for="(items,indexs) in data" :key="indexs">
                    <div>
                        <img src="../../assets/img/my/1.png" alt="">
                        <span>订单编号：{{items.orderNo}}</span>
                        <span class="tai" v-show="items.orderStatus == 0">待付款</span>
                        <span class="tai" v-show="items.orderStatus == 1">待发货</span>
                        <span class="tai" v-show="items.orderStatus == 2">待收货</span>
                        <span class="tai" v-show="items.orderStatus == 3">待评价</span>
                        <span class="tai" v-show="items.orderStatus == 4">已完成</span>
                    </div>
                    <div id="caiming" @click="xiangqing(indexs)" v-for="(item,index) in items.orderGoods" :key="index">
                        <div>
                            <img :src="imgUrl + item.thumbPic" alt="">
                        </div>
                        <div>
                            <p><span>{{item.goodsName}}</span><span>￥{{item.nowPrice}}</span></p>
                            <p>
                                <!--<span>周一至周四 | 免预约</span>-->
                                <span>市场价：￥{{item.oldPrice}}</span>
                            </p>
                            <p><span></span><span>X{{item.goodsNum}}</span></p>
                        </div>
                        <div id="xian"></div>
                    </div>
                    <div class="heji">
                        <p>共{{nums[indexs]}}件商品&nbsp&nbsp 合计：￥{{items.orderMoney}}（含运费：￥0.00）</p>
                    </div>
                    <div class="btns">
                        <button @click="fukuan(indexs)" v-show="items.orderStatus == 0" class="btn">立即付款</button>
                        <button v-show="items.orderStatus == 1" class="btn">提醒发货</button>
                        <button v-show="items.orderStatus == 2" class="btn">确认发货</button>
                        <button @click="pj(indexs)" v-show="items.orderStatus == 3" class="btn">立即评价</button>
                        <button v-show="items.orderStatus >= 2" class="btn">查看物流</button>
                    </div>
                </div>
            </van-tab>
        </van-tabs>
        <!--<div id="loading">
                <img v-if="!loading" src="../../assets/img/placeholder.gif" alt="">
                <span v-if="loading">没有更多了</span>
            </div>-->
        
        <div v-if="showzanwu" class="zanwu">
            暂无订单
        </div>
    </div>
</template>
<script>
import Header from "./Header"
export default {
    data(){
        return{
            header:'我的订单',
            nav:['全部','待付款','待发货','待收货','待评价'],active:0,i:0,showzanwu:false,
            data:'',a:true,nums:[],
            dibu:1,currents:1,limit:3,loading:false,qieNum:0
        }
    },
    components: {
        "header-item": Header,
    },
    created(){
        document.body.scrollTop = 0
        document.documentElement.scrollTop = 0

        this.imgUrl = this.$httpUrl.imgUrls
        
    
        if(this.$route.query.nums != null){
            this.active = this.$route.query.nums
            this.shuaxing(this.$route.query.nums)
        }else{
            this.shuaxing()
        }
        // var nums = new Array
        
        // this.nums = nums

        if(this.dibu == 1){
            window.onscroll = this.didScroll;
        }
    },
    methods:{
        history() {
            history.go(-1)
        },
        // dao(index){
        //     this.i = index
        // },
        qiehuan(num){
            // console.log(num)
            if(num == 0){
                this.shuaxing()
            }else{
                this.shuaxing(num)
                this.qieNum = num
            }
        },
        pj(indexs){
            this.$router.push({path:'Evaluate',query:{shopid:this.data[indexs].shopId,logo:this.data[indexs].logo}})
        },
        shuaxing(index){
            this.$axios.post(this.$httpUrl.orderList, $.param({ access_type:'WXH5', wxh: this.$storage.getStore('wx'), openId:this.$storage.getStore('openIds'), orderStatus:index, limit:this.limit,current:this.currents }))
            .then(response => {
                // console.log(response.data)
                if (response.data.code == 200) {
                    this.data = response.data.data
                    this.shuliang(response.data.data)
                    if(response.data.data.length == 0){
                        this.showzanwu = true
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
        xiangqing(indexs){
            this.$store.commit('orderIds',this.data[indexs].id)
            this.$router.push({path:'Orderdetails'})
        },
        shuliang(a){
            var shu = new Array
            for(var i =0;i < a.length; i ++){
                var goods = a[i].orderGoods
                var num = 0
                for(var s =0;s < goods.length; s ++){
                    num += goods[s].goodsNum
                }
                shu.push(num)
            }
            this.nums = shu
        },
        fukuan(indexs){
            var shop = {
                orderNo:this.data[indexs].orderNo,
                orderId:this.data[indexs].id,
                orderMoney:this.data[indexs].orderMoney,
            }
            // console.log(shop)
            this.$store.commit('shangPings',shop)
            this.$router.push({path:'Payment1'})
        },
        didScroll() {
            var allHeight = this.$(document).scrollTop() + this.$(window).height();
            var bodyHeight = this.$(document).height();

            // 如果到底部则请求数据
            if (allHeight >= bodyHeight) {
                if(!this.loading){
                    this.currents ++
                    this.loadMore()
                }
            }
        },
        loadMore() {
            this.$axios.post(this.$httpUrl.orderList, $.param({ access_type:'WXH5', wxh: this.$storage.getStore('wx'), openId:this.$storage.getStore('openIds'), orderStatus:this.qieNum, limit:this.limit,current:this.currents }))
            .then(response => {
                // console.log(response.data)
                if(response.data.code == 200){
                    // setTimeout(()=>{
                        this.data = this.data.concat(response.data.data)
                        if(response.data.data.length == 0){
                            this.loading = true
                        }
                    // },500)
                }
            })
            .catch(error => {
                // console.log(error)
                this.$vux.loading.show({
                    text: '服务器异常'
                })
                setTimeout(() => {
                    this.$vux.loading.hide()
                },3000)
            })
        },
    }
}
</script>
<style scoped>
@import '../../assets/vux.1.css';
.home{  
    padding-top: 15vw; font-size: 4vw; padding-bottom: 15vw;
}


#loading{
    width: 100%; height: 10vw; text-align: center; line-height: 10vw; margin-top: 3vw; color: gray;
}
#loading img{
    width: 8vw; height: 8vw;
}


.daohang{
    width: 100%; height: 14vw; display: flex; justify-content: space-around; line-height: 15vw;
}
.active{
    color: red;
}

.jine{
    width: 100%; font-size: 4vw; padding: 0 5vw 3vw 5vw; border-top: 3vw solid #f2f2f2; 
}
.jine>div{
    width: 100%; height: 15vw; border-bottom: 1px solid gainsboro; padding: 2vw 0vw; line-height: 11vw;
}
.jine>div:nth-child(1)>img{
    width: 6vw; height: 6vw; float: left; margin-right: 2vw; margin-top: 2.5vw;
}
.jine>div:nth-child(1)>span:nth-child(2){
    font-size: 3.6vw;
}
#caiming{
    width: 100%; height: 30vw; position: relative; 
}
#caiming>div{
    float: left;height: 100%; width: 23vw;
}
#caiming>div:nth-child(2){
    float: left; width: 67vw; padding-left: 5vw;
}
.jine>div:nth-child(1)>span:nth-child(3),#caiming>div:nth-child(2)>p>span:nth-child(2){
    float: right;
}
#caiming>div:nth-child(2)>p:nth-child(2){
    text-align: right;
}
#caiming>div:nth-child(1)>img{
    width: 100%; height: 23vw; margin-top: 1.3vw;
}
p{
    margin: 0; line-height: 8vw; color: gray;
}
p:nth-child(1){
    color: black;
}
#xian{
    background-color: gray; width: 5vw!important; height: 0.3vw!important; 
    position: absolute; top: 14vw; right: 1vw;
}
.heji{
    width: 100%; height: 12vw!important; line-height: 12vw; text-align: right; font-size: 3.5vw;
}

.btns{
     height: 13vw!important; border: none!important;
}
.btn{
    background-color: white;outline: none!important; border: 0.3vw solid gray; margin-left: 8vw;
    width: 23vw; height: 9vw; font-size: 3.5vw; color: black; float: right; margin-top: 1vw;
}

.tai{
    float: right;
}

.zanwu{
    width: 100%; text-align: center; font-size: 4vw; color: gray; margin-top: 50vw;
}

</style>


