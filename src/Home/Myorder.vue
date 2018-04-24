<template>
    <div>
        <myorder-item></myorder-item>
        <di-bu>底部</di-bu>
    </div>
</template>
<script>
import MyorderItem from "../components/home/MyorderItem";
import Dibu from "../components/Dibu"
export default {
    data(){
        return{

        }
    },
    components:{
        "myorder-item": MyorderItem,
        "di-bu": Dibu,
    }
}
</script>
<style scoped>
    
</style>


