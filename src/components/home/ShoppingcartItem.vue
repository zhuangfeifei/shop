<template>
    <div class="home">
        <nav id="nav">
            <div class="header">
                <i @click="history" class="fa fa-angle-left" aria-hidden="true"></i>
                <span>购物车</span><span class="bianji" @click="bianji">编辑</span>
            </div>
        </nav>
        <div class="jine" v-for="(item,indexs) in data" :key="indexs">
            <div>
                <div class="dianming1">
                    <label class="demo--label"><input @click="shangjiaQuanxuan(indexs)" class="demo--radio1" type="checkbox" name="demo-checkbox1" :value="item.totalcount">
                        <span class="demo--checkbox demo--radioInput"></span>
                    </label>
                </div>
                <img :src="imgUrl + item.shoplogo" alt="">
                <span class="dianming">{{item.shopname}}</span>
            </div>
            <div class="caiming" v-for="(item1,index) in item.goods" :key="index">
                <div>
                    
                    <label class="demo--label"><input class="demo--radio" @click="changes(indexs,index)" type="checkbox" name="demo-checkbox1" :id="index" :value="item1.id">  
                        <span class="demo--checkbox demo--radioInput"></span>
                    </label>

                </div>
                <div>
                    <img :src="imgUrl + item1.picture" alt="">
                </div>
                <div>
                    <p>{{item1.goodsname}}</p>
                    <!--<p>周一至周四免费约</p>-->
                    <!--<p>过期自动退</p>-->
                </div>
                <div>
                    <p>￥{{item1.nowprice}}</p>
                    <div class="shuliang">
                        <span @click="reduce(indexs,index)"><img src="../../assets/img/home/minus@2x.png" alt=""></span>
                        <span>{{item1.amount}}</span>
                        <span @click="add(indexs,index)"><img id="jia" src="../../assets/img/home/plus@21x.png" alt=""></span>
                    </div>
                    <!--<div class="shuliang">
                        <span @click="reduceAction">-</span>
                        <span>{{count}}</span>
                        <span @click="addAction">+</span>
                    </div>-->
                </div>
            </div>
        </div>

        <div class="gowu" v-if="data.length == 0">
            <img src="https://b.yzcdn.cn/v2/image/wap/trade/new_order/empty@2x.png">
            <p>购物车空空如也，快去逛逛吧</p>
        </div>

        <div class="gouwuche">
            <div>
                <div id="quan">
                    <label class="demo--label"><input @click="quanxuan" class="demo--radios" type="checkbox" name="demo-checkbox" value="全选">
                        <span class="demo--checkbox demo--radioInput"></span>
                    </label>
                </div>
                <span class="quan" @click="quanxuan">全选</span>
                <span>￥{{moneys}}</span>
            </div>
            <div id="tishan" @click="tijiao">提交订单</div>
        </div>
    </div>
</template>
<script>
import { mapState, mapMutations, mapGetters, mapActions } from 'vuex'
import { Loading, Toast } from 'vux'
export default {
    data(){
        return{
            header:'购物车',
            roundValue: 0,bians:true,shanchu:true,isShow:false,id:'',
            data:'',moneys:0,couponBiaoji:0,dest:'',
            // imgUrl:''
        }
    },
    computed:{
        ...mapState(['count']),
        // ...mapGetters(['count'])
        imgUrl(){
            return this.$httpUrl.imgUrls
        }
    },
    components: {
        Loading
    },
    created(){
        document.body.scrollTop = 0
        document.documentElement.scrollTop = 0

        // this.$store.dispatch('fghj') 

        // this.imgUrl = this.$httpUrl.imgUrls
        this.shuaxin()
    },
    methods:{
        history() {
            history.go(-1)
        },
        ...mapMutations(['add','reduce']),
        ...mapActions(['addAction','reduceAction','fghj']),
        changes(indexs,index,jian){
            if ($('.home>div:nth-child('+(indexs+2)+')>div:nth-child('+(index+2)+')>div:nth-child(1)>label>input').is(':checked')) {
                this.adds(indexs,index)
                this.data[indexs].totalcount = this.data[indexs].goods[index].totalcount*1.0
                var asd = new Array
                $.each(this.data, (i,n) => {
                    asd[i] = n.totalcount
                })
                // console.log(asd+'------')
                this.moneys += asd[indexs]
            }else{
                this.adds(indexs,index)
                this.data[indexs].totalcount = this.data[indexs].goods[index].totalcount*1.0
                var asd = new Array
                $.each(this.data, (i,n) => {
                    asd[i] = n.totalcount
                })
                
                // this.moneys -= asd[indexs]   有bug
                var a = this.moneys
                this.moneys = this.xiaoshu( a, asd[indexs] )
            }
        },
        add(indexs,index){
            if ($('.home>div:nth-child('+(indexs+2)+')>div:nth-child('+(index+2)+')>div:nth-child(1)>label>input').is(':checked')) {
                this.$vux.loading.show({
                    text: ''
                })
                this.moneys += this.data[indexs].goods[index].nowprice
                this.shuliang(indexs,index,1)
                this.adds(indexs,index)
            }
        },
        reduce(indexs,index){
            if ($('.home>div:nth-child('+(indexs+2)+')>div:nth-child('+(index+2)+')>div:nth-child(1)>label>input').is(':checked')) {
                if(this.data[indexs].goods[index].amount > 1){
                    this.$vux.loading.show({
                        text: ''
                    })
                    var jian = 0
                    this.moneys -= this.data[indexs].goods[index].nowprice
                    this.shuliang(indexs,index,-1)
                    this.adds(indexs,index)
                }
            }
        },
        adds(indexs, index) {
            var zxc = new Array
            var xcv = 0
            $.each(this.data[indexs].goods, (a, obj) => {
                zxc[a] = obj.nowprice * obj.amount * 1.0
            })
            $.each(zxc, (i, n) => {
                xcv += n
            })
            if (index != null) {
                this.data[indexs].goods[index].totalcount = zxc[index]
            } else {
                this.data[indexs].totalcount = xcv
            }
        },
        quanxuan(){
            if ($('.demo--radios').is(':checked')) {
                $(".jine :checkbox").prop("checked", true)
                var xcv = 0
                $.each(this.data, (i,n) => {
                    $.each(n.goods, (v, s) => {
                        xcv += s.nowprice * s.amount
                    })
                })
                this.moneys = xcv
            } else {
                $(".jine :checkbox").prop("checked", false)
                this.moneys = 0
            }
        },
        tijiao(){
            if(this.shanchu){
                // this.$vux.loading.show({
                //     text: '正在创建订单'
                // })
                var valArr = new Array
                $(".caiming input[type=checkbox]:checkbox:checked").each(function(i) {
                    valArr[i] = $(this).val()
                })
                // console.log(valArr)
                this.chuangjian(valArr)
            }else{
                var idss = new Array
                $(".caiming input[type=checkbox]:checkbox:checked").each(function(i) {
                    idss[i] = $(this).val()
                    // console.log($(this).val())
                })
                // ids.pop()
                var shopids = idss.join(',')
                // console.log(shopids)
                this.id = shopids
                this.shanchuGou(shopids,idss)
                $(".jine :checkbox").prop("checked", false)
            }
        },
        chuangjian(valArr){
            if (valArr.length > 0) {
                var goods = new Array
                var zhekous = new Array
                var couponClass = new Array
                for (var s = 0; s < this.data.length; s++) {
                    var goods1 = new Array
                    var zhekous1 = 0
                    for (var m = 0; m < this.data[s].goods.length; m++) {
                        for (var n = 0; n < valArr.length; n++) {
                            if (this.data[s].goods[m].id == valArr[n]) {
                                goods.push(this.data[s].goods[m])
                                goods1.push(this.data[s].goods[m])
                            }
                        }
                    }
                    if(this.data[s].discount === ''){
                        zhekous.push(10)
                        zhekous1 = 10
                    }else{
                        zhekous.push(this.data[s].discount)
                        zhekous1 = this.data[s].discount
                    }
                    couponClass.push(this.youhuijuan(this.data[s].shopid,goods1,zhekous1))
                    // console.log(goods1)
                }
                // console.log(goods)
                var map = {}, dest = []
                for (var i = 0; i < goods.length; i++) {
                    var ai = goods[i]
                    // console.log(ai)
                    if (!map[ai.shopid]) {
                        dest.push({
                            discount: zhekous[dest.length],
                            shopname: ai.shopname,
                            shopid: ai.shopid,
                            shoplogo: ai.shoplogo,
                            totalcount: couponClass[dest.length][2],        // 折后金额
                            totalcounts: couponClass[dest.length][3],       // 金额
                            zhekouMoneys: couponClass[dest.length][4],      // 折扣金额
                            coupons: couponClass[dest.length][0],           // 优惠卷
                            disabledCoupons: couponClass[dest.length][1],   // 不可用优惠卷
                            chosenCoupon: -1,
                            showList: false,
                            goods: [ai],
                        })
                        // console.log(dest,i)
                        map[ai.shopid] = ai.shopid
                    } else {
                        // console.log(dest,i)
                        for (var j = 0; j < dest.length; j++) {
                            var dj = dest[j]
                            if (dj.shopid == ai.shopid) {
                                dj.goods.push(ai)
                                break
                            }
                        }
                    }
                }
                
                this.dest = dest
                // console.log(dest)
                this.$storage.setStore('goods', dest)
                this.$storage.setStore('money', this.moneys)
                
            }
        },
        shanchuGou(shopids,idss){
            // console.log(shopids)
            if(shopids.length > 0){
                this.$axios.post(this.$httpUrl.shoppingcartDeleteGoods, $.param({ access_type:'WXH5', wxh: this.$storage.getStore('wx'), openId:this.$storage.getStore('openIds'), ids: shopids }))
                .then(response => {
                    // console.log(response.data)
                    if (response.data.code == 200) {
                        this.$vux.toast.show({
                            text: response.data.message
                        })
                        setTimeout(() => {
                            this.$vux.toast.hide()
                        }, 3000)
                        this.shuaxin()
                        this.shanjian(idss)
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
        },
        shangjiaQuanxuan(indexs){
            if ($('.home>div:nth-child('+(indexs+2)+') .demo--radio1').is(':checked')) {
                this.adds(indexs)
                this.moneys += this.data[indexs].totalcount - this.jisuan(indexs)
                $('.home>div:nth-child('+(indexs+2)+') :checkbox').prop("checked", true)
            } else {
                this.adds(indexs)
                this.moneys -= this.jisuan(indexs)
                $('.home>div:nth-child('+(indexs+2)+') :checkbox').prop("checked", false)
            }
        },
        bianji(){
            if(this.bians){
                $('.demo--radioInput').css('border-color','red')
                $('.quan').css('color','red')
                $('#tishan').text('删除') 
                $('.bianji').text('完成')
                $('.bianji').css('color','red')
            }else{
                $('.demo--radioInput').css('border-color','gray')
                $('.quan').css('color','black')
                $('#tishan').text('提交订单')
                $('.bianji').text('编辑')
                $('.bianji').css('color','black')
            }
            this.bians = !this.bians
            this.shanchu = !this.shanchu
        },
        shuaxin(){
            this.$axios.post(this.$httpUrl.getList,$.param({access_type:'WXH5', wxh: this.$storage.getStore('wx'), openId:this.$storage.getStore('openIds'),limit:'100',current:'1'}))
            .then(response => {
                // console.log(response.data)
                if(response.data.code == 200){
                    this.$vux.loading.hide()
                    this.data = response.data.data
                } else {
                    this.$vux.loading.show({
                        text: response.data.message
                    })
                    setTimeout(() => {
                        this.$vux.loading.hide()
                    },3000)
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
        shuliang(indexs,index,number){
            this.$axios.post(this.$httpUrl.updateAmount,$.param({access_type:'WXH5', wxh: this.$storage.getStore('wx'), openId:this.$storage.getStore('openIds'),id:this.data[indexs].goods[index].id,amount:number}))
                .then(response => {
                    // console.log(response.data)
                    if(response.data.code == 200){
                        this.shuaxin()
                    } else {
                        this.$vux.loading.show({
                            text: response.data.message
                        })
                        setTimeout(() => {
                            this.$vux.loading.hide()
                        },3000)
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
        jisuan(a){
            var valArrs = new Array
                $('.home>div:nth-child('+(a+2)+') .caiming input[type=checkbox]:checkbox:checked').each(function(i) {
                    valArrs[i] = $(this).val()
                })
                // console.log(valArrs)
                var goods = this.data[a].goods
                var money = new Array
                var goodsMoney = 0
                if(valArrs.length > 0){
                    for(var i = 0; i <= valArrs.length -1; i ++){
                        for(var s = 0; s < goods.length; s ++){
                            if(valArrs[i] == goods[s].id){
                                money[i] = goods[s].amount * goods[s].nowprice *1.0
                            }
                        }
                    }
                    $.each(money,(i,v)=>{
                        goodsMoney += v
                    })
                }
            return goodsMoney
        },
        shanjian(valArr){
            if (valArr.length > 0) {
                var goods = new Array
                for (var s = 0; s < this.data.length; s++) {
                    for (var m = 0; m < this.data[s].goods.length; m++) {
                        for (var n = 0; n < valArr.length; n++) {
                            if (this.data[s].goods[m].id == valArr[n]) {
                                goods.push(this.data[s].goods[m])
                            }
                        }
                    }
                }
                // console.log(goods)
                var shan = 0
                for (var s = 0; s < goods.length; s++) {
                    shan += goods[s].nowprice
                }
                this.moneys -= shan
            }
        },
        xiaoshu(a,b){
            var c = a*100 - b*100
            return c/100
        },
        youhuijuan(shopid,goods,zhekous){
            var couponsarry = [], disabledCoupons = []
            var totalcount = 0, totalcounts = 0
            for(var j = 0; j < goods.length; j ++){
                if(goods[j].totalcount != 0 && zhekous < 10){
                    totalcount += Math.round((goods[j].nowprice*goods[j].amount*zhekous/10)*100)/100
                    totalcounts += goods[j].nowprice*goods[j].amount
                }else{
                    totalcounts += goods[j].nowprice*goods[j].amount
                    totalcount += goods[j].nowprice*goods[j].amount
                }
            }
            var zhekouMoneys = this.xiaoshu(totalcount,totalcounts)
            this.$axios.post(this.$httpUrl.coupon,$.param({access_type:'WXH5', wxh: this.$storage.getStore('wx'), openId:this.$storage.getStore('openIds'),shopids:shopid}) )
            .then(response => {
                // console.log(response.data)
                if (response.data.code == 200) {
                    var shopCoupons = response.data.data
                    for (var i = 0; i < shopCoupons.length; i++) {
                        var start = new Date(shopCoupons[i].limitDateStart.replace(/-/g, "/")).getTime() / 1000
                        var end = new Date(shopCoupons[i].limitDateEnd.replace(/-/g, "/")).getTime() / 1000
                        var coupons = {
                            name: shopCoupons[i].title,
                            origin_condition: shopCoupons[i].conditionPice * 100,
                            denominations: shopCoupons[i].discount * 100,
                            value: shopCoupons[i].discount * 100,
                            start_at: start,
                            end_at: end,
                            couponId:shopCoupons[i].id
                        }
                        if(shopCoupons[i].couponStatus == 2 && shopCoupons[i].useStatus == 0){
                            if(totalcount > shopCoupons[i].conditionPice){
                                couponsarry.push(coupons)
                            }
                        }else{
                            disabledCoupons.push(coupons)
                        }
                    }
                    this.couponBiaoji ++ 
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
            return [couponsarry,disabledCoupons,totalcount,totalcounts,zhekouMoneys]
        }
    },
    watch:{
        couponBiaoji(val,old){
            if (this.couponBiaoji == 2) {
                this.$storage.setStore('goods', this.dest)
                this.$router.push({ name: 'buy' })
                // console.log(this.dest)
            }
        }
    }
}
</script>
<style scoped>
@import '../../assets/vux.1.css';
.home{
    padding-top: 15vw; font-size: 4vw; padding-bottom: 15vw;
}

/*顶部*/
#nav{
    width: 100%; height: 15vw; font-size: 5vw;
    position: fixed; top: 0; color: black; z-index: 10000;
    background-color: white; border-bottom: 0.3vw solid gainsboro;
}
#nav .header{
    width: 100%; height: 100%;
    text-align: center;
    line-height: 15vw;
} 
.fa{
    float: left; margin-left: 5vw;
    font-size: 10vw;
    line-height: 15vw;
}
.header span{
    position: relative; left: 2vw;
}
.bianji{
    float: right; color: black; font-size: 4.5vw; margin-right: 5vw;
}


.gowu{
    width: 100%; height: 50vw; margin: 35vw auto; text-align: center; color: gray; font-size: 3.5vw;
}
.gowu img{
    width: 25vw; height: 25vw; margin-bottom: 5vw;
}



.jine{
    width: 100%; font-size: 4vw; padding: 3vw;
}
.jine>div:nth-child(1){
    width: 100%; height: 15vw; border-bottom: 1px solid gainsboro; padding: 2vw 0vw; line-height: 11vw; 
    /*border: 1px solid red;*/
}
.jine img{
    width: 10vw; height: 8vw; float: left; margin-top: 1.5vw; margin-right: 2vw;
}
.dianming1{
    float: left; width: 10vw; height: 100%; margin-right: 3vw;
    /*border: 1px solid red;*/
}
.dianming1 .demo--label{margin:0vw 2vw;display:inline-block}
.caiming{
    height: 30vw; border-bottom: 0.3vw solid gainsboro;
}
.caiming img{
    width: 20vw; height: 20vw; margin-top: 4vw;
}
.caiming>div{
    float: left;
}
.caiming>div:nth-child(1){
    height: 10vw; width: 13vw; margin-top: 8vw;
}
.caiming>div:nth-child(2){
    height: 100%; width: 20vw;
}
.caiming>div:nth-child(3){
    height: 100%; width: 40vw; line-height: 4vw; padding-top: 5vw; padding-left: 2vw;
}
.caiming>div:nth-child(4){
    height: 100%; width: 20vw; text-align: right; padding-top: 5vw;
}

.shuliang{
    width: 20vw; height: 6vw; float: right; margin-top: 2.5vw;
    display: flex;justify-content: space-around; line-height: 6vw;
}
.shuliang>span{
    display: inline-block; width: 7vw; height: 100%; border: 1px solid gainsboro; text-align: center;
}
.shuliang>span:nth-child(2){
    border-right: none; border-left: none;
}
.shuliang img{
    width: 3vw; height: 0.5vw; margin-top: 2.6vw; margin-left: 1.3vw;
}
#jia{
    width: 3vw; height: 3vw; margin-top: 1.2vw; margin-left: 2vw;
}



.gouwuche{
    width: 100%; height: 13.3vw; position: fixed; bottom: 0; background-color: white;
}
.gouwuche>div{
    float: left; width: 70.7%; line-height: 13vw; border: 0.3vw solid gainsboro;
}
.gouwuche>div:nth-child(1)>div:nth-child(1){
    float: left; width: 12vw; margin-top: 1.5vw;
}
.gouwuche>div:nth-child(1)>span:nth-child(3){
    float: right; margin-right: 5vw; color: #ff4444; font-size: 4vw;
}
.gouwuche>div:nth-child(2){
    width: 29.3%; height: 100%; background-color: #ff4444; text-align: center;
    font-size: 3.8vw; color: white; border: none;
}




#quan .demo--label{ margin-top: 0; margin-left: 2vw; height: 11vw; padding-bottom: 2vw!important; padding-left: 2.5vw;}
#quan .demo--radioInput{margin-top: -3.3vw;}
#quan .demo--radios:checked + .demo--radioInput:after{border-bottom: 0.5vw solid red;border-left: 0.5vw solid red;border-radius:100%;content:"";display:inline-block;height:2vw;width:4vw; 
     transform: rotate(-45deg);margin-left: 0.5vw; margin-bottom: 0.6vw; }

.demo--label{margin:3vw 2vw;display:inline-block}
.demo--radio,.demo--radio1{display:none;}
.demo--radioInput{background-color:#fff;border:1px solid gray;border-radius:100%;display:inline-block;height:5vw;margin-right:10px;margin-top:-1px;vertical-align:middle;width:5vw;line-height:1;}
.demo--radio:checked + .demo--radioInput:after,.demo--radio1:checked + .demo--radioInput:after{border-bottom: 0.5vw solid red;border-left: 0.5vw solid red;border-radius:100%;content:"";display:inline-block;height:2vw;width:4vw; 
     transform: rotate(-45deg);margin-left: 0.5vw; margin-bottom: 0.6vw}
.demo--checkbox.demo--radioInput,.demo--radio:checked + .demo--checkbox.demo--radioInput:after{border-radius:0}

.demo--radios{display:none;}
.demo--radios:checked + .demo--radioInput:after{border-bottom: 0.5vw solid red;border-left: 0.5vw solid red;border-radius:100%;content:"";display:inline-block;height:2vw;width:4vw; 
     transform: rotate(-45deg);margin-left: 0.5vw; margin-bottom: 0.6vw; }

</style>


