<template>
	<div>
        <address-item>我的地址</address-item>
	</div>
</template>

<script>
	import AddressItem from "../components/my/AddressItem";

	export default {
		name: "addressitem",
        components: {
            "address-item": AddressItem
        }
	}
</script>

<style scoped>
	
</style>