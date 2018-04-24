<template>
	
    <div class="yuyue">
        <nav id="nav">
            <div class="header">
                <i @click="history" class="fa fa-angle-left" aria-hidden="true"></i>
                <span>加入方圆里</span>
            </div>
        </nav>
        
        <div class="juan">
             <div class="ka">
                <div class="yuan">FYL</div>
                <div>
                    <p>方圆里</p>
                    <p>VIP会员</p>
                </div>
             </div>
        </div>
        <div class="shuo">
            <div>会员权益</div>
            <div>会员卡说明</div>
            <div>消费记录</div>
            <div>客服热线</div>
        </div>
        <router-link to="/Opencard">
        <button class="btn">开通会员</button>
        </router-link>
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
    width: 100%; height: 30vw; color: #ffffff; margin-top: 3vw;
    background: url('../../assets/img/my/card@2x.png') no-repeat; background-size: 100% 100%;
}
.yuan{
    width: 18vw; height: 18vw; border: 0.5vw solid #ffffff; border-radius: 50%;
    margin-top: 6vw; margin-left: 7vw; text-align: center; line-height: 18vw; font-size: 4.5vw; font-family: Broadway Regular;
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



.shuo{
    width: 90%; margin: 5vw auto; font-size: 4.5vw;
}
.shuo>div{
    width: 100%; height: 13vw; line-height: 13vw; border-bottom: 0.3vw solid gainsboro;
}

.btn{
    width: 90%; height: 12vw; background-color: #ff8b4b; outline: none!important;
    position: relative; top: 20vw; left: 5%; color: white; font-size: 4.5vw; border-radius: 7vw;
}
</style>