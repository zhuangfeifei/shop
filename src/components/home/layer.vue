<template>
    <div class="home">
		<nav>
            <i @click="history" class="fa fa-angle-left" aria-hidden="true"></i>
            <span>商城</span>
        </nav>
        
        
        <div class="di">
            <div @click="shopItem(item)" v-for="(item,index) in title" :key="index"></div>
        </div>
        <div class="a">
            <img src="../../assets/img/floor/F.png" alt="">
        </div>
        

    </div>
</template>
<script>
export default {
    data(){
        return{
            imgs:'',title:['A','E','D','B','C'],
        }
    },
    components: {
        
    },
    created(){
        document.body.scrollTop = 0
        document.documentElement.scrollTop = 0

        
    },
    mounted(){
        
    },
    methods:{
        history() {
            history.go(-1)
        },
        shopItem(index){
            this.$router.push({path:"shop",query:{shopFloor:index}})
        }
    }
}
</script>
<style lang="less" scoped>
.home{
    width: 100%; padding-top: 15vw;
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

.di{
    width: 100%; height: 40vw; margin: 5vw 0;
    background: url("../../assets/img/floor/Fs.svg") no-repeat; background-size: 100% 100%;
    div{
        width: 33.33%; height: 50%; float: left; text-align: center; 
        // border: 1px solid red;
    }
    div:nth-child(1){
        height: 100%;
    }
}

.a{
    width: 100%; height: 45vh; overflow: hidden;
    img{
        width: 95%; height: 100%; margin-left: 2.5%;
    }
}



</style>


