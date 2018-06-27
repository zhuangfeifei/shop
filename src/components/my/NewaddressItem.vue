<template>
	
    <div class="yuyue">
        <nav id="nav">
            <div class="header">
                <i @click="history" class="fa fa-angle-left" aria-hidden="true"></i>
                <span>新增地址</span>
            </div>
        </nav>
        
        
        <div class="dizhi">
            <form class="form-horizontal" role="form">
                <div class="lianxi">
                    <label for="firstname" class="col-sm-2 control-label">收货人</label>
                    <input type="text" class="form-control" id="firstname" placeholder="请输入姓名" value="">
                    <input class="magic-radio" type="radio" name="radio" id="r2" value="先生" checked>
                    <label for="r2" class="mo">先生</label>
                    <input class="magic-radio" type="radio" name="radio" id="r1" value="女士">
                    <label for="r1" class="mo">女士</label>
                </div>
                <div class="shouji">
                    <label for="lastname" class="col-sm-2 control-label">手机号</label>
                    <input type="text" class="form-control" id="lastname" placeholder="请输入手机号">
                </div>
                <!--<router-link to="/Maps">-->
                <!--<a href="../../static/Ditu.html">-->
                    <div @click="maps" class="shouhuo">
                        <label for="firstname" class="col-sm-2 control-label shou">收货地址</label>
                        <div id="dizhi">
                            <i class="fa fa-map-marker" aria-hidden="true"></i>
                            {{this.$route.query.dizhis}}
                        </div>
                    </div>
                <!--</a>-->
                <!--</router-link>-->
                 <div class="menpai">
                    <label for="firstname" class="col-sm-2 control-label">门牌号</label>
                    <input type="text" class="form-control" id="firstname1" placeholder="详细地址">
                </div>
                <!--<router-link to="Address">-->
                    <button @click="tianjia" type="button" class="btn">保存</button>
                <!--</router-link>-->
            </form>
            <van-checkbox class="mr" v-model="checked" :change="changes(checked)">设为默认地址</van-checkbox>
        </div>
    </div>

</template>

<script>
	export default {
		name: "address-item",
        data(){
            return{
                note: {
				backgroundImage: "url(" + require("../../assets/img/首页_1/inputradio.gif") + ")",
				backgroundRepeat: "no-repeat",
				backgroundSize: "100% 100%",backgroundPosition: "-5vw 0",
                },
                zxc:'',values:'',checked:true
            }
        },
        created(){
            $(document).ready(()=>{
                if(this.$route.query.dizhis != null){
                    $('#firstname').val(this.$store.state.mapname)
                    $('#firstname1').text(this.$store.state.mapdizhi)
                    $('#lastname').val(this.$store.state.mapphone)
                }
                if(this.$route.query.id != null){
                    var dizhi = this.$store.state.address
                    var changdu = dizhi.split('++++')[1].length
                    $('#firstname').val(dizhi.split('++++')[1].substring(0,changdu-2))
                    // $('#dizhi').text(dizhi.split('++++')[0])
                    $('#lastname').val(dizhi.split('++++')[2])
                }
            })
        },
        methods: {
            history() {
                history.go(-1)
            },
            changes(checked){
                // console.log(checked)
            },
            maps(){
                this.$store.commit('mapnames',$('#firstname').val())
                this.$store.commit('mapphones',$('#lastname').val())
                this.$store.commit('mapdizhis',$('#firstname1').val())
                if (this.$route.query.a == 1) {
                    this.$router.push({path:'Maps',query:{a:1}})
                    return
                }
                if (this.$route.query.b == 1) {
                    this.$router.push({path:'Maps',query:{b:1}})
                    return
                }
                this.$router.push({path:'Maps'})
            },
            tianjia(){
                var isMan
                $("input[type=radio]:radio:checked").each(function(i) {
                    isMan = $(this).val()
                })
                if(this.$route.query.dizhis != null){
                    var dizhi = this.$route.query.dizhis + $('#firstname1').val() +'++++'+ $('#firstname').val() + isMan +'++++'+ $('#lastname').val()
                }else{
                    var dizhi = $('#firstname1').val() +'++++'+ $('#firstname').val() + isMan +'++++'+ $('#lastname').val()
                }
                // console.log(dizhi)
                // 苏州市相城区华元路818号方圆里招商中心  18136940844
                var ismr = 0
                if(this.checked){
                    ismr = 1
                }
                // console.log(ismr)
                if(this.$route.query.id != null){
                    this.bianji(dizhi,ismr)
                }else{
                    this.chuangjian(dizhi,ismr)
                }
            },
            chuangjian(dizhi,ismr){
                this.$axios.post(this.$httpUrl.addadress,$.param({access_type:'WXH5', wxh: this.$storage.getStore('wx'), openId:this.$storage.getStore('openIds'),address:dizhi,isdefault:ismr}))
                .then(response => {
                    // console.log(response.data)
                    if (response.data.code == 200) {
                        this.$vux.toast.show({
                            text: response.data.message
                        })
                        setTimeout(() => {
                            this.$vux.toast.hide()
                            if(this.$route.query.a == 1){
                                this.$router.push({path:'Buy1'})
                                return
                            }
                            if(this.$route.query.b == 1){
                                this.$router.push({path:'Buy'})
                                return
                            }
                            if(this.$route.query.b == null && this.$route.query.b == null){
                                this.$router.push({path:'Address'})
                                return
                            }
                        }, 1000)
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
            bianji(dizhi,ismr){
                this.$axios.post(this.$httpUrl.updateadress,$.param({access_type:'WXH5', wxh: this.$storage.getStore('wx'), openId:this.$storage.getStore('openIds'),id:this.$route.query.id,address:dizhi,isdefault:ismr}))
                .then(response => {
                    // console.log(response.data)
                    if (response.data.code == 200) {
                        this.$vux.toast.show({
                            text: response.data.message
                        })
                        setTimeout(() => {
                            this.$vux.toast.hide()
                            if(this.$route.query.a != null){
                                this.$router.push({path:'Buy1'})
                                return
                            }
                            if(this.$route.query.b != null){
                                this.$router.push({path:'Buy'})
                                return
                            }
                            if(this.$route.query.b == null){
                                this.$router.push({path:'Address'})
                                return
                            }
                        }, 1000)
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
            }
        },
        // beforeDestroy(){
        //     bus.$off('asd')
        // }
	}
</script>

<style scoped>
@import '../../assets/vux.1.css';
.yuyue{
    width: 100%; padding-top: 15vw;
}
/*顶部*/
#nav{
    width: 100%; height: 15vw;
    position: fixed; top: 0;
    background-color: black; z-index: 10000; color: white;
}
#nav .header{
    width: 100%; height: 100%;
    text-align: center;
    line-height: 15vw;
} 
.fa-angle-left{
    float: left; margin-left: 5vw;
    font-size: 10vw;
    line-height: 15vw;
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

/*地址*/
.dizhi{
    width: 100%; font-size: 4vw;
    /*border: 1px solid red;*/
}
.form-control{
    width: 70%; margin-left: 20%; border: 0.3vw solid gray; background: none;
}
label{
    float: left; line-height: 10vw;
    width: 25%;
}
.shouji{
    clear: both; width: 100%; height: 13vw;
    border-bottom: 0.3vw solid gainsboro; margin-top: 3vw;
}
.lianxi{
    width: 100%; height: 20vw;
    border-bottom: 0.3vw solid gainsboro;
    margin-top: 3vw;
}
.shouhuo{
    width: 100%; height: 13vw; margin-top: 3vw; line-height: 10vw;
    border-bottom: 0.3vw solid gainsboro;
}
.menpai{
    width: 100%; height: 13vw; margin-top: 3vw;
    border-bottom: 0.3vw solid gainsboro;
}
.shou{
    width: 30vw;
}
#firstname,#firstname1,#lastname{
    width: 70%; height: 10vw; font-size: 3.5vw;
}
.btn{
    position: absolute; bottom: 10vw; outline: none!important;
    width: 80%; height: 12vw; border-radius: 10vw; background-color: black; color: white;
    margin-left: 10%; font-size: 4.6vw;
}
.allmap{
    width: 300px; height: 30px;
    border: 0.3vw solid red;
}
a{
    color: black;
}
a:hover{
    color: black; text-decoration: none;
}
a:focus{
    outline-style: none;
}
.fa-map-marker{
    font-size: 5vw; color: gray; margin-right: 2vw;
}

#dizhi{
    width: 70%; height: 10vw; font-size: 4vw; position: relative; left: -5vw;
    display: -webkit-box; -webkit-box-orient: vertical; -webkit-line-clamp: 1; overflow: hidden;
}

.mr{
    margin: 2vw 5vw; font-size: 4vw;
}
.van-checkbox__input{
    width: 3vw!important; height: 3vw!important;
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
  vertical-align: middle; }
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