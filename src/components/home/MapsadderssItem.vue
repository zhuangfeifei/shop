<template>  
  <div>  
		<div id="nav">
			<i @click="history" class="fa fa-angle-left" aria-hidden="true"></i>
		</div>

		<div id="container" class="mymap"></div>
		<div id="panel"></div>
  </div>  
</template>  
<script>   
// import {MP} from '../../map.js' 
// import bus from "../../Bus.js"
export default {  
    components: {
		// comHeader  
	},
	data() {
		return {
			massage: '', msg: '',
			isShow:0,dizhi:'',dizhi1:''
		}
	},
	mounted() {
		 //基本地图加载
		var map = new AMap.Map("container", {
			resizeEnable: true,
			// center: [116.397428, 39.90923],//地图中心点
			zoom: 13 //地图显示的缩放级别
		});
		
		this.dingwei(map)
	},
	methods: {
		history() {
			history.go(-1)
		},
		dingwei(map){
			var geolocation
			map.plugin('AMap.Geolocation', function() {
				geolocation = new AMap.Geolocation({
					enableHighAccuracy: true,//是否使用高精度定位，默认:true
					timeout: 10000,          //超过10秒后停止定位，默认：无穷大
					buttonOffset: new AMap.Pixel(10, 20),//定位按钮与设置的停靠位置的偏移量，默认：Pixel(10, 20)
					zoomToAccuracy: true,      //定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
					buttonPosition: 'RB'
				});
				map.addControl(geolocation);
				geolocation.getCurrentPosition();
				AMap.event.addListener(geolocation, 'complete', onComplete);//返回定位信息
				AMap.event.addListener(geolocation, 'error', onError);      //返回定位出错信息
			})
			//解析定位结果
			var _this = this
			function onComplete(data) {
				_this.daohang(map,data.position.getLng(),data.position.getLat())
			}
			//解析定位错误信息
			function onError(data) {
				alert('定位失败');
			}
		},
		daohang(map,lng,lat){
			//构造路线导航类
			var driving = new AMap.Driving({
				map: map,
				panel: "panel"
			}); 
			// console.log(driving)
			// 根据起终点经纬度规划驾车导航路线
			driving.search(new AMap.LngLat(lng, lat), new AMap.LngLat(120.642244,31.373496));
		}
	},
}  
</script>  
<style scoped> 
@import '../../assets/vux.1.css';
#nav{
	width: 100%; height: 12vw;position: fixed; top: 0; left: 0; z-index: 1000;
	line-height: 12vw;
} 

.fa{
    float: left; margin-left: 5vw; margin-top: 0.5vw;
    font-size: 10vw; color: black;
}

.mymap{
  width: 100%; height: 60vh;
}


.amap-lib-driving{
	width: 100%; margin-top: 5vw;
}
.amap-call{
	color: blue;
}


</style>  