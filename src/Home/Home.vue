<template>
    <div>
        <home-item></home-item>
        <di-bu>底部</di-bu>
    </div>
</template>
<script>
import HomeItem from "../components/home/HomeItem"
import Dibu from "../components/Dibu"
export default {
    name:'home',
    data(){
        return{

        }
    },
    components:{
        "home-item": HomeItem,
        "di-bu": Dibu
    }
}
</script>
<style scoped>
    
</style>


