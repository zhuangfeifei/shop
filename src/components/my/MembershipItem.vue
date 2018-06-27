<template>
	
    <div class="yuyue">
        <nav id="nav">
            <div class="header">
                <i @click="history" class="fa fa-angle-left" aria-hidden="true"></i>
                <span>会员信息</span>
            </div>
        </nav>
        
        <div class="Membership_main">
            <section><img :src="user.avatar" alt=""><img src="../../assets/img/my/按钮_个人信息_修改@2x.png" alt=""></section>
            <div class="main_input">
                <div>会员卡号</div><span>{{integral.cardno | filter}}</span>
            </div>
            <div class="main_input">
                <div>昵称</div><span>{{user.nickname}}</span>
            </div>
            <div class="main_input">
                <div>真实姓名</div><input type="text" v-model="value" placeholder="请输入真实姓名">
            </div>
            <div class="main_input">
                <div>手机号</div><span>{{user.phonenumber}}</span>
            </div>
            <div class="main_input_data">
                <datetime @on-change="change" class="date" :title="'出生年月'" v-model="values" :min-year="min" :max-year="max"></datetime>
                <!--<img src="../../assets/img/my/按钮_更多@2x.png" alt="">-->
            </div>
            <div class="main_inputs">
                <div>性别</div><div @click="sexChange"><span>{{menus[sex_key]}}</span><img src="../../assets/img/my/按钮_更多@2x.png" alt=""></div>
            </div>
            <router-link to="/Address">
                <div class="main_input">
                    <div>收货地址</div><img src="../../assets/img/my/按钮_更多@2x.png" alt="">
                </div>
            </router-link>
            <button @click="Preservation" class="Preservation">保存</button>
        </div>

        <actionsheet
      v-model="sexChecked"
      :menus="menus"
      @on-click-menu="sex_click"
      @on-after-hide="log('after hide')"
      @on-after-show="log('after show')"></actionsheet>

      

    </div>

</template>

<script>
import { Calendar,Datetime } from 'vux'
import { TransferDom, Actionsheet, Group, XSwitch, Toast } from 'vux'
	export default {
		name: "loginpassword-item",
        data(){
            return{
                user:'', sexChecked:false, sex:[require("../../assets/img/my/checke.png"),require("../../assets/img/my/checked.png")],
                day: 'TODAY', value:'',
                menus:['保密','男','女'], sex_key:0, values:'', min:1950, max:'',integral:'',birthday:'',
            }
        },
        components:{
            Calendar,Actionsheet,
            Group,
            XSwitch,
            Toast,Datetime
        },
        directives: {
            TransferDom
        },
        created(){
            this.user = this.$storage.getStore('user')

            this.integral = this.$storage.getStore('vip')
            
            this.value = this.$storage.getStore('user').name
            this.sex_key = this.$storage.getStore('user').sex

            var myDate = new Date()
            this.max = myDate.getFullYear()
            this.values = this.$storage.getStore('user').birthday.substring(0,10) || myDate.getFullYear() + '-' + (myDate.getMonth()+1) + '-' + myDate.getDate()
        },
        computed:{
            card(){
                var value = this.$store.state.vipCode
                return value.substring(0,5) + ' ' + value.substring(5,9) + ' ' + value.substring(9,)
            }
        },
        methods: {
            history() {
                history.go(-1)
            },
            sexChange(){
                this.sexChecked = !this.sexChecked
            },
            onChange (val) {
                // console.log('on change', val)
            },
            sex_click (key) {
                this.sex_key = key
            },
            change (value) {
                this.birthday = value
            },
            Preservation(){
                // console.log(this.value,this.sex,this.birthday || this.values)
                this.$axios.post(this.$httpUrl.editUserInfo,$.param({ access_type:'WXH5', wxh:wxhs, openId:openId, name:this.value, sex:this.sex_key, birthday:this.birthday || this.values }))
                .then(response => {
                    // console.log(response.data)
                    if (response.data.code == 200) {
                        this.$vux.toast.show({
                            text: '保存成功'
                        })
                        setTimeout(() => {
                            this.$vux.loading.hide()
                            this.$router.push({path:'My'})
                        }, 2000)
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
        filters:{
            filter(value){
                return value.substring(0,4) + ' ' + value.substring(4,8) + ' ' + value.substring(8,12) + ' ' + value.substring(12,)
            }
        }
	}
</script>

<style lang="less" scoped>
@import '../../assets/lies.css';
@import '../../assets/vux.1.css';
.yuyue{
    width: 100%; padding: 15vw 0; font-size: 4vw;
}
/*顶部*/
#nav{
    width: 100%; height: 15vw;
    position: fixed; top: 0; z-index: 1000;
    background-color: black; color: white
}
#nav .header{
    width: 100%; height: 15vw;
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
    font-size: 5vw; 
    line-height: 15vw;
}
#nav>img{
    margin-top: -5vw; width: 100%;
}



.Membership_main{
    width: 90%; margin: 0 auto; 
    section{
        width: 20vw; height: 20vw; margin: 10vw auto; position: relative;
        img:nth-child(1){ width: 100%; height: 100%; border-radius: 50%; }
        img:nth-child(2){ width: 5vw; height: 5vw; position: absolute; bottom: -1vw; right: 0}
    }
    .mains{width: 100%; height: 13vw; border-bottom: 0.3vw solid rgba(206,206,206,1); line-height: 13vw; display: flex; justify-content: space-between;}
    .font{width: 30%; height: 100%; font-family:PingFang-SC-Medium; color:rgba(43,43,43,1);}
    .main_input{
        .mains;
        div{ .font }
        input{
            text-align: right; width: 70%; height: 100%; border: 0; outline: none!important; color: rgba(255,139,75,1);
        }
        input:-moz-placeholder{
            color: rgba(255,139,75,1);
        }
        ::-webkit-input-placeholder{
            color: rgba(255,139,75,1);
        }
        img{ width: 2vw; height: 3vw; position: relative; top: 5vw;}
        span{color: rgba(255,139,75,1);}
    }
    .main_inputs{
        .mains;
        div:nth-child(1){ .font }
        div:nth-child(2){
             width: 70%; height: 100%; text-align: right;
            img{ width: 2vw; height: 3vw; margin-left: 2vw;}
        }
    }
    a{
        .font; text-decoration: none;
    }
    .main_input_data{
        width: 100%; height: 13vw; border-bottom: 0.3vw solid rgba(206,206,206,1); line-height: 13vw; display: flex;
        img{ width: 2vw; height: 3vw; position: relative; top: 4vw; margin-left: 2vw; }
    }
    .date{
        width: 100%; height: 13vw;border: 0!important; display: flex; text-align: right;
    }
    .sex_color{
        color: rgba(206,206,206,1);
    }

    .Preservation{
        width: 100%; height: 12vw; background-color: #ff8b4b; outline: none!important; border: 0;
        margin-top: 10vw; color: white; font-size: 4.5vw; border-radius: 1vw;
    }
}




</style>