<template>
	
    <div class="yuyue">
        <nav id="nav">
            <div class="header">
                <i @click="history" class="fa fa-angle-left" aria-hidden="true"></i>
                <span>会员卡</span>
            </div>
        </nav>
        
        <div class="juan">
             <div class="ka">
                <div class="kalogo">
                        <section>
                            <img src="../../assets/img/my/logo@2x.png">
                        </section>
                    </div>
                <div>
                    <p>方圆里</p>
                    <p>VIP会员</p>
                </div>
             </div>
             <div class="qian">
                 <div><span>余额</span><br><span>¥0.00</span></div>
                 <div><span>消费</span><br><span>消费</span></div>
                 <div><span>充值</span><br><span>充值</span></div>
             </div>
        </div>
        <div class="shuo">
            <div>会员权益</div>
            <div>会员卡说明</div>
            <div>消费记录</div>
            <div>客服热线</div>
        </div>
        <button class="btn">进入品牌</button>
    </div>

</template>

<script>
	export default {
		name: "loginpassword-item",
        data(){
            return{
                
            }
        },
        created(){
            
        },
        methods: {
            history() {
                history.go(-1)
            },
        }
	}
</script>

<style scoped>
@import '../../assets/lies.css';
@import '../../assets/vux.1.css';
.yuyue{
    width: 100%; padding-top: 15vw; height: 100vh; overflow: hidden;
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



.juan{
    width: 90%; margin: 0 auto;
}
.ka{
    width: 100%; height: 30vw; color: #ffffff; margin-top: 3vw; position: relative;
    background: url('../../assets/img/my/card@2x.png') no-repeat; background-size: 100% 100%;
}
.kalogo{
    width: 20vw; height: 100%;
}
.kalogo img{
    width: 15vw; height: 15vw; border-radius: 50%; position: absolute; top: 8vw; left: 5vw;
}
.ka>div{
    float: left;
}
.ka>div:nth-child(2){
    position: relative; top: 9vw; left: 5vw; font-size: 4.7vw; font-weight: 550;
}
.ka>div:nth-child(2)>p:nth-child(1){
    margin: 0; font-size: 4.4vw; font-weight: 500;
}
.kahao{
    clear: both; position: relative; top: 10vw; left: 7vw; font-size: 4.5vw; font-weight: 600;
}


.qian{
    width: 100%; display: flex; justify-content: space-around; text-align: center; margin-top: 5vw;
}
.qian>div{
    width: 33%; height: 13vw; border-right: 0.3vw solid gainsboro; font-size: 4.3vw;
}
.qian>div:nth-child(1)>span:nth-child(3){
    background-color: white; color: black; width: 100%;
}
.qian>div>span:nth-child(3){
    display: inline-block; width: 50%; background-color: #ff8b4b; color: white
}
.qian>div:nth-child(3){
    border: 0;
}

.shuo{
    width: 90%; margin: 5vw auto; font-size: 4.5vw;
}
.shuo>div{
    width: 100%; height: 13vw; line-height: 13vw; border-bottom: 0.3vw solid gainsboro;
}

.btn{
    width: 90%; height: 12vw; background-color: #ff8b4b; outline: none!important;
    position: relative; top: 10vw; left: 5%; color: white; font-size: 4.5vw; border-radius: 7vw;
}
</style>