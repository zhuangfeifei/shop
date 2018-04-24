<template>
    <div class="home">

        <div class="shangtu1" :style="{backgroundImage: 'url(' + imgUrl + data.coverPic + ')'}">
            <div>{{this.$route.query.fenlei}}</div>
        </div>
        <div class="shangtu">
            <div>{{data.goodsName}}</div>
            <div><span>￥{{data.nowPrice}}</span><span>市场价：￥{{data.marketPrice}}</span><span id="xian"></span><span id="kucun">库存{{data.storageNum}}</span></div>
            <div><img src="../../assets/img/home/定位@2x.png"><span>{{this.$route.query.address}}</span></div>
            <div>
                <img src="../../assets/img/home/电话(1)@2x.png">
                <span><a :href='"tel:" + this.$route.query.phone'>{{this.$route.query.phone}}</a></span>
            </div>
            <i @click="history" class="fa fa-angle-left" aria-hidden="true"></i>
        </div>
        <div class="jianjie">
            <h4>商品详情</h4>
            <div id="jianjies" v-html="this.$store.state.html"></div>
        </div>
        <div class="xuzhi">
            <h4>购买须知</h4>
            <!--<div>{{data.notice}}</div>-->
            <pre id="pres">{{data.notice}}</pre>
            <!--<ul>
                <li v-for="(item,index) in data.notice.split(';')" :key="index">{{item}}</li>
            </ul>-->
        </div>
        <div class="dian">
            <router-link to="/Shoppingcart">
                <div class="shop">
                    <i class="icon iconfont icon-gouwuche1"></i>
                </div>
            </router-link>
            <div @click="gouwuche" class="btn1">加入购物车</div>
            <div @click="gouMai" class="btn2">立刻购买</div>
        </div>
    </div>
</template>
<script>
import Header from "./Header"
export default {
    data(){
        return{
            mai:[
                {
                    "titelImage": "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1509364900026&di=570bd8cd24b6fe594655bd19244c70f3&imgtype=0&src=http%3A%2F%2Fimg01.taopic.com%2F160519%2F240499-16051ZQA435.jpg",
                    "titelImage1": "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1509364900025&di=b6f3770cbb0473b81d3d6d47a7e7c214&imgtype=0&src=http%3A%2F%2Fpic.qiantucdn.com%2F58pic%2F22%2F72%2F55%2F57c7a801ccf2e_1024.jpg",
                },
                
            ],
            header:'商品详情',
            data:''
        }
    },
    components: {
        "header-item": Header,
    },
    created(){
        
        document.body.scrollTop = 0
        document.documentElement.scrollTop = 0
        this.imgUrl = this.$httpUrl.imgUrls
        this.$axios.post(this.$httpUrl.detail,$.param({ goodsId:this.$route.query.id }))
        .then(response => {
            // console.log(response.data)
            if (response.data.code == 200) {
                this.data = response.data.data
                this.$store.commit('html',this.data.description)
                // console.log(data.notice.split('↵'))
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
        gouMai(){
            var order = {
                    shopId:this.data.shopId, address:'', discount:0, orderMoney:this.data.nowPrice,
                    recieveMan:'', recievePhone:'', remark:'',
                    orderGoods:[{
                        goodsId:this.data.id, goodsName:this.data.goodsName, goodsNum:1,
                        nowPrice:this.data.nowPrice, oldPrice:this.data.marketPrice,thumbPic:this.data.coverPic
                    }]
                }
            this.$storage.setStore('goods1', order)
            this.$router.push({path:'Buy1',query:{img:this.data.coverPic,isDiscount:this.data.isDiscount}})
        },
        gouwuche(){
            // console.log(this.$route.query.id)
            this.$axios.post(this.$httpUrl.insertGoods,$.param({access_type:'WXH5', wxh: this.$storage.getStore('wx'), openId:this.$storage.getStore('openIds'), goodsid:this.$route.query.id ,amount:1}))
            .then(response => {
                // console.log(response.data)
                if (response.data.code == 200) {
                    this.$vux.toast.show({
                        text: '添加成功'
                    })
                    setTimeout(() => {
                        this.$vux.toast.hide()
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
<style scoped>
@import '../../assets/vux.1.css';
.home{
    font-size: 4vw; padding-bottom: 13vw;
}
#jianjies{
    width: 100%;
}
#jianjies img{
    max-width: 90vw!important;
}
/*顶部*/
.fa-angle-left{
    position: absolute; top: 3vw; left: 5vw; font-size: 10vw; color: white;
}


.shangtu1{
    width: 100%; height: 50vw; background-size: 100% 100%; background-repeat: no-repeat;
    color: white; text-align: right; padding-top: 40vw; font-size: 4.5vw;
}
.shangtu{
    width: 100%; height: 45vw; background-size: 100% 100%; background-repeat: no-repeat;
    color: black; padding-left: 5vw;
}
.shangtu>div{
    width: 100%; height: 10vw; font-size: 4vw;
}
.shangtu>div:nth-child(1){
    width: 100%; height: 10vw; margin-top: 5vw; text-align: left; font-size: 5vw; font-weight: 600;
}
.shangtu>div:nth-child(2)>span:nth-child(1){
    color: red; font-weight: 600; font-size: 5vw;
}
.shangtu>div:nth-child(2)>span:nth-child(2){
    margin-left: 4vw; color: gray
}
.shangtu>div:nth-child(3)>span,.shangtu>div:nth-child(4)>span{
    margin-left: 3vw; color: gray; position: relative; top: 0.5vw;
}
.shangtu>div:nth-child(4){
    margin-top: 2vw;
}
.shangtu img{
    width: 5vw; height: 6vw;
}
#xian{
    background-color: gray; display: inline-block; width: 4vw; height: 0.3vw;
    margin-left: -6.5vw; position: relative; top: -1vw;
}

#kucun{ 
    float: right; color: gray; margin-right: 5vw;
}


.jianjie{
    width: 100%; padding: 0 5vw;
}
/*.jianjie>div:nth-child(2n-1){
    width: 100%; height: 50vw; margin: 3vw 0;
    background-size: 100% 100%; background-repeat: no-repeat;
}*/


.xuzhi{
    width: 100%; font-size: 4.5vw; margin-top: 10vw; padding: 0 5vw;
}
.xuzhi ul{
    list-style-type: decimal; font-size: 4vw;
}
.xuzhi h4{
    margin-left: 0vw;
}


.dian{
    width: 100%; text-align: center; line-height: 13vw; font-size: 4.5vw;
    position: fixed; bottom: 0;
}
.shop{
    width: 20%; height: 13vw; float: left; background-color: white;
}
a{
    color: #24cc62; color: gray
}
.icon{
    font-size: 8vw;
}
.btn1{
    background-color: #ffce42; color: red;
    width: 40%; height: 13vw; float: left;
}
.btn2{
    background-color: red; color: white;
    width: 40%; height: 13vw; float: left;
}

#pres{
    background-color: white; border: 0; font-size: 4vw; 
    white-space: pre-wrap; /*css-3*/ 
    white-space: -moz-pre-wrap; /*Mozilla,since1999*/ 
    white-space: -pre-wrap; /*Opera4-6*/ 
    white-space: -o-pre-wrap; /*Opera7*/ 
    word-wrap: break-word; /*InternetExplorer5.5+*/ 
}
</style>


