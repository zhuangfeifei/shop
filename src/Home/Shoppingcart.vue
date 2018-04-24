<template>
    <div>
        <shoppingcart-item></shoppingcart-item>
    </div>
</template>
<script>
import ShoppingcartItem from "../components/home/ShoppingcartItem"
export default {
    name:'shoppingcart',
    data(){
        return{

        }
    },
    components:{
        "shoppingcart-item": ShoppingcartItem
    }
}
</script>
<style scoped>
    
</style>


