
<template>
    <!--底部-->
		
	<div>
		<nav>
			<router-link to="/" exact>
				<div class="hom">
					<i class="icon iconfont icon-shouye"></i>
					<p>首页</p>
				</div>
			</router-link>
			<router-link to="/Myorder">
				<div class="hom">
					<i class="icon iconfont icon-dingdan"></i>
					<p>订单</p>
				</div>
			</router-link>
			<router-link to="/My">
				<div class="hom">
					<i class="icon iconfont icon-wode1"></i>
					<p>我的</p>
				</div>
			</router-link>
		</nav>
	</div>


</template>

<script>
    export default {
        name: "dibu",
        data(){
                return{ 
					showMenu: false,
                }
        },
		components: {
			
        },
        methods: {
			
		},
	    created() {
			
		}
    }
</script>


<style scoped>
/*底部*/
nav{
    position: fixed;
    bottom: 0;
    width: 100%;
	display: flex; justify-content: space-between;
    height: 13vw; z-index: 11;
    background-color: white;
	box-shadow: 0.1vw 0vw 3vw gray;
}
nav a{
	 color: #7a7a7a; outline: none; text-decoration: none;
}
.hom{
	width: 20vw; text-align: center; padding-top: 1vw;
}
i{
	font-size: 5.5vw; height: 7vw;
}
p{
	font-size: 3.5vw; 
}



.router-link-active{
  	color: #f96401;
}
/*.home{
	background: url("../assets/img/dibu/tab_home@2x.png") no-repeat;
	background-size: 100% 90%; background-position-y: 1vw;
}
.router-link-active .home{
	background: url("../assets/img/dibu/tab_home_select@2x.png") no-repeat;
	background-size: 100% 90%; background-position-y: 1vw;
}
.shop{
	background: url("../assets/img/dibu/收益拷贝@2x.png") no-repeat;
	background-size: 100% 90%; background-position-y: 1vw;
}
.router-link-active .shop{
	background: url("../assets/img/dibu/收益@2x.png") no-repeat;
	background-size: 100% 90%; background-position-y: 1vw;
}
.find{
	background: url("../assets/img/dibu/tab_guide@2x.png") no-repeat;
	background-size: 100% 90%; background-position-y: 1vw;
}
.router-link-active .find{
	background: url("../assets/img/dibu/tab_guide_select@2x.png") no-repeat;
	background-size: 100% 90%; background-position-y: 1vw;
}
.my{
	background: url("../assets/img/dibu/tab_mine@2x.png") no-repeat;
	background-size: 100% 90%; background-position-y: 1vw;
}
.router-link-active .my{
	background: url("../assets/img/dibu/tab_mine_select@2x.png") no-repeat;
	background-size: 100% 90%; background-position-y: 1vw;
}*/

</style>