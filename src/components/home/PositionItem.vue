<template>
    <div class="home">
        <header>
            <i @click="history" class="fa fa-angle-left" aria-hidden="true"></i>
        </header>
		<div class="daohang1">
           <span>Suzhou</span><br><span>苏州</span>
        </div>
        
        <div class="xz">
            <span>敬请期待</span><br><span>更多城市</span>
        </div>
            
    </div>
</template>
<script>
export default {
    data(){
        return{
            showKeyboard: true
        }
    },
    computed:{
        count123(){
            return this.$store.state.count
        },
        qwe(){
            return this.$store.state.zxc
        }
    },
    components: {
        
    },
    created(){
        
    },
    methods:{
        history(){
            history.go(-1)
        },
    }
}
</script>
<style scoped>
.home{
    width: 100%; color: white; font-size: 5vw; text-align: center;
}


header{width: 100%; height: 15vw; 
    background: rgba(0,0,0,0,0);
    position: fixed;top: 0;}
header>img{width: 6vw; }

.fa{
    float: left; margin-left: 5vw;
    font-size: 10vw;
    line-height: 15vw;
}



.daohang1{
    width: 100%; height: 30vh; padding-top: 10vh;
    background: url("../../assets/img/home/suzhou@2x.png") no-repeat; background-size: 100% 100%;
}
.xz{
    width: 100%; height: 70vh; padding-top: 20vh; color: gray; line-height: 10vw;
    background: url("../../assets/img/home/beijing@2x.png") no-repeat; background-size: 100% 100%;
}

</style>


