<template>

	<div class="my">
		
		<my-item>我的</my-item>

        <di-bu>底部</di-bu>

	</div>

</template>

<script>
    import Dibu from "../components/Dibu"
	import MyItem from "../components/my/MyItem"
	export default {
		name: "my",
		data(){
			return{
				showMenu: false,	
			}
		},
        components: {
            "my-item": MyItem,
			"di-bu": Dibu,
        },
		methods: {
			
		},
	    created() {
	  	
	    }
	}
</script>

<style scoped>
.my{
	width: 100%;
    /*background-color: gray;*/
}
	

/*底部*/
nav{
    position: fixed;
    bottom: 0;
    width: 100%;
    height: 15vw;
    background-color: white;
    border-top: 0.3vw solid lightgray;
}
#dao{
    display: inline-block;
    width: 20%;
    height: 100%;
    outline: none;
    float: left;
}
#dao>div{
    width: 8vw; height: 8vw;
    margin: 0 auto;
    text-align: center; font-size: 8vw;
}
#dao>p{
    text-align: center; margin: 0.5vw auto 0 auto;
    font-size: 4vw;
}
nav a{
	 color: black;
}
.glyphicon-home{
	font-size: 6.5vw;
}

/*圆圈*/
#jia{
	position: fixed;bottom: 2vw;
	width: 11vw; height: 11vw;
	left: 45%; 
	text-align: center;
	z-index: 5; background-color: #1E9FFF; border-radius: 50%;
}
#jia>img{width: 8vw; height: 8vw; margin: 1.5vw}


</style>