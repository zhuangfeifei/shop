<template>
	<div>
        <mapsadderss-item>地图</mapsadderss-item>
        
	</div>
</template>

<script>
	import MapsadderssItem from "../components/home/MapsadderssItem";

	export default {
		name: "mapsadderss",
        data () {
            return {

            }
        },
        components: {
            "mapsadderss-item": MapsadderssItem,
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