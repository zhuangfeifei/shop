<template>
	
    <div class="yuyue">
        <nav id="nav">
            <div class="header">
                <i @click="history" class="fa fa-angle-left" aria-hidden="true"></i>
                <span>积分服务</span>
            </div>
        </nav>
        
        <div class="Wallet_main">
            <div class="integral"><span>当前积分</span><br><span>{{integral.integration || 0}}</span></div>
            <div class="integral_class" @click="class_change"><span :class="{checked:show}">积分明细</span><span :class="{checked:!show}">积分规则</span></div>
            <div class="integral_bottom"><div :class="{back_color:show}"></div><div :class="{back_color:!show}"></div></div>
            <div v-if="show" class="integral_content">
                <!--<div class="add_reduce">
                    <div><span>消耗积分</span><br><span class="date">2018.01.01</span></div>
                    <div><span>停车时长</span></div>
                    <div><span>-30</span></div>
                </div>
                <div class="add_reduce">
                    <div><span>赚取积分</span><br><span class="date">2018.01.01</span></div>
                    <div><span>店里消费</span></div>
                    <div><span>+30</span></div>
                </div>-->
            </div>
            <div v-else class="integral_content content">
                <!--<p>积分获取来源</p>
                <ol>
                    <li>每天签到领取相应积分。</li>
                    <li>购买商品领取相应积分。</li>
                    <li>参加会员活动领取相应积分。</li>
                    <li>会员消费扫码获取固定积分。</li>
                </ol>
                <p>积分规则</p>
                <ol>
                    <li>1元=100积分，即购买1元商品赠送100积分。</li>
                    <li>签到一次赠送10积分，连续签到7天后每次赠送20积分。</li>
                    <li>会员扫码增加20积分。</li>
                </ol>-->
            </div>
        </div>

        <button v-show="show" class="btn">积分兑换</button>
        
    </div>

</template>

<script>
import {httpUrl} from "../../api.js"
import { Loading, XButton} from 'vux'
	export default {
		name: "loginpassword-item",
        data(){
            return{
                Data:'',show:true,integral:''
            }
        },
        created(){
            if(this.$storage.getStore('user')){
                this.integral = this.$storage.getStore('user')
            }
        },
        methods: {
            history() {
                history.go(-1)
            },
            class_change(){
                this.show = !this.show
            }
        }
	}
</script>

<style lang="less" scoped>
.yuyue{
    width: 100%; padding-top: 15vw; font-size: 4vw;
}
/*顶部*/
#nav{
    width: 100%; height: 15vw;
    position: fixed; top: 0;
    background-color: black; color: white;
}
#nav .header{
    width: 100%; height: 100%;
    text-align: center;
    line-height: 15vw;
} 
.fa-angle-left{
    float: left; margin-left: 5vw;
    font-size: 10vw;
    line-height: 14vw;
}
#nav .header span{
    margin-left: -8vw;
    font-size: 5vw; 
    line-height: 15vw;
}
#nav>img{
    margin-top: -5vw; width: 100%;
}
.xunze{
    display: inline-block;
    width: 100%; height: 13vw;
    line-height: 13vw; padding-left: 10vw;
}



/**/
.Wallet_main{
    width: 100%;
    .font1{font-family:PingFang-SC-Medium; font-weight: Medium;}
    .font2{font-family:PingFang-SC-Regular; font-weight: Regular;}
    .integral{
        width: 90%; height: 38vw; margin: 0 auto; border-bottom: 0.3vw dashed rgba(206,206,206,1); 
        padding-top: 10vw; text-align: center; line-height: 8vw; .font2; color:rgba(128,128,128,1);
        span:nth-child(3){
            .font1; color:rgba(75,75,75,1); font-size: 8vw;
        }
    }
    .class{width: 100%; display: flex; justify-content: space-around;}
    .integral_class{
        height: 12vw; line-height: 16vw; .class; .font1;
    }
    .integral_bottom{
        height: 0.5vw; .class;
        div{ width: 8vw; height: 100%; }
        .back_color{ background-color: rgba(43,43,43,1); }
    }
    .integral_content{
        width: 100%; border-top: 3vw solid gainsboro; .font2;
        .add_reduce{
            width: 90%; height: 19vw; margin: 0 auto; display: flex; justify-content: space-between;
            border-bottom: 0.3vw solid rgba(206,206,206,1); line-height: 5.3vw; padding-top: 4vw;
            .date{
                color:rgba(128,128,128,1); font-size: 3.3vw;
            }
        }
    }
    .checked{
        color:rgba(255,139,75,1);
    }
    .content{
        padding-left: 5%; padding-top: 5vw;
        p{ .font1; color:rgba(26,26,26,1); }
        ol{margin-bottom: 5vw; padding: 0 5vw;}
        li{.font2; color:rgba(128,128,128,1); list-style: decimal; }
    }
}

.btn{
    font-family:PingFang-SC-Bold; font-weight: Bold; color:rgba(255,255,255,1); font-size: 4.5vw;
    width: 90%; height: 13vw; position: fixed; bottom: 10vw; left: 5%; background-color:rgba(255,139,75,1);
    box-shadow:0px 0px 10px rgba(43,43,43,0.1); border-radius: 1.5vw; outline: none!important;
}
</style>