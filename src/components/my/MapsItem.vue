<template>  
  <div>  
		<div id="nav">
			<i @click="history" class="fa fa-angle-left" aria-hidden="true"></i>
			<input type="text" id="suggestId" name="address_detail" placeholder="搜索" class="input_style">
		</div>

		<div id="container" class="mymap"></div>
		<div class="gun">
			<div v-show="isShow == 0" @click="fanhuiDizhi(index)" v-for="(item,index) in this.dizhi" :key="index" id="panel">
				<div class="dizhi">
					<p>{{item.name}}</p>
					<p>地址：{{item.cityname+item.adname+item.address}}</p>	
				</div>
				<div class="dizhiimg">
					<img v-if="item.photos.length > 0" :src="item.photos[0].url" alt="">
				</div>
			</div>	
			<div v-show="isShow == 1" @click="fanhuiDizhi1(index)" v-for="(item,index) in this.dizhi1" :key="index" id="panels">
				<div class="dizhi1">
					<p>{{item.name}}</p>
					<p>地址：{{item.address}}</p>	
				</div>
			</div>	
		</div>
  </div>  
</template>  
<script>   
// import {MP} from '../../map.js' 
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
		const map = new AMap.Map('container', {
			resizeEnable: true,
			zoom: 12,
			scrollWheel: false
		})
		var toolBar = new AMap.ToolBar({
			visible: false
		})
		map.addControl(toolBar)
		toolBar.show()

		// 定位
			this.dingwei(map)
			// 周边检索
			// this.dingjian(map)
			// 输入提示
			this.loadmap(map)
			// 拖拽
			// this.tuozhuai(map)
		
	},
	methods: {
		history() {
			history.go(-1)
		},
		tuozhuai(map){
			AMapUI.loadUI(['misc/PositionPicker'], function(PositionPicker) {
				var positionPicker = new PositionPicker({
					mode: 'dragMap',
					map: map
				})
			})
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
				var str = ['定位成功'];
				str.push('经度：' + data.position.getLng())
				str.push('纬度：' + data.position.getLat())
				if (data.accuracy) {
					str.push('精度：' + data.accuracy + ' 米')
				}//如为IP精确定位结果则没有精度信息
				str.push('是否经过偏移：' + (data.isConverted ? '是' : '否'))
				// alert(str);
				_this.dingjian(map,data.position.getLng(),data.position.getLat())
			}
			//解析定位错误信息
			function onError(data) {
				alert('定位失败');
			}
		},
		dingjian(map,lng,lat){
			this.isShow = 0
			AMap.service(["AMap.PlaceSearch"], () => {
				var placeSearch = new AMap.PlaceSearch({ //构造地点查询类
					pageSize: 20,
					// type: '餐饮服务',
					pageIndex: 1,
					city: "035", //城市
					map: map,
					// panel: "panel"
				})
				
				var cpoint = [lng, lat]; //中心点坐标
				placeSearch.searchNearBy('', cpoint, 200, (status, result) => {
					this.dizhi = result.poiList.pois
					// console.log(result.poiList.pois)
				})
			})
		},
		loadmap(map){
			// 输入提示
			var autoOptions = {
				input: "suggestId"
			};
			var auto = new AMap.Autocomplete(autoOptions);
			var placeSearch = new AMap.PlaceSearch({
				map: map
			});  //构造地点查询类
			AMap.event.addListener(auto, "select", select);//注册监听，当选中某条记录时会触发
			var _this = this
			function select(e) {
				placeSearch.setCity(e.poi.adcode);
				placeSearch.search(e.poi.name);  //关键字查询查询
				_this.jiansuo(e.poi.name,map)
				console.log(e)
			}
		},
		jiansuo(name,map){
			this.isShow = 1
			var _this = this
			var placeSearchOptions = { //构造地点查询类
				pageSize: 20,
				pageIndex: 1,
				city: "035" //城市
			};
			var placeSearch = new AMap.PlaceSearch(placeSearchOptions)
			placeSearch.search(name, callback);
			var placeSearchRender = new Lib.AMap.PlaceSearchRender()
			function callback(status, result) {
				// console.log(result)
				if (status === 'complete' && result.info === 'OK') {
					placeSearchRender.autoRender({
						placeSearchInstance: placeSearch,
						methodName: "search",
						methodArgumments: [name, callback],
						data: result,
						map: map,
						// panel: "panels"
					})
					_this.dizhi1 = result.poiList.pois
					// console.log(_this.dizhi1)
				}
			}
		},
		fanhuiDizhi(index){
			var dizhi = this.dizhi[index].cityname + this.dizhi[index].adname + this.dizhi[index].address
			// console.log(dizhi)
			if (this.$route.query.a == 1) {
				this.$router.push({ path: 'Newaddress', query: { dizhis: dizhi, a: 1 } })
				return
			}
			if (this.$route.query.b == 1) {
				this.$router.push({ path: 'Newaddress', query: { dizhis: dizhi, b: 1 } })
				return
			}
			this.$router.push({path:'Newaddress',query:{dizhis:dizhi}})
		},
		fanhuiDizhi1(index){
			var dizhi = this.dizhi1[index].address
			// console.log(dizhi)
			if (this.$route.query.a == 1) {
				this.$router.push({ path: 'Newaddress', query: { dizhis: dizhi, a: 1 } })
				return
			}
			if (this.$route.query.b == 1) {
				this.$router.push({ path: 'Newaddress', query: { dizhis: dizhi, b: 1 } })
				return
			}
			this.$router.push({path:'Newaddress',query:{dizhis:dizhi}})
		}
	},
}  
</script>  
<style scoped> 
@import '../../assets/vux.1.css';
#nav{
	width: 100%; height: 12vw;position: fixed; top: 0; left: 0; background: rgba(0,0,0,0.3); z-index: 1000;
	line-height: 12vw;
} 

.fa{
    float: left; margin-left: 5vw; margin-top: 0.5vw;
    font-size: 10vw; color: white;
}

.mymap{
  width: 100%; height: 50vh;
}

#suggestId{
	width: 60vw; height: 9vw;  font-size: 4vw; margin-left: 13vw; padding-left: 2vw; background: rgba(0,0,0,0.3);
	border: 0; color: white; margin-top: 1.5vw; line-height: 6.5vw;
}
input::-moz-placeholder{
    font-size: 4vw; color: white!important;
}
::-webkit-input-placeholder{
    font-size: 4vw; color: white!important;
} 
.gun{
	width: 100%; height: 50vh; overflow-y: scroll; padding-bottom: 3vw;
}


#panel{
	width: 100%; height: 20vw; border-bottom: 1px solid gray; padding-right: 2.5vw;
}
.dizhi{
	width: 70%; height: 100%; float: left; padding: 2vw; font-size: 4vw;
}
.dizhi>p{
	margin: 0; padding: 0; color: black;
}
.dizhi>p:nth-child(2){
	font-size: 3.5vw; color: gray; margin-top: 1vw; display: -webkit-box; -webkit-box-orient: vertical; -webkit-line-clamp: 2; overflow: hidden;
}
.dizhiimg{
	width: 25%; height: 100%; float: right;
}
.dizhiimg img{
	width: 100%; height: 90%; margin-top: 4%;
}

#panels{
	width: 100%; height: 20vw; border-bottom: 1px solid gray; padding-right: 2.5vw;
}
.dizhi1{
	width: 100%; height: 100%; float: left; padding: 2vw; font-size: 4vw;
}
.dizhi1>p{
	margin: 0; padding: 0; color: black;
}
.dizhi1>p:nth-child(2){
	font-size: 3.5vw; color: gray; margin-top: 1vw; display: -webkit-box; -webkit-box-orient: vertical; -webkit-line-clamp: 2; overflow: hidden;
}
</style>  