<template>
	
    <div class="yuyue">
        <nav id="nav">
            <div class="header">
                <i @click="history" class="fa fa-angle-left" aria-hidden="true"></i>
                <span>积分商城</span>
            </div>
        </nav>
        
        <div class="Integrals_mains">
            暂无内容
            <!--<div class="list" >
                <img src="../../assets/img/my/timg.jpg" alt="">
                <p>星巴克榛果拿铁中杯</p>
                <p><span>50积分</span><del>￥39</del></p>
            </div>
            <div class="list" >
                <img src="../../assets/img/my/timg.jpg" alt="">
                <p>星巴克榛果拿铁中杯</p>
                <p><span>50积分</span><del>￥39</del></p>
            </div>
            <div class="list" >
                <img src="../../assets/img/my/timg.jpg" alt="">
                <p>星巴克榛果拿铁中杯果拿铁中杯</p>
                <p><span>50积分</span><del>￥39</del></p>
            </div>
            <div class="list" >
                <img src="../../assets/img/my/timg.jpg" alt="">
                <p>星巴克榛果拿铁中杯果拿铁中杯</p>
                <p><span>50积分</span><del>￥39</del></p>
            </div>
            <div class="list" >
                <img src="../../assets/img/my/timg.jpg" alt="">
                <p>星巴克榛果拿铁中杯</p>
                <p><span>50积分</span><del>￥39</del></p>
            </div>
            <div class="list" >
                <img src="../../assets/img/my/timg.jpg" alt="">
                <p>星巴克榛果拿铁中杯</p>
                <p><span>50积分</span><del>￥39</del></p>
            </div>
            <div class="list" >
                <img src="../../assets/img/my/timg.jpg" alt="">
                <p>星巴克榛果拿铁中杯</p>
                <p><span>50积分</span><del>￥39</del></p>
            </div>-->
        </div>

        <!--<div class="top"><p>返回</p><p>顶部</p></div>-->
        
    </div>

</template>

<script>
import {httpUrl} from "../../api.js"
import { Loading, XButton} from 'vux'
	export default {
		name: "loginpassword-item",
        data(){
            return{
                Data:'',show:true
            }
        },
        created(){
            $(document).ready(()=>{
                $('.top').click(()=>{
                    $('body,html').animate({scrollTop:0},500)
                })
            })
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
    width: 100%; padding-top: 15vw; font-size: 4vw; background:rgba(232,232,232,1);
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
.font1{font-family:PingFang-SC-Medium; font-weight: Medium;}
.font2{font-family:PingFang-SC-Regular; font-weight: Regular;}
.Integrals_mains{
    width: 100%; font-size: 3.8vw; padding: 5vw;
    -moz-column-count:2; /* Firefox */
    -webkit-column-count:2; /* Safari 和 Chrome */
    column-count:2;    // 把div中的文本分为多少列
    -moz-column-gap: 5vw;
    -webkit-column-gap: 5vw;
    column-gap: 5vw;  // 规定列间隙
    // column-width 规定列宽
    .list{
        background:rgba(255,255,255,1); border-radius: 4vw; padding-bottom: 2vw; margin-bottom: 5vw;
        box-shadow:4px 0px 16px rgba(35,24,21,0.2); 
        -moz-page-break-inside: avoid; -webkit-column-break-inside: avoid; break-inside: avoid; // 避免元素内部断行并产生新列
        img{
            width: 100%; height: 30vw; border-top-left-radius: 4vw; border-top-right-radius: 4vw; margin-bottom: 2vw;
        }
        p{ padding: 0 3vw; margin: 0;}
        p:nth-child(3){ 
            color:rgba(255,139,75,1); margin-top: 2vw;
            del{ color:rgba(75,75,75,1); font-size: 3vw; margin-left: 3vw;}
        }
    }
}

.top{
    p{margin: 0; padding: 0;} font-size: 3.8vw;
    width: 16vw; height: 16vw; .font1; color:rgba(255,255,255,1);border-radius: 50%; position: fixed; bottom: 10vw; right: 5vw; line-height: 4.5vw;
    background:rgba(255,139,75,1); opacity:0.9; box-shadow:4px 0px 30px rgba(35,24,21,0.4); text-align: center; padding-top: 3.5vw;
}


</style>