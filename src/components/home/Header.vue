<template>
    <div class="homes">
		<nav id="nav">
            <div class="header">
                <i @click="history" class="fa fa-angle-left" aria-hidden="true"></i>
                <span v-for="(value, index) in headers" :key="index">{{value}}</span>
            </div>
        </nav>
    </div>
</template>
<script>
export default {
    data(){
        return{
            
        }
    },
    props:['headers'],
    components: {
        
    },
    created(){

    },
    methods:{
        history() {
            history.go(-1)
        },
    }
}
</script>
<style scoped>
.homes{
    font-size: 4vw;
}
/*顶部*/
#nav{
    width: 100%; height: 15vw; font-size: 5vw;
    position: fixed; top: 0; color: white; z-index: 1000;
    background-color: black;
}
#nav .header{
    width: 100%; height: 100%;
    text-align: center;
    line-height: 15vw;
} 
.fa{
    float: left; margin-left: 5vw;
    font-size: 10vw;
    line-height: 14vw; color: white;
}
.header span{
    position: relative; left: -2vw;
}


</style>


