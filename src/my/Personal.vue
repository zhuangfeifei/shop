<template>

	<div class="my">
		
	
		<personal-item>个人信息</personal-item>

        
	
		<!--<di-bu>底部</di-bu>-->


	</div>

</template>

<script>
	import PersonalItem from "../components/my/PersonalItem";
	import Dibu from "../components/Dibu";
	export default {
		name: "my",
		data(){
			return{
				
			}
		},
        components: {
            "personal-item": PersonalItem,
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
	width: 100%; height: 100vh;
    /*background-color: gray;*/
}
	


</style>