<template>
    <div class="homes">
		<div class="daohang">
            <header>
                <img src="../../assets/img/home/sousuo.png" alt="">
                <div>
                    <span>PUMAN</span> <span @click="opstion">苏州</span> 
                    <img @click="opstion" class="dingwei" src="../../assets/img/home/dinwei.png" alt="">
                </div>
                <router-link to="/Shoppingcart">
                    <img src="../../assets/img/home/shop.png" alt="">
                </router-link>
            </header>
            
            
            <div class="imgss">
                <div class="lunbos">
                    <swiper :options="swiperOption" ref="mySwiper">
                        <!--<swiper-slide v-for="(image, index) in 4" :key="index">
                            <a :href="image.url">
                                <img class="imgs" src="../../assets/img/home/vip_top.png" />
                            </a>
                        </swiper-slide>-->
                        <swiper-slide v-for="(image, index) in data" :key="index">
                            <a :href="image.url">
                                <img class="imgs" :src="imgUrl +image.picture" />
                            </a>
                        </swiper-slide>
                    </swiper>
                </div>
            </div>

        </div>
        <div class="zhuti">
            
            <div class="shop_fengleis">
                <van-swipe id="shop_fenglei">
                    <van-swipe-item class="zileis" v-for="(items, indexs) in fenleis" :key="indexs">
                        <div class="zilei" @click="Fenlei(index)" v-for="(item,index) in items" :key="index">
                            <div><img :src="imgUrl + item.tinyPic" alt=""></div>
                            <span>{{item.categoryName}}</span>
                        </div>
                    </van-swipe-item>
                </van-swipe>
            </div>

            
            <div class="shop_toutiao">
                <img src="../../assets/img/home/shop_toutiao.png" alt="">
                <img src="../../assets/img/home/shop_shuxian.png" alt="">
                <img src="../../assets/img/home/shop_touxiang.png" alt="">
                <div>
                    <span>全新铺满商城</span><br>
                    <span>期待您的光临</span>
                </div>
                <img src="../../assets/img/home/shop_you.png" alt="">
            </div>

            <div class="vip">
                <div class="vip_top"><img src="../../assets/img/home/vip_top1.png" alt=""></div>
                <div class="vip_name">
                    <div class="vip_names">
                        <div>
                            <router-link :to="{path:'Nian',query:{name:'vip_name4',shop:'苏桃李音乐酒馆'}}">
                                <img src="../../assets/img/home/vip_name4.png" alt="">
                            </router-link>
                        </div>
                        <div>
                            <router-link :to="{path:'Nian',query:{name:'vip_name1',shop:'苏浙徽农家大院'}}">
                                <img src="../../assets/img/home/vip_name1.png" alt="">
                            </router-link>
                        </div>
                        <div>
                            <router-link :to="{path:'Nian',query:{name:'vip_name5',shop:'英派斯健身'}}">
                                <img src="../../assets/img/home/vip_name5.png" alt="">
                            </router-link>
                        </div>
                        <div>
                            <router-link :to="{path:'Nian',query:{name:'vip_name6',shop:'福田家国际月子会所'}}">
                                <img src="../../assets/img/home/vip_name6.png" alt="">
                            </router-link>
                        </div>
                        <div>
                            <router-link :to="{path:'Nian',query:{name:'vip_name7',shop:'瑶池丽水温泉会馆'}}">
                                <img src="../../assets/img/home/vip_name7.png" alt="">
                            </router-link>
                        </div>
                        <div>
                            <router-link :to="{path:'Nian',query:{name:'vip_name8',shop:'肯幸顿酒庄'}}">
                                <img src="../../assets/img/home/vip_name8.png" alt="">
                            </router-link>
                        </div>
                        <div>
                            <router-link :to="{path:'Nian',query:{name:'vip_name9',shop:'江南正一堂'}}">
                                <img src="../../assets/img/home/vip_name9.png" alt="">
                            </router-link>
                        </div>
                        <div>
                            <router-link :to="{path:'Nian',query:{name:'vip_name10',shop:'老妈米线'}}">
                                <img src="../../assets/img/home/vip_name10.png" alt="">
                            </router-link>
                        </div>
                        <div>
                            <router-link :to="{path:'Nian',query:{name:'vip_name11',shop:'5D光影涮烤吧'}}">
                                <img src="../../assets/img/home/vip_name11.png" alt="">
                            </router-link>
                        </div>
                        <div>
                            <router-link :to="{path:'Nian',query:{name:'vip_name12',shop:'迈家众创'}}">
                                <img src="../../assets/img/home/vip_name12.png" alt="">
                            </router-link>
                        </div>
                        <!--<div>
                            <img src="../../assets/img/home/vip_name3.png" alt="">
                        </div>
                        <div>
                            <img src="../../assets/img/home/vip_name2.png" alt="">
                        </div>-->
                        
                    </div>
                </div>
                <div class="vip_top1"><img src="../../assets/img/home/vip_jingxuan.png" alt=""></div>
                <div class="Selected">
                    <div v-for="(item,index) in datanew" :key="index">
                        <img @click="Jingxuan(index)" :src="imgUrl + item.cover" >
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
            imgUrl:'',data:'',datanew:'',fenleis:'',currents:1,limit:10,loading:false,dibu:1,
            active: 0,time:['00','00','00'],timeInterval:'',
            back:[
                require('../../assets/img/home/kuang1.png'),require('../../assets/img/home/kuang2.png'),
                require('../../assets/img/home/kuang3.png'),require('../../assets/img/home/kuang5.png'),
                require('../../assets/img/home/kuang4.png')
            ],
            xuehua:'',qwe:0,
            swiperOption: {//以下配置不懂的，可以去swiper官网看api，链接http://www.swiper.com.cn/api/
                autoplay:true,
                speed:300,
                autoplayDisableOnInteraction : false,
                disableOnInteraction:false,
                loop:true,
                loopAdditionalSlides:1, //循环
                centeredSlides : true,
                slidesPerView:2,
                pagination : '.swiper-pagination',
                paginationClickable:true,
                prevButton:'.swiper-button-prev',
                nextButton:'.swiper-button-next',
                onInit:function(swiper){
                    swiper.slides[2].className="swiper-slide swiper-slide-active";//第一次打开不要动画
                },
                breakpoints: {
                    400: {
                        slidesPerView: 1,
                    }
                }
            } 
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

            var w = 33*10+11*5
            $('.vip_names').css('width',''+w+'vw')

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
                    var kuandu = 25
                    $('.Selected').css('height',''+(kuandu * Math.ceil(response.data.data.length / 3))+'vw')
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

        this.fenclass()
        this.$store.getters.count
        
        
        
    },
    computed:{
        a(){
            return this.$store.state.asd
        }
    },
    methods:{
        qwes(){
            this.$router.push({path:'Nian'})
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
                    this.data = response.data.data
                    // this.xue()
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
    padding-bottom: 10vw; background-color: #E0E0E0; font-size: 4vw;
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
    width: 100%; height: 75vw; padding-top: 15vw; background-color: white;
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
    width: 100%; height: 25vw; display: flex; justify-content: space-around; background-color: white; margin-top: 3vw;
    padding: 7vw 3vw 0 4vw;
    img:nth-child(1){
        width: 14vw; height: 10vw;
    }
    img:nth-child(2){
        width: 0.3vw; height: 10vw;
    }
    img:nth-child(3){
        width: 11vw; height: 11vw; border-radius: 50%;
    }
    div{
        width: 40%;
        span:nth-child(1){
            font-weight: 600; letter-spacing: 0.3vw;
        }
    }
    img:nth-child(5){
        width: 4vw; height: 5vw; border-radius: 50%; position: relative; top: 3vw;
    }
}

.vip{
    width: 100%; margin-top: 3vw;
    .vip_top,.vip_top1{
        width: 100%; height: 35vw; background: url('../../assets/img/home/vip_top.png') no-repeat;
        background-size: 100% 100%; text-align: center;
        img{
            width: 70%; height: 25vw; margin-top: 5vw;
        }
    }
    .vip_name{
        width: 100%; margin: 5vw 0; overflow-x: auto;
        .vip_names{
            height: 50vw;
            div{
                width: 33vw; height: 100%; float: left; margin-left: 5vw;
                img{
                    width: 100%; height: 100%;
                }
            } 
        }
    }
    .Selected{
        width: 100%; margin-bottom: 20vw;
        div{
            width: 26.6vw; height: 25vw; float: left; margin-left: 5vw; margin-top: 3vw; background-color: #E0E0E0;
            img{
                width: 100%; height: 100%; border-radius: 3vw;
            }
        }
    }
    .vip_top1{
        background: url('../../assets/img/home/vip_jin.png') no-repeat;
        background-size: 100% 100%;
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
.imgss{
    width: 100vw; overflow-x: auto; overflow: hidden;
}
.lunbos{
    width: 130%; height: 60vw; overflow: hidden; text-align: center; background-color: white; 
    margin-left: -18vw;
}

.swiper-container {
	width: 100%;
	// margin: 35px 0;
}

@media screen and (max-width: 400px) {
	.swiper-container {
		// margin: 20px 0 15px;
        padding: 0 30vw 0 10vw;
	}
    .swiper-container[data-v-61ec88a6]{
        // padding: 0 17vw 0 14vw;
    }
}
@media screen and (min-width: 400px) {
    .lunbos{
        width: 230%; height: 60vw; overflow: hidden; text-align: center; background-color: white; margin-left: -91.5vw;
    }
	.swiper-container {
		// margin: 20px 0 15px;
        padding: 0 10vw 0 37.3vw
	}
    .swiper-slide img {
        width: 100%; height: 84vw!important; border-radius: 5vw; position: relative; top: -17vw;
        /*border-radius: 14px;*/
        display: block;
    }
}

.swiper-slide { 
    /*width: 100vw!important;*/
	-webkit-transition: transform 1.0s;
	-moz-transition: transform 1.0s;
	-ms-transition: transform 1.0s;
	-o-transition: transform 1.0s;
	-webkit-transform: scale(0.7);
	transform: scale(0.7);
}

.swiper-slide-active,.swiper-slide-duplicate-active {
	// -webkit-transform: scale(1);
	// transform: scale(1);
}

.none-effect { 
	-webkit-transition: none;
	-moz-transition: none;
	-ms-transition: none;
	-o-transition: none;
}

.swiper-slide img {
	width: 140%; height: 84vw!important; border-radius: 5vw; position: relative; top: -17vw;
	/*border-radius: 14px;*/
	display: block;
}
.swiper-container[data-v-61ec88a6]{
    left: 0; 
}
</style>


