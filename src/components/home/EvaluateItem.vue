<template>
    <div class="home">
        <header-item :headers="header"></header-item>
        
        <div class="dian">
            <div>
                <img :src="imgUrl + this.$route.query.logo" alt="">
                <span>{{this.$route.query.shopid}}</span>
                <!--<img v-show="this.$route.query.logo == null" :src="imgUrl + this.$store.state.coverPic" alt="">
                <span v-show="this.$route.query.logo == null">{{this.$store.state.shopname}}</span>
                <img v-show="this.$route.query.logo != null" :src="imgUrl + this.$route.query.logo" alt="">
                <span v-show="this.$route.query.logo != null">{{this.$route.query.name}}</span>-->
            </div>
        </div>
        <div class="pingxin">
            <div>
                <span>商家总评</span>
                <rater v-model="data1" star="✩"></rater>
            </div>
            <div>
                <span>商家环境</span>
                <rater v-model="data2" star="✩"></rater>
            </div>
            <div>
                <span>商家服务</span>
                <rater v-model="data3" star="✩"></rater>
            </div>
        </div>
        <textarea id="text" maxlength="100" onchange="this.value=this.value.substring(0, 100)" 
            onkeydown="this.value=this.value.substring(0, 100)" onkeyup="this.value=this.value.substring(0, 100)" 
            placeholder="写下您对商家的评价吧~"
        ></textarea>
        <div class="paizhao">
            <div class="zhaopian" v-for="(item,index) in 1" :key="index" :style="{backgroundImage: 'url(' + mai[0].image1 + ')'}">
                <img class="img1" src="../../assets/img/home/cancel@2x.png" alt="">
                <div id="img_area">
                    <img :src="img" alt="">
                </div>
            </div>
            <div :style="{backgroundImage: 'url(' + mai[0].image + ')'}">
                <div class="pai">
                    <input @click="paishe" id="demo_input" type="file" name="fileselect[]" multiple accept="image/*;capture=camera">
                </div>
            </div>
        </div>
        <button @click="pjtijiao" class="btn">立即提交</button>
    </div>
</template>
<script>
import { Rater } from 'vux'
import Header from "./Header"
import { Loading, Toast } from 'vux'
export default {
    data(){
        return{
            mai:[
                {
                    "image": require("../../assets/img/home/paizhao@2x.png"),
                    "image1": require("../../assets/img/home/plus@2x.png"),
                },
                
            ],
            header:'立即评价',
            data1: 1,data2: 0,data3: 0,data4: 0,img:[],imgUrl:''
        }
    },
    components: {
        "header-item": Header,
        Rater,
    },
    created(){
        document.body.scrollTop = 0
        document.documentElement.scrollTop = 0

        this.imgUrl = this.$httpUrl.imgUrls
    },
    methods:{
        history() {
            history.go(-1)
        },
        chakan(){
            this.$router.push({name:''})
        },
        pingjia(){
            this.$router.push({name:''})
        },
        pjtijiao(){
            var text = $('#text').val()
            // alert('总评' + this.data1 + '星'+'环境' + this.data2 + '星'+'服务' + this.data3 + '星' + '-----------' +text)
            // console.log($("div").siblings())

 
            var img = document.getElementById("demo_input").files[0]
            var formData = new FormData()
            formData.append('access_type', 'WXH5')
            formData.append('wxh', this.$storage.getStore('wx'))
            formData.append('openId', this.$storage.getStore('openIds'))
            formData.append('shopid', this.$route.query.shopid)
            formData.append('comment', text)
            formData.append('stars', this.data1)
            formData.append('pictures', img)
            this.$axios.post(this.$httpUrl.insertRely,formData,{ emulateJSON: true })
            .then(response => {
                // console.log(response.data)
                if(response.data.code == 200){
                    this.$vux.toast.show({
                        text: response.data.message
                    })
                    setTimeout(() => {
                        this.$vux.toast.hide()
                        this.$router.push({name:'myorder'})
                    }, 1000)
                } else {
                    this.$vux.loading.show({
                        text: response.data.message
                    })
                    setTimeout(() => {
                        this.$vux.loading.hide()
                    },3000)
                }
            })
            .catch(error => {
                // console.log(error)
                this.$vux.loading.show({
                    text: '服务器异常'
                })
                setTimeout(() => {
                    this.$vux.loading.hide()
                },3000)
            })
        },
        paishe(){
            var input = document.getElementById("demo_input")
            if (typeof FileReader === 'undefined') {
                result.innerHTML = "抱歉，你的浏览器不支持 FileReader"
                input.setAttribute('disabled', 'disabled')
            } else {
                input.addEventListener('change', readFile, false)
            } 
            var _this = this
            function readFile() {
                var file = this.files[0]
                var reader = new FileReader()
                reader.readAsDataURL(file)
                reader.onload = function(e) {
                    _this.img = this.result
                }
            }  
        }
    }
}
</script>
<style scoped>
@import '../../assets/vux.1.css';
.home{
    padding-top: 15vw; font-size: 4.5vw;
}

.dian{
    width: 100%; height: 18vw; padding: 0 5vw; border-top: 3vw solid #f2f2f2; line-height: 15vw;
}
.dian div{
    width: 100%; border-bottom: 0.3vw solid gainsboro; 
}
.dian img{
    width: 10vw; height: 10vw;
}
.pingxin{
    width: 100%; padding: 3vw 5vw;
}
.pingxin>div{
    width: 100%; height: 12vw; line-height: 12vw;
}
.pingxin>div>span{
    margin-right: 6vw; position: relative; top: -1vw;
}
textarea{
    width: 90%; height: 30vw; margin: 0 5%; background-color: #f2f2f2; resize: none; padding: 1vw 2vw;
    font-size: 4vw; outline: none; border: 0.3vw solid gainsboro
}
textarea::-moz-placeholder{
    color: gray;
}
textarea::-webkit-input-placeholder{
    color: gray;
}

.paizhao{
    width: 100%; height: 17vw; margin-top: 3vw; padding-right: 2vw; position: relative;
}
.paizhao>div{
    width: 15vw; height: 15vw; border: 1px solid gainsboro; float: right; margin-right: 3vw;
    background-repeat: no-repeat; background-size: 70% 70%; background-position: 2vw;
}
.zhaopian img{
    width: 4vw; height: 4vw; float: right; position: relative; right: -2vw; top: -2vw;
}
.img1{
    z-index: 10;
}

.btn{
    width: 90%; height: 13vw; background-color: red; color: white; font-size: 4.5vw;
    margin: 8vw 5%; outline: none!important;
}



#demo_input{
    position: absolute; right: 10vw; top: 0; opacity: 0;border: 1px solid red!important;
}
.pai{
    position: relative; width: 15vw; height: 10vw; left: -7vw; top: 2vw;
    display: inline-block; font-size: 4vw;
    background: none;
    /*border: 0.3vw solid #99D3F5;*/
    border-radius: 2vw;
    margin-left: 10vw; padding-left: 4.5vw;
    overflow: hidden;
    color: white;
    text-decoration: none;
    text-indent: 0;
    line-height: 10vw;
}
#img_area img{
    width: 15vw; height: 15vw; margin: 0; position: relative; right: 0vw; top: -4vw;
}

</style>


