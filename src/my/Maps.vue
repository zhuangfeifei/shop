<template>
	<div>
        <maps-item>地图</maps-item>
        
	</div>
</template>

<script>
	import MapsItem from "../components/my/MapsItem";

	export default {
		name: "maps",
        data () {
            return {

            }
        },
        components: {
            "maps-item": MapsItem,
        },
        mounted() {
    //         $(function(){

	// 	$("#case3").bMap({name:"callback",callback:function(address,point){
	// 		$("#callback").html("您选择的地址是:"+JSON.stringify(address))
	// 	}});
	// })
        }
	}
</script>

<style scoped>

</style>