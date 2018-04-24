<template>
    <div class="home">
		<header-item :headers="header"></header-item>
        <div class="dan" v-for="(items,indexs) in data" :key="indexs">
            <div class="bianhao">
                <span>订单编号：{{items.orderNo}}</span><span>交易成功</span>
            </div>
            <div class="dizhi">
                <p><img src="../../assets/img/home/address@2x.png" alt=""><span>收货人：{{items.recieveMan}}</span><span>{{items.recievePhone}}</span></p>
                <div class="dizhis">收货地址：{{items.address}}</div>
            </div>
            <div class="jine">
                <div>
                    <img :src="imgUrl + items.logo" alt="">
                    <span>{{items.shopName}}</span>
                </div>
                <div id="caiming" v-for="(item,index) in items.orderGoods" :key="index">
                    <div>
                        <img :src="imgUrl + item.thumbPic" alt="">
                    </div>
                    <div>
                        <p><span>{{item.goodsName}}</span><span>￥{{item.nowPrice}}</span></p>
                        <p><span> </span><span>市场价：￥{{item.oldPrice}}</span></p><br>
                        <p><span> </span><span>X{{item.goodsNum}}</span></p>
                        
                        <!--<van-card :title="item.goodsName" :num="item.goodsNum" price="2.00" :thumb="imgUrl + item.thumbPic" />-->

                    </div>
                    <div id="xian"></div>
                </div>
                <div class="je">
                    <span>配送方式</span><span>{{items.carrierName}}</span>
                </div>
                <div class="je">
                    <span>买家留言</span><span>{{items.remark}}</span>
                </div>
                <div class="je">
                    <span>商品合计</span><span>￥{{items.orderMoney}}</span>
                </div>
                <div class="je">
                    <span>优惠卷</span><span>不使用优惠卷</span>
                </div>
                <div class="je">
                    <span>优惠</span><span>-￥</span>
                </div>
                <div class="je">
                    <span>实际支付金额</span><span>￥{{items.orderMoney}}</span>
                </div>
            </div>
            <div class="shijian">
                <span>{{items.orderDate}}</span>
            </div>
            
            <div class="chakan">
                <button @click="qwe" class="btn">查看物流</button><button @click="pingjia" class="btn">立即评价</button>
            </div>
        </div>
    </div>
</template>
<script>
import Header from "./Header"
export default {
    data(){
        return{
            header:'订单详情',
            data:'',imgUrl:''
        }
    },
    components: {
        "header-item": Header,
    },
    created(){
        document.body.scrollTop = 0
        document.documentElement.scrollTop = 0

        this.imgUrl = this.$httpUrl.imgUrls
        // console.log(this.$store.state.orderId)
        var order = this.$route.query.orderIds
        // console.log(orders)
        this.$axios.post(this.$httpUrl.orderDetail, $.param({ access_type:'WXH5', wxh: this.$storage.getStore('wx'), openId:this.$storage.getStore('openIds'), orderIds:order }))
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
    methods:{
        history() {
            history.go(-1)
        },
        qwe(){
            this.$router.push({name:'myorder'})
        },
        pingjia(){
            this.$router.push({name:'evaluate',query:{logo:this.data.logo,name:this.data.shopName}})
        }
    }
}
</script>
<style scoped>
@import '../../assets/vux.css';
.home{  
    padding-top: 15vw; font-size: 4vw;
}


.dan{
    width: 100%; border-top: 3vw solid #f2f2f2;
}

.bianhao{
    width: 90%; height: 15vw; line-height: 16vw; border-bottom: 0.3vw solid gainsboro; margin-left: 5%;
}
.bianhao>span:nth-child(2){
    float: right;
}

.dizhi{
    width: 100%; height: 33vw; padding: 3vw 5vw; border-bottom: 3vw solid #f2f2f2;
}
.dizhi img{
    width: 6vw; height: 7vw;
}
.dizhi>p>span:nth-child(2){
    margin-left: 2vw;
}
.dizhi>p>span:nth-child(3){
    float: right;
}
.dizhi>p:nth-child(2){
    padding-left: 8vw;
}

.jine{
    width: 100%; font-size: 4vw; padding: 0 5vw 2vw 5vw;
}
.jine>div{
    width: 100%; height: 15vw; border-bottom: 1px solid gainsboro; padding: 2vw 0vw; line-height: 11vw;
}
.jine img{
    width: 10vw; height: 8vw; float: left; margin-top: 1.5vw; margin-right: 2vw;
}
input{
    width: 45vw; height: 10vw; float: right;
    border: 0; background: none; outline: none;
}
.jine>div:nth-child(8)>span:nth-child(2){
    float: right; color: red; font-weight: 600;
}
#caiming{
    width: 100%; height: 30vw; position: relative;
}
#caiming>div{
    float: left;height: 100%; width: 20vw;
}
#caiming>div:nth-child(2){
    float: left; width: 70vw; padding-left: 5vw;
}
#caiming>div:nth-child(2)>p>span:nth-child(2){
    float: right;
}
#caiming img{
    width: 100%; height: 23vw;
}
.je>span:nth-child(2){
    float: right;
}
p{
    margin: 0; line-height: 8vw; color: gray; 
}
p:nth-child(1){
    color: black;
}
#xian{
    background-color: gray; width: 5vw!important; height: 0.3vw!important; 
    position: absolute; top: 14vw; right: 2vw;
}

.dizhis{
    width: 100%; height: 15vw;line-height: 6vw; padding-left: 8vw;
    display: -webkit-box; -webkit-box-orient: vertical; -webkit-line-clamp: 2;
}

.shijian{
    width: 100%; text-align: right; padding-right: 5vw; color: gray; font-size: 3.5vw;
}
.chakan{
    width: 100%; display: flex; justify-content: space-around; margin-top: 5vw; margin-bottom: 10vw;
    padding: 0 5vw;
}
.btn{
    background-color: white; outline: none!important; width: 26vw;
    height: 10vw; font-size: 4vw; border: 0.3vw solid gray;
}





</style>


