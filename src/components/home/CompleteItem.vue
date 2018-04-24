<template>
    <div class="home">
        <nav id="nav">
            <div class="header">
                <span>支付完成</span><span class="shouye" @click="history">完成</span>
            </div>
        </nav>
        <div class="wanc">
            <div class="wanc1"><img src="../../assets/img/home/yes@2x.png" alt=""></div>
            <p class="p1">支付成功</p>
            <!--<p class="p2"><span>卷号：</span><span>650130001</span></p>
            <div class="wanc2">
                <span>二维码：</span>
                <img :src="mai[0].titelImage1" alt="">
            </div>-->
            <div>付款&nbsp;{{this.$route.query.Moneys}}&nbsp;元</div>
            <div class="wanc3">
                <button @click="chakan" class="btn">查看订单详情</button><button @click="pingjia" class="btn">立即评价</button>
            </div>
            <p class="p3"><img src="../../assets/img/home/phone@2x.png" alt="">若支付失败，请联系平台管理员</p>
        </div>
        
    </div>
</template>
<script>
export default {
    data(){
        return{
            mai:[
                {
                    "titelImage": "../../assets/img/home/yes@2x.png",
                    "titelImage1": "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1509364900025&di=b6f3770cbb0473b81d3d6d47a7e7c214&imgtype=0&src=http%3A%2F%2Fpic.qiantucdn.com%2F58pic%2F22%2F72%2F55%2F57c7a801ccf2e_1024.jpg",
                },
                
            ],
        }
    },
    created(){
        document.body.scrollTop = 0
        document.documentElement.scrollTop = 0
        $(() => {
            pushHistory()
            window.addEventListener("popstate", (e)=> {window.location.href ='/'}, false);
            function pushHistory() {
                var state = {
                    title: "title",
                    url: "#"
                };
                window.history.pushState(state, state.title, state.url);
            }
        })
    },
    methods:{
        history() {
            this.$router.push({path:'/'})
        },
        chakan(){
            this.$router.push({name:'orderdetails',query:{orderIds:this.$route.query.orderIds}})
        },
        pingjia(){
            this.$router.push({path:'Myorder',query:{nums:4}})
        }
    }
}
</script>
<style scoped>
.home{
    padding-top: 15vw; font-size: 4.5vw;
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
#nav .header span{
    font-size: 5vw; 
    line-height: 15vw;
}
.header span:nth-child(1){
    margin-left: 15vw
}
.shouye{
    float: right; margin-right: 2vw;
}


.wanc{
    width: 100%; text-align: center; margin-top: 1vw; padding-top: 15vw;
}
.wanc1,.wanc2,.wanc3{
    width: 100%; clear: both; padding-top: 3vw;
}
.wanc1 img{
    width: 30vw; height: 30vw;
}
.wanc2 img{
    width: 40vw; height: 40vw;margin-left: 2vw; float: left;
}
.wanc3{
    display: flex; justify-content: space-around; padding-top: 5vw; padding-left: 5vw; padding-right: 5vw;
}
.p1{
    font-size: 4.5vw; font-weight: 600; margin-top: 3vw;
}
.p2>span:nth-child(1){
    float: left; margin-left: 15vw;
}
.p2>span:nth-child(2){
    margin-left: 6vw; float: left;
}
.wanc2 span{
    float: left; line-height: 40vw; margin-left: 15vw;
}
.p3{
    font-size: 4vw; margin-top: 7vw; line-height: 6vw;
}
.p3 img{
    width: 5vw; height: 5vw; margin-right: 2vw;
}


.btn{
    background-color: white; outline: none!important; width: 30vw;
    height: 10vw; font-size: 4vw; border: 0.3vw solid gray; margin-bottom: 5vw;
}

</style>


