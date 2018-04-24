<template>
    <div class="home">
		<nav>
            <i @click="history" class="fa fa-angle-left" aria-hidden="true"></i>
            <span>{{title}}</span>
        </nav>
        
        
        <img :src="imgs" alt="">
        

    </div>
</template>
<script>
export default {
    data(){
        return{
            imgs:'',title:'',
        }
    },
    components: {
        
    },
    created(){
        document.body.scrollTop = 0
        document.documentElement.scrollTop = 0

        this.imgs = require('../../assets/img/home/'+this.$route.query.name+'s.png')
        this.title = this.$route.query.shop
    },
    methods:{
        history() {
            history.go(-1)
        },
    }
}
</script>
<style lang="less" scoped>
.home{
    width: 100%; padding-top: 12vw;
    padding-bottom: 10vw;
    // background: url('../../assets/img/home/diwen@2x.png') no-repeat; background-size: 100% 95%;
    // background-color: #002531;
    img{
        width: 100%; height: 100%;
    }
}
/*顶部*/
nav{
    width: 100%; height: 15vw; position: fixed; top: 0; left: 0; 
    text-align: center; color: white; font-size: 4.5vw; background-color: black;
    span{
         line-height: 15vw; font-size: 5vw;
    }
}
.fa{
    font-size: 10vw; color: white; float: left;
    line-height: 14vw; position: relative; left: 5vw;
}



</style>


