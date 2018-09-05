<template>
    <div class="homes">
		<div class="daohang">
            <!--<header>
                <img src="../../assets/img/home/sousuo.png" alt="">
                <div>
                    <span>PUMAN</span> <span @click="opstion">苏州</span> 
                    <img @click="opstion" class="dingwei" src="../../assets/img/home/dinwei.png" alt="">
                </div>
                <router-link to="/Shoppingcart">
                    <img src="../../assets/img/home/shop.png" alt="">
                </router-link>
            </header>-->
            
            
            <div class="imgss">
                <div class="lunbos">
                    <!--<swiper ref="mySwiper">
                        <swiper-slide v-for="(image, index) in data" :key="index">
                            <a :href="image.url">
                                <img class="imgs" :src="imgUrl +image.picture" />
                            </a>
                        </swiper-slide>
                    </swiper>-->
                    <van-swipe :autoplay="3000" class="ban">
                        <van-swipe-item v-for="(image, index) in data" :key="index">
                            <img class="los" :src="imgUrl +image.picture" />
                        </van-swipe-item>
                    </van-swipe>
                </div>
            </div>

        </div>
        <div class="zhuti">
            
            <div class="shop_fengleis">
                <van-swipe id="shop_fenglei">
                    <van-swipe-item class="zileis" v-for="(items, indexs) in fenleis" :key="indexs">
                        <div class="zilei" @click="Fenlei(index)" v-for="(item,index) in items" :key="index">
                            <div><img v-lazy="imgUrl + item.tinyPic" alt=""></div>
                            <span>{{item.categoryName}}</span>
                        </div>
                    </van-swipe-item>
                </van-swipe>
            </div>

            
            <div class="shop_toutiao" @click="tu">
                <!--<van-notice-bar class="toutiaos" background="white" :speed="80">全新铺满商城  期待您的光临！</van-notice-bar>-->
                <van-notice-bar v-if="allNotice" class="toutiaos" background="white" :speed="80">{{allNotice}}</van-notice-bar>
                <van-notice-bar v-else class="toutiaos" background="white" :speed="80">全新铺满商城  期待您的光临！</van-notice-bar>
                <img src="../../assets/img/home/商城radio@2x.png" alt="">
                <!--<span>全新铺满商城  期待您的光临！</span>-->
            </div>

            <a href="http://h5.yfcanshi.com/home"><img id="yfcanshi" src="../../assets/img/home/Life.png" alt=""></a>

            <router-link to="/game"><img id="kupao" src="../../assets/img/home/小兔快跑2@2x.png" alt=""></router-link>

            <div class="vip">
                <div class="vip_top"><img src="../../assets/img/home/黄线@2x.png" alt=""><span>会员专享</span><p>尽享贴心特权服务</p></div>
                <div class="vip_name">
                    <p>会员专区  特权享不停</p>
                    <van-swipe id="shop_vip">
                        <van-swipe-item class="shops" v-for="(items, indexs) in list" :key="indexs">
                            <div class="shops_item" v-for="(item,index) in items.a" :key="index">
                                <router-link :to="{path:'Nian',query:{name:item.name,shop:item.shop}}">
                                    <div><img  v-lazy="item.img" alt=""><p class="item_name">{{item.shop}}</p></div>
                                </router-link>
                            </div>
                        </van-swipe-item>
                    </van-swipe>
                    <!--<div class="vip_names">
                        <div v-for="(item,index) in list" :key="index">
                            <router-link :to="{path:'Nian',query:{name:item.name,shop:item.shop}}">
                                <img v-lazy="item.img" alt="">
                            </router-link>
                        </div>
                        
                    </div>-->
                </div>
                <div class="vip_top1"><img src="../../assets/img/home/黄线@2x.png" alt=""><span>精选品牌</span><p>随时随地&nbsp;&nbsp;  想购就GO</p></div>
                <div class="Selected">
                    <p>精品商店   一手掌握</p>
                    <div v-for="(item,index) in datanew" :key="index">
                        <img @click="Jingxuan(index)" v-lazy="imgUrl + item.cover" >
                        <p>{{item.SHOP_NAME}}</p>
                    </div>
                </div>
            </div>


        </div>

            
    </div>
</template>
<script>
import { swiper, swiperSlide } from 'vue-awesome-swiper'
import { Loading } from 'vux'
export default {
    data(){
        return{
            imgUrl:'',data:'',datanew:'',fenleis:'',currents:1,limit:100,loading:false,dibu:1,allNotice:'',
            active: 0,time:['00','00','00'],timeInterval:'',
            back:[
                require('../../assets/img/home/kuang1.png'),require('../../assets/img/home/kuang2.png'),
                require('../../assets/img/home/kuang3.png'),require('../../assets/img/home/kuang5.png'),
                require('../../assets/img/home/kuang4.png')
            ],
            list:[
                {a:[{name:'vip_name4',shop:'苏桃李音乐酒馆',img:require('../../assets/img/home/vip_name4.png'),},
                    {name:'vip_name1',shop:'苏浙徽农家大院',img:require('../../assets/img/home/vip_name1.png')},
                    {name:'vip_name5',shop:'英派斯健身',img:require('../../assets/img/home/vip_name5.png')},
                    {name:'vip_name9',shop:'江南正一堂',img:require('../../assets/img/home/vip_name9.png')},
                    // {name:'vip_name6',shop:'福田家国际月子会所',img:require('../../assets/img/home/vip_name6.png')},
                    {name:'vip_name7',shop:'瑶池丽水温泉会馆',img:require('../../assets/img/home/vip_name7.png')},
                    {name:'vip_name8',shop:'肯幸顿酒庄',img:require('../../assets/img/home/vip_name8.png')}
                ]},
                {a:[
                    {name:'vip_name10',shop:'老妈米线',img:require('../../assets/img/home/vip_name10.png')},
                    {name:'vip_name11',shop:'5D光影涮烤吧',img:require('../../assets/img/home/vip_name11.png')},
                    {name:'vip_name12',shop:'迈家众创',img:require('../../assets/img/home/vip_name12.png')},
                ]}
            ],
            xuehua:'',qwe:0,
            // swiperOption: {//以下配置不懂的，可以去swiper官网看api，链接http://www.swiper.com.cn/api/
            //     autoplay:true,
            //     speed:300,
            //     autoplayDisableOnInteraction : false,
            //     disableOnInteraction:false,
            //     loop:true,
            //     loopAdditionalSlides:1, //循环
            //     // centeredSlides : true,
            //     slidesPerView:2,
            //     pagination : '.swiper-pagination',
            //     paginationClickable:true,
            //     prevButton:'.swiper-button-prev',
            //     nextButton:'.swiper-button-next',
            //     onInit:function(swiper){
            //         swiper.slides[2].className="swiper-slide swiper-slide-active";//第一次打开不要动画
            //     },
            //     breakpoints: {
            //         400: {
            //             slidesPerView: 1,
            //         }
            //     }
            // } 
        }
    },
    components: {
        swiper,
    swiperSlide
    },
    mounted(){
        
        document.body.scrollTop = 0
        document.documentElement.scrollTop = 0

        if(!window.localStorage){
            alert("浏览器不支持localstorage")
            return false
        }

        $(document).ready(() => {
            $('.carousel').carousel({
                interval: 2000
            })
            var $carousels = $('.carousel')
            var startX, endX
            var offset = 50
            $carousels.on('touchstart', function(e) {
                startX = e.originalEvent.touches[0].clientX
            })
            $carousels.on('touchmove', function(e) {
                endX = e.originalEvent.touches[0].clientX
            })
            $carousels.on('touchend', function(e) {
                var distance = Math.abs(startX - endX)
                if (distance > offset) {
                    $(this).carousel(startX > endX ? 'next' : 'prev')
                }
            })
        })

        
        

        this.imgUrl = this.$httpUrl.imgUrls
        
        this.lunbo()
        
        this.$axios.post(this.$httpUrl.adsense,$.param({ limit:this.limit,current:this.currents }))
        .then(response => {
            // console.log(response.data)
            if(response.data.code == 200){
                
                // this.datanew = bubbleSort(response.data.data)
                this.datanew = response.data.data
                // this.datanew.push(response.data.data[0])
                // console.log(bubbleSort(response.data.data))
                $(document).ready(()=>{
                    var kuandu = 30
                    $('.Selected').css('height',''+(kuandu * Math.ceil(response.data.data.length / 3) + 5)+'vw')
                })
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
        this.$axios.post(this.$httpUrl.allIsNotRead)
        .then(response => {
            // console.log(response.data)
            if(response.data.code == 200){
                if(response.data.data.length > 0) this.allNotice = response.data.data[0].CONTENT
                // this.$store.commit('notices',response.data.data)
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

        this.fenclass()
        this.$store.getters.count
        
        
        
    },
    computed:{
        a(){
            return this.$store.state.asd
        }
    },
    methods:{
        tu(){
            this.$router.push({path:'/Notice',query:{allNotice:this.allNotice}})
        },
        qwes(){
        },
        opstion(){
            this.$router.push({path:'Position'})
        },
        Fenlei(index){
            this.$router.push({path:'Classification',query:{id:this.fenleis[0][index].id}})
        },
        Jingxuan(index){
            // console.log(index,'12313')
            this.$router.push({path:'Restaurant'})
            this.$store.commit('shopids',this.datanew[index].shopid)
            this.$storage.setStore('shopids',this.datanew[index].shopid)
        },
        lunbo(){
            this.$axios.post(this.$httpUrl.carousel)
            .then(response => {
                // console.log(response.data)
                if(response.data.code == 200){
                    var list = response.data.data
                    function compare(property){
                        return function(a,b){
                            var value1 = a[property]
                            var value2 = b[property]
                            return value1 - value2;
                        }
                    }
                    var s = list.sort(compare('step'))
                    var b = s
                    // b.push(s[0])
                    // console.log(b)
                    this.data = b
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
        ShowCountDown(year, month, day, hour, minute, second) {
            var now = new Date();
            var endDate = new Date(year, month - 1, day, hour, minute, second);
            var leftTime = endDate.getTime() - now.getTime();
            var leftsecond = parseInt(leftTime / 1000);
            // var day1=parseInt(leftsecond/(24*60*60*6)); 
            var day1 = Math.floor(leftsecond / (60 * 60 * 24));
            var hour = Math.floor((leftsecond - day1 * 24 * 60 * 60) / 3600);
            var minute = Math.floor((leftsecond - day1 * 24 * 60 * 60 - hour * 3600) / 60);
            var second = Math.floor(leftsecond - day1 * 24 * 60 * 60 - hour * 3600 - minute * 60);
            //var cc = document.getElementById('divdown1');
            // cc.innerHTML = "倒计时" + year + "年" + month + "月" + day + "日还有：" + day1 + "天" + hour + "小时" + minute + "分" + second + "秒";
                
            this.time = ( this.jialing(hour) + "," + this.jialing(minute) + "," + this.jialing(second) ).split(',');
        },
        jialing(times) {
            if (times < 10) {
                return String(String(0) + String(times))
            } else {
                return times
            }
        },
        fenclass(){
            this.$axios.post(this.$httpUrl.calssfiy)
            .then(response => {
                // console.log(response.data)
                if(response.data.code == 200){
                    var data = response.data.data
                    $(document).ready(()=>{
                        var kuandu = 25
                        $('.zilei').css('width',''+kuandu+'vw')
                        $('#fenlei').css('width',''+(kuandu * response.data.data.length)+'vw')
                    })
                    var result = [];
                    for(var i = 0; i < data.length; i += 8){
                        result.push(data.slice(i,i+8))
                    }
                    // console.log(result)
                    this.fenleis = result
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
        }
    }
    
}
</script>
<style lang="less" scoped>

@import '../../assets/vux.css';



.homes{
    padding-bottom: 20vw; background-color: white; font-size: 4vw; overflow-x: hidden;
}

.ban{
    width: 100%; height: 100%;
}
.los{
    width: 100%; height: 100%;
}

header{
    width: 100%; height: 15vw; font-size: 4.5vw;
    background-color: white; color: black;
    display: flex !important; align-items: center;
    justify-content: space-around;
    padding: 0 2vw;
    position: fixed;top: 0; z-index: 10000;
    img{
        width: 6vw; 
    }
    .dingwei{
        width: 4vw; height: 2.5vw; position: relative; top: -1vw
    }
    div{
        width: 60%; text-align: center; font-size: 4.3vw; letter-spacing: 0.3vw; color: #1A1A1A;
        span:nth-child(1){
            font-size: 6vw; font-weight: 600; margin: 0 0.5vw; color: black;
        }
        span:nth-child(2){
            position: relative; top: -0.5vw;
        }
    }
}


.icon-cart{
    font-size: 8vw;
}
a{
    color: white;
}


#loading{
    width: 100%; height: 10vw; text-align: center; line-height: 10vw; margin-top: 3vw; color: gray;
}
#loading img{
    width: 8vw; height: 8vw;
}




.daohang{
    width: 100%; height: 58vw; background-color: white;
}



#flame{
    width: 100vw; background-color: white;
    padding: 0 3vw!important;
    .banns{
        width: 100vw!important;
        padding-left: 1vw; padding-right: 1vw;
    }
}
.bann{
    width: 100%; text-align: center;
    // padding-right: 10vw;
    .imgs{
        width: 100%; height: 60vw; 
        border-radius: 3vw; 
        position: relative; left: 3vw;
    }
}


// .item>img{
//     width: 100vw!important; height: 60vw!important;
// }


.zhuti{
    width: 100%;
     /*background-color: white;*/
}
.zhuti1{
    overflow-x: auto; background-color: white;width: 100%;
}




/*分类*/
.fengleis{
    width: 100%; overflow-x: auto; background-color: white;
}
.fenglei{
    text-align: center; font-size: 4vw; padding: 4vw 0;
}
.fenglei>div{
    height: 23vw; margin-top: 2vw; font-size: 3.7vw; float: left;
}
.fenglei>div>div{
    width: 11vw; height: 11vw; margin: 0 auto;
}
.fenglei>div>div>img{
    width: 100%; height: 100%;
}
.fenglei>div>span{
    position: relative; bottom: -2vw; 
}



.shop_fengleis{
    width: 100%; background-color: white; padding-top: 4vw;
    #shop_fenglei{
        width: 100vw!important;
        .zileis{
            width: 110vw; padding-bottom: 5vw
        }
    }
    .zilei{
        width: 14vw; float: left; margin-top: 3vw; text-align: center; font-family: YouYuan;
        font-weight: Regular; font-weight: 600;
        img{
            width: 12vw; height: 12vw; margin-bottom: 3vw
        }
    }
}





.shop_toutiao{
    width: 100%; height: 15vw;background-color: white; position: relative; padding-right: 1.5vw;
    img{
        width: 28vw; height: 6vw; position: absolute; top: 3.5vw; left: 5vw;
    }
    .toutiaos{
        width: 100%; position: relative; top: 2vw; padding-left: 35vw; font-size: 4vw;
    }
}

#yfcanshi{
    width: 90%; height: 40vw; margin-top: 2vw; margin-left: 5%;
}
#kupao{
    width: 90%; height: 22vw; margin: 5vw 5%;
}

.vip{
    width: 100%; margin-top: 3vw;
    .vip_top,.vip_top1{
        width: 100%; text-align: center; line-height: 6vw; position: relative; letter-spacing: 1vw;
        color:rgba(75,75,75,1); font-family:PingFang-SC-Regular; font-size: 3.5vw;
        span{font-family:PingFang-SC-Bold; color:rgba(43,43,43,1); font-weight: Bold; font-size: 5vw; letter-spacing: 0.5vw;}
        img{
            width: 45%; height: 5vw; position: absolute; top: 0vw; left: 27.5%;
        }
    }
    .vip_name{
        width: 90%; margin: 5vw auto; border-radius:1.5vw; box-shadow:0px 0px 16px rgba(0,0,0,0.2); padding-top: 5vw; 
        p{font-family:PingFang-SC-Medium; font-weight: Medium; color:rgba(234,22,22,1); font-size: 4vw; line-height: 8vw; margin-left: 3%;}
        #shop_vip{
            width: 100%!important;
            .shops{
                width: 100%; padding-bottom: 5vw;
                .shops_item{
                    width: 29.35%!important; height: 38vw; float: left; margin-left: 3%;
                    img{
                        width: 100%; height: 100%;
                    }
                    .item_name{ color: black!important; line-height: 5vw; margin-top: 1vw; font-size: 3.5vw;}
                }
            }
        }
        // .vip_names{
        //     height: 50vw;
        //     div{
        //         width: 33vw; height: 100%; float: left; margin-left: 5vw;
        //         img{
        //             width: 100%; height: 100%;
        //         }
        //     } 
        // }
    }
    .vip_top1{ margin-top: 8vw;}
    .Selected{
        width: 90%; margin: 0 auto; border-radius:1.5vw; box-shadow:0px 0px 16px rgba(0,0,0,0.2); padding-top: 5vw; margin-top: 6vw;
        p{font-family:PingFang-SC-Bold; font-weight: Bold;white-space:nowrap; font-weight: Medium; color:rgba(26,26,26,1); line-height: 6vw; margin-left: 3%; margin-bottom: 0;}
        div{
            width: 30vw; height: 24vw; float: left; margin-top: 3vw; text-align: center; font-size: 3.5vw; overflow: hidden;
            img{
                width: 17vw; height: 17vw; border-radius: 50%;
            }
        }
    }
}







.foot{
    width: 100%; height: 95vw; padding-top: 8vw; margin-top: 3vw;
    background: url("../../assets/img/home/jingxuanpingpai1.png") no-repeat; background-size: 100% 100%;
}




@media screen and (orientation:portrait) {
    /*  css[竖向定义样式]  */
    .home{
        background-color: #f2f2f2;
    }
}

@media screen and (orientation:landscape) {
    /*   css[横向定义样式]  */   
    .home {
        /*background-color: red;*/
        /*background-image: url('../../assets/img/home/kuang1.png');*/
    }
}



/*------------------------------*/
.lunbos{
    width: 100%; height: 56vw; overflow: hidden; text-align: center;
}

// .swiper-container {
// 	width: 100%;
// }

// @media screen and (max-width: 375px) {
// 	.swiper-container {
//         padding: 0 18vw 0 14vw
// 	}
//     .swiper-container[data-v-61ec88a6]{
//         padding: 0 17vw 0 14vw
//     }
// }
// @media screen and (min-width: 376px) {
//     .lunbos{
//         width: 200%; height: 55vw; overflow: hidden; text-align: center; background-color: white; margin-left: -28vw;
//     }
// 	.swiper-container {
//         padding: 0 10vw 0 37.3vw
// 	}
//     .swiper-slide img {
//         width: 100%; height: 84vw!important; border-radius: 5vw;
//         display: block;
//     }
// }

// .swiper-slide { 
// 	-webkit-transition: transform 1.0s;
// 	-moz-transition: transform 1.0s;
// 	-ms-transition: transform 1.0s;
// 	-o-transition: transform 1.0s;
//     transition: transform 1.0s;
// 	-webkit-transform: scale(0.7);
//     -moz-transform: scale(0.7);
// 	-ms-transform: scale(0.7);
// 	-o-transform: scale(0.7);
// 	transform: scale(0.7);
// }

// .swiper-slide-active,.swiper-slide-duplicate-active {
// 	-webkit-transform: scale(1);
//     -moz-transform: scale(1);
// 	-ms-transform: scale(1);
// 	-o-transform: scale(1);
// 	transform: scale(1);
// }

// .none-effect { 
// 	-webkit-transition: none;
// 	-moz-transition: none;
// 	-ms-transition: none;
// 	-o-transition: none;
//     transition: none;
// }

// .swiper-slide img {
// 	width: 110%; height: 55vw!important; border-radius: 5vw;
// 	display: block;
// }
// .swiper-container[data-v-61ec88a6]{
//     left: 0; 
// }
</style>


