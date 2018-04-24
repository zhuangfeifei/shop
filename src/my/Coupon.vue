<template>
	<div>
        <Coupon-item>我的优惠卷</Coupon-item>
	</div>
</template>

<script>
	import CouponItem from "../components/my/CouponItem";

	export default {
		name: "Coupon",
        components: {
            "Coupon-item": CouponItem
        }
	}
</script>

<style scoped>
	
</style>