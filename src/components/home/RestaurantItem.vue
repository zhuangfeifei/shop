<template>
    <div class="home">
		<header-item :headers="header"></header-item>

        <!--<div class="shangtu1" :style="{backgroundImage: 'url(' + imgUrl + data.coverPic + ')'}">
            <div class="shangtu" :style="{backgroundImage: 'url(' + mai[0].titelImages + ')'}">
                <div>{{data.shopName}}</div>
                <div @click="ditu">
                    <img src="../../assets/img/home/icon_dingwei_@2x.png"><span id="address">{{data.address}}</span><span>{{data.categoryName}}</span>
                </div>
                <div>
                    <img src="../../assets/img/home/时间(1)@2x.png">
                    <span>{{data.startTime}} - {{data.endTime}}</span>
                    <div>
                        <img src="../../assets/img/home/电话(2)@2x.png">
                        <span v-if="data.telephone != ''"><a :href='"tel:" + data.telephone'>&nbsp;预约电话</a></span>
                        <span v-if="data.telephone == ''"><a :href='"tel:" + data.phone'>&nbsp;预约电话</a></span>
                    </div>
                </div>
                <i @click="history" class="fa fa-angle-left" aria-hidden="true"></i>
            </div>
        </div>-->
        <div class="shop_details">
            <div><h3>{{data.shopName}}</h3><span>{{data.categoryName}}</span></div>
            <div :style="{backgroundImage: 'url(' + imgUrl + data.coverPic + ')'}"></div>
            <div class="shop_address">
                <img :src="imgUrl + data.logo" alt="">
                <p>营业时间【{{data.startTime}} - {{data.endTime}}】</p>
                <p @click="ditu"><img src="../../assets/img/home/address@2x.png">{{data.address}}</p>
            </div>
        </div>
        <div class="jianjie">
            <h4>店铺特色</h4>
            <!--<div class="ht"></div>-->
            <div class="ht" v-html="this.$store.state.html"></div>
        </div>

    <div class="beijing">
        <p>优惠信息</p>
        <div class="taocan">
            <div class="taocan2">
                <div><img src="../../assets/img/home/daijinquan@2x.png"><span id="dai">代金券</span></div>
                <!--<div><span>每满100减30元</span></div>
                <div><span>有效期：2017.8.1-2017.9.22</span><span>已售330 ></span></div>-->
            </div>
            <div id="taocan3"><img src="../../assets/img/home/youtuitaocan@2x.png"><span>优惠套餐</span></div>
            <div class="taocan1" @click="cai(index)" v-for="(item,index) in goods" :key="index">
                <div :style="{backgroundImage: 'url(' + imgUrl + item.thumbPic + ')'}"></div>
                <div>
                    <div>{{item.goodsName}}</div>
                    <div><span>&nbsp;</span><span>已售{{item.saleNum}} ></span></div>
                    <p><span>￥{{item.nowPrice}}</span><span>￥{{item.marketPrice}}</span><span id="xian"></span></p>
                </div>
            </div>
            <div v-show="goods.length > 0" @click="zhankai" class="zhankai">展开全部<img src="../../assets/img/home/矩形16@2x.png"></div>
        </div>
        <!--<div class="pluan"><span>热门评论</span>    </div>-->
        <div v-if="pinlun.length > 0" class="pinluan2">
            <div class="pinluan" @click="plxiangqing(indexs)" v-for="(item,indexs) in pinlun" :key="indexs">
                <div>
                    <div :style="{backgroundImage: 'url(' + item.avatar + ')'}"></div>
                    <div></div>
                </div>
                <div class="pinluan1">
                    <div><span>{{item.customername}}</span><span>LV.1</span><span>{{item.operatime.substring(5,10)}}</span><i class="fa fa-clock-o" aria-hidden="true"></i></div>
                    <div class="xing">
                        <img v-for="(a,index) in item.stars" :key="index" src="../../assets/img/home/wujiaoxing1@2x.png" alt="">
                        <img v-for="(b,index) in 5 - item.stars" :key="index" src="../../assets/img/home/wujiaoxing2@2x.png" alt="">
                    </div>
                    <div>{{item.comment}}</div>
                    <div>
                        <div v-show="item.pictures.length > 0" v-for="(itemsss,indexsss) in item.pictures.split(';')" :key="indexsss" :style="{backgroundImage: 'url(' + imgUrls + itemsss + ')'}"></div>
                    </div>
                    <div>
                        <i class="fa fa-heart" @click="zan(indexs)" :class="{reds:item.isthumb > 0}" aria-hidden="true"><span>{{item.thumbs}}</span></i>
                        <i class="fa fa-commenting" @click="hui(indexs)" aria-hidden="true"><span>{{item.data.length}}</span></i>
                    </div>
                    <div id="huifu">
                        <div v-for="(item1,index) in item.data" :key="index">
                            <div class="hui">{{item1.customername}}：{{item1.comment}}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    </div>


        <div class="maidans">
            <a v-if="data.telephone != ''" :href='"tel:" + data.telephone'>
            <div>
                <img src="../../assets/img/home/phone@2x.png" alt=""><br>
                <span>预约电话</span>
            </div>
            </a>
            <a v-if="data.telephone == ''" :href='"tel:" + data.phone'>
            <div>
                <img src="../../assets/img/home/phone@2x.png" alt=""><br>
                <span>预约电话</span>
            </div>
            </a>
            <button @click="maidan" type="button" class="btn">我要买单</button>
        </div>

        
        <van-popup v-model="isHui" position="bottom" :overlay="false">
            <div id="liuyan">
                <span id="fasong" @click="faSong">发送</span>
                <div class="shuru">
                    <input name="" id="text" autofocus maxlength="50" onchange="this.value=this.value.substring(0, 50)" 
                    onkeydown="this.value=this.value.substring(0, 50)" onkeyup="this.value=this.value.substring(0, 50)" 
                    placeholder="......">
                </div>
            </div>
        </van-popup>
    </div>
</template>
<script>
import Header from "./Header"
import { Rater } from 'vux'
import { TransferDom, Actionsheet, Group, XSwitch } from 'vux'
import { Toast } from 'vant'
export default {
    data(){
        return{
            mai:[
                {
                    "titelImage": "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1509364900025&di=b6f3770cbb0473b81d3d6d47a7e7c214&imgtype=0&src=http%3A%2F%2Fpic.qiantucdn.com%2F58pic%2F22%2F72%2F55%2F57c7a801ccf2e_1024.jpg",
                    "titelImages": require("../../assets/img/home/shangtu.png"),
                },
                
            ],
            header:'商店详情',
            data:'',number:4,goods:'',isShow:false,pinlun:'',pinlunXiangqong:'',isHui:false,pid:0,id:0,is:true,imgUrl:'',imgUrls:'',
            show1:false,zans:'',current:1,limit:2,
            menus1: {
                menu1: 'Share to friends',
                menu2: 'Share to timeline'
            },
        }
    },
    directives: {
    TransferDom
  },
    components: {
        "header-item": Header,
        Rater,
        Actionsheet,
    Group,
    XSwitch,
    Toast
    },
    created(){
        this.$vux.loading.show({
            text: '正在加载'
        })
        document.body.scrollTop = 0
        document.documentElement.scrollTop = 0
// console.log(this.$store.state.html)

        this.imgUrl = this.$httpUrl.imgUrls
        this.imgUrls = this.$httpUrl.imgUrls1
        
        this.shangdian()

        this.caidan()

        this.huifushuaxin()

        $(document).ready(()=>{
            $("#name").bind("click",
                function() {
                    $("#name")[0].focus();
                });
            // $('.ht').html(this.$store.state.html)

        })
        
    },
    methods:{
        history() {
            history.go(-1)
        },
        ditu(){
            var address = $('#address').text()
            // window.location.href = 'https://uri.amap.com/navigation?from=&to=120.636794,31.365654&mode=walk&policy=1&src=mypage&coordinate=gaode&callnative=0'
            window.location.href = 'https://uri.amap.com/navigation?from=&to='+this.data.lng+','+this.data.lat+','+address+'&mode=walk&policy=1&src=mypage&coordinate=gaode&callnative=0'
            // window.location.href = 'https://m.amap.com/navi/?start=&dest='+this.data.lng+','+this.data.lat+'&destName='+address+'&key=7e77988ab7c3c95989e653a380fe86a8'
        },
        maidan(){
            this.$router.push({path:'Placeorder',query:{shopids:this.data.id}})
            // window.location.href = this.$httpUrl.build + '/puman/wx/phone/buypay?wxh='+this.$storage.getStore('wx')+'&openId='+this.$storage.getStore('openIds')+'&shopid='+this.data.id
        },
        cai(index){
            this.$router.push({path:'Details',query:{id:this.goods[index].id,address:this.data.address,phone:this.data.phone,fenlei:this.data.categoryName}})
            this.$store.commit('coverPics',this.data.coverPic)
            this.$store.commit('shopnames',this.data.shopName)
        },
        shangdian(){
            this.$axios.post(this.$httpUrl.shopDetail,$.param({shopId:this.$storage.getStore('shopids')}))
            .then(response => {
                this.$vux.loading.hide()
                // console.log(response.data)
                if (response.data.code == 200) {
                    this.data = response.data.data
                    this.$store.commit('html',this.data.description)
                } else {
                    Toast.fail(response.data.message)
                }
            })
            .catch(error => {
                // console.log(error)
                Toast.fail('服务器异常')
            })
        },
        plxiangqing(indexs){
            this.$axios.post(this.$httpUrl.getCommentContens,$.param({access_type:'WXH5', wxh: this.$storage.getStore('wx'), openId:this.$storage.getStore('openIds'), commentid:this.pinlun[indexs].id}))
            .then(response => {
                this.$vux.loading.hide()
                // console.log(response.data)
                if (response.data.code == 200) {
                    this.pinlunXiangqong = response.data.data
                } else {
                    Toast.fail(response.data.message)
                }
            })
            .catch(error => {
                // console.log(error)
                Toast.fail('服务器异常')
            })
        },
        caidan(){
            this.$axios.post(this.$httpUrl.list,$.param({shopId:this.$storage.getStore('shopids'),limit:this.limit,current:'1'}))
            .then(response => {
                // console.log(response.data)
                if (response.data.code == 200) {
                    this.goods = response.data.data
                } else {
                    Toast.fail(response.data.message)
                }
            })
            .catch(error => {
                // console.log(error)
                Toast.fail('服务器异常')
            })
        },
        zan(indexs){
            if(this.pinlun[indexs].isthumb == 0){
                this.$axios.post(this.$httpUrl.thumb,$.param({ access_type:'WXH5', wxh: this.$storage.getStore('wx'), openId:this.$storage.getStore('openIds'), commentid:this.pinlun[indexs].id}))
                .then(response => {
                    // console.log(response.data)
                    if(response.data.code == 200){
                        $('.pinluan2>div:nth-child('+(indexs + 1)+') .fa-heart').css('color','red')
                        // this.zans = indexs
                        this.pinlun[indexs].isthumb = 1
                        this.pinlun[indexs].thumbs += 1
                    } else {
                        Toast.fail(response.data.message)
                    }
                })
                .catch(error => {
                    // console.log(error)
                    Toast.fail('服务器异常')
                })
            }
        },
        zhankai(){
            this.current ++
            this.$axios.post(this.$httpUrl.list,$.param({shopId:this.$storage.getStore('shopids'),limit:this.limit,current:this.current}))
            .then(response => {
                // console.log(response.data)
                if (response.data.code == 200) {
                    this.goods = this.goods.concat(response.data.data)
                } else {
                    Toast.fail(response.data.message)
                }
            })
            .catch(error => {
                // console.log(error)
                Toast.fail('服务器异常')
            })
        },
        hui(indexs){
            this.id = indexs
            this.isHui = !this.isHui
            this.pid = this.pinlun[indexs].id
            // console.log(this.pid)
        },
        faSong(){
            var text = $('#text').val()
            this.$axios.post(this.$httpUrl.insertRely,$.param({ access_type:'WXH5', wxh: this.$storage.getStore('wx'), openId:this.$storage.getStore('openIds'), shopid:this.$storage.getStore('shopids'), comment:text, pid:this.pid }))
            .then(response => {
                // console.log(response.data)
                if(response.data.code == 200){
                    this.hui(this.id)
                    this.huifushuaxin()
                    this.$vux.toast.show({
                        text: response.data.message
                    })
                    setTimeout(() => {
                        this.$vux.toast.hide()
                    }, 3000)
                } else {
                    Toast.fail(response.data.message)
                }
            })
            .catch(error => {
                // console.log(error)
                Toast.fail('服务器异常')
            })
        },
        huifushuaxin(){
            this.$axios.post(this.$httpUrl.getByShopid,$.param({ access_type:'WXH5', wxh: this.$storage.getStore('wx'), openId:this.$storage.getStore('openIds'), shopid:this.$storage.getStore('shopids'), limit:'20',current:'1' }))
            .then(response => {
                // console.log(response.data)
                if (response.data.code == 200) {
                    this.pinlun = response.data.data.reverse()
                    $(document).ready(()=>{
                        for(var i =0; i < this.pinlun.length; i ++){
                            var gao = $('.pinluan2>div:nth-child('+(i+1)+')').height()
                            // console.log(gao)
                            $('.pinluan2>div:nth-child('+(i+1)+')>div:nth-child(1)>div:nth-child(2)').css('height',''+(gao * 0.15)+'vw')
                        }
                    })
                } else {
                    Toast.fail(response.data.message)
                }
            })
            .catch(error => {
                // console.log(error)
                Toast.fail('服务器异常')
            })
        },
    }
}
</script>
<style lang="less" scoped>
@import '../../assets/vux.1.css';
.home{
    font-size: 4vw; width: 100%; padding-bottom: 10vw; padding-top: 15vw;
}



/*顶部*/
 
.fa-angle-left{
    position: absolute; top: 3vw; left: 5vw; font-size: 10vw;
}

.reds{
    color: red!important;
}


.shop_details{
    width: 90%; margin: 0 auto; text-align: center; font-size: 4vw; padding-top: 3vw;
}
.shop_details>div:nth-child(1)>span{
    width: 100%; color: gray;
}
.shop_details>div:nth-child(2){
    width: 100%; height: 40vh; border-radius: 1.5vw; background-repeat: no-repeat;
    background-size: 100% 100%; margin: 4vw 0;
}
.shop_address{
    width: 100%; padding-top: 1vw; margin-top: 6vw; padding-bottom: 3vw;
    background: url('../../assets/img/home/kuang1@2x.png') no-repeat; background-size: 100% 100%;
}
.shop_address>img{
    width: 14vw; height: 14vw; border-radius: 50%; margin-bottom: 3vw;
}
.shop_address>p>img{
    width: 4vw; height: 5vw; margin-right: 1vw; margin-top: -1vw;
}
.shop_address>p:nth-child(3){
    color: #ea9518;
}




h4{
    font-weight: 600;
}
.jianjie{
    width: 100%; padding: 5vw 5vw 0 5vw; text-align: center;
}


.beijing{
    width: 100%; background-color: black; padding: 5vw 5vw 15vw 5vw;
    p{
        color: #a6a6a6; margin-top: 3vw; font-size: 4vw;
    }
}


.taocan{
    width: 100%; padding: 5vw; position: relative; background-color: white;
}
.taocan2 span{
    margin-left: 6vw;
}
#taocan3 span,#dai{
    margin-left: 2vw;
}
.icon-youhuiquan2{
    color: #dd8910; font-size: 5vw;
}

.taocan2{
    width: 100%; height: 23vw!important;
    img{
        width: 5vw; height: 5vw;
    }
}
.taocan2>div:nth-child(1){
    font-size: 4.5vw; font-weight: 600;
}
.taocan2>div:nth-child(3){
    display: flex; justify-content: space-between; padding-right: 1.5vw;
}
.taocan2>div:nth-child(3)>span{
    color: gray; font-size: 3.5vw;
}
.taocan>div{
    width: 100%; border-bottom: 0.3vw solid gainsboro; padding-top: 2vw;
}
.taocan1{
    width: 100%; height: 26.5vw;
}
.taocan1>div:nth-child(1),.taocan1>div:nth-child(2){
    float: left; margin-top: 1vw;
}
.taocan1>div:nth-child(1){
    width: 25vw; height: 20vw;
    background-size: 100% 100%; background-repeat: no-repeat;
}
/*.taocan1>div:nth-child(1){
    font-size: 4.5vw; font-weight: 600; margin-bottom: 2vw;
}*/
.taocan1>div:nth-child(2){
    padding-left: 3vw; width: 53vw;
}
.taocan1>div:nth-child(2)>div:nth-child(1){
    font-weight: 600; font-size: 4.3vw;
}
.taocan1>div:nth-child(2)>div:nth-child(2)>span:nth-child(2){
    float: right; color: gray;
}
.taocan1>div:nth-child(2)>p{
    color: red;
}
.taocan1>div:nth-child(2)>p>span:nth-child(2){
    margin-left: 3vw; color: gray; font-size: 3.3vw;
}
#xian{
    background-color: gray; display: inline-block; width: 3vw; height: 0.2vw; margin-left: -6.5vw; position: relative; top: -1.002vw;
}
#taocan3{
    width: 100%; height: 10vw; font-size: 4.5vw; font-weight: 600; border: none;
    img{
        width: 5vw; height: 5vw;
    }
}


.zhankai{
    width: 100%; height: 8vw; border: none!important; text-align: center; font-size: 4.3vw; line-height: 8vw;
}
.zhankai img{
    width: 3vw; height: 2vw; margin-left: 2vw;
}


.pluan{
    text-align: center; font-size: 5vw; width: 100%; height: 3vw; background-color: #444444; margin-top: 5vw;
    position: relative; font-weight: 600; z-index: 10; margin-bottom: 5vw;
}
.pluan>span{
    display: inline-block; width: 36vw; height: 7vw; background-color: white; position: absolute; top: -2vw; left: 32vw;
}


.pinluan2{
    width: 100%; padding-bottom: 15vw; overflow: hidden; background-color: white; margin-top: 3.5vw;
}
.pinluan{
    width: 90%; margin-left: 5vw; clear: both; border-bottom: 0.3vw solid gainsboro; overflow: hidden;
}
.pinluan>div:nth-child(1){
    width: 15vw; height: 100%; float: left; margin-top: 3vw;
}
.pinluan>div:nth-child(1)>div:nth-child(1){
    width: 15vw; height: 15vw; border-radius: 50%; margin: 0vw auto;
    background-size: 100% 100%; background-repeat: no-repeat;
}
/*.pinluan>div:nth-child(1)>div:nth-child(2){
    width: 1vw; height: 60%; margin: 0vw auto;
    background: -webkit-linear-gradient(#fecc85, white);
}*/
.pinluan1{
    width: 59vw; height: 100%; float: left; margin-left: 5vw; margin-top: 5vw; margin-bottom: 2vw;
}
.pinluan1>div:nth-child(1){
    width: 100%; height: 6vw;
}
.pinluan1>div:nth-child(4)>div{
    width: 18vw; height: 17vw; margin-top: 2vw;
    background-size: 100% 100%; background-repeat: no-repeat;
}
.pinluan1>div:nth-child(4){
    display: flex;justify-content: space-between;
}
.pinluan1>div:nth-child(5){
    clear: both; color: black; float: right; margin-top: 3vw;
}
.pinluan1>div:nth-child(1)>span:nth-child(1){
    font-size: 4vw; font-weight: 600;
}
.pinluan1>div:nth-child(1)>span:nth-child(2){
    display: inline-block; font-size: 3vw; color: white; background-color: #f3a73a;
    margin-left: 2vw; width: 10vw; height: 4vw; line-height: 5vw; text-align: center; margin-top: -5vw!important;
}
.pinluan1>div:nth-child(1)>span:nth-child(3){
    float: right;
}



.fa-clock-o{
    float: right; font-size: 4vw; line-height: 5.6vw; margin-right: 2vw;
}
.fa-heart{
    color: gray; font-size: 6vw; margin-top: -2vw; height: 10vw;
}
.fa-commenting{
    color: gray; font-size: 6vw; margin-top: -2vw; height: 10vw;
}
.fa-heart>span,.fa-commenting>span{
    color: black; font-size: 4vw;
}


.xing{
    width: 100%; height: 6vw; line-height: 3vw;
}
.xing img{
    width: 4vw; height: 4vw; margin-left: 1vw; 
}


#huifu{
    width: 100%; background-color: gainsboro; margin-top: 10vw; word-wrap: break-word;
}
.hui{
    width: 100%; font-size: 3.6vw; margin: 1vw; line-height: 6vw;
}

#liuyan{
    width: 100%; height: 11.5vw; border-top: 0.3vw solid gainsboro; background-color: white;
    color: gray; padding: 1vw; z-index: 10000;
}
.shuru{
    width: 85%; height: 9vw; border: 0.3vw solid gainsboro; border-radius: 1vw; margin-left: 1vw; z-index: 10000;
}
#text{
    width: 80%; height: 9vw; outline: none; background:none; line-height: 5vw; border: none;
}
#liuyan>span:nth-child(1){
    float: right; color: #23af22; line-height: 10vw; margin-right: 2vw; 
}
input::-moz-placeholder{
    color: gray;
}
input::-webkit-input-placeholder{
    color: gray;
}


.maidans{
    width: 100%; height: 20vw; display: flex; justify-content: space-around; text-align: center; font-size: 3.5vw;
    position: fixed; bottom: 0; z-index: 1000; background-color: white;
    div{
        border-right: 1px solid gainsboro; padding-right: 6vw; padding-top: 2vw;
    }
    img{
        width: 10vw; height: 10vw; margin-bottom: 2vw;
    }
    a{
        color: black;
    }
}
.btn{
    background-color: red; color: white; outline: none!important;
    width: 50%; height: 13vw; font-size: 4.5vw; position: relative; top: 3vw; left: -3vw;
}

a{
    color: white;
}

.van-popup--bottom{
    height: 11.5vw;
}
</style>


