<template>
    <div class="home">
        <nav id="nav">
            <div class="header">
                <i @click="history" class="fa fa-angle-left" aria-hidden="true"></i>
                <!--<div>
                    <img src="../../assets/img/home/icon_shop_@2x.png" alt="">
                </div>-->
                <span>商家分类</span>
            </div>
        </nav>
        <div class="zhuti">

            <div class="xiguan">
                <div class="fl">
                    <div class="dropdown">
                        <button type="button" class="btn dropdown-toggle" id="dropdownMenu1" data-toggle="dropdown">{{wei}}
                            <span class="caret"></span>
                        </button>
                        <ul class="dropdown-menu" role="menu" aria-labelledby="dropdownMenu1">
                            <li role="presentation" v-for="(item,index) in areaNos" :key="index">
                                <a @click="guanss(index)" role="menuitem" tabindex="-1" href="#">{{item.name}}</a>
                            </li>
                        </ul>
                    </div>
                    <div class="dropdown">
                        <button type="button" class="btn dropdown-toggle" id="dropdownMenu1" data-toggle="dropdown">{{lou}}
                            <span class="caret"></span>
                        </button>
                        <ul class="dropdown-menu" role="menu" aria-labelledby="dropdownMenu1">
                            <li role="presentation" v-for="(item,index) in floors" :key="index">
                                <a @click="louss(index)" role="menuitem" tabindex="-1" href="#">{{item.name}}</a>
                            </li>
                        </ul>
                    </div>
                    <div class="dropdown">
                        <button type="button" class="btn dropdown-toggle" id="dropdownMenu1" data-toggle="dropdown">业态
                            <span class="caret"></span>
                        </button>
                        <!--<ul class="dropdown-menu" role="menu" aria-labelledby="dropdownMenu1">
                            <li role="presentation">
                                <a role="menuitem" tabindex="-1" href="#">营业</a>
                            </li>
                            <li role="presentation">
                                <a role="menuitem" tabindex="-1" href="#">暂营</a>
                            </li>
                        </ul>-->
                    </div>
                    <div class="dropdown">
                        <button type="button" class="btn dropdown-toggle" id="dropdownMenu1" data-toggle="dropdown">{{sort}}
                            <span class="caret"></span>
                        </button>
                        <ul class="dropdown-menu dropdown-menu-right" role="menu" aria-labelledby="dropdownMenu1">
                            <li role="presentation" v-for="(item,index) in sorts" :key="index">
                                <a @click="sortss(index)" role="menuitem" tabindex="-1" href="#">{{item.xu}}</a>
                            </li>
                        </ul>
                    </div>
                </div>
                <div @click="shop(index)" class="canguan" v-for="(item,index) in data" :key="index">
                    <div><img :src="imgUrl + item.logo" alt=""></div>
                    <div>
                        <p>{{item.shopName}}</p>
                        <p>{{item.categoryName}}</p>
                        <p v-if="item.perConsume">{{item.perConsume}}元/人</p>
                    </div>
                    <div>{{item.areaNoDesc}}/{{item.floorDesc}}</div>
                </div>
            </div>
        </div>
            <div  v-if="loadings" id="loading">
                <img v-if="loading" src="../../assets/img/placeholder.gif" alt="">
                <span v-if="!loading">没有更多了</span>
            </div>
    </div>
</template>
<script>
export default {
    data(){
        return{
            wei:'馆位',lou:'楼层',sort:'排序',
            sorts:[
                { xu:'升序' },{ xu:'降序' }
            ],
            data:'',imgUrl:'',areaNos:'',floors:'',di:1,
            loading:false,loadings:false,currents:1,limit:5,floor:'',areaNo:'',xu:''
        }
    },
    components: {
        
    },
    created(){
        document.body.scrollTop = 0
        document.documentElement.scrollTop = 0
        // console.log(this.$route.query.id)
        this.imgUrl = this.$httpUrl.imgUrls
        this.jiazai('desc')
        
        if(this.$route.query.id){
            window.onscroll = this.didScroll
        }
    },
    methods:{
        history(){
            history.go(-1)
        },
        shop(index){
            // this.$store.commit('shopids',this.data[index].id)
            this.$storage.setStore('shopids',this.data[index].id)
            this.$router.push({path:'Restaurant'})
        },
        guanss(index){
            this.currents = 1
            this.loadings = false
            this.wei = this.areaNos[index].name
            this.areaNo = this.areaNos[index].num
            this.jiazai('desc')
        },
        louss(index){
            this.currents = 1
            this.loadings = false
            this.lou = this.floors[index].name
            this.floor = this.floors[index].num
            this.jiazai('desc')
        },
        sortss(index){
            this.sort = this.sorts[index].xu
            this.currents = 1
            this.loadings = false
            if(index == 0){
                this.jiazai('asc')
                this.xu = 'asc'
            }else{
                this.jiazai('desc')
                this.xu = 'desc'
            }
        },
        jiazai(orders){
            // console.log(orders)
            this.$axios.post(this.$httpUrl.shopList,$.param({ categoryId:this.$route.query.id, areaNo:this.areaNo, floor:this.floor, limit:this.limit,current:this.currents,
                sort:'PER_CONSUME', order:orders
             }))
            .then(response => {
                // console.log(response.data.data)
                if(response.data.code == 200){
                    this.data = response.data.data.shops
                    this.areaNos = response.data.data.areaNos
                    this.floors = response.data.data.floors
                    // if(this.data.shops.length == 0){
                    //     this.loading = true
                    // }
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
        didScroll() {
            var allHeight = this.$(document).scrollTop() + this.$(window).height();
            var bodyHeight = this.$(document).height();

            // 如果到底部则请求数据
            if (allHeight >= bodyHeight) {
                if(!this.loading){
                    this.currents ++
                    this.loading = true
                    this.loadings = true
                    this.loadMore(this.xu)
                }
            }
        },
        loadMore(orders){
            // console.log(this.currents)
            this.$axios.post(this.$httpUrl.shopList,$.param({ categoryId:this.$route.query.id, areaNo:this.areaNo, floor:this.floor, limit:this.limit,current:this.currents,
                sort:'PER_CONSUME', order:orders
             }))
            .then(response => {
                // console.log(response.data.data)
                if(response.data.code == 200){
                    this.loading = false
                    this.data = this.data.concat(response.data.data.shops)
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
    },
    // watch:{
    //     sort:(a,b)=>{
    //         console.log(a,b)
    //         if(a === '降序'){
    //             alert(a)
    //         }
    //     }
    // }
}
</script>
<style scoped>
.home{
    padding-top: 25vw; padding-bottom: 3vw;
}
/*顶部*/
#nav{
    width: 100%; height: 15vw; z-index: 10000; font-size: 5vw;
    position: fixed; top: 0; color: white;
    background-color: black;
}
#nav .header{
    width: 100%; height: 100%;
    text-align: center;
    line-height: 15vw;
} 
.fa{
    float: left; margin-left: 5vw;
    font-size: 10vw;
    line-height: 14vw;
}
.header>div{
    width: 25vw; height: 7vw; float: right;
}
.header img{
    width: 7vw; height: 100%; margin-right: 3vw;
}
.header span{
    margin-left: -3vw;
}


#loading{
    width: 100%; height: 10vw; text-align: center; line-height: 10vw; color: gray;
}
#loading img{
    width: 8vw; height: 8vw;
}


.zhuti{
    width: 100%;
    /*border: 1px solid red;*/
}
/*分类*/
.fenglei{
    width: 100%; text-align: center; font-size: 4vw; padding-right: 6vw; padding-left: 4vw; padding-top: 3vw;
    display: flex; flex-wrap: wrap; justify-content: space-between;
}
.fenglei>div>div>img{
    width: 100%; height: 100%;
}
.fenglei>div{
    width: 20vw; height: 20vw; float: left; margin-top: 2vw;
}
.fenglei>div>div{
    width: 11vw; height: 11vw; margin: 0 auto;
}
.fenglei>div:nth-child(1)>div{
    width: 13vw; height: 10vw; margin-top: 1vw;
}
.fenglei>div:nth-child(3)>div{
    width: 9vw; height: 10vw; margin-top: 0.8vw;
}
.fenglei>div:nth-child(4)>div{
    width: 12vw; height: 8vw; margin-top: 2.8vw
}
.fenglei>div>span{
    position: relative; bottom: -2vw; 
}



.xiguan{
    width: 100%; padding: 3vw 5vw;
}

.fl{
    width: 100%; height: 15vw; display: flex; justify-content: space-between; position: fixed; top: 15vw; left: 0; 
    padding: 3vw 5vw; background-color: white;
}
.fl>div{
    font-size: 4.3vw; height: 8vw; font-size: 4.5vw;
}


#dropdownMenu1{
    width: 18vw; height: 9vw; font-size: 4vw;
}
.caret{
    width: 2vw; height: 1vw;
}
.dropdown-menu{
    min-width: 18vw; text-align: center; font-size: 4vw;
}
.dropdown-menu li{
    height: 8vw;
}
.dropdown-menu-right li{
    max-width: 17vw;
}



.canguan{
    width: 100%; height: 30vw; border-bottom: 1px solid gainsboro; margin-top: 3vw;
}
.canguan img{
    width: 100%; height: 100%;
}
.canguan>div{
    float: left;
    /*border: 1px solid red;*/
}
.canguan>div:nth-child(1){
    width: 25vw; height: 27vw;
}
.canguan>div:nth-child(2){
    width: 48vw; height: 100%; padding-left: 4vw;
}
.canguan>div:nth-child(2)>p{
    margin: 0; font-size: 3.5vw; margin-bottom: 1.5vw;
}
.canguan>div:nth-child(2)>p:nth-child(1){
    font-size: 4.5vw; font-weight: 600;
}
.canguan>div:nth-child(3){
    width: 15vw; height: 100%; float: right; line-height: 25vw; font-size: 4.5vw;
}

</style>


