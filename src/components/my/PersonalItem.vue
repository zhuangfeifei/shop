<template>
	
    <div class="yuyue">
        <nav id="nav">
            <div class="header">
                <i @click="history" class="fa fa-angle-left" aria-hidden="true"></i>
                <span>个人信息</span>
            </div>
        </nav>


        <div class="xinxi">
            <!--<router-link to="/Upload">-->
            <!--<div class="er">
                <span>头像</span>
                <div class="pai">
                    <input @click="paishe" id="demo_input" type="file" accept="image/*;capture=camera">
                </div>
                <span class="fa fa-angle-right"></span>
                <div id="img_area">
                    <img :src="imgs">
                </div>
            </div>-->
            <!--</router-link>-->
            <!--<div class="er">
                <span>姓名</span>
                <span class="xinxi1">{{name}}</span>
            </div>
            <div class="er">
                <span>手机</span>
                <span class="xinxi1">{{phone}}</span>
            </div>
            <div class="er">
                <span>性别</span>
                <span class="xinxi2 sex" >{{sex}}</span>
            </div>
            <div class="er">
                <span>出生年月</span>
                <div class="yc">
                    <span class="xinxi2">{{day}}</span>
                </div>
            </div>-->
            
            <router-link to="/Address">
            <div class="er">
                 <span>我的地址</span>
                 <span class="fa fa-angle-right"></span>
             </div>
            </router-link>
        </div>


        <!--模态框-->
            <div class="modal fade bs-example-modal-sm" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
                <div class="modal-dialog modal-sm">
                    <div class="modal-content">
                        <div class="modal-body">
                            <span id="span" class="glyphicon glyphicon-ok-circle"></span>
                            <p class="modal-bodys"></p>
                        </div>                       
                    </div>
                </div>
            </div>
    </div>
    
</template>

<script>
import { Loading, XButton} from 'vux'
// import placeholder1 from "../../assets/img/u15320.png"
// import placeholder2 from "../../assets/placeholder.gif"
	export default {
		name: "personal-item",
        data(){
            return{
                // placeholder1,placeholder2,
                sex:'',name:'',day:'',phone:'',token:'',imgs:'',imgUrl:'',
            }
        },
        created(){
            // this.imgUrl = httpUrl.imgUrl
            // var phone, identnumber , bugername, token, imgs
            // function get(phone1,bugername1,identnumber1,token1,imgs1) {
            //     var v = window.document.cookie.match('(^|;) ?' + phone1 + '=([^;]*)(;|$)');
            //     v = true ? v[2] : null
            //     var v1 = window.document.cookie.match('(^|;) ?' + bugername1 + '=([^;]*)(;|$)');
            //     v1 = true ? v1[2] : null
            //     var v2 = window.document.cookie.match('(^|;) ?' + identnumber1 + '=([^;]*)(;|$)');
            //     v2 = true ? v2[2] : null
            //     var v3 = window.document.cookie.match('(^|;) ?' + token1 + '=([^;]*)(;|$)');
            //     v3 = true ? v3[2] : null
            //     var v4 = window.document.cookie.match('(^|;) ?' + imgs1 + '=([^;]*)(;|$)');
            //     v4 = true ? v4[2] : null
            //     phone = v
            //     bugername = v1
            //     identnumber = v2
            //     token = v3
            //     imgs = v4
            // }
            // get('phone','bugername','identnumber','token','img')
            // this.token = token
            // this.phone = phone
            // this.name = decodeURI(decodeURI(bugername))
            // // console.log(this.name)
            // this.day = identnumber.substring(6,10) + '-' + identnumber.substring(10,12) + '-' + identnumber.substring(12,14)
            // if(identnumber.substring(16,17)%2 == 0){
            //     this.sex = '女'
            // }else{
            //     this.sex = '男'
            // }
            // console.log(token)
            // this.imgs = imgs
            // console.log(this.imgs+'----------')
        },
        methods: {
            history() {
                this.$router.push({path:'/My'})
            },
            paishe(){
                // 拍摄
                var input = document.getElementById("demo_input")
                var img_area = document.getElementById("img_area")
                if (typeof (FileReader) === 'undefined') {
                    result.innerHTML = "抱歉，你的浏览器不支持 FileReader，请使用现代浏览器操作！"
                    input.setAttribute('disabled', 'disabled')
                } else {
                    input.addEventListener('change', readFile, false)
                }
                var that = this
                function readFile() {
                    var file = this.files[0]
                    //这里我们判断下类型如果不是图片就返回 去掉就可以上传任意文件
                    if (!/image\/\w+/.test(file.type)) {
                        $('#span').removeClass('glyphicon-ok-circle').addClass('glyphicon-remove-circle')
                        $('.modal-bodys').text('请确保文件为图像类型')
                        $('#myModal').modal('show')
                        setTimeout(function() {
                            $('#myModal').modal('hide')
                        }, 1000)
                        return false
                    }
                    
                        // console.log(e.target.result)
                    // console.log(that.token)
                    var token = that.token
                    // var img = e.target.result
                    // img = new Blob([img], { type: "img/jpg"})
                    var formData = new FormData()
                    formData.append('token', token)
                    formData.append('file', file)
                    that.$http.post(httpUrl.dev + '/puman/api/system/upload', formData ,{ emulateJSON: true })
                    .then(response => {
                        // console.log(response.body)
                        if(response.body.code == 200){
                            var reader = new FileReader()
                            reader.readAsDataURL(file)
                            // console.log(file)
                            reader.onload = function(e) {
                                // img_area.innerHTML = '<img style="width: 100%; height: 100%; border-radius: 50%;" src="' + this.result + '" alt=""/>'
                                that.imgs = this.result
                            }
                            $('#span').removeClass('glyphicon-remove-circle').addClass('glyphicon-ok-circle')
                            $('.modal-bodys').text('上传成功')
                            $('#myModal').modal('show')
                            setTimeout(function() {
                                $('#myModal').modal('hide')
                            }, 2000)
                            var imgs = httpUrl.imgUrl + response.body.message
                            function set(name, value, days) {
                                var d = new Date;
                                d.setTime(d.getTime() + 24 * 60 * 60 * 1000 * days);
                                window.document.cookie = name + "=" + value + ";path=/;expires=" + d.toGMTString();
                            }
                            set('img', imgs, 1)
                        }else{
                            $('#span').removeClass('glyphicon-ok-circle').addClass('glyphicon-remove-circle')
                            $('.modal-bodys').text('上传失败')
                            $('#myModal').modal('show')
                            setTimeout(function() {
                                $('#myModal').modal('hide')
                            }, 2000)
                        }
                    },response => {
                        this.$vux.loading.show({
                            text: '服务器异常',
                        })
                        setTimeout(() => {
                            this.$vux.loading.hide()
                        }, 3000)
                    })

                    
                }
                
            },
        }
	}
</script>

<style scoped>
.yuyue{
    width: 100%; padding-top: 15vw;
}
/*顶部*/
#nav{
    width: 100%; height: 15vw;
    position: fixed; top: 0;
    background-color: white;
    border-bottom: 0.3vw solid gainsboro;
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
    font-size: 5.5vw; 
    line-height: 15vw;
}


/*信息*/
.xinxi{
    width: 100%;
    /*border: 1px solid red;*/
}
.er{
    width: 100%; height: 12vw;border-bottom: 0.3vw solid gainsboro;
    line-height: 12vw; font-size: 4vw; color: gray;
}
.er1{
     /*margin-top: -5vw!important;   */
}
.xinxi span{
    margin-left: 4vw;
}
.xinxi strong{
    margin-left: 4vw;
}
.fa-angle-right{
    float: right; height: 5vw; font-size: 7vw;
    margin-right: 10vw; margin-top: 2vw;
}
#img_area{
    width: 10vw; height: 10vw; float: right; margin-top: -0.5vw; border-radius: 50%;
}
#img_area img{
    width: 100%; height: 100%; border-radius: 50%;
}
.xinxi1{
    float: right; margin-right: 10vw; 
}
.xinxi2{
    float: right; margin-right: 10vw;
}
.sex{
     margin-top: -0.5vw;
}
.xinxi>div:nth-child(5){
    border-bottom: 1vw solid gainsboro;
}
.xinxi>div:nth-child(7){
    border-bottom: 1vw solid gainsboro;
}
a{
    color: gray;
}
a:hover{
    color: gray; text-decoration: none;
}
a:focus{
    outline: none;
}

.yc{
    width: 45%; height: 11vw; overflow: hidden; float: right; padding-left: 2vw;
    /*border:1px solid black;*/
}
.birthday{
    width: 100%; height: 100%; padding-left: 18vw;
    /*border:1px solid red;*/
}


#demo_input{
    position: absolute; right: 10vw; top: 0; opacity: 0;
}
.pai{
    position: relative; width: 45vw; height: 7vw; left: 32vw; top: 2vw;
    display: inline-block; font-size: 4vw;
    /*background: ;*/
    /*border: 0.3vw solid #99D3F5;*/
    border-radius: 2vw;
    margin-left: 10vw; padding-left: 4.5vw;
    overflow: hidden;
    color: white;
    text-decoration: none;
    text-indent: 0;
    line-height: 10vw;
}
/*#img_area{
    width: 70vw; height: 70vw; position: absolute; top: 1.5vw; left: 1.5vw;
}*/


/*模态框*/
#myModal{
    background: rgba(0,0,0,0)!important;
}
.modal-content{
    background: rgba(0,0,0,0.5)!important;
}
.modal-sm{
    width: 45vw; text-align: center; color: white;
    margin: 35vh auto;font-size: 4.5vw;
}
#span{
    font-size: 6vw;
}
a:focus{
    outline: none;
}
</style>