<template>
	
    <div class="yuyue">
        <nav id="nav">
            <div class="header">
                <i @click="history" class="fa fa-angle-left" aria-hidden="true"></i>
                <span>地址管理</span>
            </div>
        </nav>
        
        
        <div class="dizhi">
            <div v-for="(item,index) in data" :key="index">
                <div @click="xuanze(index)" class="dizhi1">
                    <p><span>{{item.address.split('++++')[1]}}</span><span>{{item.address.split('++++')[2]}}</span></p>
                    <span>{{item.address.split('++++')[0]}}</span>
                </div>
                <div class="dizhi2">
                    <p>
                        <!--<input class="magic-radio" @click="moRen(index)" type="radio" name="radio" id="r2" value="option2" :checked="item.isdefault == 1">
			            <label for="r2" class="mo">默认地址</label>-->
                        <van-radio @click="moRen(index)" :name="index" v-model="radio">设为默认地址</van-radio>
                    </p>
                        <span @click="shanchu(index)" class="fa fa-trash-o">&nbsp;&nbsp;删除</span>
                        <span @click="bianji(index)" class="fa fa-pencil-square-o">&nbsp;&nbsp;编辑</span>
                </div>
            </div>
        </div>

        <div class="diZhi" v-if="data.length == 0">
            <p>暂无收货地址</p>
        </div>

        <!--<router-link to="/Newaddress">-->
            <button @click="xinzen" type="button" class="btn"><span class="glyphicon glyphicon-plus">
                </span>&nbsp;&nbsp;新建地址
            </button>
        <!--</router-link>-->
    </div>

</template>

<script>
	export default {
		name: "address-item",
        data(){
            return{
                data:'',radio:0
            }
        },
        created(){
            this.shuaxing()
        },
        methods: {
            history() {
                history.go(-1)
            },
            bianji(index){
                this.$store.commit('addresss',this.data[index].address)
                this.$router.push({path:'/Newaddress',query:{id:this.data[index].id,a:this.$route.query.xuanzeAddress,b:this.$route.query.xuanzeAddress1}})
            },
            shanchu(index){
                this.$axios.post(this.$httpUrl.deladress,$.param({access_type:'WXH5', wxh: this.$storage.getStore('wx'), openId:this.$storage.getStore('openIds'),id:this.data[index].id}))
                .then(response => {
                    // console.log(response.data)
                    if (response.data.code == 200) {
                        this.shuaxing()
                    } else {
                        this.$vux.loading.show({
                            text: response.data.message
                        })
                        setTimeout(() => {
                            this.$vux.loading.hide()
                        }, 3000)
                    }
                })
                .catch(error => {
                    // console.log(error)
                    this.$vux.loading.show({
                        text: '服务器异常'
                    })
                    setTimeout(() => {
                        this.$vux.loading.hide()
                    }, 3000)
                })
            },
            moRen(index){
                this.$axios.post(this.$httpUrl.defaultById,$.param({access_type:'WXH5', wxh: this.$storage.getStore('wx'), openId:this.$storage.getStore('openIds'),id:this.data[index].id}))
                .then(response => {
                    // console.log(response.data)
                    if (response.data.code == 200) {
                        // this.shuaxing()
                        this.radio = index
                        this.$storage.setStore('dizhis',this.data[index].address)
                    } else {
                        this.$vux.loading.show({
                            text: response.data.message
                        })
                        setTimeout(() => {
                            this.$vux.loading.hide()
                        }, 3000)
                    }
                })
                .catch(error => {
                    // console.log(error)
                    this.$vux.loading.show({
                        text: '服务器异常'
                    })
                    setTimeout(() => {
                        this.$vux.loading.hide()
                    }, 3000)
                })
            },
            shuaxing(){
                this.$axios.post(this.$httpUrl.listadress,$.param({access_type:'WXH5', wxh: this.$storage.getStore('wx'), openId:this.$storage.getStore('openIds'),limit:'100',current:'1'}))
                .then(response => {
                    // console.log(response.data)
                    if (response.data.code == 200) {
                        this.data = response.data.data
                        // if(this.radio == 0){
                        //     this.moRen(this.radio)
                        // }
                        if(this.data.length > 0){
                            var a = new Array
                            for(var i = 0;i < this.data.length;i ++){
                                if(this.data[i].isdefault == 1){
                                    a.push(i)
                                    this.radio = i
                                    this.$storage.setStore('dizhis',this.data[i].address)
                                }
                            }
                            if(a.length == 0){
                                this.moRen(0)
                            }
                        }
                    } else {
                        this.$vux.loading.show({
                            text: response.data.message
                        })
                        setTimeout(() => {
                            this.$vux.loading.hide()
                        }, 3000)
                    }
                })
                .catch(error => {
                    // console.log(error)
                    this.$vux.loading.show({
                        text: '服务器异常'
                    })
                    setTimeout(() => {
                        this.$vux.loading.hide()
                    }, 3000)
                })
            },
            xuanze(index){
                if(this.$route.query.xuanzeAddress != null || this.$route.query.xuanzeAddress1 != null){
                    this.$storage.setStore('dizhis',this.data[index].address)
                    history.go(-1)
                }
            },
            xinzen(){
                this.$router.push({path:'Newaddress',query:{a:this.$route.query.xuanzeAddress,b:this.$route.query.xuanzeAddress1}})
            }
        }
	}
</script>

<style scoped>
@import '../../assets/vux.1.css';
.yuyue{
    width: 100%; padding-top: 15vw; padding-bottom: 20vw;
}
/*顶部*/
#nav{
    width: 100%; height: 15vw;
    position: fixed; top: 0;
    background-color: black; color: white
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
    font-size: 5.5vw; 
    line-height: 15vw;
}
#nav>img{
    margin-top: -5vw; width: 100%;
}


.diZhi{
    width: 100%; height: 10vw; margin: 40vw auto; text-align: center; color: gray;
}

/*地址*/
.dizhi{
    width: 100%;
    /*border: 1px solid red;*/
}
.dizhi1{
    width: 100%;
    border-bottom: 0.3vw solid gainsboro;
    padding: 3vw 5vw; font-size: 4vw;
}
.dizhi p span:nth-child(2){
    padding-left: 5vw;
}
.dizhi2{
    width: 100%; height: 10vw; font-size: 4vw; color: gray;
    border-bottom: 5px solid gainsboro;
}
.dizhi2>p{
    display: inline-block; 
    width: 30%; height: 10vw; line-height: 10vw;
}
.dizhi2 span{
    float: right; margin-right: 5vw; margin-top: 2vw;
}
/*.dizhi2 p .checkbox-inline{
    float: left; margin-top: -1vw;
}*/
.dizhi2 .fa{
    font-size: 4vw;
}
.btn{
    position: fixed; bottom: 5vw; background-color: black;
    width: 80%; height: 12vw; border-radius: 10vw; color: white;
    margin-left: 10%; font-size: 4.6vw;
}
a:focus{
    outline: none;
}


@keyframes hover-color {
  from {
    border-color: #c0c0c0; }
  to {
    border-color: #3e97eb; } }

.magic-radio{
  position: absolute;
  display: none; }

.magic-radio[disabled]{
  cursor: not-allowed; }

.magic-radio + label{
  position: relative;
  display: block; line-height: 9vw;
  padding-left: 12vw;
  cursor: pointer;
  }
  .magic-radio + label:hover:before{
    animation-duration: 0.4s;
    animation-fill-mode: both;
    animation-name: hover-color; }
  .magic-radio + label:before{
    position: absolute;
    top: 2vw;
    left: 5vw;
    display: inline-block;
    width: 5vw;
    height: 5vw;
    content: '';
    border: 0.3vw solid #c0c0c0; }
  .magic-radio + label:after{
    position: absolute;
    display: none;
    content: ''; }

.magic-radio:checked + label:before{
  animation-name: none; }

.magic-radio:checked + label:after{
  display: block; }

.magic-radio + label:before {
  border-radius: 50%; }

.magic-radio + label:after {
  top: 3vw;
  left: 6vw;
  width: 3vw;
  height: 3vw;
  border-radius: 50%;
  background: #3e97eb; }

.magic-radio:checked + label:before {
  border: 0.3vw solid #3e97eb; }

.magic-radio:checked[disabled] + label:before {
  border: 0.3vw solid #c9e2f9; }

.magic-radio:checked[disabled] + label:after {
  background: #c9e2f9;}

</style>