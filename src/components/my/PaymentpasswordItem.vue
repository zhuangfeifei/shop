<template>
	
    <div class="yuyue">
        <nav id="nav">
            <div class="header">
                <i @click="history" class="fa fa-angle-left" aria-hidden="true"></i>
                <span>设置支付密码</span>
            </div>
        </nav>
        
        <div class="liu">
            <!--<p>请输入原支付密码进行身份校验</p>
            <input type="text">-->
            <p>请输入密码</p>
            <div class="ge">
                <input type="password" v-model="mm" maxlength = "6">
                <div class="ge1">
                    <div><span v-show="mm.length > 0">●</span></div>
                    <div><span v-show="mm.length > 1">●</span></div>
                    <div><span v-show="mm.length > 2">●</span></div>
                    <div><span v-show="mm.length > 3">●</span></div>
                    <div><span v-show="mm.length > 4">●</span></div>
                    <div><span v-show="mm.length > 5">●</span></div>
                </div>
            </div>
            <p>请再次输入密码</p>
            <div class="ge">
                <input id="password" v-model="mm1" type="password" maxlength = "6">
                <div class="ge1">
                    <div><span v-show="mm1.length > 0">●</span></div>
                    <div><span v-show="mm1.length > 1">●</span></div>
                    <div><span v-show="mm1.length > 2">●</span></div>
                    <div><span v-show="mm1.length > 3">●</span></div>
                    <div><span v-show="mm1.length > 4">●</span></div>
                    <div><span v-show="mm1.length > 5">●</span></div>
                </div>
            </div>
        </div>
        <button @click="qwe" type="button" class="btn btn-primary">确认</button>
    </div>

</template>

<script>
	export default {
		name: "paymentpassword-item",
        data(){
            return{
                mm:'',mm1:''
            }
        },
        methods: {
            history() {
                history.go(-1)
            },
            qwe(){
                var mm = $('#password').val()
                if ($(':password')[0].value != $(':password')[1].value) {
                    this.$vux.loading.show({
                        text: '两次输入的密码不一致'
                    })
                    setTimeout(() =>{
                        this.$vux.loading.hide()
                    }, 3000);
                    return
                }
                this.$axios.post(this.$httpUrl.paypwd,$.param({access_type:'WXH5', wxh: this.$storage.getStore('wx'), openId:this.$storage.getStore('openIds'),pwd:mm}))
                .then(response => {
                    // console.log(response.data)
                    if (response.data.code == 200) {
                        this.$vux.toast.show({
                            text: '设置成功'
                        })
                        setTimeout(() => {
                            this.$vux.toast.hide()
                            this.$router.push({path:'Systemsettings'})
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
        }
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
    background-color: white;
    border-bottom: 2px solid gainsboro;
}
#nav .header{
    width: 100%; height: 100%;
    text-align: center;
    line-height: 15vw;
} 
.fa-angle-left{
    float: left; margin-left: 5vw;
    font-size: 10vw;
    line-height: 15vw; color: black
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
.liu{
    width: 100%; margin-top: 3vw;
    font-size: 4vw; text-align: center;
}
.liu p{
    font-size: 4.5vw; margin-top: 5vw; clear: both;
}
input{
    width: 100%; height: 100%; font-size: 6vw; letter-spacing: 6.5vw;
    border: 0; background: none; position: absolute; top: 0; left: 0;
    opacity: 0;
    /*color:transparent;*/
    /*caret-color:rgba(0, 0, 0, 0);*/
    /*改变光标颜色*/
}

a:focus{
    outline: none;
}

.btn{
    outline: none!important; margin-top: 10vw;
    width: 60%; height: 12vw; border-radius: 1vw;
    margin-left: 20%; font-size: 4.6vw;
}


.ge{
    width: 60vw; height: 10vw; margin: 5vw auto; position: relative; 
}
.ge1{
    width: 100%; height: 100%; font-size: 7vw; font-weight: 600;
}
.ge1>div{
    width: 10vw; height: 100%; border: 0.3vw solid gainsboro; float: left; border-right: 0; text-align: center; line-height: 10vw;
}
.ge1>div:nth-child(6){
    border-right: 0.3vw solid gainsboro;
}
</style>