<template>
	<div id="apps">

        <nav id="nav">
            <div class="header">
                <i @click="history" class="fa fa-angle-left" aria-hidden="true"></i>
                <span id="tongzhi">通知</span><span @click="bianji" id="bianji" :class="{colors:checked}">{{checked ? '完成' : '编辑'}}</span>
            </div>
        </nav>

        <div v-show="allNotice" class="notice" v-for="(item,index) in allNotice" :key="index">
            <div v-show="checked" class="checkeds">
                <check-icon :value.sync="checked1[index]"></check-icon>
            </div>
            <div>
                <div class="tittle" :class="{tittles:checked}">
                    <span>{{item.CONTENT}}</span>
                    <span>{{item.CREATE_TIME.substring(5,10)}}</span>
                </div>
                <div class="content">
                    {{item.CREATE_TIME}}
                </div>
            </div>
        </div>
        
        <div v-show="checked" class="footer">
            <div class="Select"><check-icon :value.sync="checkeds">全选</check-icon></div>
            <div></div>
            <div @click="Read">标记已读</div>
        </div>
	</div>
</template>

<script>
import { CheckIcon  } from 'vux'
	export default {
        data(){
            return{
                checkeds:false,checked1:[],id:'', checked:false,allNotice:'',currents:1,limit:10,
            }
        },
		computed:{
            
        },
        components: {
            CheckIcon 
        },
        created(){
            // console.log(this.$store.state.notice)
            
            this.$axios.post(this.$httpUrl.allNotice,$.param({ limit:this.limit, current:this.currents }))
            .then(response => {
                // console.log(response.data)
                if(response.data.code == 200){
                    this.allNotice = response.data.data
                    var array = []
                    for (var i = 0; i < this.allNotice.length; i++) {
                        array.push(false)
                    }
                    this.checked1 = array
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
        methods:{
            history() {
                history.go(-1)
            },
            bianji(){
                // this.$store.commit('bianjis',!this.checked)
                this.checked = !this.checked
           },
            Read() {
                var id = []
                for (var i = 0; i < this.checked1.length; i++) {
                    if(this.checked1[i]){
                        id.push(this.allNotice[i].ID)
                    }
                }
                var ids = id.join(',')
                if(ids){
                    this.$axios.post(this.$httpUrl.changReadStatus,$.param({ noticeId:ids }))
                    .then(response => {
                        // console.log(response.data)
                        if(response.data.code == 200){
                            this.$vux.toast.show({
                                text: '标记成功',
                            })
                            setTimeout(() => {
                                this.$vux.loading.hide()
                            },3000)
                        }else{
                            this.$vux.loading.show({
                                text: response.data.message
                            })
                            setTimeout(() => {
                                this.$vux.loading.hide()
                            },3000)
                        }
                    },response => {
                        this.$vux.loading.show({
                            text: '服务器异常',
                        })
                        setTimeout(() => {
                            this.$vux.loading.hide()
                        },3000)
                    })
                }
            },
        },
        watch:{
            checkeds(val,old){
                for(var i = 0; i < this.checked1.length; i ++){
                    this.checked1[i] = val
                }
            },
        },
        destroyed(){
            this.checkeds = false
            // this.$store.commit('bianjis',false)
        },
	}
</script>

<style lang="less" scoped>
#apps{
    width: 100%; padding-top: 15vw;
}


#nav{
    width: 100%; height: 15vw;
    position: fixed; top: 0; z-index: 1000;
    background-color: black; color: white;
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
    font-size: 5vw; 
    line-height: 15vw;
}
#bianji{
    float: right; margin-right: 2vw;
}





.notice{
    width: 100%; height: 15vh; padding: 1.5vh 1vh 0 1.5vh;
    border-bottom: 1px solid gainsboro; display: flex;
    .checkeds{
        width: 10vw; line-height: 12vh; position: relative; left: -1vw;
        // border: 1px solid red; 
    }
    .hangshu{
        display: -webkit-box; -webkit-box-orient: vertical; overflow: hidden;
    }
    .tittle{
        width: 95vw; height: 4vh; font-size: 4.5vw; font-weight: 600; margin: 0; display: flex; 
        justify-content: space-between; line-height: 4vh;
        span:nth-child(1){
            display: inline-block; width: 80%; .hangshu; -webkit-line-clamp: 1;
        }
        span:nth-child(2){
            margin-right: 2vw; color: gray; font-size: 3.8vw;
        }
    }
    .tittles{ width: 85vw; }
    .content{
        width: 100%; height: 7vh; color: gray; .hangshu; -webkit-line-clamp: 2; font-size: 4vw;
        position: relative; top: 1vw; line-height: 3.5vh;
    }
}

.footer{
    width: 100%; height: 8vh; position: fixed; bottom: 0; z-index: 10; display: flex; font-size: 4vw;
    border-top: 1px solid gainsboro; text-align: center; color: white; line-height: 8vh;
    div{
        width: 37.5%; height: 100%; background-color: black;
        // border: 1px solid red;
    }
    div:nth-child(2){
        background-color: white;
    }
    .Select{
        width: 25%; background-color: white;
        div{
            width: 100%; background-color: white; position: relative; left: -2vw;
        }
    }
}

.colors{
    color: #09bb07!important;
}
</style>