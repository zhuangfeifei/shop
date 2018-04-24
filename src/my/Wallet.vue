<template>
	<div>
        <wallet-item>我的钱包</wallet-item>
	</div>
</template>

<script>
	import WalletItem from "../components/my/WalletItem";

	export default {
		name: "wallet",
        components: {
            "wallet-item": WalletItem
        }
	}
</script>

<style scoped>
	
</style>