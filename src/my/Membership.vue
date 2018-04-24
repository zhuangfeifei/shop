<template>
	<div>
        <Membership-item>会员卡</Membership-item>
	</div>
</template>

<script>
	import MembershipItem from "../components/my/MembershipItem";

	export default {
		name: "Membership",
        components: {
            "Membership-item": MembershipItem
        }
	}
</script>

<style scoped>
	
</style>