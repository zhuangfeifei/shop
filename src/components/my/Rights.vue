<template>
	
    <div class="yuyue">
        <nav id="nav">
            <div class="header">
                <i @click="history" class="fa fa-angle-left" aria-hidden="true"></i>
                <span>{{title}}</span>
            </div>
        </nav>
        
        <div class="Rights_content" v-html="this.$store.state.html"></div>

      

    </div>

</template>

<script>
import { Calendar,Datetime } from 'vux'
import { TransferDom, Actionsheet, Group, XSwitch, Toast } from 'vux'
	export default {
		name: "loginpassword-item",
        data(){
            return{
                title:'', integral: ''
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
            
            this.title = this.$route.query.title
        },
        computed:{
            
        },
        methods: {
            history() {
                history.go(-1)
            },
            
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




.Rights_content{
    width: 100%; padding: 5vw;
}




</style>