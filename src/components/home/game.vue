<template>
  <div>
      <iframe :src="game_URL" width="100%" height="100%" frameborder="0" scrolling="auto" style="position:absolute;top: 0px;left: 0px;"></iframe>
  </div>
</template>
<script>
export default {
    data(){
        return{
            game_URL:''
        }
    },
    created(){
        this.game_URL = this.$httpUrl.games
        // console.log(this.$httpUrl.games)
    }
}
</script>
<style lang="less" scoped>

</style>


