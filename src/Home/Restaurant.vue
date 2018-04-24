<template>
    <div id="pl">
        <restaurant-item></restaurant-item>
    </div>
</template>
<script>
import RestaurantItem from "../components/home/RestaurantItem";
export default {
    data(){
        return{

        }
    },
    components:{
        "restaurant-item": RestaurantItem,
    }
}
</script>
<style scoped>
    #pl{
        width: 100%;
    }
</style>


